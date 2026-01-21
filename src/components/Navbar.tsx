import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { language, setLanguage, t } = useLanguage();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'tr' : 'en');
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-200 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                        <Zap className="text-white w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black tracking-tight leading-none text-slate-900">
                        Minimize<span className="text-indigo-600">PDF</span>
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
                    <a href="/#how-it-works" className="hover:text-indigo-600 transition-colors">{t.nav.howItWorks}</a>
                    <a href="/#features" className="hover:text-indigo-600 transition-colors">{t.nav.features}</a>
                    <Link to="/guides" className="hover:text-indigo-600 transition-colors">Guides</Link>
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-1 hover:text-indigo-600 transition-colors"
                        aria-label="Toggle language"
                    >
                        <Globe size={18} />
                        <span className="uppercase">{language}</span>
                    </button>
                    <Link to="/pro" className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-bold hover:bg-slate-800 transition-all hover:shadow-lg active:scale-95 text-center">
                        {t.nav.pro}
                    </Link>
                </div>

                <button
                    className="md:hidden text-slate-900"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle mobile menu"
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-6 md:hidden flex flex-col gap-4 shadow-xl">
                    <a href="/#how-it-works" className="text-lg font-medium text-slate-600" onClick={() => setMobileMenuOpen(false)}>{t.nav.howItWorks}</a>
                    <a href="/#features" className="text-lg font-medium text-slate-600" onClick={() => setMobileMenuOpen(false)}>{t.nav.features}</a>
                    <Link to="/guides" className="text-lg font-medium text-slate-600" onClick={() => setMobileMenuOpen(false)}>Guides</Link>
                    <button onClick={() => { toggleLanguage(); setMobileMenuOpen(false); }} className="flex items-center gap-2 text-lg font-medium text-slate-600">
                        <Globe size={20} />
                        {language === 'en' ? 'Türkçe' : 'English'}
                    </button>
                    <Link to="/pro" onClick={() => setMobileMenuOpen(false)} className="bg-indigo-600 text-white py-3 rounded-xl font-bold w-full text-center">{t.nav.pro}</Link>
                </div>
            )}
        </nav>
    );
};
