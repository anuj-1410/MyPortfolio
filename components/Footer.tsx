'use client';

import { FiArrowUp } from 'react-icons/fi';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-6 sm:py-8 border-t border-secondary/10 dark:border-secondary/10 [data-theme='light']:border-secondary/20">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          {/* Copyright */}
          <p className="text-xs sm:text-sm text-secondary/40 dark:text-secondary/40 [data-theme='light']:text-secondary/60 text-center sm:text-left">
            © 2025 Anuj Agrawal. All rights reserved.
          </p>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs sm:text-sm text-secondary/40 dark:text-secondary/40 [data-theme='light']:text-secondary/60 hover:text-accent transition-colors group"
          >
            Back to top
            <FiArrowUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
