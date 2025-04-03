import React from 'react';
import { useAuth } from '../context/AuthContext';
import PortfolioSummary from '../components/dashboard/PortfolioSummary';
import InvestmentList from '../components/dashboard/InvestmentList';
import PlatformBreakdown from '../components/dashboard/PlatformBreakdown';
import QuickActions from '../components/dashboard/QuickActions';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
        Welcome back, {user?.name || 'Investor'}
      </h1>

      <PortfolioSummary />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <InvestmentList />
        </div>
        <div>
          <PlatformBreakdown />
        </div>
      </div>

      <QuickActions />
    </div>
  );
};

export default Dashboard;