import { Outlet, Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { Menu, X, Facebook, Instagram } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";
import { ProteaLogo } from "./ProteaLogo";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Projects", path: "/projects" },
  { name: "Impact", path: "/impact" },
  { name: "Blog", path: "/blog" },
];

export function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col items-center w-full">
      <header className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <span className="text-rose-600 bg-rose-50 p-2 rounded-full group-hover:bg-rose-100 transition-colors">
                <ProteaLogo className="w-6 h-6 fill-current" />
              </span>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl leading-none text-stone-900">The Protea Collective</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-rose-600",
                    location.pathname === link.path ? "text-rose-600" : "text-stone-600"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/donate"
                className="bg-rose-600 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-rose-700 transition-all shadow-sm hover:shadow active:scale-95"
              >
                Donate Now
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-stone-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute w-full bg-white border-b border-stone-200 shadow-lg"
          >
            <nav className="flex flex-col p-4 gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "block px-4 py-3 rounded-lg text-base font-medium transition-colors",
                    location.pathname === link.path
                      ? "bg-rose-50 text-rose-700"
                      : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/donate"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-2 text-center bg-rose-600 text-white px-4 py-3 rounded-lg text-base font-medium hover:bg-rose-700 transition-colors"
              >
                Donate Now
              </Link>
            </nav>
          </motion.div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full relative">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="w-full bg-stone-900 text-stone-400 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="font-serif text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-rose-500"><ProteaLogo className="w-8 h-8 fill-current" /></span>
                The Protea Collective
              </h3>
              <p className="max-w-sm mb-6">
                Dedicated to providing specialized health services, crisis intervention, housing support, and philanthropic giving to communities in need.
              </p>
              <div className="mt-6 inline-block bg-stone-800 text-stone-300 border border-stone-700 px-4 py-2 rounded-lg text-sm font-mono font-medium">
                NPO Tracking No: 334-395-NPO
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="hover:text-rose-400 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/donate" className="text-rose-400 hover:text-rose-300 transition-colors">
                    Make a Donation
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 mb-6">
                <li>info@theproteacollective.co.za</li>
                <li className="mt-4 pt-4 border-t border-stone-800 text-sm">
                  394 KAALPLAATS DISTRICK FOCHVILLE<br />
                  MERAFONG GAUTENG
                </li>
              </ul>
              
              <form 
                action="https://formsubmit.co/info@theproteacollective.co.za" 
                method="POST"
                className="mt-4 mb-6 space-y-3"
              >
                {/* Optional: Add subject line, disable captcha, etc */}
                <input type="hidden" name="_subject" value="New contact from The Protea Collective Website" />
                <input type="hidden" name="_captcha" value="false" />
                
                <input 
                  type="email" 
                  name="email"
                  required 
                  placeholder="Your Email" 
                  className="w-full bg-stone-800 border border-stone-700 rounded px-3 py-2 text-sm text-white placeholder-stone-400 focus:outline-none focus:border-rose-500" 
                />
                <textarea 
                  name="message"
                  required 
                  placeholder="Message" 
                  rows={2} 
                  className="w-full bg-stone-800 border border-stone-700 rounded px-3 py-2 text-sm text-white placeholder-stone-400 focus:outline-none focus:border-rose-500 resize-none" 
                />
                <button 
                  type="submit" 
                  className="w-full bg-rose-600 hover:bg-rose-500 text-white rounded px-3 py-2 text-sm font-medium transition-colors"
                >
                  Send Message
                </button>
              </form>

              <div className="flex gap-4 mt-2">
                <a href="https://www.facebook.com/share/1CVTrY5W8s/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-rose-400 transition-colors" aria-label="Facebook">
                  <Facebook size={20} />
                </a>
                <a href="https://www.instagram.com/proteacollective?igsh=dnljbml6OWplcXg2&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-rose-400 transition-colors" aria-label="Instagram">
                  <Instagram size={20} />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-stone-800 text-sm text-center">
            <p>&copy; {new Date().getFullYear()} The Protea Collective. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
