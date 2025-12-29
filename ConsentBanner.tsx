
import React, { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';
import { useLanguage } from './App';

// Define gtag as it's on window
declare global {
    interface Window {
        gtag?: (
            command: 'consent' | 'config' | 'event' | 'js',
            action?: string | Date,
            params?: any
        ) => void;
    }
}

export const ConsentBanner: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { t, language } = useLanguage();

    useEffect(() => {
        // Check if user has already made a choice
        const savedConsent = localStorage.getItem('consentMode');
        if (!savedConsent) {
            setIsVisible(true);
        } else if (savedConsent === 'granted') {
            // If previously granted, make sure we update gtag (though defaults might be enough depending on implementation, better to be explicit)
            updateGtag('granted');
        }
    }, []);

    const updateGtag = (status: 'granted' | 'denied') => {
        if (window.gtag) {
            window.gtag('consent', 'update', {
                'ad_storage': status,
                'ad_user_data': status,
                'ad_personalization': status,
                'analytics_storage': status
            });
        }
    };

    const handleAccept = () => {
        localStorage.setItem('consentMode', 'granted');
        updateGtag('granted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('consentMode', 'denied');
        updateGtag('denied');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-xl border border-slate-200 shadow-2xl rounded-2xl p-6 md:flex items-center gap-6 justify-between">

                <div className="flex items-start gap-4 mb-6 md:mb-0">
                    <div className="bg-indigo-100 p-2 rounded-lg shrink-0 text-indigo-600 hidden md:block">
                        <ShieldCheck size={24} />
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-bold text-slate-900 text-lg">
                            {language === 'tr' ? 'Gizliliğinize Önem Veriyoruz' : 'We Value Your Privacy'}
                        </h3>
                        <p className="text-slate-500 text-sm leading-relaxed max-w-2xl">
                            {language === 'tr'
                                ? 'Sitemizi geliştirmek ve size en iyi deneyimi sunmak için çerezleri ve benzer teknolojileri kullanıyoruz. Google Analytics üzerinden anonim kullanım verilerini toplamak için izninizi istiyoruz.'
                                : 'We use cookies and similar technologies to improve our site and provide you with the best experience. We ask for your permission to collect anonymous usage data via Google Analytics.'}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 min-w-[280px]">
                    <button
                        onClick={handleDecline}
                        className="px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors text-sm"
                    >
                        {language === 'tr' ? 'Reddet' : 'Decline'}
                    </button>
                    <button
                        onClick={handleAccept}
                        className="px-6 py-3 rounded-xl font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95 text-sm"
                    >
                        {language === 'tr' ? 'Kabul Et' : 'Accept All'}
                    </button>
                </div>
            </div>
        </div>
    );
};
