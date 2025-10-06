import React, { createContext, useContext } from "react";

export type User = {
  id: string;
  username: string;
  avatarUrl?: string;
};

type UserContextType = {
  user: User | null;
  loading: boolean | null;
  refetchUser: () => void;
  logout: () => void
};

const UserContext = createContext<UserContextType>({
  user: null,
  loading: null,
  refetchUser: () => {},
  logout: () => {}
});

export const useUser = () => useContext(UserContext);

export default UserContext;
