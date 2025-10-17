import React, { useMemo } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { analyzeATSScore } from '@/lib/atsAnalyzer';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export function ATSScoreCard() {
  const { resumeData } = useResumeStore();
  
  const atsScore = useMemo(() => {
    return analyzeATSScore(resumeData);
  }, [resumeData]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-50 border-green-200';
    if (score >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">ATS Score Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Score Display */}
        <div className={`p-6 border-2 rounded-lg text-center ${getScoreBgColor(atsScore.score)}`}>
          <div className={`text-5xl font-bold ${getScoreColor(atsScore.score)}`}>
            {atsScore.score}
          </div>
          <p className="text-sm text-gray-600 mt-2">out of 100</p>
          <p className="text-xs text-gray-500 mt-1">
            {atsScore.score >= 80 ? 'Excellent! Your resume is highly ATS-optimized.' :
             atsScore.score >= 60 ? 'Good, but there\'s room for improvement.' :
             'Needs improvement to pass ATS screening.'}
          </p>
        </div>

        {/* Strengths */}
        {atsScore.strengths.length > 0 && (
          <div>
            <h3 className="font-semibold text-green-700 mb-2 flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Strengths
            </h3>
            <ul className="space-y-1">
              {atsScore.strengths.map((strength, idx) => (
                <li key={idx} className="text-sm text-gray-700 flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  {strength}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Weaknesses */}
        {atsScore.weaknesses.length > 0 && (
          <div>
            <h3 className="font-semibold text-red-700 mb-2 flex items-center">
              <XCircle className="w-4 h-4 mr-2" />
              Weaknesses
            </h3>
            <ul className="space-y-1">
              {atsScore.weaknesses.map((weakness, idx) => (
                <li key={idx} className="text-sm text-gray-700 flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  {weakness}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Suggestions */}
        {atsScore.suggestions.length > 0 && (
          <div>
            <h3 className="font-semibold text-blue-700 mb-2 flex items-center">
              <AlertCircle className="w-4 h-4 mr-2" />
              Suggestions for Improvement
            </h3>
            <ul className="space-y-2">
              {atsScore.suggestions.map((suggestion, idx) => (
                <li key={idx} className="text-sm text-gray-700 flex items-start p-2 bg-blue-50 rounded">
                  <span className="text-blue-600 mr-2 flex-shrink-0">💡</span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
