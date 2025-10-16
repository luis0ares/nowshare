"use client";

import { User } from "@/graphql/query";
import { createContext, useContext } from "react";

type UserContextType = {
  user: User | null;
  loading: boolean | null;
  refetchUser: () => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  loading: null,
  refetchUser: () => {},
  logout: () => {},
});

export const useUser = () => useContext(UserContext);

export default UserContext;
