import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { analyticsService } from '../services/dataService';
import SkeletonLoader from '../components/SkeletonLoader';
import { BarChart2, Activity, Globe, Clock } from 'lucide-react';

const AnalyticsPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['analytics-dashboard'],
    queryFn: analyticsService.getDashboardData,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  if (error) return <div className="p-12 text-center text-red-500">Error loading analytics data.</div>;

  return (
    <div className="py-12 max-w-7xl mx-auto px-6 bg-white text-slate-900">
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-2 uppercase tracking-tight">Engineering Analytics</h1>
        <p className="text-slate-500 font-mono text-sm">Real-time telemetry and traffic distribution.</p>
      </header>

      {isLoading ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => <SkeletonLoader key={i} className="h-32" />)}
          </div>
          <SkeletonLoader className="h-64 w-full" />
        </div>
      ) : (
        <div className="space-y-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard 
              icon={<Activity className="text-blue-600" size={20} />} 
              label="Total Page Views" 
              value={data?.total_views} 
              subtext="Accumulated baseline"
            />
            <StatCard 
              icon={<Globe className="text-indigo-600" size={20} />} 
              label="Unique Paths" 
              value={data?.path_stats?.length} 
              subtext="Distributed content"
            />
            <StatCard 
              icon={<Clock className="text-zinc-600" size={20} />} 
              label="Uptime" 
              value="99.9%" 
              subtext="Predictable availability"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Paths Table */}
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Traffic Distribution</h3>
              </div>
              <div className="p-0">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="px-6 py-3 font-semibold text-slate-900">Path</th>
                      <th className="px-6 py-3 font-semibold text-slate-900 text-right">Views</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {data?.path_stats?.map((stat, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 text-slate-600 font-mono text-xs">{stat.path}</td>
                        <td className="px-6 py-4 text-right font-medium text-slate-900">{stat.views}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Daily Views Simplified Chart/List */}
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Recent Activity (7d)</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {data?.daily_stats?.map((day, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="w-20 text-[10px] font-mono text-slate-400">{day.date}</div>
                      <div className="flex-grow h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full" 
                          style={{ width: `${(day.views / Math.max(...data.daily_stats.map(d => d.views))) * 100}%` }}
                        />
                      </div>
                      <div className="w-8 text-right text-xs font-medium text-slate-900">{day.views}</div>
                    </div>
                  ))}
                  {(!data?.daily_stats || data.daily_stats.length === 0) && (
                    <p className="text-center py-12 text-slate-400 italic text-sm">Waiting for incoming telemetry...</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ icon, label, value, subtext }) => (
  <div className="bg-white border border-slate-200 p-6 rounded-lg transition-colors">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-slate-50 rounded-md">
        {icon}
      </div>
    </div>
    <div className="space-y-1">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
      <h4 className="text-2xl font-bold text-slate-900">{value}</h4>
      <p className="text-[10px] text-slate-400 italic font-mono">{subtext}</p>
    </div>
  </div>
);

export default AnalyticsPage;
