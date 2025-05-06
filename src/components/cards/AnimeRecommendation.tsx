import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { AnimeRecommendation } from "@/lib/anime-types";
import { Anime } from "@/lib/anime-types";

interface AnimeRecommendationProps {
  recommendation: AnimeRecommendation;
  isMobile: boolean;
  spotlightStyle: React.CSSProperties;
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  setHoveredAnime: (anime: Anime | null) => void;
}

export const AnimeRecommendationCard = ({
  recommendation: rec,
  isMobile,
  spotlightStyle,
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
  setHoveredAnime,
}: AnimeRecommendationProps) => {
  return (
    <motion.div
      key={rec.entry.mal_id}
      whileHover={
        !isMobile
          ? {
              scale: 1.05,
              y: -5,
              transition: { duration: 0.2 },
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
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className='relative'
    >
      <Card
        className='overflow-hidden relative'
        onMouseEnter={() => !isMobile && setHoveredAnime(rec.entry as Anime)}
        onMouseLeave={() => !isMobile && setHoveredAnime(null)}
        onTouchStart={() => isMobile && setHoveredAnime(rec.entry as Anime)}
        onTouchEnd={() => isMobile && setHoveredAnime(null)}
      >
        {!isMobile && (
          <div
            className='absolute inset-0 z-10 pointer-events-none'
            style={spotlightStyle}
          />
        )}

        <Link
          to={`/anime/${rec.entry.mal_id}`}
          className='flex h-16 sm:h-24 relative'
        >
          <div className='relative w-12 sm:w-20 h-full overflow-hidden'>
            <img
              src={rec.entry.images.jpg.image_url || "/placeholder.svg"}
              alt={rec.entry.title}
              className='object-cover transition-transform duration-300 hover:scale-110'
            />
          </div>
          <CardContent className='p-2 sm:p-3 flex-1 relative z-20'>
            <p className='font-medium line-clamp-2 text-xs sm:text-sm'>
              {rec.entry.title}
            </p>
          </CardContent>

          {!isMobile && (
            <motion.div
              className='absolute inset-0 bg-black/60 flex items-center justify-center opacity-0'
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Eye className='h-4 w-4 sm:h-5 sm:w-5 text-white' />
              </motion.div>
            </motion.div>
          )}
        </Link>
      </Card>
    </motion.div>
  );
};
