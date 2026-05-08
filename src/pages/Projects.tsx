import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useProjects } from "../context/ProjectContext";
import { Heart, Edit2, Plus, Trash2, X, LogIn, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { Project } from "../data/projects";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";

function ProjectModal({ project, onClose, onSave }: { project?: Project | null, onClose: () => void, onSave: (p: Partial<Project>) => void }) {
  const [formData, setFormData] = useState<Partial<Project>>(project || {
    title: "",
    slug: "",
    category: "Rehabilitative Service",
    shortDescription: "",
    fullDescription: "",
    imageUrl: "https://images.unsplash.com/photo-1593113565245-5dd502f90a6e?q=80&w=2070&auto=format&fit=crop",
    goal: 100000,
    raised: 0,
    donors: 0,
    icon: "Heart"
  });

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  return (
    <div className="fixed inset-0 bg-stone-900/60 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif font-bold">{project ? "Edit Project" : "New Project"}</h2>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full"><X size={20} /></button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1">Title</label>
            <input 
              type="text" 
              className="w-full border border-stone-300 rounded-lg p-2"
              value={formData.title} 
              onChange={e => {
                const title = e.target.value;
                setFormData(prev => ({ ...prev, title, slug: prev.title === prev.slug || !prev.slug ? generateSlug(title) : prev.slug }));
              }} 
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Slug</label>
            <input 
              type="text" 
              className="w-full border border-stone-300 rounded-lg p-2 font-mono text-sm"
              value={formData.slug} 
              onChange={e => setFormData({ ...formData, slug: e.target.value })} 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-1">Goal (ZAR)</label>
              <input 
                type="number" 
                className="w-full border border-stone-300 rounded-lg p-2"
                value={formData.goal} 
                onChange={e => setFormData({ ...formData, goal: Number(e.target.value) })} 
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Raised (ZAR)</label>
              <input 
                type="number" 
                className="w-full border border-stone-300 rounded-lg p-2"
                value={formData.raised} 
                onChange={e => setFormData({ ...formData, raised: Number(e.target.value) })} 
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Image URL</label>
            <input 
              type="text" 
              className="w-full border border-stone-300 rounded-lg p-2"
              value={formData.imageUrl} 
              onChange={e => setFormData({ ...formData, imageUrl: e.target.value })} 
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Short Description</label>
            <textarea 
              rows={2}
              className="w-full border border-stone-300 rounded-lg p-2"
              value={formData.shortDescription} 
              onChange={e => setFormData({ ...formData, shortDescription: e.target.value })} 
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Full Description</label>
            <textarea 
              rows={4}
              className="w-full border border-stone-300 rounded-lg p-2"
              value={formData.fullDescription as string} 
              onChange={e => setFormData({ ...formData, fullDescription: e.target.value })} 
            />
          </div>
          
          <div className="pt-4 flex justify-end gap-3">
            <button onClick={onClose} className="px-4 py-2 font-medium text-stone-600 hover:bg-stone-100 rounded-lg">Cancel</button>
            <button 
              onClick={() => {
                if (formData.title && formData.slug) {
                  onSave(formData);
                }
              }} 
              className="px-6 py-2 bg-rose-600 text-white font-medium rounded-lg hover:bg-rose-700"
            >
              Save Project
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function Projects() {
  const { projects, addProject, updateProject, deleteProject, loading } = useProjects();
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        setIsAdminMode(true);
      } else {
        setIsAdminMode(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleAuth = async () => {
    if (user) {
      await signOut(auth);
    } else {
      const provider = new GoogleAuthProvider();
      try {
        await signInWithPopup(auth, provider);
      } catch (error) {
        console.error("Auth error", error);
        alert("Failed to authenticate. Ensure the Google provider is enabled and your email is authorized.");
      }
    }
  };

  const handleSave = async (data: Partial<Project>) => {
    try {
      if (editingProject) {
        await updateProject(editingProject.id, data);
        setEditingProject(null);
      } else if (isAddingProject) {
        await addProject({
          ...data,
          id: `p_${Date.now()}`
        } as Project);
        setIsAddingProject(false);
      }
    } catch (e: any) {
      alert("Error saving project: " + e.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete project?')) {
      try {
        await deleteProject(id);
      } catch (e: any) {
        alert("Error deleting project: " + e.message);
      }
    }
  }

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
          <button 
            onClick={handleAuth}
            className="absolute top-0 right-0 flex items-center gap-2 bg-stone-800 text-stone-300 px-4 py-2 rounded-lg text-sm hover:bg-stone-700 hover:text-white transition-colors"
          >
            {user ? <><LogOut size={16} /> Logout</> : <><LogIn size={16} /> Admin Login</>}
          </button>
          
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
          
          {isAdminMode && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 flex gap-4 justify-center">
              {projects.length === 0 && (
                <button 
                  onClick={async () => {
                    import('../data/projects').then(async ({ PROJECTS }) => {
                      for (const p of PROJECTS) {
                        try {
                           await addProject(p);
                        } catch (e) {
                           console.error(e);
                        }
                      }
                    });
                  }}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full font-medium shadow-sm transition-all"
                >
                  <Plus size={20} /> Seed Initial Projects
                </button>
              )}
              <button 
                onClick={() => setIsAddingProject(true)}
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-full font-medium shadow-sm transition-all"
              >
                <Plus size={20} /> Add New Project
              </button>
            </motion.div>
          )}
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
                {isAdminMode && (
                  <div className="absolute top-4 right-4 z-30 flex gap-2">
                    <button 
                      onClick={(e) => { e.preventDefault(); setEditingProject(project); }}
                      className="bg-white/90 backdrop-blur text-stone-700 p-2 rounded-full hover:text-blue-600 shadow-sm"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={(e) => { e.preventDefault(); handleDelete(project.id); }}
                      className="bg-white/90 backdrop-blur text-stone-700 p-2 rounded-full hover:text-red-600 shadow-sm"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}

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

      {/* Editor Modal */}
      {(editingProject || isAddingProject) && (
        <ProjectModal 
          project={editingProject} 
          onClose={() => { setEditingProject(null); setIsAddingProject(false); }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

