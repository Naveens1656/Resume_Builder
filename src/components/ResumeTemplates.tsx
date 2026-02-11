import { ResumeData } from './ResumeBuilder';
import { FileText } from 'lucide-react';

interface ResumeTemplatesProps {
  onSelectTemplate: (data: ResumeData) => void;
  onClose: () => void;
}

export function ResumeTemplates({ onSelectTemplate, onClose }: ResumeTemplatesProps) {
  const templates: Array<{ name: string; description: string; data: Partial<ResumeData> }> = [
    {
      name: 'Software Engineer',
      description: 'For tech and engineering roles',
      data: {
        contact: {
          fullName: 'Alex Johnson',
          email: 'alex.johnson@email.com',
          phone: '(555) 123-4567',
          location: 'San Francisco, CA',
          linkedin: 'linkedin.com/in/alexjohnson',
          website: 'alexjohnson.dev',
        },
        summary: 'Results-driven Software Engineer with 5+ years of experience building scalable web applications. Proven track record of reducing load times by 40% and increasing user engagement by 65%. Expertise in React, Node.js, and cloud architecture.',
        experience: [
          {
            id: 'exp-1',
            title: 'Senior Software Engineer',
            company: 'Tech Innovations Inc.',
            location: 'San Francisco, CA',
            startDate: '2021-03',
            endDate: '',
            current: true,
            achievements: [
              'Architected and deployed microservices infrastructure serving 2M+ users, reducing server costs by 35%',
              'Led team of 6 developers in building real-time collaboration features, increasing user engagement by 65%',
              'Optimized database queries and implemented caching strategies, reducing page load times by 40%',
              'Mentored 4 junior developers and established code review best practices across the engineering team',
            ],
          },
          {
            id: 'exp-2',
            title: 'Software Engineer',
            company: 'StartupXYZ',
            location: 'San Francisco, CA',
            startDate: '2019-01',
            endDate: '2021-02',
            current: false,
            achievements: [
              'Developed RESTful APIs and integrated third-party services, enabling 50+ partner integrations',
              'Implemented CI/CD pipeline using Jenkins and Docker, reducing deployment time from 2 hours to 15 minutes',
              'Built responsive front-end components using React and TypeScript, improving mobile user satisfaction by 45%',
            ],
          },
        ],
        education: [
          {
            id: 'edu-1',
            degree: 'Bachelor of Science in Computer Science',
            institution: 'Stanford University',
            location: 'Stanford, CA',
            graduationDate: '2018-06',
            gpa: '3.8',
            honors: 'Magna Cum Laude',
          },
        ],
        skills: {
          technical: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'Docker', 'MongoDB', 'PostgreSQL', 'Git'],
          soft: ['Leadership', 'Problem Solving', 'Team Collaboration', 'Agile/Scrum', 'Code Review'],
          certifications: ['AWS Certified Solutions Architect', 'Google Cloud Professional'],
        },
      },
    },
    {
      name: 'Marketing Manager',
      description: 'For marketing and communications roles',
      data: {
        contact: {
          fullName: 'Sarah Williams',
          email: 'sarah.williams@email.com',
          phone: '(555) 987-6543',
          location: 'New York, NY',
          linkedin: 'linkedin.com/in/sarahwilliams',
        },
        summary: 'Strategic Marketing Manager with 7+ years driving brand growth and customer acquisition. Expertise in digital marketing, content strategy, and data-driven campaigns. Proven success increasing ROI by 250% and growing market share by 18%.',
        experience: [
          {
            id: 'exp-1',
            title: 'Marketing Manager',
            company: 'Global Brands Corp',
            location: 'New York, NY',
            startDate: '2020-06',
            endDate: '',
            current: true,
            achievements: [
              'Developed and executed multi-channel marketing campaigns generating $5.2M in revenue, 250% ROI',
              'Managed $800K annual marketing budget and team of 8, delivering all projects on time and under budget',
              'Launched influencer partnership program reaching 12M impressions and increasing brand awareness by 45%',
              'Implemented marketing automation system reducing lead nurturing time by 60% and increasing conversions by 32%',
            ],
          },
          {
            id: 'exp-2',
            title: 'Digital Marketing Specialist',
            company: 'Creative Agency LLC',
            location: 'New York, NY',
            startDate: '2017-03',
            endDate: '2020-05',
            current: false,
            achievements: [
              'Created content strategy increasing organic traffic by 180% and reducing customer acquisition cost by 35%',
              'Managed Google Ads and Facebook campaigns with average CTR of 4.2%, exceeding industry benchmark by 75%',
              'Built email marketing program with 28% open rate and 6.5% conversion rate, generating $450K in sales',
            ],
          },
        ],
        education: [
          {
            id: 'edu-1',
            degree: 'Bachelor of Arts in Marketing',
            institution: 'New York University',
            location: 'New York, NY',
            graduationDate: '2017-05',
            gpa: '3.7',
          },
        ],
        skills: {
          technical: ['Google Analytics', 'HubSpot', 'Salesforce', 'SEO/SEM', 'Adobe Creative Suite', 'WordPress', 'Mailchimp'],
          soft: ['Strategic Planning', 'Team Leadership', 'Data Analysis', 'Communication', 'Project Management'],
          certifications: ['Google Analytics Certified', 'HubSpot Inbound Marketing', 'Facebook Blueprint'],
        },
      },
    },
    {
      name: 'Project Manager',
      description: 'For project management and operations roles',
      data: {
        contact: {
          fullName: 'Michael Chen',
          email: 'michael.chen@email.com',
          phone: '(555) 456-7890',
          location: 'Seattle, WA',
          linkedin: 'linkedin.com/in/michaelchen',
        },
        summary: 'Accomplished Project Manager with PMP certification and 8+ years delivering complex projects on time and within budget. Expert in Agile methodologies, stakeholder management, and cross-functional team leadership. Track record of managing $10M+ portfolios with 98% on-time delivery.',
        experience: [
          {
            id: 'exp-1',
            title: 'Senior Project Manager',
            company: 'Enterprise Solutions Inc.',
            location: 'Seattle, WA',
            startDate: '2019-08',
            endDate: '',
            current: true,
            achievements: [
              'Led portfolio of 12 concurrent projects worth $15M, achieving 98% on-time delivery and 15% under budget',
              'Managed cross-functional teams of 25+ members across engineering, design, and operations departments',
              'Implemented Agile transformation reducing project cycle time by 40% and increasing team velocity by 55%',
              'Developed risk management framework preventing $2.3M in potential project overruns',
              'Secured $3.5M in additional funding through executive presentations and stakeholder alignment',
            ],
          },
          {
            id: 'exp-2',
            title: 'Project Manager',
            company: 'Tech Consulting Group',
            location: 'Seattle, WA',
            startDate: '2016-01',
            endDate: '2019-07',
            current: false,
            achievements: [
              'Managed enterprise software implementation for Fortune 500 clients, delivering $8M in project value',
              'Coordinated 40+ stakeholders across 6 time zones, maintaining 92% satisfaction score',
              'Streamlined project processes reducing administrative overhead by 30% and improving team productivity',
            ],
          },
        ],
        education: [
          {
            id: 'edu-1',
            degree: 'Master of Business Administration (MBA)',
            institution: 'University of Washington',
            location: 'Seattle, WA',
            graduationDate: '2015-06',
          },
          {
            id: 'edu-2',
            degree: 'Bachelor of Science in Industrial Engineering',
            institution: 'University of California, Berkeley',
            location: 'Berkeley, CA',
            graduationDate: '2013-05',
            gpa: '3.6',
          },
        ],
        skills: {
          technical: ['Jira', 'MS Project', 'Asana', 'Confluence', 'Tableau', 'Excel', 'PowerBI'],
          soft: ['Leadership', 'Stakeholder Management', 'Risk Management', 'Communication', 'Problem Solving', 'Negotiation'],
          certifications: ['PMP (Project Management Professional)', 'Certified Scrum Master (CSM)', 'Six Sigma Green Belt'],
        },
      },
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-blue-600" />
            <div>
              <h2 className="text-2xl">Resume Templates</h2>
              <p className="text-sm text-gray-600">Start with a professional template</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {templates.map((template, index) => (
              <div key={index} className="border-2 rounded-lg p-6 hover:border-blue-400 transition-all">
                <div className="mb-4">
                  <h3 className="text-xl mb-2">{template.name}</h3>
                  <p className="text-sm text-gray-600">{template.description}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Experience:</span>
                    <span className="font-medium">{template.data.experience?.length || 0} positions</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Education:</span>
                    <span className="font-medium">{template.data.education?.length || 0} entries</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Skills:</span>
                    <span className="font-medium">
                      {(template.data.skills?.technical?.length || 0) + 
                       (template.data.skills?.soft?.length || 0)} skills
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onSelectTemplate({
                      template: 'professional',
                      ...template.data,
                    } as ResumeData);
                    onClose();
                  }}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Use This Template
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Note:</strong> These templates are pre-filled examples. All information will be replaced with your own details. Use them as a starting point and customize to match your experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
