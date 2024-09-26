import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2} from 'lucide-react';

interface Post {
  id: number;
  title: string;
  content: string;
  date: string;
}

const initialPosts: Post[] = [
  { id: 1, title: "Added a blog", content: "Currently 3:31AM, added a very rough rough draft of the blog outline. Going to add the admin functionality tomorrow. Also routed the cam for authenticated users only. Check it out!", date: "2024-09-26" },
  //{ id: 2, title: "The Future of AI-Driven Art", content: "Explore the intersection of artificial intelligence and artistic creation in this in-depth analysis.", date: "2024-09-26" },
];

const BlogPost: React.FC<{ post: Post; /* isAdmin: boolean; */ onShare: (id: number) => void }> = ({ post, /* isAdmin, */ onShare }) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8 bg-gray-800 rounded-lg overflow-hidden shadow-lg"
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-blue-600">{post.title}</h2>
        <p className="text-gray-300 mb-4">{post.content}</p>
        <p className="text-sm text-gray-500">Published on: {post.date}</p>
      </div>
      <div className="px-6 py-4 bg-gray-900 flex justify-between items-center">
        <button 
          onClick={() => onShare(post.id)} 
          className="flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300"
        >
          <Share2 className="mr-2 h-4 w-4" /> Share
        </button>
        {/* Admin edit button commented out
        {isAdmin && (
          <button className="flex items-center text-red-400 hover:text-red-300 transition-colors duration-300">
            <PenTool className="mr-2 h-4 w-4" /> Edit
          </button>
        )}
        */}
      </div>
    </motion.div>
  );
  
  /* NewPostForm component commented out
  const NewPostForm: React.FC<{ onSubmit: (post: { title: string; content: string }) => void }> = ({ onSubmit }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit({ title, content });
      setTitle('');
      setContent('');
    };
  
    return (
      <motion.form 
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 bg-gray-800 rounded-lg overflow-hidden shadow-lg"
      >
        <div className="p-6">
          <input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mb-4 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Post Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 mb-4 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-gradient-to-r from-red-500 to-blue-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            Publish Post
          </button>
        </div>
      </motion.form>
    );
  };
  */
  
  const Blog: React.FC = () => {
    const [posts] = useState<Post[]>(initialPosts);
    // Admin state commented out
    // const [isAdmin, setIsAdmin] = useState(false);
    // const [showNewPostForm, setShowNewPostForm] = useState(false);
  
    const handleShare = (postId: number) => {
      console.log(`Sharing post with id: ${postId}`);
      // Implement sharing functionality here
    };
  
    /* New post handler commented out
    const handleNewPost = (newPost: { title: string; content: string }) => {
      const post: Post = {
        id: posts.length + 1,
        ...newPost,
        date: new Date().toISOString().split('T')[0]
      };
      setPosts([post, ...posts]);
      setShowNewPostForm(false);
    };
    */
  
    return (
      <div className="container mx-auto px-4 py-12" style={{ fontFamily: 'Nunito, sans-serif' }}>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-blue-600"
        >
          fibb.ai Blog
        </motion.h1>
        
        {/* Admin controls commented out
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors duration-300"
          >
            {isAdmin ? 'Exit Admin Mode' : 'Enter Admin Mode'}
          </button>
          {isAdmin && (
            <button
              onClick={() => setShowNewPostForm(!showNewPostForm)}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center"
            >
              <Plus className="mr-2 h-4 w-4" /> New Post
            </button>
          )}
        </div>
  
        {showNewPostForm && <NewPostForm onSubmit={handleNewPost} />}
        */}
        
        {posts.map(post => (
          <BlogPost 
            key={post.id} 
            post={post} 
            // isAdmin={isAdmin}  // commented out
            onShare={handleShare} 
          />
        ))}
      </div>
    );
  };
  
  export default Blog;