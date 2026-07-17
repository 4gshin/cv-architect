import { useContext } from 'react';
import { CVContext } from '../context/CVContext';
import { Mail, Phone, Globe, MapPin } from 'lucide-react';

export default function CVPreview() {
  const { cvData } = useContext(CVContext);
  const { personalInfo } = cvData;

  return (
    <div className="flex justify-center bg-slate-700 p-6 md:p-12 overflow-y-auto h-full">
      {/* Real A4 ölçüsü və strukturu */}
      <div id="cv-a4-target" className="a4-preview p-12 text-slate-800 flex flex-col font-sans select-none">
        
        {/* Header / Şəxsi Məlumatlar Bloku */}
        <div className="border-b border-slate-200 pb-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 min-h-[40px]">
            {personalInfo.fullName || 'ADINIZ VƏ SOYADINIZ'}
          </h1>
          <p className="text-indigo-600 font-medium text-sm mt-1 tracking-wide uppercase min-h-[20px]">
            {personalInfo.title || 'PEŞƏ BAŞLIĞINIZ'}
          </p>

          {/* Əlaqə məlumatları sətri */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 text-xs text-slate-500">
            {personalInfo.email && (
              <span className="flex items-center gap-1"><Mail size={12} /> {personalInfo.email}</span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1"><Phone size={12} /> {personalInfo.phone}</span>
            )}
            {personalInfo.website && (
              <span className="flex items-center gap-1"><Globe size={12} /> {personalInfo.website}</span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-1"><MapPin size={12} /> {personalInfo.location}</span>
            )}
          </div>
        </div>

        {/* Profil / Haqqımda Xülasəsi */}
        {personalInfo.summary && (
          <div className="mt-6">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-2 border-b border-slate-100 pb-1">
              Profil
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed text-justify">
              {personalInfo.summary}
            </p>
          </div>
        )}

        {/* Digər bölmələr (İş təcrübəsi, təhsil) növbəti addımda gələcək... */}
      </div>
    </div>
  );
}