import { getInitials, parseDate } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Calendar } from "lucide-react";
import Link from "next/link";

export function ArticleCard(article: {
  id: string;
  title: string;
  author: {
    username: string;
    avatarUrl?: string;
  };
  createdAt: string;
}) {
  return (
    <Link
      key={article.id}
      href={`/article/${article.id}`}
      className="group flex flex-col space-y-3 rounded-lg border bg-card p-6 transition-all hover:shadow-md hover:border-emerald-500"
    >
      <h2 className="text-2xl font-bold tracking-tight group-hover:text-emerald-600 transition-colors">
        {article.title}
      </h2>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 bg-slate-200 dark:bg-slate-800 flex items-center justify-center rounded-full">
            <AvatarImage
              src={article.author.avatarUrl}
              alt={article.author.username}
              className="rounded-full"
            />
            <AvatarFallback className="">
              {getInitials(article.author.username)}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-foreground">
            {article.author.username}
          </span>
        </div>

        <span className="text-muted-foreground">•</span>

        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{parseDate(article.createdAt, "yyyy-MM-dd, HH:mm:ss")}</span>
        </div>
      </div>
    </Link>
  );
}
