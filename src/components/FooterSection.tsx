import React from 'react';
import { ContactButton } from './ContactButton';
import { FadeIn } from './FadeIn';
import { ArrowUp, Mail, Github, Twitter, Instagram, Linkedin } from 'lucide-react';

interface FooterSectionProps {
  onContactClick?: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onContactClick }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#0C0C0C] text-[#D7E2EA] pt-20 pb-12 px-6 md:px-10 border-t border-[#1C1C1C] relative z-20 select-none">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        {/* Main CTA */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-[#121212] border border-[#222] p-8 sm:p-12 rounded-[40px] shadow-2xl">
          <div className="flex flex-col gap-3 text-center md:text-left">
            <span className="text-xs uppercase tracking-widest text-[#B600A8] font-bold">
              Ready to collaborate?
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight hero-heading">
              Let&apos;s Create Together
            </h2>
            <p className="text-sm sm:text-base text-[#D7E2EA]/70 max-w-md font-light">
              Need a video editor for AI videos, real people, toons, animations, or UGC content? I craft cinematic edits that grab attention and tell your story. Let&apos;s bring your ideas to life.
            </p>
          </div>

          <ContactButton onClick={onContactClick} label="Get In Touch" />
        </div>

        {/* Bottom Metadata & Social Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-[#1A1A1A] text-xs uppercase tracking-widest text-[#D7E2EA]/60">
          <div>
            &copy; {new Date().getFullYear()} VIKAS. ALL RIGHTS RESERVED. 3D CREATOR PORTFOLIO.
          </div>

          <div className="flex items-center gap-6">
            <a
              href="mailto:kajlavikas2002@gmail.com"
              className="hover:text-[#D7E2EA] transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-4 h-4 text-[#B600A8]" />
              <span>kajlavikas2002@gmail.com</span>
            </a>

            <a
              href="https://www.instagram.com/cinematicvaidya/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#D7E2EA] transition-colors flex items-center gap-1.5"
            >
              <Instagram className="w-4 h-4 text-[#B600A8]" />
              <span>Instagram</span>
            </a>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full bg-[#181818] hover:bg-[#282828] text-[#D7E2EA] transition-colors cursor-pointer flex items-center gap-1"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
