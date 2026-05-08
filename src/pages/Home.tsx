import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, HeartPulse, Home as HomeIcon, LineChart, HandHeart } from "lucide-react";
import { Helmet } from "react-helmet-async";

export function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NGO",
    "name": "The Protea Collective",
    "url": "https://www.theproteacollective.co.za",
    "description": "Cultivating Hope, Empowering Lives through rehabilitative health, crisis intervention, housing assistance, and philanthropy in South Africa.",
    "logo": "https://www.theproteacollective.co.za/logo.png"
  };

  return (
    <div className="w-full flex justify-center">
      <Helmet>
        <title>The Protea Collective | Health, Housing & Crisis Intervention</title>
        <meta name="description" content="Cultivating hope and empowering lives in South Africa. The Protea Collective provides critical health rehabilitation, crisis intervention, housing assistance, and philanthropic support to vulnerable communities." />
        <meta name="keywords" content="charity, NGO, South Africa, health rehabilitation, crisis intervention, housing assistance, philanthropy" />
        <meta property="og:title" content="The Protea Collective | Health, Housing & Crisis Intervention" />
        <meta property="og:description" content="Cultivating hope and empowering lives in South Africa. We provide critical health rehabilitation, crisis intervention, housing assistance, and philanthropic support to vulnerable communities." />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <div className="w-full">
        {/* Hero Section */}
        <section className="relative w-full overflow-hidden bg-stone-900 border-b-8 border-rose-600">
          <div className="absolute inset-0 opacity-40">
            <img 
              src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2070&auto=format&fit=crop" 
              alt="Community support and hope"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/60 to-transparent"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-48 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight mb-6">
                Cultivating Hope, <br/>
                <span className="text-rose-400 italic">Empowering Lives</span>
              </h1>
              <p className="text-lg md:text-xl text-stone-200 mb-10 leading-relaxed font-light">
                The Protea Collective provides critical health rehabilitation, crisis intervention, housing assistance, and philanthropic support to vulnerable communities.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/donate"
                  className="bg-rose-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-rose-500 transition-colors shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2"
                >
                  <HandHeart size={20} />
                  Donate Today
                </Link>
                <Link
                  to="/services"
                  className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
                >
                  Our Work <ArrowRight size={20} />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Four Pillars / Value Props */}
        <section className="py-20 bg-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Our Core Pillars</h2>
              <div className="w-24 h-1 bg-rose-200 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: <HeartPulse className="text-rose-600" size={32} />, title: "Medical Rehabilitation", desc: "Outpatient therapeutic care including physical therapy and specialized clinics." },
                { icon: <LineChart className="text-emerald-600" size={32} />, title: "Crisis Intervention", desc: "Acute mental health support, suicide prevention, and victim advocacy." },
                { icon: <HomeIcon className="text-blue-600" size={32} />, title: "Housing Assistance", desc: "Legal services, housing search, and security for the unhoused." },
                { icon: <HandHeart className="text-amber-600" size={32} />, title: "Philanthropy", desc: "Federated fund-raising to power long-term community transformation." },
              ].map((pillar, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow"
                >
                  <div className="bg-stone-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                    {pillar.icon}
                  </div>
                  <h3 className="text-xl font-bold font-serif text-stone-900 mb-3">{pillar.title}</h3>
                  <p className="text-stone-600 leading-relaxed font-light">{pillar.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mini Impact Banner */}
        <section className="py-20 bg-emerald-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-10">Real People. Real Impact.</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-10">
              {[
                { stat: "15k+", label: "Therapy Sessions" },
                { stat: "2,400", label: "Families Housed" },
                { stat: "24/7", label: "Crisis Hotline" },
              ].map((metric, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="text-4xl md:text-5xl font-bold text-emerald-400 mb-2">{metric.stat}</span>
                  <span className="text-emerald-50 uppercase tracking-wider text-xs md:text-sm font-medium">{metric.label}</span>
                </div>
              ))}
            </div>
            <Link to="/impact" className="inline-flex items-center gap-2 text-emerald-200 hover:text-white font-medium transition-colors border-b border-emerald-400 hover:border-white pb-1">
              View our full impact report <ArrowRight size={16} />
            </Link>
          </div>
        </section>
        {/* Partners Section */}
        <section className="py-20 bg-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Our Partners</h2>
            <div className="w-24 h-1 bg-rose-200 mx-auto rounded-full mb-12"></div>
            
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
              <img 
                src="https://placehold.co/400x120/ffffff/57534e?text=BackaBuddy" 
                alt="BackaBuddy" 
                className="h-12 md:h-16 object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100 mix-blend-multiply"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
