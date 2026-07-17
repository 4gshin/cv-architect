import { createContext, useState } from 'react';

export const CVContext = createContext();

export function CVProvider({ children }) {
  const [template, setTemplate] = useState('minimalist');
  
  const [cvData, setCvData] = useState({
    personalInfo: {
      fullName: '',
      title: '',
      email: '',
      phone: '',
      website: '',
      location: '',
      summary: ''
    },
    experience: [
      { id: 1, company: '', role: '', startDate: '', endDate: '', description: '' }
    ],
    education: [
      { id: 1, school: '', degree: '', startDate: '', endDate: '' }
    ],
    skills: []
  });

  const updatePersonalInfo = (field, value) => {
    setCvData(prev => ({
      ...prev,
      personalInfo: {
        ...(prev.personalInfo || {}),
        [field]: value
      }
    }));
  };

  return (
    <CVContext.Provider value={{ cvData, setCvData, updatePersonalInfo, template, setTemplate }}>
      {children}
    </CVContext.Provider>
  );
}