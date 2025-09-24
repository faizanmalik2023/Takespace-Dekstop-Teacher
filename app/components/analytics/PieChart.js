'use client';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function PieChart({ title, data, colors, bare = false, height = 400 }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  const chartData = data.map((item, index) => ({
    ...item,
    percentage: Math.round((item.value / total) * 100),
    color: colors[index % colors.length]
  }));

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
    const percentage = total ? Math.round((value / total) * 100) : 0;
    if (percentage < 8) return null;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="#FFFFFF" textAnchor="middle" dominantBaseline="middle" fontSize="14" fontWeight="600" fontFamily="Inter">
        {value}
      </text>
    );
  };

  const isMasteryChart = data.length > 2;

  return (
    <div className="w-full max-w-[400px]">
      <h3 className="mb-4" style={{ fontFamily: 'Inter', fontWeight: '600', fontSize: '20px', lineHeight: '24px', color: '#1D2026' }}>{title}</h3>
      <div className={`${bare ? '' : 'bg-white rounded-xl shadow-[0px_2px_6px_rgba(13,10,44,0.08)] border border-black/5'} relative`} style={{ width: '100%', height: `${height}px`, padding: bare ? '0' : '26px 47px 55px 46px' }}>
        <div className="relative flex items-center justify-center" style={{ height: bare ? '100%' : 'calc(100% - 40px)', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie data={chartData} cx="50%" cy="50%" innerRadius={0} outerRadius={isMasteryChart ? 85 : 95} dataKey="value" startAngle={90} endAngle={450} labelLine={false} label={CustomLabel}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
        {!bare && (
          <div className="absolute bottom-0 left-0 right-0" style={{ height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', bottom: '20px' }}>
            {!isMasteryChart ? (
              <div className="flex items-center justify-center gap-6">
                {data.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="rounded-full" style={{ width: '12px', height: '12px', background: colors[index] }} />
                    <span style={{ fontFamily: 'Inter', fontSize: '14px', lineHeight: '20px', color: '#1D2026', fontWeight: '500' }}>{item.label}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <div className="flex items-center gap-1"><div className="rounded-full" style={{ width: '10px', height: '10px', background: colors[0] }} /><span style={{ fontFamily: 'Inter', fontSize: '11px', color: '#666', fontWeight: '400' }}>Mastered</span></div>
                  <div className="flex items-center gap-1"><div className="rounded-full" style={{ width: '10px', height: '10px', background: colors[1] }} /><span style={{ fontFamily: 'Inter', fontSize: '11px', color: '#666', fontWeight: '400' }}>Revised Later</span></div>
                  <div className="flex items-center gap-1"><div className="rounded-full" style={{ width: '10px', height: '10px', background: colors[2] }} /><span style={{ fontFamily: 'Inter', fontSize: '11px', color: '#666', fontWeight: '400' }}>Last Revision</span></div>
                </div>
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <div className="flex items-center gap-1"><div className="rounded-full" style={{ width: '10px', height: '10px', background: colors[3] }} /><span style={{ fontFamily: 'Inter', fontSize: '11px', color: '#666', fontWeight: '400' }}>3 More Revision left</span></div>
                  <div className="flex items-center gap-1"><div className="rounded-full" style={{ width: '10px', height: '10px', background: colors[4] }} /><span style={{ fontFamily: 'Inter', fontSize: '11px', color: '#666', fontWeight: '400' }}>Difficult</span></div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}





