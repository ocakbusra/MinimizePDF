import { SEOPageData } from '../types';

export const medicalPage: SEOPageData = {
    slug: 'resize-patient-record-pdf-securely',
    type: 'use-case',
    title: 'Resize Patient Record PDF Securely | EHR Complaint',
    description: 'HIPAA-friendly compression. Resize patient record PDFs securely to fit EHR system limits without compromising patient data privacy.',
    keywords: [
        'resize patient record pdf',
        'ehr pdf limits',
        'medical pdf compression',
        'secure patient pdf',
        'hipaa compliant pdf compression'
    ],
    heroBadge: 'MEDICAL',
    heroTitleStart: 'Resize Patient',
    heroTitleEnd: 'Record PDF',
    heroSubtitle: 'Securely resize patient records to fit strict EHR uploads without compromising privacy or detail.',
    relatedSlugs: [
        'compress-pdf-to-1mb',
        'compress-pdf-to-500kb',
        'compress-bank-statement-pdf'
    ],
    faq: [
        {
            question: 'Is this HIPAA compliant?',
            answer: 'We offer a secure environment where files are encrypted in transit and deleted permanently after processing, minimizing privacy risks.'
        },
        {
            question: 'Will X-ray scans lose detail?',
            answer: 'Our adaptive compression algorithms are designed to reduce file size while keeping diagnostic images clear enough for reference.'
        },
        {
            question: 'What if the file is password protected?',
            answer: 'For security, you must temporarily remove the password to allow our engine to read and compress the data, then re-secure it immediately.'
        }
    ]
};
