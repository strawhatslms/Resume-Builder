'use client';

import React, { useState } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { PersonalInfoForm } from '@/components/forms/PersonalInfoForm';
import { EducationForm } from '@/components/forms/EducationForm';
import { WorkExperienceForm } from '@/components/forms/WorkExperienceForm';
import { ProjectsForm } from '@/components/forms/ProjectsForm';
import { SkillsForm } from '@/components/forms/SkillsForm';
import { CertificationsForm } from '@/components/forms/CertificationsForm';
import { AchievementsForm } from '@/components/forms/AchievementsForm';
import { ResumePreview } from '@/components/ResumePreview';
import { TemplateSelector } from '@/components/TemplateSelector';
import { Button } from '@/components/ui/button';
import { generatePDF } from '@/lib/pdfGenerator';
import { Download, FileText, Eye, EyeOff } from 'lucide-react';

export default function Home() {
  const { resumeData, selectedTemplate } = useResumeStore();
  const [showPreview, setShowPreview] = useState(true);

  const handleDownloadPDF = async () => {
    try {
      await generatePDF(resumeData);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#006989] shadow-lg border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-lg shadow-md">
                <FileText className="w-8 h-8 text-[#006989]" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">Resume Builder</h1>
                <p className="text-sm text-white/90">Create ATS-optimized professional resumes</p>
              </div>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <Button
                onClick={() => setShowPreview(!showPreview)}
                variant="outline"
                className="hidden lg:flex bg-white text-[#006989] hover:bg-gray-100 hover:text-black border-2 border-white transition-all duration-200 hover:scale-105"
              >
                {showPreview ? (
                  <>
                    <EyeOff className="w-4 h-4 mr-2" />
                    Hide Preview
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    Show Preview
                  </>
                )}
              </Button>
              <Button 
                onClick={handleDownloadPDF} 
                className="bg-[#e6f4f8] hover:bg-[#cce9f1] text-[#006989] font-bold border-2 border-white transition-all duration-200 hover:scale-105 shadow-lg flex-1 sm:flex-initial"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Column - Forms */}
          <div className="space-y-6">
            <PersonalInfoForm />
            <EducationForm />
            <WorkExperienceForm />
            <ProjectsForm />
            <SkillsForm />
            <CertificationsForm />
            <AchievementsForm />
          </div>

          {/* Right Column - Prominent Live Preview */}
          <div className={`${showPreview ? '' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-2xl p-4 border-4 border-[#006989] h-full transition-all duration-300 hover:shadow-3xl">
              <div className="flex items-center justify-between mb-4 px-2">
                <div>
                  <h2 className="text-xl font-bold text-black">Live Preview</h2>
                  <p className="text-sm text-gray-700">Updates in real-time as you type</p>
                </div>
                <span className="px-4 py-1.5 bg-[#006989] text-white text-xs font-bold rounded-full shadow-md animate-pulse">
                  • Live
                </span>
              </div>
              <div className="border-3 border-gray-300 rounded-lg overflow-hidden bg-gray-50 h-[calc(100%-4rem)] shadow-inner">
                <div className="h-full overflow-auto">
                  <ResumePreview />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Template Selector - Navbar Style */}
        <div className="mt-12 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <TemplateSelector />
        </div>

        {/* Mobile Preview Toggle */}
        <div className="lg:hidden fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => setShowPreview(!showPreview)}
            size="lg"
            className="rounded-full shadow-2xl bg-[#006989] hover:bg-[#e6f4f8] hover:text-[#006989] text-white border-2 border-white transition-all duration-300 hover:scale-110"
          >
            {showPreview ? (
              <>
                <EyeOff className="w-5 h-5 mr-2" />
                Hide Preview
              </>
            ) : (
              <>
                <Eye className="w-5 h-5 mr-2" />
                Show Preview
              </>
            )}
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#e6f4f8] border-t-4 border-[#006989] mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-[#006989] font-semibold">
            Built with Next.js, React, and TailwindCSS • ATS-Optimized Resume Builder
          </p>
        </div>
      </footer>
    </div>
  );
}
