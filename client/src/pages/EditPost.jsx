import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import ReactMarkdown from 'react-markdown';
import { Image, Tag, Type, Save, Loader2, AlertCircle, Eye, Edit3, ChevronLeft } from 'lucide-react';

const EditPost = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    coverImage: '',
    tags: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await api.get(`/posts/${id}`);
        setFormData({
          title: data.title,
          content: data.content,
          coverImage: data.coverImage || '',
          tags: data.tags.join(', ')
        });
      } catch (err) {
        setError('Failed to load post data');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError('');

    const postData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
    };

    try {
      await api.put(`/posts/${id}`, postData);
      navigate(`/posts/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update post. Please try again.');
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Loading post data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <header className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-500 hover:text-indigo-600 mb-4 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Back
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Edit Post</h1>
        <p className="text-gray-500">Refine your content and update your story</p>
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
              <ReactMarkdown>{formData.content}</ReactMarkdown>
            </div>
          ) : (
            <textarea
              name="content"
              required
              rows="15"
              value={formData.content}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono"
            />
          )}
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={submitLoading}
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition font-bold flex items-center justify-center disabled:opacity-70 shadow-lg shadow-indigo-100"
          >
            {submitLoading ? (
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
            ) : (
              <Save className="w-5 h-5 mr-2" />
            )}
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
