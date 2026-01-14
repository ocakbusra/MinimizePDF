/**
 * MinimizePDF - Main Application
 * Refactored for SEO, performance, and maintainability
 */

import React, { useState, useEffect, lazy, Suspense } from 'react';
import {
  FileUp, FileCheck, Download, Trash2, AlertCircle, Zap, Sparkles,
  ShieldCheck, Menu, X, CheckCircle2, Lock, Cpu, Globe
} from 'lucide-react';
import { CompressionStatus, PDFFile } from './types';
import { compressPDF, formatBytes } from './services/pdfService';
import { ConsentBanner } from './ConsentBanner';
import { Routes, Route, useParams, Navigate, Link } from 'react-router-dom';
import { PrivacyPolicy } from './PrivacyPolicy';
import { TermsOfUse } from './TermsOfUse';
import { ProVersion } from './ProVersion';
import { AdvertisementBox } from './AdvertisementBox';

// SEO Components
import { SEOHead, InternalLinks, FAQSection } from './src/components';
import {
  seoPages,
  getPopularPages,
  DEFAULT_META,
  SITE_CONFIG,
  type SEOPageData,
} from './src/seo';

// --- TRANSLATIONS ---

const translations = {
  en: {
    nav: {
      howItWorks: "How It Works?",
      features: "Features",
      faq: "F.A.Q.",
      pro: "Pro Version",
    },
    hero: {
      badge: "200MB+ Supported — FREE",
      titleStart: "Minimize PDF Files",
      titleEnd: "For Free.",
      subtitle: "The best PDF Minimizer for 200MB+ files. We minimize files up to 90% — completely free, right in your browser.",
    },
    compressor: {
      dropTitle: "Drop Your Giant PDF Here",
      dropSubtitle: "200MB, 500MB, even 1GB+ — no problem. Where others fail, we compress up to 90%.",
      selectBtn: "Select File",
      fileSize: "Size:",
      turboMode: "Turbo Mode Ready",
      important: "Smart Render Mode: Your file will be restructured to remove unnecessary data. Visual quality is preserved while file size is minimized.",
      startBtn: "Start Compression",
      processing: "Processing",
      optStart: "Optimization Started",
      optDesc: "AI engine is analyzing your file and calculating the best compression ratio.",
      successTitle: "Great Job!",
      successDesc: "Your file has been successfully compressed.",
      oldSize: "Old Size",
      newSize: "New Size",
      gain: "Saved",
      downloadBtn: "Download File",
      newFileBtn: "Compress Another File",
      error: "Compression Failed",
      retry: "Try Again",
      invalidFile: "Please select a valid PDF file.",
      genericError: "An error occurred during compression."
    },
    features: {
      title: "Why MinimizePDF?",
      subtitle: "Free tools reject 200MB+ files. We built an engine that handles them with ease.",
      secureTitle: "No Upload Limits",
      secureDesc: "200MB, 500MB, 1GB+ — upload any size. Other free tools block large files; we compress them.",
      fastTitle: "Up to 90% Smaller",
      fastDesc: "Our WASM engine delivers enterprise-grade compression ratios, completely free.",
      smartTitle: "100% Free & Private",
      smartDesc: "No hidden fees, no subscriptions. Files stay in your browser — never touch our servers."
    },
    howItWorks: {
      title: "How We Minimize Giant Files?",
      desc: "While competitors reject files over 200MB, our engine processes them in chunks. We remove bloat, optimize images, and deliver up to 90% size reduction — all in your browser.",
      step1: "Chunked processing for massive files",
      step2: "Remove hidden bloat & metadata",
      step3: "Rebuild at 90% smaller size",
      layerTitle: "No Size Limit",
      layerDesc: "200MB+ files welcome"
    },
    footer: {
      desc: "The only free PDF Minimizer that handles 200MB+ files. Up to 90% compression, zero uploads.",
      product: "Product",
      legal: "Legal",
      privacy: "Privacy Policy",
      terms: "Terms of Use",
      contact: "Contact",
      rights: "MinimizePDF. All rights reserved."
    },
    welcome: {
      title: "Professional PDF Compression Solution",
      desc: "MinimizePDF is a next-generation tool designed to handle large file sizes efficiently. Unlike traditional tools that require uploads, our WebAssembly technology processes your files directly in your browser. This means your sensitive documents never leave your device, ensuring 100% privacy and security while delivering enterprise-grade compression."
    },
    didYouKnow: {
      title: "While we work...",
      fact: "Did you know? Our browser-based compression technology protects your privacy by ensuring your document is processed locally on your computer, not on a remote server.",
      tip: "Pro Tip: You can compress multiple files one after another without any daily limits."
    }
  },
  tr: {
    nav: {
      howItWorks: "Nasıl Çalışır?",
      features: "Özellikler",
      faq: "S.S.S.",
      pro: "Pro Sürüm",
    },
    hero: {
      badge: "200MB+ Destekleniyor — ÜCRETSİZ",
      titleStart: "Ücretsiz PDF Küçültme:",
      titleEnd: "Dosya Boyutunu Online Düşür",
      subtitle: "Diğer araçlar 200MB üstü dosyaları engeller. Biz %90'a kadar küçültüyoruz — programsız, online ve tamamen ücretsiz.",
    },
    compressor: {
      dropTitle: "Dev PDF'inizi Buraya Bırakın",
      dropSubtitle: "200MB, 500MB, hatta 1GB+ — sorun değil. Başkaları başarısız olurken biz %90'a kadar küçültüyoruz.",
      selectBtn: "Dosya Seçin",
      fileSize: "Boyut:",
      turboMode: "Turbo Mod Hazır",
      important: "Akıllı Render Modu: Dosyanız yeniden yapılandırılarak gereksiz veriler temizlenecek. Görsel kalite korunurken dosya boyutu minimuma indirilir.",
      startBtn: "Sıkıştırmayı Başlat",
      processing: "İşleniyor",
      optStart: "Optimizasyon Başladı",
      optDesc: "Yapay zeka motorumuz dosyanızı analiz ediyor ve en iyi sıkıştırma oranını hesaplıyor.",
      successTitle: "Harika İş!",
      successDesc: "Dosyanız başarıyla küçültüldü.",
      oldSize: "Eski Boyut",
      newSize: "Yeni Boyut",
      gain: "Kazanç",
      downloadBtn: "Dosyayı İndir",
      newFileBtn: "Yeni Dosya Yükle",
      error: "Sıkıştırma Başarısız",
      retry: "Tekrar Dene",
      invalidFile: "Lütfen geçerli bir PDF seçin.",
      genericError: "Sıkıştırma sırasında bir hata oluştu."
    },
    features: {
      title: "Neden MinimizePDF?",
      subtitle: "Ücretsiz araçlar 200MB+ dosyaları reddeder. Biz onları kolayca işleyen bir motor geliştirdik.",
      secureTitle: "Boyut Limiti Yok",
      secureDesc: "200MB, 500MB, 1GB+ — istediğiniz boyutu yükleyin. Diğer ücretsiz araçlar büyük dosyaları engeller; biz sıkıştırırız.",
      fastTitle: "%90'a Kadar Küçültme",
      fastDesc: "WASM motorumuz kurumsal seviyede sıkıştırma oranları sunar — tamamen ücretsiz.",
      smartTitle: "%100 Ücretsiz & Gizli",
      smartDesc: "Gizli ücret yok, abonelik yok. Dosyalarınız tarayıcınızda kalır — sunucularımıza asla gitmez."
    },
    howItWorks: {
      title: "Dev Dosyaları Nasıl İşliyoruz?",
      desc: "Rakipler 200MB üstü dosyaları reddederken, motorumuz onları parça parça işler. Şişkinliği temizler, görselleri optimize eder ve %90'a varan sıkıştırma sunar — hepsi tarayıcınızda.",
      step1: "Dev dosyalar için parçalı işleme",
      step2: "Gizli şişkinlik ve meta verileri temizle",
      step3: "%90 daha küçük olarak yeniden oluştur",
      layerTitle: "Boyut Limiti Yok",
      layerDesc: "200MB+ dosyalar hoş geldiniz"
    },
    footer: {
      desc: "200MB+ dosyaları işleyen tek ücretsiz PDF sıkıştırıcı. %90'a varan sıkıştırma, sıfır yükleme.",
      product: "Ürün",
      legal: "Yasal",
      privacy: "Gizlilik Politikası",
      terms: "Kullanım Şartları",
      contact: "İletişim",
      rights: "MinimizePDF. Tüm hakları saklıdır."
    },
    welcome: {
      title: "Profesyonel PDF Sıkıştırma Çözümü",
      desc: "MinimizePDF, büyük dosya boyutlarıyla başa çıkmak için tasarlanmış yeni nesil bir araçtır. Geleneksel araçların aksine, WebAssembly teknolojimiz dosyalarınızı sunuculara yüklemeden doğrudan tarayıcınızda işler. Bu, hassas belgelerinizin cihazınızdan asla çıkmamasını sağlayarak %100 gizlilik ve güvenlik sunarken kurumsal düzeyde sıkıştırma sağlar."
    },
    didYouKnow: {
      title: "Biz çalışırken...",
      fact: "Biliyor muydunuz? Tarayıcı tabanlı sıkıştırma teknolojimiz, belgenizin uzak bir sunucuda değil, yerel olarak bilgisayarınızda işlenmesini sağlayarak gizliliğinizi korur.",
      tip: "İpucu: Günlük limit olmadan dosyalarınızı art arda sıkıştırabilirsiniz."
    }
  }
};

