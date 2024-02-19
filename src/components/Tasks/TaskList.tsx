import { useEffect, useRef, useState } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import { db } from '../../firebase/BaseConfig';
import { Separator } from '../ui/separator';
import TasksOptionsDropdown from './components/TaskListOptions';
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
  const containerRef = useRef(null); // Create a ref
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

  const findDocById = async (id: string | number) => {
    try {
      const q = query(collection(db, 'tasks'), where('id', '==', id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        return querySnapshot.docs[0].ref; // Return the document reference
      } else {
        console.error('No such document found');
        return null; // Return null if no document is found
      }
    } catch (error: any) {
      console.error('Error finding task from Firebase:', error);
      return null; // Return null in case of error
    }
  };

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

  const handleAddTask = async ({
    taskName,
    taskDescription,
    completed,
    id,
  }: TaskProps) => {
    const newTask = {
      id: id,
      taskName: taskName,
      completed: completed,
      taskDescription: taskDescription ? taskDescription : '',
    };

    const updatedTasks = [newTask, ...tasks];
    setTasks(updatedTasks);

    if (!user) localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    try {
      await addDoc(tasksRef, newTask);
    } catch (error) {
      console.error('Error adding task to Firestore:', error);
    }
  };

  const handleRemoveTask = async (id: number | string) => {
    //if(!user) localStorage.removeItem()
    try {
      const docRef = await findDocById(id);
      if (docRef) {
        await deleteDoc(docRef);
        setTasks((currentTasks) =>
          currentTasks.filter((task) => task.id !== id)
        );
      }
    } catch (error: any) {
      console.error('Error deleting task from Firebase:', error);
    }
  };

  const handleCompleteTask = async (id: number | string) => {
    let newCompletedStatus = false;

    setTasks((currentTasks) => {
      const taskIndex = currentTasks.findIndex((task) => task.id === id);
      if (taskIndex === -1) return currentTasks; // Task not found

      newCompletedStatus = !currentTasks[taskIndex].completed;

      const updatedTask = {
        ...currentTasks[taskIndex],
        completed: newCompletedStatus,
      };
      // Remove the task from its current position
      let updatedTasks = [...currentTasks];
      updatedTasks.splice(taskIndex, 1);

      // Add the task at the end or the beginning based on its new completed status
      if (newCompletedStatus) {
        updatedTasks.push(updatedTask);
      } else {
        updatedTasks = [updatedTask, ...updatedTasks];
      }

      return updatedTasks;
    });

    try {
      const docRef = await findDocById(id);
      if (docRef) {
        await updateDoc(docRef, { completed: newCompletedStatus });
      }
    } catch (error) {
      console.error('Error editing task from Firebase:', error);
    }
  };

  const handleUpdateTask = async (
    id: number | string,
    taskName: string,
    taskDescription?: string
  ) => {
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      console.error('Task not found');
      return;
    }

    const updatedTask = {
      ...tasks[taskIndex],
      taskName: taskName,
      taskDescription: taskDescription,
    };

    // Update the tasks array with the updated task
    setTasks((currentTasks) => {
      const updatedTasks = [...currentTasks];
      updatedTasks[taskIndex] = updatedTask;
      return updatedTasks;
    });

    try {
      const docRef = await findDocById(id);
      if (docRef) {
        await updateDoc(docRef, {
          taskName: taskName,
          taskDescription: taskDescription,
        });
      }
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  const handleDeleteAllTasks = async () => {
    setTasks([]);
    if (!user) localStorage.clear();

    const batch = writeBatch(db);
    try {
      const querySnapshot = await getDocs(query(tasksRef));
      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      console.log('All tasks deleted successfully');
    } catch (error) {
      console.error('Error deleting tasks:', error);
    }
  };

  const handleCompleteAllTasks = async () => {
    if (tasks.length) {
      setTasks((currentTasks) => {
        return currentTasks.map((task) => {
          return {
            ...task,
            completed: true,
          };
        });
      });
    }

    const batch = writeBatch(db);
    try {
      const querySnapshot = await getDocs(query(tasksRef));
      querySnapshot.forEach((doc) => {
        if (doc.data().completed) batch.delete(doc.ref);
      });
    } catch (error) {
      console.error('Error completing all tasks', error);
    }
    return;
  };

  const handleClearCompletedTasks = async () => {
    setTasks((currentTasks) => currentTasks.filter((task) => !task.completed));
  };

  return (
    <section className="w-full mx-auto mt-8">
      <div className="flex items-end justify-between">
        <h2 className="text-2xl font-semibold">Tasks</h2>
        <TasksOptionsDropdown
          deleteAllTasks={handleDeleteAllTasks}
          completeAllTasks={handleCompleteAllTasks}
          clearCompletedTasks={handleClearCompletedTasks}
        />
      </div>
      <Separator className="my-4" />

      <div ref={containerRef}>
        {addingTask ? (
          <AddTask
            onAddTask={handleAddTask}
            onCancel={() => setAddingTask(false)}
          />
        ) : null}
        <Reorder.Group
          dragConstraints={containerRef}
          axis="y"
          values={tasks}
          onReorder={setTasks}
        >
          {tasks.map((task) => (
            <Reorder.Item
              dragConstraints={containerRef}
              key={task.id}
              value={task}
            >
              <Task
                key={task.id}
                id={task.id}
                title={task.taskName}
                completed={task.completed}
                description={task.taskDescription}
                handleCompleteTask={() => handleCompleteTask(task.id)}
                handleRemoveTask={() => handleRemoveTask(task.id)}
                handleUpdateTask={handleUpdateTask}
              />
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>

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
