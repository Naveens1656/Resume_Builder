import { Briefcase, Plus, Trash2, ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';
import { useState } from 'react';

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  achievements: string[];
}

interface ExperienceSectionProps {
  experience: Experience[];
  onUpdate: (experience: Experience[]) => void;
}

export function ExperienceSection({ experience, onUpdate }: ExperienceSectionProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const addExperience = () => {
    const newExp: Experience = {
      id: `exp-${Date.now()}`,
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      achievements: [''],
    };
    onUpdate([...experience, newExp]);
    setExpandedIds(new Set([...expandedIds, newExp.id]));
  };

  const updateExperience = (id: string, updates: Partial<Experience>) => {
    onUpdate(experience.map(exp => exp.id === id ? { ...exp, ...updates } : exp));
  };

  const deleteExperience = (id: string) => {
    onUpdate(experience.filter(exp => exp.id !== id));
  };

  const addAchievement = (id: string) => {
    const exp = experience.find(e => e.id === id);
    if (exp) {
      updateExperience(id, { achievements: [...exp.achievements, ''] });
    }
  };

  const updateAchievement = (id: string, index: number, value: string) => {
    const exp = experience.find(e => e.id === id);
    if (exp) {
      const newAchievements = [...exp.achievements];
      newAchievements[index] = value;
      updateExperience(id, { achievements: newAchievements });
    }
  };

  const deleteAchievement = (id: string, index: number) => {
    const exp = experience.find(e => e.id === id);
    if (exp && exp.achievements.length > 1) {
      const newAchievements = exp.achievements.filter((_, i) => i !== index);
      updateExperience(id, { achievements: newAchievements });
    }
  };

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedIds(newExpanded);
  };

  const actionVerbs = [
    'Achieved', 'Implemented', 'Increased', 'Reduced', 'Managed', 'Led', 'Developed',
    'Created', 'Designed', 'Improved', 'Spearheaded', 'Optimized', 'Streamlined'
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl flex items-center gap-2">
          <Briefcase className="w-5 h-5" />
          Professional Experience
        </h2>
        <button
          onClick={addExperience}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Position
        </button>
      </div>

      {experience.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No experience added yet</p>
          <p className="text-sm mt-1">Click "Add Position" to get started</p>
        </div>
      ) : (
        <div className="space-y-4">
          {experience.map((exp) => (
            <div key={exp.id} className="border rounded-lg overflow-hidden">
              {/* Header */}
              <div className="bg-gray-50 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={exp.title}
                      onChange={(e) => updateExperience(exp.id, { title: e.target.value })}
                      placeholder="Job Title"
                      className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                      placeholder="Company Name"
                      className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => toggleExpanded(exp.id)}
                      className="p-2 hover:bg-gray-200 rounded transition-colors"
                    >
                      {expandedIds.has(exp.id) ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => deleteExperience(exp.id)}
                      className="p-2 hover:bg-red-100 text-red-600 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedIds.has(exp.id) && (
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                      placeholder="City, State"
                      className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="month"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                        className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      <span className="text-gray-500">to</span>
                      <input
                        type="month"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                        disabled={exp.current}
                        className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100"
                      />
                    </div>
                  </div>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) => updateExperience(exp.id, { current: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">I currently work here</span>
                  </label>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium">Key Achievements & Responsibilities</label>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Lightbulb className="w-3 h-3" />
                        <span>Use: {actionVerbs.slice(0, 4).join(', ')}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {exp.achievements.map((achievement, index) => (
                        <div key={index} className="flex gap-2">
                          <span className="text-gray-500 pt-2">•</span>
                          <input
                            type="text"
                            value={achievement}
                            onChange={(e) => updateAchievement(exp.id, index, e.target.value)}
                            placeholder="Start with action verb... Include metrics when possible (e.g., Increased sales by 35%)"
                            className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                          {exp.achievements.length > 1 && (
                            <button
                              onClick={() => deleteAchievement(exp.id, index)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => addAchievement(exp.id)}
                      className="mt-2 w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors text-sm"
                    >
                      + Add Achievement
                    </button>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg text-xs text-gray-700">
                    <strong>ATS Tip:</strong> Use specific metrics and industry keywords. Example: "Managed team of 12" instead of "Managed large team"
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
