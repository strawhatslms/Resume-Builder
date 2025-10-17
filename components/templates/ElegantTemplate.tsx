import React from 'react';
import { ResumeData } from '@/types/resume';
import { formatDate } from '@/lib/utils';

interface TemplateProps {
  data: ResumeData;
}

export function ElegantTemplate({ data }: TemplateProps) {
  const { personalInfo, education, workExperience, projects, skills, certifications, achievements } = data;

  return (
    <div className="bg-white p-8 shadow-sm" style={{ minHeight: '297mm' }}>
      {/* Elegant Header with Serif Font */}
      <div className="text-center border-b-2 border-amber-700 pb-6 mb-6">
        <h1 className="text-4xl font-serif font-bold text-amber-900 mb-3">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="text-sm text-gray-600 space-x-3">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>|</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>|</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
        {(personalInfo.linkedin || personalInfo.github || personalInfo.portfolio) && (
          <div className="text-sm text-amber-700 mt-2 space-x-3">
            {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
            {personalInfo.github && <span>|</span>}
            {personalInfo.github && <span>{personalInfo.github}</span>}
            {personalInfo.portfolio && <span>|</span>}
            {personalInfo.portfolio && <span>{personalInfo.portfolio}</span>}
          </div>
        )}
      </div>

      {personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-serif font-bold text-amber-900 mb-3 text-center">Professional Summary</h2>
          <p className="text-gray-700 text-sm leading-relaxed text-center italic px-8">{personalInfo.summary}</p>
        </div>
      )}

      {workExperience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-serif font-bold text-amber-900 mb-4 border-b border-amber-300 pb-2">Professional Experience</h2>
          {workExperience.map((exp) => (
            <div key={exp.id} className="mb-5">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{exp.position}</h3>
                  <p className="text-sm text-amber-800 italic">{exp.company} • {exp.location}</p>
                </div>
                <span className="text-sm text-gray-600 font-serif">
                  {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                </span>
              </div>
              <ul className="mt-2 space-y-1">
                {exp.responsibilities.map((resp, idx) => (
                  <li key={idx} className="text-sm text-gray-700 pl-4">• {resp}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-serif font-bold text-amber-900 mb-4 border-b border-amber-300 pb-2">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                  <p className="text-sm text-amber-800 italic">{edu.institution}</p>
                  {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                </div>
                <span className="text-sm text-gray-600 font-serif">
                  {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-serif font-bold text-amber-900 mb-4 border-b border-amber-300 pb-2">Skills & Expertise</h2>
          <div className="grid grid-cols-1 gap-3">
            {skills.map((skillCategory, idx) => (
              <div key={idx}>
                <span className="text-sm font-bold text-amber-800">{skillCategory.category}:</span>
                <span className="text-sm text-gray-700 ml-2">{skillCategory.items.join(', ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-serif font-bold text-amber-900 mb-4 border-b border-amber-300 pb-2">Notable Projects</h2>
          {projects.map((project) => (
            <div key={project.id} className="mb-4">
              <h3 className="font-bold text-gray-900">{project.name}</h3>
              <p className="text-sm text-gray-700 mt-1">{project.description}</p>
              {project.technologies.length > 0 && (
                <p className="text-xs text-amber-700 mt-1 italic">Technologies: {project.technologies.join(', ')}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-serif font-bold text-amber-900 mb-4 border-b border-amber-300 pb-2">Certifications</h2>
          {certifications.map((cert) => (
            <div key={cert.id} className="mb-2">
              <span className="text-sm font-bold text-gray-900">{cert.name}</span>
              <span className="text-sm text-gray-600"> — {cert.issuer}, {formatDate(cert.date)}</span>
            </div>
          ))}
        </div>
      )}

      {achievements.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-serif font-bold text-amber-900 mb-4 border-b border-amber-300 pb-2">Achievements</h2>
          {achievements.map((achievement) => (
            <div key={achievement.id} className="mb-3">
              <h3 className="font-bold text-gray-900">{achievement.title}</h3>
              <p className="text-sm text-gray-700">{achievement.description}</p>
              <span className="text-xs text-gray-500 font-serif">{formatDate(achievement.date)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
