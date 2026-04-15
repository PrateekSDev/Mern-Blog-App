import { Link } from 'react-router-dom';
import { Calendar, User, Tag } from 'lucide-react';

const PostCard = ({ post }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-indigo-50 text-indigo-600 text-xs font-medium rounded-md flex items-center"
            >
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>
        <Link to={`/posts/${post._id}`}>
          <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-indigo-600 transition-colors">
            {post.title}
          </h2>
        </Link>
        <p className="text-gray-600 line-clamp-3 mb-4">
          {post.content.replace(/[#*`]/g, '').substring(0, 150)}...
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
          <div className="flex items-center">
            <User className="w-4 h-4 mr-1" />
            <span>{post.author?.username || 'Unknown'}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
