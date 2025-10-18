// import { useUser } from "@/context/user-context";
import { redirect } from "next/navigation";

export default async function AuthCallbackPage({
  searchParams,
}: {
  searchParams: Promise<{ state: string }>;
}) {
  const { state } = await searchParams;
  // const { refetchUser } = useUser();

  if (state) redirect(state);
  else redirect("/");
}
