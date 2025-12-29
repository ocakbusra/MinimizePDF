
import React from 'react';
import { Scale, FileCheck, AlertTriangle, Copyright, ArrowLeft } from 'lucide-react';
import { useLanguage } from './App';

export const TermsOfUse: React.FC = () => {
    const { language } = useLanguage();

    const content = {
        en: {
            title: "Terms of Use",
            lastUpdated: "Last Updated: December 29, 2025",
            intro: "Welcome to Minimize PDF. By accessing or using our website, you agree to be bound by these Terms of Use. If you disagree with any part of these terms, you may not access the service.",
            sections: [
                {
                    icon: <FileCheck className="text-indigo-600" size={24} />,
                    title: "Description of Service",
                    text: "Minimize PDF provides a free, browser-based online PDF compression tool. We utilize WebAssembly technology to process files locally on your device. We do not store, copy, or transmit your files to any server. You retain full ownership and control of your documents at all times."
                },
                {
                    icon: <Scale className="text-indigo-600" size={24} />,
                    title: "User Responsibilities",
                    text: "You agree to use our service only for lawful purposes. You are solely responsible for the content of the files you compress. You must not use our service to process illegal, harmful, or malicious content."
                },
                {
                    icon: <Copyright className="text-indigo-600" size={24} />,
                    title: "Intellectual Property",
                    text: "The Minimize PDF website, its design, logos, and underlying code are the property of Minimize PDF and are protected by copyright laws. However, the files you process remain your intellectual property."
                },
                {
                    icon: <AlertTriangle className="text-indigo-600" size={24} />,
                    title: "Disclaimer of Warranties",
                    text: "Our service is provided on an 'AS IS' and 'AS AVAILABLE' basis. While we strive for high-quality compression, we make no warranties, expressed or implied, regarding the reliability, accuracy, or availability of the service. We are not liable for any data loss or corruption."
                }
            ],
            contact: {
                title: "Contact Us",
                text: "If you have any questions about these Terms, please contact us at support@minimizepdf.com"
            },
            back: "Back to Home"
        },
        tr: {
            title: "Kullanım Şartları",
            lastUpdated: "Son Güncelleme: 29 Aralık 2025",
            intro: "Minimize PDF'e hoş geldiniz. Web sitemize erişerek veya kullanarak, bu Kullanım Şartları'na uymayı kabul etmiş olursunuz. Bu şartların herhangi bir kısmını kabul etmiyorsanız, hizmeti kullanamazsınız.",
            sections: [
                {
                    icon: <FileCheck className="text-indigo-600" size={24} />,
                    title: "Hizmet Tanımı",
                    text: "Minimize PDF, ücretsiz, tarayıcı tabanlı bir çevrimiçi PDF sıkıştırma aracı sağlar. Dosyaları yerel olarak cihazınızda işlemek için WebAssembly teknolojisini kullanıyoruz. Dosyalarınızı depolamıyor, kopyalamıyor veya herhangi bir sunucuya iletmiyoruz. Belgelerinizin tam mülkiyeti ve kontrolü her zaman sizdedir."
                },
                {
                    icon: <Scale className="text-indigo-600" size={24} />,
                    title: "Kullanıcı Sorumlulukları",
                    text: "Hizmetimizi yalnızca yasal amaçlar için kullanmayı kabul edersiniz. Sıkıştırdığınız dosyaların içeriğinden yalnızca siz sorumlusunuz. Hizmetimizi yasa dışı, zararlı veya kötü amaçlı içerikleri işlemek için kullanmamalısınız."
                },
                {
                    icon: <Copyright className="text-indigo-600" size={24} />,
                    title: "Fikri Mülkiyet",
                    text: "Minimize PDF web sitesi, tasarımı, logoları ve temel kodları Minimize PDF'in mülkiyetindedir ve telif hakkı yasalarıyla korunmaktadır. Ancak, işlediğiniz dosyalar sizin fikri mülkiyetinizde kalır."
                },
                {
                    icon: <AlertTriangle className="text-indigo-600" size={24} />,
                    title: "Sorumluluk Reddi",
                    text: "Hizmetimiz 'OLDUĞU GİBİ' ve 'MEVCUT OLDUĞU ŞEKİLDE' sağlanmaktadır. Yüksek kaliteli sıkıştırma için çabalasak da, hizmetin güvenilirliği, doğruluğu veya kullanılabilirliği konusunda açık veya zımni hiçbir garanti vermiyoruz. Herhangi bir veri kaybı veya bozulmasından sorumlu değiliz."
                }
            ],
            contact: {
                title: "İletişim",
                text: "Bu Şartlar hakkında sorularınız varsa, lütfen support@minimizepdf.com adresinden bizimle iletişime geçin."
            },
            back: "Ana Sayfaya Dön"
        }
    };

    const t = content[language];

    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-900 py-12 px-6">
            <div className="max-w-3xl mx-auto">
                <a href="/" className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:underline mb-8">
                    <ArrowLeft size={20} />
                    {t.back}
                </a>

                <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl shadow-slate-200 border border-slate-100">
                    <h1 className="text-3xl md:text-4xl font-black mb-4">{t.title}</h1>
                    <p className="text-slate-400 font-medium mb-8 text-sm">{t.lastUpdated}</p>

                    <div className="prose prose-slate max-w-none">
                        <p className="text-lg leading-relaxed text-slate-600 mb-12">
                            {t.intro}
                        </p>

                        <div className="grid gap-8">
                            {t.sections.map((section, index) => (
                                <div key={index} className="flex gap-4 items-start">
                                    <div className="bg-indigo-50 p-3 rounded-xl shrink-0 mt-1">
                                        {section.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">{section.title}</h3>
                                        <p className="text-slate-600 leading-relaxed">
                                            {section.text}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                            <h3 className="text-lg font-bold text-slate-900 mb-2">{t.contact.title}</h3>
                            <p className="text-slate-600">
                                {t.contact.text}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
