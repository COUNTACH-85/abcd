import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import Card from '@/components/common/Card';
import { ArrowUp, ArrowDown, Sparkles } from 'lucide-react';

function Execute() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [amount, setAmount] = useState('');
  const { isDarkMode } = useTheme();

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  const assets = [
    { id: 1, name: 'Bitcoin', symbol: 'BTC', price: 63500, change: '+2.4%' },
    { id: 2, name: 'Ethereum', symbol: 'ETH', price: 3200, change: '+1.8%' },
    { id: 3, name: 'Stock Index', symbol: 'SPY', price: 450, change: '+0.5%' },
  ];

  const handleExecute = () => {
    // Handle execution logic
  };

  const AssetCard = ({ asset }) => (
    <div 
      onClick={() => setSelectedAsset(asset)}
      className={`glass-effect p-6 cursor-pointer transition-all duration-500 relative group ${
        selectedAsset?.id === asset.id 
          ? 'border-2 border-purple-500 shadow-lg shadow-purple-500/20 transform scale-[1.02]' 
          : 'hover:border-purple-500/50 hover:shadow-md hover:shadow-purple-500/10 hover:transform hover:scale-[1.01]'
      }`}
    >
      <div className="flex items-center space-x-4 relative z-10">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-600 animate-pulse-slow flex items-center justify-center transform transition-transform duration-500 group-hover:scale-110">
          <span className="font-bold">{asset.symbol}</span>
        </div>
        <div>
          <h3 className="font-bold text-lg transition-all duration-300 group-hover:text-purple-400">{asset.name}</h3>
          <div className="flex items-center space-x-2">
            <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
              ${asset.price.toLocaleString()}
            </span>
            <span className={`text-sm flex items-center ${
              asset.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
            }`}>
              {asset.change.startsWith('+') 
                ? <ArrowUp className="w-3 h-3 mr-1 transition-transform duration-300 group-hover:translate-y-[-2px]" /> 
                : <ArrowDown className="w-3 h-3 mr-1 transition-transform duration-300 group-hover:translate-y-[2px]" />
              }
              {asset.change}
            </span>
          </div>
        </div>
      </div>

      {/* Hover effect elements */}
      <div className="absolute inset-0 rounded-xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-xl transform translate-x-8 translate-y-[-50%] group-hover:translate-y-[-30%] transition-transform duration-700"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/5 rounded-full blur-xl transform translate-y-[50%] group-hover:translate-y-[30%] transition-transform duration-700"></div>
      </div>
      
      {/* Sparkles effect on selection or hover */}
      <div className={`absolute top-3 right-3 opacity-0 transform rotate-12 scale-0 transition-all duration-500 ${
        selectedAsset?.id === asset.id ? 'opacity-100 scale-100' : 'group-hover:opacity-70 group-hover:scale-100'
      }`}>
        <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
      </div>
    </div>
  );

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
        Execute Trade
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6 animate-fade-in">
          <div className="glass-effect p-6">
            <h2 className="text-xl font-semibold mb-4">Select Asset</h2>
            <div className="grid gap-4">
              {assets.map((asset, index) => (
                <AssetCard 
                  key={asset.id} 
                  asset={asset}
                  style={{ animationDelay: `${index * 100}ms` }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
          <Card className="glass-effect sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Trade Details</h2>
            {selectedAsset ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Amount</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    placeholder="Enter amount"
                  />
                </div>

                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>Asset</span>
                    <span>{selectedAsset.name}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>Price</span>
                    <span>${selectedAsset.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>Total</span>
                    <span>${(selectedAsset.price * (amount || 0)).toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={handleExecute}
                  className="w-full button-animate bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-medium"
                >
                  Execute Trade
                </button>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-8">
                Select an asset to start trading
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Execute; 