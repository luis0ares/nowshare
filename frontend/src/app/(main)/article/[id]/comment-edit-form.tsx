"use client";

import { Button } from "@/components/ui/button";
import { IdType, EDIT_COMMENT } from "@/graphql/mutations";
import { GET_ARTICLE } from "@/graphql/query";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";

export function CommentEditForm({
  articleId,
  commentId,
  defaultContent,
  onSave,
  onCancel,
}: {
  articleId: string;
  commentId: string;
  defaultContent: string;
  onSave: () => void;
  onCancel: () => void;
}) {
  const [content, setContent] = useState<string>(defaultContent);

  const [updateComment] = useMutation<{
    updateComment: IdType;
  }>(EDIT_COMMENT, {
    refetchQueries: [
      { query: GET_ARTICLE, variables: { articleId: articleId } },
    ],
  });

  async function handleArticleComment() {
    if (content.trim()) {
      const { data } = await updateComment({
        variables: {
          commentId,
          content,
        },
        refetchQueries: [
          { query: GET_ARTICLE, variables: { articleId: articleId } },
        ],
      });
      if (data?.updateComment.id) onSave();
    }
  }

  return (
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
        <div className="space-x-3">
          <Button onClick={onCancel}>Cancel</Button>

          <Button
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
            onClick={handleArticleComment}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
