import React from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { ModernTemplate } from './templates/ModernTemplate';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { ProfessionalTemplate } from './templates/ProfessionalTemplate';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';
import { ExecutiveTemplate } from './templates/ExecutiveTemplate';
import { TechnicalTemplate } from './templates/TechnicalTemplate';
import { ElegantTemplate } from './templates/ElegantTemplate';
import { CompactTemplate } from './templates/CompactTemplate';
import { BoldTemplate } from './templates/BoldTemplate';
import { ResumeData, TemplateType } from '@/types/resume';

interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  color: string;
  component: React.ComponentType<{ data: ResumeData }>;
}

// Dummy data for template previews
const dummyResumeData: ResumeData = {
  personalInfo: {
    fullName: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/johndoe',
    github: 'github.com/johndoe',
    portfolio: 'johndoe.dev',
    summary: 'Experienced Software Engineer with 5+ years of expertise in full-stack development. Proven track record of building scalable applications and leading cross-functional teams to deliver high-quality software solutions.',
  },
  education: [
    {
      id: '1',
      institution: 'Stanford University',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2015-09',
      endDate: '2019-05',
      gpa: '3.8',
      achievements: ['Dean\'s List', 'Computer Science Award'],
    },
  ],
  workExperience: [
    {
      id: '1',
      company: 'Tech Corp',
      position: 'Senior Software Engineer',
      location: 'San Francisco, CA',
      startDate: '2021-01',
      endDate: '',
      current: true,
      responsibilities: [
        'Led development of microservices architecture serving 1M+ daily users',
        'Implemented CI/CD pipeline reducing deployment time by 60%',
        'Mentored team of 5 junior engineers and conducted code reviews',
      ],
    },
    {
      id: '2',
      company: 'StartupXYZ',
      position: 'Full Stack Developer',
      location: 'Palo Alto, CA',
      startDate: '2019-06',
      endDate: '2020-12',
      current: false,
      responsibilities: [
        'Built responsive web applications using React and Node.js',
        'Optimized database queries improving performance by 40%',
        'Collaborated with product team to define technical requirements',
      ],
    },
  ],
  projects: [
    {
      id: '1',
      name: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      link: 'github.com/johndoe/ecommerce',
      highlights: [
        'Processed $100K+ in transactions',
        'Implemented secure payment gateway',
      ],
    },
    {
      id: '2',
      name: 'Task Management App',
      description: 'Real-time collaboration tool for agile teams',
      technologies: ['Vue.js', 'Firebase', 'WebSocket'],
      highlights: [
        '500+ active users',
        'Real-time updates across devices',
      ],
    },
  ],
  skills: [
    {
      category: 'Programming Languages',
      items: ['JavaScript', 'TypeScript', 'Python', 'Java'],
    },
    {
      category: 'Frameworks & Libraries',
      items: ['React', 'Node.js', 'Express', 'Next.js'],
    },
    {
      category: 'Tools & Technologies',
      items: ['Git', 'Docker', 'AWS', 'MongoDB'],
    },
  ],
  certifications: [
    {
      id: '1',
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2022-06',
      credentialId: 'AWS-12345',
    },
  ],
  achievements: [
    {
      id: '1',
      title: 'Employee of the Year',
      description: 'Recognized for outstanding contributions to product development',
      date: '2022-12',
    },
  ],
};

const templates: TemplateConfig[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean design with blue accents',
    color: 'border-blue-500 bg-blue-50',
    component: ModernTemplate,
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional professional format',
    color: 'border-gray-500 bg-gray-50',
    component: ClassicTemplate,
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Bold header with sidebar accents',
    color: 'border-gray-700 bg-gray-100',
    component: ProfessionalTemplate,
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and elegant layout',
    color: 'border-slate-400 bg-white',
    component: MinimalTemplate,
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Vibrant purple gradient design',
    color: 'border-purple-500 bg-purple-50',
    component: CreativeTemplate,
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Corporate indigo styling',
    color: 'border-indigo-600 bg-indigo-50',
    component: ExecutiveTemplate,
  },
  {
    id: 'technical',
    name: 'Technical',
    description: 'Code-style monospace theme',
    color: 'border-green-500 bg-green-50',
    component: TechnicalTemplate,
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'Refined serif font with amber accents',
    color: 'border-amber-700 bg-amber-50',
    component: ElegantTemplate,
  },
  {
    id: 'compact',
    name: 'Compact',
    description: 'Space-efficient two-column layout',
    color: 'border-teal-700 bg-teal-50',
    component: CompactTemplate,
  },
  {
    id: 'bold',
    name: 'Bold',
    description: 'Strong visual impact with red accents',
    color: 'border-red-700 bg-red-50',
    component: BoldTemplate,
  },
];

