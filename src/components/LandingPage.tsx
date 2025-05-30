
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
    <div className="min-h-screen bg-gradient-to-br from-yoga-50 via-white to-ocean-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yoga-100/20 to-ocean-100/20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium bg-yoga-100 text-yoga-800 border-yoga-200">
              🧘‍♀️ Transform Your Yoga Teaching Journey
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-yoga-600 to-ocean-600 bg-clip-text text-transparent mb-6 leading-tight">
              Your Personal Yoga Studio,
              <br />
              <span className="text-sage-700">Online & Limitless</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              Empower your yoga practice with our comprehensive platform. Get your own branded subdomain, 
              manage classes seamlessly, and connect with students worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-yoga-600 hover:bg-yoga-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                Start Your Studio Journey
                <Play className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-yoga-600 text-yoga-600 hover:bg-yoga-50 px-8 py-4 text-lg rounded-full">
                Watch Demo
                <Video className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
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
                description: "Get yourname.yogaplatform.com with full customization options",
                color: "bg-yoga-100 text-yoga-600"
              },
              {
                icon: Calendar,
                title: "Smart Scheduling",
                description: "Dynamic calendar with automated booking and reminders",
                color: "bg-ocean-100 text-ocean-600"
              },
              {
                icon: CreditCard,
                title: "Flexible Payments",
                description: "Multiple payment gateways with global currency support",
                color: "bg-sage-100 text-sage-600"
              },
              {
                icon: Video,
                title: "Video Integration",
                description: "Seamless Zoom & Google Meet integration for live classes",
                color: "bg-purple-100 text-purple-600"
              },
              {
                icon: Users,
                title: "Student Management",
                description: "Track attendance, progress, and engagement analytics",
                color: "bg-pink-100 text-pink-600"
              },
              {
                icon: Zap,
                title: "Marketing Tools",
                description: "Promotional codes, referrals, and social media integration",
                color: "bg-yellow-100 text-yellow-600"
              }
            ].map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 rounded-full ${feature.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-br from-yoga-50 to-ocean-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the plan that fits your studio's needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$29",
                period: "/month",
                description: "Perfect for new instructors",
                features: [
                  "Custom subdomain",
                  "Up to 50 students",
                  "Basic scheduling",
                  "Payment processing",
                  "Email support"
                ],
                popular: false
              },
              {
                name: "Professional",
                price: "$79",
                period: "/month",
                description: "Most popular for growing studios",
                features: [
                  "Everything in Starter",
                  "Unlimited students",
                  "Advanced analytics",
                  "Video integration",
                  "Marketing tools",
                  "Priority support"
                ],
                popular: true
              },
              {
                name: "Enterprise",
                price: "$199",
                period: "/month",
                description: "For established yoga businesses",
                features: [
                  "Everything in Professional",
                  "Multiple instructors",
                  "White-label solution",
                  "API access",
                  "Custom integrations",
                  "Dedicated support"
                ],
                popular: false
              }
            ].map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-yoga-500 shadow-xl scale-105' : 'shadow-md'} bg-white/90 backdrop-blur-sm transition-all duration-300 hover:shadow-xl`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yoga-500 text-white px-4 py-1">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-gray-900">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center mt-4">
                    <span className="text-4xl font-bold text-yoga-600">{plan.price}</span>
                    <span className="text-gray-500 ml-1">{plan.period}</span>
                  </div>
                  <CardDescription className="text-gray-600 mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-yoga-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full mt-8 ${plan.popular ? 'bg-yoga-600 hover:bg-yoga-700' : 'bg-gray-600 hover:bg-gray-700'} text-white rounded-full py-3`}
                  >
                    Get Started
                  </Button>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
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
              <Card key={index} className="bg-gradient-to-br from-yoga-50 to-ocean-50 border-0 shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <div className="text-3xl mr-3">{testimonial.image}</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
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
      <section className="py-20 bg-gradient-to-r from-yoga-600 to-ocean-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Yoga Teaching?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of instructors who have already built their dream yoga studios online. 
            Start your 14-day free trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" variant="secondary" className="bg-white text-yoga-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-full shadow-lg">
              Start Free Trial
              <Heart className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-yoga-600 px-8 py-4 text-lg rounded-full">
              Schedule Demo
              <Calendar className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <p className="text-sm opacity-75 mt-4">
            No credit card required • Cancel anytime • 14-day money-back guarantee
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-yoga-400">YogaStudio Platform</h3>
              <p className="text-gray-400 mb-4">
                Empowering yoga instructors to build thriving online studios and connect with students worldwide.
              </p>
              <div className="text-2xl space-x-2">
                🧘‍♀️ 🌿 ✨
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-yoga-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-yoga-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-yoga-400 transition-colors">Integration</a></li>
                <li><a href="#" className="hover:text-yoga-400 transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-yoga-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-yoga-400 transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-yoga-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-yoga-400 transition-colors">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-yoga-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-yoga-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-yoga-400 transition-colors">GDPR</a></li>
                <li><a href="#" className="hover:text-yoga-400 transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 YogaStudio Platform. All rights reserved. Made with 💚 for the yoga community.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
