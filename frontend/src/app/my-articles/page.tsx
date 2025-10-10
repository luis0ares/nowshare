"use client";

import { useState } from "react";
import { ArticleCard } from "@/components/article-card";
import { UserArticlesList, USER_LIST_ALL_ARTICLES } from "@/graphql/query";
import { useQuery } from "@apollo/client/react";
import { useUser } from "@/context/user-context";
import { useRouter } from "next/navigation";

export default function MyArticles() {
  const router = useRouter();
  const { user } = useUser();

  if (!user) {
    router.push("/");
    return <></>;
  }

  const [search, setSearch] = useState("");
  const { loading, data } = useQuery<{ articles: UserArticlesList }>(
    USER_LIST_ALL_ARTICLES,
    {
      variables: {
        authorId: user.id,
      },
    }
  );

  if (loading || !data) return <></>;

  const filteredArticles = data.articles.filter((article) =>
    article.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-12 w-full px-3 py-2 border rounded"
      />
      <div className="space-y-6">
        {filteredArticles.map((article) => (
          <ArticleCard {...article} key={article.id} />
        ))}
      </div>
    </div>
  );
}
