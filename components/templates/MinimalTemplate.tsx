import React from 'react';
import { ResumeData } from '@/types/resume';
import { formatDate } from '@/lib/utils';

interface TemplateProps {
  data: ResumeData;
}

export function MinimalTemplate({ data }: TemplateProps) {
  const { personalInfo, education, workExperience, projects, skills, certifications, achievements } = data;

  return (
    <div className="bg-white p-8 shadow-sm" style={{ minHeight: '297mm' }}>
      {/* Minimal Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-light text-gray-900 mb-3">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="text-sm text-gray-600 space-y-1">
          <div>
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span> • {personalInfo.phone}</span>}
            {personalInfo.location && <span> • {personalInfo.location}</span>}
          </div>
          {(personalInfo.linkedin || personalInfo.github || personalInfo.portfolio) && (
            <div>
              {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
              {personalInfo.github && <span> • {personalInfo.github}</span>}
              {personalInfo.portfolio && <span> • {personalInfo.portfolio}</span>}
            </div>
          )}
        </div>
      </div>

      {personalInfo.summary && (
        <div className="mb-8">
          <p className="text-gray-700 text-sm leading-relaxed italic border-l-2 border-gray-300 pl-4">
            {personalInfo.summary}
          </p>
        </div>
      )}

      {workExperience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Experience</h2>
          {workExperience.map((exp) => (
            <div key={exp.id} className="mb-5">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                <span className="text-xs text-gray-500">
                  {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{exp.company}, {exp.location}</p>
              <ul className="space-y-1">
                {exp.responsibilities.map((resp, idx) => (
                  <li key={idx} className="text-sm text-gray-700 pl-4">– {resp}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-semibold text-gray-900">{edu.degree} in {edu.field}</h3>
                  <p className="text-sm text-gray-600">{edu.institution}</p>
                </div>
                <span className="text-xs text-gray-500">
                  {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Skills</h2>
          <div className="space-y-2">
            {skills.map((skillCategory, idx) => (
              <div key={idx}>
                <span className="text-sm font-medium text-gray-700">{skillCategory.category}</span>
                <p className="text-sm text-gray-600">{skillCategory.items.join(' • ')}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Projects</h2>
          {projects.map((project) => (
            <div key={project.id} className="mb-4">
              <h3 className="font-semibold text-gray-900">{project.name}</h3>
              <p className="text-sm text-gray-700 mt-1">{project.description}</p>
              {project.technologies.length > 0 && (
                <p className="text-xs text-gray-500 mt-1">{project.technologies.join(' • ')}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {certifications.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Certifications</h2>
          {certifications.map((cert) => (
            <div key={cert.id} className="mb-2">
              <span className="text-sm font-medium text-gray-900">{cert.name}</span>
              <span className="text-sm text-gray-600"> — {cert.issuer}, {formatDate(cert.date)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
