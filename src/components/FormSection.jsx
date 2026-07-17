import { useContext } from 'react';
import { CVContext } from '../context/CVContext';
import { User, Mail, Phone, Globe, MapPin, AlignLeft } from 'lucide-react';

export default function FormSection() {
  const { cvData, updatePersonalInfo } = useContext(CVContext);
  const { personalInfo } = cvData;

  const inputFields = [
    { label: 'Tam Adınız', field: 'fullName', icon: <User size={16} />, placeholder: 'Agshin Heybatli' },
    { label: 'Peşə Başlığı', field: 'title', icon: <Globe size={16} />, placeholder: 'Full-Stack Developer' },
    { label: 'E-poçt', field: 'email', icon: <Mail size={16} />, placeholder: 'agshin@example.com', type: 'email' },
    { label: 'Telefon', field: 'phone', icon: <Phone size={16} />, placeholder: '+994 50 000 00 00' },
    { label: 'Vebsayt / GitHub', field: 'website', icon: <Globe size={16} />, placeholder: 'github.com/agshin' },
    { label: 'Ünvan', field: 'location', icon: <MapPin size={16} />, placeholder: 'Ankara, Türkiyə' }
  ];

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <User className="text-indigo-600" size={20} />
          Şəxsi Məlumatlar
        </h2>
        <p className="text-sm text-slate-500 mt-1">CV-nizin yuxarı hissəsində görünəcək əlaqə məlumatları.</p>
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
                value={personalInfo[field]}
                onChange={(e) => updatePersonalInfo(field, e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
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
          rows={4}
          placeholder="Təcrübəniz və hədəfləriniz haqqında qısa xülasə..."
          value={personalInfo.summary}
          onChange={(e) => updatePersonalInfo('summary', e.target.value)}
          className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm resize-none"
        />
      </div>
    </div>
  );
}