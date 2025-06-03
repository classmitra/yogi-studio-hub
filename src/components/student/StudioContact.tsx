
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, Globe } from 'lucide-react';

interface StudioContactProps {
  instructor: any;
}

const StudioContact = ({ instructor }: StudioContactProps) => {
  if (!instructor?.contact_email && !instructor?.contact_phone && !instructor?.website_url) {
    return null;
  }

  return (
    <section id="contact-section" className="py-32 px-8 section-white" data-section="white">
      <div className="max-w-4xl mx-auto text-center">
        <div className="fade-in-minimal mb-20">
          <h2 className="text-6xl md:text-7xl font-dongle font-normal text-black mb-8 leading-none">
            Get in
            <br />
            <span className="text-4xl md:text-5xl opacity-60">Touch</span>
          </h2>
          <p className="text-lg text-black/70 leading-relaxed font-light tracking-wide">
            Questions about classes? Want to learn more? We'd love to hear from you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {instructor?.contact_email && (
            <Card 
              className="border border-black/10 bg-white minimal-hover cursor-pointer stagger-in" 
              onClick={() => window.location.href = `mailto:${instructor.contact_email}`}
              style={{ animationDelay: '0s' }}
            >
              <CardContent className="p-12 text-center">
                <div className="w-12 h-12 border border-black/20 flex items-center justify-center mx-auto mb-8 breathe-minimal">
                  <Mail className="h-6 w-6 text-black/60" />
                </div>
                <h3 className="font-dongle text-2xl font-normal text-black mb-4 tracking-wide">Email</h3>
                <p className="text-black/70 text-sm font-light tracking-wide">{instructor.contact_email}</p>
              </CardContent>
            </Card>
          )}
          
          {instructor?.contact_phone && (
            <Card 
              className="border border-black/10 bg-white minimal-hover cursor-pointer stagger-in" 
              onClick={() => window.location.href = `tel:${instructor.contact_phone}`}
              style={{ animationDelay: '0.1s' }}
            >
              <CardContent className="p-12 text-center">
                <div className="w-12 h-12 border border-black/20 flex items-center justify-center mx-auto mb-8 breathe-minimal">
                  <Phone className="h-6 w-6 text-black/60" />
                </div>
                <h3 className="font-dongle text-2xl font-normal text-black mb-4 tracking-wide">Phone</h3>
                <p className="text-black/70 text-sm font-light tracking-wide">{instructor.contact_phone}</p>
              </CardContent>
            </Card>
          )}
          
          {instructor?.website_url && (
            <Card 
              className="border border-black/10 bg-white minimal-hover cursor-pointer stagger-in" 
              onClick={() => window.open(instructor.website_url, '_blank')}
              style={{ animationDelay: '0.2s' }}
            >
              <CardContent className="p-12 text-center">
                <div className="w-12 h-12 border border-black/20 flex items-center justify-center mx-auto mb-8 breathe-minimal">
                  <Globe className="h-6 w-6 text-black/60" />
                </div>
                <h3 className="font-dongle text-2xl font-normal text-black mb-4 tracking-wide">Website</h3>
                <p className="text-black/70 text-sm font-light tracking-wide">{instructor.website_url}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default StudioContact;
