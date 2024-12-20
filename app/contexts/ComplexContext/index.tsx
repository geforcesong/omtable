"use client";
import React, { createContext, PropsWithChildren } from "react";
import { initialState, State } from "./reducer";
import { ActionBase } from "./actions";
import CreateStore from "./store";

export interface TContext {
  state: State;
  dispatch: React.Dispatch<ActionBase>;
}

export const ComplexContext = createContext<TContext>({
  state: initialState,
  dispatch: () => undefined,
});

export const useComplexContext = () => {
  const context = React.useContext(ComplexContext);

  if (context === undefined) {
    throw new Error("ComplexContext must be used within a TestContextProvider");
  }

  return context;
};

const ComplexContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const store = CreateStore();
  return (
    <ComplexContext.Provider value={{ ...store }}>
      {children}
    </ComplexContext.Provider>
  );
};

export default ComplexContextProvider;
