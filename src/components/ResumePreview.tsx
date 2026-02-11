import { ResumeData } from './ResumeBuilder';
import { Mail, Phone, MapPin, Linkedin, Globe, Calendar } from 'lucide-react';

interface ResumePreviewProps {
  resumeData: ResumeData;
}

export function ResumePreview({ resumeData }: ResumePreviewProps) {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const [year, month] = dateStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const getFontClass = (font: string) => {
    switch (font) {
      case 'Times New Roman':
      case 'Georgia':
        return 'font-serif';
      default:
        return 'font-sans';
    }
  };

  const templates = {
    professional: 'bg-white',
    modern: 'bg-gradient-to-br from-white via-white to-blue-50',
    executive: 'bg-white',
    minimal: 'bg-white',
  };

  const headerStyles = {
    professional: 'border-b-2 border-gray-300',
    modern: 'border-b-4 border-gradient-to-r from-blue-500 to-purple-500 bg-gradient-to-r from-blue-50 to-purple-50 -mx-12 -mt-12 px-12 pt-12',
    executive: 'border-l-4 border-blue-900 pl-6 bg-gray-50 -mx-12 -mt-12 px-12 pt-12',
    minimal: 'border-b border-gray-400',
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className={`max-w-4xl mx-auto ${templates[resumeData.template]} ${getFontClass(resumeData.font)} p-12 min-h-[1100px] shadow-xl`}>
        {/* Header */}
        <div className={`${headerStyles[resumeData.template]} pb-6 mb-6`}>
          <h1 className="text-4xl mb-3">{resumeData.contact.fullName || 'Your Name'}</h1>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-700">
            {resumeData.contact.email && (
              <div className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                {resumeData.contact.email}
              </div>
            )}
            {resumeData.contact.phone && (
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                {resumeData.contact.phone}
              </div>
            )}
            {resumeData.contact.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {resumeData.contact.location}
              </div>
            )}
          </div>
          {(resumeData.contact.linkedin || resumeData.contact.website) && (
            <div className="flex flex-wrap gap-x-4 mt-2 text-sm text-blue-600">
              {resumeData.contact.linkedin && (
                <div className="flex items-center gap-1">
                  <Linkedin className="w-4 h-4" />
                  {resumeData.contact.linkedin}
                </div>
              )}
              {resumeData.contact.website && (
                <div className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  {resumeData.contact.website}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Professional Summary */}
        {resumeData.summary && (
          <div className="mb-6">
            <h2 className="text-xl border-b border-gray-400 pb-2 mb-3">PROFESSIONAL SUMMARY</h2>
            <p className="text-gray-800 leading-relaxed">{resumeData.summary}</p>
          </div>
        )}

        {/* Professional Experience */}
        {resumeData.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl border-b border-gray-400 pb-2 mb-3">PROFESSIONAL EXPERIENCE</h2>
            <div className="space-y-4">
              {resumeData.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-semibold text-lg">{exp.title || 'Job Title'}</h3>
                      <p className="text-gray-700">{exp.company || 'Company Name'}</p>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>{exp.location}</p>
                      <p className="flex items-center gap-1 justify-end">
                        <Calendar className="w-3 h-3" />
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </p>
                    </div>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-gray-800">
                    {exp.achievements.filter(a => a.trim()).map((achievement, idx) => (
                      <li key={idx} className="ml-4">{achievement}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {resumeData.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl border-b border-gray-400 pb-2 mb-3">EDUCATION</h2>
            <div className="space-y-3">
              {resumeData.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{edu.degree || 'Degree'}</h3>
                      <p className="text-gray-700">{edu.institution || 'Institution'}</p>
                      {(edu.gpa || edu.honors) && (
                        <p className="text-sm text-gray-600">
                          {edu.gpa && `GPA: ${edu.gpa}`}
                          {edu.gpa && edu.honors && ' | '}
                          {edu.honors}
                        </p>
                      )}
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>{edu.location}</p>
                      <p>{formatDate(edu.graduationDate)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {(resumeData.skills.technical.length > 0 ||
          resumeData.skills.soft.length > 0 ||
          resumeData.skills.certifications.length > 0) && (
          <div>
            <h2 className="text-xl border-b border-gray-400 pb-2 mb-3">SKILLS & CERTIFICATIONS</h2>
            <div className="space-y-2">
              {resumeData.skills.technical.length > 0 && (
                <div>
                  <span className="font-semibold">Technical: </span>
                  <span className="text-gray-800">{resumeData.skills.technical.join(', ')}</span>
                </div>
              )}
              {resumeData.skills.soft.length > 0 && (
                <div>
                  <span className="font-semibold">Professional: </span>
                  <span className="text-gray-800">{resumeData.skills.soft.join(', ')}</span>
                </div>
              )}
              {resumeData.skills.certifications.length > 0 && (
                <div>
                  <span className="font-semibold">Certifications: </span>
                  <span className="text-gray-800">{resumeData.skills.certifications.join(', ')}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!resumeData.summary &&
          resumeData.experience.length === 0 &&
          resumeData.education.length === 0 &&
          resumeData.skills.technical.length === 0 &&
          resumeData.skills.soft.length === 0 &&
          resumeData.skills.certifications.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg">Your resume preview will appear here</p>
              <p className="text-sm mt-2">Start filling out the form to see your resume take shape</p>
            </div>
          )}
      </div>
    </div>
  );
}