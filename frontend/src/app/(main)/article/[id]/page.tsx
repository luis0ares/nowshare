"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { getInitials, parseDate, timeSince } from "@/lib/utils";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { UserShield } from "@/components/user-shield";
import { useMutation, useQuery } from "@apollo/client/react";
import { Article, GET_ARTICLE } from "@/graphql/query";
import { use, useRef, useState } from "react";
import { notFound } from "next/navigation";
import { IdType, POST_ARTICLE_COMMENT } from "@/graphql/mutations";

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

        <div className="space-y-6 border-t pt-8">
          <h3 className="text-2xl font-bold">
            Comments ({data.article.comments.length})
          </h3>

          <ArticleComments
            articleId={data.article.id}
            comments={data.article.comments}
          />
        </div>
      </article>
    </div>
  );
}

type CommentType = {
  id: string;
  createdAt: string;
  content: string;
  author: {
    username: string;
    avatarUrl: string;
    id: string;
  };
};

function ArticleComments({
  articleId,
  comments,
}: {
  articleId: string;
  comments: CommentType[];
}) {
  const [content, setContent] = useState<string>("");

  const [createComment, { data, loading, error }] = useMutation<{
    createComment: IdType;
  }>(POST_ARTICLE_COMMENT, {
    refetchQueries: [
      { query: GET_ARTICLE, variables: { articleId: articleId } },
    ],
  });

  async function handleArticleComment() {
    console.log(articleId);
    if (content.trim()) {
      const { data } = await createComment({
        variables: {
          articleId,
          content,
        },
        refetchQueries: [
          { query: GET_ARTICLE, variables: { articleId: articleId } },
        ],
      });
      if (data?.createComment.id) setContent("");
    }
  }

  return (
    <>
      <UserShield>
        {/* Form to post a new comment */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Post your comment</h4>
          <div className="space-y-3">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your comment here..."
              className="w-full min-h-[100px] p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                Be respectful and constructive in your comments
              </p>
              <Button
                className="bg-emerald-600 hover:bg-emerald-700"
                onClick={handleArticleComment}
              >
                Submit comment
              </Button>
            </div>
          </div>
        </div>
      </UserShield>

      {/* Comments listing */}
      <div className="space-y-6">
        {comments.map((comment) => {
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
                  <h5 className="font-semibold">{comment.author.username}</h5>
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
    </>
  );
}
