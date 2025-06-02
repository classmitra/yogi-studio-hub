
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, Star, MapPin, Mail, Phone, Globe, Instagram, Facebook, Youtube, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import PublicClassCard from './PublicClassCard';

interface StudioWebsiteProps {
  instructor: any;
  subdomain: string;
  classes: any[];
  onBookClass: (classItem: any) => void;
}

const StudioWebsite = ({ instructor, subdomain, classes, onBookClass }: StudioWebsiteProps) => {
  const scrollToClasses = () => {
    document.getElementById('classes-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yoga-50 to-ocean-50">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-64 h-64 rounded-full overflow-hidden shadow-2xl border-8 border-white">
                <img
                  src={instructor?.profile_image_url || "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face"}
                  alt={instructor?.studio_name || subdomain}
                  className="w-full h-full object-cover"
                />
              </div>
              <div 
                className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-4 border-white"
                style={{ backgroundColor: instructor?.brand_color || '#008cb4' }}
              >
                <Star className="h-8 w-8 text-white" />
              </div>
            </div>

            {/* Studio Info */}
            <div className="flex-1 text-center lg:text-left">
              <h1 
                className="text-5xl lg:text-6xl font-bold mb-6"
                style={{ color: instructor?.brand_color || '#008cb4' }}
              >
                {instructor?.studio_name || subdomain}
              </h1>
              
              {instructor?.bio && (
                <p className="text-xl text-gray-700 leading-relaxed mb-8 max-w-3xl">
                  {instructor.bio}
                </p>
              )}

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
                <Badge variant="secondary" className="text-sm px-4 py-2">
                  <MapPin className="h-4 w-4 mr-2" />
                  Online Classes
                </Badge>
                <Badge variant="secondary" className="text-sm px-4 py-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  {classes.length} Classes Available
                </Badge>
                <Badge variant="secondary" className="text-sm px-4 py-2">
                  <Globe className="h-4 w-4 mr-2" />
                  {subdomain}.yogastudio.app
                </Badge>
              </div>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Button 
                  onClick={scrollToClasses}
                  size="lg"
                  className="px-8 py-3 text-lg font-semibold"
                  style={{ backgroundColor: instructor?.brand_color || '#008cb4' }}
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  View Classes & Book
                </Button>
                
                {instructor?.contact_email && (
                  <Button variant="outline" size="lg" className="px-8 py-3">
                    <Mail className="h-5 w-5 mr-2" />
                    Contact
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">About Our Studio</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Welcome to {instructor?.studio_name || subdomain}, where we believe yoga is for everyone. 
                Our online classes provide a safe, inclusive space for students of all levels to explore 
                the transformative power of yoga from the comfort of their own homes.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                {instructor?.bio || "Join our community and discover the joy of yoga through expert guidance, mindful movement, and supportive community connection."}
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop"
                alt="Yoga practice"
                className="rounded-lg shadow-xl w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      {(instructor?.contact_email || instructor?.contact_phone || instructor?.website_url) && (
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Get In Touch</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {instructor?.contact_email && (
                <Card>
                  <CardContent className="p-6 text-center">
                    <Mail className="h-12 w-12 mx-auto mb-4 text-yoga-500" />
                    <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                    <p className="text-gray-600">{instructor.contact_email}</p>
                  </CardContent>
                </Card>
              )}
              
              {instructor?.contact_phone && (
                <Card>
                  <CardContent className="p-6 text-center">
                    <Phone className="h-12 w-12 mx-auto mb-4 text-yoga-500" />
                    <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
                    <p className="text-gray-600">{instructor.contact_phone}</p>
                  </CardContent>
                </Card>
              )}
              
              {instructor?.website_url && (
                <Card>
                  <CardContent className="p-6 text-center">
                    <Globe className="h-12 w-12 mx-auto mb-4 text-yoga-500" />
                    <h3 className="font-semibold text-gray-900 mb-2">Website</h3>
                    <p className="text-gray-600">{instructor.website_url}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Classes Section */}
      <section id="classes-section" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Available Classes</h2>
            <p className="text-xl text-gray-600">Choose from our selection of yoga classes and start your journey</p>
          </div>
          
          {classes.length === 0 ? (
            <Card className="bg-white shadow-lg">
              <CardContent className="text-center py-16">
                <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">No Classes Scheduled</h3>
                <p className="text-gray-600 text-lg mb-6">Check back soon for upcoming classes or contact the studio directly.</p>
                {instructor?.contact_email && (
                  <Button variant="outline" size="lg">
                    <Mail className="h-5 w-5 mr-2" />
                    Contact for Class Information
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {classes.map((classItem) => (
                <PublicClassCard
                  key={classItem.id}
                  classItem={classItem}
                  instructor={instructor}
                  onBookNow={onBookClass}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Social Media Section */}
      {(instructor?.social_instagram || instructor?.social_facebook || instructor?.social_youtube) && (
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Follow Us</h2>
            <div className="flex justify-center space-x-6">
              {instructor?.social_instagram && (
                <a 
                  href={instructor.social_instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-4 bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full hover:scale-110 transition-transform"
                >
                  <Instagram className="h-6 w-6" />
                </a>
              )}
              
              {instructor?.social_facebook && (
                <a 
                  href={instructor.social_facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-4 bg-blue-600 text-white rounded-full hover:scale-110 transition-transform"
                >
                  <Facebook className="h-6 w-6" />
                </a>
              )}
              
              {instructor?.social_youtube && (
                <a 
                  href={instructor.social_youtube} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-4 bg-red-600 text-white rounded-full hover:scale-110 transition-transform"
                >
                  <Youtube className="h-6 w-6" />
                </a>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default StudioWebsite;
