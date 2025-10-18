// app/(private)/layout.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Read cookies on the server
  const cookieStore = await cookies();
  const token = cookieStore.get("__refresh")?.value;

  // If no token, redirect to homepage
  if (!token) {
    redirect("/");
  }

  // Otherwise, allow rendering
  return <>{children}</>;
}
