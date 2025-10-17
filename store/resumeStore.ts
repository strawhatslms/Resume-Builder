import { create } from 'zustand';
import { ResumeData, TemplateType } from '@/types/resume';

interface ResumeStore {
  resumeData: ResumeData;
  selectedTemplate: TemplateType;
  setPersonalInfo: (info: ResumeData['personalInfo']) => void;
  addEducation: (edu: ResumeData['education'][0]) => void;
  updateEducation: (id: string, edu: Partial<ResumeData['education'][0]>) => void;
  removeEducation: (id: string) => void;
  addWorkExperience: (exp: ResumeData['workExperience'][0]) => void;
  updateWorkExperience: (id: string, exp: Partial<ResumeData['workExperience'][0]>) => void;
  removeWorkExperience: (id: string) => void;
  addProject: (project: ResumeData['projects'][0]) => void;
  updateProject: (id: string, project: Partial<ResumeData['projects'][0]>) => void;
  removeProject: (id: string) => void;
  setSkills: (skills: ResumeData['skills']) => void;
  addCertification: (cert: ResumeData['certifications'][0]) => void;
  updateCertification: (id: string, cert: Partial<ResumeData['certifications'][0]>) => void;
  removeCertification: (id: string) => void;
  addAchievement: (achievement: ResumeData['achievements'][0]) => void;
  updateAchievement: (id: string, achievement: Partial<ResumeData['achievements'][0]>) => void;
  removeAchievement: (id: string) => void;
  setTemplate: (template: TemplateType) => void;
  resetResume: () => void;
}

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    portfolio: '',
    summary: '',
  },
  education: [],
  workExperience: [],
  projects: [],
  skills: [],
  certifications: [],
  achievements: [],
};

export const useResumeStore = create<ResumeStore>((set) => ({
  resumeData: initialResumeData,
  selectedTemplate: 'modern',

  setPersonalInfo: (info) =>
    set((state) => ({
      resumeData: { ...state.resumeData, personalInfo: info },
    })),

  addEducation: (edu) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        education: [...state.resumeData.education, edu],
      },
    })),

  updateEducation: (id, edu) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        education: state.resumeData.education.map((e) =>
          e.id === id ? { ...e, ...edu } : e
        ),
      },
    })),

  removeEducation: (id) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        education: state.resumeData.education.filter((e) => e.id !== id),
      },
    })),

  addWorkExperience: (exp) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        workExperience: [...state.resumeData.workExperience, exp],
      },
    })),

  updateWorkExperience: (id, exp) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        workExperience: state.resumeData.workExperience.map((e) =>
          e.id === id ? { ...e, ...exp } : e
        ),
      },
    })),

  removeWorkExperience: (id) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        workExperience: state.resumeData.workExperience.filter((e) => e.id !== id),
      },
    })),

  addProject: (project) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        projects: [...state.resumeData.projects, project],
      },
    })),

  updateProject: (id, project) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        projects: state.resumeData.projects.map((p) =>
          p.id === id ? { ...p, ...project } : p
        ),
      },
    })),

  removeProject: (id) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        projects: state.resumeData.projects.filter((p) => p.id !== id),
      },
    })),

  setSkills: (skills) =>
    set((state) => ({
      resumeData: { ...state.resumeData, skills },
    })),

  addCertification: (cert) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        certifications: [...state.resumeData.certifications, cert],
      },
    })),

  updateCertification: (id, cert) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        certifications: state.resumeData.certifications.map((c) =>
          c.id === id ? { ...c, ...cert } : c
        ),
      },
    })),

  removeCertification: (id) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        certifications: state.resumeData.certifications.filter((c) => c.id !== id),
      },
    })),

  addAchievement: (achievement) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        achievements: [...state.resumeData.achievements, achievement],
      },
    })),

  updateAchievement: (id, achievement) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        achievements: state.resumeData.achievements.map((a) =>
          a.id === id ? { ...a, ...achievement } : a
        ),
      },
    })),

  removeAchievement: (id) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        achievements: state.resumeData.achievements.filter((a) => a.id !== id),
      },
    })),

  setTemplate: (template) => set({ selectedTemplate: template }),

  resetResume: () =>
    set({
      resumeData: initialResumeData,
      selectedTemplate: 'modern',
    }),
}));
