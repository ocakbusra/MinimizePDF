export interface SEOPageData {
    slug: string;
    title: string;
    description: string;
    keywords: string[];
    heroBadge: string;
    heroTitleStart: string;
    heroTitleEnd: string;
    heroSubtitle: string;
    type: 'size' | 'use-case';
    targetSize?: string; // For HowTo schema
    relatedSlugs: string[]; // For internal linking
    faq: Array<{ question: string; answer: string }>;
    articleContent?: string;
}
