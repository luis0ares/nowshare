import { useUser } from "@/context/user-context";
import React from "react";
import { Button } from "./ui/button";

export function OauthLoginButton({
  path,
  children,
}: {
  path: string;
  children: React.ReactNode;
}) {
  const { refetchUser } = useUser();

  const openOAuthPopup = () => {
    const popup = window.open(
      `${process.env.NEXT_PUBLIC_BASE_URL}${path}`,
      "oauth-login",
      "width=600,height=700"
    );

    if (!popup) return;

    const handleMessage = (event: MessageEvent) => {
      // Garantir que vem do mesmo domínio do frontend
      if (event.origin !== window.location.origin) return;

      if (event.data.type === "OAUTH_SUCCESS") {
        refetchUser();
      } else if (event.data.type === "OAUTH_ERROR") {
      }

      window.removeEventListener("message", handleMessage);
      popup.close();
    };

    window.addEventListener("message", handleMessage);
  };

  return (
    <Button
      onClick={openOAuthPopup}
      variant="outline"
      className="bg-transparent text-base cursor-pointer"
      size="lg"
    >
      {children}
    </Button>
  );
}
