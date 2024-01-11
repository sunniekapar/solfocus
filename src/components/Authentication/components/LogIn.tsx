import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface LogInFormProps {
  onLogIn: (values: z.infer<typeof LogInFormSchema>) => void;
  onSignUp: () => void;
  onPasswordReset: () => void;
}

export const LogInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: 'Password must be 8 characters long',
  }),
});

export default function LogInPage({
  onLogIn,
  onSignUp,
  onPasswordReset,
}: LogInFormProps) {
  
  const form = useForm<z.infer<typeof LogInFormSchema>>({
    resolver: zodResolver(LogInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = (creds: any) => {
    form.reset();
    onLogIn(creds);
  };

  return (
    <>
      
      <h2 className="text-2xl font-bold">Sign in</h2>
      <p className="text-sm opacity-75">
        Enter your email below to sign into your account
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Button
              className="px-0 font-semibold"
              variant="link"
              size="sm"
              type="button"
              onClick={onPasswordReset}
            >
              Forgot Password?
            </Button>
          </div>
          <DialogFooter className="mt-4">
            <Button className="w-full" type="submit">
              Log in
            </Button>
          </DialogFooter>
          <div className="flex items-center text-sm">
            <p>Don't have an account?</p>
            <Button
              className="p-0 ml-1 font-semibold"
              variant="link"
              type="button"
              onClick={onSignUp}
            >
              Sign up
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
