import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export const AnimeCardSkeleton = () => {
  return (
    <Card className='h-full overflow-hidden'>
      <div className='relative aspect-[3/4] w-full overflow-hidden'>
        <Skeleton className='absolute inset-0' />
      </div>
      <CardContent className='p-3 sm:p-4'>
        <Skeleton className='h-5 w-3/4 mb-2' />
        <Skeleton className='h-4 w-1/2' />
      </CardContent>
      <CardFooter className='p-3 sm:p-4 pt-0'>
        <Skeleton className='h-4 w-full' />
      </CardFooter>
    </Card>
  );
};
