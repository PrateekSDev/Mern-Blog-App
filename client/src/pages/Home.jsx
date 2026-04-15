import { useState, useEffect } from 'react';
import api from '../api';
import PostCard from '../components/PostCard';
import { Loader2 } from 'lucide-react';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/posts?page=${page}`);
        setPosts(data.posts);
        setTotalPages(data.totalPages);
        setError(null);
      } catch (err) {
        setError('Failed to fetch posts. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [page]);

  if (loading && posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg inline-block">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 sm:text-5xl">
          Insights & Stories
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Explore the latest articles on technology, design, and development.
        </p>
      </header>

      {posts.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No posts found yet. Be the first to write one!
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
          
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center space-x-4">
              <button
                disabled={page === 1}
                onClick={() => setPage(prev => prev - 1)}
                className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-50"
              >
                Previous
              </button>
              <span className="flex items-center text-gray-600">
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage(prev => prev + 1)}
                className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
