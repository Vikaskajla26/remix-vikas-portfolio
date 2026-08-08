import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Sparkles, Layers, ShieldCheck } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 280 }}
          className="relative z-10 w-full max-w-5xl bg-[#0C0C0C] border-2 border-[#D7E2EA]/30 rounded-[30px] sm:rounded-[50px] p-6 sm:p-8 md:p-10 shadow-2xl text-[#D7E2EA] overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-20 p-2.5 rounded-full bg-[#1A1A1A] text-[#D7E2EA] hover:bg-[#2A2A2A] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Scrollable Container */}
          <div className="overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-8">
            {/* Header */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-sm font-black text-[#D7E2EA] bg-[#1A1A1A] px-3 py-1 rounded-full border border-[#333]">
                  {project.number}
                </span>
                <span className="text-xs uppercase tracking-widest px-3 py-1 rounded-full border border-[#D7E2EA]/40 text-[#D7E2EA]">
                  {project.category} Project
                </span>
              </div>
              <h2 className="hero-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none">
                {project.name}
              </h2>
            </div>

            {/* Main Interactive Showcase Image */}
            <div className="relative rounded-[30px] sm:rounded-[40px] overflow-hidden bg-[#181818] border border-[#222] shadow-xl group">
              <img
                src={project.col2Image}
                alt={`${project.name} Hero`}
                className="w-full h-[300px] sm:h-[420px] md:h-[500px] object-cover transition-transform duration-700 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between w-full gap-4">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-green-400 font-semibold flex items-center gap-1.5 mb-1">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      Live Interactive Build
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-white">
                      {project.name} Showcase
                    </h3>
                  </div>
                  <a
                    href={project.liveUrl || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-xs sm:text-sm uppercase tracking-widest hover:bg-[#D7E2EA] transition-colors shadow-lg"
                  >
                    <span>Launch Experience</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Description & Technical Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-[30px] bg-[#141414] border border-[#222]">
              <div className="md:col-span-2 flex flex-col gap-3">
                <h4 className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-semibold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#B600A8]" />
                  Project Overview
                </h4>
                <p className="text-sm sm:text-base leading-relaxed text-[#D7E2EA]/90 font-light">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-col gap-3 border-t md:border-t-0 md:border-l border-[#262626] pt-4 md:pt-0 md:pl-6">
                <h4 className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-semibold flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#7621B0]" />
                  Specifications
                </h4>
                <ul className="text-xs text-[#D7E2EA]/80 flex flex-col gap-2">
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
                    <span>Real-time WebGL / Three.js Shaders</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
                    <span>High-poly 3D Geometry Baking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
                    <span>60 FPS Fluid Dynamic Lighting</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Secondary Renders Gallery */}
            <div className="flex flex-col gap-4">
              <h4 className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-semibold">
                High-Resolution Asset Shots
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="rounded-[30px] overflow-hidden bg-[#181818] border border-[#222]">
                  <img
                    src={project.col1Image1}
                    alt={`${project.name} Render 1`}
                    className="w-full h-[220px] sm:h-[280px] object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="rounded-[30px] overflow-hidden bg-[#181818] border border-[#222]">
                  <img
                    src={project.col1Image2}
                    alt={`${project.name} Render 2`}
                    className="w-full h-[220px] sm:h-[280px] object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
