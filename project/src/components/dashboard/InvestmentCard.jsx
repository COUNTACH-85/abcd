import React from 'react';
import { ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';
import RiskIndicator from '../common/RiskIndicator';
import TooltipIcon from '../common/TooltipIcon';

const InvestmentCard = ({ investment }) => {
  const {
    id,
    name,
    type,
    investedAmount,
    currentValue,
    returns,
    returnPercentage,
    risk,
    lastUpdated
  } = investment;

  // Calculate if return is positive
  const isPositiveReturn = returns >= 0;

  // Format lastUpdated to a readable string
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-lg">{name}</h3>
          <span className="text-xs px-2 py-1 bg-gray-100 rounded-full capitalize">
            {type === 'mf' ? 'Mutual Fund' : type === 'etf' ? 'ETF' : type}
          </span>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">Invested</span>
            <span className="font-medium">₹{investedAmount.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">Current Value</span>
            <span className="font-medium">₹{currentValue.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">Returns</span>
            <div className={`flex items-center ${isPositiveReturn ? 'text-green-600' : 'text-red-600'}`}>
              {isPositiveReturn ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1" />
              )}
              <span>
                ₹{Math.abs(returns).toLocaleString()} ({returnPercentage.toFixed(1)}%)
              </span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">Risk</span>
            <RiskIndicator risk={risk} />
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
        <span className="text-xs text-gray-500">
          Last updated: {formatDate(lastUpdated)}
        </span>
        
        <div className="flex gap-2">
          <button className="px-3 py-1 text-sm border border-blue-600 text-blue-600 rounded hover:bg-blue-50">
            Compare
          </button>
          <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
            Trade
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvestmentCard;