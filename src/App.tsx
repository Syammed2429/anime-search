import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Layout/Navbar";
import NotFoundPage from "./components/Search/NotFoundPage";
import { HoveredAnimeProvider } from "./hooks/use-hovered-anime";
import { QueryProvider } from "./lib/query-provider";
import { DetailsPage } from "./pages/DetailsPage";
import { SearchPage } from "./pages/SearchPage";

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
        </div>
      </BrowserRouter>
    </QueryProvider>
  );
}

export default App;
