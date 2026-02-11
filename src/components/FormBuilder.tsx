import { useState } from 'react';
import { FormFieldConfig } from './FormFieldConfig';
import { FormPreview } from './FormPreview';
import { Plus, Save, FileCode, Eye, Settings } from 'lucide-react';

export interface FormField {
  id: string;
  type: 'text' | 'email' | 'number' | 'tel' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'file' | 'date';
  label: string;
  name: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    min?: number;
    max?: number;
  };
}

export interface FormConfig {
  title: string;
  description: string;
  fields: FormField[];
}

export function FormBuilder() {
  const [formConfig, setFormConfig] = useState<FormConfig>({
    title: 'Contact Form',
    description: 'Please fill out the form below',
    fields: []
  });
  
  const [activeView, setActiveView] = useState<'builder' | 'preview'>('builder');
  const [showCode, setShowCode] = useState(false);

  const addField = (type: FormField['type']) => {
    const newField: FormField = {
      id: `field-${Date.now()}`,
      type,
      label: `New ${type} field`,
      name: `field_${Date.now()}`,
      required: false,
      options: type === 'select' || type === 'radio' ? ['Option 1', 'Option 2'] : undefined
    };
    
    setFormConfig(prev => ({
      ...prev,
      fields: [...prev.fields, newField]
    }));
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFormConfig(prev => ({
      ...prev,
      fields: prev.fields.map(field => 
        field.id === id ? { ...field, ...updates } : field
      )
    }));
  };

  const deleteField = (id: string) => {
    setFormConfig(prev => ({
      ...prev,
      fields: prev.fields.filter(field => field.id !== id)
    }));
  };

  const moveField = (id: string, direction: 'up' | 'down') => {
    setFormConfig(prev => {
      const index = prev.fields.findIndex(f => f.id === id);
      if (index === -1) return prev;
      
      const newFields = [...prev.fields];
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      
      if (newIndex < 0 || newIndex >= newFields.length) return prev;
      
      [newFields[index], newFields[newIndex]] = [newFields[newIndex], newFields[index]];
      
      return { ...prev, fields: newFields };
    });
  };

  const fieldTypes: Array<{ type: FormField['type']; label: string; icon: string }> = [
    { type: 'text', label: 'Text Input', icon: '📝' },
    { type: 'email', label: 'Email', icon: '📧' },
    { type: 'number', label: 'Number', icon: '🔢' },
    { type: 'tel', label: 'Phone', icon: '📞' },
    { type: 'textarea', label: 'Text Area', icon: '📄' },
    { type: 'select', label: 'Dropdown', icon: '📋' },
    { type: 'radio', label: 'Radio Buttons', icon: '🔘' },
    { type: 'checkbox', label: 'Checkbox', icon: '☑️' },
    { type: 'file', label: 'File Upload', icon: '📎' },
    { type: 'date', label: 'Date Picker', icon: '📅' },
  ];

  const generateCode = () => {
    const code = `// Generated Form Code
import { useState } from 'react';

export function GeneratedForm() {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log(formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-2">${formConfig.title}</h2>
      <p className="text-gray-600 mb-6">${formConfig.description}</p>
      
${formConfig.fields.map(field => {
  if (field.type === 'textarea') {
    return `      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          ${field.label}${field.required ? ' *' : ''}
        </label>
        <textarea
          name="${field.name}"
          placeholder="${field.placeholder || ''}"
          ${field.required ? 'required' : ''}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          rows={4}
        />
      </div>`;
  } else if (field.type === 'select') {
    return `      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          ${field.label}${field.required ? ' *' : ''}
        </label>
        <select
          name="${field.name}"
          ${field.required ? 'required' : ''}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select an option</option>
${(field.options || []).map(opt => `          <option value="${opt}">${opt}</option>`).join('\n')}
        </select>
      </div>`;
  } else if (field.type === 'radio') {
    return `      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          ${field.label}${field.required ? ' *' : ''}
        </label>
        <div className="space-y-2">
${(field.options || []).map(opt => `          <label className="flex items-center">
            <input
              type="radio"
              name="${field.name}"
              value="${opt}"
              ${field.required ? 'required' : ''}
              onChange={handleChange}
              className="mr-2"
            />
            ${opt}
          </label>`).join('\n')}
        </div>
      </div>`;
  } else if (field.type === 'checkbox') {
    return `      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="${field.name}"
            ${field.required ? 'required' : ''}
            onChange={handleChange}
            className="mr-2"
          />
          ${field.label}${field.required ? ' *' : ''}
        </label>
      </div>`;
  } else {
    return `      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          ${field.label}${field.required ? ' *' : ''}
        </label>
        <input
          type="${field.type}"
          name="${field.name}"
          placeholder="${field.placeholder || ''}"
          ${field.required ? 'required' : ''}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>`;
  }
}).join('\n')}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Submit
      </button>
    </form>
  );
}`;
    
    return code;
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl">AI Form Builder</h1>
              <p className="text-gray-600 mt-1">Create dynamic forms with ease</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveView('builder')}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                  activeView === 'builder'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Settings className="w-4 h-4" />
                Builder
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
                onClick={() => setShowCode(!showCode)}
                className="px-4 py-2 rounded-lg flex items-center gap-2 bg-purple-600 text-white hover:bg-purple-700 transition-colors"
              >
                <FileCode className="w-4 h-4" />
                {showCode ? 'Hide Code' : 'Show Code'}
              </button>
            </div>
          </div>

          {/* Form Title and Description */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Form Title</label>
              <input
                type="text"
                value={formConfig.title}
                onChange={(e) => setFormConfig(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Form Description</label>
              <input
                type="text"
                value={formConfig.description}
                onChange={(e) => setFormConfig(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Code View */}
        {showCode && (
          <div className="bg-gray-900 text-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg">Generated Code</h3>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generateCode());
                  alert('Code copied to clipboard!');
                }}
                className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Copy Code
              </button>
            </div>
            <pre className="overflow-x-auto text-sm">
              <code>{generateCode()}</code>
            </pre>
          </div>
        )}

        {activeView === 'builder' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Field Types Panel */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl mb-4 flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Add Fields
                </h2>
                <div className="grid grid-cols-1 gap-2">
                  {fieldTypes.map(({ type, label, icon }) => (
                    <button
                      key={type}
                      onClick={() => addField(type)}
                      className="flex items-center gap-3 p-3 border rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors text-left"
                    >
                      <span className="text-2xl">{icon}</span>
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Form Fields Configuration */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl mb-4">Form Fields ({formConfig.fields.length})</h2>
                {formConfig.fields.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <p className="text-lg">No fields added yet</p>
                    <p className="text-sm mt-2">Click on a field type to add it to your form</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {formConfig.fields.map((field, index) => (
                      <FormFieldConfig
                        key={field.id}
                        field={field}
                        onUpdate={(updates) => updateField(field.id, updates)}
                        onDelete={() => deleteField(field.id)}
                        onMoveUp={index > 0 ? () => moveField(field.id, 'up') : undefined}
                        onMoveDown={index < formConfig.fields.length - 1 ? () => moveField(field.id, 'down') : undefined}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <FormPreview config={formConfig} />
        )}
      </div>
    </div>
  );
}
