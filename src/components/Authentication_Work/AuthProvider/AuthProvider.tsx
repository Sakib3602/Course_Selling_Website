import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  type User,
  type UserCredential,
} from "firebase/auth";
import React, { createContext, useEffect, useState, type ReactNode } from "react";
import { auth } from "../firebase.init";

const Googleprovider = new GoogleAuthProvider();


interface AuthContextType {
  person: User | null;
  loading: boolean;
  creatPerson: (email: string, password: string) => Promise<UserCredential>;
  out: () => Promise<void>;
  SignNow: (email: string, password: string) => Promise<UserCredential>;
  GoogleS: () => Promise<UserCredential>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [person, setPerson] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const creatPerson = (email: string, password: string) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const SignNow = (email: string, password: string) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const GoogleS = () => {
    setLoading(true);
    return signInWithPopup(auth, Googleprovider);
  };

  const out = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setPerson(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const info: AuthContextType = {
    person,
    loading,
    creatPerson,
    out,
    SignNow,
    GoogleS,
  };

  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
};

export default AuthProvider;