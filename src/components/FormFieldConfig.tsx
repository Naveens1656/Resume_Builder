import { FormField } from './FormBuilder';
import { Trash2, ChevronUp, ChevronDown, Settings2 } from 'lucide-react';
import { useState } from 'react';

interface FormFieldConfigProps {
  field: FormField;
  onUpdate: (updates: Partial<FormField>) => void;
  onDelete: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}

export function FormFieldConfig({ field, onUpdate, onDelete, onMoveUp, onMoveDown }: FormFieldConfigProps) {
  const [expanded, setExpanded] = useState(false);

  const getFieldIcon = (type: FormField['type']) => {
    const icons: Record<FormField['type'], string> = {
      text: '📝',
      email: '📧',
      number: '🔢',
      tel: '📞',
      textarea: '📄',
      select: '📋',
      radio: '🔘',
      checkbox: '☑️',
      file: '📎',
      date: '📅',
    };
    return icons[type];
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <span className="text-2xl">{getFieldIcon(field.type)}</span>
          <div className="flex-1">
            <input
              type="text"
              value={field.label}
              onChange={(e) => onUpdate({ label: e.target.value })}
              className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Field label"
            />
          </div>
          <span className="text-sm text-gray-500 capitalize">{field.type}</span>
        </div>
        
        <div className="flex items-center gap-2 ml-4">
          {onMoveUp && (
            <button
              onClick={onMoveUp}
              className="p-2 hover:bg-gray-200 rounded transition-colors"
              title="Move up"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          )}
          {onMoveDown && (
            <button
              onClick={onMoveDown}
              className="p-2 hover:bg-gray-200 rounded transition-colors"
              title="Move down"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Settings"
          >
            <Settings2 className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 hover:bg-red-100 text-red-600 rounded transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Expanded Configuration */}
      {expanded && (
        <div className="p-4 bg-white space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Field Name</label>
              <input
                type="text"
                value={field.name}
                onChange={(e) => onUpdate({ name: e.target.value })}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                placeholder="field_name"
              />
            </div>
            
            {field.type !== 'checkbox' && (
              <div>
                <label className="block text-sm font-medium mb-1">Placeholder</label>
                <input
                  type="text"
                  value={field.placeholder || ''}
                  onChange={(e) => onUpdate({ placeholder: e.target.value })}
                  className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                  placeholder="Enter placeholder text"
                />
              </div>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={field.required}
                onChange={(e) => onUpdate({ required: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">Required field</span>
            </label>
          </div>

          {/* Options for select and radio */}
          {(field.type === 'select' || field.type === 'radio') && (
            <div>
              <label className="block text-sm font-medium mb-2">Options</label>
              <div className="space-y-2">
                {(field.options || []).map((option, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...(field.options || [])];
                        newOptions[index] = e.target.value;
                        onUpdate({ options: newOptions });
                      }}
                      className="flex-1 px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                      placeholder={`Option ${index + 1}`}
                    />
                    <button
                      onClick={() => {
                        const newOptions = (field.options || []).filter((_, i) => i !== index);
                        onUpdate({ options: newOptions });
                      }}
                      className="px-3 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newOptions = [...(field.options || []), `Option ${(field.options || []).length + 1}`];
                    onUpdate({ options: newOptions });
                  }}
                  className="w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded hover:border-blue-400 hover:bg-blue-50 transition-colors text-sm"
                >
                  + Add Option
                </button>
              </div>
            </div>
          )}

          {/* Validation options */}
          {(field.type === 'text' || field.type === 'textarea') && (
            <div>
              <label className="block text-sm font-medium mb-2">Validation</label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Min Length</label>
                  <input
                    type="number"
                    value={field.validation?.minLength || ''}
                    onChange={(e) => onUpdate({ 
                      validation: { 
                        ...field.validation, 
                        minLength: e.target.value ? parseInt(e.target.value) : undefined 
                      } 
                    })}
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                    placeholder="Min"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Max Length</label>
                  <input
                    type="number"
                    value={field.validation?.maxLength || ''}
                    onChange={(e) => onUpdate({ 
                      validation: { 
                        ...field.validation, 
                        maxLength: e.target.value ? parseInt(e.target.value) : undefined 
                      } 
                    })}
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                    placeholder="Max"
                  />
                </div>
              </div>
            </div>
          )}

          {field.type === 'number' && (
            <div>
              <label className="block text-sm font-medium mb-2">Number Range</label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Minimum</label>
                  <input
                    type="number"
                    value={field.validation?.min || ''}
                    onChange={(e) => onUpdate({ 
                      validation: { 
                        ...field.validation, 
                        min: e.target.value ? parseInt(e.target.value) : undefined 
                      } 
                    })}
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                    placeholder="Min"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Maximum</label>
                  <input
                    type="number"
                    value={field.validation?.max || ''}
                    onChange={(e) => onUpdate({ 
                      validation: { 
                        ...field.validation, 
                        max: e.target.value ? parseInt(e.target.value) : undefined 
                      } 
                    })}
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                    placeholder="Max"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
