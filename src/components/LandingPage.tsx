
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
  Heart,
  Zap,
  ChevronDown,
  Sparkles,
  Leaf,
  Mountain
} from 'lucide-react';
import { useScrollAnimations } from '@/hooks/useScrollAnimations';

const LandingPage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
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

  const scrollToFeatures = () => {
    document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Sticky Navigation */}
      <nav className="sticky-nav">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-sage-400 rounded-full flex items-center justify-center">
                <Leaf className="h-4 w-4 text-white" />
              </div>
              <span className="font-cormorant text-xl font-semibold text-earth-800">YogaStudio</span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#features" className="text-earth-600 hover:text-sage-600 transition-colors">Features</a>
              <a href="#testimonials" className="text-earth-600 hover:text-sage-600 transition-colors">Stories</a>
              <a href="#pricing" className="text-earth-600 hover:text-sage-600 transition-colors">Pricing</a>
              <Button className="bg-sage-500 hover:bg-sage-600 text-white ripple-effect">
                Start Free
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Immersive Background */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center wellness-gradient overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-10 left-10 w-64 h-64 bg-sage-200/30 rounded-full blur-3xl float"
            data-parallax="0.3"
          ></div>
          <div 
            className="absolute bottom-20 right-20 w-96 h-96 bg-sand-200/20 rounded-full blur-3xl"
            data-parallax="0.2"
          ></div>
          <div 
            className="absolute top-1/2 left-1/4 w-32 h-32 bg-earth-200/20 rounded-full blur-2xl breathe"
            data-parallax="0.4"
          ></div>
        </div>

        {/* Nature Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <Mountain className="absolute top-20 right-1/4 h-32 w-32 text-sage-200/30 parallax-slow" />
          <Leaf className="absolute bottom-32 left-1/3 h-16 w-16 text-earth-200/40 gentle-pulse" />
          <Sparkles className="absolute top-1/3 right-1/3 h-12 w-12 text-sand-300/50 float" />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <div className="fade-in-up">
              <Badge variant="secondary" className="mb-8 px-8 py-3 text-base font-medium bg-white/80 text-sage-700 border border-sage-200/50 backdrop-blur-sm">
                <Sparkles className="h-4 w-4 mr-2" />
                Free Forever • Trusted by 10,000+ Teachers
              </Badge>
            </div>
            
            <div className="fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h1 className="text-7xl md:text-9xl font-cormorant font-light text-earth-800 mb-8 leading-tight tracking-tight">
                Your Sacred
                <br />
                <span className="font-semibold text-sage-600">Yoga Space</span>
                <br />
                <span className="text-6xl md:text-7xl text-stone-500">Awaits</span>
              </h1>
            </div>
            
            <div className="fade-in-up" style={{ animationDelay: '0.4s' }}>
              <p className="text-2xl text-earth-600 mb-12 leading-relaxed max-w-3xl mx-auto font-light">
                Create your serene online sanctuary where ancient wisdom meets modern technology. 
                Build deeper connections with students worldwide through your personalized yoga studio.
              </p>
            </div>
            
            <div className="fade-in-up flex flex-col sm:flex-row gap-6 justify-center items-center" style={{ animationDelay: '0.6s' }}>
              <Button 
                size="lg" 
                className="bg-sage-500 hover:bg-sage-600 text-white px-12 py-6 text-xl rounded-2xl ripple-effect hover-lift font-medium"
              >
                Begin Your Journey
                <Heart className="ml-3 h-6 w-6" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-earth-300 text-earth-700 hover:bg-earth-50 px-12 py-6 text-xl rounded-2xl hover-lift font-medium"
              >
                <Play className="mr-3 h-6 w-6" />
                Watch Story
              </Button>
            </div>
            
            <div className="fade-in-up mt-8" style={{ animationDelay: '0.8s' }}>
              <p className="text-sm text-earth-500 mb-8">
                No credit card • 2-minute setup • Cancel anytime
              </p>
            </div>

            {/* Scroll Indicator */}
            <div className="fade-in-up absolute bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer" style={{ animationDelay: '1s' }} onClick={scrollToFeatures}>
              <div className="flex flex-col items-center text-earth-500 hover:text-sage-600 transition-colors">
                <span className="text-sm font-medium mb-2">Discover More</span>
                <ChevronDown className="h-6 w-6 animate-bounce-gentle" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Organic Layout */}
      <section id="features-section" className="py-32 sage-gradient relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 fade-in-up">
            <h2 className="text-6xl font-cormorant font-semibold text-earth-800 mb-8">
              Everything for Your
              <span className="text-sage-600"> Teaching Journey</span>
            </h2>
            <p className="text-xl text-earth-600 max-w-3xl mx-auto leading-relaxed">
              Thoughtfully crafted tools that honor the sacred practice of yoga while embracing modern convenience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {[
              {
                icon: Globe,
                title: "Sacred Digital Space",
                description: "Your own mindful corner of the internet with yourname.yogastudio.app",
                color: "sage",
                delay: "0s"
              },
              {
                icon: Calendar,
                title: "Intuitive Scheduling",
                description: "Harmonious calendar flow with gentle reminders and peaceful booking",
                color: "earth",
                delay: "0.1s"
              },
              {
                icon: CreditCard,
                title: "Graceful Payments",
                description: "Accept offerings with dignity or share your practice freely",
                color: "sand",
                delay: "0.2s"
              },
              {
                icon: Video,
                title: "Seamless Connection",
                description: "Crystal-clear video integration for authentic online presence",
                color: "stone",
                delay: "0.3s"
              },
              {
                icon: Users,
                title: "Community Building",
                description: "Nurture relationships with meaningful student management tools",
                color: "sage",
                delay: "0.4s"
              },
              {
                icon: Zap,
                title: "Mindful Growth",
                description: "Organic marketing tools that honor authentic connections",
                color: "earth",
                delay: "0.5s"
              }
            ].map((feature, index) => (
              <Card 
                key={index} 
                className={`group glass-card hover-lift scale-in border-0 shadow-lg bg-white/70 backdrop-blur-xl`}
                style={{ animationDelay: feature.delay }}
              >
                <CardHeader className="text-center pb-6">
                  <div className="relative mx-auto mb-6">
                    <div className={`w-20 h-20 rounded-3xl bg-${feature.color}-100 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 breathe`}>
                      <feature.icon className={`h-10 w-10 text-${feature.color}-600`} />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-cormorant font-semibold text-earth-800">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-earth-600 text-center leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials with Parallax */}
      <section id="testimonials" className="py-32 earth-gradient relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        ></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20 fade-in-up">
            <h2 className="text-6xl font-cormorant font-semibold text-earth-800 mb-8">
              Stories of
              <span className="text-sage-600"> Transformation</span>
            </h2>
            <p className="text-xl text-earth-600">
              Voices from our global community of mindful teachers
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {[
              {
                name: "Sarah Chen",
                role: "Vinyasa Flow Teacher",
                content: "This platform became my digital sanctuary. The interface feels as peaceful as my physical studio, and I've grown from 10 local students to 300+ souls worldwide.",
                rating: 5,
                image: "🧘‍♀️",
                location: "California, USA",
                delay: "0s"
              },
              {
                name: "Amara Okafor",
                role: "Restorative Yoga Guide",
                content: "The gentle design and intuitive flow mirror the essence of yoga itself. My students often say booking feels like a meditation in itself.",
                rating: 5,
                image: "🌸",
                location: "Lagos, Nigeria",
                delay: "0.2s"
              },
              {
                name: "Luna Patel",
                role: "Yin & Meditation Teacher",
                content: "Having my own sacred digital space gave me the confidence to share my practice globally. The customization options let my personality shine through.",
                rating: 5,
                image: "🌙",
                location: "Mumbai, India",
                delay: "0.4s"
              }
            ].map((testimonial, index) => (
              <Card 
                key={index} 
                className={`glass-card hover-lift fade-in-up bg-white/80 border-0 shadow-xl backdrop-blur-xl`}
                style={{ animationDelay: testimonial.delay }}
              >
                <CardContent className="p-10">
                  <div className="flex items-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-sand-400 text-sand-400" />
                    ))}
                  </div>
                  <p className="text-earth-700 mb-8 italic text-lg leading-relaxed font-light">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <div className="text-4xl mr-4">{testimonial.image}</div>
                    <div>
                      <h4 className="font-cormorant text-xl font-semibold text-earth-800">{testimonial.name}</h4>
                      <p className="text-earth-600 text-sm">{testimonial.role}</p>
                      <p className="text-earth-500 text-xs">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-sage-800 to-earth-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-sage-300/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="fade-in-up">
            <h2 className="text-6xl font-cormorant font-semibold mb-8">
              Ready to Create Your
              <br />
              <span className="text-sage-300">Sacred Digital Space?</span>
            </h2>
            <p className="text-xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
              Join thousands of mindful teachers who have transformed their practice into a thriving online sanctuary. 
              Your journey begins with a single breath.
            </p>
          </div>
          
          <div className="fade-in-up flex flex-col sm:flex-row gap-6 justify-center items-center" style={{ animationDelay: '0.2s' }}>
            <Button 
              size="lg" 
              variant="secondary" 
              className="bg-white text-earth-800 hover:bg-sage-50 px-12 py-6 text-xl rounded-2xl ripple-effect hover-lift font-medium"
            >
              Start Your Sacred Journey
              <Heart className="ml-3 h-6 w-6" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white/30 text-white hover:bg-white/10 px-12 py-6 text-xl rounded-2xl hover-lift font-medium backdrop-blur-sm"
            >
              <Calendar className="mr-3 h-6 w-6" />
              Schedule a Call
            </Button>
          </div>
          
          <div className="fade-in-up mt-8" style={{ animationDelay: '0.4s' }}>
            <p className="text-sm opacity-75 mb-8">
              Always Free • No Sacred Commitments • Begin in Moments
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-earth-50 text-earth-700 py-20 border-t border-earth-200">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="fade-in-up">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-sage-400 rounded-full flex items-center justify-center">
                  <Leaf className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-2xl font-cormorant font-semibold text-earth-800">YogaStudio</h3>
              </div>
              <p className="text-earth-600 mb-6 leading-relaxed">
                Nurturing the sacred connection between ancient wisdom and modern technology for yoga teachers worldwide.
              </p>
              <div className="text-3xl space-x-3">
                🧘‍♀️ 🌿 ✨ 🕉️
              </div>
            </div>
            
            <div className="fade-in-up" style={{ animationDelay: '0.1s' }}>
              <h4 className="font-cormorant text-xl font-semibold mb-6 text-earth-800">Platform</h4>
              <ul className="space-y-3 text-earth-600">
                <li><a href="#" className="hover:text-sage-600 transition-colors">Sacred Features</a></li>
                <li><a href="#" className="hover:text-sage-600 transition-colors">Getting Started</a></li>
                <li><a href="#" className="hover:text-sage-600 transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-sage-600 transition-colors">Community</a></li>
              </ul>
            </div>
            
            <div className="fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h4 className="font-cormorant text-xl font-semibold mb-6 text-earth-800">Support</h4>
              <ul className="space-y-3 text-earth-600">
                <li><a href="#" className="hover:text-sage-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-sage-600 transition-colors">Mindful Guides</a></li>
                <li><a href="#" className="hover:text-sage-600 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-sage-600 transition-colors">Teacher Resources</a></li>
              </ul>
            </div>
            
            <div className="fade-in-up" style={{ animationDelay: '0.3s' }}>
              <h4 className="font-cormorant text-xl font-semibold mb-6 text-earth-800">Sacred Principles</h4>
              <ul className="space-y-3 text-earth-600">
                <li><a href="#" className="hover:text-sage-600 transition-colors">Privacy & Trust</a></li>
                <li><a href="#" className="hover:text-sage-600 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-sage-600 transition-colors">Accessibility</a></li>
                <li><a href="#" className="hover:text-sage-600 transition-colors">Sustainability</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-earth-300 mt-16 pt-8 text-center text-earth-600 fade-in-up" style={{ animationDelay: '0.4s' }}>
            <p>&copy; 2025 YogaStudio Platform. Made with 💚 and mindfulness for the global yoga community.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
