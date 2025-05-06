import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <header className='bg-background border-b border-border sticky top-0 z-50'>
      <div className='container mx-auto px-4 py-3 flex items-center justify-between'>
        {/* Logo and brand */}
        <div className='flex items-center'>
          <Link to='/' className='flex items-center space-x-2'>
            <div className='bg-primary/10 p-1.5 rounded-md'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='w-5 h-5 text-primary'
              >
                <circle cx='12' cy='12' r='10' />
                <path d='M8 12h8' />
                <path d='M12 8v8' />
              </svg>
            </div>
            <span className='font-bold text-lg hidden sm:inline-block'>
              AnimeDB
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};
