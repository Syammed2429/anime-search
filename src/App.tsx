import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Layout/Navbar";
import { HoveredAnimeProvider } from "./hooks/use-hovered-anime";
import { QueryProvider } from "./lib/query-provider";
import { DetailsPage } from "./pages/DetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import { SearchPage } from "./pages/SearchPage";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <QueryProvider>
      <BrowserRouter>
        <div className='min-h-screen bg-background'>
          <Navbar />
          <HoveredAnimeProvider>
            <main>
              <Routes>
                <Route path='/' element={<SearchPage />} />
                <Route path='/anime/:id' element={<DetailsPage />} />
                <Route path='*' element={<NotFoundPage />} />
              </Routes>
            </main>
          </HoveredAnimeProvider>
          <Analytics />
        </div>
      </BrowserRouter>
    </QueryProvider>
  );
}

export default App;
