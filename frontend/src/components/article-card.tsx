import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Calendar } from "lucide-react";
import Link from "next/link";

export function ArticleCard(post: {
  id: string;
  href: string
  title: string;
  date: string;
  categories: string[];
  author: { name: string; avatar?: string; fallback: string };
}) {
  return (
    <Link
      key={post.id}
      href={post.href}
      className="group flex flex-col space-y-3 rounded-lg border bg-card p-6 transition-all hover:shadow-md hover:border-emerald-500"
    >
      {/* Título */}
      <h2 className="text-2xl font-bold tracking-tight group-hover:text-emerald-600 transition-colors">
        {post.title}
      </h2>

      {/* Tags/Categoria */}
      <div className="flex items-center gap-2">
        {post.categories.map((category) => {
          return (
            <span key={category} className="text-sm font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              {category}
            </span>
          );
        })}
      </div>

      {/* Informações do autor e data */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={post.author.avatar || "/placeholder.svg"}
              alt={post.author.name}
            />
            <AvatarFallback>{post.author.fallback}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-foreground">
            {post.author.name}
          </span>
        </div>

        <span className="text-muted-foreground">•</span>

        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{post.date}</span>
        </div>
      </div>
    </Link>
  );
}
