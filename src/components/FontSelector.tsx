import { Type } from 'lucide-react';

interface FontSelectorProps {
  currentFont: string;
  onFontChange: (font: string) => void;
}

export function FontSelector({ currentFont, onFontChange }: FontSelectorProps) {
  const fonts = [
    { name: 'Arial', class: 'font-sans', description: 'Clean, professional' },
    { name: 'Times New Roman', class: 'font-serif', description: 'Classic, traditional' },
    { name: 'Calibri', class: 'font-sans', description: 'Modern, readable' },
    { name: 'Georgia', class: 'font-serif', description: 'Elegant, formal' },
    { name: 'Helvetica', class: 'font-sans', description: 'Contemporary, clean' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
        <Type className="w-4 h-4" />
        Font Style
      </h3>
      <div className="space-y-2">
        {fonts.map(font => (
          <button
            key={font.name}
            onClick={() => onFontChange(font.name)}
            className={`w-full text-left p-3 rounded-lg border transition-all ${
              currentFont === font.name
                ? 'border-blue-400 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className={font.class}>
              <div className="font-medium text-sm">{font.name}</div>
              <div className="text-xs text-gray-600">{font.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
