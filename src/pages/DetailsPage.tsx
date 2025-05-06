import type React from "react";

import { AnimeRecommendationCard } from "@/components/cards/AnimeRecommendation";
import { AnimeDetailsSkeleton } from "@/components/skeletons/anime-details-skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAnimeDetails, useAnimeRecommendations } from "@/hooks/use-anime";
import { useHoveredAnime } from "@/hooks/use-hovered-anime";
import { useMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Film,
  ListVideo,
  Star,
  Trophy,
  Users,
} from "lucide-react";
import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ErrorImage } from "@/components/ui/error-image";

export const DetailsPage = () => {
  const { id } = useParams<{ id: string | undefined }>();

  const { data: anime, isLoading, isError } = useAnimeDetails(id ?? "");
  const { data: recommendations, isLoading: isLoadingRecommendations } =
    useAnimeRecommendations(id ?? "");
  const { setHoveredAnime } = useHoveredAnime();
  const isMobile = useMobile();

  // State to track hovered recommendation
  const [hoveredRecommendation, setHoveredRecommendation] = useState<
    number | null
  >(null);

  // Refs for tracking mouse position
  const mousePositionRef = useRef({ x: 0, y: 0 });

  // Update mouse position on move
  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    recId: number
  ) => {
    if (isMobile) return;

    const { currentTarget, clientX, clientY } = e;
    const { left, top } = currentTarget.getBoundingClientRect();

    mousePositionRef.current = {
      x: clientX - left,
      y: clientY - top,
    };

    // Force a re-render when mouse moves over a recommendation
    setHoveredRecommendation(recId);
  };

  if (isLoading) {
    return (
      <>
        <AnimeDetailsSkeleton />
        <div className='sr-only' aria-live='polite'>
          Loading anime details...
        </div>
      </>
    );
  }

  if (isError || !anime) {
    return (
      <div className='container mx-auto py-4 sm:py-8 px-3 sm:px-4 text-center'>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <ErrorImage />
        </motion.div>
        {!anime && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className='mt-4 text-lg text-muted-foreground'
          >
            Anime not found
          </motion.p>
        )}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Button asChild className='mt-4'>
            <Link to='/'>Go Back</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className='container mx-auto py-4 sm:py-8 px-3 sm:px-4'>
      <div className='flex justify-between items-center mb-4 sm:mb-6'>
        <motion.h1
          className='text-xl sm:text-2xl md:text-3xl font-bold truncate max-w-[75%]'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {anime.data.title}
        </motion.h1>
        <Button variant='outline' size='sm' asChild>
          <Link to='/'>
            <ArrowLeft className='mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4' />
            <span className='sm:inline'>Back</span>
          </Link>
        </Button>
      </div>

      <motion.div
        className='grid grid-cols-1 md:grid-cols-[minmax(200px,300px)_1fr] gap-4 sm:gap-6 md:gap-8'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div>
          <motion.div
            className='relative aspect-[3/4] w-full overflow-hidden rounded-lg shadow-md'
            whileHover={
              !isMobile
                ? {
                    scale: 1.03,
                    transition: { duration: 0.2 },
                  }
                : {}
            }
          >
            <img
              src={anime.data.images.jpg.large_image_url || "/placeholder.svg"}
              alt={anime.data.title}
              // fill
              sizes='(max-width: 768px) 100vw, 300px'
              className='object-cover'
              // priority
            />
          </motion.div>

          <div className='mt-4 sm:mt-6'>
            {/* Rating card with animation */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className='bg-card/50 backdrop-blur-sm rounded-lg p-3 sm:p-4 shadow-sm border border-border/50 mb-4'
            >
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <div className='bg-yellow-500/10 p-2 rounded-full'>
                    <Star className='h-5 w-5 sm:h-6 sm:w-6 text-yellow-500 fill-yellow-500' />
                  </div>
                  <div>
                    <p className='text-xs text-muted-foreground'>Rating</p>
                    <p className='font-bold text-lg sm:text-xl'>
                      {anime.data.score || "N/A"}
                    </p>
                  </div>
                </div>
                <div className='text-right'>
                  <p className='text-xs text-muted-foreground'>Votes</p>
                  <p className='font-medium'>
                    {anime.data.scored_by
                      ? `${anime.data.scored_by.toLocaleString()}`
                      : "No votes"}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Stats grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className='grid grid-cols-2 gap-2 sm:gap-3'
            >
              <div className='bg-card/50 backdrop-blur-sm rounded-lg p-3 shadow-sm border border-border/50'>
                <div className='flex items-center gap-2 mb-1'>
                  <div className='bg-primary/10 p-1.5 rounded-full'>
                    <Trophy className='h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary' />
                  </div>
                  <p className='text-xs text-muted-foreground'>Rank</p>
                </div>
                <p className='font-semibold'>#{anime.data.rank || "N/A"}</p>
              </div>
              <div className='bg-card/50 backdrop-blur-sm rounded-lg p-3 shadow-sm border border-border/50'>
                <div className='flex items-center gap-2 mb-1'>
                  <div className='bg-pink-500/10 p-1.5 rounded-full'>
                    <Users className='h-3.5 w-3.5 sm:h-4 sm:w-4 text-pink-500' />
                  </div>
                  <p className='text-xs text-muted-foreground'>Popularity</p>
                </div>
                <p className='font-semibold'>
                  #{anime.data.popularity || "N/A"}
                </p>
              </div>
              <div className='bg-card/50 backdrop-blur-sm rounded-lg p-3 shadow-sm border border-border/50'>
                <div className='flex items-center gap-2 mb-1'>
                  <div className='bg-purple-500/10 p-1.5 rounded-full'>
                    <Film className='h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-500' />
                  </div>
                  <p className='text-xs text-muted-foreground'>Type</p>
                </div>
                <p className='font-semibold'>{anime.data.type || "Unknown"}</p>
              </div>
              <div className='bg-card/50 backdrop-blur-sm rounded-lg p-3 shadow-sm border border-border/50'>
                <div className='flex items-center gap-2 mb-1'>
                  <div className='bg-cyan-500/10 p-1.5 rounded-full'>
                    <ListVideo className='h-3.5 w-3.5 sm:h-4 sm:w-4 text-cyan-500' />
                  </div>
                  <p className='text-xs text-muted-foreground'>Episodes</p>
                </div>
                <p className='font-semibold'>
                  {anime.data.episodes || "Unknown"}
                </p>
              </div>
              <div className='bg-card/50 backdrop-blur-sm rounded-lg p-3 shadow-sm border border-border/50'>
                <div className='flex items-center gap-2 mb-1'>
                  <div className='bg-green-500/10 p-1.5 rounded-full'>
                    <Clock className='h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500' />
                  </div>
                  <p className='text-xs text-muted-foreground'>Status</p>
                </div>
                <p className='font-semibold'>
                  {anime.data.status || "Unknown"}
                </p>
              </div>
              <div className='bg-card/50 backdrop-blur-sm rounded-lg p-3 shadow-sm border border-border/50'>
                <div className='flex items-center gap-2 mb-1'>
                  <div className='bg-orange-500/10 p-1.5 rounded-full'>
                    <Calendar className='h-3.5 w-3.5 sm:h-4 sm:w-4 text-orange-500' />
                  </div>
                  <p className='text-xs text-muted-foreground'>Aired</p>
                </div>
                <p className='font-semibold'>
                  {anime.data.aired?.string || "Unknown"}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className='space-y-4 sm:space-y-6'>
          <div>
            <h2 className='text-lg sm:text-xl font-semibold mb-1 sm:mb-2'>
              {anime.data.title_japanese
                ? `${anime.data.title} (${anime.data.title_japanese})`
                : anime.data.title}
            </h2>
            <p className='text-muted-foreground text-xs sm:text-sm mb-2 sm:mb-4'>
              {anime.data.title_english &&
              anime.data.title_english !== anime.data.title
                ? `English: ${anime.data.title_english}`
                : ""}
            </p>
            <p className='leading-relaxed text-sm sm:text-base'>
              {anime.data.synopsis || "No synopsis available."}
            </p>
          </div>

          <div>
            <h3 className='font-semibold mb-2 text-sm sm:text-base'>Genres</h3>
            <div className='flex flex-wrap gap-1 sm:gap-2'>
              {anime.data.genres.map((genre) => (
                <Badge
                  key={genre.mal_id}
                  variant='secondary'
                  className='text-xs sm:text-sm'
                >
                  {genre.name}
                </Badge>
              ))}
            </div>
          </div>

          {anime.data.studios && anime.data.studios.length > 0 && (
            <div>
              <h3 className='font-semibold mb-2 text-sm sm:text-base'>
                Studios
              </h3>
              <div className='flex flex-wrap gap-1 sm:gap-2'>
                {anime.data.studios.map((studio) => (
                  <Badge
                    key={studio.mal_id}
                    variant='outline'
                    className='text-xs sm:text-sm'
                  >
                    {studio.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Separator />

          <div>
            <h3 className='font-semibold text-lg sm:text-xl mb-3 sm:mb-4'>
              Recommendations
            </h3>
            {isLoadingRecommendations ? (
              <div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4'>
                {Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <Card
                      key={`rec-skeleton-${index}`}
                      className='overflow-hidden'
                    >
                      <div className='flex h-16 sm:h-24'>
                        <div className='relative w-12 sm:w-20 h-full overflow-hidden'>
                          <div className='absolute inset-0 animate-pulse bg-muted' />
                        </div>
                        <CardContent className='p-2 sm:p-3 flex-1'>
                          <div className='h-4 w-full mb-1 animate-pulse bg-muted rounded-md' />
                          <div className='h-4 w-2/3 animate-pulse bg-muted rounded-md' />
                        </CardContent>
                      </div>
                    </Card>
                  ))}
              </div>
            ) : recommendations?.data && recommendations.data.length > 0 ? (
              <div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4'>
                {recommendations.data.slice(0, 6).map((rec) => {
                  const malId = rec.entry.mal_id;
                  const isHovered = hoveredRecommendation === malId;

                  const spotlightStyle =
                    !isMobile && isHovered
                      ? {
                          background: `radial-gradient(
                          150px circle at ${mousePositionRef.current.x}px ${mousePositionRef.current.y}px,
                          rgba(var(--primary-rgb), 0.15),
                          transparent 80%
                        )`,
                        }
                      : {};

                  return (
                    <AnimeRecommendationCard
                      key={malId}
                      recommendation={rec}
                      isMobile={isMobile}
                      spotlightStyle={spotlightStyle}
                      onMouseMove={(e) => handleMouseMove(e, malId)}
                      onMouseEnter={() => setHoveredRecommendation(malId)}
                      onMouseLeave={() => setHoveredRecommendation(null)}
                      setHoveredAnime={setHoveredAnime}
                    />
                  );
                })}
              </div>
            ) : (
              <p className='text-muted-foreground text-sm'>
                No recommendations available.
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
