import { useState } from 'react';
import { ResumeForm } from './ResumeForm';
import { ResumePreview } from './ResumePreview';
import { TemplateSelector } from './TemplateSelector';
import { ActionVerbHelper } from './ActionVerbHelper';
import { FontSelector } from './FontSelector';
import { ATSScoreChecker } from './ATSScoreChecker';
import { ResumeTemplates } from './ResumeTemplates';
import { DownloadModal } from './DownloadModal';
import { Download, Eye, Edit, FileText, Lightbulb, Award, FileCheck } from 'lucide-react';

export interface ResumeData {
  template: 'professional' | 'modern' | 'executive' | 'minimal';
  font: string;
  contact: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    website?: string;
  };
  summary: string;
  experience: Array<{
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    achievements: string[];
  }>;
  education: Array<{
    id: string;
    degree: string;
    institution: string;
    location: string;
    graduationDate: string;
    gpa?: string;
    honors?: string;
  }>;
  skills: {
    technical: string[];
    soft: string[];
    certifications: string[];
  };
}

export function ResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    template: 'professional',
    font: 'Arial',
    contact: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      website: '',
    },
    summary: '',
    experience: [],
    education: [],
    skills: {
      technical: [],
      soft: [],
      certifications: [],
    },
  });

  const [activeView, setActiveView] = useState<'edit' | 'preview'>('edit');
  const [showHelper, setShowHelper] = useState(false);
  const [showATSChecker, setShowATSChecker] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  const updateResumeData = (updates: Partial<ResumeData>) => {
    setResumeData(prev => ({ ...prev, ...updates }));
  };
  
  const loadTemplate = (data: ResumeData) => {
    setResumeData(data);
  };

  const handleDownload = () => {
    // In a real application, this would generate a PDF
    const resumeText = generatePlainText();
    const blob = new Blob([resumeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resumeData.contact.fullName.replace(/\s+/g, '_')}_Resume.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generatePlainText = () => {
    let text = '';
    
    // Contact Information
    text += `${resumeData.contact.fullName.toUpperCase()}\n`;
    text += `${resumeData.contact.email} | ${resumeData.contact.phone}`;
    if (resumeData.contact.location) text += ` | ${resumeData.contact.location}`;
    if (resumeData.contact.linkedin) text += `\nLinkedIn: ${resumeData.contact.linkedin}`;
    if (resumeData.contact.website) text += ` | ${resumeData.contact.website}`;
    text += '\n\n';

    // Professional Summary
    if (resumeData.summary) {
      text += 'PROFESSIONAL SUMMARY\n';
      text += '─'.repeat(50) + '\n';
      text += resumeData.summary + '\n\n';
    }

    // Experience
    if (resumeData.experience.length > 0) {
      text += 'PROFESSIONAL EXPERIENCE\n';
      text += '─'.repeat(50) + '\n';
      resumeData.experience.forEach(exp => {
        text += `${exp.title} | ${exp.company}\n`;
        text += `${exp.location} | ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}\n`;
        exp.achievements.forEach(achievement => {
          text += `• ${achievement}\n`;
        });
        text += '\n';
      });
    }

    // Education
    if (resumeData.education.length > 0) {
      text += 'EDUCATION\n';
      text += '─'.repeat(50) + '\n';
      resumeData.education.forEach(edu => {
        text += `${edu.degree} | ${edu.institution}\n`;
        text += `${edu.location} | ${edu.graduationDate}`;
        if (edu.gpa) text += ` | GPA: ${edu.gpa}`;
        if (edu.honors) text += ` | ${edu.honors}`;
        text += '\n\n';
      });
    }

    // Skills
    const allSkills = [
      ...resumeData.skills.technical,
      ...resumeData.skills.soft,
      ...resumeData.skills.certifications
    ];
    if (allSkills.length > 0) {
      text += 'SKILLS & CERTIFICATIONS\n';
      text += '─'.repeat(50) + '\n';
      if (resumeData.skills.technical.length > 0) {
        text += `Technical: ${resumeData.skills.technical.join(', ')}\n`;
      }
      if (resumeData.skills.soft.length > 0) {
        text += `Professional: ${resumeData.skills.soft.join(', ')}\n`;
      }
      if (resumeData.skills.certifications.length > 0) {
        text += `Certifications: ${resumeData.skills.certifications.join(', ')}\n`;
      }
    }

    return text;
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl">Professional Resume Builder</h1>
                <p className="text-sm text-gray-600">ATS-Optimized • Industry Standards</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowTemplates(true)}
                className="px-4 py-2 rounded-lg flex items-center gap-2 bg-purple-600 text-white hover:bg-purple-700 transition-colors"
              >
                <FileCheck className="w-4 h-4" />
                Templates
              </button>
              
              <button
                onClick={() => setShowATSChecker(true)}
                className="px-4 py-2 rounded-lg flex items-center gap-2 bg-orange-600 text-white hover:bg-orange-700 transition-colors"
              >
                <Award className="w-4 h-4" />
                ATS Score
              </button>
              
              <button
                onClick={() => setShowHelper(!showHelper)}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                  showHelper
                    ? 'bg-amber-100 text-amber-700 border border-amber-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Lightbulb className="w-4 h-4" />
                Tips
              </button>
              
              <button
                onClick={() => setActiveView('edit')}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                  activeView === 'edit'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
              
              <button
                onClick={() => setActiveView('preview')}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                  activeView === 'preview'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>
              
              <button
                onClick={() => setShowDownloadModal(true)}
                className="px-4 py-2 rounded-lg flex items-center gap-2 bg-green-600 text-white hover:bg-green-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Template Selector */}
          <div className="lg:col-span-3">
            <FontSelector
              currentFont={resumeData.font}
              onFontChange={(font) => updateResumeData({ font })}
            />
            
            <TemplateSelector
              currentTemplate={resumeData.template}
              onTemplateChange={(template) => updateResumeData({ template })}
            />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9">
            {activeView === 'edit' ? (
              <ResumeForm
                resumeData={resumeData}
                onUpdate={updateResumeData}
              />
            ) : (
              <ResumePreview resumeData={resumeData} />
            )}
          </div>
        </div>
      </div>

      {/* Action Verb Helper Modal */}
      {showHelper && (
        <ActionVerbHelper onClose={() => setShowHelper(false)} />
      )}
      
      {/* ATS Score Checker Modal */}
      {showATSChecker && (
        <ATSScoreChecker 
          resumeData={resumeData}
          onClose={() => setShowATSChecker(false)} 
        />
      )}
      
      {/* Resume Templates Modal */}
      {showTemplates && (
        <ResumeTemplates
          onSelectTemplate={loadTemplate}
          onClose={() => setShowTemplates(false)}
        />
      )}
      
      {/* Download Modal */}
      {showDownloadModal && (
        <DownloadModal
          resumeData={resumeData}
          onClose={() => setShowDownloadModal(false)}
        />
      )}
    </div>
  );
}