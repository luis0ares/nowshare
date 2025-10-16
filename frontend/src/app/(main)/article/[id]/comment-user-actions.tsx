"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DELETE_COMMENT } from "@/graphql/mutations";
import { GET_ARTICLE } from "@/graphql/query";
import { useMutation } from "@apollo/client/react";
import { Edit, EllipsisVertical, Trash2 } from "lucide-react";
import { useState } from "react";

export function UserCommentActions({
  articleId,
  commentId,
  onEdit,
}: {
  articleId: string;
  commentId: string;
  onEdit: () => void;
}) {
  const [open, setOpen] = useState(false);

  const [deleteComment] = useMutation(DELETE_COMMENT, {
    refetchQueries: [
      { query: GET_ARTICLE, variables: { articleId: articleId } },
    ],
  });

  async function handleDelete() {
    await deleteComment({ variables: { commentId } });
  }

  return (
    <>
      <AlertDialog open={open} onOpenChange={(value) => setOpen(value)}>
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
            <AlertDialogAction onClick={handleDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="link">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-24">
          <DropdownMenuItem onClick={onEdit}>
            <Edit className="mr-2 h-4 w-4 text-amber-400" />
            <span>Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4 text-red-400" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
