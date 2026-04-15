import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
      <div className="bg-indigo-50 p-6 rounded-full mb-8">
        <Search className="w-16 h-16 text-indigo-600" />
      </div>
      <h1 className="text-6xl font-black text-gray-900 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Page Not Found</h2>
      <p className="text-gray-500 max-w-md mb-10">
        Oops! The page you're looking for doesn't exist or has been moved to another URL.
      </p>
      <Link
        to="/"
        className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition font-bold flex items-center shadow-lg shadow-indigo-100"
      >
        <Home className="w-5 h-5 mr-2" /> Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
