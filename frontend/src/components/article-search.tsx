"use client";

import { Plus } from "lucide-react";
import { LinkButton } from "./ui/button";
import { UserShield } from "./user-shield";
import { Input } from "./ui/input";

export function ArticleSearch(props: {
  value: string;
  onChange: (newValue: string) => void;
}) {
  return (
    <>
      <div className="flex gap-5 ">
        <Input
          type="text"
          placeholder="Search by title..."
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
        />
        <UserShield>
          <LinkButton href="/create-article" prefetch={false}>
            <Plus />
            Create New Article
          </LinkButton>
        </UserShield>
      </div>
    </>
  );
}
