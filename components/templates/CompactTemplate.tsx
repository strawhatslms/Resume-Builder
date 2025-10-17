import React from 'react';
import { ResumeData } from '@/types/resume';
import { formatDate } from '@/lib/utils';

interface TemplateProps {
  data: ResumeData;
}

export function CompactTemplate({ data }: TemplateProps) {
  const { personalInfo, education, workExperience, projects, skills, certifications, achievements } = data;

  return (
    <div className="bg-white p-6 shadow-sm text-xs" style={{ minHeight: '297mm' }}>
      {/* Compact Header */}
      <div className="bg-teal-700 text-white p-4 -mx-6 -mt-6 mb-4">
        <h1 className="text-2xl font-bold mb-1">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-2 text-xs">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
        </div>
        {(personalInfo.linkedin || personalInfo.github || personalInfo.portfolio) && (
          <div className="flex flex-wrap gap-2 text-xs mt-1 opacity-90">
            {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
            {personalInfo.github && <span>• {personalInfo.github}</span>}
            {personalInfo.portfolio && <span>• {personalInfo.portfolio}</span>}
          </div>
        )}
      </div>

      {personalInfo.summary && (
        <div className="mb-4 pb-3 border-b border-gray-200">
          <p className="text-gray-700 leading-snug">{personalInfo.summary}</p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        {/* Left Column */}
        <div className="col-span-2 space-y-4">
          {workExperience.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-teal-700 mb-2 uppercase">Experience</h2>
              {workExperience.map((exp) => (
                <div key={exp.id} className="mb-3">
                  <div className="flex justify-between">
                    <h3 className="font-bold text-gray-900 text-xs">{exp.position}</h3>
                    <span className="text-xs text-gray-500">
                      {formatDate(exp.startDate)} – {exp.current ? 'Now' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p className="text-xs text-teal-700">{exp.company}, {exp.location}</p>
                  <ul className="mt-1 space-y-0.5">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx} className="text-xs text-gray-700 pl-2">• {resp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {projects.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-teal-700 mb-2 uppercase">Projects</h2>
              {projects.map((project) => (
                <div key={project.id} className="mb-2">
                  <h3 className="font-bold text-gray-900 text-xs">{project.name}</h3>
                  <p className="text-xs text-gray-700">{project.description}</p>
                  {project.technologies.length > 0 && (
                    <p className="text-xs text-teal-600 mt-0.5">{project.technologies.join(', ')}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {education.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-teal-700 mb-2 uppercase">Education</h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-2">
                  <h3 className="font-bold text-gray-900 text-xs">{edu.degree}</h3>
                  <p className="text-xs text-gray-700">{edu.field}</p>
                  <p className="text-xs text-gray-600">{edu.institution}</p>
                  <span className="text-xs text-gray-500">
                    {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                  </span>
                  {edu.gpa && <p className="text-xs text-gray-600">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          )}

          {skills.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-teal-700 mb-2 uppercase">Skills</h2>
              <div className="space-y-2">
                {skills.map((skillCategory, idx) => (
                  <div key={idx}>
                    <h3 className="font-bold text-gray-900 text-xs">{skillCategory.category}</h3>
                    <p className="text-xs text-gray-700">{skillCategory.items.join(', ')}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {certifications.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-teal-700 mb-2 uppercase">Certifications</h2>
              {certifications.map((cert) => (
                <div key={cert.id} className="mb-2">
                  <p className="font-bold text-gray-900 text-xs">{cert.name}</p>
                  <p className="text-xs text-gray-600">{cert.issuer}</p>
                  <span className="text-xs text-gray-500">{formatDate(cert.date)}</span>
                </div>
              ))}
            </div>
          )}

          {achievements.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-teal-700 mb-2 uppercase">Achievements</h2>
              {achievements.map((achievement) => (
                <div key={achievement.id} className="mb-2">
                  <p className="font-bold text-gray-900 text-xs">{achievement.title}</p>
                  <p className="text-xs text-gray-700">{achievement.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
