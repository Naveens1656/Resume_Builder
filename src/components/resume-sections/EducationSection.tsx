import { GraduationCap, Plus, Trash2 } from 'lucide-react';

interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  graduationDate: string;
  gpa?: string;
  honors?: string;
}

interface EducationSectionProps {
  education: Education[];
  onUpdate: (education: Education[]) => void;
}

export function EducationSection({ education, onUpdate }: EducationSectionProps) {
  const addEducation = () => {
    const newEdu: Education = {
      id: `edu-${Date.now()}`,
      degree: '',
      institution: '',
      location: '',
      graduationDate: '',
      gpa: '',
      honors: '',
    };
    onUpdate([...education, newEdu]);
  };

  const updateEducation = (id: string, updates: Partial<Education>) => {
    onUpdate(education.map(edu => edu.id === id ? { ...edu, ...updates } : edu));
  };

  const deleteEducation = (id: string) => {
    onUpdate(education.filter(edu => edu.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl flex items-center gap-2">
          <GraduationCap className="w-5 h-5" />
          Education
        </h2>
        <button
          onClick={addEducation}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </button>
      </div>

      {education.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No education added yet</p>
          <p className="text-sm mt-1">Click "Add Education" to get started</p>
        </div>
      ) : (
        <div className="space-y-4">
          {education.map((edu) => (
            <div key={edu.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-medium text-gray-900">Education Entry</h3>
                <button
                  onClick={() => deleteEducation(edu.id)}
                  className="p-2 hover:bg-red-100 text-red-600 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Degree / Certification</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                    placeholder="e.g., Bachelor of Science in Computer Science"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Institution</label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                    placeholder="University Name"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <input
                    type="text"
                    value={edu.location}
                    onChange={(e) => updateEducation(edu.id, { location: e.target.value })}
                    placeholder="City, State"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Graduation Date</label>
                  <input
                    type="month"
                    value={edu.graduationDate}
                    onChange={(e) => updateEducation(edu.id, { graduationDate: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">GPA (optional)</label>
                  <input
                    type="text"
                    value={edu.gpa || ''}
                    onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })}
                    placeholder="3.8/4.0"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Honors & Awards (optional)</label>
                  <input
                    type="text"
                    value={edu.honors || ''}
                    onChange={(e) => updateEducation(edu.id, { honors: e.target.value })}
                    placeholder="e.g., Magna Cum Laude, Dean's List"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 p-3 bg-amber-50 rounded-lg text-xs text-gray-700">
        <strong>Tip:</strong> List your most recent education first. Include GPA only if it's 3.5 or higher. Omit graduation year if it's more than 15 years ago to avoid age discrimination.
      </div>
    </div>
  );
}
