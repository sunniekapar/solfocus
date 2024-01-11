import {
  IAuth,
  LoginFormValues,
  ResetPasswordFormValues,
  UserFormValues,
} from '@/interfaces';
import { firebaseAuth } from '../firebase/BaseConfig';
import { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import {
  SignUpService,
  SignInService,
  SignOutService,
  ResetPasswordService,
} from '../firebase/AuthService';
import Spinner from '@/components/spinner';

export const AuthContext = createContext<IAuth>({
  user: firebaseAuth.currentUser,
  loading: false,
  SignIn: () => {},
  SignUp: () => {},
  SignOut: () => {},
  ResetPassword: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

  //Sign up
  const SignUp = async (creds: UserFormValues, onError: (message: string) => void) => {
    setIsLoading(true);
    try {
      await SignUpService(creds);
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Email already in use');
      } else {
        console.error('Error during sign up:', error);
        alert('Error during sign up.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Modified SignIn function
  const SignIn = async (
    creds: LoginFormValues,
    onError: (message: string) => void
  ) => {
    setIsLoading(true);
    try {
      const user = await SignInService(creds);
      if (user) setCurrentUser(user);
      else onError('User not found');
    } catch (error: any) {
      console.error('Error', error);
      onError(error.message || 'An error occurred during sign in');
    } finally {
      setIsLoading(false);
    }
  };

  // Corrected SignOut function
  const SignOut = async () => {
    setIsLoading(true);
    try {
      await SignOutService();
      setCurrentUser(null);
    } catch (error) {}
  };

  const ResetPassword = async (creds: ResetPasswordFormValues, onError: (message: string) => void) => {
    setIsLoading(true);
    try {
      await ResetPasswordService(creds);
    } catch (error: any) {
      console.error('Error sending password reset email:', error);
      onError(error.message || 'An error occurred while reseting your password');
    } finally {
      setIsLoading(false);
    }
  };

  //create Auth Values
  const authValues: IAuth = {
    user: currentUser,
    loading: isLoading,
    SignIn: SignIn,
    SignUp: SignUp,
    SignOut: SignOut,
    ResetPassword: ResetPassword,
  };

  useEffect(() => {
    //onAuthStateChanged check if the user is still logged in or not
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setCurrentUser(user);
      setIsAuthLoading(false);
    });
    return unsubscribe;
  }, []);

  //If loading for the first time when visiting the page
  if (isAuthLoading) return <Spinner />;

  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
