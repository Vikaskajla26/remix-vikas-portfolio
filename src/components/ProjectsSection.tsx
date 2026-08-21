import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Sparkles, ExternalLink, Film, ArrowUpRight } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { LiveProjectButton } from './LiveProjectButton';
import { ProjectItem } from '../types';

interface ProjectsSectionProps {
  onLiveProjectClick?: (project: ProjectItem) => void;
}

const PROJECTS: ProjectItem[] = [
  {
    id: 'reel-edit-1',
    number: '01',
    name: 'UGC & EdTech Reel',
    category: 'Client',
    videoUrl: '/reel1.mp4',
    aspectRatio: '9:16',
    duration: '0:35',
    tags: ['UGC Video', 'EdTech', 'Sound Design', 'High Retention Cuts'],
    description:
      'High-retention UGC & EdTech reel crafted with dynamic typography, audio-visual synchronisation, and quick-paced storytelling designed to maximize hook rates and user engagement.',
    liveUrl: 'https://www.instagram.com/reel/DbC8XLAJAHv/?igsh=MWYxYzEwemU5ZmFodw==',
  },
  {
    id: 'reel-edit-2',
    number: '02',
    name: 'Cinematic Story Reel',
    category: 'Personal',
    videoUrl: '/reel2.mp4',
    aspectRatio: '9:16',
    duration: '0:42',
    client: 'Cinematic Vaidya',
    tags: ['Cinematic Edit', 'Color Grading', 'Sound FX', '3D Motion'],
    description:
      'Cinematic reel edit with dramatic pacing, custom sound design, atmosphere transitions, and precision color grading tuned for immersive visual storytelling.',
    liveUrl: 'https://www.instagram.com/cinematicvaidya/reel/DblsuhKMGem/',
  },
  {
    id: 'reel-edit-3',
    number: '03',
    name: 'AI Video & 3D Motion Narrative',
    category: 'AI Video',
    videoUrl: '/reel4.mp4',
    aspectRatio: '9:16',
    duration: '0:30',
    client: 'Creative Studio',
    tags: ['AI Generation', 'VFX Motion', 'Retention Hook', 'Premiere Pro'],
    description:
      'Transformative AI visual editing combining custom generated 3D elements, speed ramps, impactful sound design, and viral narrative hooks.',
    liveUrl: 'https://www.instagram.com/cinematicvaidya/reel/DZu_0jmMQvB/',
  },
  {
    id: 'reel-edit-4',
    number: '04',
    name: 'Cinematic Visual Edit',
    category: 'Personal',
    videoUrl: '/reel5.mp4',
    aspectRatio: '9:16',
    duration: '0:38',
    client: 'Cinematic Vaidya',
    tags: ['Atmospheric FX', 'Audio Sync', 'Pacing', 'After Effects'],
    description:
      'Atmospheric short-form video edit featuring rhythm-synced beats, smooth transitions, and cinematic color palettes.',
    liveUrl: 'https://www.instagram.com/cinematicvaidya/reel/DblsuhKMGem/',
  },
];

interface CardProps {
  project: ProjectItem;
  index: number;
  totalCards: number;
  onLiveProjectClick?: (project: ProjectItem) => void;
}

