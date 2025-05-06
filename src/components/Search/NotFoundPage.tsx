import { motion } from "framer-motion";

const NotFoundPage = () => {
  return (
    <div className='flex flex-col items-center justify-center mt-20'>
      <motion.h1
        className='text-center text-4xl font-extrabold text-red-500'
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        404 Not Found
      </motion.h1>
      <img
        src='/src/assets/images/404.svg'
        alt='People looking confused with question marks'
        className='anime-card-image w-full h-60    '
        loading='lazy'
        style={{ objectFit: "contain" }}
      />
      <motion.p
        className='text-center text-lg mt-4 text-gray-400'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        The page you are looking for does not exist.
      </motion.p>
      <motion.p
        className='text-center text-lg mt-2 text-gray-400'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Please check the URL or return to the homepage.
      </motion.p>
      <motion.div
        className='mt-6'
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <a
          href='/'
          className='px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition-colors'
        >
          Go to Homepage
        </a>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
