import { X, Lightbulb, TrendingUp, Target, Users, Zap } from 'lucide-react';

interface ActionVerbHelperProps {
  onClose: () => void;
}

export function ActionVerbHelper({ onClose }: ActionVerbHelperProps) {
  const verbCategories = [
    {
      category: 'Leadership',
      icon: Users,
      color: 'text-blue-600',
      verbs: [
        'Directed', 'Managed', 'Led', 'Supervised', 'Coordinated', 'Spearheaded',
        'Orchestrated', 'Championed', 'Mentored', 'Guided', 'Delegated', 'Mobilized'
      ]
    },
    {
      category: 'Achievement',
      icon: Target,
      color: 'text-green-600',
      verbs: [
        'Achieved', 'Exceeded', 'Surpassed', 'Accomplished', 'Delivered', 'Attained',
        'Generated', 'Boosted', 'Maximized', 'Expanded', 'Secured', 'Won'
      ]
    },
    {
      category: 'Improvement',
      icon: TrendingUp,
      color: 'text-purple-600',
      verbs: [
        'Improved', 'Enhanced', 'Optimized', 'Streamlined', 'Increased', 'Reduced',
        'Transformed', 'Modernized', 'Upgraded', 'Revitalized', 'Strengthened', 'Refined'
      ]
    },
    {
      category: 'Innovation',
      icon: Zap,
      color: 'text-amber-600',
      verbs: [
        'Pioneered', 'Developed', 'Designed', 'Created', 'Launched', 'Initiated',
        'Implemented', 'Established', 'Introduced', 'Formulated', 'Engineered', 'Invented'
      ]
    }
  ];

  const quantificationExamples = [
    { weak: 'Improved sales', strong: 'Increased sales by 35% ($2.3M revenue)' },
    { weak: 'Managed a team', strong: 'Led team of 12 developers across 3 projects' },
    { weak: 'Reduced costs', strong: 'Cut operational costs by $450K annually (18% reduction)' },
    { weak: 'Handled customer service', strong: 'Resolved 200+ support tickets weekly with 98% satisfaction' },
    { weak: 'Made process better', strong: 'Streamlined onboarding, reducing time-to-productivity by 40%' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Lightbulb className="w-6 h-6 text-amber-500" />
            <div>
              <h2 className="text-2xl">Resume Writing Guide</h2>
              <p className="text-sm text-gray-600">Make your resume stand out with powerful language</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Action Verbs */}
          <div>
            <h3 className="text-xl mb-4">Power Action Verbs by Category</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {verbCategories.map(({ category, icon: Icon, color, verbs }) => (
                <div key={category} className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className={`w-5 h-5 ${color}`} />
                    <h4 className="font-semibold">{category}</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {verbs.map(verb => (
                      <span
                        key={verb}
                        onClick={() => {
                          navigator.clipboard.writeText(verb);
                        }}
                        className="px-2 py-1 bg-gray-100 hover:bg-blue-100 rounded text-sm cursor-pointer transition-colors"
                        title="Click to copy"
                      >
                        {verb}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quantification Examples */}
          <div>
            <h3 className="text-xl mb-4">Transform Weak Bullets into Strong Achievements</h3>
            <div className="space-y-3">
              {quantificationExamples.map((example, index) => (
                <div key={index} className="border rounded-lg p-4 bg-gray-50">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-red-600 font-medium mb-1">❌ WEAK</div>
                      <p className="text-sm text-gray-600 line-through">{example.weak}</p>
                    </div>
                    <div>
                      <div className="text-xs text-green-600 font-medium mb-1">✅ STRONG</div>
                      <p className="text-sm font-medium">{example.strong}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold mb-3">Key Resume Writing Principles</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">1.</span>
                <span><strong>Start with action verbs:</strong> Begin each bullet with a strong verb (Achieved, Implemented, Led)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">2.</span>
                <span><strong>Quantify everything:</strong> Include numbers, percentages, dollar amounts, and timeframes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">3.</span>
                <span><strong>Show impact, not duties:</strong> Focus on what you achieved, not what you were responsible for</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">4.</span>
                <span><strong>Use industry keywords:</strong> Mirror language from the job description for ATS optimization</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">5.</span>
                <span><strong>Be concise:</strong> Keep bullets to 1-2 lines; remove unnecessary words</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">6.</span>
                <span><strong>Avoid clichés:</strong> Skip "hard worker," "team player," and other overused phrases</span>
              </li>
            </ul>
          </div>

          {/* ATS Tips */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h3 className="font-semibold mb-3">ATS (Applicant Tracking System) Optimization</h3>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-green-600 font-medium mb-2">✅ DO</div>
                <ul className="space-y-1 text-gray-700">
                  <li>• Use standard section headings</li>
                  <li>• Include relevant keywords</li>
                  <li>• Use simple formatting</li>
                  <li>• Save as .docx or .pdf</li>
                  <li>• Spell out acronyms first time</li>
                </ul>
              </div>
              <div>
                <div className="text-red-600 font-medium mb-2">❌ DON'T</div>
                <ul className="space-y-1 text-gray-700">
                  <li>• Use tables or text boxes</li>
                  <li>• Add graphics or images</li>
                  <li>• Use unusual fonts</li>
                  <li>• Include headers/footers</li>
                  <li>• Use special characters</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
