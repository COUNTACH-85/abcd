import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';

const QuickActions = () => {
  const actions = [
    {
      name: 'Buy Assets',
      description: 'Purchase stocks, mutual funds, or ETFs',
      path: '/execute',
      icon: '💰',
    },
    {
      name: 'Compare Markets',
      description: 'Analyze market performance',
      path: '/compare',
      icon: '📊',
    },
    {
      name: 'View Reports',
      description: 'Check your portfolio reports',
      path: '/reports',
      icon: '📈',
    },
    {
      name: 'Settings',
      description: 'Manage your preferences',
      path: '/profile',
      icon: '⚙️',
    },
  ];

  return (
    <Card className="h-full">
      <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action) => (
          <Link
            key={action.name}
            to={action.path}
            className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 group hover:scale-105 transform"
          >
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-blue-600 flex items-center justify-center text-xl">
                {action.icon}
              </div>
              <div>
                <h3 className="font-medium group-hover:text-purple-400 transition-colors">
                  {action.name}
                </h3>
                <p className="text-sm text-gray-400">
                  {action.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Card>
  );
};

export default QuickActions; 