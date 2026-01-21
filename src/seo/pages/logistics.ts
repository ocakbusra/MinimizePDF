import { SEOPageData } from '../types';

export const logisticsPage: SEOPageData = {
    slug: 'reduce-shipping-manifest-pdf-size',
    type: 'use-case',
    title: 'Reduce Shipping Manifest PDF Size | Faster Tracking Uploads',
    description: 'Speed up your supply chain. Reduce shipping manifest PDF size to fix slow uploads to tracking portals and customs systems.',
    keywords: [
        'reduce shipping manifest pdf',
        'logistics pdf compression',
        'customs pdf upload',
        'shipping document size',
        'compress scanned pdf'
    ],
    heroBadge: 'LOGISTICS',
    heroTitleStart: 'Reduce Shipping',
    heroTitleEnd: 'Manifest PDF Size',
    heroSubtitle: 'Every minute counts. Reducing file size ensures rapid data transmission and smoother border crossings.',
    relatedSlugs: [
        'compress-pdf-to-200kb',
        'compress-pdf-to-50kb',
        'reduce-pdf-size-for-visa-application'
    ],
    faq: [
        {
            question: 'Will barcodes still be scannable?',
            answer: 'Yes, we ensure that black-and-white contrast is maintained so that barcodes and QR codes remain readable by scanners.'
        },
        {
            question: 'Can I process bulk manifests?',
            answer: 'Absolutely. Our batch tool allows you to upload multiple manifests at once, compressing them all for the day\'s shipments.'
        },
        {
            question: 'Does this work with scanned older docs?',
            answer: 'Yes. Our engine is excellent at cleaning up and compressing older, paper-scanned documents that have large file sizes.'
        }
    ]
};
