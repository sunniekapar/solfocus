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

interface ResetPasswordFormProps {
  onResetPassword: (values: z.infer<typeof ResetPasswordFormSchema>) => void;
  onBackToLogin: () => void; // Callback to switch back to the login form
}

export const ResetPasswordFormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});

export default function ResetPasswordPage({
  onResetPassword,
  onBackToLogin,
}: ResetPasswordFormProps) {
  const form = useForm<z.infer<typeof ResetPasswordFormSchema>>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      email: '',
    },
  });

  const handleSubmit = (data: any) => {
    onResetPassword(data);
    form.reset();
  };

  return (
    <>
      <h2 className="text-2xl font-bold">Reset password</h2>
      <p className="text-sm opacity-75">
        Enter your email to reset your password
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
          <DialogFooter className="mt-4">
            <Button className="w-full" type="submit">
              Reset Password
            </Button>
          </DialogFooter>

          <div className="flex items-center text-sm">
            <p>Remember your account?</p>
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
  );
}
