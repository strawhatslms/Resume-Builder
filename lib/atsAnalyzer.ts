import { ResumeData, ATSScore } from '@/types/resume';

export function analyzeATSScore(resumeData: ResumeData): ATSScore {
  let score = 0;
  const suggestions: string[] = [];
  const strengths: string[] = [];
  const weaknesses: string[] = [];

  // Personal Info Analysis (20 points)
  if (resumeData.personalInfo.fullName) {
    score += 5;
    strengths.push('Contact name provided');
  } else {
    weaknesses.push('Missing full name');
    suggestions.push('Add your full name');
  }

  if (resumeData.personalInfo.email && resumeData.personalInfo.email.includes('@')) {
    score += 5;
    strengths.push('Valid email address');
  } else {
    weaknesses.push('Missing or invalid email');
    suggestions.push('Add a valid email address');
  }

  if (resumeData.personalInfo.phone) {
    score += 5;
    strengths.push('Phone number provided');
  } else {
    weaknesses.push('Missing phone number');
    suggestions.push('Add your phone number');
  }

  if (resumeData.personalInfo.location) {
    score += 5;
    strengths.push('Location specified');
  } else {
    suggestions.push('Add your location for better local job matching');
  }

  // Summary Analysis (10 points)
  if (resumeData.personalInfo.summary) {
    const wordCount = resumeData.personalInfo.summary.split(' ').length;
    if (wordCount >= 30 && wordCount <= 100) {
      score += 10;
      strengths.push('Well-crafted professional summary');
    } else if (wordCount > 0) {
      score += 5;
      suggestions.push('Professional summary should be 30-100 words for optimal ATS parsing');
    }
  } else {
    weaknesses.push('Missing professional summary');
    suggestions.push('Add a professional summary (30-100 words) highlighting your key qualifications');
  }

  // Education Analysis (15 points)
  if (resumeData.education.length > 0) {
    score += 10;
    strengths.push(`${resumeData.education.length} education ${resumeData.education.length > 1 ? 'entries' : 'entry'} listed`);
    
    const hasCompleteInfo = resumeData.education.every(
      edu => edu.institution && edu.degree && edu.field
    );
    if (hasCompleteInfo) {
      score += 5;
      strengths.push('Complete education information');
    } else {
      suggestions.push('Ensure all education entries have institution, degree, and field of study');
    }
  } else {
    weaknesses.push('No education listed');
    suggestions.push('Add at least one education entry');
  }

  // Work Experience Analysis (25 points)
  if (resumeData.workExperience.length > 0) {
    score += 15;
    strengths.push(`${resumeData.workExperience.length} work experience ${resumeData.workExperience.length > 1 ? 'entries' : 'entry'}`);
    
    const avgResponsibilities = resumeData.workExperience.reduce(
      (acc, exp) => acc + exp.responsibilities.length, 0
    ) / resumeData.workExperience.length;

    if (avgResponsibilities >= 3) {
      score += 10;
      strengths.push('Detailed work responsibilities');
    } else {
      score += 5;
      suggestions.push('Add 3-5 bullet points for each work experience to showcase achievements');
    }

    // Check for action verbs
    const actionVerbs = ['led', 'managed', 'developed', 'created', 'improved', 'increased', 'reduced', 'achieved', 'implemented', 'designed'];
    const hasActionVerbs = resumeData.workExperience.some(exp =>
      exp.responsibilities.some(resp =>
        actionVerbs.some(verb => resp.toLowerCase().includes(verb))
      )
    );

    if (hasActionVerbs) {
      strengths.push('Uses strong action verbs');
    } else {
      suggestions.push('Use action verbs (led, managed, developed, etc.) to strengthen your bullet points');
    }
  } else {
    weaknesses.push('No work experience listed');
    suggestions.push('Add work experience with 3-5 achievement-focused bullet points each');
  }

  // Skills Analysis (15 points)
  if (resumeData.skills.length > 0) {
    const totalSkills = resumeData.skills.reduce((acc, cat) => acc + cat.items.length, 0);
    
    if (totalSkills >= 8) {
      score += 15;
      strengths.push(`${totalSkills} skills listed across ${resumeData.skills.length} categories`);
    } else if (totalSkills >= 4) {
      score += 10;
      suggestions.push('Add more relevant skills (aim for 8-15 total)');
    } else {
      score += 5;
      weaknesses.push('Limited skills listed');
      suggestions.push('Add 8-15 relevant technical and soft skills');
    }
  } else {
    weaknesses.push('No skills listed');
    suggestions.push('Add a skills section with relevant technical and soft skills');
  }

  // Projects Analysis (10 points)
  if (resumeData.projects.length > 0) {
    score += 5;
    strengths.push(`${resumeData.projects.length} project${resumeData.projects.length > 1 ? 's' : ''} showcased`);
    
    const hasDetails = resumeData.projects.every(
      proj => proj.description && proj.technologies.length > 0
    );
    if (hasDetails) {
      score += 5;
      strengths.push('Projects include descriptions and technologies');
    } else {
      suggestions.push('Add descriptions and technologies used for all projects');
    }
  } else {
    suggestions.push('Consider adding 2-3 relevant projects to showcase your skills');
  }

  // Certifications Analysis (5 points)
  if (resumeData.certifications.length > 0) {
    score += 5;
    strengths.push(`${resumeData.certifications.length} certification${resumeData.certifications.length > 1 ? 's' : ''} listed`);
  } else {
    suggestions.push('Add relevant certifications if you have any');
  }

  // Calculate final score (out of 100)
  const finalScore = Math.min(100, Math.round(score));

  return {
    score: finalScore,
    suggestions,
    strengths,
    weaknesses,
  };
}
