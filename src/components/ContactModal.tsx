import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Send, Mail, Globe, ArrowUpRight } from 'lucide-react';
import { ContactButton } from './ContactButton';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });

  const email = 'kajlavikas2002@gmail.com';

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
          {/* Backdrop click */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 cursor-pointer"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-2xl bg-[#0C0C0C] border-2 border-[#D7E2EA]/30 rounded-[30px] sm:rounded-[40px] p-6 sm:p-8 md:p-10 shadow-2xl text-[#D7E2EA] overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-[#1A1A1A] text-[#D7E2EA] hover:bg-[#2A2A2A] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex flex-col gap-2 mb-8">
              <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-light">
                Let&apos;s Connect
              </span>
              <h2 className="hero-heading text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight">
                Get In Touch
              </h2>
            </div>

            {/* Direct Email Bar */}
            <div className="flex items-center justify-between gap-3 p-3 sm:p-4 rounded-2xl bg-[#161616] border border-[#262626] mb-8">
              <div className="flex items-center gap-3 overflow-hidden">
                <Mail className="w-5 h-5 text-[#B600A8] shrink-0" />
                <span className="font-mono text-sm sm:text-base text-[#D7E2EA] truncate">
                  {email}
                </span>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#222] hover:bg-[#333] text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Contact Form */}
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-2xl bg-[#161616] border border-green-500/30 text-center flex flex-col items-center gap-3"
              >
                <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-wide">
                  Message Sent!
                </h3>
                <p className="text-sm text-[#D7E2EA]/70">
                  Thanks for reaching out! Vikas will review your project details and get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs uppercase tracking-widest text-[#D7E2EA]/50 hover:text-[#D7E2EA] underline cursor-pointer"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#D7E2EA]/70 mb-1 font-medium">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    placeholder="Jane Doe"
                    className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-[#282828] text-[#D7E2EA] placeholder-[#D7E2EA]/30 focus:outline-none focus:border-[#B600A8] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#D7E2EA]/70 mb-1 font-medium">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    placeholder="jane@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-[#282828] text-[#D7E2EA] placeholder-[#D7E2EA]/30 focus:outline-none focus:border-[#B600A8] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#D7E2EA]/70 mb-1 font-medium">
                    Project Overview / Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    placeholder="Tell me about your project goals, scope, and timeline..."
                    className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-[#282828] text-[#D7E2EA] placeholder-[#D7E2EA]/30 focus:outline-none focus:border-[#B600A8] transition-colors resize-none"
                  />
                </div>

                <div className="mt-2 flex justify-end">
                  <ContactButton label="Send Message" />
                </div>
              </form>
            )}

            {/* Social Links */}
            <div className="mt-8 pt-6 border-t border-[#222] flex flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-widest text-[#D7E2EA]/60">
              <span>Follow Vikas:</span>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.instagram.com/cinematicvaidya/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#D7E2EA] transition-colors flex items-center gap-0.5"
                >
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
