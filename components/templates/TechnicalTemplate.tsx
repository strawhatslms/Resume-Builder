import React from 'react';
import { ResumeData } from '@/types/resume';
import { formatDate } from '@/lib/utils';

interface TemplateProps {
  data: ResumeData;
}

export function TechnicalTemplate({ data }: TemplateProps) {
  const { personalInfo, education, workExperience, projects, skills, certifications, achievements } = data;

  return (
    <div className="bg-white p-8 shadow-sm font-mono" style={{ minHeight: '297mm' }}>
      {/* Technical Header */}
      <div className="border-2 border-green-600 p-4 mb-6 bg-gray-50">
        <div className="flex items-start">
          <span className="text-green-600 mr-2">$</span>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <div className="text-xs text-gray-600 mt-1">
              <span className="text-green-600">email:</span> {personalInfo.email} |{' '}
              <span className="text-green-600">phone:</span> {personalInfo.phone} |{' '}
              <span className="text-green-600">location:</span> {personalInfo.location}
            </div>
            {(personalInfo.github || personalInfo.linkedin) && (
              <div className="text-xs text-gray-600 mt-1">
                {personalInfo.github && (
                  <span><span className="text-green-600">github:</span> {personalInfo.github} </span>
                )}
                {personalInfo.linkedin && (
                  <span><span className="text-green-600">linkedin:</span> {personalInfo.linkedin}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {personalInfo.summary && (
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <span className="text-green-600 mr-2">#</span>
            <h2 className="text-sm font-bold text-gray-900 uppercase">README.md</h2>
          </div>
          <div className="bg-gray-50 p-3 border-l-4 border-green-600">
            <p className="text-xs text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </div>
        </div>
      )}

      {skills.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <span className="text-green-600 mr-2">#</span>
            <h2 className="text-sm font-bold text-gray-900 uppercase">Tech Stack</h2>
          </div>
          <div className="bg-gray-50 p-3 border-l-4 border-green-600">
            {skills.map((skillCategory, idx) => (
              <div key={idx} className="mb-2">
                <span className="text-green-600 text-xs">const</span>{' '}
                <span className="text-xs font-bold text-gray-900">{skillCategory.category}</span>{' '}
                <span className="text-green-600 text-xs">= [</span>
                <div className="ml-4 text-xs text-gray-700">
                  {skillCategory.items.map((item, itemIdx) => (
                    <span key={itemIdx}>
                      '{item}'{itemIdx < skillCategory.items.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </div>
                <span className="text-green-600 text-xs">];</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {workExperience.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <span className="text-green-600 mr-2">#</span>
            <h2 className="text-sm font-bold text-gray-900 uppercase">Work Experience</h2>
          </div>
          {workExperience.map((exp, index) => (
            <div key={exp.id} className="mb-4 bg-gray-50 p-3 border-l-4 border-green-600">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="text-xs">
                    <span className="text-green-600">function </span>
                    <span className="font-bold text-gray-900">{exp.position.replace(/\s+/g, '')}()</span>
                  </div>
                  <div className="text-xs text-gray-700 mt-1">
                    <span className="text-green-600">// </span>
                    {exp.company}, {exp.location}
                  </div>
                </div>
                <span className="text-xs text-gray-600">
                  {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                </span>
              </div>
              <div className="ml-2">
                {exp.responsibilities.map((resp, idx) => (
                  <div key={idx} className="text-xs text-gray-700 mb-1">
                    <span className="text-green-600">→</span> {resp}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {projects.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <span className="text-green-600 mr-2">#</span>
            <h2 className="text-sm font-bold text-gray-900 uppercase">Projects</h2>
          </div>
          {projects.map((project) => (
            <div key={project.id} className="mb-3 bg-gray-50 p-3 border-l-4 border-green-600">
              <div className="text-xs">
                <span className="text-green-600">class </span>
                <span className="font-bold text-gray-900">{project.name.replace(/\s+/g, '')}</span>
              </div>
              <p className="text-xs text-gray-700 mt-1 ml-2">{project.description}</p>
              {project.technologies.length > 0 && (
                <div className="text-xs text-gray-600 mt-2 ml-2">
                  <span className="text-green-600">dependencies:</span> [{project.technologies.map(t => `"${t}"`).join(', ')}]
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {education.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <span className="text-green-600 mr-2">#</span>
            <h2 className="text-sm font-bold text-gray-900 uppercase">Education</h2>
          </div>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3 bg-gray-50 p-3 border-l-4 border-green-600">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xs font-bold text-gray-900">{edu.degree} in {edu.field}</div>
                  <div className="text-xs text-gray-700 mt-1">
                    <span className="text-green-600">// </span>{edu.institution}
                  </div>
                  {edu.gpa && (
                    <div className="text-xs text-gray-600 mt-1">
                      <span className="text-green-600">gpa:</span> {edu.gpa}
                    </div>
                  )}
                </div>
                <span className="text-xs text-gray-600">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {certifications.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <span className="text-green-600 mr-2">#</span>
            <h2 className="text-sm font-bold text-gray-900 uppercase">Certifications</h2>
          </div>
          <div className="bg-gray-50 p-3 border-l-4 border-green-600">
            {certifications.map((cert) => (
              <div key={cert.id} className="mb-2 text-xs">
                <span className="text-green-600">✓</span>{' '}
                <span className="font-bold text-gray-900">{cert.name}</span>{' '}
                <span className="text-gray-700">- {cert.issuer}, {formatDate(cert.date)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
