import type React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Star } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { Anime } from "@/lib/anime-types";
import { Link } from "react-router-dom";
import { useHoveredAnime } from "@/hooks/use-hovered-anime";

interface AnimeCardProps {
  anime: Anime;
  isMobile?: boolean;
}

export const AnimeCard = ({ anime, isMobile = false }: AnimeCardProps) => {
  const { setHoveredAnime } = useHoveredAnime();

  // Motion values for interactive mouse effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Create derived values for the spotlight/glow effect
  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);
  const spotlightBackground = useMotionTemplate`
    radial-gradient(
      300px circle at ${spotlightX}px ${spotlightY}px,
      rgba(var(--primary-rgb), 0.15),
      transparent 80%
    )
  `;

  // Handle mouse move for the spotlight effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return; // Skip on mobile

    const { currentTarget, clientX, clientY } = e;
    const { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);

    spotlightX.set(clientX - left);
    spotlightY.set(clientY - top);
  };

  // Handle touch events for mobile
  const handleTouchStart = () => {
    if (!isMobile) return;
    // setHoveredAnime(anime);
  };

  const handleTouchEnd = () => {
    if (!isMobile) return;
    // setHoveredAnime(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => !isMobile && setHoveredAnime(anime)}
      onMouseLeave={() => !isMobile && setHoveredAnime(null)}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className='relative'
    >
      <Link to={`/anime/${anime.mal_id}`} className='block h-full'>
        <motion.div
          whileHover={
            !isMobile
              ? {
                  y: -8,
                  rotateY: 5,
                  rotateX: -5,
                  scale: 1.05,
                  transition: { duration: 0.2, ease: "easeOut" },
                }
              : {}
          }
          whileTap={
            isMobile
              ? {
                  scale: 0.98,
                  transition: { duration: 0.1 },
                }
              : {}
          }
          style={{
            transformStyle: "preserve-3d",
            transformPerspective: 1000,
          }}
          className='h-full'
        >
          <Card
            className={cn(
              "h-full overflow-hidden relative",
              "transition-shadow duration-300",
              "shadow-md hover:shadow-xl",
              "before:absolute before:inset-0 before:z-10 before:bg-card/50 before:opacity-0 hover:before:opacity-100 before:transition-opacity"
            )}
          >
            {/* Spotlight overlay - only on non-mobile */}
            {!isMobile && (
              <motion.div
                className='absolute inset-0 z-10 pointer-events-none'
                style={{ background: spotlightBackground }}
              />
            )}

            <div className='relative aspect-[3/4] w-full overflow-hidden'>
              <img
                src={anime.images.jpg.image_url || "/placeholder.svg"}
                alt={anime.title}
                className='anime-card-image w-full'
                loading='lazy'
                sizes='(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw'
              />

              {/* Rating badge */}
              <motion.div
                className='absolute top-2 right-2 z-20'
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Badge
                  variant='secondary'
                  className='bg-black/70 text-white text-xs sm:text-sm'
                >
                  <Star className='h-3 w-3 mr-1 text-yellow-400 fill-yellow-400' />
                  {anime.score ? anime.score : "N/A"}
                </Badge>
              </motion.div>

              {/* View details overlay - appears on hover (desktop only) */}
              {!isMobile && (
                <motion.div
                  className='absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 transition-opacity'
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className='flex flex-col items-center gap-2'
                  >
                    <Eye className='h-6 w-6 text-white' />
                    <span className='text-white font-medium'>View Details</span>
                  </motion.div>
                </motion.div>
              )}
            </div>

            <CardContent className='p-3 sm:p-4 relative z-20'>
              <motion.h3
                className='font-semibold line-clamp-1 text-base sm:text-lg'
                initial={{ y: 5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {anime.title}
              </motion.h3>
              <motion.p
                className='text-xs sm:text-sm text-muted-foreground mt-1'
                initial={{ y: 5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                {anime.year || "Unknown"} • {anime.type || "Unknown"}
              </motion.p>
            </CardContent>

            <CardFooter className='p-3 sm:p-4 pt-0 relative z-20'>
              <motion.p
                className='text-xs sm:text-sm line-clamp-2 text-muted-foreground'
                initial={{ y: 5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                {anime.synopsis || "No description available."}
              </motion.p>
            </CardFooter>
          </Card>
        </motion.div>
      </Link>
    </motion.div>
  );
};
