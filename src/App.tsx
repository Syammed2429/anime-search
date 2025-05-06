import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Layout/Navbar";
import { QueryProvider } from "./lib/query-provider";
import { SearchPage } from "./pages/SearchPage";
import { HoveredAnimeProvider } from "./hooks/use-hovered-anime";

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
