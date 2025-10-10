import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Heart, MessageSquare, Share2 } from "lucide-react";
import { getInitials, parseDate, timeSince } from "@/lib/utils";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { UserShield } from "@/components/user-shield";

type ArticleType = {
  id: string;
  title: string;
  content: string;
  tags?: string[];
  author: {
    id: string;
    username: string;
    avatarUrl: string;
  };
  comments: {
    id: string;
    content: string;
    createdAt: string;
    author: {
      id: string;
      username: string;
      avatarUrl: string;
    };
  }[];
  createdAt: string;
};

export default function ArticlePage() {
  const data: ArticleType = {
    id: "1",
    title: "Getting Started with TypeScript",
    content: `# Introduction

  TypeScript is a **typed superset** of JavaScript that compiles to plain JavaScript.  
  It adds _static typing_, which helps developers catch errors earlier.

  ## Example

  Here’s a simple function in TypeScript:

  \`\`\`ts
  function greet(name: string): string {
    return \`Hello, \${name}!\`;
  }

  console.log(greet("World"));
  \`\`\`

  ## Benefits

  - Safer code
  - Better tooling support (IntelliSense, autocompletion)
  - Easier refactoring

  > "JavaScript that scales." – TypeScript slogan
  `,
    tags: ["typescript", "javascript", "programming"],
    author: {
      id: "a1",
      username: "devUser",
      avatarUrl: "https://example.com/avatar1.png",
    },
    comments: [
      {
        id: "c1",
        content: "Great article! Helped me a lot.",
        createdAt: "2025-10-02T10:00:00.000Z",
        author: {
          id: "u2",
          username: "reader123",
          avatarUrl: "https://example.com/avatar2.png",
        },
      },
      {
        id: "c2",
        content: "Thanks for sharing, I was struggling with types.",
        createdAt: "2025-10-02T12:00:00.000Z",
        author: {
          id: "u3",
          username: "techFan",
          avatarUrl: "https://example.com/avatar3.png",
        },
      },
    ],
    createdAt: "2025-10-02T09:00:00.000Z",
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <article className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-muted-foreground gap-4 ml-auto">
            {/* <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>5 min to read</span>
            </div> */}
          </div>
        </div>

        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
          {data.title}
        </h1>

        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={data.author.avatarUrl} alt="author avatar" />
              <AvatarFallback>
                {getInitials(data.author.username)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{data.author.username}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{parseDate(data.createdAt, "dd/mm/yyyy, hh:mm:ss")}</span>
          </div>
        </div>

        <MarkdownRenderer content={data.content} className="" />

        <div className="flex flex-wrap gap-2">
          {data.tags?.map((tag) => {
            return (
              <Badge key={tag} variant="outline" className="rounded-full px-3">
                {tag}
              </Badge>
            );
          })}
        </div>

        <div className="space-y-6 border-t pt-8">
          <h3 className="text-2xl font-bold">
            Comments ({data.comments.length})
          </h3>

          <UserShield>
            {/* Form to post a new comment */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Post your comment</h4>
              <div className="space-y-3">
                <textarea
                  placeholder="Write your comment here..."
                  className="w-full min-h-[100px] p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    Be respectful and constructive in your comments
                  </p>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    Submit comment
                  </Button>
                </div>
              </div>
            </div>
          </UserShield>

          {/* Comments listing */}
          <div className="space-y-6">
            {data.comments.map((comment) => {
              return (
                <div className="flex gap-4" key={comment.id}>
                  <Avatar className="h-10 w-10 flex-shrink-0">
                    <AvatarImage
                      src={comment.author.avatarUrl}
                      alt={`${comment.author.username} avatar`}
                    />
                    <AvatarFallback>
                      {getInitials(comment.author.username)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h5 className="font-semibold">
                        {comment.author.username}
                      </h5>
                      <span className="text-sm text-muted-foreground">
                        {timeSince(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      {comment.content}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </article>
    </div>
  );
}
