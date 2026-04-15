import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import ReactMarkdown from 'react-markdown';
import { Calendar, User, Tag, Edit, Trash2, ChevronLeft, Loader2, AlertCircle } from 'lucide-react';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await api.get(`/posts/${id}`);
        setPost(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load post');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    
    setDeleteLoading(true);
    try {
      await api.delete(`/posts/${id}`);
      navigate('/dashboard');
    } catch (err) {
      alert('Failed to delete post');
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Loading post...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="text-center py-20">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg inline-block flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          {error || 'Post not found'}
        </div>
        <div className="mt-6">
          <Link to="/" className="text-indigo-600 hover:underline flex items-center justify-center">
            <ChevronLeft className="w-4 h-4 mr-1" /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const isAuthor = user && user.id === post.author?._id;

  return (
    <article className="max-w-4xl mx-auto px-4">
      <Link to="/" className="inline-flex items-center text-gray-500 hover:text-indigo-600 mb-8 transition-colors">
        <ChevronLeft className="w-4 h-4 mr-1" /> Back to Feed
      </Link>

      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-[400px] object-cover rounded-2xl shadow-lg mb-8"
        />
      )}

      <div className="flex flex-wrap gap-2 mb-6">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-indigo-50 text-indigo-600 text-sm font-medium rounded-full flex items-center"
          >
            <Tag className="w-3 h-3 mr-1" />
            {tag}
          </span>
        ))}
      </div>

      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
        {post.title}
      </h1>

      <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-y border-gray-100 mb-10">
        <div className="flex items-center space-x-6 text-gray-500">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
              <User className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{post.author?.username}</p>
              <div className="flex items-center text-xs">
                <Calendar className="w-3 h-3 mr-1" />
                {new Date(post.createdAt).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>
        </div>

        {isAuthor && (
          <div className="flex items-center space-x-3">
            <Link
              to={`/edit/${post._id}`}
              className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Link>
            <button
              onClick={handleDelete}
              disabled={deleteLoading}
              className="flex items-center px-4 py-2 bg-red-50 border border-red-100 rounded-lg text-sm font-medium text-red-600 hover:bg-red-100 transition shadow-sm"
            >
              {deleteLoading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Trash2 className="w-4 h-4 mr-2" />
              )}
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="prose prose-indigo prose-lg max-w-none">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
};

export default PostDetail;
