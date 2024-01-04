import { Button } from '../ui/button';
import { MdMoreVert } from 'react-icons/md';
import { Card, CardContent, CardHeader } from '../ui/card';

import { MdOutlineCircle } from 'react-icons/md';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

import { BsFillTrash2Fill , BsXCircleFill , BsCheckCircleFill  } from 'react-icons/bs';
import { Separator } from '../ui/separator';

export default function Tasks() {
  const TasksOptionsDropdown = () => {
    return (
      <DropdownMenu >
        <DropdownMenuTrigger asChild>
          <Button size="icon">
            <MdMoreVert className="text-xl" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent >
          <DropdownMenuItem>
            <BsFillTrash2Fill className="mr-2 text-lg" />
            Clear complete tasks
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BsCheckCircleFill  className="mr-2 text-lg" />
            Complete all tasks
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <BsXCircleFill  className="mr-2 text-lg" />
            Delete all tasks
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <section className="w-full mx-auto mt-8">
      <div className="flex items-end justify-between">
        <h2 className="text-2xl font-semibold">Tasks</h2>
        <TasksOptionsDropdown />
      </div>
      <Separator className="my-4" />

      <Card className="px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button size="icon" variant="ghost" className="mt-[2px]">
              <MdOutlineCircle className="text-xl" />
            </Button>

            <CardHeader>
              <h2 className="text-xl font-semibold">Task name</h2>
            </CardHeader>
          </div>
          <Button size="icon" variant="ghost">
            <MdMoreVert className="text-xl" />
          </Button>
        </div>
        <CardContent className="pl-16">Hello</CardContent>
      </Card>
    </section>
  );
}
