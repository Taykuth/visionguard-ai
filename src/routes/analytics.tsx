import { createFileRoute, Link } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { convexQuery } from '@convex-dev/react-query'
import { api } from '../../convex/_generated/api'
import { 
  BarChart3, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Calendar,
  Filter,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  LayoutDashboard,
  ShieldAlert,
  Camera,
  Settings,
  LogOut,
  ChevronDown
} from 'lucide-react'
import { useState } from 'react'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  BarChart,
  Bar,
  Cell
} from 'recharts'

export const Route = createFileRoute('/analytics')({
  component: AnalyticsPage,
})

const hourlyData = [
  { time: '08:00', defects: 2, total: 120 },
  { time: '09:00', defects: 5, total: 140 },
  { time: '10:00', defects: 1, total: 110 },
  { time: '11:00', defects: 8, total: 150 },
  { time: '12:00', defects: 3, total: 130 },
  { time: '13:00', defects: 0, total: 140 },
  { time: '14:00', defects: 4, total: 160 },
  { time: '15:00', defects: 2, total: 155 },
]

const defectTypeData = [
  { name: 'Kapak Eksik', value: 45, color: '#10b981' },
  { name: 'Etiket Hatalı', value: 25, color: '#3b82f6' },
  { name: 'Yüzey Çatlağı', value: 20, color: '#f59e0b' },
  { name: 'Boyut Hatası', value: 10, color: '#ef4444' },
]

