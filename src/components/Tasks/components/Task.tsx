import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { BsCheckCircleFill, BsPenFill, BsXCircleFill } from 'react-icons/bs';
import { MdMoreVert, MdOutlineCircle } from 'react-icons/md';
import { motion } from 'framer-motion';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import AddTask from './AddTask';

interface TaskProps {
  id: number | string;
  title: string;
  completed: boolean;
  description?: string;
}

interface TaskComponentProps extends TaskProps {
  handleCompleteTask: () => void;
  handleRemoveTask: () => Promise<void>;
  handleUpdateTask: (
    id: number | string,
    taskName: string,
    taskDescription?: string
  ) => Promise<void>;
}

export default function Task({
  id,
  title,
  completed,
  description,
  handleCompleteTask,
  handleRemoveTask,
  handleUpdateTask,
}: TaskComponentProps) {
  const [updatingTask, setUpdatingTask] = useState(false);

  const completedStyles = completed ? 'line-through opacity-50' : '';

  return (
    <>
      {updatingTask ? (
        <>
          <AddTask
            onCancel={() => setUpdatingTask(false)}
            defaultValues={{
              taskName: title,
              taskDescription: description || '',
              id: id,
            }}
            onEditTask={handleUpdateTask}
          />
        </>
      ) : (
        <motion.div layout>
          <Card className="px-6 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Button
                  size="icon"
                  variant="ghost"
                  className="mt-[2px]"
                  onClick={handleCompleteTask} // Use the passed-in handler
                >
                  {completed ? (
                    <BsCheckCircleFill className="text-xl" />
                  ) : (
                    <MdOutlineCircle className="text-xl" />
                  )}
                </Button>

                <CardHeader>
                  <h2 className={`text-xl font-semibold ${completedStyles}`}>
                    {title}
                  </h2>
                </CardHeader>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MdMoreVert className="text-xl" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setUpdatingTask(true)}>
                    <BsPenFill className="mr-2 text-lg" />
                    Edit task
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleRemoveTask}>
                    <BsXCircleFill className="mr-2 text-lg" />
                    Delete Task
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {description && (
              <CardContent className={`pl-16 -mt-4 text-sm ${completedStyles}`}>
                {description}
              </CardContent>
            )}
          </Card>
        </motion.div>
      )}
    </>
  );
}
