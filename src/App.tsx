import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Layout/Navbar";
import { QueryProvider } from "./lib/query-provider";
import { SearchPage } from "./pages/SearchPage";
import { HoveredAnimeProvider } from "./hooks/use-hovered-anime";
import { DetailsPage } from "./pages/DetailsPage";

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
              </Routes>
            </main>
          </HoveredAnimeProvider>
        </div>
      </BrowserRouter>
      s
    </QueryProvider>
  );
}

export default App;
