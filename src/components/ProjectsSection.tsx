import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { LiveProjectButton } from './LiveProjectButton';
import { ProjectItem } from '../types';

interface ProjectsSectionProps {
  onLiveProjectClick?: (project: ProjectItem) => void;
}

const PROJECTS: ProjectItem[] = [
  {
    id: 'nextlevel-studio',
    number: '01',
    name: 'Nextlevel Studio',
    category: 'Client',
    col1Image1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
    col1Image2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
    col2Image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
    description:
      'Interactive 3D web experience for Nextlevel Studio featuring photorealistic lighting, dynamic camera movements, and custom asset shaders.',
    liveUrl: 'https://www.instagram.com/reel/DbC8XLAJAHv/?igsh=MWYxYzEwemU5ZmFodw==',
  },
  {
    id: 'aura-brand-identity',
    number: '02',
    name: 'Aura Brand Identity',
    category: 'Personal',
    col1Image1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
    col1Image2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
    col2Image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
    description:
      'Comprehensive brand identity exploration utilizing organic 3D glass forms, vibrant gradients, and elegant typography systems.',
    liveUrl: 'https://www.instagram.com/cinematicvaidya/reel/DblsuhKMGem/',
  },
  {
    id: 'solaris-digital',
    number: '03',
    name: 'Solaris Digital',
    category: 'Client',
    col1Image1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
    col1Image2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
    col2Image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
    description:
      'Futuristic digital ecosystem design featuring real-time 3D solar system simulations, clean UI layouts, and smooth fluid animations.',
    liveUrl: 'https://www.instagram.com/cinematicvaidya/reel/DZu_0jmMQvB/',
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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

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
        className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 w-full max-w-6xl mx-auto flex flex-col gap-6 shadow-2xl overflow-hidden transition-all duration-300"
      >
        {/* Top Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#D7E2EA]/20">
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            {/* Number */}
            <span
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
              className="font-black text-[#D7E2EA] leading-none"
            >
              {project.number}
            </span>

            {/* Category Tag */}
            <span className="text-xs sm:text-sm font-light uppercase tracking-widest px-3 py-1 rounded-full border border-[#D7E2EA]/40 text-[#D7E2EA]">
              {project.category}
            </span>

            {/* Project Name */}
            <h3
              style={{ fontSize: 'clamp(1.1rem, 2.5vw, 2.2rem)' }}
              className="font-medium uppercase text-[#D7E2EA] tracking-wide"
            >
              {project.name}
            </h3>
          </div>

          {/* Ghost Live Project Button */}
          <LiveProjectButton
            href={project.liveUrl}
            onClick={() => onLiveProjectClick?.(project)}
          />
        </div>

        {/* Bottom Row: Two-Column Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 w-full items-stretch">
          {/* Left Column (40% width -> col-span-5) */}
          <div className="md:col-span-5 flex flex-col gap-4 sm:gap-6">
            {/* Left Top Image */}
            <div className="overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-[#181818] border border-[#222]">
              <img
                src={project.col1Image1}
                alt={`${project.name} preview 1`}
                style={{ height: 'clamp(130px, 16vw, 230px)' }}
                className="w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Left Bottom Image */}
            <div className="overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-[#181818] border border-[#222]">
              <img
                src={project.col1Image2}
                alt={`${project.name} preview 2`}
                style={{ height: 'clamp(160px, 22vw, 340px)' }}
                className="w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

          {/* Right Column (60% width -> col-span-7) */}
          <div className="md:col-span-7 h-full flex">
            <div className="overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-[#181818] border border-[#222] w-full h-full min-h-[280px] sm:min-h-[380px] md:min-h-[480px]">
              <img
                src={project.col2Image}
                alt={`${project.name} main preview`}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
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
          <h2
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
            className="hero-heading font-black uppercase text-center leading-none tracking-tight mb-16 sm:mb-20"
          >
            Project
          </h2>
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
