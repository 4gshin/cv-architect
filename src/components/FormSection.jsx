import { useContext } from 'react';
import { CVContext } from '../context/CVContext';
import { User, Mail, Phone, Globe, MapPin, AlignLeft, Layout, Briefcase, GraduationCap, Plus, Trash2 } from 'lucide-react';

export default function FormSection() {
  const { cvData, updatePersonalInfo, template, setTemplate, setCvData } = useContext(CVContext);
  const { personalInfo, experience, education } = cvData;

  const inputFields = [
    { label: 'Tam Adınız', field: 'fullName', icon: <User size={16} />, placeholder: 'Agshin Heybatli' },
    { label: 'Peşə Başlığı', field: 'title', icon: <Globe size={16} />, placeholder: 'Full-Stack Developer' },
    { label: 'E-poçt', field: 'email', icon: <Mail size={16} />, placeholder: 'agshin@example.com', type: 'email' },
    { label: 'Telefon', field: 'phone', icon: <Phone size={16} />, placeholder: '+994 50 000 00 00' },
    { label: 'Vebsayt / GitHub', field: 'website', icon: <Globe size={16} />, placeholder: 'github.com/agshin' },
    { label: 'Ünvan', field: 'location', icon: <MapPin size={16} />, placeholder: 'Ankara, Türkiyə' }
  ];

  // --- Dinamik Təcrübə (Experience) Dvijeniyaları ---
  const handleExperienceChange = (id, field, value) => {
    setCvData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    }));
  };

  const addExperience = () => {
    setCvData(prev => ({
      ...prev,
      experience: [...prev.experience, { id: Date.now(), company: '', role: '', startDate: '', endDate: '', description: '' }]
    }));
  };

  const removeExperience = (id) => {
    setCvData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  // --- Dinamik Təhsil (Education) Dvijeniyaları ---
  const handleEducationChange = (id, field, value) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu)
    }));
  };

  const addEducation = () => {
    setCvData(prev => ({
      ...prev,
      education: [...prev.education, { id: Date.now(), school: '', degree: '', startDate: '', endDate: '' }]
    }));
  };

  const removeEducation = (id) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  return (
    <div className="space-y-8 max-w-xl mx-auto pb-12">
      
      {/* 0. Şablon Seçim Paneli */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60 shadow-inner">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-3">
          <Layout size={14} />
          Şablon Dizaynı Seçin
        </label>
        <div className="grid grid-cols-3 gap-2">
          {['minimalist', 'modern', 'creative'].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTemplate(t)}
              className={`py-2.5 px-3 rounded-xl text-xs font-semibold uppercase tracking-wider border capitalize transition-all cursor-pointer ${
                template === t
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/10 scale-[1.01]'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* 1. Şəxsi Məlumatlar */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <User className="text-indigo-600" size={18} />
            Şəxsi Məlumatlar
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">CV-nin yuxarı hissəsində görünəcək əlaqə məlumatları.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {inputFields.map(({ label, field, icon, placeholder, type = 'text' }) => (
            <div key={field} className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">{label}</label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-slate-400">{icon}</span>
                <input
                  type={type}
                  placeholder={placeholder}
                  value={personalInfo[field] || ''}
                  onChange={(e) => updatePersonalInfo(field, e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-1">
            <AlignLeft size={14} />
            Haqqımda (Xülasə)
          </label>
          <textarea
            rows={3}
            placeholder="Təcrübəniz və hədəfləriniz haqqında qısa xülasə..."
            value={personalInfo.summary || ''}
            onChange={(e) => updatePersonalInfo('summary', e.target.value)}
            className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm resize-none"
          />
        </div>
      </div>

      {/* 2. İş Təcrübəsi Bölməsi */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Briefcase className="text-indigo-600" size={18} />
              İş Təcrübəsi
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Son iş yerinizdən başlayaraq sıralayın.</p>
          </div>
          <button
            type="button"
            onClick={addExperience}
            className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <Plus size={14} /> Əlavə et
          </button>
        </div>

        <div className="space-y-4">
          {experience.map((exp, index) => (
            <div key={exp.id} className="p-4 bg-slate-50 border border-slate-200/60 rounded-xl space-y-3 relative group">
              {experience.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeExperience(exp.id)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-rose-500 p-1 rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 size={16} />
                </button>
              )}
              <span className="text-xs font-bold text-slate-400 bg-white border border-slate-200/60 px-2 py-0.5 rounded-md">#{index + 1}</span>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Şirkət / Müəssisə"
                  value={exp.company}
                  onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm"
                />
                <input
                  type="text"
                  placeholder="Vəzifə / Rol"
                  value={exp.role}
                  onChange={(e) => handleExperienceChange(exp.id, 'role', e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm"
                />
                <input
                  type="text"
                  placeholder="Başlama Tarixi (Məs: 2024)"
                  value={exp.startDate}
                  onChange={(e) => handleExperienceChange(exp.id, 'startDate', e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm"
                />
                <input
                  type="text"
                  placeholder="Bitmə Tarixi (və ya Davam edir)"
                  value={exp.endDate}
                  onChange={(e) => handleExperienceChange(exp.id, 'endDate', e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm"
                />
              </div>
              <textarea
                rows={2}
                placeholder="Gördüyünüz işlər və nailiyyətlər haqqında qısa məlumat..."
                value={exp.description}
                onChange={(e) => handleExperienceChange(exp.id, 'description', e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm resize-none"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 3. Təhsil Bölməsi */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <GraduationCap className="text-indigo-600" size={18} />
              Təhsil
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Akademik keçmişinizi əlavə edin.</p>
          </div>
          <button
            type="button"
            onClick={addEducation}
            className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <Plus size={14} /> Əlavə et
          </button>
        </div>

        <div className="space-y-4">
          {education.map((edu, index) => (
            <div key={edu.id} className="p-4 bg-slate-50 border border-slate-200/60 rounded-xl space-y-3 relative group">
              {education.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEducation(edu.id)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-rose-500 p-1 rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 size={16} />
                </button>
              )}
              <span className="text-xs font-bold text-slate-400 bg-white border border-slate-200/60 px-2 py-0.5 rounded-md">#{index + 1}</span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Məktəb / Universitet"
                  value={edu.school}
                  onChange={(e) => handleEducationChange(edu.id, 'school', e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm"
                />
                <input
                  type="text"
                  placeholder="İxtisas / Dərəcə"
                  value={edu.degree}
                  onChange={(e) => handleEducationChange(edu.id, 'degree', e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm"
                />
                <input
                  type="text"
                  placeholder="Başlama Tarixi"
                  value={edu.startDate}
                  onChange={(e) => handleEducationChange(edu.id, 'startDate', e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm"
                />
                <input
                  type="text"
                  placeholder="Bitmə Tarixi"
                  value={edu.endDate}
                  onChange={(e) => handleEducationChange(edu.id, 'endDate', e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}