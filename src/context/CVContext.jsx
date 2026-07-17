import { useContext, useState } from 'react';
import { CVContext } from '../context/CVContext';
import { Mail, Phone, Globe, MapPin, ZoomIn, ZoomOut, Briefcase, GraduationCap } from 'lucide-react';

export default function CVPreview() {
  const { cvData, template } = useContext(CVContext);
  const { personalInfo, experience, education } = cvData;
  const [zoom, setZoom] = useState(0.85);

  // Şablonlara görə dinamik klasslar
  const getTemplateStyles = () => {
    switch (template) {
      case 'modern':
        return {
          header: "border-l-4 border-indigo-600 pl-6 text-left",
          title: "text-indigo-600 font-semibold text-xs tracking-wider uppercase mt-1",
          accentLine: "bg-indigo-600",
          sectionTitle: "text-sm font-bold text-slate-950 uppercase tracking-wider flex items-center gap-2 mb-2"
        };
      case 'creative':
        return {
          header: "bg-slate-900 text-white -mx-[25mm] -mt-[25mm] p-12 text-center rounded-t-sm mb-8",
          title: "text-amber-400 font-medium text-xs tracking-widest uppercase mt-2",
          accentLine: "bg-amber-400",
          sectionTitle: "text-sm font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-2 mb-2 border-b border-indigo-100 pb-1"
        };
      case 'minimalist':
      default:
        return {
          header: "border-b-2 border-slate-900 pb-5 text-center",
          title: "text-slate-500 font-medium text-xs tracking-widest uppercase mt-1.5",
          accentLine: "bg-slate-900",
          sectionTitle: "text-xs font-bold text-slate-900 uppercase tracking-widest mb-2 border-b border-slate-200 pb-1"
        };
    }
  };

  const styles = getTemplateStyles();

  return (
    <div className="flex flex-col items-center gap-4 relative">
      {/* Zoom Paneli */}
      <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs shadow-lg sticky top-0 z-10 border border-slate-800">
        <button type="button" onClick={() => setZoom(prev => Math.max(0.5, prev - 0.05))} className="p-1 hover:bg-slate-800 rounded-full transition-colors cursor-pointer">
          <ZoomOut size={14} />
        </button>
        <span className="font-mono w-10 text-center">{Math.round(zoom * 100)}%</span>
        <button type="button" onClick={() => setZoom(prev => Math.min(1.2, prev + 0.05))} className="p-1 hover:bg-slate-800 rounded-full transition-colors cursor-pointer">
          <ZoomIn size={14} />
        </button>
      </div>

      {/* A4 Kağızı */}
      <div 
        id="cv-a4-target" 
        style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}
        className="w-[210mm] min-h-[297mm] bg-white p-[25mm] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] rounded-sm flex flex-col font-sans text-slate-800 transition-all duration-300"
      >
        {/* 1. Header Bölməsi */}
        <div className={styles.header}>
          <h1 className={`text-3xl font-black tracking-tight uppercase ${template === 'creative' ? 'text-white' : 'text-slate-900'}`}>
            {personalInfo.fullName || 'AGSHIN HEYBATLI'}
          </h1>
          <p className={styles.title}>
            {personalInfo.title || 'SOFTWARE ENGINEER / FULL-STACK DEVELOPER'}
          </p>

          <div className={`flex flex-wrap gap-x-5 gap-y-1.5 mt-4 text-[11px] font-medium ${template === 'creative' ? 'justify-center text-slate-300' : template === 'modern' ? 'justify-start text-slate-500' : 'justify-center text-slate-500'}`}>
            {personalInfo.email && <span className="flex items-center gap-1.5"><Mail size={12} /> {personalInfo.email}</span>}
            {personalInfo.phone && <span className="flex items-center gap-1.5"><Phone size={12} /> {personalInfo.phone}</span>}
            {personalInfo.website && <span className="flex items-center gap-1.5"><Globe size={12} /> {personalInfo.website}</span>}
            {personalInfo.location && <span className="flex items-center gap-1.5"><MapPin size={12} /> {personalInfo.location}</span>}
          </div>
        </div>

        {/* 2. Profil / Summary */}
        {personalInfo.summary && (
          <div className="mt-6">
            <h3 className={styles.sectionTitle}>ABOUT ME</h3>
            {template !== 'creative' && <div className={`h-[2px] w-8 ${styles.accentLine} mb-3`} />}
            <p className="text-[11px] text-slate-600 leading-relaxed text-justify whitespace-pre-line">
              {personalInfo.summary}
            </p>
          </div>
        )}

        {/* 3. İş Təcrübəsi (Experience) */}
        {experience.some(exp => exp.company || exp.role) && (
          <div className="mt-6">
            <h3 className={styles.sectionTitle}>
              {template === 'modern' && <Briefcase size={14} className="text-indigo-600" />}
              WORK EXPERIENCE
            </h3>
            {template !== 'creative' && <div className={`h-[2px] w-8 ${styles.accentLine} mb-3`} />}
            
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="flex flex-col md:flex-row md:justify-between md:items-start gap-1">
                  <div className="space-y-1 max-w-[75%]">
                    <h4 className="text-xs font-bold text-slate-900">{exp.role || 'ROLE / POSITION'}</h4>
                    <span className="text-[11px] font-semibold text-slate-500">{exp.company || 'COMPANY NAME'}</span>
                    {exp.description && (
                      <p className="text-[11px] text-slate-600 leading-relaxed mt-1 text-justify whitespace-pre-line">{exp.description}</p>
                    )}
                  </div>
                  <div className="text-[10px] font-mono font-medium text-slate-400 text-right shrink-0">
                    {exp.startDate || 'START'} — {exp.endDate || 'PRESENT'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. Təhsil (Education) */}
        {education.some(edu => edu.school || edu.degree) && (
          <div className="mt-6">
            <h3 className={styles.sectionTitle}>
              {template === 'modern' && <GraduationCap size={14} className="text-indigo-600" />}
              EDUCATION
            </h3>
            {template !== 'creative' && <div className={`h-[2px] w-8 ${styles.accentLine} mb-3`} />}
            
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{edu.school || 'UNIVERSITY / SCHOOL'}</h4>
                    <span className="text-[11px] text-slate-500">{edu.degree || 'DEGREE / MAJOR'}</span>
                  </div>
                  <div className="text-[10px] font-mono font-medium text-slate-400 text-right">
                    {edu.startDate || 'START'} — {edu.endDate || 'END'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}