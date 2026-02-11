import { Award, Plus, X } from 'lucide-react';
import { useState } from 'react';

interface Skills {
  technical: string[];
  soft: string[];
  certifications: string[];
}

interface SkillsSectionProps {
  skills: Skills;
  onUpdate: (skills: Skills) => void;
}

export function SkillsSection({ skills, onUpdate }: SkillsSectionProps) {
  const [newSkill, setNewSkill] = useState({ technical: '', soft: '', certifications: '' });

  const addSkill = (category: keyof Skills) => {
    if (newSkill[category].trim()) {
      onUpdate({
        ...skills,
        [category]: [...skills[category], newSkill[category].trim()],
      });
      setNewSkill({ ...newSkill, [category]: '' });
    }
  };

  const removeSkill = (category: keyof Skills, index: number) => {
    onUpdate({
      ...skills,
      [category]: skills[category].filter((_, i) => i !== index),
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent, category: keyof Skills) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(category);
    }
  };

  const skillSuggestions = {
    technical: [
      'JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'AWS', 'Docker',
      'Git', 'TypeScript', 'MongoDB', 'REST APIs', 'Machine Learning'
    ],
    soft: [
      'Leadership', 'Communication', 'Problem Solving', 'Project Management',
      'Team Collaboration', 'Strategic Planning', 'Time Management', 'Adaptability'
    ],
    certifications: [
      'PMP', 'AWS Certified Solutions Architect', 'Google Analytics',
      'Scrum Master', 'Six Sigma', 'CPA', 'CISSP'
    ]
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl mb-4 flex items-center gap-2">
        <Award className="w-5 h-5" />
        Skills & Certifications
      </h2>

      <div className="space-y-6">
        {/* Technical Skills */}
        <div>
          <label className="block text-sm font-medium mb-2">Technical Skills</label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newSkill.technical}
              onChange={(e) => setNewSkill({ ...newSkill, technical: e.target.value })}
              onKeyPress={(e) => handleKeyPress(e, 'technical')}
              placeholder="Add a technical skill..."
              className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              onClick={() => addSkill('technical')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {skills.technical.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
              >
                {skill}
                <button
                  onClick={() => removeSkill('technical', index)}
                  className="hover:bg-blue-200 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          <div className="text-xs text-gray-600">
            <span className="font-medium">Suggestions:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {skillSuggestions.technical.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    if (!skills.technical.includes(suggestion)) {
                      onUpdate({ ...skills, technical: [...skills.technical, suggestion] });
                    }
                  }}
                  className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs transition-colors"
                >
                  + {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Soft Skills */}
        <div>
          <label className="block text-sm font-medium mb-2">Professional Skills</label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newSkill.soft}
              onChange={(e) => setNewSkill({ ...newSkill, soft: e.target.value })}
              onKeyPress={(e) => handleKeyPress(e, 'soft')}
              placeholder="Add a professional skill..."
              className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              onClick={() => addSkill('soft')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {skills.soft.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
              >
                {skill}
                <button
                  onClick={() => removeSkill('soft', index)}
                  className="hover:bg-purple-200 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          <div className="text-xs text-gray-600">
            <span className="font-medium">Suggestions:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {skillSuggestions.soft.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    if (!skills.soft.includes(suggestion)) {
                      onUpdate({ ...skills, soft: [...skills.soft, suggestion] });
                    }
                  }}
                  className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs transition-colors"
                >
                  + {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div>
          <label className="block text-sm font-medium mb-2">Certifications & Licenses</label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newSkill.certifications}
              onChange={(e) => setNewSkill({ ...newSkill, certifications: e.target.value })}
              onKeyPress={(e) => handleKeyPress(e, 'certifications')}
              placeholder="Add a certification..."
              className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              onClick={() => addSkill('certifications')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {skills.certifications.map((cert, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
              >
                {cert}
                <button
                  onClick={() => removeSkill('certifications', index)}
                  className="hover:bg-green-200 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          <div className="text-xs text-gray-600">
            <span className="font-medium">Suggestions:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {skillSuggestions.certifications.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    if (!skills.certifications.includes(suggestion)) {
                      onUpdate({ ...skills, certifications: [...skills.certifications, suggestion] });
                    }
                  }}
                  className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs transition-colors"
                >
                  + {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg text-xs text-gray-700">
        <strong>ATS Tip:</strong> Include specific technologies and tools mentioned in the job description. Avoid rating skills with bars or percentages—ATS systems can't read graphics.
      </div>
    </div>
  );
}
