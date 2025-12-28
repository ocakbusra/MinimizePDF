
import React, { useState } from 'react';
import { FileUp, FileCheck, Download, Trash2, AlertCircle, Loader2, Zap, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { CompressionStatus, PDFFile } from './types';
import { compressPDF, formatBytes } from './services/pdfService';

const App: React.FC = () => {
  const [status, setStatus] = useState<CompressionStatus>(CompressionStatus.IDLE);
  const [file, setFile] = useState<PDFFile | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setError('Lütfen geçerli bir PDF seçin.');
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
      setError(err.message || 'Sıkıştırma sırasında bir hata oluştu.');
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
      a.download = `sıkıştırılmış_turbo_${file.name}`;
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
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      {/* Top Banner */}
      <div className="bg-indigo-600 text-white text-[10px] py-1 text-center font-bold tracking-[0.2em] uppercase">
        Ultra Sıkıştırma Teknolojisi Aktif - %50+ Tasarruf Modu
      </div>

      <main className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100 mb-6">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Çevrimiçi & Yerel İşlem</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-4">
            Dev PDF Sıkıştırıcı <span className="text-indigo-600">Pro</span>
          </h1>
          <p className="text-slate-500 text-lg font-medium max-w-xl mx-auto leading-relaxed">
            200MB üzeri PDF'lerinizi akıllı render teknolojisi ile kaliteden ödün vermeden **yarı yarıya** küçültün.
          </p>
        </header>

        <div className="bg-white rounded-[3rem] p-6 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 relative overflow-hidden">
          
          {status === CompressionStatus.IDLE && !file && (
            <div className="relative group">
              <input type="file" accept=".pdf" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
              <div className="border-[3px] border-dashed border-slate-200 group-hover:border-indigo-500 rounded-[2.5rem] py-24 text-center transition-all duration-500 bg-slate-50/50 group-hover:bg-indigo-50/20">
                <div className="bg-white p-6 rounded-3xl shadow-xl w-fit mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                  <FileUp className="text-indigo-600" size={56} />
                </div>
                <h2 className="text-2xl font-black text-slate-800 mb-2">PDF Dosyanızı Sürükleyin</h2>
                <p className="text-slate-400 font-bold uppercase tracking-wider text-xs">Sınır yok: 200MB, 500MB, 1GB+</p>
              </div>
            </div>
          )}

          {file && status !== CompressionStatus.COMPLETED && status !== CompressionStatus.COMPRESSING && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex items-center gap-6 bg-slate-50 p-8 rounded-[2rem] border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 rotate-12">
                   <Zap size={100} />
                </div>
                <div className="bg-indigo-600 p-5 rounded-3xl shadow-lg shadow-indigo-200 shrink-0">
                  <FileCheck className="text-white" size={40} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-black text-2xl text-slate-800 truncate">{file.name}</h4>
                  <div className="flex items-center gap-3">
                    <span className="text-indigo-600 font-black text-lg">{formatBytes(file.size)}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span className="text-slate-400 font-bold text-sm">Turbo Mod Hazır</span>
                  </div>
                </div>
                <button onClick={reset} className="p-4 text-slate-300 hover:text-red-500 transition-colors">
                  <Trash2 size={28} />
                </button>
              </div>

              <div className="bg-amber-50 rounded-3xl p-6 border border-amber-100 flex gap-4">
                 <ShieldCheck className="text-amber-600 shrink-0" size={24} />
                 <p className="text-sm text-amber-900 leading-relaxed font-medium">
                   <strong>Önemli:</strong> Bu "Pro" sıkıştırma modu sayfaları yeniden oluşturur. Boyut garantili düşer ancak metinler görselleştirilir. Arşivleme ve hızlı paylaşım için en iyisidir.
                 </p>
              </div>

              <button
                onClick={startDeepCompression}
                className="w-full bg-slate-900 hover:bg-black text-white font-black py-7 rounded-[2rem] shadow-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-4 text-2xl group"
              >
                <Zap size={28} className="text-indigo-400 group-hover:scale-125 transition-transform" />
                TURBO SIKIŞTIRMAYI BAŞLAT
              </button>
            </div>
          )}

          {status === CompressionStatus.COMPRESSING && (
            <div className="py-16 text-center space-y-10">
              <div className="relative">
                <div className="w-32 h-32 border-8 border-slate-100 border-t-indigo-600 rounded-full animate-spin mx-auto mb-8" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-600 font-black text-xl">
                  %{progress}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">PDF Yeniden İnşa Ediliyor</h3>
                <p className="text-slate-500 font-bold text-lg max-w-sm mx-auto">
                  Sayfalarınız tek tek analiz ediliyor ve akıllı JPEG motoruyla optimize ediliyor...
                </p>
              </div>
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden max-w-md mx-auto shadow-inner">
                <div className="h-full progress-shimmer transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}

          {status === CompressionStatus.COMPLETED && file && (
            <div className="space-y-12 animate-in zoom-in-95 duration-500">
              <div className="bg-indigo-600 rounded-[2.5rem] p-10 md:p-14 text-white shadow-2xl shadow-indigo-200 relative overflow-hidden">
                <div className="absolute -bottom-10 -right-10 opacity-10 rotate-12">
                   <Sparkles size={200} />
                </div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                  <div className="text-center md:text-left">
                    <p className="text-indigo-200 font-black tracking-widest text-xs uppercase mb-3">Sıkıştırma Tamamlandı</p>
                    <h3 className="text-5xl font-black tracking-tighter leading-tight">Yarı Yarıya <br/>Küçüldü!</h3>
                  </div>
                  
                  <div className="flex flex-col gap-4 w-full md:w-auto">
                    <div className="flex items-center justify-between gap-8 bg-white/10 px-6 py-4 rounded-2xl backdrop-blur-sm border border-white/10">
                       <span className="text-indigo-100 font-bold">ÖNCE</span>
                       <span className="text-2xl font-black opacity-60 italic">{formatBytes(file.size)}</span>
                    </div>
                    <div className="flex items-center justify-between gap-8 bg-white/20 px-6 py-4 rounded-2xl backdrop-blur-sm border border-white/30">
                       <span className="text-white font-bold">SONRA</span>
                       <span className="text-3xl font-black">{formatBytes(file.compressedSize || 0)}</span>
                    </div>
                  </div>

                  <div className="bg-white text-indigo-600 px-8 py-6 rounded-[2rem] text-center shadow-xl">
                    <p className="text-[10px] font-black uppercase mb-1">TASARRUF</p>
                    <p className="text-5xl font-black">%{ratio}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button
                  onClick={downloadFile}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-7 rounded-[2rem] shadow-[0_20px_40px_rgba(16,185,129,0.2)] transition-all active:scale-[0.98] flex items-center justify-center gap-4 text-2xl group"
                >
                  <Download size={32} className="group-hover:bounce transition-transform" />
                  KÜÇÜLTÜLMÜŞ PDF'İ İNDİR
                </button>
                <button
                  onClick={reset}
                  className="w-full bg-white text-slate-400 font-bold py-5 rounded-[2rem] border-2 border-slate-100 hover:bg-slate-50 transition-all"
                >
                  Başka Dosya Dene
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-8 p-8 bg-red-50 border-2 border-red-100 rounded-[2rem] flex items-start gap-5 text-red-600">
              <AlertCircle size={32} className="shrink-0 mt-1" />
              <div>
                <p className="font-black text-xl">Sıkıştırma Başarısız</p>
                <p className="font-bold text-red-400">{error}</p>
                <button onClick={reset} className="mt-4 text-sm font-black underline">Tekrar Dene</button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-20 flex flex-wrap justify-center gap-12 opacity-40">
           <div className="flex flex-col items-center gap-2">
              <Zap size={24} />
              <span className="text-[10px] font-black uppercase">Turbo Render</span>
           </div>
           <div className="flex flex-col items-center gap-2">
              <ArrowRight size={24} />
              <span className="text-[10px] font-black uppercase">Düşük Bant Genişliği</span>
           </div>
           <div className="flex flex-col items-center gap-2">
              <Download size={24} />
              <span className="text-[10px] font-black uppercase">Tek Tık İndir</span>
           </div>
        </div>
      </main>

      <footer className="py-12 text-center text-slate-400 font-bold tracking-widest text-[10px]">
        DEVPDF PRO &copy; {new Date().getFullYear()} - AKILLI PDF MİMARİSİ
      </footer>
    </div>
  );
};

export default App;
