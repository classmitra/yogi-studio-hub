
import React from 'react';
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
  Zap
} from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 px-6 py-2 text-sm font-medium bg-gray-100 text-black border border-gray-300">
              🧘‍♀️ Free for All Yoga Teachers
            </Badge>
            <h1 className="text-6xl md:text-8xl font-bold text-black mb-8 leading-tight">
              Your Personal Yoga Studio,
              <br />
              <span className="text-gray-600">Online & Free</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
              Build your yoga teaching presence with our completely free platform. Get your own branded subdomain, 
              manage classes seamlessly, and connect with students worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-black hover:bg-gray-800 text-white px-10 py-4 text-lg rounded-md">
                Start Your Free Studio
                <Play className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-black text-black hover:bg-gray-50 px-10 py-4 text-lg rounded-md">
                Watch Demo
                <Video className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              No credit card required • Always free • No hidden fees
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-black mb-6">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools designed specifically for yoga instructors to build, grow, and manage their online studios.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "Your Own Subdomain",
                description: "Get yourname.yogastudio.app with full customization options",
                color: "bg-gray-100 text-black"
              },
              {
                icon: Calendar,
                title: "Smart Scheduling",
                description: "Dynamic calendar with automated booking and reminders",
                color: "bg-gray-100 text-black"
              },
              {
                icon: CreditCard,
                title: "Payment Integration",
                description: "Accept payments securely or offer free classes",
                color: "bg-gray-100 text-black"
              },
              {
                icon: Video,
                title: "Video Integration",
                description: "Seamless Zoom & Google Meet integration for live classes",
                color: "bg-gray-100 text-black"
              },
              {
                icon: Users,
                title: "Student Management",
                description: "Track attendance, progress, and engagement analytics",
                color: "bg-gray-100 text-black"
              },
              {
                icon: Zap,
                title: "Marketing Tools",
                description: "Promotional codes, referrals, and social media integration",
                color: "bg-gray-100 text-black"
              }
            ].map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border border-gray-200 bg-white">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 rounded-lg ${feature.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-black">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-black mb-6">
              Loved by Yoga Instructors Worldwide
            </h2>
            <p className="text-xl text-gray-600">
              See what our community of instructors has to say
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Vinyasa Instructor",
                content: "This platform transformed my teaching. I went from 10 local students to 200+ global practitioners in just 3 months!",
                rating: 5,
                image: "🧘‍♀️"
              },
              {
                name: "Marcus Rivera",
                role: "Mindfulness Coach",
                content: "The scheduling and payment integration is seamless. I can focus on teaching while the platform handles everything else.",
                rating: 5,
                image: "🕉️"
              },
              {
                name: "Luna Patel",
                role: "Yin Yoga Specialist",
                content: "Having my own branded studio URL gave me instant credibility. The customization options are incredible!",
                rating: 5,
                image: "🌙"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="bg-gray-50 border border-gray-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-black text-black" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic text-lg">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <div className="text-3xl mr-3">{testimonial.image}</div>
                    <div>
                      <h4 className="font-semibold text-black">{testimonial.name}</h4>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6">
            Ready to Transform Your Yoga Teaching?
          </h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            Join thousands of instructors who have already built their dream yoga studios online. 
            Start your free studio today - no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" variant="secondary" className="bg-white text-black hover:bg-gray-100 px-10 py-4 text-lg rounded-md">
              Start Free Studio
              <Heart className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-black px-10 py-4 text-lg rounded-md">
              Schedule Demo
              <Calendar className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <p className="text-sm opacity-75 mt-6">
            100% Free Forever • No Credit Card Required • Start in Minutes
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 text-black py-16 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-black">YogaStudio Platform</h3>
              <p className="text-gray-600 mb-4">
                Empowering yoga instructors to build thriving online studios and connect with students worldwide.
              </p>
              <div className="text-2xl space-x-2">
                🧘‍♀️ 🌿 ✨
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-black">Platform</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-black transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Getting Started</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Integration</a></li>
                <li><a href="#" className="hover:text-black transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-black">Support</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-black transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-black">Legal</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-black transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-black transition-colors">GDPR</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-300 mt-12 pt-8 text-center text-gray-600">
            <p>&copy; 2024 YogaStudio Platform. All rights reserved. Made with 💚 for the yoga community.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
