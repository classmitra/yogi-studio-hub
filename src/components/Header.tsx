
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Flower, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Support', href: '#support' },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  const handleAuthClick = () => {
    navigate('/auth');
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/20 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-yoga-500 to-ocean-500 rounded-lg flex items-center justify-center">
              <Flower className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-yoga-600 to-ocean-600 bg-clip-text text-transparent">
              YogaStudio
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-yoga-600 transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-700">
                  <User className="h-4 w-4" />
                  <span className="text-sm">Welcome back!</span>
                </div>
                <Button 
                  variant="ghost" 
                  onClick={handleSignOut}
                  className="text-gray-700 hover:text-yoga-600"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  onClick={handleAuthClick}
                  className="text-gray-700 hover:text-yoga-600"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={handleAuthClick}
                  className="bg-yoga-600 hover:bg-yoga-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Start Free Trial
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-gray-700 hover:text-yoga-600 hover:bg-yoga-50 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex flex-col space-y-2 px-3 pt-4">
                {user ? (
                  <>
                    <div className="flex items-center space-x-2 text-gray-700 px-3 py-2">
                      <User className="h-4 w-4" />
                      <span className="text-sm">Welcome back!</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      onClick={handleSignOut}
                      className="justify-start text-gray-700 hover:text-yoga-600"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="ghost" 
                      onClick={handleAuthClick}
                      className="justify-start text-gray-700 hover:text-yoga-600"
                    >
                      Sign In
                    </Button>
                    <Button 
                      onClick={handleAuthClick}
                      className="bg-yoga-600 hover:bg-yoga-700 text-white"
                    >
                      Start Free Trial
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
