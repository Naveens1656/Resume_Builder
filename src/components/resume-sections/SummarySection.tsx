import { FileText, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface SummarySectionProps {
  summary: string;
  onUpdate: (summary: string) => void;
}

export function SummarySection({ summary, onUpdate }: SummarySectionProps) {
  const [showTips, setShowTips] = useState(false);

  const summaryTemplates = [
    "Results-driven [Job Title] with [X] years of experience in [Industry/Field]. Proven track record of [Key Achievement]. Expertise in [Skills/Tools].",
    "Accomplished [Job Title] specializing in [Specialization]. Demonstrated success in [Achievement 1] and [Achievement 2]. Strong background in [Skills].",
    "Strategic [Job Title] with expertise in [Area]. Known for [Unique Value Proposition]. Skilled in [Key Skills] with a focus on [Business Impact].",
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Professional Summary
        </h2>
        <button
          onClick={() => setShowTips(!showTips)}
          className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          <Sparkles className="w-4 h-4" />
          {showTips ? 'Hide' : 'Show'} Templates
        </button>
      </div>

      {showTips && (
        <div className="mb-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <h3 className="text-sm font-medium mb-2">Summary Templates:</h3>
          <div className="space-y-2">
            {summaryTemplates.map((template, index) => (
              <button
                key={index}
                onClick={() => onUpdate(template)}
                className="w-full text-left text-xs p-2 bg-white rounded border hover:border-amber-400 transition-colors"
              >
                {template}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-600 mt-3">
            💡 Replace [bracketed text] with your specific details
          </p>
        </div>
      )}

      <textarea
        value={summary}
        onChange={(e) => onUpdate(e.target.value)}
        placeholder="Write a compelling 2-3 sentence summary highlighting your expertise, achievements, and value proposition..."
        rows={4}
        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

      <div className="mt-3 flex items-start gap-2 text-xs text-gray-600">
        <span className="font-medium">Tip:</span>
        <span>Focus on measurable achievements and unique value. Avoid generic phrases like "hard worker" or "team player".</span>
      </div>
    </div>
  );
}
