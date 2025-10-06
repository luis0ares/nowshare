import { useUser } from "@/context/user-context";
import React from "react";

type Props = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export const UserShield: React.FC<Props> = ({ children, fallback = null }) => {
  const { user } = useUser();

  if (user === null) return <>{fallback}</>;
  return <>{children}</>;
};
