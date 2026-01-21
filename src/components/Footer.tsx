import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getPopularPages } from '../seo';

export const Footer: React.FC = () => {
    const { t } = useLanguage();
    const popularPages = getPopularPages(10);

    return (
        <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
            <div className="max-w-7xl mx-auto px-6">
                {/* Popular Compressions - Internal Linking */}
                <div className="border-b border-slate-900 pb-12 mb-12">
                    <h4 className="text-white font-bold mb-6">Popular Compressions</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-y-3 gap-x-4">
                        {popularPages.map((page) => (
                            <Link
                                key={page.slug}
                                to={`/${page.slug}`}
                                className="text-xs text-slate-500 hover:text-indigo-400 transition-colors"
                            >
                                {page.heroTitleStart} {page.heroTitleEnd}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-5 gap-12 mb-12">
                    <div className="col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="bg-indigo-600 p-2 rounded-lg">
                                <Zap className="text-white w-4 h-4" />
                            </div>
                            <span className="text-lg font-black text-white">Minimize<span className="text-indigo-500">PDF</span></span>
                        </div>
                        <p className="max-w-xs text-sm leading-relaxed">
                            {t.footer.desc}
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6">{t.footer.product}</h4>
                        <ul className="space-y-4 text-sm">
                            <li><a href="/#features" className="hover:text-white transition-colors">{t.nav.features}</a></li>
                            <li><Link to="/pro" className="hover:text-white transition-colors">{t.nav.pro}</Link></li>
                            <li><a href="mailto:support@minimizepdf.com" className="hover:text-white transition-colors">API</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6">{t.footer.legal}</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link to="/privacy-policy" className="hover:text-white transition-colors">{t.footer.privacy}</Link></li>
                            <li><Link to="/terms-of-use" className="hover:text-white transition-colors">{t.footer.terms}</Link></li>
                            <li><a href="mailto:support@minimizepdf.com" className="hover:text-white transition-colors">{t.footer.contact}</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6">{t.footer.guides}</h4>
                        <ul className="space-y-4 text-sm">
                            <li><a href="/guides/" className="hover:text-white transition-colors">{t.footer.guides}</a></li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-bold uppercase tracking-widest">
                    <p>&copy; {new Date().getFullYear()} {t.footer.rights}</p>
                    <div className="flex items-center gap-2">
                        <Globe size={14} />
                        <span>English / Türkçe</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
