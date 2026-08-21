import React from 'react';
import { ContactButton } from './ContactButton';
import { Magnet } from './Magnet';
import { FadeIn } from './FadeIn';

interface HeroSectionProps {
  onContactClick?: () => void;
}

// 3D Creator Character Portrait
const HERO_PORTRAIT_URL = '/hero-portrait.png';

export const HeroSection: React.FC<HeroSectionProps> = ({ onContactClick }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="h-[100dvh] min-h-[520px] w-full flex flex-col justify-between overflow-x-clip overflow-y-hidden relative bg-[#0C0C0C] select-none">
      {/* Navbar */}
      <FadeIn delay={0} y={-20} className="w-full z-30">
        <nav className="flex items-center justify-between w-full px-5 sm:px-8 md:px-10 pt-5 sm:pt-6 md:pt-8 text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-base md:text-lg lg:text-[1.35rem]">
          <button
            onClick={() => scrollTo('about')}
            className="hover:opacity-70 transition-opacity duration-200 cursor-pointer bg-transparent border-none text-inherit p-0"
          >
            About
          </button>
          <button
            onClick={() => scrollTo('services')}
            className="hover:opacity-70 transition-opacity duration-200 cursor-pointer bg-transparent border-none text-inherit p-0"
          >
            Price
          </button>
          <button
            onClick={() => scrollTo('projects')}
            className="hover:opacity-70 transition-opacity duration-200 cursor-pointer bg-transparent border-none text-inherit p-0"
          >
            Projects
          </button>
          <button
            onClick={onContactClick || (() => scrollTo('contact'))}
            className="hover:opacity-70 transition-opacity duration-200 cursor-pointer bg-transparent border-none text-inherit p-0"
          >
            Contact
          </button>
        </nav>
      </FadeIn>

      {/* Hero Center Stage: Heading + 3D Character Layered Together */}
      <div className="relative flex-1 flex flex-col items-center justify-center w-full my-auto z-10 px-2">
        {/* Hero Heading (Behind 3D Character) */}
        <div className="w-full overflow-hidden flex justify-center z-0 pointer-events-none mb-4 sm:mb-8 md:mb-12">
          <FadeIn delay={0.15} y={30} className="w-full">
            <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center text-[12.5vw] sm:text-[13vw] md:text-[14vw] lg:text-[14.5vw] xl:text-[14vw]">
              Hi, i&apos;m vikas
            </h1>
          </FadeIn>
        </div>

        {/* Hero Portrait (Magnet with Mobile Touch & Gyroscope Tracking) */}
        <div className="absolute left-1/2 -translate-x-1/2 z-10 bottom-0 pointer-events-auto flex items-center justify-center">
          {/* Ambient Radial Glow behind character */}
          <div className="absolute w-[95%] h-[95%] rounded-full bg-gradient-to-tr from-[#B600A8]/30 via-[#404552]/40 to-transparent blur-3xl pointer-events-none -z-10" />

          <FadeIn delay={0.6} y={25}>
            <Magnet
              padding={180}
              strength={3.2}
              activeTransition="transform 0.25s ease-out"
              inactiveTransition="transform 0.7s ease-in-out"
              className="w-[290px] xs:w-[330px] sm:w-[440px] md:w-[580px] lg:w-[720px] xl:w-[840px] max-w-[92vw]"
            >
              <div className="relative w-full flex justify-center [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)]">
                <img
                  src={HERO_PORTRAIT_URL}
                  alt="Vikas 3D Creator Portrait"
                  referrerPolicy="no-referrer"
                  className="max-h-[46vh] xs:max-h-[50vh] sm:max-h-[56vh] md:max-h-[72vh] lg:max-h-[80vh] w-auto h-auto object-contain pointer-events-none select-none drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)] filter contrast-105 transition-transform duration-300"
                />
              </div>
            </Magnet>
          </FadeIn>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full flex items-end justify-between px-5 sm:px-8 md:px-10 pb-4 sm:pb-6 md:pb-8 z-30">
        <FadeIn delay={0.35} y={20}>
          <p
            style={{ fontSize: 'clamp(0.65rem, 1.3vw, 1.4rem)' }}
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[130px] xs:max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
          >
            a video editor who brings stories to life and grab your attention and leave an impact
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20} className="scale-90 xs:scale-95 sm:scale-100 origin-bottom-right">
          <ContactButton onClick={onContactClick || (() => scrollTo('contact'))} />
        </FadeIn>
      </div>
    </section>
  );
};
