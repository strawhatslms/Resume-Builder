import React from 'react';
import { ResumeData } from '@/types/resume';
import { formatDate } from '@/lib/utils';

interface TemplateProps {
  data: ResumeData;
}

export function ModernTemplate({ data }: TemplateProps) {
  const { personalInfo, education, workExperience, projects, skills, certifications, achievements } = data;

  return (
    <div className="bg-white p-8 shadow-sm" style={{ minHeight: '297mm' }}>
      {/* Header with Blue Accent */}
      <div className="border-b-4 border-blue-600 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>•</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>•</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
        <div className="flex flex-wrap gap-3 text-sm text-blue-600 mt-1">
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.github && <span>•</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
          {personalInfo.portfolio && <span>•</span>}
          {personalInfo.portfolio && <span>{personalInfo.portfolio}</span>}
        </div>
      </div>

      {personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-800 mb-2 uppercase tracking-wide">Summary</h2>
          <p className="text-gray-700 text-sm leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {workExperience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-800 mb-3 uppercase tracking-wide">Experience</h2>
          {workExperience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                  <p className="text-sm text-gray-700">{exp.company} | {exp.location}</p>
                </div>
                <span className="text-sm text-gray-600">
                  {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                </span>
              </div>
              <ul className="mt-2 space-y-1">
                {exp.responsibilities.map((resp, idx) => (
                  <li key={idx} className="text-sm text-gray-700">• {resp}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-800 mb-3 uppercase tracking-wide">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{edu.institution}</h3>
                  <p className="text-sm text-gray-700">{edu.degree} in {edu.field}</p>
                  {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                </div>
                <span className="text-sm text-gray-600">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-800 mb-3 uppercase tracking-wide">Projects</h2>
          {projects.map((project) => (
            <div key={project.id} className="mb-3">
              <h3 className="font-semibold text-gray-900">{project.name}</h3>
              {project.technologies.length > 0 && (
                <p className="text-xs text-gray-600 mb-1">
                  <span className="font-medium">Technologies:</span> {project.technologies.join(', ')}
                </p>
              )}
              <p className="text-sm text-gray-700">{project.description}</p>
            </div>
          ))}
        </div>
      )}

      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-800 mb-3 uppercase tracking-wide">Skills</h2>
          {skills.map((skillCategory, idx) => (
            <div key={idx} className="mb-2">
              <span className="font-semibold text-gray-900 text-sm">{skillCategory.category}: </span>
              <span className="text-sm text-gray-700">{skillCategory.items.join(', ')}</span>
            </div>
          ))}
        </div>
      )}

      {certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-800 mb-3 uppercase tracking-wide">Certifications</h2>
          {certifications.map((cert) => (
            <div key={cert.id} className="mb-2">
              <h3 className="font-semibold text-gray-900 text-sm">{cert.name}</h3>
              <p className="text-sm text-gray-700">{cert.issuer} | {formatDate(cert.date)}</p>
            </div>
          ))}
        </div>
      )}

      {achievements.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-800 mb-3 uppercase tracking-wide">Achievements</h2>
          {achievements.map((achievement) => (
            <div key={achievement.id} className="mb-2">
              <h3 className="font-semibold text-gray-900 text-sm">{achievement.title}</h3>
              <p className="text-sm text-gray-700">{achievement.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
