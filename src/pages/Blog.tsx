import { motion } from "motion/react";
import { Calendar, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";

const POSTS = [
  {
    id: 1,
    title: "New Rehabilitative Yoga Clinic Opens in the Inner City",
    excerpt: "Expanding our Other Health Services mandate, we're thrilled to announce the opening of a dedicated rehabilitative yoga and physical therapy center offering subsidized care.",
    date: "May 2, 2026",
    category: "Health",
    img: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Understanding Crisis Intervention: A Guide for Families",
    excerpt: "Mental health crises affect the whole family unit. Our lead counselors share insights on navigating acute mental health situations and suicide prevention support.",
    date: "April 18, 2026",
    category: "Mental Health",
    img: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Annual Federated Fundraising Drive Exceeds Goal",
    excerpt: "Thanks to our collective fundraising efforts and the philanthropic community, we've secured critical funding for housing assistance legal services for navigating housing laws.",
    date: "March 30, 2026",
    category: "Philanthropy",
    img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2070&auto=format&fit=crop"
  }
];

export function Blog() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "The Protea Collective News & Updates",
    "description": "Stories of care, operational updates, and perspectives from The Protea Collective.",
    "blogPost": POSTS.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "datePublished": new Date(post.date).toISOString(),
      "articleBody": post.excerpt,
      "image": post.img,
      "author": {
        "@type": "Organization",
        "name": "The Protea Collective"
      }
    }))
  };

  return (
    <div className="w-full flex justify-center py-16 bg-stone-50 min-h-screen">
      <Helmet>
        <title>News & Blog | The Protea Collective</title>
        <meta name="description" content="Read our latest stories, news, and operational updates on health rehabilitation, crisis intervention, housing, and philanthropy." />
        <meta name="keywords" content="NGO blog, charity news, mental health updates, community support articles" />
        <meta property="og:title" content="News & Blog | The Protea Collective" />
        <meta property="og:description" content="Stories of care, operational updates, and perspectives from The Protea Collective." />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <div className="mb-16">
          <motion.h1 
            className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            News & Updates
          </motion.h1>
          <motion.p 
            className="text-lg text-stone-600 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Stories of care, operational updates, and perspectives from The Protea Collective.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {POSTS.map((post, i) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200 group hover:shadow-lg transition-shadow flex flex-col"
            >
              <div className="aspect-video w-full overflow-hidden relative">
                <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-stone-800">
                  {post.category}
                </div>
                <img 
                  src={post.img} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-stone-500 text-sm mb-4">
                  <Calendar size={14} />
                  <time>{post.date}</time>
                </div>
                <h2 className="text-xl font-serif font-bold text-stone-900 mb-3 group-hover:text-rose-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-stone-600 font-light leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-auto">
                  <button className="text-rose-600 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                    Read Article <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </div>
  );
}
