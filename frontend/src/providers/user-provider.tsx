"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useLazyQuery } from "@apollo/client/react";
import UserContext from "@/context/user-context";
import { GET_ME, User } from "@/graphql/query";

type Props = {
  children: React.ReactNode;
};

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [getUser, { data, loading }] = useLazyQuery<{ me: User }>(
    GET_ME,
    { fetchPolicy: "network-only" } // always check fresh user info
  );

  const refetchUser = useCallback(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    refetchUser(); // fetch on mount
  }, [refetchUser]);

  useEffect(() => {
    if (data?.me) setUser(data.me);
    else setUser(null);
  }, [data, loading]);

  function logout() {
    setUser(null);
  }

  return (
    <UserContext.Provider value={{ user, loading, refetchUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
