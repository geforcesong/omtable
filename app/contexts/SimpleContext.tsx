import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  PropsWithChildren,
} from "react";

interface User {
  name: string;
  age: number;
}

interface UserContextType {
  user: User;
  setName: Dispatch<SetStateAction<string>>;
  setAge: Dispatch<SetStateAction<number>>;
}

const UserContext = createContext<UserContextType | null>(null);

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("UserContext must be used within a UserContextProvider");
  }
  return context;
};

export const UserContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>(0);

  const value: UserContextType = {
    user: { name, age },
    setName,
    setAge,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
