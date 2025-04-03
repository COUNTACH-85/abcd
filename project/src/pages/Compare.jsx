import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import Card from '@/components/common/Card';

function Compare() {
  const [isLoading, setIsLoading] = useState(true);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  const portfolios = [
    { id: 1, name: 'Conservative', risk: 3, return: 8.2, assets: 8, riskProfile: 'conservative' },
    { id: 2, name: 'Balanced', risk: 5, return: 12.4, assets: 12, riskProfile: 'balanced' },
    { id: 3, name: 'Aggressive', risk: 8, return: 18.7, assets: 15, riskProfile: 'aggressive' },
  ];

  const ComparisonCard = ({ portfolio }) => {
    // Determine the color scheme based on risk profile
    let gradientClass, riskColor;
    
    switch(portfolio.riskProfile) {
      case 'conservative':
        gradientClass = 'risk-profile-conservative';
        riskColor = 'text-blue-400';
        break;
      case 'aggressive':
        gradientClass = 'risk-profile-aggressive';
        riskColor = 'text-red-400';
        break;
      case 'balanced':
      default:
        gradientClass = 'risk-profile-balanced';
        riskColor = 'text-purple-400';
    }
    
    return (
      <div className={`glass-effect p-6 hover-card animate-fade-in transform hover:scale-105 transition-all duration-300 ${gradientClass}`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className={`text-xl font-bold ${riskColor}`}>
            {portfolio.name}
          </h3>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            portfolio.riskProfile === 'conservative' 
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 animate-pulse-slow' 
              : portfolio.riskProfile === 'aggressive'
                ? 'bg-gradient-to-r from-red-500 to-orange-500 animate-pulse-slow'
                : 'bg-gradient-to-r from-purple-500 to-blue-600 animate-pulse-slow'
          }`}>
            <span className="text-sm font-bold">{portfolio.risk}</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>Return Rate</span>
            <span className="text-lg font-bold text-green-400">+{portfolio.return}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>Assets</span>
            <span className="text-lg font-bold">{portfolio.assets}</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full animate-pulse-slow ${
                portfolio.riskProfile === 'conservative' 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-400' 
                  : portfolio.riskProfile === 'aggressive'
                    ? 'bg-gradient-to-r from-red-500 to-orange-400'
                    : 'bg-gradient-to-r from-purple-500 to-blue-500'
              }`}
              style={{ width: `${portfolio.risk * 10}%` }}
            />
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-20 px-4 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 animate-fade-in bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
        Compare Portfolios
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {portfolios.map((portfolio, index) => (
          <ComparisonCard 
            key={portfolio.id} 
            portfolio={portfolio} 
            style={{ animationDelay: `${index * 100}ms` }}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-effect animate-fade-in" style={{ animationDelay: '400ms' }}>
          <h2 className="text-xl font-semibold mb-4">Performance Comparison</h2>
          <div className="h-64 bg-gradient-to-b from-purple-500/20 to-blue-500/20 rounded-lg animate-pulse-slow">
            {/* Chart component would go here */}
          </div>
        </Card>

        <Card className="glass-effect animate-fade-in" style={{ animationDelay: '500ms' }}>
          <h2 className="text-xl font-semibold mb-4">Risk Analysis</h2>
          <div className="space-y-4">
            {portfolios.map((portfolio, index) => {
              // Determine the color scheme based on risk profile
              let riskBgClass, riskTextColor;
              
              switch(portfolio.riskProfile) {
                case 'conservative':
                  riskBgClass = 'from-blue-500/20';
                  riskTextColor = 'text-blue-400';
                  break;
                case 'aggressive':
                  riskBgClass = 'from-red-500/20';
                  riskTextColor = 'text-red-400';
                  break;
                case 'balanced':
                default:
                  riskBgClass = 'from-purple-500/20';
                  riskTextColor = 'text-purple-400';
              }
              
              return (
                <div key={portfolio.id} className={`p-4 rounded-lg bg-gradient-to-r ${riskBgClass} to-transparent hover:bg-white/10 transition-all duration-300`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{portfolio.name}</span>
                    <span className={`text-sm ${riskTextColor}`}>Risk Score: {portfolio.risk}</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        portfolio.riskProfile === 'conservative' 
                          ? 'bg-gradient-to-r from-blue-500 to-blue-400' 
                          : portfolio.riskProfile === 'aggressive'
                            ? 'bg-gradient-to-r from-red-500 to-orange-400'
                            : 'bg-gradient-to-r from-purple-500 to-blue-500'
                      }`}
                      style={{ 
                        width: `${portfolio.risk * 10}%`,
                        animation: 'slideRight 1s ease-out forwards',
                        animationDelay: `${index * 200}ms`
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Compare; 