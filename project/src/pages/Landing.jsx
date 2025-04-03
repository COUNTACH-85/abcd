import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Shield, Zap, Star } from 'lucide-react';

const Landing = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      title: "Intelligent Portfolio Tracking",
      icon: <TrendingUp className="w-8 h-8 text-purple-500" />,
      description: "Effortlessly track and visualize your investments across multiple platforms."
    },
    {
      title: "Advanced Analytics",
      icon: <Zap className="w-8 h-8 text-purple-600" />,
      description: "Get powerful insights with our cutting-edge performance analysis tools."
    },
    {
      title: "Secure & Private",
      icon: <Shield className="w-8 h-8 text-purple-700" />,
      description: "Your financial data stays private with enterprise-grade security protocols."
    },
    {
      title: "Smart Recommendations",
      icon: <Star className="w-8 h-8 text-purple-800" />,
      description: "Receive personalized investment suggestions based on your goals."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden">
        {/* Purple gradient background with animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-800 to-purple-900 opacity-20"></div>
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-20 w-80 h-80 bg-purple-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className={`text-center ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
              Portfolio Pro
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto">
              Your all-in-one solution for tracking, analyzing, and optimizing your investment portfolio
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login" className="button-animate bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-medium text-lg shadow-purple-900/30 shadow-lg hover:shadow-purple-900/50 transition-all duration-300 transform hover:scale-105">
                Sign In
              </Link>
              <Link to="/signup" className="button-animate bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-3 rounded-lg font-medium text-lg shadow-purple-900/10 shadow-lg hover:shadow-purple-900/30 transition-all duration-300 transform hover:scale-105">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            Powerful Features for Savvy Investors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`bg-white p-6 rounded-xl shadow-xl border-t border-purple-100 hover:border-purple-300 transition-all duration-300 transform hover:-translate-y-2 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="rounded-full bg-purple-100 w-16 h-16 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing; 