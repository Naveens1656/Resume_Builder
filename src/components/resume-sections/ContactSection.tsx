import { User, Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface ContactSectionProps {
  contact: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    website?: string;
  };
  onUpdate: (contact: any) => void;
}

export function ContactSection({ contact, onUpdate }: ContactSectionProps) {
  const handleChange = (field: string, value: string) => {
    onUpdate({ ...contact, [field]: value });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl mb-4 flex items-center gap-2">
        <User className="w-5 h-5" />
        Contact Information
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">Full Name *</label>
          <input
            type="text"
            value={contact.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="John Doe"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email *
          </label>
          <input
            type="email"
            value={contact.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="john.doe@email.com"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Phone *
          </label>
          <input
            type="tel"
            value={contact.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="(555) 123-4567"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Location *
          </label>
          <input
            type="text"
            value={contact.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="New York, NY"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
            <Linkedin className="w-4 h-4" />
            LinkedIn (optional)
          </label>
          <input
            type="url"
            value={contact.linkedin || ''}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            placeholder="linkedin.com/in/johndoe"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Website/Portfolio (optional)
          </label>
          <input
            type="url"
            value={contact.website || ''}
            onChange={(e) => handleChange('website', e.target.value)}
            placeholder="www.johndoe.com"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
