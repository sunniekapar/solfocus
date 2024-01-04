import { Button } from '@/components/ui/button';
import { MdOutlineEqualizer, MdPerson, MdSettings } from 'react-icons/md';
import { ModeToggle } from '../mode-toggle';
import { Separator } from '../ui/separator';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogFooter,
} from '../ui/dialog';
import { ScrollArea } from '../ui/scroll-area';
import { BsStopwatch } from 'react-icons/bs';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';

export default function Navbar() {
  return (
    <>
      <nav className="flex justify-between py-4">
        <header className="flex items-center">
          <ModeToggle />
          <h1 className="hidden text-3xl font-semibold md:ml-2 md:block">
            SolFocus
          </h1>
        </header>
        <div className="flex gap-2 space-between">
          <Button size="sm">
            <MdOutlineEqualizer />
            <p className="hidden ml-0 text-sm md:ml-2 md:block"> Statistics </p>
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <MdSettings />
                <p className="hidden ml-0 text-sm md:ml-2 md:block"> Settings </p>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="text-xl font-semibold">
                Settings
              </DialogHeader>
              <Separator className="my-4" />

              <ScrollArea className="p-4 rounded-md h-96">
                <div className="flex items-center gap-4">
                  <BsStopwatch className="text-lg" />
                  <p className="text-lg font-semibold">Timer</p>
                </div>
                <div className="flex gap-2 px-1 my-6">
                  <div>
                    <label htmlFor="pomodoro" className="text-sm font-medium">
                      Pomodoro
                    </label>
                    <Input id="pomodoro"></Input>
                  </div>
                  <div>
                    <label
                      htmlFor="short-break"
                      className="text-sm font-medium"
                    >
                      Short break
                    </label>
                    <Input id="short-break"></Input>
                  </div>
                  <div>
                    <label htmlFor="long-break" className="text-sm font-medium">
                      Long break
                    </label>
                    <Input id="long-break"></Input>
                  </div>
                </div>

                <div className="flex flex-col gap-4 my-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Auto start breaks</p>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Auto start pomodoros</p>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="break-interval" className="text-sm font-medium">
                      Long break intervals
                    </label>
                    <Input id="break-interval" className='w-12'></Input>
                  </div>
                </div>

              </ScrollArea>

              <Separator className="my-4" />
              <DialogFooter>
                <Button disabled className="ml-auto">
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button size="sm">
            <MdPerson />
            <p className="hidden ml-0 text-sm md:ml-2 md:block"> Log in </p>
          </Button>
        </div>
      </nav>
      <Separator className="my-4" />
    </>
  );
}
