import { Avatar } from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonCardContent = () => {
  return (
    <div className="grid gap-4">
      {Array.from({ length: 2 }).map((_, index) => (
        <Card className="py-3 gap-2" key={index}>
          <CardHeader className="px-3">
            <div className="flex items-center gap-4">
              <Avatar>
                <Skeleton className="size-10 rounded-full" />
              </Avatar>
              <Skeleton className="w-24 h-4" />
            </div>
          </CardHeader>
          <CardContent className="grid gap-2 px-3">
            <Skeleton className="aspect-video rounded-lg" />
            <CardTitle className="text-lg font-bold my-2 h-[3em] overflow-hidden text-ellipsis line-clamp-2">
              <Skeleton className="w-full h-27" />
            </CardTitle>
          </CardContent>
          <CardFooter className="justify-between px-3 py-2">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-1 text-muted-foreground font-bold">
                <Skeleton className="w-12 h-4" />
              </div>
              <div className="flex items-center gap-1 text-muted-foreground font-bold">
                <Skeleton className="w-12 h-4" />
              </div>
            </div>
            <CardAction className="h-full flex items-center gap-2 font-bold text-xl text-primary">
              <Skeleton className="w-24 h-4" />
            </CardAction>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
