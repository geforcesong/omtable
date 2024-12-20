"use client";

import ComplexContextProvider from "@/app/contexts/ComplexContext";
import ComplexContextTest from "./ComplexContextTest";

export default function ComplexContext() {
  return (
    <ComplexContextProvider>
      <ComplexContextTest />
    </ComplexContextProvider>
  );
}
