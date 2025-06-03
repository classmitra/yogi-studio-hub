
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Calendar, 
  CreditCard, 
  Video, 
  Globe, 
  Star,
  CheckCircle,
  Play,
  ChevronDown,
  ArrowRight,
  Minus,
  Plus
} from 'lucide-react';
import { useScrollAnimations, useStaggeredAnimation } from '@/hooks/useScrollAnimations';

const LandingPage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const staggerRef = useStaggeredAnimation(150);
  useScrollAnimations();

  const scrollToFeatures = () => {
    document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Scroll Progress */}
      <div className="scroll-progress-minimal"></div>

      {/* Sticky Navigation */}
      <nav className="sticky-nav-minimal">
        <div className="container mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-black"></div>
              <span className="font-dongle text-2xl font-normal text-black tracking-wide">YogaStudio</span>
            </div>
            <div className="hidden md:flex items-center space-x-12">
              <a href="#features" className="text-black hover:opacity-60 transition-opacity duration-300 text-sm tracking-wide">Features</a>
              <a href="#testimonials" className="text-black hover:opacity-60 transition-opacity duration-300 text-sm tracking-wide">Stories</a>
              <a href="#pricing" className="text-black hover:opacity-60 transition-opacity duration-300 text-sm tracking-wide">Pricing</a>
              <Button className="minimal-button h-10 px-6 text-sm font-light tracking-wide">
                Start Free
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center section-white" data-section="white">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-1 h-32 bg-black opacity-10 parallax-slow"></div>
          <div className="absolute bottom-40 left-20 w-1 h-24 bg-black opacity-5 parallax-medium"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-px h-96 bg-gradient-to-b from-transparent via-black/5 to-transparent parallax-fast"></div>
        </div>

        {/* Minimal geometric shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 left-1/4 w-1 h-1 bg-black breathe-minimal"></div>
          <div className="absolute bottom-32 right-1/3 w-1 h-1 bg-black gentle-fade"></div>
          <div className="absolute top-2/3 right-1/4 w-px h-16 bg-black/20 float-minimal"></div>
        </div>

        <div className="container mx-auto px-8 py-32 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <div className="fade-in-minimal">
              <Badge variant="secondary" className="mb-12 px-8 py-3 text-sm font-light bg-transparent border border-black text-black tracking-wide">
                <Minus className="h-3 w-3 mr-3" />
                Free Forever — Trusted by 10,000+ Teachers
                <Minus className="h-3 w-3 ml-3" />
              </Badge>
            </div>
            
            <div className="slide-up-minimal" style={{ animationDelay: '0.2s' }}>
              <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-dongle font-normal text-black mb-16 leading-none tracking-tight">
                Your
                <br />
                Sacred
                <br />
                <span className="text-6xl md:text-7xl lg:text-8xl opacity-60">Space</span>
              </h1>
            </div>
            
            <div className="slide-up-minimal" style={{ animationDelay: '0.4s' }}>
              <p className="text-xl md:text-2xl text-black/70 mb-16 leading-relaxed max-w-2xl mx-auto font-light tracking-wide">
                Create your serene online sanctuary where ancient wisdom meets modern simplicity.
              </p>
            </div>
            
            <div className="slide-up-minimal flex flex-col sm:flex-row gap-8 justify-center items-center" style={{ animationDelay: '0.6s' }}>
              <Button 
                size="lg" 
                className="minimal-button h-14 px-12 text-lg font-light tracking-wide"
              >
                Begin Journey
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border border-black bg-transparent text-black hover:bg-black hover:text-white h-14 px-12 text-lg font-light tracking-wide transition-all duration-500"
              >
                <Play className="mr-3 h-5 w-5" />
                Watch Story
              </Button>
            </div>
            
            <div className="slide-up-minimal mt-16" style={{ animationDelay: '0.8s' }}>
              <p className="text-xs text-black/50 mb-16 tracking-widest uppercase">
                No commitment — 2-minute setup — Cancel anytime
              </p>
            </div>

            {/* Scroll Indicator */}
            <div className="slide-up-minimal absolute bottom-16 left-1/2 transform -translate-x-1/2 cursor-pointer" style={{ animationDelay: '1s' }} onClick={scrollToFeatures}>
              <div className="flex flex-col items-center text-black/60 hover:text-black transition-colors duration-300">
                <div className="w-px h-8 bg-black/30 mb-4"></div>
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features-section" className="py-32 section-off-white" data-section="off-white">
        <div className="container mx-auto px-8">
          <div className="text-center mb-24 fade-in-minimal">
            <h2 className="text-7xl md:text-8xl font-dongle font-normal text-black mb-8 leading-none">
              Everything
              <br />
              <span className="text-5xl md:text-6xl opacity-60">You Need</span>
            </h2>
            <p className="text-lg text-black/70 max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
              Thoughtfully crafted tools that honor the sacred practice of yoga while embracing modern simplicity.
            </p>
          </div>
          
          <div ref={staggerRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-16 max-w-6xl mx-auto">
            {[
              {
                icon: Globe,
                title: "Digital Space",
                description: "Your own corner of the internet with yourname.yogastudio.app",
                delay: "0s"
              },
              {
                icon: Calendar,
                title: "Scheduling",
                description: "Harmonious calendar flow with gentle reminders",
                delay: "0.1s"
              },
              {
                icon: CreditCard,
                title: "Payments",
                description: "Accept offerings with dignity or share freely",
                delay: "0.2s"
              },
              {
                icon: Video,
                title: "Connection",
                description: "Crystal-clear video for authentic presence",
                delay: "0.3s"
              },
              {
                icon: Users,
                title: "Community",
                description: "Nurture relationships with meaningful tools",
                delay: "0.4s"
              },
              {
                icon: Star,
                title: "Growth",
                description: "Organic marketing that honors connections",
                delay: "0.5s"
              }
            ].map((feature, index) => (
              <Card 
                key={index} 
                className="stagger-in group border border-black/10 bg-white hover:border-black/30 transition-all duration-500 minimal-hover"
                style={{ animationDelay: feature.delay }}
              >
                <CardHeader className="text-center pb-8">
                  <div className="relative mx-auto mb-8">
                    <div className="w-16 h-16 border border-black/20 flex items-center justify-center mx-auto group-hover:border-black/60 transition-all duration-500">
                      <feature.icon className="h-6 w-6 text-black/60" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-dongle font-normal text-black tracking-wide">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-black/70 text-center leading-relaxed font-light text-sm tracking-wide">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials with Horizontal Scroll */}
      <section id="testimonials" className="py-32 section-light-gray" data-section="light-gray">
        <div className="container mx-auto px-8">
          <div className="text-center mb-24 fade-in-minimal">
            <h2 className="text-7xl md:text-8xl font-dongle font-normal text-black mb-8 leading-none">
              Stories of
              <br />
              <span className="text-5xl md:text-6xl opacity-60">Transformation</span>
            </h2>
            <p className="text-lg text-black/70 font-light tracking-wide">
              Voices from our global community of mindful teachers
            </p>
          </div>
          
          <div className="horizontal-scroll gap-8 pb-8 fade-in-minimal">
            {[
              {
                name: "Sarah Chen",
                role: "Vinyasa Flow Teacher",
                content: "This platform became my digital sanctuary. The interface feels as peaceful as my physical studio, and I've grown from 10 local students to 300+ souls worldwide.",
                location: "California, USA",
              },
              {
                name: "Amara Okafor",
                role: "Restorative Yoga Guide",
                content: "The gentle design and intuitive flow mirror the essence of yoga itself. My students often say booking feels like a meditation in itself.",
                location: "Lagos, Nigeria",
              },
              {
                name: "Luna Patel",
                role: "Yin & Meditation Teacher",
                content: "Having my own sacred digital space gave me the confidence to share my practice globally. The customization options let my personality shine through.",
                location: "Mumbai, India",
              }
            ].map((testimonial, index) => (
              <Card 
                key={index} 
                className="w-80 md:w-96 flex-shrink-0 border border-black/10 bg-white minimal-hover"
              >
                <CardContent className="p-12">
                  <div className="flex items-center mb-8">
                    <div className="w-1 h-1 bg-black mr-2"></div>
                    <div className="w-1 h-1 bg-black mr-2"></div>
                    <div className="w-1 h-1 bg-black mr-2"></div>
                    <div className="w-1 h-1 bg-black mr-2"></div>
                    <div className="w-1 h-1 bg-black"></div>
                  </div>
                  <p className="text-black/80 mb-12 text-lg leading-relaxed font-light tracking-wide">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <h4 className="font-dongle text-2xl font-normal text-black tracking-wide">{testimonial.name}</h4>
                    <p className="text-black/60 text-sm font-light tracking-wide">{testimonial.role}</p>
                    <p className="text-black/40 text-xs font-light tracking-widest uppercase">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-1 h-32 bg-white/10 parallax-slow"></div>
          <div className="absolute bottom-20 right-20 w-1 h-24 bg-white/5 parallax-medium"></div>
        </div>
        
        <div className="container mx-auto px-8 text-center relative z-10">
          <div className="fade-in-minimal">
            <h2 className="text-7xl md:text-8xl font-dongle font-normal mb-12 leading-none">
              Ready to Create
              <br />
              <span className="text-5xl md:text-6xl opacity-60">Your Space?</span>
            </h2>
            <p className="text-xl mb-16 opacity-80 max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
              Join thousands of mindful teachers who have transformed their practice into a thriving online sanctuary.
            </p>
          </div>
          
          <div className="fade-in-minimal flex flex-col sm:flex-row gap-8 justify-center items-center" style={{ animationDelay: '0.2s' }}>
            <Button 
              size="lg" 
              className="bg-white text-black hover:bg-white/90 h-14 px-12 text-lg font-light tracking-wide transition-all duration-500"
            >
              Start Your Journey
              <ArrowRight className="ml-3 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border border-white bg-transparent text-white hover:bg-white hover:text-black h-14 px-12 text-lg font-light tracking-wide transition-all duration-500"
            >
              <Calendar className="mr-3 h-5 w-5" />
              Schedule Call
            </Button>
          </div>
          
          <div className="fade-in-minimal mt-16" style={{ animationDelay: '0.4s' }}>
            <p className="text-xs opacity-60 tracking-widest uppercase">
              Always Free — No Commitments — Begin in Moments
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-black py-24 border-t border-black/10">
        <div className="container mx-auto px-8">
          <div className="grid md:grid-cols-4 gap-16">
            <div className="fade-in-minimal">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-2 h-2 bg-black"></div>
                <h3 className="text-2xl font-dongle font-normal text-black tracking-wide">YogaStudio</h3>
              </div>
              <p className="text-black/70 mb-8 leading-relaxed font-light text-sm tracking-wide">
                Nurturing the sacred connection between ancient wisdom and modern technology for yoga teachers worldwide.
              </p>
            </div>
            
            <div className="fade-in-minimal" style={{ animationDelay: '0.1s' }}>
              <h4 className="font-dongle text-xl font-normal mb-8 text-black tracking-wide">Platform</h4>
              <ul className="space-y-4 text-black/70 text-sm font-light tracking-wide">
                <li><a href="#" className="hover:text-black transition-colors duration-300">Features</a></li>
                <li><a href="#" className="hover:text-black transition-colors duration-300">Getting Started</a></li>
                <li><a href="#" className="hover:text-black transition-colors duration-300">Integrations</a></li>
                <li><a href="#" className="hover:text-black transition-colors duration-300">Community</a></li>
              </ul>
            </div>
            
            <div className="fade-in-minimal" style={{ animationDelay: '0.2s' }}>
              <h4 className="font-dongle text-xl font-normal mb-8 text-black tracking-wide">Support</h4>
              <ul className="space-y-4 text-black/70 text-sm font-light tracking-wide">
                <li><a href="#" className="hover:text-black transition-colors duration-300">Help Center</a></li>
                <li><a href="#" className="hover:text-black transition-colors duration-300">Guides</a></li>
                <li><a href="#" className="hover:text-black transition-colors duration-300">Contact</a></li>
                <li><a href="#" className="hover:text-black transition-colors duration-300">Resources</a></li>
              </ul>
            </div>
            
            <div className="fade-in-minimal" style={{ animationDelay: '0.3s' }}>
              <h4 className="font-dongle text-xl font-normal mb-8 text-black tracking-wide">Principles</h4>
              <ul className="space-y-4 text-black/70 text-sm font-light tracking-wide">
                <li><a href="#" className="hover:text-black transition-colors duration-300">Privacy</a></li>
                <li><a href="#" className="hover:text-black transition-colors duration-300">Terms</a></li>
                <li><a href="#" className="hover:text-black transition-colors duration-300">Accessibility</a></li>
                <li><a href="#" className="hover:text-black transition-colors duration-300">Sustainability</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-black/10 mt-16 pt-12 text-center text-black/60 fade-in-minimal" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="w-1 h-1 bg-black/20"></div>
              <div className="w-1 h-1 bg-black/20"></div>
              <div className="w-1 h-1 bg-black/20"></div>
            </div>
            <p className="text-xs tracking-widest uppercase">&copy; 2025 YogaStudio Platform. Made with intention for the global yoga community.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
