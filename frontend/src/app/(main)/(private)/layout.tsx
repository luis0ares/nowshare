"use client"

import { useUser } from "@/context/user-context";
import { redirect } from "next/navigation";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();

  if (user == null)
    redirect("/")

  return <>{children}</>;
}
