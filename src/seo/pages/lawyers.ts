import { SEOPageData } from '../types';

export const lawyersPage: SEOPageData = {
    slug: 'reduce-legal-document-pdf-size',
    type: 'use-case',
    title: 'Reduce Legal Document PDF Size | Court Portal Compliant',
    description: 'Meet court portal upload limits instantly. Reduce legal document PDF size securely. Encrypted processing for briefs, exhibits, and contracts.',
    keywords: [
        'reduce legal document pdf size',
        'legal brief compression',
        'court portal pdf limit',
        'compress legal pdf',
        'secure pdf for lawyers'
    ],
    heroBadge: 'LEGAL',
    heroTitleStart: 'Reduce Legal',
    heroTitleEnd: 'Document PDF Size',
    heroSubtitle: 'Is your filing deadline approaching, but the court portal rejected your upload? Compress legal briefs instantly.',
    relatedSlugs: [
        'optimize-pdf-for-uyap-court',
        'compress-pdf-to-100kb',
        'compress-pdf-to-1mb'
    ],
    faq: [
        {
            question: 'Is the text still searchable?',
            answer: 'Yes, if your PDF was already OCR\'d (searchable), that text layer is fully preserved after compression.'
        },
        {
            question: 'Is this secure for sensitive case files?',
            answer: 'We use TLS encryption for transfer and automatically delete all files from our servers after 1 hour. No data is stored.'
        },
        {
            question: 'Can I compress scanned exhibits?',
            answer: 'Yes, our image optimization technology is specifically designed to drastically reduce scan sizes while keeping text legible.'
        }
    ]
};
