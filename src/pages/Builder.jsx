import FormSection from '../components/FormSection';
import CVPreview from '../components/CVPreview';
import { FileDown, LayoutGrid, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';

export default function Builder() {
  const navigate = useNavigate();

  const handleExportPDF = () => {
    const element = document.getElementById('cv-a4-target');
    
    // PDF export parametrləri (A4 ölçülərinə tam uyğunluq üçün)
    const opt = {
      margin:       0,
      filename:     'my-professional-cv.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, logging: false },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Export zamanı zoom scale effektini müvəqqəti sıfırlayırıq ki, PDF təmiz çıxsın
    const originalTransform = element.style.transform;
    element.style.transform = 'none';

    html2pdf().set(opt).from(element).save().then(() => {
      element.style.transform = originalTransform; // Export bitəndən sonra köhnə zoom səviyyəsinə qaytarırıq
    });
  };

  return (
    <div className="h-screen bg-[#f1f5f9] flex flex-col overflow-hidden antialiased font-sans">
      {/* Üst Panel */}
      <header className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between shadow-sm shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/')}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="h-4 w-[1px] bg-slate-200" />
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 text-white p-1.5 rounded-lg shadow-sm shadow-indigo-500/20">
              <LayoutGrid size={16} />
            </div>
            <span className="font-bold text-sm text-slate-900 tracking-tight">CV Architect</span>
          </div>
        </div>
        
        {/* Export Düyməsi */}
        <button 
          onClick={handleExportPDF}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs px-4 py-2 rounded-lg shadow-sm shadow-indigo-500/10 transition-all active:scale-95 cursor-pointer"
        >
          <FileDown size={14} />
          Export PDF
        </button>
      </header>

      {/* İş Masası */}
      <div className="flex-1 flex overflow-hidden">
        <div className="w-full lg:w-[45%] bg-white overflow-y-auto border-r border-slate-200/80 p-6 md:p-8 custom-scrollbar">
          <div className="max-w-xl mx-auto">
            <FormSection />
          </div>
        </div>

        <div className="hidden lg:flex flex-1 bg-[#1e293b] overflow-y-auto justify-center items-start p-12 custom-scrollbar">
          <CVPreview />
        </div>
      </div>
    </div>
  );
}