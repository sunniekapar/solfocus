import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogFooter,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BsStopwatch } from 'react-icons/bs';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Label } from '@/components/ui/label';

interface SettingsProps {
  dialogOpen: boolean;
  dialogClose: () => void;
}

export default function Settings({ dialogOpen, dialogClose }: SettingsProps) {
  return (
    <Dialog open={dialogOpen} onOpenChange={dialogClose}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Settings</DialogTitle>
        </DialogHeader>

        <Separator />

        <ScrollArea className="p-4 rounded-md h-96">
          {/* px-1: ensure the sides of the input boxes are not cut off */}
          <div className="px-1">
            {/* Header */}
            <div className="flex items-center gap-4">
              <BsStopwatch className="text-lg" />
              <p className="text-lg font-semibold">Timer</p>
            </div>

            {/* Change break times */}
            <div className="flex gap-2 my-6">
              <div>
                <Label htmlFor="pomodoro" className="text-sm font-medium">
                  Pomodoro
                </Label>
                <Input id="pomodoro" />
              </div>
              <div>
                <Label htmlFor="short-break" className="text-sm font-medium">
                  Short break
                </Label>
                <Input id="short-break" />
              </div>
              <div>
                <Label htmlFor="long-break" className="text-sm font-medium">
                  Long break
                </Label>
                <Input id="long-break" />
              </div>
            </div>

            {/* Other settings */}
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
                <Label htmlFor="break-interval" className="text-sm font-medium">
                  Long break intervals
                </Label>
                <Input id="break-interval" className="w-16 text-right" />
              </div>
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
  );
}
