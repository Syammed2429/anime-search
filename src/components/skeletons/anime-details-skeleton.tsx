import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const AnimeDetailsSkeleton = () => {
  return (
    <div className='container mx-auto py-4 sm:py-8 px-3 sm:px-4'>
      <div className='flex justify-between items-center mb-4 sm:mb-6'>
        <Skeleton className='h-8 w-1/2' />
        <Skeleton className='h-9 w-20' />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-[minmax(200px,300px)_1fr] gap-4 sm:gap-6 md:gap-8'>
        {/* Left column - Poster and info */}
        <div>
          <div className='relative aspect-[3/4] w-full overflow-hidden rounded-lg'>
            <Skeleton className='absolute inset-0' />
          </div>

          <div className='mt-3 sm:mt-4 space-y-2 sm:space-y-3'>
            <Skeleton className='h-5 w-3/4' />
            <div>
              <Skeleton className='h-4 w-1/2 mb-1' />
              <Skeleton className='h-4 w-2/3' />
            </div>
            <div className='grid grid-cols-2 sm:block gap-1'>
              <Skeleton className='h-4 w-full mb-1' />
              <Skeleton className='h-4 w-full mb-1' />
              <Skeleton className='h-4 w-full mb-1' />
              <Skeleton className='h-4 w-full' />
            </div>
          </div>
        </div>

        {/* Right column - Details */}
        <div className='space-y-4 sm:space-y-6'>
          <div>
            <Skeleton className='h-6 w-3/4 mb-2' />
            <Skeleton className='h-4 w-1/2 mb-4' />
            <div className='space-y-2'>
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-3/4' />
            </div>
          </div>

          <div>
            <Skeleton className='h-5 w-24 mb-2' />
            <div className='flex flex-wrap gap-1 sm:gap-2'>
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className='h-6 w-16 rounded-full' />
              ))}
            </div>
          </div>

          <div>
            <Skeleton className='h-5 w-24 mb-2' />
            <div className='flex flex-wrap gap-1 sm:gap-2'>
              {[1, 2].map((i) => (
                <Skeleton key={i} className='h-6 w-20 rounded-full' />
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <Skeleton className='h-6 w-40 mb-4' />
            <div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4'>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className='overflow-hidden'>
                  <div className='flex h-16 sm:h-24'>
                    <div className='relative w-12 sm:w-20 h-full overflow-hidden'>
                      <Skeleton className='absolute inset-0' />
                    </div>
                    <CardContent className='p-2 sm:p-3 flex-1'>
                      <Skeleton className='h-4 w-full mb-1' />
                      <Skeleton className='h-4 w-2/3' />
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
