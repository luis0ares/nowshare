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
import { LogOut, Settings, User, FileText } from "lucide-react";

function getInitials(username: string): string {
  const parts = username.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) return "";

  if (parts.length === 1) {
    return parts[0][0].toUpperCase();
  }

  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function UserProfile(props: {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative h-8 w-8 rounded-full ring-offset-background transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={props.avatar} alt="User avatar" />
            <AvatarFallback>{getInitials(props.name)}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{props.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {props.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/my-posts" className="cursor-pointer">
            <FileText className="mr-2 h-4 w-4" />
            <span>My Articles</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log-out</span>
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
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl text-emerald-600">NowShare</span>
          </Link>

          <UserProfile id="abc" name="Jhon Doe" email="jhon.doe@user.com" />
        </div>
      </div>
    </nav>
  );
}
