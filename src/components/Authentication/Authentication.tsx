import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import LogInPage from './components/LogIn';
import SignUpPage from './components/SignUp';
import PasswordResetPage from './components/PasswordReset';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';

export enum AuthForm {
  LoginPage,
  SignUpPage,
  PasswordResetPage,
}

interface AuthenticationProps {
  dialogOpen: boolean;
  dialogClose: () => void;
}

export default function Authentication({
  dialogOpen,
  dialogClose,
}: AuthenticationProps) {
  const [error, setError] = useState('');
  const [currentForm, setCurrentForm] = useState<AuthForm>(AuthForm.LoginPage);

  const { SignIn, SignUp, ResetPassword } = useAuth();

  const handleLogIn = (creds: any) => {
    SignIn(creds, (errorMessage) => setError(errorMessage));
    dialogClose();
  };

  const handleSignUp = (creds: any) => {
    SignUp(creds, (errorMessage) => setError(errorMessage));
  };

  const handlePasswordReset = (creds: any) => {
    ResetPassword(creds, (errorMessage) => setError(errorMessage));
  };

  const closeErrorDialog = () => setError(''); // Reset error state

  let formContent;
  switch (currentForm) {
    case AuthForm.SignUpPage:
      formContent = (
        <SignUpPage
          onBackToLogin={() => setCurrentForm(AuthForm.LoginPage)}
          onSignUp={handleSignUp}
        />
      );
      break;
    case AuthForm.PasswordResetPage:
      formContent = (
        <PasswordResetPage
          onResetPassword={handlePasswordReset}
          onBackToLogin={() => setCurrentForm(AuthForm.LoginPage)}
        />
      );
      break;
    default:
      formContent = (
        <LogInPage
          onLogIn={handleLogIn}
          onSignUp={() => setCurrentForm(AuthForm.SignUpPage)}
          onPasswordReset={() => setCurrentForm(AuthForm.PasswordResetPage)}
        />
      );
  }

  return (
    <>
      <AlertDialog open={!!error}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Error</AlertDialogTitle>
            <AlertDialogDescription>{error}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={closeErrorDialog}>
              Close
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Dialog open={dialogOpen} onOpenChange={dialogClose}>
        <DialogContent>
          <DialogHeader></DialogHeader>
          {formContent}
        </DialogContent>
      </Dialog>
    </>
  );
}
