'use client';

import React, { useState, useEffect, useCallback } from 'react';
const ArrowUpIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
  </svg>
);

const ScrollToTop = () => {
  const [isScrolling, setIsScrolling] = useState(false);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []); 

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed bottom-36 right-3 z-50 sm:bottom-20">
      <button
        aria-label="scroll to top button"
        className={`
          flex size-10 items-center justify-center p-1 text-muted transition-all duration-200
          rounded-full 
          ${isScrolling ? 'opacity-100' : 'opacity-0 pointer-events-none'} 
          bg-gray-800 text-white shadow-lg 
        `}
        onClick={scrollToTop} 
        disabled={!isScrolling}
      >
        <ArrowUpIcon
          className="z-20 size-6" 
        />
      </button>
    </div>
  );
};

export default ScrollToTop;