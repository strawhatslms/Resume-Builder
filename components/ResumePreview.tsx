import React from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { Card, CardContent } from '@/components/ui/card';
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

export function ResumePreview() {
  const { resumeData, selectedTemplate } = useResumeStore();

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'classic':
        return <ClassicTemplate data={resumeData} />;
      case 'professional':
        return <ProfessionalTemplate data={resumeData} />;
      case 'minimal':
        return <MinimalTemplate data={resumeData} />;
      case 'creative':
        return <CreativeTemplate data={resumeData} />;
      case 'executive':
        return <ExecutiveTemplate data={resumeData} />;
      case 'technical':
        return <TechnicalTemplate data={resumeData} />;
      case 'elegant':
        return <ElegantTemplate data={resumeData} />;
      case 'compact':
        return <CompactTemplate data={resumeData} />;
      case 'bold':
        return <BoldTemplate data={resumeData} />;
      case 'modern':
      default:
        return <ModernTemplate data={resumeData} />;
    }
  };

  return (
    <Card className="w-full h-full overflow-auto">
      <CardContent className="p-2">
        <div className="max-w-[210mm] mx-auto">
          {renderTemplate()}
        </div>
      </CardContent>
    </Card>
  );
}
