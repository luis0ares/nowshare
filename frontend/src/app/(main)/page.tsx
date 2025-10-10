"use client";

import { useState } from "react";
import { ArticleCard } from "@/components/article-card";
import { ArticlesList, LIST_ALL_ARTICLES } from "@/graphql/query";
import { useQuery } from "@apollo/client/react";
import { ArticleSearch } from "@/components/article-search";

export default function Home() {
  const [search, setSearch] = useState("");
  const { loading, data } = useQuery<{ articles: ArticlesList }>(
    LIST_ALL_ARTICLES
  );

  if (loading || !data) return <></>;

  const filteredArticles = data.articles.filter((article) =>
    article.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl space-y-12">
      <div className="space-y-4">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            Welcome to NowShare
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Discover and share insights, tips, and stories about technology,
            development, design, and more.
          </p>
        </div>
        <ArticleSearch value={search} onChange={(v) => setSearch(v)} />
      </div>

      <div className="space-y-6">
        {filteredArticles.map((article) => (
          <ArticleCard {...article} key={article.id} />
        ))}
      </div>
    </div>
  );
}
