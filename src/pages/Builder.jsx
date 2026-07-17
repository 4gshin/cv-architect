import FormSection from '../components/FormSection';
import CVPreview from '../components/CVPreview';
import { FileDown, LayoutGrid } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Builder() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      {/* Üst Panel / Navbar */}
      <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="bg-indigo-600 text-white p-2 rounded-lg">
            <LayoutGrid size={18} />
          </div>
          <span className="font-bold text-slate-900 tracking-tight">CV Architect</span>
        </div>
        
        <button className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm px-4 py-2 rounded-lg shadow-sm transition-colors">
          <FileDown size={16} />
          Export PDF
        </button>
      </header>

      {/* İş Masası (Grid) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 h-[calc(100vh-4rem)] overflow-hidden">
        {/* Sol tərəf: Form doldurma hissəsi */}
        <div className="p-6 md:p-8 overflow-y-auto border-r border-slate-200">
          <FormSection />
        </div>

        {/* Sağ tərəf: Real-time A4 Vizualizasiya */}
        <div className="hidden lg:block bg-slate-100 overflow-y-auto">
          <CVPreview />
        </div>
      </div>
    </div>
  );
}