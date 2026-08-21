import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Sparkles, Film, ShieldCheck, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (project && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [project]);

  if (!project) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const next = !isMuted;
      videoRef.current.muted = next;
      setIsMuted(next);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
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
          className="relative z-10 w-full max-w-4xl bg-[#0C0C0C] border-2 border-[#D7E2EA]/30 rounded-[28px] sm:rounded-[44px] p-5 sm:p-7 md:p-9 shadow-2xl text-[#D7E2EA] overflow-hidden max-h-[92vh] flex flex-col"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-30 p-2.5 rounded-full bg-[#1A1A1A]/90 backdrop-blur-md text-[#D7E2EA] hover:bg-[#2A2A2A] hover:text-white transition-colors cursor-pointer border border-white/10 shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Scrollable Container */}
          <div className="overflow-y-auto pr-1 custom-scrollbar flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xs font-black text-[#D7E2EA] bg-[#1A1A1A] px-3 py-1 rounded-full border border-[#333]">
                  {project.number}
                </span>
                <span className="text-xs uppercase tracking-widest px-3 py-1 rounded-full border border-[#D7E2EA]/40 text-[#D7E2EA]">
                  {project.category}
                </span>
                {project.client && (
                  <span className="text-xs uppercase tracking-widest text-[#646973] font-mono">
                    Client: {project.client}
                  </span>
                )}
              </div>
              <h2 className="hero-heading text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight">
                {project.name}
              </h2>
            </div>

            {/* Video Showcase Centerpiece */}
            <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#141414] border border-[#262626] shadow-xl flex items-center justify-center min-h-[320px] max-h-[520px]">
              <div
                onClick={togglePlay}
                className="relative w-full max-w-[340px] aspect-[9/16] cursor-pointer flex items-center justify-center my-2"
              >
                <video
                  ref={videoRef}
                  src={project.videoUrl}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover rounded-xl shadow-2xl"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />

                {/* Sound Control */}
                <button
                  onClick={toggleMute}
                  className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/70 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all shadow-lg cursor-pointer"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                {/* Play/Pause overlay */}
                {!isPlaying && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/40 backdrop-blur-[2px]">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-xl">
                      <Play className="w-7 h-7 ml-0.5 fill-white text-white" />
                    </div>
                  </div>
                )}

                {isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 hover:opacity-100 bg-black/20 transition-opacity pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                      <Pause className="w-5 h-5 fill-white" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Overview and Specs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#141414] border border-[#222]">
              <div className="md:col-span-2 flex flex-col gap-3">
                <h4 className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-semibold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#B600A8]" />
                  Editing Overview
                </h4>
                <p className="text-sm sm:text-base leading-relaxed text-[#D7E2EA]/90 font-light">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.tags?.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-[#1A1A1A] border border-[#333] text-[#D7E2EA]/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t md:border-t-0 md:border-l border-[#262626] pt-4 md:pt-0 md:pl-6">
                <h4 className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-semibold flex items-center gap-2">
                  <Film className="w-4 h-4 text-[#7621B0]" />
                  Edit Deliverables
                </h4>
                <ul className="text-xs text-[#D7E2EA]/80 flex flex-col gap-2.5">
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
                    <span>4K 60FPS High-Bitrate Render</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
                    <span>Dynamic Audio & SFX Design</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
                    <span>High-Retention Visual Hooks</span>
                  </li>
                </ul>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-[#D7E2EA] transition-colors shadow-lg"
                  >
                    <span>Open Live Reel</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
