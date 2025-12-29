
import React from 'react';
import { Sparkles, Rocket, Lock, Zap, Crown, ArrowLeft, Star } from 'lucide-react';
import { useLanguage } from './App';

export const ProVersion: React.FC = () => {
    const { language } = useLanguage();

    const content = {
        en: {
            back: "Back to Free Version",
            badge: "COMING SOON",
            title: "Unleash the Ultimate Power",
            subtitle: "We are building something extraordinary. Minimize PDF Pro will bring desktop-class power directly to your browser.",
            features: [
                { title: "Batch Processing", desc: "Compress 100+ files at once" },
                { title: "Ultra-High Quality", desc: "Lossless compression options" },
                { title: "API Access", desc: "Integrate with your own apps" },
                { title: "Priority Support", desc: "24/7 dedicated assistance" }
            ],
            notify: "Get ready for the revolution.",
            cta: "Join Waitlist (Coming Soon)"
        },
        tr: {
            back: "Ücretsiz Sürüme Dön",
            badge: "ÇOK YAKINDA",
            title: "Maksimum Gücü Serbest Bırakın",
            subtitle: "Olağanüstü bir şey inşa ediyoruz. Minimize PDF Pro, masaüstü sınıfı gücü doğrudan tarayıcınıza getirecek.",
            features: [
                { title: "Toplu İşleme", desc: "Aynı anda 100+ dosyayı sıkıştırın" },
                { title: "Ultra Yüksek Kalite", desc: "Kayıpsız sıkıştırma seçenekleri" },
                { title: "API Erişimi", desc: "Kendi uygulamalarınıza entegre edin" },
                { title: "Öncelikli Destek", desc: "7/24 özel destek hattı" }
            ],
            notify: "Devrime hazır olun.",
            cta: "Bekleme Listesine Katıl (Yakında)"
        }
    };

    const t = content[language];

    return (
        <div className="min-h-screen bg-[#0f172a] text-white selection:bg-indigo-500 selection:text-white relative overflow-hidden font-sans">

            {/* Dynamic Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/30 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-fuchsia-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
                <a href="/" className="inline-flex items-center gap-2 text-indigo-400 font-bold hover:text-white transition-colors mb-16">
                    <ArrowLeft size={20} />
                    {t.back}
                </a>

                <div className="max-w-4xl mx-auto text-center">

                    <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 px-4 py-1.5 rounded-full mb-8 animate-in slide-in-from-bottom-4 fade-in duration-700">
                        <Sparkles size={14} className="text-indigo-400" />
                        <span className="text-xs font-bold text-indigo-300 tracking-widest uppercase">{t.badge}</span>
                    </div>

                    <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-[1.1] bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-100">
                        Minimize PDF <br />
                        <span className="text-indigo-500">PRO</span>
                    </h1>

                    <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto mb-16 animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-200">
                        {t.subtitle}
                    </p>

                    {/* Cards Grid */}
                    <div className="grid md:grid-cols-2 gap-6 mb-16 animate-in slide-in-from-bottom-12 fade-in duration-1000 delay-300">
                        {t.features.map((feature, i) => (
                            <div key={i} className="group relative bg-slate-900/50 border border-white/5 p-8 rounded-[2rem] hover:bg-slate-800/50 transition-all duration-300 text-left overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
                                    <Lock size={48} />
                                </div>
                                <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-6 text-indigo-400 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                                    {i === 0 && <Rocket size={24} />}
                                    {i === 1 && <Crown size={24} />}
                                    {i === 2 && <Zap size={24} />}
                                    {i === 3 && <Star size={24} />}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                                <p className="text-slate-400">{feature.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="animate-in slide-in-from-bottom-16 fade-in duration-1000 delay-500">
                        <p className="text-indigo-300 font-bold tracking-widest uppercase text-sm mb-6">{t.notify}</p>
                        <button disabled className="bg-white/5 border border-white/10 text-slate-400 px-10 py-5 rounded-full font-bold text-lg cursor-not-allowed hover:bg-white/10 transition-all">
                            {t.cta}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};
