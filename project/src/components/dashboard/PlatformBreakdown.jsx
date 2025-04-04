import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import Card from '../common/Card';

const PlatformBreakdown = () => {
  const { portfolio } = usePortfolio();
  const platforms = [
    { name: 'Mutual Funds', value: 45, color: 'from-purple-500 to-purple-600' },
    { name: 'Stocks', value: 30, color: 'from-blue-500 to-blue-600' },
    { name: 'ETFs', value: 15, color: 'from-indigo-500 to-indigo-600' },
    { name: 'Bonds', value: 10, color: 'from-violet-500 to-violet-600' },
  ];

  return (
    <Card className="h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Platform Breakdown</h2>
        <select className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-sm focus:outline-none focus:border-purple-500">
          <option value="value" className="text-black">By Value</option>
          <option value="returns" className="text-black">By Returns</option>
        </select>
      </div>

      <div className="space-y-4">
        {platforms.map((platform) => (
          <div key={platform.name} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{platform.name}</span>
              <span className="font-medium">{platform.value}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${platform.color} transform origin-left transition-transform duration-500 ease-out animate-slide-in`}
                style={{ width: `${platform.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-white/5 rounded-lg">
        <div className="flex justify-between items-center text-sm text-gray-400">
          <span>Total Assets</span>
          <span className="font-medium">$1,234,567</span>
        </div>
      </div>
    </Card>
  );
};

export default PlatformBreakdown; 