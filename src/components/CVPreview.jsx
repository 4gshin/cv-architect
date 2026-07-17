import { useContext, useState } from 'react';
import { CVContext } from '../context/CVContext';
import { Mail, Phone, Globe, MapPin, ZoomIn, ZoomOut } from 'lucide-react';

export default function CVPreview() {
  const { cvData, template } = useContext(CVContext);
  const { personalInfo } = cvData;
  const [zoom, setZoom] = useState(0.85); // Ekran ölçüsünə görə A4-ü 85% kiçildib tam göstəririk

  // Şablonlara görə dinamik klasslar
  const getTemplateStyles = () => {
    switch (template) {
      case 'modern':
        return {
          header: "border-l-4 border-indigo-600 pl-6 text-left",
          title: "text-indigo-600 font-semibold text-xs tracking-wider uppercase mt-1",
          accentLine: "bg-indigo-600"
        };
      case 'creative':
        return {
          header: "bg-slate-900 text-white -mx-[25mm] -mt-[25mm] p-12 text-center rounded-t-sm mb-8",
          title: "text-amber-400 font-medium text-xs tracking-widest uppercase mt-2",
          accentLine: "bg-amber-400"
        };
      case 'minimalist':
        return {
          header: "border-b-2 border-slate-900 pb-5 text-center",
          title: "text-slate-500 font-medium text-xs tracking-widest uppercase mt-1.5",
          accentLine: "bg-slate-900"
        };
      default:
        return {};
    }
  };

  const styles = getTemplateStyles();

  return (
    <div className="flex flex-col items-center gap-4 relative">
      {/* Zoom Controls Bar */}
      <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs shadow-lg sticky top-0 z-10 border border-slate-800">
        <button onClick={() => setZoom(prev => Math.max(0.5, prev - 0.05))} className="p-1 hover:bg-slate-800 rounded-full transition-colors">
          <ZoomOut size={14} />
        </button>
        <span className="font-mono w-10 text-center">{Math.round(zoom * 100)}%</span>
        <button onClick={() => setZoom(prev => Math.min(1.2, prev + 0.05))} className="p-1 hover:bg-slate-800 rounded-full transition-colors">
          <ZoomIn size={14} />
        </button>
      </div>

      {/* A4 Container */}
      <div 
        id="cv-a4-target" 
        style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}
        className="w-[210mm] min-h-[297mm] bg-white p-[25mm] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] rounded-sm flex flex-col font-sans text-slate-800 transition-all duration-300"
      >
        {/* Header Section */}
        <div className={styles.header}>
          <h1 className={`text-3xl font-black tracking-tight uppercase ${template === 'creative' ? 'text-white' : 'text-slate-900'}`}>
            {personalInfo.fullName || 'AGSHIN HEYBATLI'}
          </h1>
          <p className={styles.title}>
            {personalInfo.title || 'SOFTWARE ENGINEER / FULL-STACK DEVELOPER'}
          </p>

          {/* Contact Badges */}
          <div className={`flex flex-wrap gap-x-5 gap-y-1.5 mt-4 text-[11px] font-medium ${template === 'creative' ? 'justify-center text-slate-300' : template === 'modern' ? 'justify-start text-slate-500' : 'justify-center text-slate-500'}`}>
            {personalInfo.email && <span className="flex items-center gap-1.5"><Mail size={12} /> {personalInfo.email}</span>}
            {personalInfo.phone && <span className="flex items-center gap-1.5"><Phone size={12} /> {personalInfo.phone}</span>}
            {personalInfo.website && <span className="flex items-center gap-1.5"><Globe size={12} /> {personalInfo.website}</span>}
            {personalInfo.location && <span className="flex items-center gap-1.5"><MapPin size={12} /> {personalInfo.location}</span>}
          </div>
        </div>

        {/* About Section */}
        {personalInfo.summary && (
          <div className="mt-6">
            <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest mb-1.5">
              ABOUT ME
            </h3>
            <div className={`h-[2px] w-8 ${styles.accentLine} mb-3`} />
            <p className="text-[11px] text-slate-600 leading-relaxed text-justify whitespace-pre-line">
              {personalInfo.summary}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}