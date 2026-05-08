import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Users, Trophy, Target, Heart } from "lucide-react";
import { useEffect } from "react";
import { useProjects } from "../context/ProjectContext";

export function ProjectDetail() {
  const { projects, loading } = useProjects();
  const { slug } = useParams();
  const project = projects.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-600"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <h1 className="text-4xl font-serif font-bold text-stone-900 mb-4">Project Not Found</h1>
          <Link to="/projects" className="text-rose-600 font-medium hover:underline">
            ← Back to all projects
          </Link>
        </div>
      </div>
    );
  }

  const percentRaised = Math.min(100, Math.round((project.raised / project.goal) * 100));

  return (
    <div className="w-full flex-col flex items-center bg-stone-50 pb-24 min-h-screen">
      
      {/* Hero Header */}
      <section className="relative w-full h-[50vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-stone-900">
          <img 
            src={project.imageUrl} 
            alt={project.title}
            className="w-full h-full object-cover opacity-50 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/50 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-16">
          <Link to="/projects" className="inline-flex items-center gap-2 text-stone-300 hover:text-white transition-colors mb-8 font-medium w-fit">
            <ArrowLeft size={20} /> Back to Campaigns
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-block bg-rose-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
              {project.category}
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 max-w-4xl leading-tight">
              {project.title}
            </h1>
            <p className="text-xl text-stone-300 font-light max-w-2xl">
              {project.shortDescription}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:items-start">
          
          {/* Main Content */}
          <div className="lg:w-2/3 bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-stone-200/50 border border-stone-100">
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">About the Project</h2>
            <div className="prose prose-stone prose-lg font-light leading-relaxed text-stone-600 mb-12">
              <p>{project.fullDescription}</p>
            </div>
            
            <div className="border-t border-stone-100 pt-8 mt-8">
              <h3 className="text-xl font-serif font-bold text-stone-900 mb-6">Campaign Impact</h3>
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100 flex flex-col items-center text-center">
                  <Target className="text-rose-500 mb-3" size={32} />
                  <span className="text-2xl font-bold font-serif text-stone-900">R{(project.goal / 1000).toFixed(0)}k</span>
                  <span className="text-xs uppercase tracking-wider text-stone-500 font-bold mt-1">Goal</span>
                </div>
                <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 flex flex-col items-center text-center">
                  <Trophy className="text-emerald-600 mb-3" size={32} />
                  <span className="text-2xl font-bold font-serif text-emerald-900">R{(project.raised / 1000).toFixed(1)}k</span>
                  <span className="text-xs uppercase tracking-wider text-emerald-700 font-bold mt-1">Raised</span>
                </div>
                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex flex-col items-center text-center">
                  <Users className="text-blue-600 mb-3" size={32} />
                  <span className="text-2xl font-bold font-serif text-blue-900">{project.donors}</span>
                  <span className="text-xs uppercase tracking-wider text-blue-700 font-bold mt-1">Donors</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Donation Widget */}
          <div className="lg:w-1/3 sticky top-28">
            <motion.div 
              className="bg-white p-8 rounded-3xl shadow-2xl shadow-stone-200 border-t-4 border-rose-600"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-2xl font-serif font-bold text-stone-900 mb-6">Support this Program</h3>
              
              <div className="mb-8">
                <div className="flex justify-between text-sm font-medium text-stone-700 mb-2">
                  <span className="text-3xl font-bold font-serif text-stone-900">R{project.raised.toLocaleString()} <span className="text-sm font-sans font-medium text-stone-500">raised</span></span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-3 mb-2 overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-3 rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${percentRaised}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-stone-500">
                  <span>{percentRaised}% of R{project.goal.toLocaleString()} goal</span>
                  <span>{project.donors} donors</span>
                </div>
              </div>

              <Link
                to={`/donate?project=${project.id}`}
                className="w-full bg-stone-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-stone-800 transition-colors shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 mb-4"
              >
                <Heart size={20} className="text-rose-400" />
                Donate Now
              </Link>
              
              <p className="text-xs text-center text-stone-400">
                100% of your donation is securely routed to the {project.title} program.
              </p>
            </motion.div>
          </div>

        </div>
      </section>

    </div>
  );
}