function AnalyticsPage() {
  const { data: factories } = useSuspenseQuery(convexQuery(api.factories.list, {}))
  const [selectedFactoryId, setSelectedFactoryId] = useState<any>(factories[0]?._id)

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-900 bg-slate-950 flex flex-col shrink-0">
        <Link to="/" className="p-6 flex items-center gap-3">
          <div className="bg-emerald-600 p-1.5 rounded-lg">
            <LayoutDashboard className="w-6 h-6 text-slate-950" />
          </div>
          <span className="font-bold text-lg tracking-tight italic">VisionGuard</span>
        </Link>

        <nav className="flex-1 px-4 space-y-1 mt-4">
          <SidebarLink icon={<LayoutDashboard className="w-5 h-5" />} label="Canlı İzleme" to="/dashboard" />
          <SidebarLink icon={<ShieldAlert className="w-5 h-5" />} label="İhlaller" to="/dashboard" />
          <SidebarLink icon={<BarChart3 className="w-5 h-5" />} label="Analiz" active to="/analytics" />
          <SidebarLink icon={<Camera className="w-5 h-5" />} label="Kameralar" to="/dashboard" />
          <SidebarLink icon={<Settings className="w-5 h-5" />} label="Ayarlar" to="/settings" />
        </nav>

        <div className="p-4 border-t border-slate-900">
          <div className="bg-slate-900/40 rounded-2xl p-4 border border-slate-800">
             <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 text-center">Kurumsal Panel</p>
             <button className="w-full flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors py-2 bg-slate-950 border border-slate-800 rounded-lg">
              <LogOut className="w-3 h-3" />
              Geri Dön
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto custom-scrollbar p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <div>
              <h1 className="text-4xl font-black mb-3 tracking-tighter uppercase italic text-white">Verimlilik Analitiği</h1>
              <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">Tesis verimlilik ve kalite metrikleri</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <select 
                  value={selectedFactoryId} 
                  onChange={(e) => setSelectedFactoryId(e.target.value)}
                  className="appearance-none bg-slate-900 border border-slate-800 px-6 py-3 pr-12 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 hover:bg-slate-800 transition-all cursor-pointer shadow-xl"
                >
                  {factories.map(f => (
                    <option key={f._id} value={f._id}>{f.name}</option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              <button className="flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-emerald-900/40">
                <Download className="w-4 h-4" />
                Rapor İndir
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <AnalyticsStatCard 
              label="Günlük Toplam Hata" 
              value="142" 
              subValue="+12.5% dünden" 
              trend="up" 
              icon={<AlertCircle className="w-5 h-5 text-red-400" />} 
            />
            <AnalyticsStatCard 
              label="Ortalama Doğruluk" 
              value="%99.2" 
              subValue="+0.4% geçen haftadan" 
              trend="up" 
              icon={<CheckCircle2 className="w-5 h-5 text-emerald-400" />} 
            />
            <AnalyticsStatCard 
              label="Kritik İhlaller" 
              value="8" 
              subValue="-3 dünden" 
              trend="down" 
              icon={<TrendingUp className="w-5 h-5 text-orange-400" />} 
            />
            <AnalyticsStatCard 
              label="Hattaki Ortalama Hız" 
              value="45 p/dk" 
              subValue="Stabil" 
              icon={<Clock className="w-5 h-5 text-blue-400" />} 
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Main Production Chart */}
            <div className="bg-slate-900/40 border border-slate-800 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500/20 group-hover:bg-emerald-500 transition-colors" />
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Saatlik Kalite Dağılımı</h3>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Normal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Defolu</span>
                  </div>
                </div>
              </div>
              
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={hourlyData}>
                    <defs>
                      <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorDefects" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis 
                      dataKey="time" 
                      stroke="#475569" 
                      fontSize={10} 
                      fontWeight="bold"
                      tickLine={false} 
                      axisLine={false} 
                      dy={10}
                    />
                    <YAxis 
                      stroke="#475569" 
                      fontSize={10} 
                      fontWeight="bold"
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '16px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}
                      itemStyle={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}
                    />
                    <Area type="monotone" dataKey="total" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
                    <Area type="monotone" dataKey="defects" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorDefects)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Defect Distribution */}
            <div className="bg-slate-900/40 border border-slate-800 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-2 h-full bg-blue-500/20 group-hover:bg-blue-500 transition-colors" />
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-10">Kusur Kategorileri Analizi</h3>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={defectTypeData} layout="vertical">
                    <XAxis type="number" hide />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      stroke="#64748b" 
                      fontSize={10} 
                      fontWeight="bold"
                      tickLine={false} 
                      axisLine={false} 
                      width={100}
                    />
                    <Tooltip 
                      cursor={{fill: 'rgba(255,255,255,0.05)'}}
                      contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '16px' }}
                    />
                    <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={24}>
                      {defectTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                {defectTypeData.map((item) => (
                  <div key={item.name} className="flex items-center gap-3 p-3 bg-slate-950/50 border border-slate-800 rounded-xl">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.name}</span>
                    <span className="text-xs font-black text-white ml-auto">%{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* History Table */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="p-10 border-b border-slate-800 flex justify-between items-center bg-slate-900/20">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Arşiv Kayıtları</h3>
              <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-500 hover:text-emerald-400 transition-colors">
                <Filter className="w-4 h-4" />
                Filtrele
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-800">
                    <th className="px-10 py-6">Zaman</th>
                    <th className="px-10 py-6">Ünite</th>
                    <th className="px-10 py-6">Tespit</th>
                    <th className="px-10 py-6">Güven</th>
                    <th className="px-10 py-6">Durum</th>
                    <th className="px-10 py-6">Analiz</th>
                  </tr>
                </thead>
                <tbody className="text-xs font-bold">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i} className="border-b border-slate-800/50 hover:bg-emerald-500/[0.02] transition-colors group">
                      <td className="px-10 py-6 text-slate-500 font-mono">14:2{i}:12</td>
                      <td className="px-10 py-6 text-white uppercase tracking-tighter">Hat-0{i} Ana Ünite</td>
                      <td className="px-10 py-6">
                        <span className="px-3 py-1.5 bg-red-500/10 text-red-500 rounded-lg text-[9px] font-black uppercase tracking-widest border border-red-500/20">Kapak Eksik</span>
                      </td>
                      <td className="px-10 py-6 font-mono text-emerald-400 font-black">%9{i}.4</td>
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-2 uppercase text-[9px] tracking-widest text-orange-500">
                          <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                          İnceleniyor
                        </div>
                      </td>
                      <td className="px-10 py-6 text-right">
                        <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-emerald-500 transition-colors">Görüntüle</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function SidebarLink({ icon, label, active = false, to }: { icon: React.ReactNode, label: string, active?: boolean, to: string }) {
  return (
    <Link to={to} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all ${
      active ? 'bg-emerald-600 text-slate-950 shadow-xl shadow-emerald-600/20' : 'text-slate-400 hover:text-white hover:bg-slate-900'
    }`}>
      {icon}
      {label}
    </Link>
  )
}

function AnalyticsStatCard({ label, value, subValue, trend, icon }: { label: string, value: string, subValue: string, trend?: 'up' | 'down', icon: React.ReactNode }) {
  return (
    <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2rem] shadow-xl hover:border-slate-700 transition-all group">
      <div className="flex items-center justify-between mb-6">
        <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl group-hover:scale-110 transition-transform">
          {icon}
        </div>
        {trend && (
          <div className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest ${trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
            {trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            {trend === 'up' ? '+12%' : '-4%'}
          </div>
        )}
      </div>
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">{label}</p>
      <div className="flex items-baseline gap-3">
        <p className="text-4xl font-black text-white tracking-tighter">{value}</p>
        <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest truncate">{subValue}</p>
      </div>
    </div>
  )
}
