import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { useState } from 'react';
import { TaskProps } from '@/interfaces';

interface AddTaskProps {
  onAddTask: ({...props} : TaskProps) => void; // Adjust the type as needed
  onCancel: () => void;
}

const formSchema = z.object({
  taskName: z.string().min(2, {
    message: 'Task must be at least 2 characters.',
  }),
  taskDescription: z
    .string()
    .optional()
    .refine(
      (desc) => {
        if (desc === undefined || desc.trim() === '') return true;
        return desc.length >= 10 && desc.length <= 150;
      },
      {
        message: 'Description must be between 10 and 150 characters.',
      }
    ),
});

export default function AddTask({ onAddTask, onCancel }: AddTaskProps) {
  const [descriptionAdded, setDescriptionAdded] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newTask = {
      ...values,
      completed: false,
      id: Date.now()
    }
    onAddTask(newTask);
    form.reset();
    onCancel();
  }

  return (
    <Card className="mb-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-5/6 mx-auto -space-y-3"
        >
          <CardHeader>
            <FormField
              control={form.control}
              name="taskName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task</FormLabel>
                  <FormControl>
                    <Input
                      className="px-0 border-t-0 rounded-none border-x-0 focus-visible:ring-0"
                      placeholder="Walk the dog"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardHeader>
          <CardContent>
            {descriptionAdded ? (
              <FormField
                control={form.control}
                name="taskDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Task description"
                        className="px-0 border-t-0 rounded-none max-h-96 border-x-0 focus-visible:ring-0 "
                        rows={1}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <Button
                variant="link"
                className="px-0"
                size="sm"
                type="button"
                onClick={() => setDescriptionAdded(true)}
              >
                Add description
              </Button>
            )}
          </CardContent>
          <CardFooter className="justify-end gap-2">
            <Button
              onClick={onCancel}
              size="sm"
              type="button"
              variant="secondary"
            >
              Cancel
            </Button>

            <Button size="sm" type="submit">
              Save
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
