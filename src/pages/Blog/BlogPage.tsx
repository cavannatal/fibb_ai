import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Share2, ChevronDown, ChevronUp } from 'lucide-react';
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

const blogPosts: BlogPost[] = [
  {
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

Cheers,`,
    date: "2024-09-30",
    category: "Product",
    author: "Matt Yee",
    role: "Co-Founder & CEO",
  },
  {
    id: 2,
    title: "We're Hiring!!",
    excerpt: "We are looking for talented individuals to join our Team and help us achieve our goal of revolutionizing AI Images!",
    content: `# We're Hiring!

Hey everyone,
Exciting news from fibb.ai! As we prepare to unveil our innovative product on October 11, 2024, we're also planning for significant growth. Starting November 1st, we'll be expanding our talented team to better serve you, our valued customers and partners.

### We're searching for exceptional individuals to join us in key roles:
- A visionary Head of Sales to lead our outreach across consumer, business, and professional segments

- Skilled Backend Developers to enhance our technological capabilities

- A brilliant AI Researcher to push the boundaries of what's possible with artificial intelligence

These additions to our team reflect our commitment to delivering cutting-edge solutions and unparalleled service to both consumers and businesses. We're dedicated to finding individuals who not only possess top-notch skills but also share our passion for innovation and customer satisfaction.

As we embark on this exciting new chapter, we want to thank you for your continued support. Your trust in fibb.ai drives us to constantly improve and expand our offerings.

If you're passionate about technology and interested in seeing how your skills might be a fit for the fibb.ai team, we'd love to hear from you! Please reach out to hiring@fibb.ai to learn more about these opportunities.

Stay tuned for more updates as we continue to grow and evolve. The future is bright at fibb.ai, and we're thrilled to have you along for the journey!

Cheers,`,
    date: "2024-10-2",
    category: "Product",
    author: "Matt Yee",
    role: "Co-Founder & CEO"
  },
  {
    id: 3,
    title: "Epic Launch Party and Exciting New Opportunities!",
    excerpt: "Join us for our pre-launch extravaganza and learn about our expanded hiring initiative as we gear up for an incredible future at fibb.ai!",
    content: `# The One Where We Have an Epic Launch Party!

Hey fibb.ai community,

We've got some thrilling updates to share with you all! As we approach our big launch, the excitement is building, and we can't wait to celebrate with you. Plus, we're expanding our team even further to meet the incredible demand we're seeing. Let's dive into the details!

## Pre-Launch Party Extravaganza

Mark your calendars for this coming Wednesday! We're hosting an epic pre-launch party, and you're all invited. This is your chance to:

- Get hands-on experience with our patented technology before anyone else
- Enjoy live music and a DJ spinning the latest hits
- Indulge in delicious free food (because who doesn't love that?)
- Network with the fibb.ai team and fellow tech enthusiasts

We're beyond excited to meet everyone and give you a sneak peek into the future of AI imaging. It's going to be a night to remember!

## We're Growing Even More!

The response to our upcoming launch has been overwhelming, and to meet the demand, we're expanding our team even further. We're thrilled to announce that we're hiring for an additional 8 roles in our sales department:

- 2 Enterprise Sales Representatives
- 2 Small and Medium Business Sales Representatives
- 2 Professional Segment Sales Representatives
- 2 Consumer Sales Representatives

This expansion of our sales team reflects our commitment to serving all segments of the market with the attention and expertise they deserve. Whether you're a seasoned sales pro or a rising star looking to make your mark in the AI industry, we want to hear from you!

If you're passionate about technology, have a knack for building relationships, and want to be part of a revolutionary product launch, please reach out to us at hiring@fibb.ai. We can't wait to meet the talented individuals who will help drive fibb.ai's success across all market segments.

## What's Next?

As we count down the days to our official launch, the energy at fibb.ai is electric. We're working around the clock to ensure that our product not only meets but exceeds your expectations.

Stay tuned for more updates, and don't forget to join us at the pre-launch party next Wednesday. It's going to be an incredible opportunity to experience the future of AI imaging firsthand.

Thank you for your continued support and enthusiasm. We couldn't be more excited about what's to come, and we're thrilled to have you all along for the ride!

See you at the party!

Cheers,
Matt Yee
Co-Founder & CEO, fibb.ai`,
    date: "2024-10-05",
    category: "Product",
    author: "Matt Yee",
    role: "Co-Founder & CEO"
  }
];

const categories = ["Product", "Dev", "AI Research", "Updates"];

const Blog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("Product");
  const [expandedId, setExpandedId] = useState<number | null>(null);

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

 
  const filteredPosts = blogPosts
    .filter((post: BlogPost) => post.category === activeCategory)
    .sort((a: BlogPost, b: BlogPost) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
          
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-[#084248]"
          style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}>
            fibb.ai Blog
          </h1>
          <p className="text-xl text-gray-600"
          style={{ fontFamily: '"Font1", sans-serif' }}>
            Insights, Updates, and Photography Tips
          </p>
        </motion.header>

        <nav className="mb-12">
          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {categories.map((category, index) => (
              <motion.li
                key={category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <button
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                    activeCategory === category
                      ? 'bg-[#084248] text-white'
                      : 'bg-gray-200 text-[#084248] hover:bg-gray-300'
                  }`}
                  style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
                >
                  {category}
                </button>
              </motion.li>
            ))}
          </motion.ul>
        </nav>

        <AnimatePresence mode="wait">
          {filteredPosts.length > 0 ? (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {filteredPosts.map((post: BlogPost, index: number) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
                >
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4 text-[#084248]"
                    style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
                    >{post.title}</h2>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span
                        style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
                        >{post.date}</span>
                      </div>
                      <button
                        onClick={handleShare}
                        className="flex items-center text-[#084248] hover:text-[#0a5761] transition-colors duration-300"
                        style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
                      >
                        <Share2 className="mr-2 h-4 w-4" /> Share
                      </button>
                    </div>
                    <p className="text-gray-600 mb-4"
                    style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
                    >{post.excerpt}</p>
                    <button
                      onClick={() => setExpandedId(expandedId === post.id ? null : post.id)}
                      className="flex items-center text-[#0a5761] hover:text-[#084248] transition-colors duration-300"
                      style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
                    >
                      {expandedId === post.id ? (
                        <>
                          <ChevronUp className="mr-2 h-4 w-4" /> Show Less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="mr-2 h-4 w-4" /> Read More
                        </>
                      )}
                    </button>
                  </div>
                  <AnimatePresence>
                    {expandedId === post.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-6"
                      >
                        <div className="prose max-w-none text-lg"
                        style={{ fontFamily: '"Font1", sans-serif' }}
                        >
                          <ReactMarkdown components={MarkdownComponents}>{post.content}</ReactMarkdown>
                        </div>
                        <div className="mt-8">
                          <p className="font-semibold">{post.author}</p>
                          <p className="text-gray-600">{post.role}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <motion.p
              key="no-posts"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center text-gray-600 py-8"
            >
              No posts available in this category yet.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Blog;
