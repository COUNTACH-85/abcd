import React from 'react';
import { Wallet, TrendingUp, PieChart } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

const PortfolioSummary = () => {
  const { portfolioData } = usePortfolio();
  
  // Calculate summary metrics
  const totalInvestment = portfolioData.reduce((sum, item) => sum + item.investedAmount, 0);
  const currentValue = portfolioData.reduce((sum, item) => sum + item.currentValue, 0);
  const totalReturn = currentValue - totalInvestment;
  const returnPercentage = (totalReturn / totalInvestment) * 100;
  
  const summaryCards = [
    {
      title: 'Total Investment',
      value: `₹${totalInvestment.toLocaleString()}`,
      icon: <Wallet className="w-10 h-10 text-blue-500" />,
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Current Value',
      value: `₹${currentValue.toLocaleString()}`,
      icon: <PieChart className="w-10 h-10 text-green-500" />,
      bgColor: 'bg-green-50',
    },
    {
      title: 'Overall Return',
      value: `₹${totalReturn.toLocaleString()} (${returnPercentage.toFixed(1)}%)`,
      icon: <TrendingUp className="w-10 h-10 text-purple-500" />,
      bgColor: 'bg-purple-50',
      textColor: totalReturn >= 0 ? 'text-green-600' : 'text-red-600',
    },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Portfolio Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {summaryCards.map((card, index) => (
          <div 
            key={index}
            className={`${card.bgColor} p-6 rounded-lg shadow-sm`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600 mb-1">{card.title}</p>
                <p className={`text-2xl font-bold ${card.textColor || 'text-gray-800'}`}>
                  {card.value}
                </p>
              </div>
              {card.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioSummary;