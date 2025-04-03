import api from './api';

const portfolioService = {
  // Get all portfolio investments
  getAllInvestments: async () => {
    try {
      const response = await api.portfolio.getAll();
      return response.data;
    } catch (error) {
      console.error('Failed to fetch portfolio data:', error);
      throw error;
    }
  },

  // Get investments by platform
  getInvestmentsByPlatform: async (platform) => {
    try {
      const response = await api.portfolio.getByPlatform(platform);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch ${platform} investments:`, error);
      throw error;
    }
  },

  // Get investment details by ID
  getInvestmentById: async (id) => {
    try {
      const response = await api.portfolio.getById(id);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch investment details for ID ${id}:`, error);
      throw error;
    }
  },

  // Get platform summary
  getPlatformSummary: async () => {
    try {
      const portfolio = await portfolioService.getAllInvestments();
      
      // Group investments by platform and calculate totals
      const summary = portfolio.reduce((result, item) => {
        if (!result[item.platform]) {
          result[item.platform] = {
            totalInvested: 0,
            currentValue: 0,
            returns: 0,
            count: 0,
          };
        }
        
        result[item.platform].totalInvested += item.investedAmount;
        result[item.platform].currentValue += item.currentValue;
        result[item.platform].returns += (item.currentValue - item.investedAmount);
        result[item.platform].count += 1;
        
        return result;
      }, {});
      
      return Object.entries(summary).map(([platform, data]) => ({
        platform,
        ...data,
        returnPercentage: (data.returns / data.totalInvested) * 100,
      }));
    } catch (error) {
      console.error('Failed to calculate platform summary:', error);
      throw error;
    }
  },

  // Get portfolio statistics
  getPortfolioStats: async () => {
    try {
      const portfolio = await portfolioService.getAllInvestments();
      
      // Calculate overall statistics
      const totalInvested = portfolio.reduce((sum, item) => sum + item.investedAmount, 0);
      const currentValue = portfolio.reduce((sum, item) => sum + item.currentValue, 0);
      const totalReturns = currentValue - totalInvested;
      
      // Group by investment type
      const byType = portfolio.reduce((result, item) => {
        if (!result[item.type]) {
          result[item.type] = {
            count: 0,
            invested: 0,
            currentValue: 0,
          };
        }
        
        result[item.type].count += 1;
        result[item.type].invested += item.investedAmount;
        result[item.type].currentValue += item.currentValue;
        
        return result;
      }, {});
      
      // Calculate allocation percentages
      const allocation = Object.entries(byType).map(([type, data]) => ({
        type,
        percentage: (data.currentValue / currentValue) * 100,
        value: data.currentValue,
      }));
      
      return {
        totalInvested,
        currentValue,
        totalReturns,
        returnPercentage: (totalReturns / totalInvested) * 100,
        allocation,
        investmentCount: portfolio.length,
      };
    } catch (error) {
      console.error('Failed to calculate portfolio statistics:', error);
      throw error;
    }
  },
};

export default portfolioService;