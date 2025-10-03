import { cn } from "@/lib/utils";
import React from "react";
import ReactMarkdown from "react-markdown";

export function MarkdownRenderer({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  return (
    <div className={cn("prose dark:prose-invert w-full", className)}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
