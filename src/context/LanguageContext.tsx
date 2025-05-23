'use client'; // Required for context in App Router

import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'tr';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (enText: string, trText: string) => string; // Simple translation function
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en'); // Default language

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem('preferredLanguage', lang);
      document.documentElement.lang = lang;
    }
  };

  // Simple translation helper
  const t = (enText: string, trText: string): string => {
    return language === 'tr' ? trText : enText;
  };
  
  // Set initial language from localStorage if available
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLang = localStorage.getItem('preferredLanguage') as Language | null;
      if (storedLang && (storedLang === 'en' || storedLang === 'tr')) {
        setLanguageState(storedLang);
        document.documentElement.lang = storedLang;
      } else {
        document.documentElement.lang = language;
      }
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
