import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials, timeSince } from "@/lib/utils";
import { EllipsisVertical } from "lucide-react";
import { UserCommentActions } from "./comment-user-actions";
import { UserShield } from "@/components/user-shield";

export type CommentType = {
  id: string;
  createdAt: string;
  content: string;
  author: {
    username: string;
    avatarUrl: string;
    id: string;
  };
};

export function ArticleComment({ data }: { data: CommentType }) {
  return (
    <div className="flex gap-4" key={data.id}>
      <Avatar className="h-10 w-10 flex-shrink-0">
        <AvatarImage
          src={data.author.avatarUrl}
          alt={`${data.author.username} avatar`}
        />
        <AvatarFallback>{getInitials(data.author.username)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-2">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <h5 className="font-semibold">{data.author.username}</h5>
            <span className="text-sm text-muted-foreground">
              {timeSince(data.createdAt)}
            </span>
          </div>
          <UserShield>
            <UserCommentActions commentId={data.id} />
          </UserShield>
        </div>
        <p className="text-gray-700 dark:text-gray-300">{data.content}</p>
      </div>
    </div>
  );
}
