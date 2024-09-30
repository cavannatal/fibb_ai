import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  author: string;
  role: string;
}

const blogPost: BlogPost = {
  id: 1,
  title: "Gallery Feature Update: What's New and What's Next",
  excerpt: "We've been working hard on improving the new Gallery feature. Here's a quick rundown of what's ready and what's coming up!",
  content: `# Gallery Feature Update: What's New and What's Next

Hey everyone,

We've been working hard on improving the new Gallery feature, and we wanted to share what's been done so far and what's coming up. Here's a quick, easy rundown—whether you're in your teens, college, or adulting in your 30s, 40s, or 50s, this should make sense!

## What's Ready So Far:

### Photo Display:
- We've got a cool photo grid layout that adjusts smoothly to any screen size. No matter what device you're on, your photos will look great!
- Images load as you scroll, which means faster performance—especially helpful if you've got a lot of photos.

### Photo Storage:
- Your photos are pulled directly from your private folder in our secure cloud storage.
- We've made sure everything is locked down and safe using secure links, so your photos are protected.

### Managing Your Photos:
- You can delete photos, and they'll disappear from both the gallery and storage.
- Want to save photos? We've added a download button, so you can save them directly to your phone, even on iPhones.
- There's also a "share to Instagram Stories" option. It's a great start, though we may tweak it a bit in future updates.

### Easy-to-Use Design (We'll get Allie to check this out soon!):
- Added a loading spinner so you're not staring at an empty screen while your photos load.
- If something goes wrong (rare, but it happens), there are error messages to let you know.
- No photos? No problem—we'll show a friendly message instead of leaving the screen blank.

## What's Coming Next:

We've got a solid foundation, but here are some upgrades we're working on:

1. **Load More Photos with Ease:**
   - We're looking into adding infinite scrolling or pagination to keep everything smooth if you've got hundreds of pics.

2. **Search and Sort:**
   - We're thinking of adding a search bar and filter options to help you quickly find the photos you need.

3. **Accessibility Matters:**
   - We're working on features like keyboard navigation to make the gallery easier for everyone to use.

4. **Undo Deletes:**
   - Accidentally deleted a photo? No problem—we're adding an undo button for those "oops" moments.

5. **Confirmation Before Delete:**
   - We'll add a "Are you sure?" popup before permanently deleting photos, just to be safe.

## Future Ideas:

Here are some fun things we're considering for the future:
- Basic photo editing inside the gallery (cropping, filters, etc.).
- Share to other social media platforms besides Instagram.
- Maybe use AI to help sort photos (like facial recognition to group pics).
- Group galleries, where you and your family or friends can collaborate and add photos together.

We hope you're as excited about the updates as we are! Got ideas? Let us know—this is all about making your photo experience better!

Cheers,

**Matt Yee**  
*Co-Founder & CEO*`,
  date: "2024-09-30",
  category: "Product",
  author: "Matt Yee",
  role: "Co-Founder & CEO"
};

const categories = ["Product", "Dev", "AI Research", "Updates"];

const Blog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("Product");
  const [expanded, setExpanded] = useState(false);

  const MarkdownComponents: Record<string, React.FC<{ children: React.ReactNode }>> = {
    h1: ({ children }) => children ? <h1 className="text-3xl font-bold mt-8 mb-4 text-[#084248]">{children}</h1> : null,
    h2: ({ children }) => children ? <h2 className="text-2xl font-semibold mt-6 mb-3 text-[#084248]">{children}</h2> : null,
    h3: ({ children }) => children ? <h3 className="text-xl font-semibold mt-4 mb-2 text-[#0a5761]">{children}</h3> : null,
    p: ({ children }) => <p className="mb-4">{children}</p>,
    ul: ({ children }) => <ul className="list-disc pl-6 mb-4">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal pl-6 mb-4">{children}</ol>,
    li: ({ children }) => <li className="mb-2">{children}</li>,
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  };

  const handleShare = () => {
    // Implement share functionality
    console.log('Sharing post...');
  };

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <header className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-[#084248]">
              fibb.ai Blog
            </h1>
            <p className="text-xl text-gray-600">
              Insights, Updates, and Photography Tips
            </p>
          </header>

          <nav className="mb-8">
            <ul className="flex flex-wrap justify-center gap-4">
              {categories.map(category => (
                <li key={category}>
                  <button
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full ${activeCategory === category ? 'bg-[#084248] text-white' : 'bg-gray-200 text-[#084248]'}`}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-8">
            {activeCategory === "Product" && (
              <motion.article 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
              >
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-4 text-[#084248]">{blogPost.title}</h2>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>{blogPost.date}</span>
                    </div>
                    <button 
                      onClick={handleShare}
                      className="flex items-center text-[#084248] hover:text-[#0a5761] transition-colors duration-300"
                    >
                      <Share2 className="mr-2 h-4 w-4" /> Share
                    </button>
                  </div>
                  <p className="text-gray-600 mb-4">{blogPost.excerpt}</p>
                  <button 
                    onClick={() => setExpanded(!expanded)}
                    className="text-[#0a5761] hover:text-[#084248] transition-colors duration-300"
                  >
                    {expanded ? "Show Less" : "Read More"}
                  </button>
                </div>
                {expanded && (
                  <div className="px-6 pb-6">
                    <div className="prose max-w-none">
                      <ReactMarkdown components={MarkdownComponents}>{blogPost.content}</ReactMarkdown>
                    </div>
                    <div className="mt-8">
                      <p className="font-semibold">{blogPost.author}</p>
                      <p className="text-gray-600">{blogPost.role}</p>
                    </div>
                  </div>
                )}
              </motion.article>
            )}
            {activeCategory !== "Product" && (
              <p className="text-center text-gray-600 py-8">No posts available in this category yet.</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;