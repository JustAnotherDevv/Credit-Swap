import { createContext, useContext, useState, ReactNode } from "react";

type Role = "AH" | "PB";

interface UserContextType {
  userRole: Role;
  setUserRole: (role: Role) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userRole, setUserRole] = useState<Role>("PB");

  return (
    <UserContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
