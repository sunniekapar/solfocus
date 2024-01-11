import { User } from 'firebase/auth'; //type User import

//IAuth context
export interface IAuth {
  user: User | null; //type User comes from firebase
  loading: boolean;
  SignIn: (creds: LoginFormValues, onError: (message: string) => void) => void;
  SignUp: (creds: UserFormValues, onError: (message: string) => void) => void;
  SignOut: () => void;
  ResetPassword: (creds: ResetPasswordFormValues, onError: (message: string) => void) => void;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface UserFormValues {
  email: string;
  password: string;
  displayName: string;
}

export interface ResetPasswordFormValues {
  email: string;
}

export interface TaskProps {
  id: number;
  completed: boolean;
  taskName: string;
  taskDescription?: string;
  taskLength?: string;
}