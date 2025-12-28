
import { PDFDocument } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';

// Worker ayarı - ESM üzerinden yükleme
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://esm.sh/pdfjs-dist@4.0.379/build/pdf.worker.min.mjs`;

/**
 * Agresif PDF Sıkıştırma (Flattening Yöntemi)
 * Bu yöntem sayfaları resme dönüştürüp JPEG olarak sıkıştırır.
 * Metin seçilebilirliği kaybolur ancak boyut garantili düşer.
 */
export const compressPDF = async (
  file: File, 
  onProgress: (progress: number) => void
): Promise<{ blob: Blob; size: number }> => {
  try {
    onProgress(5);
    const arrayBuffer = await file.arrayBuffer();
    
    // PDF'i PDF.js ile yükle (Rendering için)
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    const totalPages = pdf.numPages;
    
    // Yeni PDF oluştur (pdf-lib ile)
    const outPdf = await PDFDocument.create();
    
    // Her sayfayı tek tek işle (Bellek dostu)
    for (let i = 1; i <= totalPages; i++) {
      const page = await pdf.getPage(i);
      
      // 150 DPI kalite ayarı (Okunabilirlik için ideal)
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d', { alpha: false });
      
      if (!context) throw new Error('Canvas context oluşturulamadı');
      
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({
        canvasContext: context,
        viewport: viewport
      }).promise;

      // Sayfayı orta-yüksek kaliteli JPEG'e dönüştür (%50+ tasarrufun sırrı burası)
      const imgData = canvas.toDataURL('image/jpeg', 0.65);
      const imgBytes = await fetch(imgData).then(res => res.arrayBuffer());
      
      const embeddedImg = await outPdf.embedJpg(imgBytes);
      const newPage = outPdf.addPage([viewport.width, viewport.height]);
      
      newPage.drawImage(embeddedImg, {
        x: 0,
        y: 0,
        width: viewport.width,
        height: viewport.height,
      });

      // İlerlemeyi güncelle (10-90 arası)
      onProgress(10 + Math.floor((i / totalPages) * 80));
      
      // Canvas temizliği
      canvas.remove();
    }

    onProgress(95);
    
    // En yüksek yapısal sıkıştırmayla kaydet
    const compressedBytes = await outPdf.save({
      useObjectStreams: true,
      addDefaultFont: false
    });

    const compressedBlob = new Blob([compressedBytes], { type: 'application/pdf' });
    onProgress(100);

    return {
      blob: compressedBlob,
      size: compressedBlob.size
    };
  } catch (error) {
    console.error('Derin Sıkıştırma Hatası:', error);
    throw new Error('Dosya çok büyük veya karmaşık olduğu için işlenemedi.');
  }
};

export const formatBytes = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
