import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { BsFillTrash2Fill, BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import { MdMoreVert } from "react-icons/md";

export default function TasksOptionsDropdown() {
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
}
