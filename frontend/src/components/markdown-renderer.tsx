"use client";

import { cn } from "@/lib/utils";
import React from "react";
import ReactMarkdown from "react-markdown";
import rehypePrism from "rehype-prism-plus";
import "prismjs/themes/prism-tomorrow.css";

export function MarkdownRenderer({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  if (!content) return null;

  return (
    <div
      className={cn(
        "prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:leading-2 prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-h2:text-2xl prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400 prose-blockquote:border-l-4 prose-blockquote:border-gray-300 dark:prose-blockquote:border-gray-700 prose-blockquote:pl-4 prose-blockquote:italic prose-li:text-gray-700 dark:prose-li:text-gray-300 w-full text-justify",
        className
      )}
    >
      <ReactMarkdown rehypePlugins={[rehypePrism]}>{content}</ReactMarkdown>
    </div>
  );
}
