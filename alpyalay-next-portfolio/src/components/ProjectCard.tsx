'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export interface ProjectLink {
  href: string;
  textEn: string;
  textTr: string;
  isPrimary?: boolean; // For main action button like "View on GitHub"
  isCaseStudy?: boolean; // For special styling for case study links
}

export interface ProjectFeature {
  en: string;
  tr: string;
}

export interface ProjectDetail {
  labelEn: string;
  labelTr: string;
  valueEn: string;
  valueTr: string;
}

export interface ProjectCardProps {
  id: string; // Unique ID for the project
  imageSrc: string;
  imageAltEn: string;
  imageAltTr: string;
  titleEn: string;
  titleTr: string;
  descriptionEn: string;
  descriptionTr: string;
  details?: ProjectDetail[];
  features?: ProjectFeature[];
  links?: ProjectLink[];
  type: 'translation' | 'web' | 'software'; // To slightly adjust styling or content if needed
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  imageSrc,
  imageAltEn,
  imageAltTr,
  titleEn,
  titleTr,
  descriptionEn,
  descriptionTr,
  details,
  features,
  links,
  // type // type can be used for minor variants if needed in future
}) => {
  const { t } = useLanguage();

  return (
    <div className="bg-card-bg border border-border rounded-lg shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:border-primary-DEFAULT transform hover:-translate-y-1">
      <div className="relative w-full h-48 md:h-56 overflow-hidden">
        <Image
          src={imageSrc} // Assumes images are in /public or an external URL
          alt={t(imageAltEn, imageAltTr)}
          width={600} // Provide appropriate default width
          height={400} // Provide appropriate default height
          className="object-cover w-full h-full"
          onError={(e) => {
            // Fallback for broken images
            e.currentTarget.src = `https://placehold.co/600x400/0c1726/f8f9fa?text=${encodeURIComponent(t(titleEn,titleTr))}`;
          }}
        />
      </div>
      <div className="p-md flex flex-col flex-grow">
        <h3 className="text-xl font-bold font-heading text-text-primary mb-sm">
          {t(titleEn, titleTr)}
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed mb-md flex-grow">
          {t(descriptionEn, descriptionTr)}
        </p>

        {details && details.length > 0 && (
          <div className="mb-md space-y-xs text-xs">
            {details.map((detail, index) => (
              <div key={index} className="flex">
                <span className="font-semibold text-label w-1/3 min-w-[90px]">{t(detail.labelEn, detail.labelTr)}:</span>
                <span className="text-text-secondary">{t(detail.valueEn, detail.valueTr)}</span>
              </div>
            ))}
          </div>
        )}

        {features && features.length > 0 && (
          <div className="flex flex-wrap gap-xs mb-md">
            {features.map((feature, index) => (
              <span key={index} className="bg-primary-dark text-text-primary text-xs px-sm py-xs rounded-full">
                {t(feature.en, feature.tr)}
              </span>
            ))}
          </div>
        )}

        {links && links.length > 0 && (
          <div className="mt-auto pt-md flex flex-wrap gap-sm border-t border-border/50">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`text-xs font-semibold rounded-md px-sm py-xs transition-colors duration-fast
                               ${link.isPrimary || link.isCaseStudy
                                 ? 'bg-primary-DEFAULT text-text-on-dark hover:bg-primary-hover'
                                 : 'bg-background-alt text-text-secondary hover:bg-border hover:text-text-primary'}
                               ${link.isCaseStudy ? 'border border-accent-DEFAULT !bg-accent-dark hover:!bg-accent-DEFAULT' : ''}
                               focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-DEFAULT ring-offset-2 ring-offset-card-bg`}
              >
                {t(link.textEn, link.textTr)}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
