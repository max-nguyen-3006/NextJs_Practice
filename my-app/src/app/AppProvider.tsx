"use client";
import { clientSessionToken } from "@/lib/http";
import { createContext, useState } from "react";

const AppContext = createContext({
  // sessionToken: "",
  // setSessionToken: (sessionToken: string) => {},
});
// export const useAppContext = () => {
//   const context = useContext(AppContext);
//   if (!context) {
//     throw new Error("useAppContext must be used within a AppProvider");
//   }
//   return context;
// };

export default function AppProvider({
  children,
  initialSessionToken = "",
}: {
  children: React.ReactNode;
  initialSessionToken?: string;
}) {
  useState(() => {
    console.log("AppProvider");
    if (typeof window !== "undefined") {
      clientSessionToken.value = initialSessionToken;
    }
  });
  return <>{children}</>;
}
