
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, Star, MapPin, Mail, Phone, Globe, Instagram, Facebook, Youtube, ArrowLeft, Home, Heart, Sparkles, Mountain, Leaf } from 'lucide-react';
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

  useEffect(() => {
    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    return () => {
      const existingBar = document.querySelector('.scroll-progress');
      if (existingBar) {
        existingBar.remove();
      }
    };
  }, []);

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
    <div className="min-h-screen wellness-gradient relative overflow-hidden">
      {/* Sticky Navigation Bar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 border-b border-white/20 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="border-earth-300 text-earth-700 hover:bg-earth-50 hover-lift"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/')}
                className="border-earth-300 text-earth-700 hover:bg-earth-50 hover-lift"
              >
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </div>
            
            <div className="flex items-center space-x-8">
              <button 
                onClick={scrollToAbout}
                className="text-earth-600 hover:text-sage-600 transition-colors font-medium"
              >
                About
              </button>
              <button 
                onClick={scrollToClasses}
                className="text-earth-600 hover:text-sage-600 transition-colors font-medium"
              >
                Classes
              </button>
              {(instructor?.contact_email || instructor?.contact_phone) && (
                <button 
                  onClick={scrollToContact}
                  className="text-earth-600 hover:text-sage-600 transition-colors font-medium"
                >
                  Connect
                </button>
              )}
              <Button 
                onClick={scrollToClasses}
                size="sm"
                className="ripple-effect hover-lift font-medium"
                style={{ backgroundColor: instructor?.brand_color || '#93a18f' }}
              >
                Book Experience
                <Heart className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Immersive Hero Section */}
      <section className="relative py-32 px-6 min-h-screen flex items-center">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-20 left-20 w-96 h-96 bg-sage-200/20 rounded-full blur-3xl float"
            data-parallax="0.3"
          ></div>
          <div 
            className="absolute bottom-32 right-32 w-64 h-64 bg-sand-200/30 rounded-full blur-3xl"
            data-parallax="0.2"
          ></div>
          <div 
            className="absolute top-1/3 right-1/4 w-32 h-32 bg-earth-200/20 rounded-full blur-2xl breathe"
            data-parallax="0.4"
          ></div>
        </div>

        {/* Nature Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <Mountain className="absolute top-32 right-1/4 h-40 w-40 text-sage-200/20 parallax-slow" />
          <Leaf className="absolute bottom-40 left-1/4 h-20 w-20 text-earth-200/30 gentle-pulse" />
          <Sparkles className="absolute top-1/2 right-1/3 h-16 w-16 text-sand-300/40 float" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Profile Section */}
            <div className="relative fade-in-left">
              <div className="relative">
                <div className="w-80 h-80 rounded-full overflow-hidden shadow-2xl border-8 border-white/80 backdrop-blur-sm">
                  <img
                    src={instructor?.profile_image_url || "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face"}
                    alt={instructor?.studio_name || subdomain}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div 
                  className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full flex items-center justify-center shadow-xl border-6 border-white breathe"
                  style={{ backgroundColor: instructor?.brand_color || '#93a18f' }}
                >
                  <Star className="h-10 w-10 text-white" />
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-sage-300/30 rounded-full blur-sm float"></div>
                <div className="absolute -bottom-8 left-8 w-8 h-8 bg-earth-300/40 rounded-full blur-sm gentle-pulse"></div>
              </div>
            </div>

            {/* Studio Info */}
            <div className="flex-1 text-center lg:text-left fade-in-right">
              <div className="mb-6">
                <Badge variant="secondary" className="bg-white/80 text-sage-700 border border-sage-200/50 backdrop-blur-sm mb-4">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Sacred Practice Space
                </Badge>
              </div>
              
              <h1 
                className="text-7xl lg:text-8xl font-cormorant font-semibold mb-8 leading-tight"
                style={{ color: instructor?.brand_color || '#93a18f' }}
              >
                {instructor?.studio_name || subdomain}
              </h1>
              
              {instructor?.bio && (
                <p className="text-2xl text-earth-700 leading-relaxed mb-10 max-w-3xl font-light">
                  {instructor.bio}
                </p>
              )}

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10">
                <Badge variant="secondary" className="text-base px-6 py-3 bg-white/70 text-earth-700 border border-earth-200/50 backdrop-blur-sm">
                  <MapPin className="h-5 w-5 mr-2" />
                  Online Sacred Space
                </Badge>
                <Badge variant="secondary" className="text-base px-6 py-3 bg-white/70 text-earth-700 border border-earth-200/50 backdrop-blur-sm">
                  <Calendar className="h-5 w-5 mr-2" />
                  {classes.length} Experiences Available
                </Badge>
                <Badge variant="secondary" className="text-base px-6 py-3 bg-white/70 text-earth-700 border border-earth-200/50 backdrop-blur-sm">
                  <Globe className="h-5 w-5 mr-2" />
                  {subdomain}.yogastudio.app
                </Badge>
              </div>

              <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
                <Button 
                  onClick={scrollToClasses}
                  size="lg"
                  className="px-10 py-4 text-xl font-medium ripple-effect hover-lift rounded-2xl"
                  style={{ backgroundColor: instructor?.brand_color || '#93a18f' }}
                >
                  <Calendar className="h-6 w-6 mr-3" />
                  Explore Experiences
                </Button>
                
                {instructor?.contact_email && (
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="px-10 py-4 text-xl border-2 border-earth-300 text-earth-700 hover:bg-earth-50 hover-lift rounded-2xl font-medium"
                    onClick={scrollToContact}
                  >
                    <Mail className="h-6 w-6 mr-3" />
                    Connect
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section with Parallax */}
      <section id="about-section" className="py-32 px-6 bg-white/80 backdrop-blur-sm relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="fade-in-left">
              <h2 className="text-5xl font-cormorant font-semibold text-earth-800 mb-8">Our Sacred Practice</h2>
              <p className="text-xl text-earth-700 leading-relaxed mb-8 font-light">
                Welcome to {instructor?.studio_name || subdomain}, where ancient wisdom meets mindful presence. 
                Our digital sanctuary provides a nurturing space for students of all paths to explore 
                the transformative journey of yoga from their sacred home space.
              </p>
              <p className="text-xl text-earth-700 leading-relaxed mb-10 font-light">
                {instructor?.bio || "Join our mindful community and discover the profound joy of yoga through expert guidance, conscious movement, and heartfelt connection."}
              </p>
              
              {/* Sacred Principles */}
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Users, text: "All Souls Welcome", color: "sage" },
                  { icon: Clock, text: "Sacred Timing", color: "earth" },
                  { icon: Star, text: "Mindful Guidance", color: "sand" },
                  { icon: Globe, text: "Global Community", color: "stone" }
                ].map((principle, index) => (
                  <div key={index} className="flex items-center space-x-3 scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className={`w-12 h-12 rounded-full bg-${principle.color}-100 flex items-center justify-center`}>
                      <principle.icon className={`h-6 w-6 text-${principle.color}-600`} />
                    </div>
                    <span className="text-earth-700 font-medium">{principle.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative fade-in-right">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop"
                  alt="Sacred yoga practice"
                  className="rounded-3xl shadow-2xl w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-earth-900/20 to-transparent rounded-3xl"></div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-sage-200/30 rounded-full blur-sm float"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-earth-200/40 rounded-full blur-sm gentle-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Classes Section with Enhanced Cards */}
      <section id="classes-section" className="py-32 px-6 sage-gradient relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 fade-in-up">
            <h2 className="text-5xl font-cormorant font-semibold text-earth-800 mb-6">Sacred Experiences</h2>
            <p className="text-xl text-earth-600 max-w-3xl mx-auto leading-relaxed">
              Choose from our mindfully crafted yoga experiences and begin your transformative journey
            </p>
          </div>
          
          {classes.length === 0 ? (
            <Card className="glass-card shadow-2xl fade-in-up">
              <CardContent className="text-center py-20">
                <div className="mb-8">
                  <div className="w-24 h-24 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Calendar className="h-12 w-12 text-sage-600" />
                  </div>
                </div>
                <h3 className="text-3xl font-cormorant font-semibold text-earth-800 mb-4">Sacred Pause</h3>
                <p className="text-earth-600 text-xl mb-8 max-w-md mx-auto leading-relaxed">
                  New experiences are being lovingly prepared. Return soon for upcoming sacred sessions.
                </p>
                {instructor?.contact_email && (
                  <Button 
                    variant="outline" 
                    size="lg" 
                    onClick={scrollToContact}
                    className="border-2 border-earth-300 text-earth-700 hover:bg-earth-50 px-8 py-4 text-lg hover-lift"
                  >
                    <Mail className="h-5 w-5 mr-2" />
                    Connect for Updates
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {classes.map((classItem, index) => (
                <div 
                  key={classItem.id} 
                  className="scale-in" 
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <PublicClassCard
                    classItem={classItem}
                    instructor={instructor}
                    onBookNow={onBookClass}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      {(instructor?.contact_email || instructor?.contact_phone || instructor?.website_url) && (
        <section id="contact-section" className="py-32 px-6 earth-gradient relative">
          <div className="max-w-5xl mx-auto text-center">
            <div className="fade-in-up mb-16">
              <h2 className="text-5xl font-cormorant font-semibold text-earth-800 mb-6">Sacred Connection</h2>
              <p className="text-xl text-earth-600 leading-relaxed">
                Reach out and let's begin this beautiful journey together
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {instructor?.contact_email && (
                <Card 
                  className="glass-card hover-lift cursor-pointer scale-in border-0 shadow-xl" 
                  onClick={() => window.location.href = `mailto:${instructor.contact_email}`}
                  style={{ animationDelay: '0s' }}
                >
                  <CardContent className="p-10 text-center">
                    <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6 breathe">
                      <Mail className="h-8 w-8 text-sage-600" />
                    </div>
                    <h3 className="font-cormorant text-2xl font-semibold text-earth-800 mb-3">Sacred Messages</h3>
                    <p className="text-earth-600 text-lg">{instructor.contact_email}</p>
                  </CardContent>
                </Card>
              )}
              
              {instructor?.contact_phone && (
                <Card 
                  className="glass-card hover-lift cursor-pointer scale-in border-0 shadow-xl" 
                  onClick={() => window.location.href = `tel:${instructor.contact_phone}`}
                  style={{ animationDelay: '0.1s' }}
                >
                  <CardContent className="p-10 text-center">
                    <div className="w-16 h-16 bg-earth-100 rounded-full flex items-center justify-center mx-auto mb-6 breathe">
                      <Phone className="h-8 w-8 text-earth-600" />
                    </div>
                    <h3 className="font-cormorant text-2xl font-semibold text-earth-800 mb-3">Voice Connection</h3>
                    <p className="text-earth-600 text-lg">{instructor.contact_phone}</p>
                  </CardContent>
                </Card>
              )}
              
              {instructor?.website_url && (
                <Card 
                  className="glass-card hover-lift cursor-pointer scale-in border-0 shadow-xl" 
                  onClick={() => window.open(instructor.website_url, '_blank')}
                  style={{ animationDelay: '0.2s' }}
                >
                  <CardContent className="p-10 text-center">
                    <div className="w-16 h-16 bg-sand-100 rounded-full flex items-center justify-center mx-auto mb-6 breathe">
                      <Globe className="h-8 w-8 text-sand-600" />
                    </div>
                    <h3 className="font-cormorant text-2xl font-semibold text-earth-800 mb-3">Digital Home</h3>
                    <p className="text-earth-600 text-lg">{instructor.website_url}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Social Media Section */}
      {(instructor?.social_instagram || instructor?.social_facebook || instructor?.social_youtube) && (
        <section className="py-32 px-6 bg-white/80 backdrop-blur-sm relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="fade-in-up mb-16">
              <h2 className="text-5xl font-cormorant font-semibold text-earth-800 mb-6">Join Our Sacred Circle</h2>
              <p className="text-xl text-earth-600">
                Connect with our mindful community across the digital realm
              </p>
            </div>
            
            <div className="flex justify-center space-x-8 fade-in-up" style={{ animationDelay: '0.2s' }}>
              {instructor?.social_instagram && (
                <a 
                  href={instructor.social_instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-6 bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-3xl hover-lift transition-all duration-300 hover:scale-110"
                >
                  <Instagram className="h-8 w-8" />
                </a>
              )}
              
              {instructor?.social_facebook && (
                <a 
                  href={instructor.social_facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-6 bg-blue-600 text-white rounded-3xl hover-lift transition-all duration-300 hover:scale-110"
                >
                  <Facebook className="h-8 w-8" />
                </a>
              )}
              
              {instructor?.social_youtube && (
                <a 
                  href={instructor.social_youtube} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-6 bg-red-600 text-white rounded-3xl hover-lift transition-all duration-300 hover:scale-110"
                >
                  <Youtube className="h-8 w-8" />
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Sacred Footer */}
      <footer className="bg-gradient-to-br from-earth-800 to-earth-900 text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-sage-300/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="fade-in-up">
            <h3 className="text-4xl font-cormorant font-semibold mb-6">{instructor?.studio_name || subdomain}</h3>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Where sacred practice meets mindful technology, creating ripples of peace across the world.
            </p>
            
            <div className="flex justify-center space-x-8 mb-8">
              <Button
                variant="outline"
                onClick={() => navigate('/dashboard')}
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm hover-lift"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Return to Dashboard
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm hover-lift"
              >
                <Home className="h-4 w-4 mr-2" />
                Sacred Home
              </Button>
            </div>
            
            <div className="text-4xl space-x-4 mb-8">
              🕉️ 🧘‍♀️ 🌸 ✨
            </div>
            
            <p className="text-white/60 text-sm">
              Made with 💚 and mindfulness • {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StudioWebsite;
