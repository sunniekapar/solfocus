import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
import { DialogFooter } from '@/components/ui/dialog';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

interface SignUpFormProps {
  onSignUp: (values: z.infer<typeof SignUpFormSchema>) => void;
  onBackToLogin: () => void;
}

export const SignUpFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be 8 characters long' }),
  confirmPassword: z
    .string()
    .min(8, { message: 'Confirm password is required' }),
});

export default function SignUpPage({
  onSignUp,
  onBackToLogin,
}: SignUpFormProps) {
  const { user } = useAuth();
  const [signedUp, setSignedUp] = useState(!!user);
  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleSubmit = (data: any) => {
    if (data.password !== data.confirmPassword) {
      form.setError('confirmPassword', {
        type: 'manual',
        message: 'Passwords do not match',
      });
      return;
    }

    onSignUp(data);
    setSignedUp(true);
    form.reset();
  };

  return (
    <>
      {signedUp ? (
        <div className="px-4 py-8 text-center">
          <h2 className="mb-2 text-2xl font-semibold">
            Thank you for signing up!
          </h2>
          <p className="mb-8">
            Check your email inbox for further instructions on setting up your
            account
          </p>
          <Button onClick={onBackToLogin}>Back to log in</Button>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold">Sign up</h2>
          <p className="text-sm opacity-75">
            Enter your name and email below to sign up for your account
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-3"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="mt-4">
                <Button className="w-full mt-3" type="submit">
                  Sign Up
                </Button>
              </DialogFooter>
              <div className="flex items-center text-sm">
                <p>Already have an account?</p>
                <Button
                  className="p-0 ml-1 font-semibold"
                  variant="link"
                  type="button"
                  onClick={onBackToLogin}
                >
                  Log in
                </Button>
              </div>
            </form>
          </Form>
        </>
      )}
    </>
  );
}
