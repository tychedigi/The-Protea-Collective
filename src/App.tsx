import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { Projects } from './pages/Projects';
import { ProjectDetail } from './pages/ProjectDetail';
import { Impact } from './pages/Impact';
import { Blog } from './pages/Blog';
import { Donate } from './pages/Donate';
import { ProjectProvider } from './context/ProjectContext';

export default function App() {
  return (
    <HelmetProvider>
      <ProjectProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="services" element={<Services />} />
              <Route path="projects" element={<Projects />} />
              <Route path="projects/:slug" element={<ProjectDetail />} />
              <Route path="impact" element={<Impact />} />
              <Route path="blog" element={<Blog />} />
              <Route path="donate" element={<Donate />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ProjectProvider>
    </HelmetProvider>
  );
}

