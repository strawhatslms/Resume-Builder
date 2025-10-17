import React from 'react';
import { ResumeData } from '@/types/resume';
import { formatDate } from '@/lib/utils';

interface TemplateProps {
  data: ResumeData;
}

export function ExecutiveTemplate({ data }: TemplateProps) {
  const { personalInfo, education, workExperience, projects, skills, certifications, achievements } = data;

  return (
    <div className="bg-white p-8 shadow-sm" style={{ minHeight: '297mm' }}>
      {/* Executive Header */}
      <div className="border-b-4 border-indigo-900 pb-4 mb-6">
        <h1 className="text-4xl font-bold text-indigo-900 mb-1">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="text-sm text-gray-600 mt-2">
          {personalInfo.email} | {personalInfo.phone} | {personalInfo.location}
        </div>
        {(personalInfo.linkedin || personalInfo.portfolio) && (
          <div className="text-sm text-indigo-700 mt-1">
            {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
            {personalInfo.portfolio && <span> | {personalInfo.portfolio}</span>}
          </div>
        )}
      </div>

      {personalInfo.summary && (
        <div className="mb-6 bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-900">
          <h2 className="text-lg font-bold text-indigo-900 mb-2">EXECUTIVE SUMMARY</h2>
          <p className="text-gray-700 text-sm leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {workExperience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-indigo-900 mb-4 uppercase tracking-wide border-b-2 border-indigo-900 pb-2">
            Professional Experience
          </h2>
          {workExperience.map((exp) => (
            <div key={exp.id} className="mb-5">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{exp.position}</h3>
                  <p className="text-base text-indigo-700 font-semibold">{exp.company}</p>
                  <p className="text-sm text-gray-600">{exp.location}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-gray-700">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
              </div>
              <ul className="space-y-2">
                {exp.responsibilities.map((resp, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-start">
                    <span className="text-indigo-900 mr-2 font-bold">►</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-indigo-900 mb-4 uppercase tracking-wide border-b-2 border-indigo-900 pb-2">
            Core Competencies
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {skills.map((skillCategory, idx) => (
              <div key={idx}>
                <h3 className="font-bold text-indigo-700 text-sm mb-2">{skillCategory.category}</h3>
                <p className="text-sm text-gray-700">{skillCategory.items.join(' • ')}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-indigo-900 mb-4 uppercase tracking-wide border-b-2 border-indigo-900 pb-2">
            Education
          </h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                  <p className="text-sm text-indigo-700 font-semibold">{edu.institution}</p>
                  {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                </div>
                <span className="text-sm text-gray-600 font-semibold">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-indigo-900 mb-4 uppercase tracking-wide border-b-2 border-indigo-900 pb-2">
            Key Projects
          </h2>
          {projects.map((project) => (
            <div key={project.id} className="mb-4">
              <h3 className="font-bold text-gray-900">{project.name}</h3>
              <p className="text-sm text-gray-700 mt-1">{project.description}</p>
              {project.technologies.length > 0 && (
                <p className="text-xs text-indigo-700 mt-1 font-semibold">
                  Technologies: {project.technologies.join(' | ')}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-indigo-900 mb-4 uppercase tracking-wide border-b-2 border-indigo-900 pb-2">
            Professional Certifications
          </h2>
          {certifications.map((cert) => (
            <div key={cert.id} className="mb-2">
              <h3 className="font-bold text-gray-900 text-sm">{cert.name}</h3>
              <p className="text-sm text-gray-700">{cert.issuer} • {formatDate(cert.date)}</p>
            </div>
          ))}
        </div>
      )}

      {achievements.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-indigo-900 mb-4 uppercase tracking-wide border-b-2 border-indigo-900 pb-2">
            Key Achievements
          </h2>
          {achievements.map((achievement) => (
            <div key={achievement.id} className="mb-3">
              <h3 className="font-bold text-gray-900 text-sm">{achievement.title}</h3>
              <p className="text-sm text-gray-700">{achievement.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
