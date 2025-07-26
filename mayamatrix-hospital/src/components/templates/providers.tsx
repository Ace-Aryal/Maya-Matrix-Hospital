// a wrapper component consisting of all the providers to wrap the app
"use client";
import React, { createContext, useContext, useState } from "react";
type TAuthContext = {
  isLoggedIn: boolean;
  username: string | null;
  roles: string[] | null;
};
const AuthContext = createContext<TAuthContext | undefined>(undefined);

function Providers({ children }: { children: React.ReactNode }) {
  const [authData, setAuthData] = useState<TAuthContext>({
    isLoggedIn: false,
    username: null,
    roles: null,
  });
  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
}
// custom hook for context to throw error if context is used outside the provider
export const useMyContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useMyContext must be used within MyProvider");
  }
  return context;
};

export default Providers;
