import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-3'>
      <div className='container mx-auto px-4 py-3 flex items-center justify-between'>
        {/* Logo and brand */}
        <div className='flex items-center'>
          <Link to='/' className='flex items-center space-x-2'>
            <div className='bg-primary/10 p-1.5 rounded-md'>
              <img
                src='/favicon-32x32.png'
                alt='AniVerse Logo'
                className='w-5 h-5'
              />
            </div>
            <span className='font-bold text-lg inline-block'>AniVerse</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
