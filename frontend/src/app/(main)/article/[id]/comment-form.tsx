"use client";

import { Button } from "@/components/ui/button";
import { UserShield } from "@/components/user-shield";
import { IdType, POST_ARTICLE_COMMENT } from "@/graphql/mutations";
import { GET_ARTICLE } from "@/graphql/query";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";

export function CommentForm({ articleId }: { articleId: string }) {
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
    <UserShield>
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
  );
}
