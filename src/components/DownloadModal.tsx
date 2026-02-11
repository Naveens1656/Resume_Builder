import { useState } from 'react';
import { Download, FileText, File, CheckCircle, X } from 'lucide-react';
import { ResumeData } from './ResumeBuilder';
import jsPDF from 'jspdf';

interface DownloadModalProps {
  resumeData: ResumeData;
  onClose: () => void;
}

type DownloadFormat = 'pdf' | 'docx' | 'txt';

export function DownloadModal({ resumeData, onClose }: DownloadModalProps) {
  const [selectedFormat, setSelectedFormat] = useState<DownloadFormat>('pdf');
  const [downloading, setDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const [year, month] = dateStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    let yPosition = margin;
    const lineHeight = 7;

    // Helper function to add text with word wrap
    const addText = (text: string, fontSize: number, isBold: boolean = false, indent: number = 0) => {
      doc.setFontSize(fontSize);
      doc.setFont('helvetica', isBold ? 'bold' : 'normal');
      
      const maxWidth = pageWidth - (2 * margin) - indent;
      const lines = doc.splitTextToSize(text, maxWidth);
      
      lines.forEach((line: string) => {
        if (yPosition > pageHeight - margin) {
          doc.addPage();
          yPosition = margin;
        }
        doc.text(line, margin + indent, yPosition);
        yPosition += lineHeight;
      });
    };

    const addSpace = (space: number = lineHeight) => {
      yPosition += space;
    };

    const addLine = () => {
      doc.setLineWidth(0.5);
      doc.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += lineHeight;
    };

    // Header - Contact Information
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text(resumeData.contact.fullName || 'Your Name', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += lineHeight + 2;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const contactLine = [
      resumeData.contact.email,
      resumeData.contact.phone,
      resumeData.contact.location
    ].filter(Boolean).join(' | ');
    doc.text(contactLine, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += lineHeight;

    if (resumeData.contact.linkedin || resumeData.contact.website) {
      const linksLine = [resumeData.contact.linkedin, resumeData.contact.website]
        .filter(Boolean)
        .join(' | ');
      doc.text(linksLine, pageWidth / 2, yPosition, { align: 'center' });
      yPosition += lineHeight;
    }

    addSpace(3);
    addLine();
    addSpace(2);

    // Professional Summary
    if (resumeData.summary) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('PROFESSIONAL SUMMARY', margin, yPosition);
      yPosition += lineHeight;
      addText(resumeData.summary, 10, false);
      addSpace(5);
    }

    // Professional Experience
    if (resumeData.experience.length > 0) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('PROFESSIONAL EXPERIENCE', margin, yPosition);
      yPosition += lineHeight + 2;

      resumeData.experience.forEach((exp, index) => {
        // Job title and company
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text(exp.title || 'Job Title', margin, yPosition);
        yPosition += lineHeight;

        doc.setFont('helvetica', 'normal');
        const expLine = `${exp.company || 'Company'} | ${exp.location} | ${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}`;
        doc.text(expLine, margin, yPosition);
        yPosition += lineHeight + 1;

        // Achievements
        exp.achievements.filter(a => a.trim()).forEach((achievement) => {
          if (yPosition > pageHeight - margin - 20) {
            doc.addPage();
            yPosition = margin;
          }
          
          doc.setFontSize(10);
          // Add bullet point
          doc.text('•', margin + 2, yPosition);
          
          const maxWidth = pageWidth - (2 * margin) - 8;
          const lines = doc.splitTextToSize(achievement, maxWidth);
          
          lines.forEach((line: string, idx: number) => {
            doc.text(line, margin + 8, yPosition);
            yPosition += lineHeight;
          });
        });

        if (index < resumeData.experience.length - 1) {
          addSpace(3);
        }
      });

      addSpace(5);
    }

    // Education
    if (resumeData.education.length > 0) {
      if (yPosition > pageHeight - margin - 40) {
        doc.addPage();
        yPosition = margin;
      }

      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('EDUCATION', margin, yPosition);
      yPosition += lineHeight + 2;

      resumeData.education.forEach((edu) => {
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text(edu.degree || 'Degree', margin, yPosition);
        yPosition += lineHeight;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        const eduLine = `${edu.institution || 'Institution'} | ${edu.location} | ${formatDate(edu.graduationDate)}`;
        doc.text(eduLine, margin, yPosition);
        yPosition += lineHeight;

        if (edu.gpa || edu.honors) {
          const extraLine = [edu.gpa && `GPA: ${edu.gpa}`, edu.honors].filter(Boolean).join(' | ');
          doc.text(extraLine, margin, yPosition);
          yPosition += lineHeight;
        }
        addSpace(2);
      });

      addSpace(3);
    }

    // Skills
    const allSkills = [
      ...resumeData.skills.technical,
      ...resumeData.skills.soft,
      ...resumeData.skills.certifications
    ];

    if (allSkills.length > 0) {
      if (yPosition > pageHeight - margin - 30) {
        doc.addPage();
        yPosition = margin;
      }

      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('SKILLS & CERTIFICATIONS', margin, yPosition);
      yPosition += lineHeight + 2;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');

      if (resumeData.skills.technical.length > 0) {
        const techText = `Technical: ${resumeData.skills.technical.join(', ')}`;
        addText(techText, 10, false);
      }

      if (resumeData.skills.soft.length > 0) {
        const softText = `Professional: ${resumeData.skills.soft.join(', ')}`;
        addText(softText, 10, false);
      }

      if (resumeData.skills.certifications.length > 0) {
        const certText = `Certifications: ${resumeData.skills.certifications.join(', ')}`;
        addText(certText, 10, false);
      }
    }

    return doc;
  };

  const generateTXT = () => {
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
      text += '─'.repeat(80) + '\n';
      text += resumeData.summary + '\n\n';
    }

    // Experience
    if (resumeData.experience.length > 0) {
      text += 'PROFESSIONAL EXPERIENCE\n';
      text += '─'.repeat(80) + '\n';
      resumeData.experience.forEach(exp => {
        text += `${exp.title} | ${exp.company}\n`;
        text += `${exp.location} | ${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}\n`;
        exp.achievements.filter(a => a.trim()).forEach(achievement => {
          text += `• ${achievement}\n`;
        });
        text += '\n';
      });
    }

    // Education
    if (resumeData.education.length > 0) {
      text += 'EDUCATION\n';
      text += '─'.repeat(80) + '\n';
      resumeData.education.forEach(edu => {
        text += `${edu.degree} | ${edu.institution}\n`;
        text += `${edu.location} | ${formatDate(edu.graduationDate)}`;
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
      text += '─'.repeat(80) + '\n';
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

  const generateDOCX = () => {
    // For DOCX, we'll generate an HTML-based format that can be opened in Word
    let html = '<!DOCTYPE html><html><head><meta charset="utf-8"><style>';
    html += 'body { font-family: Arial, sans-serif; margin: 1in; line-height: 1.6; }';
    html += 'h1 { text-align: center; font-size: 24pt; margin-bottom: 5px; }';
    html += '.contact { text-align: center; font-size: 10pt; margin-bottom: 20px; }';
    html += 'h2 { font-size: 14pt; border-bottom: 2px solid #333; margin-top: 20px; margin-bottom: 10px; }';
    html += '.job-title { font-weight: bold; font-size: 12pt; margin-top: 15px; }';
    html += '.job-details { font-size: 10pt; color: #555; margin-bottom: 5px; }';
    html += 'ul { margin: 5px 0; padding-left: 20px; }';
    html += 'li { font-size: 10pt; margin-bottom: 5px; }';
    html += '</style></head><body>';

    // Header
    html += `<h1>${resumeData.contact.fullName || 'Your Name'}</h1>`;
    html += '<div class="contact">';
    html += `${resumeData.contact.email} | ${resumeData.contact.phone}`;
    if (resumeData.contact.location) html += ` | ${resumeData.contact.location}`;
    html += '<br>';
    if (resumeData.contact.linkedin) html += `${resumeData.contact.linkedin} `;
    if (resumeData.contact.website) html += `| ${resumeData.contact.website}`;
    html += '</div>';

    // Summary
    if (resumeData.summary) {
      html += '<h2>PROFESSIONAL SUMMARY</h2>';
      html += `<p>${resumeData.summary}</p>`;
    }

    // Experience
    if (resumeData.experience.length > 0) {
      html += '<h2>PROFESSIONAL EXPERIENCE</h2>';
      resumeData.experience.forEach(exp => {
        html += `<div class="job-title">${exp.title || 'Job Title'}</div>`;
        html += `<div class="job-details">${exp.company || 'Company'} | ${exp.location} | ${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}</div>`;
        html += '<ul>';
        exp.achievements.filter(a => a.trim()).forEach(achievement => {
          html += `<li>${achievement}</li>`;
        });
        html += '</ul>';
      });
    }

    // Education
    if (resumeData.education.length > 0) {
      html += '<h2>EDUCATION</h2>';
      resumeData.education.forEach(edu => {
        html += `<div class="job-title">${edu.degree || 'Degree'}</div>`;
        html += `<div class="job-details">${edu.institution || 'Institution'} | ${edu.location} | ${formatDate(edu.graduationDate)}`;
        if (edu.gpa || edu.honors) {
          html += ` | ${[edu.gpa && `GPA: ${edu.gpa}`, edu.honors].filter(Boolean).join(' | ')}`;
        }
        html += '</div>';
      });
    }

    // Skills
    if (resumeData.skills.technical.length > 0 || resumeData.skills.soft.length > 0 || resumeData.skills.certifications.length > 0) {
      html += '<h2>SKILLS & CERTIFICATIONS</h2>';
      if (resumeData.skills.technical.length > 0) {
        html += `<p><strong>Technical:</strong> ${resumeData.skills.technical.join(', ')}</p>`;
      }
      if (resumeData.skills.soft.length > 0) {
        html += `<p><strong>Professional:</strong> ${resumeData.skills.soft.join(', ')}</p>`;
      }
      if (resumeData.skills.certifications.length > 0) {
        html += `<p><strong>Certifications:</strong> ${resumeData.skills.certifications.join(', ')}</p>`;
      }
    }

    html += '</body></html>';
    return html;
  };

  const handleDownload = async () => {
    setDownloading(true);
    
    try {
      const fileName = `${resumeData.contact.fullName.replace(/\s+/g, '_') || 'Resume'}`;
      
      if (selectedFormat === 'pdf') {
        const doc = generatePDF();
        doc.save(`${fileName}.pdf`);
      } else if (selectedFormat === 'txt') {
        const text = generateTXT();
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileName}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else if (selectedFormat === 'docx') {
        const html = generateDOCX();
        const blob = new Blob([html], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileName}.doc`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }

      setDownloadComplete(true);
      setTimeout(() => {
        setDownloadComplete(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Download error:', error);
      alert('Error downloading resume. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const formats = [
    {
      type: 'pdf' as DownloadFormat,
      name: 'PDF Document',
      description: 'Best for job applications and ATS systems',
      icon: FileText,
      recommended: true,
    },
    {
      type: 'docx' as DownloadFormat,
      name: 'Word Document',
      description: 'Editable format for further customization',
      icon: File,
      recommended: false,
    },
    {
      type: 'txt' as DownloadFormat,
      name: 'Plain Text',
      description: 'Simple text format for email bodies',
      icon: FileText,
      recommended: false,
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
        <div className="border-b p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Download className="w-6 h-6 text-blue-600" />
            <div>
              <h2 className="text-2xl">Download Resume</h2>
              <p className="text-sm text-gray-600">Choose your preferred format</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {downloadComplete ? (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl mb-2">Download Complete!</h3>
              <p className="text-gray-600">Your resume has been downloaded successfully.</p>
            </div>
          ) : (
            <>
              <div className="space-y-3 mb-6">
                {formats.map((format) => {
                  const Icon = format.icon;
                  return (
                    <button
                      key={format.type}
                      onClick={() => setSelectedFormat(format.type)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        selectedFormat === format.type
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon className="w-8 h-8 text-gray-700" />
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{format.name}</h3>
                              {format.recommended && (
                                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                                  Recommended
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">{format.description}</p>
                          </div>
                        </div>
                        {selectedFormat === format.type && (
                          <CheckCircle className="w-6 h-6 text-blue-600" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 className="text-sm font-medium mb-2">💡 Download Tips</h4>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>• <strong>PDF</strong> is best for job applications - it preserves formatting and is ATS-friendly</li>
                  <li>• <strong>Word</strong> allows you to make quick edits before submitting</li>
                  <li>• <strong>Text</strong> format is useful for pasting into online application forms</li>
                  <li>• Always proofread your resume one final time before submitting</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {downloading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Preparing...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      Download {selectedFormat.toUpperCase()}
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
