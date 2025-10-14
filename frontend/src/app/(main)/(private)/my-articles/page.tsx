"use client";

import { useState } from "react";
import { ArticleCard } from "@/components/article-card";
import { UserArticlesList, USER_LIST_ALL_ARTICLES } from "@/graphql/query";
import { useQuery } from "@apollo/client/react";
import { useUser } from "@/context/user-context";
import { ArticleSearch } from "@/components/article-search";
import { Button, LinkButton } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

export default function MyArticles() {
  const { user } = useUser();

  const [search, setSearch] = useState("");
  const { loading, data } = useQuery<{ articles: UserArticlesList }>(
    USER_LIST_ALL_ARTICLES,
    {
      variables: { authorId: user?.id },
    }
  );

  if (loading || !data) return null;

  const filteredArticles = data.articles.filter((article) =>
    article.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
          {`${user?.username}'s articles`}
        </h1>
        <ArticleSearch value={search} onChange={(v) => setSearch(v)} />
      </div>

      <div className="space-y-6">
        {filteredArticles.map((article) => (
          <div className="flex w-full space-x-4" key={article.id}>
            <ArticleCard {...article} />
            <div className="w-12 space-y-4 my-auto">
              <LinkButton
                className="bg-amber-400"
                title="Edit article"
                href={`/article/${article.id}/edit`}
              >
                <Edit />
              </LinkButton>
              <Button
                className="bg-red-400 cursor-pointer"
                title="Delete article"
              >
                <Trash2 />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
