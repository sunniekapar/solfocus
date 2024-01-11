import { useEffect, useState } from 'react';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/BaseConfig';
import { Separator } from '../ui/separator';
import TasksOptionsDropdown from './components/TasksOptionsDropdown';
import Task from './components/Task';
import { Reorder } from 'framer-motion';
import { BsPlusCircleFill } from 'react-icons/bs';
import { Button } from '../ui/button';
import AddTask from './components/AddTask';
import { TaskProps } from '@/interfaces';
import { useAuth } from '@/context/AuthContext';

export default function TaskList() {
  const [tasks, setTasks] = useState<TaskProps[] | []>([]);
  const [addingTask, setAddingTask] = useState(false);
  const { user } = useAuth();

  const tasksRef = collection(db, 'tasks');

  useEffect(() => {
    const localTasksString = localStorage.getItem('tasks');
    const localTasks = localTasksString ? JSON.parse(localTasksString) : [];
    if (!user && localTasks) setTasks(localTasks);

    const fetchTasks = async () => {
      const querySnapshot = await getDocs(collection(db, 'tasks'));
      const firestoreTasks: TaskProps[] = querySnapshot.docs.map((doc) => ({
        ...(doc.data() as TaskProps),
      }));

      const mergedTasks = mergeTasks(localTasks, firestoreTasks);
      setTasks(mergedTasks);
    };

    if (user) fetchTasks();
  }, [user]);

  const mergeTasks = (localTasks: TaskProps[], firestoreTasks: TaskProps[]) => {
    const taskMap = new Map();
    
    //Add all tasks from fireStore
    firestoreTasks.forEach((task) => taskMap.set(task.id, task));
    
    localTasks.forEach((task) => {
      if (taskMap.has(task.id)) {
        // Update Firestore task with local task data
        taskMap.set(task.id, { ...taskMap.get(task.id), ...task });
      } else {
        // Add local task to the map
        taskMap.set(task.id, task);
      }
    });

    return Array.from(taskMap.values());
  };

  const handleAddTask = async ({ taskName, taskDescription, completed, id }: TaskProps) => {
    const newTask = {
      id: id, 
      taskName: taskName,
      completed: completed,
      taskDescription: taskDescription ? taskDescription : ''
    };
   
    const updatedTasks = [newTask, ...tasks];
    setTasks(updatedTasks);

    if(!user) localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    try {
      await addDoc(tasksRef, newTask);
    } catch (error) {
      console.error('Error adding task to Firestore:', error);
    }
  };
  
  const toggleTaskCompletion = (id: number | string) => {
    setTasks((currentTasks) => {
      // Find the task and toggle its completion status
      const updatedTasks = currentTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      // Move completed tasks to the end
      return [
        ...updatedTasks.filter((task) => !task.completed),
        ...updatedTasks.filter((task) => task.completed),
      ];
    });
  };

  return (
    <section className="w-full mx-auto mt-8">
      <div className="flex items-end justify-between">
        <h2 className="text-2xl font-semibold">Tasks</h2>
        <TasksOptionsDropdown />
      </div>
      <Separator className="my-4" />

      {addingTask ? (
        <AddTask
          onAddTask={handleAddTask}
          onCancel={() => setAddingTask(false)}
        />
      ) : null}
      <Reorder.Group axis="y" values={tasks} onReorder={setTasks}>
        {tasks.map((task) => (
          <Reorder.Item key={task.id} value={task}>
            <Task
              key={task.id}
              id={tasks.length}
              title={task.taskName}
              completed={task.completed}
              onToggle={() => toggleTaskCompletion(task.id)}
              description={task.taskDescription}
            />
          </Reorder.Item>
        ))}
      </Reorder.Group>

      <Button
        variant="outline"
        onClick={() => setAddingTask(true)}
        className="w-full border-dashed"
        size="lg"
      >
        <BsPlusCircleFill className="mr-2 text-base" />
        <p className="font-semibold">Add task</p>
      </Button>
    </section>
  );
}
