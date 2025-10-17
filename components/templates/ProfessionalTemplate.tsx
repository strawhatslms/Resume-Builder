import React from 'react';
import { ResumeData } from '@/types/resume';
import { formatDate } from '@/lib/utils';

interface TemplateProps {
  data: ResumeData;
}

export function ProfessionalTemplate({ data }: TemplateProps) {
  const { personalInfo, education, workExperience, projects, skills, certifications, achievements } = data;

  return (
    <div className="bg-white p-8 shadow-sm" style={{ minHeight: '297mm' }}>
      {/* Professional Header with Gray Accent */}
      <div className="bg-gray-800 text-white p-6 -m-8 mb-6">
        <h1 className="text-3xl font-bold mb-2">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="text-sm text-gray-300">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span> | {personalInfo.phone}</span>}
          {personalInfo.location && <span> | {personalInfo.location}</span>}
        </div>
        {(personalInfo.linkedin || personalInfo.github || personalInfo.portfolio) && (
          <div className="text-sm text-gray-400 mt-1">
            {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
            {personalInfo.github && <span> | {personalInfo.github}</span>}
            {personalInfo.portfolio && <span> | {personalInfo.portfolio}</span>}
          </div>
        )}
      </div>

      {personalInfo.summary && (
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <div className="w-2 h-6 bg-gray-800 mr-3"></div>
            <h2 className="text-xl font-bold text-gray-900">PROFILE</h2>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed ml-5">{personalInfo.summary}</p>
        </div>
      )}

      {workExperience.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <div className="w-2 h-6 bg-gray-800 mr-3"></div>
            <h2 className="text-xl font-bold text-gray-900">EXPERIENCE</h2>
          </div>
          <div className="ml-5">
            {workExperience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{exp.position}</h3>
                    <p className="text-sm text-gray-700">{exp.company}, {exp.location}</p>
                  </div>
                  <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded">
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
        </div>
      )}

      {education.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <div className="w-2 h-6 bg-gray-800 mr-3"></div>
            <h2 className="text-xl font-bold text-gray-900">EDUCATION</h2>
          </div>
          <div className="ml-5">
            {education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                    <p className="text-sm text-gray-700">{edu.institution}</p>
                    {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                  </div>
                  <span className="text-sm text-gray-600">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {skills.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <div className="w-2 h-6 bg-gray-800 mr-3"></div>
            <h2 className="text-xl font-bold text-gray-900">SKILLS</h2>
          </div>
          <div className="ml-5">
            {skills.map((skillCategory, idx) => (
              <div key={idx} className="mb-2">
                <span className="font-bold text-gray-900 text-sm">{skillCategory.category}: </span>
                <span className="text-sm text-gray-700">{skillCategory.items.join(', ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {projects.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <div className="w-2 h-6 bg-gray-800 mr-3"></div>
            <h2 className="text-xl font-bold text-gray-900">PROJECTS</h2>
          </div>
          <div className="ml-5">
            {projects.map((project) => (
              <div key={project.id} className="mb-3">
                <h3 className="font-bold text-gray-900">{project.name}</h3>
                <p className="text-sm text-gray-700">{project.description}</p>
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {certifications.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <div className="w-2 h-6 bg-gray-800 mr-3"></div>
            <h2 className="text-xl font-bold text-gray-900">CERTIFICATIONS</h2>
          </div>
          <div className="ml-5">
            {certifications.map((cert) => (
              <div key={cert.id} className="mb-2">
                <h3 className="font-bold text-gray-900 text-sm">{cert.name}</h3>
                <p className="text-sm text-gray-700">{cert.issuer} • {formatDate(cert.date)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
