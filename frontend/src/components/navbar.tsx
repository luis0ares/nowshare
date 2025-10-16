"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, FileText, PenTool, Github } from "lucide-react";
import { getInitials } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { OauthLoginButton } from "./oauth-button";
import { useUser } from "@/context/user-context";
import { UserShield } from "./user-shield";

function UserProfile() {
  const { logout, user } = useUser();

  async function handleLogout() {
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/auth/logout");
    if (res.status === 200) {
      logout();
    }
  }

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative h-10 w-10 rounded-full ring-offset-background transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatarUrl} alt="User avatar" />
            <AvatarFallback>{getInitials(user.username)}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-auto" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.username}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/my-articles" className="cursor-pointer">
            <FileText className="mr-2 h-4 w-4" />
            <span>My Articles</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <button onClick={handleLogout} className="cursor-pointer w-full">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log-out</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen items-center">
        <div className="mr-4 flex flex-1 items-center justify-between px-2">
          <Link
            href="/"
            className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-500"
          >
            <PenTool className="w-9 h-9" />
            <span className="font-bold text-2xl">NowShare</span>
          </Link>

          <div className="flex gap-4 items-center">
            <ThemeToggle />
            <UserShield
              fallback={
                <OauthLoginButton path="/auth/github/login">
                  <Github className="mr-2 w-9 h-9" />
                  Sign In with GitHub
                </OauthLoginButton>
              }
            >
              <UserProfile />
            </UserShield>
          </div>
        </div>
      </div>
    </nav>
  );
}
