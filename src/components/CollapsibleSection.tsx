'use client';

import React, { useState, ReactNode } from 'react';
import { useLanguage } from '@/context/LanguageContext'; // Assuming this path is correct

interface CollapsibleSectionProps {
  titleEn: string;
  titleTr: string;
  icon?: string; // Placeholder for icon (e.g., Unicode or simple text)
  children: ReactNode;
  initiallyOpen?: boolean;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  titleEn,
  titleTr,
  icon,
  children,
  initiallyOpen = false
}) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-card-bg border border-border rounded-md shadow-lg overflow-hidden">
      <button
        type="button"
        onClick={toggleOpen}
        className="w-full flex justify-between items-center p-md text-left bg-primary-dark hover:bg-secondary transition-colors duration-fast focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-DEFAULT"
        aria-expanded={isOpen}
        aria-controls={`collapsible-content-${titleEn.replace(/\s+/g, '-')}`}
      >
        <h3 className="text-lg md:text-xl font-semibold font-heading text-text-primary flex items-center gap-sm">
          {icon && <span className="text-accent-DEFAULT text-xl">{icon}</span>}
          {t(titleEn, titleTr)}
        </h3>
        <svg
          className={`w-6 h-6 text-text-primary transform transition-transform duration-fast ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      <div
        id={`collapsible-content-${titleEn.replace(/\s+/g, '-')}`}
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-[2000px] opacity-100 p-md' : 'max-h-0 opacity-0 p-0'
        }`}
        style={{ borderTop: isOpen ? '1px solid var(--border-color)' : 'none' }} // Conditional border
      >
        {children}
      </div>
    </div>
  );
};

export default CollapsibleSection;
