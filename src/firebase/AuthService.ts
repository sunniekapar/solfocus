import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, setPersistence, browserLocalPersistence, updateProfile, sendPasswordResetEmail, sendEmailVerification } from "firebase/auth";
import {firebaseAuth} from './BaseConfig';
import { LoginFormValues, ResetPasswordFormValues, UserFormValues } from "@/interfaces";

setPersistence(firebaseAuth, browserLocalPersistence);

//Sign in functionality
export const SignInService = async ({email, password} : LoginFormValues) => {
  const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
  const user = userCredential.user;

  if (!user.emailVerified) throw new Error("Email not verified. Please check your inbox.");
  
  return user;
};
 
 //Sign up functionality
 export const SignUpService = async ({email, password, displayName} : UserFormValues) => {
  const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
  const user = userCredential.user;
  await updateProfile(user, {displayName: displayName});
  await sendEmailVerification(user);
  //* Sign out the user since Firebase automatically signs in the user after signing up
  await signOut(firebaseAuth);

  return user;
};

//Reset Password functionality
 export const ResetPasswordService = async ({email} : ResetPasswordFormValues) => {
  await sendPasswordResetEmail(firebaseAuth, email);
};
 
 //Sign out functionality
 export const  SignOutService  =  async () => {
  await  signOut(firebaseAuth);
 };