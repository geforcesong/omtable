"use client";
import { UserContextProvider } from "@/app/contexts/SimpleContext";
import ContextTest from "./ContextTest";

export default function SimpleContext() {
  return (
    <UserContextProvider>
      <ContextTest />
    </UserContextProvider>
  );
}
