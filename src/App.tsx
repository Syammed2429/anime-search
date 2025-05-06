import { BrowserRouter, Routes } from "react-router-dom";
import { Navbar } from "./components/Layout/Navbar";
import { QueryProvider } from "./lib/query-provider";

function App() {
  return (
    <QueryProvider>
      <BrowserRouter>
        <div className='min-h-screen bg-background'>
          <Navbar />
          <main>
            <Routes></Routes>
          </main>
        </div>
      </BrowserRouter>
    </QueryProvider>
  );
}

export default App;
