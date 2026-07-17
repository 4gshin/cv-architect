import { useContext } from 'react';
import { CVContext } from '../context/CVContext';
import { Mail, Phone, Globe, MapPin } from 'lucide-react';

export default function CVPreview() {
  const { cvData } = useContext(CVContext);
  const { personalInfo } = cvData;

  return (
    /* A4-ün ekrandan kənara daşmaması üçün scale helper istifadə edə bilərik, amma hələlik standart ölçüdə saxlayaq */
    <div 
      id="cv-a4-target" 
      className="w-[210mm] min-h-[297mm] bg-white p-[25mm] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] rounded-sm flex flex-col font-sans text-slate-800 transition-all duration-300"
    >
      {/* Header / Şəxsi Məlumatlar Bloku */}
      <div className="border-b-2 border-slate-900 pb-5 text-center">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase">
          {personalInfo.fullName || 'AGSHIN HEYBATLI'}
        </h1>
        <p className="text-indigo-600 font-semibold text-xs mt-1.5 tracking-widest uppercase">
          {personalInfo.title || 'SOFTWARE ENGINEER / FULL-STACK DEVELOPER'}
        </p>

        {/* Əlaqə məlumatları */}
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-1.5 mt-4 text-[11px] font-medium text-slate-500">
          {personalInfo.email && (
            <span className="flex items-center gap-1.5"><Mail size={12} className="text-slate-400" /> {personalInfo.email}</span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1.5"><Phone size={12} className="text-slate-400" /> {personalInfo.phone}</span>
          )}
          {personalInfo.website && (
            <span className="flex items-center gap-1.5"><Globe size={12} className="text-slate-400" /> {personalInfo.website}</span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1.5"><MapPin size={12} className="text-slate-400" /> {personalInfo.location}</span>
          )}
        </div>
      </div>

      {/* Profil / Haqqımda Xülasəsi */}
      {personalInfo.summary && (
        <div className="mt-6">
          <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest mb-2 border-b border-slate-200 pb-1">
            ABOUT ME
          </h3>
          <p className="text-[11px] text-slate-600 leading-relaxed text-justify whitespace-pre-line">
            {personalInfo.summary}
          </p>
        </div>
      )}
    </div>
  );
}