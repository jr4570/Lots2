import React from 'react';
import { ArrowLeft, Gift, PieChart, BarChart } from 'lucide-react';

interface AdminDashboardProps {
  lotteryHistory: Array<{
    tier: string;
    timestamp: number;
  }>;
  tierStats: {
    special: number;
    gold: number;
    silver: number;
    bronze: number;
    basic: number;
  };
  totalPlays: number;
  t: {
    adminDashboard: string;
    drawHistory: string;
    tiers: Record<string, string>;
    noHistory: string;
    back: string;
    totalDraws: string;
    tierStats: string;
  };
  tierColors: Record<string, string>;
  onBack: () => void;
  onLogout: () => void;
}

export function AdminDashboard({ 
  lotteryHistory, 
  tierStats,
  totalPlays,
  t, 
  tierColors,
  onBack,
  onLogout
}: AdminDashboardProps) {
  const handleBack = () => {
    onLogout();
    onBack();
  };

  const tiers = ['special', 'gold', 'silver', 'bronze', 'basic'];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white hover:bg-gray-50 transition-colors text-gray-700 shadow-sm border border-gray-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.back}</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-800">{t.adminDashboard}</h1>
        </div>

        <div className="grid gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <PieChart className="text-blue-500" />
              {t.totalDraws}
            </h2>
            <div className="text-4xl font-bold text-gray-800">
              {totalPlays}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <BarChart className="text-green-500" />
              {t.tierStats}
            </h2>
            <div className="space-y-3">
              {tiers.map((tier) => (
                <div key={tier} className="flex items-center justify-between">
                  <span className={`font-medium ${tierColors[tier]}`}>
                    {t.tiers[tier]}
                  </span>
                  <div className="flex items-center gap-4">
                    <div className="w-48 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${tier === 'special' ? 'bg-purple-500' : 
                          tier === 'gold' ? 'bg-yellow-500' :
                          tier === 'silver' ? 'bg-gray-400' :
                          tier === 'bronze' ? 'bg-amber-700' :
                          'bg-blue-500'}`}
                        style={{
                          width: `${(tierStats[tier as keyof typeof tierStats] / totalPlays * 100) || 0}%`
                        }}
                      />
                    </div>
                    <span className="text-gray-600 font-medium min-w-[3ch] text-right">
                      {tierStats[tier as keyof typeof tierStats]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Gift className="text-blue-500" />
            {t.drawHistory}
          </h2>
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {lotteryHistory.length === 0 ? (
              <p className="text-gray-500 text-center py-8">{t.noHistory}</p>
            ) : (
              lotteryHistory.map((result, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                >
                  <span className={`font-medium ${tierColors[result.tier]}`}>
                    {t.tiers[result.tier]}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(result.timestamp).toLocaleString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}