import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  BsFillTrash2Fill,
  BsCheckCircleFill,
  BsXCircleFill,
} from 'react-icons/bs';
import { MdMoreVert } from 'react-icons/md';

interface TaskOptionProps {
  deleteAllTasks: () => Promise<void>;
  completeAllTasks: () => void;
  clearCompletedTasks: () => void;
}

export default function TasksOptionsDropdown({
  deleteAllTasks,
  completeAllTasks,
  clearCompletedTasks,
}: TaskOptionProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon">
          <MdMoreVert className="text-xl" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={clearCompletedTasks}>
          <BsFillTrash2Fill className="mr-2 text-lg" />
          Clear complete tasks
        </DropdownMenuItem>
        <DropdownMenuItem onClick={completeAllTasks}>
          <BsCheckCircleFill className="mr-2 text-lg" />
          Complete all tasks
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={deleteAllTasks}>
          <BsXCircleFill className="mr-2 text-lg" />
          Delete all tasks
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
