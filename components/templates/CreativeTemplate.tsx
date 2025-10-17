import React from 'react';
import { ResumeData } from '@/types/resume';
import { formatDate } from '@/lib/utils';

interface TemplateProps {
  data: ResumeData;
}

export function CreativeTemplate({ data }: TemplateProps) {
  const { personalInfo, education, workExperience, projects, skills, certifications } = data;

  return (
    <div className="bg-white p-8 shadow-sm" style={{ minHeight: '297mm' }}>
      {/* Creative Header with Gradient */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 -m-8 mb-6 rounded-b-3xl">
        <h1 className="text-3xl font-bold mb-2">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="text-sm">
          {personalInfo.email} • {personalInfo.phone} • {personalInfo.location}
        </div>
        {(personalInfo.linkedin || personalInfo.github) && (
          <div className="text-sm mt-1 opacity-90">
            {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
            {personalInfo.github && <span> • {personalInfo.github}</span>}
          </div>
        )}
      </div>

      {personalInfo.summary && (
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <div className="w-1 h-8 bg-gradient-to-b from-purple-600 to-pink-600 mr-3 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900">About Me</h2>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed ml-4">{personalInfo.summary}</p>
        </div>
      )}

      {workExperience.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <div className="w-1 h-8 bg-gradient-to-b from-purple-600 to-pink-600 mr-3 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900">Experience</h2>
          </div>
          <div className="ml-4 space-y-4">
            {workExperience.map((exp) => (
              <div key={exp.id} className="border-l-2 border-purple-200 pl-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{exp.position}</h3>
                    <p className="text-sm text-purple-600 font-medium">{exp.company}</p>
                    <p className="text-xs text-gray-600">{exp.location}</p>
                  </div>
                  <span className="text-xs text-gray-600 bg-purple-50 px-3 py-1 rounded-full">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                <ul className="mt-2 space-y-1">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="text-sm text-gray-700">▸ {resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {skills.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <div className="w-1 h-8 bg-gradient-to-b from-purple-600 to-pink-600 mr-3 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900">Skills</h2>
          </div>
          <div className="ml-4 space-y-3">
            {skills.map((skillCategory, idx) => (
              <div key={idx}>
                <h3 className="font-semibold text-purple-600 text-sm mb-1">{skillCategory.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillCategory.items.map((skill, skillIdx) => (
                    <span key={skillIdx} className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {education.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <div className="w-1 h-8 bg-gradient-to-b from-purple-600 to-pink-600 mr-3 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900">Education</h2>
          </div>
          <div className="ml-4">
            {education.map((edu) => (
              <div key={edu.id} className="mb-3 border-l-2 border-purple-200 pl-4">
                <h3 className="font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                <p className="text-sm text-purple-600">{edu.institution}</p>
                <p className="text-xs text-gray-600">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  {edu.gpa && <span> • GPA: {edu.gpa}</span>}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {projects.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <div className="w-1 h-8 bg-gradient-to-b from-purple-600 to-pink-600 mr-3 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
          </div>
          <div className="ml-4 space-y-3">
            {projects.map((project) => (
              <div key={project.id} className="border-l-2 border-purple-200 pl-4">
                <h3 className="font-bold text-gray-900">{project.name}</h3>
                <p className="text-sm text-gray-700 mt-1">{project.description}</p>
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="bg-pink-50 text-pink-700 px-2 py-0.5 rounded text-xs">
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
            <div className="w-1 h-8 bg-gradient-to-b from-purple-600 to-pink-600 mr-3 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900">Certifications</h2>
          </div>
          <div className="ml-4">
            {certifications.map((cert) => (
              <div key={cert.id} className="mb-2">
                <h3 className="font-semibold text-gray-900 text-sm">{cert.name}</h3>
                <p className="text-sm text-gray-700">{cert.issuer} • {formatDate(cert.date)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
