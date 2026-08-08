import React from 'react';
import { FadeIn } from './FadeIn';
import { ServiceItem } from '../types';

const SERVICES: ServiceItem[] = [
  {
    number: '01',
    title: 'AI Video Editing',
    description:
      'Transforming AI-generated visuals into cinematic, engaging videos with seamless cuts, sound design, motion, and storytelling.',
  },
  {
    number: '02',
    title: 'CREATOR & UGC EDITING',
    description:
      'High-retention edits for creators, brands, and UGC -- from talking-head content and reels to product-driven social media videos.',
  },
  {
    number: '03',
    title: 'ANIMATION & MOTION',
    description:
      'Editing animated, toon, and motion-driven content with expressive timing, transitions, typography, and visual effects.',
  },
  {
    number: '04',
    title: 'SHORT-FORM & SOCIAL',
    description:
      'High-impact Reels, Shorts, and vertical content engineered around strong hooks, pacing, retention, and shareability.',
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      className="bg-white text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-10 select-none"
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <FadeIn delay={0} y={40}>
          <h2
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
            className="font-black uppercase text-center text-[#0C0C0C] leading-none tracking-tight mb-16 sm:mb-20 md:mb-28"
          >
            Services
          </h2>
        </FadeIn>

        {/* Vertical List of 5 Service Items */}
        <div className="flex flex-col divide-y divide-[#0C0C0C]/15 border-t border-b border-[#0C0C0C]/15">
          {SERVICES.map((item, index) => (
            <FadeIn key={item.number} delay={index * 0.1} y={30}>
              <div className="py-8 sm:py-10 md:py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-12 group hover:bg-[#0C0C0C]/[0.02] transition-colors duration-300 px-2 sm:px-4 rounded-2xl">
                {/* Left: Number */}
                <div
                  style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
                  className="font-black text-[#0C0C0C] leading-none shrink-0 w-full md:w-[220px] lg:w-[260px]"
                >
                  {item.number}
                </div>

                {/* Right: Stacked Name & Description */}
                <div className="flex flex-col gap-2 md:gap-3 flex-1">
                  <h3
                    style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                    className="font-medium uppercase text-[#0C0C0C] tracking-wide"
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                    className="font-light leading-relaxed max-w-2xl text-[#0C0C0C] opacity-60"
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        {/* Tagline replacing item 05 */}
        <FadeIn delay={0.4} y={30}>
          <div className="mt-16 sm:mt-20 md:mt-24 text-center px-4">
            <p
              style={{ fontSize: 'clamp(1.2rem, 3vw, 2.25rem)' }}
              className="font-bold uppercase tracking-tight max-w-3xl mx-auto leading-snug bg-gradient-to-r from-[#0C0C0C] via-[#646973] to-[#0C0C0C] bg-clip-text text-transparent"
            >
              Different formats. One obsession — making every frame matter.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