const ProjectCard: React.FC<CardProps> = ({
  project,
  index,
  totalCards,
  onLiveProjectClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  const attemptPlay = useCallback(async () => {
    if (!videoRef.current) return;
    try {
      videoRef.current.muted = isMuted;
      await videoRef.current.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, [isMuted]);

  useEffect(() => {
    // Autoplay muted video in preview
    attemptPlay();
  }, [attemptPlay]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      attemptPlay();
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  return (
    <div
      ref={containerRef}
      className="sticky top-20 sm:top-24 md:top-28 mb-12 sm:mb-20 flex justify-center items-center w-full"
      style={{
        paddingTop: `${index * 28}px`,
      }}
    >
      <motion.div
        style={{ scale }}
        className="rounded-[36px] sm:rounded-[48px] md:rounded-[56px] border-2 border-[#D7E2EA]/40 bg-[#0C0C0C] p-5 sm:p-7 md:p-9 w-full max-w-6xl mx-auto flex flex-col gap-6 shadow-2xl overflow-hidden transition-all duration-300 backdrop-blur-sm"
      >
        {/* Top Row: Header with Number, Title, Tags, Live Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#D7E2EA]/20">
          <div className="flex items-center gap-3 sm:gap-5 flex-wrap">
            {/* Number */}
            <span
              style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.5rem)' }}
              className="font-black text-[#D7E2EA] leading-none"
            >
              {project.number}
            </span>

            {/* Category Tag */}
            <span className="text-xs sm:text-sm font-light uppercase tracking-widest px-3 py-1 rounded-full border border-[#D7E2EA]/40 text-[#D7E2EA] bg-[#141414]">
              {project.category}
            </span>

            {/* Project Name */}
            <h3
              style={{ fontSize: 'clamp(1.1rem, 2.2vw, 2rem)' }}
              className="font-medium uppercase text-[#D7E2EA] tracking-wide"
            >
              {project.name}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Project Button */}
            <LiveProjectButton
              href={project.liveUrl}
              onClick={() => onLiveProjectClick?.(project)}
            />
          </div>
        </div>

        {/* Bottom Row: Video Showcase + Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Video Player Column (5 cols on lg) */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div
              onClick={togglePlay}
              className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[9/16] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#141414] border border-[#262626] shadow-2xl group hover:border-[#646973] transition-all duration-300 cursor-pointer"
            >
              <video
                ref={videoRef}
                src={project.videoUrl}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70 group-hover:opacity-85 transition-opacity pointer-events-none" />

              {/* Audio Toggle Button */}
              <button
                onClick={toggleMute}
                className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all shadow-lg cursor-pointer"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              {/* Play / Pause Center Overlay */}
              {!isPlaying && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/40 backdrop-blur-[2px] transition-all">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 ml-0.5 fill-white text-white" />
                  </div>
                  <span className="text-[11px] text-white/80 font-mono mt-2 uppercase tracking-wider">
                    Click to Play
                  </span>
                </div>
              )}

              {isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                    <Pause className="w-4 h-4 fill-white" />
                  </div>
                </div>
              )}

              {/* Video Bottom Label */}
              <div className="absolute bottom-3 left-3 right-3 pointer-events-none z-10">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#D7E2EA]/70 block">
                  Vertical Video • 9:16
                </span>
                <span className="text-sm font-semibold text-white truncate block">
                  {project.name}
                </span>
              </div>
            </div>
          </div>

          {/* Details & Specs Column (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full gap-6">
            {/* Overview */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B600A8] font-mono">
                <Sparkles className="w-4 h-4" />
                <span>Recent Edit Showcase</span>
              </div>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[#D7E2EA]/90 font-light">
                {project.description}
              </p>
            </div>

            {/* Tags Grid */}
            <div className="flex flex-col gap-2.5">
              <span className="text-xs uppercase tracking-widest text-[#646973] font-mono">
                Edit Highlights & Tech
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tags?.map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    className="px-3 py-1 rounded-full text-xs font-mono bg-[#181818] border border-[#2A2A2A] text-[#D7E2EA]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onLiveProjectClick?.(project)}
                className="px-5 py-2.5 rounded-full bg-[#D7E2EA] text-black font-semibold text-xs sm:text-sm uppercase tracking-wider hover:bg-white transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Film className="w-4 h-4" />
                <span>Watch Breakdown</span>
              </button>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-full bg-[#1A1A1A] border border-[#333] text-[#D7E2EA] font-medium text-xs sm:text-sm uppercase tracking-wider hover:bg-[#252525] hover:border-[#555] transition-all flex items-center gap-2"
                >
                  <span>Open Reel</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onLiveProjectClick,
}) => {
  return (
    <section
      id="projects"
      className="bg-[#0C0C0C] text-[#D7E2EA] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-20 px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 select-none"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <FadeIn delay={0} y={40}>
          <div className="text-center mb-16 sm:mb-20">
            <span className="text-xs uppercase tracking-widest text-[#646973] font-mono block mb-2">
              Portfolio & Recent Edits
            </span>
            <h2
              style={{ fontSize: 'clamp(2.8rem, 10vw, 140px)' }}
              className="hero-heading font-black uppercase leading-none tracking-tight"
            >
              Recent Edits
            </h2>
          </div>
        </FadeIn>

        {/* Sticky Stacking Cards Container */}
        <div className="relative flex flex-col gap-8 pb-20">
          {PROJECTS.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              totalCards={PROJECTS.length}
              onLiveProjectClick={onLiveProjectClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
