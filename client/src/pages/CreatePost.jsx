import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import ReactMarkdown from 'react-markdown';
import { Image, Tag, Type, Send, Loader2, AlertCircle, Eye, Edit3 } from 'lucide-react';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    coverImage: '',
    tags: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const postData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
    };

    try {
      const { data } = await api.post('/posts', postData);
      navigate(`/posts/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create New Post</h1>
        <p className="text-gray-500">Share your thoughts with the world</p>
      </header>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 flex items-start">
          <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <div className="relative">
              <Type className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter a catchy title"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
            <div className="relative">
              <Image className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                name="coverImage"
                value={formData.coverImage}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="https://images.unsplash.com/..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
            <div className="relative">
              <Tag className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="react, node, javascript"
              />
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">Content (Markdown supported)</label>
            <button
              type="button"
              onClick={() => setPreview(!preview)}
              className="text-sm text-indigo-600 hover:text-indigo-500 flex items-center font-medium"
            >
              {preview ? (
                <>
                  <Edit3 className="w-4 h-4 mr-1" /> Edit Mode
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 mr-1" /> Preview Mode
                </>
              )}
            </button>
          </div>
          
          {preview ? (
            <div className="w-full min-h-[400px] p-4 border border-gray-300 rounded-lg prose prose-indigo max-w-none bg-white overflow-auto">
              {formData.content ? (
                <ReactMarkdown>{formData.content}</ReactMarkdown>
              ) : (
                <p className="text-gray-400 italic">Nothing to preview...</p>
              )}
            </div>
          ) : (
            <textarea
              name="content"
              required
              rows="15"
              value={formData.content}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono"
              placeholder="Write your post content here using Markdown..."
            />
          )}
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition font-bold flex items-center justify-center disabled:opacity-70 shadow-lg shadow-indigo-100"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
            ) : (
              <Send className="w-5 h-5 mr-2" />
            )}
            Publish Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