export function TemplateSelector() {
  const { selectedTemplate, setTemplate } = useResumeStore();
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative bg-[#e6f4f8] rounded-3xl shadow-2xl overflow-hidden border-4 border-[#006989]">
      {/* Header Section */}
      <div className="relative bg-[#006989] px-8 py-5 border-b-2 border-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1 tracking-tight">Choose Your Template</h2>
            <p className="text-sm text-white/90">Scroll through our professionally designed, ATS-optimized templates</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-4 py-2 bg-white text-[#006989] text-xs font-bold rounded-full shadow-lg">
              10+ Templates
            </span>
          </div>
        </div>
      </div>

      {/* Template Gallery */}
      <div className="relative bg-[#e6f4f8] px-4 py-6">
        <div className="relative group">
          {/* Scroll Buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-[#006989] hover:bg-white hover:text-[#006989] text-white shadow-2xl rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all hover:scale-110 border-2 border-[#006989]"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-[#006989] hover:bg-white hover:text-[#006989] text-white shadow-2xl rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all hover:scale-110 border-2 border-[#006989]"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Horizontal Template Gallery */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pl-8 pr-8 py-3 scroll-smooth scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {templates.map((template) => {
              const TemplateComponent = template.component;
              const isSelected = selectedTemplate === template.id;

              return (
                <button
                  key={template.id}
                  onClick={() => setTemplate(template.id as TemplateType)}
                  className={`
                    flex-shrink-0 w-72 rounded-xl border-4 transition-all transform hover:scale-105 hover:-translate-y-2 duration-300
                    ${isSelected 
                      ? 'border-[#006989] shadow-2xl shadow-[#006989]/50 ring-4 ring-[#006989]/30 scale-105' 
                      : 'border-gray-300 hover:border-[#006989] shadow-xl hover:shadow-[#006989]/30'}
                  `}
                >
                  <div className="relative bg-white rounded-xl overflow-hidden">
                    {/* Template Preview with Dummy Data */}
                    <div className="h-[320px] overflow-hidden bg-white border-b-3 border-gray-200 relative">
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="transform scale-[0.32] origin-top-left" style={{ width: '900px', height: '1200px', minWidth: '900px' }}>
                          <TemplateComponent data={dummyResumeData} />
                        </div>
                      </div>
                    </div>

                    {/* Template Info */}
                    <div className="p-4 bg-white">
                      <div className="flex items-start justify-between mb-2">
                        <div className="text-left flex-1">
                          <h3 className="font-bold text-black text-lg mb-1">{template.name}</h3>
                          <p className="text-sm text-gray-700 line-clamp-2">{template.description}</p>
                        </div>
                        {isSelected && (
                          <div className="flex-shrink-0 w-9 h-9 bg-[#006989] rounded-full flex items-center justify-center ml-2 shadow-lg ring-4 ring-[#006989]/30">
                            <Check className="w-5 h-5 text-white" />
                          </div>
                        )}
                      </div>
                      {isSelected && (
                        <div className="mt-3 px-4 py-2 bg-[#006989] text-white text-sm font-bold rounded-lg text-center shadow-lg">
                          ✓ Currently Selected
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
            
            {/* Coming Soon Card */}
            <div className="flex-shrink-0 w-72 rounded-xl border-4 border-dashed border-[#006989] bg-white/80 backdrop-blur-sm">
              <div className="h-full flex flex-col items-center justify-center p-8 min-h-[420px]">
                <div className="text-6xl mb-4">🚀</div>
                <h3 className="font-bold text-[#006989] text-2xl mb-3 text-center">Coming Soon!</h3>
                <p className="text-gray-700 text-center text-sm leading-relaxed">
                  More amazing templates are on the way. Stay tuned for fresh designs!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tip Section */}
        <div className="mt-5 mx-8 p-4 bg-[#006989] rounded-xl border-2 border-[#006989] shadow-xl">
          <p className="text-sm text-white">
            <strong className="text-white font-bold">💡 Pro Tip:</strong> Scroll horizontally to explore all templates. Each shows sample data for comparison.
          </p>
        </div>
      </div>
    </div>
  );
}
