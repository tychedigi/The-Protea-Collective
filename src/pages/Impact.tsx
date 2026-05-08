import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";

export function Impact() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Report",
    "name": "Impact Report of The Protea Collective",
    "author": {
      "@type": "Organization",
      "name": "The Protea Collective"
    },
    "description": "Our impact by the numbers: Over 48,000 hours of clinical therapy provided, 1,250 individuals rehoused."
  };

  return (
    <div className="w-full flex flex-col items-center bg-stone-50">
      <Helmet>
        <title>Our Impact | The Protea Collective</title>
        <meta name="description" content="Discover the impact of The Protea Collective: over 48,000 hours of clinical therapy, 1,250 individuals rehoused, and millions in distributed funds." />
        <meta name="keywords" content="NGO impact, charity metrics, therapy hours, housed individuals, philanthropic distribution" />
        <meta property="og:title" content="Our Impact | The Protea Collective" />
        <meta property="og:description" content="Numbers tell a part of our story, but the real impact is measured in lives stabilized, minds healed, and communities strengthened." />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      {/* Header */}
      <section className="w-full bg-stone-900 text-white py-24 text-center px-4">
        <motion.h1 
          className="text-4xl md:text-6xl font-serif font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Measuring <span className="text-rose-400 italic">Our Impact</span>
        </motion.h1>
        <motion.p 
          className="max-w-2xl mx-auto text-lg text-stone-300 font-light leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Numbers tell a part of our story, but the real impact is measured in lives stabilized, minds healed, and communities strengthened.
        </motion.p>
      </section>

      {/* Stats Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 -mt-32">
          {[
            { value: "48,000+", label: "Hours of Clinical Therapy Provided", c: "bg-rose-600" },
            { value: "1,250", label: "Individuals Rehoused Successfully", c: "bg-emerald-600" },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (i * 0.1) }}
              className={`${stat.c} text-white p-10 rounded-3xl shadow-xl flex flex-col justify-center items-center text-center`}
            >
              <h3 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">{stat.value}</h3>
              <p className="text-lg font-medium opacity-90">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Narrative / Stories */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1544027993-37db48d8e318?q=80&w=2070&auto=format&fit=crop" 
              alt="Community member smiling"
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 mb-6">
              "They didn't just give me a house; they gave me my life back."
            </h2>
            <div className="w-16 h-1 bg-rose-500 mb-8 rounded-full"></div>
            <p className="text-lg text-stone-600 leading-relaxed mb-6 font-light">
              Through our integrated approach, an individual facing housing insecurity often receives parallel support for mental health crisis intervention and rehabilitative care. This comprehensive methodology dramatically reduces recidivism into homelessness. 
            </p>
            <p className="text-lg text-stone-600 leading-relaxed font-light">
              By federating our funds and distributing them effectively, we ensure that specialized clinics—whether they focus on nature cures, trauma-informed physical therapy, or legal housing aid—have the financial stability to stay open and serve.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
