import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import InvestmentCard from './InvestmentCard';

const InvestmentList = () => {
  const { portfolioData } = usePortfolio();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Filter investments based on search and type filter
  const filteredInvestments = portfolioData.filter(investment => {
    const matchesSearch = investment.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || investment.type === filterType;
    return matchesSearch && matchesFilter;
  });

  // Group by platform
  const groupedByPlatform = filteredInvestments.reduce((acc, investment) => {
    if (!acc[investment.platform]) {
      acc[investment.platform] = [];
    }
    acc[investment.platform].push(investment);
    return acc;
  }, {});

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Investments</h2>
        
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search investments..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="stock">Stocks</option>
            <option value="mf">Mutual Funds</option>
            <option value="etf">ETFs</option>
          </select>
        </div>
      </div>

      {Object.keys(groupedByPlatform).length > 0 ? (
        Object.entries(groupedByPlatform).map(([platform, investments]) => (
          <div key={platform} className="mb-8">
            <div className="flex items-center mb-3">
              <h3 className="text-lg font-semibold">{platform}</h3>
              <div className="ml-3 px-3 py-1 bg-gray-100 rounded-full text-sm">
                ₹{investments.reduce((sum, inv) => sum + inv.currentValue, 0).toLocaleString()}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {investments.map((investment) => (
                <InvestmentCard key={investment.id} investment={investment} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No investments found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default InvestmentList;