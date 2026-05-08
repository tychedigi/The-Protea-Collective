import React, { createContext, useContext, useState, useEffect } from "react";
import { Project, PROJECTS as INITIAL_PROJECTS } from "../data/projects";

interface ProjectContextType {
  projects: Project[];
  updateProject: (id: string, updatedProject: Partial<Project>) => Promise<void>;
  addProject: (project: Project) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  loading: boolean;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setProjects(INITIAL_PROJECTS);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const updateProject = async (id: string, updatedProject: Partial<Project>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updatedProject } : p));
  };

  const addProject = async (project: Project) => {
    setProjects(prev => [...prev, project]);
  };

  const deleteProject = async (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const value = {
    projects,
    updateProject,
    addProject,
    deleteProject,
    loading
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
}
