import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Heart, Lock, ArrowRight } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";
import { useProjects } from "../context/ProjectContext";

const PRESET_AMOUNTS = [100, 500, 1000, 5000];

export function Donate() {
  const { projects } = useProjects();
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("project");
  
  const [amount, setAmount] = useState<number | "custom">(50);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string>(projectId || "general");

  const navigate = useNavigate();

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = amount === "custom" ? parseFloat(customAmount) : amount;
    if (!finalAmount || isNaN(finalAmount) || finalAmount <= 0) return;
    
    // Simulate updating the live project data through Context
    if (selectedProject !== 'general') {
      const project = projects.find(p => p.id === selectedProject);
      if (project) {
        // In a real app with a backend, we might wait for webhook confirmation before updating, 
        // but here we optimistically update the local state for a 'live' feel.
        await updateProject(project.id, {
          raised: project.raised + finalAmount,
          donors: project.donors + 1
        });
      }
    }

    alert(`Thank you for choosing to donate R${finalAmount} to ${selectedProject === 'general' ? 'General Fund' : projects.find(p => p.id === selectedProject)?.title}!`);
    
    // Redirect back to the project page to see the live update, or projects list
    if (selectedProject !== 'general') {
      const ptgt = projects.find(p => p.id === selectedProject);
      if (ptgt) navigate(`/projects/${ptgt.slug}`);
    } else {
      navigate('/projects');
    }
  };

  return (
    <div className="w-full flex justify-center py-16 bg-stone-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row gap-12">
        
        {/* Left Info Column */}
        <div className="lg:w-1/2 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="inline-flex items-center gap-2 text-rose-600 font-bold tracking-wider uppercase text-sm mb-4 bg-rose-100 px-3 py-1 rounded-full">
              <Heart size={16} className="fill-current" />
              Support Our Work
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-6 leading-tight">
              Your gift makes healing possible.
            </h1>
            <p className="text-lg text-stone-600 font-light leading-relaxed mb-8">
              Whether supporting our rehabilitative physical therapies or providing emergency crisis intervention counseling, your donation directly funds life-saving services.
            </p>
            
            <div className="space-y-6 text-stone-700">
              <div className="flex gap-4">
                <div className="w-16 h-14 shrink-0 bg-white rounded-xl shadow-sm flex items-center justify-center text-lg font-bold font-serif border border-stone-100">R100</div>
                <div className="pt-1"><p className="font-medium text-stone-900">Seeds Hope</p><p className="text-sm">Provides specialized trauma counseling manuals for victims.</p></div>
              </div>
              <div className="flex gap-4">
                <div className="w-16 h-14 shrink-0 bg-white rounded-xl shadow-sm flex items-center justify-center text-lg font-bold font-serif border border-stone-100">R500</div>
                <div className="pt-1"><p className="font-medium text-stone-900">Roots Recovery</p><p className="text-sm">Funds one intensive outpatient day at a nature cure center.</p></div>
              </div>
              <div className="flex gap-4">
                <div className="w-16 h-14 shrink-0 bg-white rounded-xl shadow-sm flex items-center justify-center text-lg font-bold font-serif border border-stone-100">R2500</div>
                <div className="pt-1"><p className="font-medium text-stone-900">Blooms Futures</p><p className="text-sm">Secures legal retention for a family facing unexpected eviction.</p></div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Donation Form */}
        <div className="lg:w-1/2 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl shadow-stone-200/50 border border-stone-100 relative z-10"
          >
            <form onSubmit={handleDonate}>
              {/* Type toggle */}
              <div className="flex p-1 bg-stone-100 rounded-xl mb-6">
                <button
                  type="button"
                  onClick={() => setIsRecurring(false)}
                  className={cn(
                    "flex-1 py-3 text-sm font-bold rounded-lg transition-all",
                    !isRecurring ? "bg-white text-stone-900 shadow-sm" : "text-stone-500 hover:text-stone-700"
                  )}
                >
                  Give Once
                </button>
                <button
                  type="button"
                  onClick={() => setIsRecurring(true)}
                  className={cn(
                    "flex-1 py-3 text-sm font-bold rounded-lg transition-all",
                    isRecurring ? "bg-white text-stone-900 shadow-sm" : "text-stone-500 hover:text-stone-700"
                  )}
                >
                  Monthly
                </button>
              </div>

              {/* Fund Selection */}
              <div className="mb-8">
                <label className="text-sm font-bold font-serif text-stone-900 mb-2 block">Direct my donation to</label>
                <select 
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-4 py-3 font-medium text-stone-700 outline-none focus:border-rose-300 focus:ring-4 focus:ring-rose-50 transition-all appearance-none"
                >
                  <option value="general">Area of Greatest Need (General Fund)</option>
                  <optgroup label="Specific Programs">
                    {projects.map(p => (
                      <option key={p.id} value={p.id}>{p.title}</option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Amounts Grid */}
              <h3 className="text-sm font-bold font-serif text-stone-900 mb-3 block">Choose Amount</h3>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {PRESET_AMOUNTS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => { setAmount(preset); setCustomAmount(""); }}
                    className={cn(
                      "py-4 rounded-xl border-2 font-bold text-lg font-serif transition-colors",
                      amount === preset 
                        ? "border-rose-600 bg-rose-50 text-rose-700" 
                        : "border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-stone-50"
                    )}
                  >
                    R{preset}
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="relative mb-8">
                <button
                  type="button"
                  onClick={() => setAmount("custom")}
                  className={cn(
                    "w-full text-left py-4 px-4 rounded-xl border-2 font-medium transition-colors flex items-center gap-2",
                    amount === "custom"
                      ? "border-rose-600 bg-rose-50 text-rose-900"
                      : "border-stone-200 text-stone-600 hover:border-stone-300"
                  )}
                >
                  <span className="font-bold text-lg font-serif">R</span>
                  {amount === "custom" ? (
                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      placeholder="Other Amount"
                      className="bg-transparent outline-none w-full border-none focus:ring-0 text-lg font-bold font-serif"
                      autoFocus
                    />
                  ) : (
                    <span className="text-lg font-bold font-serif">Other Amount</span>
                  )}
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-stone-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-stone-800 transition-colors shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
              >
                Continue to Payment
                <ArrowRight size={20} />
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-stone-400 text-xs text-center border-t border-stone-100 pt-6">
                <Lock size={14} />
                Secure donation via encrypted connection. Not real transaction.
              </div>
            </form>
          </motion.div>
          
          <div className="absolute -inset-4 bg-gradient-to-tr from-rose-100/50 to-amber-100/50 rounded-[2.5rem] -z-10 blur-xl"></div>
        </div>

      </div>
    </div>
  );
}
