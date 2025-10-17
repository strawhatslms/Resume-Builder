import React from 'react';
import { ResumeData } from '@/types/resume';
import { formatDate } from '@/lib/utils';

interface TemplateProps {
  data: ResumeData;
}

export function BoldTemplate({ data }: TemplateProps) {
  const { personalInfo, education, workExperience, projects, skills, certifications, achievements } = data;

  return (
    <div className="bg-white p-8 shadow-sm" style={{ minHeight: '297mm' }}>
      {/* Bold Header with Strong Visual Hierarchy */}
      <div className="bg-gradient-to-r from-red-700 to-orange-600 text-white p-6 -mx-8 -mt-8 mb-6">
        <h1 className="text-5xl font-black mb-3 tracking-tight">
          {personalInfo.fullName || 'YOUR NAME'}
        </h1>
        <div className="text-sm font-medium space-x-4">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>|</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>|</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
        {(personalInfo.linkedin || personalInfo.github || personalInfo.portfolio) && (
          <div className="text-sm font-medium mt-2 space-x-4 opacity-90">
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
          <div className="bg-red-700 text-white px-4 py-2 mb-3">
            <h2 className="text-xl font-black tracking-wide">SUMMARY</h2>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed font-medium">{personalInfo.summary}</p>
        </div>
      )}

      {workExperience.length > 0 && (
        <div className="mb-6">
          <div className="bg-red-700 text-white px-4 py-2 mb-3">
            <h2 className="text-xl font-black tracking-wide">EXPERIENCE</h2>
          </div>
          {workExperience.map((exp) => (
            <div key={exp.id} className="mb-5 border-l-4 border-orange-500 pl-4">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="font-black text-gray-900 text-lg">{exp.position}</h3>
                  <p className="text-sm font-bold text-orange-700">{exp.company} | {exp.location}</p>
                </div>
                <span className="text-sm font-bold text-gray-600 bg-gray-100 px-2 py-1">
                  {formatDate(exp.startDate)} – {exp.current ? 'PRESENT' : formatDate(exp.endDate)}
                </span>
              </div>
              <ul className="mt-2 space-y-1">
                {exp.responsibilities.map((resp, idx) => (
                  <li key={idx} className="text-sm text-gray-700 font-medium">▸ {resp}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {education.length > 0 && (
        <div className="mb-6">
          <div className="bg-red-700 text-white px-4 py-2 mb-3">
            <h2 className="text-xl font-black tracking-wide">EDUCATION</h2>
          </div>
          {education.map((edu) => (
            <div key={edu.id} className="mb-4 border-l-4 border-orange-500 pl-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-black text-gray-900">{edu.degree} IN {edu.field.toUpperCase()}</h3>
                  <p className="text-sm font-bold text-orange-700">{edu.institution}</p>
                  {edu.gpa && <p className="text-sm font-bold text-gray-600">GPA: {edu.gpa}</p>}
                </div>
                <span className="text-sm font-bold text-gray-600 bg-gray-100 px-2 py-1">
                  {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {skills.length > 0 && (
        <div className="mb-6">
          <div className="bg-red-700 text-white px-4 py-2 mb-3">
            <h2 className="text-xl font-black tracking-wide">SKILLS</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {skills.map((skillCategory, idx) => (
              <div key={idx} className="border-l-4 border-orange-500 pl-4">
                <h3 className="text-sm font-black text-gray-900 uppercase">{skillCategory.category}</h3>
                <p className="text-sm text-gray-700 font-medium">{skillCategory.items.join(' • ')}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {projects.length > 0 && (
        <div className="mb-6">
          <div className="bg-red-700 text-white px-4 py-2 mb-3">
            <h2 className="text-xl font-black tracking-wide">PROJECTS</h2>
          </div>
          {projects.map((project) => (
            <div key={project.id} className="mb-4 border-l-4 border-orange-500 pl-4">
              <h3 className="font-black text-gray-900 text-lg">{project.name}</h3>
              <p className="text-sm text-gray-700 font-medium mt-1">{project.description}</p>
              {project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="text-xs font-bold bg-orange-100 text-orange-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {certifications.length > 0 && (
        <div className="mb-6">
          <div className="bg-red-700 text-white px-4 py-2 mb-3">
            <h2 className="text-xl font-black tracking-wide">CERTIFICATIONS</h2>
          </div>
          {certifications.map((cert) => (
            <div key={cert.id} className="mb-2 border-l-4 border-orange-500 pl-4">
              <span className="text-sm font-black text-gray-900">{cert.name}</span>
              <span className="text-sm text-gray-600 font-medium"> — {cert.issuer}, {formatDate(cert.date)}</span>
            </div>
          ))}
        </div>
      )}

      {achievements.length > 0 && (
        <div className="mb-6">
          <div className="bg-red-700 text-white px-4 py-2 mb-3">
            <h2 className="text-xl font-black tracking-wide">ACHIEVEMENTS</h2>
          </div>
          {achievements.map((achievement) => (
            <div key={achievement.id} className="mb-3 border-l-4 border-orange-500 pl-4">
              <h3 className="font-black text-gray-900">{achievement.title}</h3>
              <p className="text-sm text-gray-700 font-medium">{achievement.description}</p>
              <span className="text-xs font-bold text-gray-500">{formatDate(achievement.date)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
