import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { portfolioService } from '../services/portfolioService';

const PortfolioContext = createContext();

export const usePortfolio = () => useContext(PortfolioContext);

export const PortfolioProvider = ({ children }) => {
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState({
    mutualFunds: [],
    stocks: [],
    totalValue: 0,
    platformBreakdown: {}
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      setPortfolio({
        mutualFunds: [],
        stocks: [],
        totalValue: 0,
        platformBreakdown: {}
      });
      setLoading(false);
      return;
    }

    const fetchPortfolio = async () => {
      setLoading(true);
      try {
        const portfolioData = await portfolioService.getUserPortfolio();
        setPortfolio(portfolioData);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch portfolio:", err);
        setError("Failed to load portfolio data");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [user]);

  const refreshPortfolio = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const portfolioData = await portfolioService.getUserPortfolio();
      setPortfolio(portfolioData);
      setError(null);
    } catch (err) {
      console.error("Failed to refresh portfolio:", err);
      setError("Failed to refresh portfolio data");
    } finally {
      setLoading(false);
    }
  };

  const executeTransaction = async (transaction) => {
    try {
      await portfolioService.executeTransaction(transaction);
      await refreshPortfolio();
      return true;
    } catch (err) {
      console.error("Transaction failed:", err);
      setError("Transaction failed");
      return false;
    }
  };

  const value = {
    portfolio,
    loading,
    error,
    refreshPortfolio,
    executeTransaction
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};