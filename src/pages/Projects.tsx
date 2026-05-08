import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useProjects } from "../context/ProjectContext";
import { Heart } from "lucide-react";

export function Projects() {
  const { projects, loading } = useProjects();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center bg-stone-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-600"></div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center py-16 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="mb-16 relative">
          <motion.h1 
            className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Current <span className="text-rose-600 italic">Campaigns & Projects</span>
          </motion.h1>
          <motion.p 
            className="max-w-2xl text-lg text-stone-600 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Explore our active initiatives across health, housing, and philanthropy. Your support directly funds these vital programs.
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => {
            const percentRaised = Math.min(100, Math.round((project.raised / project.goal) * 100));
            return (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-stone-200 flex flex-col group relative"
              >
                <Link to={`/projects/${project.slug}`} className="block relative aspect-video overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent z-10"></div>
                  <div className="absolute bottom-4 left-4 z-20 bg-rose-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    {project.category}
                  </div>
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                </Link>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-serif font-bold text-stone-900 mb-3 leading-tight group-hover:text-rose-600 transition-colors">
                    <Link to={`/projects/${project.slug}`}>{project.title}</Link>
                  </h3>
                  <p className="text-stone-600 font-light mb-6 flex-grow line-clamp-3">
                    {project.shortDescription}
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm font-medium text-stone-600 mb-2">
                      <span>R{project.raised.toLocaleString()} raised</span>
                      <span>{percentRaised}%</span>
                    </div>
                    <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-emerald-500 h-2 rounded-full transition-all duration-1000" 
                        style={{ width: `${percentRaised}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-stone-400 mt-2 text-right">
                      Goal: R{project.goal.toLocaleString()}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-auto">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="text-center py-3 rounded-xl border-2 border-stone-200 text-stone-600 font-medium hover:border-stone-300 transition-colors text-sm"
                    >
                      Learn More
                    </Link>
                    <Link
                      to={`/donate?project=${project.id}`}
                      className="text-center py-3 rounded-xl bg-rose-600 text-white font-medium hover:bg-rose-500 transition-colors flex items-center justify-center gap-2 text-sm shadow-sm"
                    >
                      <Heart size={16} /> Donate
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
