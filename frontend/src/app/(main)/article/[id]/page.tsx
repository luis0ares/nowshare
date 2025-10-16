"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { getInitials, parseDate } from "@/lib/utils";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { UserShield } from "@/components/user-shield";
import { useMutation, useQuery } from "@apollo/client/react";
import { Article, GET_ARTICLE } from "@/graphql/query";
import { use, useState } from "react";
import { notFound } from "next/navigation";
import { IdType, POST_ARTICLE_COMMENT } from "@/graphql/mutations";
import { ArticleComment, CommentType } from "./article-comment";
import { CommentForm } from "./comment-form";

export default function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { data, error } = useQuery<{ article: Article }>(GET_ARTICLE, {
    variables: { articleId: id },
  });

  if (error) notFound();
  if (!data) return <></>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <article className="space-y-8">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
          {data.article.title}
        </h1>

        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={data.article.author.avatarUrl}
                alt="author avatar"
              />
              <AvatarFallback>
                {getInitials(data.article.author.username)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{data.article.author.username}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>
              {parseDate(data.article.createdAt, "yyyy-MM-dd, HH:mm:ss")}
            </span>
          </div>
        </div>

        <MarkdownRenderer content={data.article.content} className="" />

        <div className="space-y-12 border-t pt-8">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">
              Comments ({data.article.comments.length})
            </h3>

            <CommentForm articleId={data.article.id} />
          </div>

          <div className="space-y-6">
            {data.article.comments.map((comment) => {
              return <ArticleComment data={comment} key={comment.id} />;
            })}
          </div>
        </div>
      </article>
    </div>
  );
}
