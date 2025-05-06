import type React from "react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Search, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimeCardSkeleton } from "@/components/skeletons/anime-card-skelton";
import { AnimeCard } from "@/components/cards/AnimeCard";
import { useSearchAnime } from "@/hooks/use-anime";
import { useMobile } from "@/hooks/use-mobile";
import { useDebounce } from "@/hooks/use-debounce";
import { Pagination } from "@/components/Search/Pagination";

export const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const debouncedSearchTerm = useDebounce(searchTerm, 250);
  const isMobile = useMobile();

  const { data, isLoading, isError, error } = useSearchAnime(
    debouncedSearchTerm,
    page,
    pageSize
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to first page on new search
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPage(1); // Reset to first page when changing page size
  };

  const totalPages = data?.pagination?.last_visible_page || 1;

  // Reset to page 1 when window is resized to avoid pagination issues
  useEffect(() => {
    const handleResize = () => {
      if (page > 1) setPage(1);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [page]);

  // Generate skeleton cards based on current page size
  const renderSkeletons = () => {
    return Array(pageSize)
      .fill(0)
      .map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className='animate-fade-in'
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <AnimeCardSkeleton />
        </div>
      ));
  };

  return (
    <motion.div
      className='container mx-auto py-4 sm:py-6 md:py-8 px-3 sm:px-4'
      transition={{ duration: 0.3 }}
    >
      <div className='mb-4 sm:mb-6 md:mb-8'>
        <div className='relative'>
          <Input
            type='search'
            placeholder='Search for anime...'
            value={searchTerm}
            onChange={handleSearch}
            className='w-full rounded-full pl-10 h-10 sm:h-12'
          />
          <div className='absolute left-3 top-1/2 -translate-y-1/2'>
            <Search className='h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground' />
          </div>
        </div>
      </div>

      {isLoading ? (
        <>
          <div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6'>
            {renderSkeletons()}
          </div>
          <div className='sr-only' aria-live='polite'>
            Loading anime...
          </div>
        </>
      ) : isError ? (
        <div className='text-center py-10 space-y-4'>
          <p className='text-destructive font-medium'>
            {error instanceof Error && error.message.includes("429")
              ? "API rate limit exceeded. The Jikan API has a limit of 3 requests per second."
              : `Error: ${
                  error instanceof Error
                    ? error.message
                    : "Failed to fetch anime"
                }`}
          </p>
          <p className='text-muted-foreground text-sm'>
            {error instanceof Error && error.message.includes("429")
              ? "Please wait a moment before trying again."
              : "There was a problem fetching the anime data."}
          </p>
          <Button
            variant='outline'
            onClick={() => {
              // Force refetch the current page
              setPage((current) => {
                // This trick forces a re-render even if the page number is the same
                setPage(0);
                return current;
              });
            }}
          >
            <RefreshCw className='h-4 w-4 mr-2' />
            Try Again
          </Button>
        </div>
      ) : data?.data && Array.isArray(data.data) && data.data.length === 0 ? (
        <div className='text-center py-10 px-4 max-w-md mx-auto'>
          <div className='mb-6 relative'>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src='/src/assets/images/404.svg'
                alt='People looking confused with question marks'
                className='anime-card-image w-full h-60    '
                loading='lazy'
                style={{ objectFit: "contain" }}
              />
            </motion.div>
          </div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className='text-xl font-semibold mb-2'>No results found</h3>
            <p className='text-muted-foreground mb-4'>
              We couldn't find any anime matching your search. Try using
              different keywords or check for typos.
            </p>
            <div className='flex flex-wrap gap-2 justify-center text-sm'>
              <Badge
                variant='outline'
                className='cursor-pointer hover:bg-secondary transition-colors'
                onClick={() => setSearchTerm("naruto")}
              >
                naruto
              </Badge>
              <Badge
                variant='outline'
                className='cursor-pointer hover:bg-secondary transition-colors'
                onClick={() => setSearchTerm("one piece")}
              >
                one piece
              </Badge>
              <Badge
                variant='outline'
                className='cursor-pointer hover:bg-secondary transition-colors'
                onClick={() => setSearchTerm("attack on titan")}
              >
                attack on titan
              </Badge>
              <Badge
                variant='outline'
                className='cursor-pointer hover:bg-secondary transition-colors'
                onClick={() => setSearchTerm("my hero academia")}
              >
                my hero academia
              </Badge>
            </div>
          </motion.div>
        </div>
      ) : (
        <>
          <motion.div
            className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {data?.data && Array.isArray(data.data) ? (
              data.data.map((anime) => (
                <AnimeCard
                  key={anime.mal_id}
                  anime={anime}
                  isMobile={isMobile}
                />
              ))
            ) : (
              <div className='col-span-full text-center py-10'>
                <p>No anime data available.</p>
              </div>
            )}
          </motion.div>

          <div className='mt-6 sm:mt-8 flex justify-center'>
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
              isMobile={isMobile}
              pageSize={pageSize}
              onPageSizeChange={handlePageSizeChange}
            />
          </div>
        </>
      )}
    </motion.div>
  );
};
