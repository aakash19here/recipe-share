import Link from "next/link";

import { formatDate } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { recipes } from "@/lib/db/schema/recipe";

interface RecipeItemProps {
  post: Pick<typeof recipes.$inferSelect, "id" | "name" | "createdAt">;
}

export function RecipeItem({ post }: RecipeItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/editor/${post.id}`}
          className="font-semibold hover:underline"
        >
          {post.name}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {formatDate(post.createdAt.toDateString())}
          </p>
        </div>
      </div>
    </div>
  );
}

RecipeItem.Skeleton = function PostItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
};
