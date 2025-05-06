/* eslint-disable react-refresh/only-export-components */
import { Anime } from "@/lib/anime-types";
import { createContext, useContext, useState, type ReactNode } from "react";

interface HoveredAnimeContextType {
  hoveredAnime: Anime | null;
  setHoveredAnime: (anime: Anime | null) => void;
}

const HoveredAnimeContext = createContext<HoveredAnimeContextType | undefined>(
  undefined
);

export const HoveredAnimeProvider = ({ children }: { children: ReactNode }) => {
  const [hoveredAnime, setHoveredAnime] = useState<Anime | null>(null);

  return (
    <HoveredAnimeContext.Provider value={{ hoveredAnime, setHoveredAnime }}>
      {children}
    </HoveredAnimeContext.Provider>
  );
};

export const useHoveredAnime = () => {
  const context = useContext(HoveredAnimeContext);
  if (context === undefined) {
    throw new Error(
      "useHoveredAnime must be used within a HoveredAnimeProvider"
    );
  }
  return context;
};
