import { redirect } from "next/navigation";

export default async function AuthCallbackPage({
  searchParams,
}: {
  searchParams: Promise<{ state: string }>;
}) {
  const { state } = await searchParams;
  console.log("OAuth callback state:", state);

  if (state) redirect(state);
  else redirect("/");
}
