"use client";

import { useState } from "react";
import { ArticleCard } from "@/components/article-card";
import {
  UserArticlesList,
  USER_LIST_ALL_ARTICLES,
  GET_ARTICLE,
  LIST_ALL_ARTICLES,
} from "@/graphql/query";
import { useMutation, useQuery } from "@apollo/client/react";
import { useUser } from "@/context/user-context";
import { ArticleSearch } from "@/components/article-search";
import { Button, LinkButton } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { DELETE_ARTICLE } from "@/graphql/mutations";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function MyArticles() {
  const { user } = useUser();
  if (!user) return null;

  const [search, setSearch] = useState("");
  const { loading, data } = useQuery<{ articles: UserArticlesList }>(
    USER_LIST_ALL_ARTICLES,
    {
      variables: { authorId: user.id },
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
          {`${user.username}'s articles`}
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
              <ArticleDelete authorId={user.id} articleId={article.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArticleDelete({
  authorId,
  articleId,
}: {
  authorId: string;
  articleId: string;
}) {
  const [deleteArticle, { data, loading, error }] = useMutation(
    DELETE_ARTICLE,
    {
      refetchQueries: [
        { query: GET_ARTICLE, variables: { articleId: articleId } },
        { query: USER_LIST_ALL_ARTICLES, variables: { authorId: authorId } },
        { query: LIST_ALL_ARTICLES },
      ],
    }
  );

  async function handleDelete() {
    await deleteArticle({ variables: { articleId } });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-red-400 cursor-pointer" title="Delete article">
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            article.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
