import React from 'react';
import { ContactButton } from './ContactButton';
import { FadeIn } from './FadeIn';
import { AnimatedText } from './AnimatedText';

interface AboutSectionProps {
  onContactClick?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onContactClick }) => {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="about"
      className="min-h-screen w-full relative flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 bg-[#0C0C0C] overflow-hidden select-none"
    >
      {/* Decorative 3D Images */}
      {/* Top-Left: Moon Icon */}
      <div className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-0 pointer-events-none">
        <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
            alt="3D Moon Decorative Icon"
            className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain drop-shadow-xl"
          />
        </FadeIn>
      </div>

      {/* Bottom-Left: 3D Object */}
      <div className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-0 pointer-events-none">
        <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
            alt="3D Object Decorative"
            className="w-[100px] sm:w-[140px] md:w-[180px] h-auto object-contain drop-shadow-xl"
          />
        </FadeIn>
      </div>

      {/* Top-Right: Lego Icon */}
      <div className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-0 pointer-events-none">
        <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
            alt="3D Lego Decorative Icon"
            className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain drop-shadow-xl"
          />
        </FadeIn>
      </div>

      {/* Bottom-Right: 3D Group */}
      <div className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] z-0 pointer-events-none">
        <FadeIn delay={0.3} x={80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
            alt="3D Shapes Decorative Group"
            className="w-[130px] sm:w-[170px] md:w-[220px] h-auto object-contain drop-shadow-xl"
          />
        </FadeIn>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl mx-auto text-center gap-10 sm:gap-14 md:gap-16">
        {/* Heading */}
        <FadeIn delay={0} y={40}>
          <h2
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
          >
            About me
          </h2>
        </FadeIn>

        {/* Animated Paragraph & Copy */}
        <div className="flex flex-col items-center gap-8 sm:gap-10 max-w-[680px] w-full text-center">
          {/* Subheading */}
          <FadeIn delay={0.1} y={20}>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-[#D7E2EA] hero-heading">
              Curious by nature. Creative by choice.
            </h3>
          </FadeIn>

          {/* Body Text */}
          <div className="flex flex-col gap-5 text-sm sm:text-base md:text-lg text-[#D7E2EA]/85 font-light leading-relaxed">
            <AnimatedText
              text="I’m a BAMS student with a deep curiosity for learning, creating, and exploring the world beyond a single discipline."
              className="text-[#D7E2EA] font-medium text-center leading-relaxed"
            />

            <p className="text-[#D7E2EA]/80 leading-relaxed">
              From <span className="font-semibold text-white">Ayurveda to cinematography, editing to technology</span>, I’m constantly turning curiosity into craft.
            </p>
          </div>

          {/* Tagline / Callout */}
          <FadeIn delay={0.2} y={20}>
            <div className="px-6 py-2.5 rounded-full border border-[#B600A8]/50 bg-[#16021A] text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#D7E2EA] shadow-[0_0_20px_rgba(182,0,168,0.25)]">
              Learn &bull; Create &bull; Evolve
            </div>
          </FadeIn>

          <FadeIn delay={0.3} y={20} className="mt-4">
            <ContactButton onClick={onContactClick || scrollToContact} />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
