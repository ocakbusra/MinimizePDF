
import React, { useEffect } from 'react';

interface AdProps {
    slot: string;
    format?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
    responsive?: boolean;
    style?: React.CSSProperties;
    className?: string;
    label?: string; // Debug label to know which ad is which
}

export const AdvertisementBox: React.FC<AdProps> = ({
    slot,
    format = 'auto',
    responsive = true,
    style = {},
    className = '',
    label
}) => {

    useEffect(() => {
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error('AdSense error:', err);
        }
    }, []);

    const isDev = import.meta.env.DEV;

    return (
        <div className={`w-full flex flex-col items-center justify-center my-8 ${className}`}>
            {/* CLS Prevention Wrapper */}
            <div
                className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl overflow-hidden relative w-full flex items-center justify-center text-slate-400 text-xs font-mono"
                style={{ minHeight: style.height || '280px', maxWidth: style.width || '100%' }}
            >
                {isDev && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-100/50 z-10">
                        <span>AdSpace: {label || slot}</span>
                    </div>
                )}

                <ins
                    className="adsbygoogle"
                    style={{ display: 'block', width: '100%', ...style }}
                    data-ad-client="ca-pub-8735602276697338"
                    data-ad-slot={slot}
                    data-ad-format={format}
                    data-full-width-responsive={responsive ? "true" : "false"}
                ></ins>
            </div>
            <span className="text-[10px] text-slate-300 uppercase tracking-widest mt-2">Advertisement</span>
        </div>
    );
};
