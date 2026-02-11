import { useState } from 'react';
import { ResumeData } from './ResumeBuilder';
import { CheckCircle, AlertCircle, XCircle, TrendingUp, FileSearch } from 'lucide-react';

interface ATSScoreCheckerProps {
  resumeData: ResumeData;
  onClose: () => void;
}

interface ScoreItem {
  category: string;
  score: number;
  maxScore: number;
  status: 'good' | 'warning' | 'error';
  feedback: string;
  tips: string[];
}

export function ATSScoreChecker({ resumeData, onClose }: ATSScoreCheckerProps) {
  const [scores, setScores] = useState<ScoreItem[]>([]);
  const [overallScore, setOverallScore] = useState(0);
  const [analyzed, setAnalyzed] = useState(false);

  const analyzeResume = () => {
    const results: ScoreItem[] = [];

    // Contact Information Check
    const contactScore = {
      category: 'Contact Information',
      score: 0,
      maxScore: 15,
      status: 'error' as const,
      feedback: '',
      tips: [] as string[],
    };

    let contactPoints = 0;
    if (resumeData.contact.fullName) contactPoints += 5;
    if (resumeData.contact.email) contactPoints += 5;
    if (resumeData.contact.phone) contactPoints += 3;
    if (resumeData.contact.location) contactPoints += 2;

    contactScore.score = contactPoints;
    if (contactPoints >= 13) {
      contactScore.status = 'good';
      contactScore.feedback = 'Complete contact information';
    } else if (contactPoints >= 10) {
      contactScore.status = 'warning';
      contactScore.feedback = 'Missing some contact details';
      contactScore.tips.push('Consider adding LinkedIn profile');
    } else {
      contactScore.status = 'error';
      contactScore.feedback = 'Incomplete contact information';
      contactScore.tips.push('Add name, email, phone, and location');
    }
    results.push(contactScore);

    // Professional Summary Check
    const summaryScore = {
      category: 'Professional Summary',
      score: 0,
      maxScore: 20,
      status: 'error' as const,
      feedback: '',
      tips: [] as string[],
    };

    if (resumeData.summary) {
      const wordCount = resumeData.summary.split(' ').length;
      const hasNumbers = /\d/.test(resumeData.summary);
      const hasActionWords = /(achieved|managed|led|developed|implemented|increased|reduced)/i.test(resumeData.summary);

      let summaryPoints = 10; // Base points for having a summary
      if (wordCount >= 30 && wordCount <= 80) summaryPoints += 5;
      if (hasNumbers) summaryPoints += 3;
      if (hasActionWords) summaryPoints += 2;

      summaryScore.score = summaryPoints;
      if (summaryPoints >= 18) {
        summaryScore.status = 'good';
        summaryScore.feedback = 'Strong professional summary';
      } else if (summaryPoints >= 12) {
        summaryScore.status = 'warning';
        summaryScore.feedback = 'Good summary, could be improved';
        if (!hasNumbers) summaryScore.tips.push('Add quantifiable achievements');
        if (wordCount < 30) summaryScore.tips.push('Expand to 30-80 words');
      } else {
        summaryScore.status = 'error';
        summaryScore.feedback = 'Summary needs improvement';
        summaryScore.tips.push('Include specific achievements and metrics');
      }
    } else {
      summaryScore.feedback = 'Missing professional summary';
      summaryScore.tips.push('Add a 2-3 sentence professional summary');
    }
    results.push(summaryScore);

    // Experience Check
    const expScore = {
      category: 'Work Experience',
      score: 0,
      maxScore: 30,
      status: 'error' as const,
      feedback: '',
      tips: [] as string[],
    };

    if (resumeData.experience.length > 0) {
      let expPoints = resumeData.experience.length * 5;
      
      // Check for quantifiable achievements
      const hasMetrics = resumeData.experience.some(exp =>
        exp.achievements.some(ach => /\d+[%$]?|\$\d+/.test(ach))
      );
      if (hasMetrics) expPoints += 10;

      // Check for action verbs
      const actionVerbs = ['achieved', 'managed', 'led', 'developed', 'implemented', 'increased', 'reduced', 'created', 'designed'];
      const hasActionVerbs = resumeData.experience.some(exp =>
        exp.achievements.some(ach => 
          actionVerbs.some(verb => ach.toLowerCase().includes(verb))
        )
      );
      if (hasActionVerbs) expPoints += 5;

      // Check achievement count
      const totalAchievements = resumeData.experience.reduce((sum, exp) => 
        sum + exp.achievements.filter(a => a.trim()).length, 0
      );
      if (totalAchievements >= resumeData.experience.length * 3) expPoints += 5;

      expScore.score = Math.min(expPoints, 30);
      if (expScore.score >= 25) {
        expScore.status = 'good';
        expScore.feedback = 'Excellent work experience section';
      } else if (expScore.score >= 15) {
        expScore.status = 'warning';
        expScore.feedback = 'Good experience, needs more detail';
        if (!hasMetrics) expScore.tips.push('Add metrics and percentages to achievements');
        if (totalAchievements < resumeData.experience.length * 3) {
          expScore.tips.push('Add 3-5 achievements per position');
        }
      } else {
        expScore.status = 'error';
        expScore.feedback = 'Experience section needs improvement';
        expScore.tips.push('Add quantifiable achievements with metrics');
        expScore.tips.push('Start each bullet with action verbs');
      }
    } else {
      expScore.feedback = 'No work experience added';
      expScore.tips.push('Add at least 2-3 relevant positions');
    }
    results.push(expScore);

    // Education Check
    const eduScore = {
      category: 'Education',
      score: 0,
      maxScore: 15,
      status: 'error' as const,
      feedback: '',
      tips: [] as string[],
    };

    if (resumeData.education.length > 0) {
      let eduPoints = resumeData.education.length * 7;
      const hasAllFields = resumeData.education.every(edu => 
        edu.degree && edu.institution && edu.graduationDate
      );
      if (hasAllFields) eduPoints += 5;

      eduScore.score = Math.min(eduPoints, 15);
      if (eduScore.score >= 12) {
        eduScore.status = 'good';
        eduScore.feedback = 'Complete education information';
      } else if (eduScore.score >= 7) {
        eduScore.status = 'warning';
        eduScore.feedback = 'Education section incomplete';
        eduScore.tips.push('Fill in all degree, institution, and date fields');
      } else {
        eduScore.status = 'error';
        eduScore.feedback = 'Missing education';
        eduScore.tips.push('Add your educational background');
      }
    } else {
      eduScore.feedback = 'No education added';
      eduScore.tips.push('Add at least your highest degree');
    }
    results.push(eduScore);

    // Skills Check
    const skillsScore = {
      category: 'Skills & Keywords',
      score: 0,
      maxScore: 20,
      status: 'error' as const,
      feedback: '',
      tips: [] as string[],
    };

    const totalSkills = resumeData.skills.technical.length + 
                        resumeData.skills.soft.length + 
                        resumeData.skills.certifications.length;

    if (totalSkills > 0) {
      let skillPoints = 0;
      if (resumeData.skills.technical.length >= 5) skillPoints += 8;
      else if (resumeData.skills.technical.length >= 3) skillPoints += 5;
      
      if (resumeData.skills.soft.length >= 4) skillPoints += 6;
      else if (resumeData.skills.soft.length >= 2) skillPoints += 3;
      
      if (resumeData.skills.certifications.length > 0) skillPoints += 6;

      skillsScore.score = skillPoints;
      if (skillPoints >= 16) {
        skillsScore.status = 'good';
        skillsScore.feedback = 'Strong skills section with keywords';
      } else if (skillPoints >= 10) {
        skillsScore.status = 'warning';
        skillsScore.feedback = 'Add more relevant skills';
        if (resumeData.skills.technical.length < 5) {
          skillsScore.tips.push('Add more technical skills (aim for 5-8)');
        }
        if (resumeData.skills.certifications.length === 0) {
          skillsScore.tips.push('Add relevant certifications if you have them');
        }
      } else {
        skillsScore.status = 'error';
        skillsScore.feedback = 'Not enough skills listed';
        skillsScore.tips.push('Add 5-8 technical skills');
        skillsScore.tips.push('Add 3-5 professional skills');
      }
    } else {
      skillsScore.feedback = 'No skills added';
      skillsScore.tips.push('Add technical and professional skills');
    }
    results.push(skillsScore);

    // Calculate overall score
    const totalScore = results.reduce((sum, item) => sum + item.score, 0);
    const maxTotalScore = results.reduce((sum, item) => sum + item.maxScore, 0);
    const percentage = Math.round((totalScore / maxTotalScore) * 100);

    setScores(results);
    setOverallScore(percentage);
    setAnalyzed(true);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-50 border-green-200';
    if (score >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileSearch className="w-6 h-6 text-blue-600" />
            <div>
              <h2 className="text-2xl">ATS Score Checker</h2>
              <p className="text-sm text-gray-600">Analyze your resume's ATS compatibility</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>

        <div className="p-6">
          {!analyzed ? (
            <div className="text-center py-12">
              <TrendingUp className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl mb-2">Ready to Check Your Resume?</h3>
              <p className="text-gray-600 mb-6">
                Our ATS analyzer will scan your resume and provide detailed feedback
              </p>
              <button
                onClick={analyzeResume}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Analyze Resume
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Overall Score */}
              <div className={`p-6 border-2 rounded-lg ${getScoreBg(overallScore)}`}>
                <div className="text-center">
                  <div className={`text-6xl mb-2 ${getScoreColor(overallScore)}`}>
                    {overallScore}%
                  </div>
                  <div className="text-lg font-medium">Overall ATS Score</div>
                  <div className="text-sm text-gray-600 mt-2">
                    {overallScore >= 80 && 'Excellent! Your resume is highly ATS-compatible'}
                    {overallScore >= 60 && overallScore < 80 && 'Good, but there\'s room for improvement'}
                    {overallScore < 60 && 'Needs significant improvement for ATS systems'}
                  </div>
                </div>
              </div>

              {/* Detailed Scores */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Detailed Analysis</h3>
                {scores.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {item.status === 'good' && <CheckCircle className="w-5 h-5 text-green-600" />}
                        {item.status === 'warning' && <AlertCircle className="w-5 h-5 text-yellow-600" />}
                        {item.status === 'error' && <XCircle className="w-5 h-5 text-red-600" />}
                        <h4 className="font-medium">{item.category}</h4>
                      </div>
                      <div className="text-sm font-medium">
                        {item.score}/{item.maxScore}
                      </div>
                    </div>
                    
                    <div className="mb-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            item.status === 'good' ? 'bg-green-600' :
                            item.status === 'warning' ? 'bg-yellow-600' : 'bg-red-600'
                          }`}
                          style={{ width: `${(item.score / item.maxScore) * 100}%` }}
                        />
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 mb-2">{item.feedback}</p>

                    {item.tips.length > 0 && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                        <div className="text-xs font-medium text-blue-900 mb-1">Recommendations:</div>
                        <ul className="text-xs text-gray-700 space-y-1">
                          {item.tips.map((tip, idx) => (
                            <li key={idx}>• {tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={analyzeResume}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Re-analyze Resume
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