// --- LANGUAGE CONTEXT ---

interface LanguageContextType {
  language: 'en' | 'tr';
  setLanguage: (lang: 'en' | 'tr') => void;
  t: typeof translations.en;
}

const LanguageContext = React.createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => { },
  t: translations.en
});

export const useLanguage = () => React.useContext(LanguageContext);

// --- COMPONENTS ---

const Navbar: React.FC = () => {
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
          <a href="#how-it-works" className="hover:text-indigo-600 transition-colors">{t.nav.howItWorks}</a>
          <a href="#features" className="hover:text-indigo-600 transition-colors">{t.nav.features}</a>
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
          <a href="#how-it-works" className="text-lg font-medium text-slate-600" onClick={() => setMobileMenuOpen(false)}>{t.nav.howItWorks}</a>
          <a href="#features" className="text-lg font-medium text-slate-600" onClick={() => setMobileMenuOpen(false)}>{t.nav.features}</a>
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

const PDFCompressor: React.FC = () => {
  const [status, setStatus] = useState<CompressionStatus>(CompressionStatus.IDLE);
  const [file, setFile] = useState<PDFFile | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const { t } = useLanguage();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setError(t.compressor.invalidFile);
        return;
      }
      setFile({
        name: selectedFile.name,
        size: selectedFile.size,
        blob: selectedFile
      });
      setStatus(CompressionStatus.IDLE);
      setError(null);
    }
  };

  const startDeepCompression = async () => {
    if (!file) return;
    try {
      setStatus(CompressionStatus.COMPRESSING);
      setProgress(0);
      const result = await compressPDF(file.blob as File, (p) => setProgress(p));
      setFile(prev => prev ? {
        ...prev,
        compressedSize: result.size,
        compressedBlob: result.blob
      } : null);
      setStatus(CompressionStatus.COMPLETED);
    } catch (err: any) {
      setError(err.message || t.compressor.genericError);
      setStatus(CompressionStatus.ERROR);
    }
  };

  const reset = () => {
    setFile(null);
    setStatus(CompressionStatus.IDLE);
    setProgress(0);
    setError(null);
  };

  const downloadFile = () => {
    if (file?.compressedBlob) {
      const url = URL.createObjectURL(file.compressedBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `minimizepdf_${file.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const ratio = file?.compressedSize && file.size
    ? Math.round((1 - file.compressedSize / file.size) * 100)
    : 0;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="glass-panel rounded-[3rem] p-8 md:p-12 shadow-[0_30px_60px_rgba(0,0,0,0.08)] relative overflow-hidden transition-all duration-500 hover:shadow-[0_40px_80px_rgba(79,70,229,0.15)]">
        {/* Decorative gradients */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

        {status === CompressionStatus.IDLE && !file && (
          <div className="relative group text-center py-12 md:py-20">
            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              aria-label="Select PDF file"
            />
            <div className="bg-indigo-50 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-500 group-hover:bg-indigo-100">
              <FileUp className="text-indigo-600 w-12 h-12 md:w-16 md:h-16" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-4 tracking-tight">{t.compressor.dropTitle}</h2>
            <p className="text-slate-500 text-lg mb-8 max-w-md mx-auto">{t.compressor.dropSubtitle}</p>
            <button className="bg-indigo-600 text-white px-10 py-5 rounded-full font-bold text-lg shadow-xl shadow-indigo-200 group-hover:shadow-2xl group-hover:-translate-y-1 transition-all">
              {t.compressor.selectBtn}
            </button>
          </div>
        )}

        {file && status !== CompressionStatus.COMPLETED && status !== CompressionStatus.COMPRESSING && (
          <div className="space-y-8">
            <div className="flex items-center gap-6 bg-slate-50/80 p-6 rounded-[2rem] border border-slate-100">
              <div className="bg-indigo-600 p-4 rounded-2xl shadow-lg shadow-indigo-200 shrink-0">
                <FileCheck className="text-white" size={32} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-black text-xl text-slate-800 truncate mb-1">{file.name}</h4>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-slate-500 font-medium">{t.compressor.fileSize}</span>
                  <span className="text-indigo-600 font-black">{formatBytes(file.size)}</span>
                </div>
              </div>
              <button
                onClick={reset}
                className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                aria-label="Remove file"
              >
                <Trash2 size={24} />
              </button>
            </div>

            <div className="bg-amber-50 rounded-3xl p-6 border border-amber-100 flex gap-4">
              <ShieldCheck className="text-amber-600 shrink-0 mt-1" size={24} />
              <p className="text-sm text-amber-900 leading-relaxed font-medium">
                <strong>{t.compressor.important}</strong>
              </p>
            </div>

            <button
              onClick={startDeepCompression}
              className="w-full bg-slate-900 hover:bg-black text-white font-bold py-6 rounded-[2rem] shadow-2xl hover:shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-3 text-xl group"
            >
              <Zap size={24} className="text-indigo-400 group-hover:scale-125 transition-transform" />
              {t.compressor.startBtn}
            </button>
          </div>
        )}

        {status === CompressionStatus.COMPRESSING && (
          <div className="py-12 text-center space-y-8">
            <div className="relative w-40 h-40 mx-auto">
              <div className="absolute inset-0 border-4 border-slate-100 rounded-full" />
              <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-3xl font-black text-indigo-600">%{progress}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{t.compressor.processing}</span>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">{t.compressor.optStart}</h3>
              <p className="text-slate-500 font-medium max-w-sm mx-auto">{t.compressor.optDesc}</p>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden max-w-md mx-auto">
              <div className="h-full bg-indigo-600 transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>

            {/* Did You Know Section */}
            <div className="max-w-md mx-auto bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100 text-left mt-8">
              <h4 className="flex items-center gap-2 font-bold text-indigo-900 mb-2">
                <Sparkles size={16} className="text-indigo-600" />
                {t.didYouKnow.title}
              </h4>
              <p className="text-sm text-indigo-800/80 mb-3">{t.didYouKnow.fact}</p>
              <p className="text-xs text-indigo-600 font-medium bg-indigo-100/50 p-2 rounded-lg">
                {t.didYouKnow.tip}
              </p>
            </div>

            <AdvertisementBox
              slot="processing-slot-id"
              style={{ width: '300px', height: '250px' }}
              className="mt-8"
              label="Processing Ad (300x250)"
            />
          </div>
        )}

        {status === CompressionStatus.COMPLETED && file && (
          <div className="space-y-10">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 text-green-600 rounded-full mb-6 relative">
                <Sparkles className="absolute -top-2 -right-2 text-yellow-400 animate-bounce" />
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-4xl font-black text-slate-900 mb-2">{t.compressor.successTitle}</h3>
              <p className="text-slate-500 font-medium">{t.compressor.successDesc}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center">
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">{t.compressor.oldSize}</p>
                <p className="text-xl font-bold text-slate-600 line-through">{formatBytes(file.size)}</p>
              </div>
              <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-indigo-600/5 rotate-12 scale-150 transform transition-transform" />
                <p className="text-xs font-bold text-indigo-400 uppercase mb-1">{t.compressor.newSize}</p>
                <p className="text-3xl font-black text-indigo-600">{formatBytes(file.compressedSize || 0)}</p>
              </div>
              <div className="bg-green-50 p-6 rounded-2xl border border-green-100 text-center">
                <p className="text-xs font-bold text-green-600 uppercase mb-1">{t.compressor.gain}</p>
                <p className="text-3xl font-black text-green-600">%{ratio}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={downloadFile}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-6 rounded-2xl shadow-xl shadow-indigo-200 transition-all active:scale-[0.98] flex items-center justify-center gap-3 text-xl"
              >
                <Download size={24} />
                {t.compressor.downloadBtn}
              </button>
              <button
                onClick={reset}
                className="w-full bg-white text-slate-500 font-bold py-4 rounded-xl hover:bg-slate-50 transition-all text-sm"
              >
                {t.compressor.newFileBtn}
              </button>
            </div>

            <div className="mt-12 border-t border-slate-100 pt-8">
              <AdvertisementBox
                slot="download-slot-id"
                style={{ width: '300px', height: '250px' }}
                label="Download Page Ad (300x250)"
              />
            </div>
          </div>
        )}

        {error && (
          <div className="p-6 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-4 text-red-600">
            <AlertCircle size={24} />
            <div className="flex-1 font-medium">{error}</div>
            <button onClick={reset} className="text-sm font-bold underline">{t.compressor.retry}</button>
          </div>
        )}
      </div>
    </div>
  );
};

const Features: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Lock className="text-green-600" size={32} />,
      title: t.features.secureTitle,
      desc: t.features.secureDesc
    },
    {
      icon: <Zap className="text-amber-500" size={32} />,
      title: t.features.fastTitle,
      desc: t.features.fastDesc
    },
    {
      icon: <Cpu className="text-cyan-500" size={32} />,
      title: t.features.smartTitle,
      desc: t.features.smartDesc
    }
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">{t.features.title}</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">{t.features.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {features.map((f, i) => (
            <div key={i} className="group p-8 rounded-[2rem] bg-slate-50 hover:bg-white hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-300 border border-slate-100">
              <div className="bg-white group-hover:bg-indigo-600 group-hover:text-white w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg shadow-slate-100 mb-8 transition-colors duration-300">
                <div className="group-hover:text-white transition-colors">{f.icon}</div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{f.title}</h3>
              <p className="text-slate-500 leading-relaxed font-medium">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const HowItWorks: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="how-it-works" className="py-24 bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-fuchsia-600 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">{t.howItWorks.title}</h2>
            <p className="text-indigo-200 text-lg leading-relaxed max-w-lg">
              {t.howItWorks.desc}
            </p>
            <div className="flex flex-col gap-6">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full border-2 border-indigo-500 flex items-center justify-center font-bold text-indigo-400">
                    0{step}
                  </div>
                  <p className="font-medium text-slate-300">
                    {step === 1 && t.howItWorks.step1}
                    {step === 2 && t.howItWorks.step2}
                    {step === 3 && t.howItWorks.step3}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="relative z-10 bg-indigo-600/20 backdrop-blur-lg border border-white/10 p-8 rounded-[2rem] aspect-square flex items-center justify-center">
              <div className="text-center space-y-6">
                <div className="flex justify-center -space-x-4">
                  <div className="w-16 h-16 rounded-full bg-red-400 border-4 border-slate-900" />
                  <div className="w-16 h-16 rounded-full bg-amber-400 border-4 border-slate-900" />
                  <div className="w-16 h-16 rounded-full bg-cyan-400 border-4 border-slate-900" />
                </div>
                <h4 className="text-2xl font-bold">{t.howItWorks.layerTitle}</h4>
                <p className="text-sm text-indigo-300">{t.howItWorks.layerDesc}</p>
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500 rounded-full blur-2xl opacity-50 animate-blob" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-fuchsia-500 rounded-full blur-2xl opacity-50 animate-blob" />
          </div>
        </div>
      </div>
    </section>
  );
}

const Footer: React.FC = () => {
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

        <div className="grid md:grid-cols-4 gap-12 mb-12">
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
              <li><a href="#features" className="hover:text-white transition-colors">{t.nav.features}</a></li>
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

// --- SEO CONTENT COMPONENT (TR ONLY) ---

const SEOContent: React.FC = () => {
  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-6 text-slate-700 leading-relaxed font-sans">
        <article className="prose prose-slate prose-lg max-w-none">
          <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">Ücretsiz PDF Küçültme: Dosya Boyutunu Kalite Kaybı Olmadan Düşürün</h2>

          <p className="mb-6 text-lg">
            Büyük boyutlu PDF dosyaları e-posta gönderirken, sisteme dosya yüklerken veya depolama alanınızı yönetirken büyük bir sorun olabilir.
            <strong>MinimizePDF</strong>, "pdf küçültme" ve "pdf boyutu düşürme" işlemlerini en güvenli, en hızlı ve tamamen ücretsiz şekilde yapmanızı sağlar.
            Programsız çözümler arıyorsanız, tarayıcınız üzerinden saniyeler içinde GB'larca büyüklükteki dosyaları bile sıkıştırabilirsiniz.
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-12">PDF Boyutu Nasıl Küçültülür?</h3>
          <p className="mb-4">
            Hiçbir teknik bilgiye ihtiyacınız yok. 3 adımda PDF sıkıştırma işlemi:
          </p>
          <ul className="list-none space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <span className="bg-indigo-100 text-indigo-700 font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">1</span>
              <span><strong>Dosyanızı Seçin:</strong> Yukarıdaki alana PDF dosyanızı sürükleyin veya "Dosya Seçin" butonuna tıklayın. 200MB üzeri dosyalar desteklenir (Sınır yok!).</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-indigo-100 text-indigo-700 font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">2</span>
              <span><strong>Otomatik Sıkıştırma:</strong> Akıllı algoritmamız dosyanızı analiz eder, metinleri ve görselleri kalite kaybı olmadan optimize eder.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-indigo-100 text-indigo-700 font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">3</span>
              <span><strong>İndirin:</strong> İşlem bittiğinde yeni dosya boyutunu görün ve dosyanızı anında indirin.</span>
            </li>
          </ul>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-12">Neden Online PDF Küçültücü Kullanmalısınız?</h3>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h4 className="font-bold text-slate-900 mb-2">🚀 Programsız ve Kurulumsuz</h4>
              <p className="text-sm">Bilgisayarınıza veya telefonunuza herhangi bir uygulama indirmenize gerek yok. İster Windows, ister Mac, ister iPhone veya Android kullanın; tarayıcınız yeterli.</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h4 className="font-bold text-slate-900 mb-2">⚡ Hızlı ve Güvenli</h4>
              <p className="text-sm">Dosyalarınız sunucuya yüklenmez, doğrudan tarayıcınızda (client-side) işlenir. Bu sayede hem işlem çok hızlıdır hem de verileriniz %100 güvendedir.</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h4 className="font-bold text-slate-900 mb-2">💎 Kalite Kaybı Yok</h4>
              <p className="text-sm">Akıllı sıkıştırma teknolojimiz, dosya boyutunu (MB) düşürürken okunabilirliği ve görsel kalitesini korur. "Mb düşürme" işlemi bulanıklaşma anlamına gelmez.</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h4 className="font-bold text-slate-900 mb-2">📦 Dev Boyut Desteği</h4>
              <p className="text-sm">Diğer araçlar 10MB veya 50MB sınırı koyarken, biz 200MB, 500MB+ gibi devasa dosyaları sorunsuz işliyoruz.</p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-12">Sıkça Sorulan Sorular (SSS)</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-slate-900 block mb-1">PDF dosyası kalitesi bozulmadan nasıl küçültülür?</h4>
              <p className="text-slate-600">MinimizePDF.com algoritmaları, dosya içerisindeki gereksiz meta verileri temizler ve görüntüleri akıllıca optimize eder. Böylece dosya boyutu ciddi oranda düşerken görsel kalite korunur.</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 block mb-1">PDF küçültme işlemi güvenli mi?</h4>
              <p className="text-slate-600">Evet, %100 güvenlidir. WebAssembly teknolojimiz sayesinde dosyanız asla bizim sunucularımıza yüklenmez. Tüm işlem sizin bilgisayarınızda gerçekleşir. Belgeleriniz cihazınızdan dışarı çıkmaz.</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 block mb-1">Telefonda PDF boyutu küçültme yapılabilir mi?</h4>
              <p className="text-slate-600">Kesinlikle. Sitemiz mobil uyumludur. iPhone (iOS) veya Android cihazlarınızdan girerek PDF dosyalarını kolayca sıkıştırabilirsiniz.</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 block mb-1">Ücretli mi? Sınır var mı?</h4>
              <p className="text-slate-600">Tamamen ücretsizdir. Günlük sıkıştırma limiti yoktur. İstediğiniz kadar dosyayı, istediğiniz boyutta (200MB+) küçültebilirsiniz.</p>
            </div>
          </div>

        </article>
      </div>
    </section>
  );
};

// --- LANDING PAGE ---

interface LandingPageProps {
  pageData?: SEOPageData;
  isHomePage?: boolean;
}

const LandingPage: React.FC<LandingPageProps> = ({ pageData, isHomePage = false }) => {
  const { slug } = useParams();
  const { t, language } = useLanguage();

  // Determine page data
  let currentPageData = pageData;
  let currentSlug = slug;

  if (slug && !pageData) {
    currentPageData = seoPages.find(p => p.slug === slug);
    if (!currentPageData) {
      return <Navigate to="/" replace />;
    }
  }

  // Default values for homepage
  const displayData = currentPageData ? {
    title: currentPageData.title,
    description: currentPageData.description,
    keywords: currentPageData.keywords,
    heroBadge: currentPageData.heroBadge,
    heroTitleStart: currentPageData.heroTitleStart,
    heroTitleEnd: currentPageData.heroTitleEnd,
    heroSubtitle: currentPageData.heroSubtitle,
  } : {
    title: DEFAULT_META[language].title,
    description: DEFAULT_META[language].description,
    keywords: SITE_CONFIG.defaultKeywords,
    heroBadge: t.hero.badge,
    heroTitleStart: t.hero.titleStart,
    heroTitleEnd: t.hero.titleEnd,
    heroSubtitle: t.hero.subtitle,
  };

  // Dynamic Title Logic
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = language === 'tr' ? '⏳ Dosyanız Hazır!' : '⏳ Your file is ready!';
      } else {
        document.title = displayData.title;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [language, displayData.title]);

  const isHome = !currentSlug && isHomePage;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-indigo-500 selection:text-white">
      <SEOHead
        title={displayData.title}
        description={displayData.description}
        keywords={displayData.keywords}
        slug={currentSlug}
        pageData={currentPageData}
        language={language}
        isHomePage={isHome}
      />

      <Navbar />

      {/* Hero Section */}
      <main className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 right-0 h-[80vh] bg-gradient-to-b from-indigo-50 via-white to-transparent -z-10" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full shadow-sm border border-slate-100 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{displayData.heroBadge}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-6 leading-[1.1]">
              {displayData.heroTitleStart} <br />
              <span className="text-indigo-600 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-fuchsia-600">{displayData.heroTitleEnd}</span>
            </h1>
            <p className="text-xl text-slate-500 font-medium leading-relaxed mb-10">
              {displayData.heroSubtitle}
            </p>
          </div>

          <div>
            <PDFCompressor />

            {/* Welcome Content */}
            <div className="max-w-3xl mx-auto mt-16 text-center">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">{t.welcome.title}</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                {t.welcome.desc}
              </p>
            </div>

            <AdvertisementBox
              slot="atf-slot-id"
              style={{ minHeight: '100px' }}
              responsive={true}
              className="mt-12 max-w-3xl mx-auto"
              label="ATF Ad (Responsive)"
            />
          </div>
        </div>
      </main>

      <Features />

      {/* Turkish SEO Content (only on homepage) */}
      {language === 'tr' && isHome && <SEOContent />}

      {/* Article Content for specific pages */}
      {currentPageData?.articleContent && (
        <section className="py-20 bg-white border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-6 text-slate-700 leading-relaxed font-sans">
            <article
              className="prose prose-slate prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: currentPageData.articleContent }}
            />
          </div>
        </section>
      )}

      {/* FAQ Section for programmatic pages */}
      {currentPageData?.faq && currentPageData.faq.length > 0 && (
        <FAQSection faqs={currentPageData.faq} />
      )}

      <HowItWorks />

      {/* Internal Links for programmatic pages */}
      {currentSlug && (
        <InternalLinks currentSlug={currentSlug} title="Related Tools" />
      )}

      <ConsentBanner />
      <Footer />
    </div>
  );
};

// --- APP ROUTING ---

const AppContent: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage isHomePage={true} />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-use" element={<TermsOfUse />} />
      <Route path="/pro" element={<ProVersion />} />
      <Route path="/:slug" element={<LandingPage />} />
    </Routes>
  );
};

const App: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<'en' | 'tr'>('en');

  return (
    <LanguageContext.Provider
      value={{
        language: currentLang,
        setLanguage: setCurrentLang,
        t: translations[currentLang]
      }}
    >
      <AppContent />
    </LanguageContext.Provider>
  );
};

export default App;
