import { ResumeData } from './ResumeBuilder';
import { ContactSection } from './resume-sections/ContactSection';
import { SummarySection } from './resume-sections/SummarySection';
import { ExperienceSection } from './resume-sections/ExperienceSection';
import { EducationSection } from './resume-sections/EducationSection';
import { SkillsSection } from './resume-sections/SkillsSection';

interface ResumeFormProps {
  resumeData: ResumeData;
  onUpdate: (updates: Partial<ResumeData>) => void;
}

export function ResumeForm({ resumeData, onUpdate }: ResumeFormProps) {
  return (
    <div className="space-y-6">
      <ContactSection
        contact={resumeData.contact}
        onUpdate={(contact) => onUpdate({ contact })}
      />
      
      <SummarySection
        summary={resumeData.summary}
        onUpdate={(summary) => onUpdate({ summary })}
      />
      
      <ExperienceSection
        experience={resumeData.experience}
        onUpdate={(experience) => onUpdate({ experience })}
      />
      
      <EducationSection
        education={resumeData.education}
        onUpdate={(education) => onUpdate({ education })}
      />
      
      <SkillsSection
        skills={resumeData.skills}
        onUpdate={(skills) => onUpdate({ skills })}
      />
    </div>
  );
}
