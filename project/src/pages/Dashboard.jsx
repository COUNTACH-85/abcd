import React from 'react';
import PortfolioSummary from '../components/dashboard/PortfolioSummary';
import InvestmentList from '../components/dashboard/InvestmentList';
import PlatformBreakdown from '../components/dashboard/PlatformBreakdown';
import QuickActions from '../components/dashboard/QuickActions';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="dashboard-component glass-effect rounded-xl p-4">
        <h2 className="text-xl font-semibold mb-4">Portfolio Summary</h2>
        <PortfolioSummary />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="dashboard-component glass-effect rounded-xl p-4">
            <h2 className="text-xl font-semibold mb-4">Investments</h2>
            <InvestmentList />
          </div>
        </div>
        <div>
          <div className="dashboard-component glass-effect rounded-xl p-4">
            <h2 className="text-xl font-semibold mb-4">Platform Breakdown</h2>
            <PlatformBreakdown />
          </div>
        </div>
      </div>

      <div className="dashboard-component glass-effect rounded-xl p-4">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <QuickActions />
      </div>
    </div>
  );
};

export default Dashboard;