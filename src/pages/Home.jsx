import { useNavigate } from 'react-router-dom';
import { Sparkles, FileText, ArrowRight } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#f8fafc] px-4">
      <div className="max-w-3xl text-center space-y-6">
        {/* Bəzəkli Mini Tag */}
        <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-600 px-4 py-1.5 rounded-full text-sm font-medium">
          <Sparkles size={16} />
          Real-time CV Architect & Builder
        </div>

        {/* Əsas Başlıq */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Craft a professional CV <br />
          <span className="text-indigo-600 bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            in real-time.
          </span>
        </h1>

        {/* İzah Mətni */}
        <p className="text-lg text-slate-600 max-w-xl mx-auto font-normal leading-relaxed">
          Məlumatlarınızı daxil edin, eyni anda A4 vərəqində dəyişiklikləri izləyin və 3 fərqli minimalist dizaynda PDF olaraq export edin. Tamamilə pulsuz və açıq qaynaqlı.
        </p>

        {/* Çağırış Düyməsi (CTA) */}
        <div className="pt-4">
          <button
            onClick={() => navigate('/builder')}
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-medium px-8 py-4 rounded-xl shadow-lg shadow-slate-950/10 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <FileText size={20} />
            Create My CV
            <ArrowRight size={18} className="text-slate-400" />
          </button>
        </div>
      </div>
    </div>
  );
}