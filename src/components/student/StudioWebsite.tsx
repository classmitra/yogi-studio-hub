
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, Star, MapPin, Mail, Phone, Globe, Instagram, Facebook, Youtube, ArrowLeft, Home, ChevronDown, Minus, Plus, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import PublicClassCard from './PublicClassCard';
import { useScrollAnimations } from '@/hooks/useScrollAnimations';

interface StudioWebsiteProps {
  instructor: any;
  subdomain: string;
  classes: any[];
  onBookClass: (classItem: any) => void;
}

const StudioWebsite = ({ instructor, subdomain, classes, onBookClass }: StudioWebsiteProps) => {
  const navigate = useNavigate();
  useScrollAnimations();

  const scrollToClasses = () => {
    document.getElementById('classes-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Scroll Progress */}
      <div className="scroll-progress-minimal"></div>

      {/* Sticky Navigation Bar */}
      <nav className="sticky-nav-minimal">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="border border-black bg-transparent text-black hover:bg-black hover:text-white transition-all duration-300 font-light"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/')}
                className="border border-black bg-transparent text-black hover:bg-black hover:text-white transition-all duration-300 font-light"
              >
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </div>
            
            <div className="flex items-center space-x-12">
              <button 
                onClick={scrollToAbout}
                className="text-black hover:opacity-60 transition-opacity duration-300 text-sm tracking-wide font-light"
              >
                About
              </button>
              <button 
                onClick={scrollToClasses}
                className="text-black hover:opacity-60 transition-opacity duration-300 text-sm tracking-wide font-light"
              >
                Classes
              </button>
              {(instructor?.contact_email || instructor?.contact_phone) && (
                <button 
                  onClick={scrollToContact}
                  className="text-black hover:opacity-60 transition-opacity duration-300 text-sm tracking-wide font-light"
                >
                  Connect
                </button>
              )}
              <Button 
                onClick={scrollToClasses}
                size="sm"
                className="minimal-button h-10 px-6 font-light tracking-wide"
              >
                Book Experience
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-32 px-8 min-h-screen flex items-center section-white" data-section="white">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-32 right-32 w-1 h-48 bg-black/5 parallax-slow"></div>
          <div className="absolute bottom-40 left-32 w-1 h-32 bg-black/10 parallax-medium"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-px h-96 bg-gradient-to-b from-transparent via-black/5 to-transparent parallax-fast"></div>
        </div>

        {/* Minimal geometric elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-40 left-1/4 w-1 h-1 bg-black breathe-minimal"></div>
          <div className="absolute bottom-40 right-1/3 w-1 h-1 bg-black gentle-fade"></div>
          <div className="absolute top-2/3 right-1/4 w-px h-24 bg-black/20 float-minimal"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            {/* Profile Section */}
            <div className="relative fade-in-minimal">
              <div className="relative">
                <div className="w-80 h-80 border border-black/20 overflow-hidden">
                  <img
                    src={instructor?.profile_image_url || "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face"}
                    alt={instructor?.studio_name || subdomain}
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-12 h-12 border border-black bg-white flex items-center justify-center breathe-minimal">
                  <Star className="h-6 w-6 text-black" />
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-2 -left-2 w-2 h-2 border border-black/30 float-minimal"></div>
                <div className="absolute -bottom-6 left-12 w-1 h-1 bg-black/40 gentle-fade"></div>
              </div>
            </div>

            {/* Studio Info */}
            <div className="flex-1 text-center lg:text-left slide-up-minimal">
              <div className="mb-8">
                <Badge variant="secondary" className="bg-transparent border border-black text-black mb-6 font-light tracking-wide">
                  <Minus className="h-3 w-3 mr-2" />
                  Sacred Practice Space
                  <Minus className="h-3 w-3 ml-2" />
                </Badge>
              </div>
              
              <h1 className="text-8xl lg:text-9xl font-dongle font-normal text-black mb-12 leading-none tracking-tight">
                {instructor?.studio_name || subdomain}
              </h1>
              
              {instructor?.bio && (
                <p className="text-xl text-black/70 leading-relaxed mb-12 max-w-2xl font-light tracking-wide">
                  {instructor.bio}
                </p>
              )}

              <div className="flex flex-wrap gap-6 justify-center lg:justify-start mb-12">
                <Badge variant="secondary" className="text-sm px-6 py-3 bg-transparent border border-black/20 text-black/70 font-light tracking-wide">
                  <MapPin className="h-4 w-4 mr-2" />
                  Online Space
                </Badge>
                <Badge variant="secondary" className="text-sm px-6 py-3 bg-transparent border border-black/20 text-black/70 font-light tracking-wide">
                  <Calendar className="h-4 w-4 mr-2" />
                  {classes.length} Experiences
                </Badge>
                <Badge variant="secondary" className="text-sm px-6 py-3 bg-transparent border border-black/20 text-black/70 font-light tracking-wide">
                  <Globe className="h-4 w-4 mr-2" />
                  {subdomain}.yogastudio.app
                </Badge>
              </div>

              <div className="flex flex-wrap gap-8 justify-center lg:justify-start">
                <Button 
                  onClick={scrollToClasses}
                  size="lg"
                  className="minimal-button h-14 px-10 text-lg font-light tracking-wide"
                >
                  <Calendar className="h-5 w-5 mr-3" />
                  Explore Experiences
                </Button>
                
                {instructor?.contact_email && (
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border border-black bg-transparent text-black hover:bg-black hover:text-white h-14 px-10 text-lg font-light tracking-wide transition-all duration-500"
                    onClick={scrollToContact}
                  >
                    <Mail className="h-5 w-5 mr-3" />
                    Connect
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 cursor-pointer fade-in-minimal" style={{ animationDelay: '0.8s' }} onClick={scrollToClasses}>
            <div className="flex flex-col items-center text-black/60 hover:text-black transition-colors duration-300">
              <div className="w-px h-12 bg-black/30 mb-4"></div>
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about-section" className="py-32 px-8 section-off-white" data-section="off-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="fade-in-minimal">
              <h2 className="text-6xl md:text-7xl font-dongle font-normal text-black mb-12 leading-none">
                Our Sacred
                <br />
                <span className="text-4xl md:text-5xl opacity-60">Practice</span>
              </h2>
              <p className="text-lg text-black/70 leading-relaxed mb-8 font-light tracking-wide">
                Welcome to {instructor?.studio_name || subdomain}, where ancient wisdom meets mindful presence. 
                Our digital sanctuary provides a nurturing space for students of all paths to explore 
                the transformative journey of yoga.
              </p>
              <p className="text-lg text-black/70 leading-relaxed mb-12 font-light tracking-wide">
                {instructor?.bio || "Join our mindful community and discover the profound joy of yoga through expert guidance, conscious movement, and heartfelt connection."}
              </p>
              
              {/* Sacred Principles */}
              <div className="grid grid-cols-2 gap-8">
                {[
                  { icon: Users, text: "All Souls Welcome" },
                  { icon: Clock, text: "Sacred Timing" },
                  { icon: Star, text: "Mindful Guidance" },
                  { icon: Globe, text: "Global Community" }
                ].map((principle, index) => (
                  <div key={index} className="flex items-center space-x-4 stagger-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="w-8 h-8 border border-black/20 flex items-center justify-center">
                      <principle.icon className="h-4 w-4 text-black/60" />
                    </div>
                    <span className="text-black/80 font-light text-sm tracking-wide">{principle.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative slide-up-minimal">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop"
                  alt="Sacred yoga practice"
                  className="w-full h-96 object-cover grayscale border border-black/10"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-3 -right-3 w-3 h-3 border border-black/30 float-minimal"></div>
              <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-black/40 gentle-fade"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Classes Section */}
      <section id="classes-section" className="py-32 px-8 section-light-gray" data-section="light-gray">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24 fade-in-minimal">
            <h2 className="text-6xl md:text-7xl font-dongle font-normal text-black mb-8 leading-none">
              Sacred
              <br />
              <span className="text-4xl md:text-5xl opacity-60">Experiences</span>
            </h2>
            <p className="text-lg text-black/70 max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
              Choose from our mindfully crafted yoga experiences and begin your transformative journey
            </p>
          </div>
          
          {classes.length === 0 ? (
            <Card className="border border-black/10 bg-white slide-up-minimal">
              <CardContent className="text-center py-24">
                <div className="mb-12">
                  <div className="w-16 h-16 border border-black/20 flex items-center justify-center mx-auto mb-8">
                    <Calendar className="h-8 w-8 text-black/60" />
                  </div>
                </div>
                <h3 className="text-4xl font-dongle font-normal text-black mb-6">Sacred Pause</h3>
                <p className="text-black/70 text-lg mb-12 max-w-md mx-auto leading-relaxed font-light tracking-wide">
                  New experiences are being lovingly prepared. Return soon for upcoming sacred sessions.
                </p>
                {instructor?.contact_email && (
                  <Button 
                    variant="outline" 
                    size="lg" 
                    onClick={scrollToContact}
                    className="border border-black bg-transparent text-black hover:bg-black hover:text-white px-8 py-4 text-lg font-light tracking-wide transition-all duration-500"
                  >
                    <Mail className="h-5 w-5 mr-2" />
                    Connect for Updates
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {classes.map((classItem, index) => (
                <div 
                  key={classItem.id} 
                  className="stagger-in" 
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Card className="border border-black/10 bg-white minimal-hover">
                    <CardContent className="p-8">
                      <div className="mb-6">
                        <Badge variant="secondary" className="bg-transparent border border-black/20 text-black/70 font-light text-xs tracking-wide">
                          {classItem.category}
                        </Badge>
                      </div>
                      <h3 className="text-2xl font-dongle font-normal text-black mb-4 tracking-wide">{classItem.title}</h3>
                      <p className="text-black/70 text-sm mb-6 font-light tracking-wide leading-relaxed">{classItem.description}</p>
                      
                      <div className="space-y-3 mb-8">
                        <div className="flex items-center text-sm text-black/60 font-light tracking-wide">
                          <Clock className="h-4 w-4 mr-3" />
                          {classItem.duration_minutes} minutes
                        </div>
                        <div className="flex items-center text-sm text-black/60 font-light tracking-wide">
                          <Users className="h-4 w-4 mr-3" />
                          {classItem.max_students} students max
                        </div>
                        <div className="flex items-center text-sm text-black/60 font-light tracking-wide">
                          <Calendar className="h-4 w-4 mr-3" />
                          {format(new Date(classItem.start_date), 'MMM dd, yyyy')}
                        </div>
                      </div>
                      
                      <Button 
                        onClick={() => onBookClass(classItem)}
                        className="w-full minimal-button h-12 font-light tracking-wide"
                      >
                        Book Experience
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      {(instructor?.contact_email || instructor?.contact_phone || instructor?.website_url) && (
        <section id="contact-section" className="py-32 px-8 section-white" data-section="white">
          <div className="max-w-4xl mx-auto text-center">
            <div className="fade-in-minimal mb-20">
              <h2 className="text-6xl md:text-7xl font-dongle font-normal text-black mb-8 leading-none">
                Sacred
                <br />
                <span className="text-4xl md:text-5xl opacity-60">Connection</span>
              </h2>
              <p className="text-lg text-black/70 leading-relaxed font-light tracking-wide">
                Reach out and let's begin this beautiful journey together
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
                    <h3 className="font-dongle text-2xl font-normal text-black mb-4 tracking-wide">Sacred Messages</h3>
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
                    <h3 className="font-dongle text-2xl font-normal text-black mb-4 tracking-wide">Voice Connection</h3>
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
                    <h3 className="font-dongle text-2xl font-normal text-black mb-4 tracking-wide">Digital Home</h3>
                    <p className="text-black/70 text-sm font-light tracking-wide">{instructor.website_url}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Social Media Section */}
      {(instructor?.social_instagram || instructor?.social_facebook || instructor?.social_youtube) && (
        <section className="py-32 px-8 section-off-white" data-section="off-white">
          <div className="max-w-4xl mx-auto text-center">
            <div className="fade-in-minimal mb-20">
              <h2 className="text-6xl md:text-7xl font-dongle font-normal text-black mb-8 leading-none">
                Join Our
                <br />
                <span className="text-4xl md:text-5xl opacity-60">Sacred Circle</span>
              </h2>
              <p className="text-lg text-black/70 font-light tracking-wide">
                Connect with our mindful community across the digital realm
              </p>
            </div>
            
            <div className="flex justify-center space-x-12 fade-in-minimal" style={{ animationDelay: '0.2s' }}>
              {instructor?.social_instagram && (
                <a 
                  href={instructor.social_instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-16 h-16 border border-black bg-white flex items-center justify-center hover:bg-black hover:text-white transition-all duration-500 minimal-hover"
                >
                  <Instagram className="h-6 w-6" />
                </a>
              )}
              
              {instructor?.social_facebook && (
                <a 
                  href={instructor.social_facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-16 h-16 border border-black bg-white flex items-center justify-center hover:bg-black hover:text-white transition-all duration-500 minimal-hover"
                >
                  <Facebook className="h-6 w-6" />
                </a>
              )}
              
              {instructor?.social_youtube && (
                <a 
                  href={instructor.social_youtube} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-16 h-16 border border-black bg-white flex items-center justify-center hover:bg-black hover:text-white transition-all duration-500 minimal-hover"
                >
                  <Youtube className="h-6 w-6" />
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-black text-white py-24 px-8 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-1 h-32 bg-white/5 parallax-slow"></div>
          <div className="absolute bottom-20 right-20 w-1 h-24 bg-white/10 parallax-medium"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="fade-in-minimal">
            <h3 className="text-5xl md:text-6xl font-dongle font-normal mb-8 leading-none">{instructor?.studio_name || subdomain}</h3>
            <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
              Where sacred practice meets mindful technology, creating ripples of peace across the world.
            </p>
            
            <div className="flex justify-center space-x-8 mb-12">
              <Button
                variant="outline"
                onClick={() => navigate('/dashboard')}
                className="border border-white bg-transparent text-white hover:bg-white hover:text-black transition-all duration-500 font-light tracking-wide"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Return to Dashboard
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="border border-white bg-transparent text-white hover:bg-white hover:text-black transition-all duration-500 font-light tracking-wide"
              >
                <Home className="h-4 w-4 mr-2" />
                Sacred Home
              </Button>
            </div>
            
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="w-1 h-1 bg-white/40"></div>
              <div className="w-1 h-1 bg-white/40"></div>
              <div className="w-1 h-1 bg-white/40"></div>
            </div>
            
            <p className="text-white/50 text-xs tracking-widest uppercase">
              Made with intention • {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StudioWebsite;
