import jsPDF from 'jspdf';
import { ResumeData } from '@/types/resume';
import { formatDate } from './utils';

export async function generatePDF(resumeData: ResumeData): Promise<void> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - 2 * margin;
  let yPosition = margin;

  // Helper function to add text with word wrap
  const addText = (text: string, size: number, style: 'normal' | 'bold' = 'normal', color: [number, number, number] = [0, 0, 0]) => {
    doc.setFontSize(size);
    doc.setFont('helvetica', style);
    doc.setTextColor(color[0], color[1], color[2]);
    const lines = doc.splitTextToSize(text, contentWidth);
    
    lines.forEach((line: string) => {
      if (yPosition > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
      }
      doc.text(line, margin, yPosition);
      yPosition += size * 0.5;
    });
  };

  const addSpace = (space: number) => {
    yPosition += space;
  };

  const addLine = () => {
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 3;
  };

  // Header - Personal Info
  addText(resumeData.personalInfo.fullName.toUpperCase(), 20, 'bold', [0, 51, 102]);
  addSpace(2);

  // Contact Information
  const contactInfo = [
    resumeData.personalInfo.email,
    resumeData.personalInfo.phone,
    resumeData.personalInfo.location
  ].filter(Boolean).join(' | ');
  
  addText(contactInfo, 10, 'normal', [60, 60, 60]);

  // Links
  const links = [
    resumeData.personalInfo.linkedin,
    resumeData.personalInfo.github,
    resumeData.personalInfo.portfolio
  ].filter(Boolean).join(' | ');
  
  if (links) {
    addText(links, 9, 'normal', [0, 102, 204]);
  }

  addSpace(4);
  addLine();

  // Professional Summary
  if (resumeData.personalInfo.summary) {
    addSpace(2);
    addText('PROFESSIONAL SUMMARY', 12, 'bold', [0, 51, 102]);
    addSpace(2);
    addText(resumeData.personalInfo.summary, 10, 'normal');
    addSpace(4);
    addLine();
  }

  // Education
  if (resumeData.education.length > 0) {
    addSpace(2);
    addText('EDUCATION', 12, 'bold', [0, 51, 102]);
    addSpace(2);

    resumeData.education.forEach((edu, index) => {
      addText(edu.institution, 11, 'bold');
      addSpace(1);
      addText(`${edu.degree} in ${edu.field}`, 10, 'normal');
      addSpace(1);
      const dateRange = `${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}`;
      addText(dateRange, 9, 'normal', [80, 80, 80]);
      if (edu.gpa) {
        addSpace(1);
        addText(`GPA: ${edu.gpa}`, 9, 'normal');
      }
      if (edu.achievements && edu.achievements.length > 0) {
        edu.achievements.forEach(achievement => {
          addSpace(1);
          addText(`• ${achievement}`, 9, 'normal');
        });
      }
      if (index < resumeData.education.length - 1) addSpace(3);
    });

    addSpace(4);
    addLine();
  }

  // Work Experience
  if (resumeData.workExperience.length > 0) {
    addSpace(2);
    addText('WORK EXPERIENCE', 12, 'bold', [0, 51, 102]);
    addSpace(2);

    resumeData.workExperience.forEach((exp, index) => {
      addText(exp.position, 11, 'bold');
      addSpace(1);
      addText(`${exp.company} | ${exp.location}`, 10, 'normal');
      addSpace(1);
      const dateRange = `${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}`;
      addText(dateRange, 9, 'normal', [80, 80, 80]);
      addSpace(2);

      exp.responsibilities.forEach(resp => {
        addText(`• ${resp}`, 9, 'normal');
        addSpace(1);
      });

      if (index < resumeData.workExperience.length - 1) addSpace(3);
    });

    addSpace(4);
    addLine();
  }

  // Projects
  if (resumeData.projects.length > 0) {
    addSpace(2);
    addText('PROJECTS', 12, 'bold', [0, 51, 102]);
    addSpace(2);

    resumeData.projects.forEach((project, index) => {
      addText(project.name, 11, 'bold');
      addSpace(1);
      if (project.technologies.length > 0) {
        addText(`Technologies: ${project.technologies.join(', ')}`, 9, 'normal', [80, 80, 80]);
        addSpace(1);
      }
      addText(project.description, 9, 'normal');
      addSpace(1);

      project.highlights.forEach(highlight => {
        addText(`• ${highlight}`, 9, 'normal');
        addSpace(1);
      });

      if (project.link) {
        addText(`Link: ${project.link}`, 9, 'normal', [0, 102, 204]);
        addSpace(1);
      }

      if (index < resumeData.projects.length - 1) addSpace(3);
    });

    addSpace(4);
    addLine();
  }

  // Skills
  if (resumeData.skills.length > 0) {
    addSpace(2);
    addText('SKILLS', 12, 'bold', [0, 51, 102]);
    addSpace(2);

    resumeData.skills.forEach(skillCategory => {
      addText(`${skillCategory.category}:`, 10, 'bold');
      addSpace(1);
      addText(skillCategory.items.join(', '), 9, 'normal');
      addSpace(2);
    });

    addSpace(2);
    addLine();
  }

  // Certifications
  if (resumeData.certifications.length > 0) {
    addSpace(2);
    addText('CERTIFICATIONS', 12, 'bold', [0, 51, 102]);
    addSpace(2);

    resumeData.certifications.forEach(cert => {
      addText(cert.name, 10, 'bold');
      addSpace(1);
      addText(`${cert.issuer} | ${formatDate(cert.date)}`, 9, 'normal');
      if (cert.credentialId) {
        addSpace(1);
        addText(`Credential ID: ${cert.credentialId}`, 9, 'normal', [80, 80, 80]);
      }
      addSpace(2);
    });

    addSpace(2);
    addLine();
  }

  // Achievements
  if (resumeData.achievements.length > 0) {
    addSpace(2);
    addText('ACHIEVEMENTS', 12, 'bold', [0, 51, 102]);
    addSpace(2);

    resumeData.achievements.forEach(achievement => {
      addText(`${achievement.title} (${formatDate(achievement.date)})`, 10, 'bold');
      addSpace(1);
      addText(achievement.description, 9, 'normal');
      addSpace(2);
    });
  }

  // Save the PDF
  doc.save(`${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`);
}
