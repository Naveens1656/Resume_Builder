import { Check } from 'lucide-react';

interface TemplateSelectorProps {
  currentTemplate: 'professional' | 'modern' | 'executive' | 'minimal';
  onTemplateChange: (template: 'professional' | 'modern' | 'executive' | 'minimal') => void;
}

export function TemplateSelector({ currentTemplate, onTemplateChange }: TemplateSelectorProps) {
  const templates = [
    {
      id: 'professional' as const,
      name: 'Professional',
      description: 'Classic format for corporate roles',
      color: 'bg-blue-50 border-blue-200',
      activeColor: 'bg-blue-100 border-blue-400',
    },
    {
      id: 'modern' as const,
      name: 'Modern',
      description: 'Contemporary design for tech/creative',
      color: 'bg-purple-50 border-purple-200',
      activeColor: 'bg-purple-100 border-purple-400',
    },
    {
      id: 'executive' as const,
      name: 'Executive',
      description: 'Premium layout for senior positions',
      color: 'bg-slate-50 border-slate-200',
      activeColor: 'bg-slate-100 border-slate-400',
    },
    {
      id: 'minimal' as const,
      name: 'Minimal',
      description: 'Clean design for maximum ATS compatibility',
      color: 'bg-gray-50 border-gray-200',
      activeColor: 'bg-gray-100 border-gray-400',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg mb-4">Choose Template</h2>
      <div className="space-y-3">
        {templates.map(template => (
          <button
            key={template.id}
            onClick={() => onTemplateChange(template.id)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
              currentTemplate === template.id
                ? template.activeColor
                : template.color
            } hover:shadow-md`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium mb-1">{template.name}</h3>
                <p className="text-xs text-gray-600">{template.description}</p>
              </div>
              {currentTemplate === template.id && (
                <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="text-sm font-medium mb-2">ATS Tips</h3>
        <ul className="text-xs text-gray-700 space-y-1">
          <li>• Use standard section headings</li>
          <li>• Avoid tables and graphics</li>
          <li>• Include relevant keywords</li>
          <li>• Use simple formatting</li>
        </ul>
      </div>
    </div>
  );
}
