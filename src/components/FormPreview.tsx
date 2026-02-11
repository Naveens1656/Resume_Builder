import { useState } from 'react';
import { FormConfig } from './FormBuilder';
import { Check, AlertCircle, Upload, X } from 'lucide-react';

interface FormPreviewProps {
  config: FormConfig;
}

export function FormPreview({ config }: FormPreviewProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [filePreview, setFilePreview] = useState<Record<string, string>>({});

  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (name: string, file: File | null) => {
    if (file) {
      setFormData(prev => ({ ...prev, [name]: file }));
      
      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(prev => ({ ...prev, [name]: reader.result as string }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData(prev => {
        const newData = { ...prev };
        delete newData[name];
        return newData;
      });
      setFilePreview(prev => {
        const newPreview = { ...prev };
        delete newPreview[name];
        return newPreview;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    config.fields.forEach(field => {
      const value = formData[field.name];

      // Required validation
      if (field.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
        newErrors[field.name] = `${field.label} is required`;
        return;
      }

      // Skip further validation if field is empty and not required
      if (!value) return;

      // Type-specific validation
      if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors[field.name] = 'Please enter a valid email address';
        }
      }

      if (field.type === 'tel' && value) {
        const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
        if (!phoneRegex.test(value)) {
          newErrors[field.name] = 'Please enter a valid phone number';
        }
      }

      // Length validation
      if (field.validation?.minLength && value.length < field.validation.minLength) {
        newErrors[field.name] = `Minimum length is ${field.validation.minLength} characters`;
      }

      if (field.validation?.maxLength && value.length > field.validation.maxLength) {
        newErrors[field.name] = `Maximum length is ${field.validation.maxLength} characters`;
      }

      // Number range validation
      if (field.type === 'number') {
        const numValue = parseFloat(value);
        if (field.validation?.min !== undefined && numValue < field.validation.min) {
          newErrors[field.name] = `Minimum value is ${field.validation.min}`;
        }
        if (field.validation?.max !== undefined && numValue > field.validation.max) {
          newErrors[field.name] = `Maximum value is ${field.validation.max}`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Form submitted:', formData);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  const renderField = (field: typeof config.fields[0]) => {
    const commonClasses = "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all";
    const errorClasses = errors[field.name] ? "border-red-500" : "border-gray-300";

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            name={field.name}
            value={formData[field.name] || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className={`${commonClasses} ${errorClasses}`}
            rows={4}
          />
        );

      case 'select':
        return (
          <select
            name={field.name}
            value={formData[field.name] || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className={`${commonClasses} ${errorClasses}`}
          >
            <option value="">Select an option</option>
            {(field.options || []).map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case 'radio':
        return (
          <div className="space-y-2">
            {(field.options || []).map((option, index) => (
              <label key={index} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={field.name}
                  value={option}
                  checked={formData[field.name] === option}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="w-4 h-4 text-blue-600"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name={field.name}
              checked={formData[field.name] || false}
              onChange={(e) => handleChange(field.name, e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span>{field.label}</span>
          </label>
        );

      case 'file':
        return (
          <div>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              {filePreview[field.name] ? (
                <div className="relative w-full h-full p-2">
                  <img
                    src={filePreview[field.name]}
                    alt="Preview"
                    className="w-full h-full object-contain rounded"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleFileChange(field.name, null);
                    }}
                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : formData[field.name] ? (
                <div className="text-center">
                  <Check className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-sm">{formData[field.name].name}</p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleFileChange(field.name, null);
                    }}
                    className="text-xs text-red-500 mt-1"
                  >
                    Remove file
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG, PDF up to 10MB</p>
                </div>
              )}
              <input
                type="file"
                name={field.name}
                onChange={(e) => handleFileChange(field.name, e.target.files?.[0] || null)}
                className="hidden"
                accept="image/*,.pdf"
              />
            </label>
          </div>
        );

      default:
        return (
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className={`${commonClasses} ${errorClasses}`}
          />
        );
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl mb-2">{config.title}</h2>
        <p className="text-gray-600 mb-6">{config.description}</p>

        {config.fields.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No fields in this form yet</p>
            <p className="text-sm mt-2">Switch to Builder view to add fields</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {config.fields.map((field) => (
              <div key={field.id}>
                {field.type !== 'checkbox' && (
                  <label className="block text-sm font-medium mb-2">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                )}
                {renderField(field)}
                {errors[field.name] && (
                  <div className="flex items-center gap-2 text-red-500 text-sm mt-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors[field.name]}</span>
                  </div>
                )}
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              {submitted ? (
                <>
                  <Check className="w-5 h-5" />
                  Submitted Successfully!
                </>
              ) : (
                'Submit Form'
              )}
            </button>
          </form>
        )}

        {/* Form Data Preview */}
        {Object.keys(formData).length > 0 && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium mb-2">Form Data (for debugging)</h3>
            <pre className="text-xs overflow-x-auto">
              {JSON.stringify(
                Object.fromEntries(
                  Object.entries(formData).map(([key, value]) => [
                    key,
                    value instanceof File ? `File: ${value.name}` : value
                  ])
                ),
                null,
                2
              )}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
