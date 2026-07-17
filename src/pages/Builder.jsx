import FormSection from '../components/FormSection';
import CVPreview from '../components/CVPreview';
import { FileDown, LayoutGrid, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Builder() {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-[#f1f5f9] flex flex-col overflow-hidden antialiased font-sans">
      {/* Üst Panel / Premium Navbar */}
      <header className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between shadow-sm shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/')}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-700 transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="h-4 w-[1px] bg-slate-200" />
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 text-white p-1.5 rounded-lg shadow-sm shadow-indigo-500/20">
              <LayoutGrid size={16} />
            </div>
            <span className="font-bold text-sm text-slate-900 tracking-tight">CV Architect <span className="text-xs font-normal text-slate-400 ml-1">v1.0</span></span>
          </div>
        </div>
        
        <button className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs px-4 py-2 rounded-lg shadow-sm shadow-indigo-500/10 transition-all active:scale-95">
          <FileDown size={14} />
          Export PDF
        </button>
      </header>

      {/* İş Masası */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sol tərəf: Form doldurma (Təmiz, skrol olunan və daraldılmış en) */}
        <div className="w-full lg:w-[45%] bg-white overflow-y-auto border-r border-slate-200/80 p-6 md:p-8 custom-scrollbar">
          <div className="max-w-xl mx-auto">
            <FormSection />
          </div>
        </div>

        {/* Sağ tərəf: Dark/Premium Emulyator Fonu */}
        <div className="hidden lg:flex flex-1 bg-[#1e293b] overflow-y-auto justify-center items-start p-12 custom-scrollbar">
          <CVPreview />
        </div>
      </div>
    </div>
  );
}