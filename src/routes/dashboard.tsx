import { createFileRoute, Link } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { convexQuery } from '@convex-dev/react-query'
import { useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { 
  LayoutDashboard, 
  Camera, 
  ShieldAlert, 
  BarChart3, 
  Settings, 
  Bell, 
  Search,
  Plus,
  Monitor,
  Activity,
  AlertCircle,
  Clock,
  LogOut,
  ChevronDown,
  Factory,
  Play
} from 'lucide-react'
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  const { data: factories } = useSuspenseQuery(convexQuery(api.factories.list, {}))
  const [selectedFactoryId, setSelectedFactoryId] = useState<any>(factories[0]?._id)
  
  const selectedFactory = useMemo(() => 
    factories.find(f => f._id === (selectedFactoryId || factories[0]?._id)) || factories[0]
  , [factories, selectedFactoryId])
  
  const startSimulation = useMutation(api.demo.startSimulation)
  
  const { data: cameras } = useSuspenseQuery(
    convexQuery(api.cameras.listByFactory, { factoryId: selectedFactory?._id })
  )
  
  const { data: recentDetections } = useSuspenseQuery(
    convexQuery(api.detections.listRecent, { factoryId: selectedFactory?._id, limit: 10 })
  )

  const activeCamera = cameras.find(c => c.status === 'online') || cameras[0]

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
          <SidebarLink icon={<Monitor className="w-5 h-5" />} label="Canlı İzleme" active to="/dashboard" />
          <SidebarLink icon={<ShieldAlert className="w-5 h-5" />} label="İhlaller" to="/dashboard" />
          <SidebarLink icon={<BarChart3 className="w-5 h-5" />} label="Analiz" to="/analytics" />
          <SidebarLink icon={<Camera className="w-5 h-5" />} label="Kameralar" to="/dashboard" />
          <SidebarLink icon={<Settings className="w-5 h-5" />} label="Ayarlar" to="/settings" />
        </nav>

        <div className="p-4 border-t border-slate-900">
          <div className="bg-slate-900/40 rounded-2xl p-4 border border-slate-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-bold border border-emerald-500/20">
                BH
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold truncate text-white">Bora Taykut Hindal</p>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Yönetici</p>
              </div>
            </div>
            <button className="w-full flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors py-2 bg-slate-950 border border-slate-800 rounded-lg">
              <LogOut className="w-3 h-3" />
              Çıkış Yap
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-20 border-b border-slate-900 bg-slate-950/50 backdrop-blur-xl flex items-center justify-between px-8 z-20">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold tracking-tight">Merkezi Kontrol Paneli</h1>
            <div className="h-6 w-px bg-slate-800" />
            <div className="relative">
              <select 
                value={selectedFactoryId} 
                onChange={(e) => setSelectedFactoryId(e.target.value)}
                className="appearance-none bg-slate-900 border border-slate-800 px-4 py-2 pr-10 rounded-xl text-sm font-bold text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 hover:bg-slate-800 transition-all cursor-pointer"
              >
                {factories.map(f => (
                  <option key={f._id} value={f._id}>{f.name}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center gap-6">
             <button 
              onClick={() => startSimulation({ factoryId: selectedFactory?._id })}
              className="hidden md:flex items-center gap-2 bg-emerald-600/10 border border-emerald-500/20 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest text-emerald-400 hover:bg-emerald-600/20 transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Demosu Başlat
            </button>

            <div className="relative hidden lg:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input 
                type="text" 
                placeholder="Loglarda ara..." 
                className="bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 w-64"
              />
            </div>
            <button className="relative p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
              <Bell className="w-5 h-5 text-slate-400" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-950" />
            </button>
          </div>
        </header>

        {/* Dashboard Content Area */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard 
              label="Günlük Üretim" 
              value="14,210" 
              trend="+8%" 
              icon={<Activity className="w-5 h-5 text-blue-400" />} 
            />
            <StatCard 
              label="Hata Oranı" 
              value="%0.74" 
              trend="-1.2%" 
              trendDown 
              icon={<AlertCircle className="w-5 h-5 text-red-400" />} 
            />
            <StatCard 
              label="Aktif Kamera" 
              value={`${cameras?.filter(c => c.status === 'online').length || 0}/${cameras?.length || 0}`} 
              icon={<Camera className="w-5 h-5 text-emerald-400" />} 
            />
            <StatCard 
              label="AI Çalışma Süresi" 
              value="99.9%" 
              icon={<Clock className="w-5 h-5 text-purple-400" />} 
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full min-h-[800px]">
            {/* Live Feed Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] overflow-hidden flex flex-col h-[550px] relative group shadow-2xl">
                <div className="absolute inset-x-0 top-0 p-6 z-10 flex items-center justify-between pointer-events-none">
                  <div className="flex items-center gap-3 px-4 py-2 bg-slate-950/80 backdrop-blur-xl border border-slate-800 rounded-2xl pointer-events-auto">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="font-black uppercase tracking-[0.2em] text-[10px] text-white">Canlı Yayın: {activeCamera?.name}</span>
                  </div>
                  <div className="flex gap-2 pointer-events-auto">
                    <div className="px-3 py-1.5 bg-slate-950/80 backdrop-blur border border-slate-800 rounded-xl flex items-center gap-2">
                       <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">FPS:</span>
                       <span className="text-xs font-mono text-emerald-400 font-bold">60.2</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" 
                    className="w-full h-full object-cover opacity-70 scale-105 group-hover:scale-110 transition-transform duration-[2s]"
                    alt="Production Line"
                  />
                  
                  {/* AI Detection Boxes Overlay */}
                  <AnimatePresence>
                    {recentDetections.slice(0, 2).map((d, i) => (
                      <motion.div 
                        key={d._id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className={`absolute w-40 h-40 border-2 rounded-xl pointer-events-none flex flex-col items-start ${
                          d.severity === 'high' ? 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.4)]' : 'border-emerald-500'
                        }`}
                        style={{ 
                          top: i === 0 ? '25%' : '55%', 
                          left: i === 0 ? '30%' : '50%' 
                        }}
                      >
                        <span className={`px-2 py-1 text-[9px] font-black uppercase tracking-wider rounded-br-lg ${
                          d.severity === 'high' ? 'bg-red-500 text-white' : 'bg-emerald-500 text-slate-950'
                        }`}>
                          {d.subType || d.type} %{(d.confidence * 100).toFixed(1)}
                        </span>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />
                </div>
              </div>

              {/* Other Cameras Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {cameras?.map((camera) => (
                  <div key={camera._id} className="bg-slate-900/40 border border-slate-800 rounded-[1.5rem] p-4 hover:bg-slate-900 hover:border-slate-700 transition-all cursor-pointer group">
                    <div className="aspect-video bg-black rounded-xl mb-4 overflow-hidden relative border border-slate-800">
                      <div className="absolute inset-0 bg-slate-800/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Camera className="w-6 h-6 text-slate-600" />
                      </div>
                      <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 bg-slate-950/90 backdrop-blur rounded-lg text-[9px] font-black uppercase tracking-widest border border-slate-800/50">
                        <div className={`w-1.5 h-1.5 rounded-full ${camera.status === 'online' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-500'}`} />
                        {camera.status}
                      </div>
                    </div>
                    <p className="text-xs font-bold text-white truncate mb-1">{camera.name}</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Gecikme: 12ms</p>
                  </div>
                ))}
                <button className="border-2 border-dashed border-slate-800 rounded-[1.5rem] p-4 flex flex-col items-center justify-center gap-2 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all text-slate-500 hover:text-emerald-400 group">
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 group-hover:bg-emerald-500/10 transition-colors">
                    <Plus className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest">Kamera Ekle</span>
                </button>
              </div>
            </div>

            {/* Notifications / Detection Log */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] flex flex-col h-[700px] shadow-2xl">
              <div className="p-8 border-b border-slate-800 flex items-center justify-between">
                <h3 className="font-bold flex items-center gap-2 uppercase tracking-widest text-xs">
                  <Activity className="w-4 h-4 text-emerald-500" />
                  Olay Günlüğü
                </h3>
                <span className="px-2 py-0.5 bg-slate-800 rounded text-[10px] font-bold text-slate-400 uppercase tracking-widest">Gerçek Zamanlı</span>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                {recentDetections?.length === 0 && (
                   <div className="flex flex-col items-center justify-center h-full text-slate-600 opacity-50 italic text-sm">
                      <ShieldAlert className="w-12 h-12 mb-4" />
                      <p>Henüz bir tespit yapılmadı</p>
                   </div>
                )}
                {recentDetections?.map((detection) => (
                  <DetectionItem key={detection._id} detection={detection} />
                ))}
              </div>
              <div className="p-6 border-t border-slate-800">
                <button className="w-full py-3 bg-slate-950 border border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white hover:bg-slate-900 transition-all">
                  Geçmiş Logları Görüntüle
                </button>
              </div>
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

function StatCard({ label, value, trend, trendDown = false, icon }: { label: string, value: string, trend?: string, trendDown?: boolean, icon: React.ReactNode }) {
  return (
    <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2rem] hover:border-slate-700 transition-colors group">
      <div className="flex items-center justify-between mb-6">
        <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl group-hover:scale-110 transition-transform">
          {icon}
        </div>
        {trend && (
          <span className={`text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-wider ${trendDown ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
            {trend}
          </span>
        )}
      </div>
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">{label}</p>
      <p className="text-4xl font-bold tracking-tighter text-white">{value}</p>
    </div>
  )
}

function DetectionItem({ detection }: { detection: any }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-5 bg-slate-950 border border-slate-800 rounded-[1.5rem] hover:border-slate-600 transition-all group"
    >
      <div className="flex justify-between items-start mb-4">
        <span className={`text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-[0.1em] ${
          detection.severity === 'high' ? 'bg-red-500 text-white' : 
          detection.severity === 'medium' ? 'bg-orange-500 text-white' : 'bg-blue-500 text-white'
        }`}>
          {detection.severity === 'high' ? 'Kritik' : detection.severity === 'medium' ? 'Orta Seviye' : 'Düşük'}
        </span>
        <span className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">{new Date(detection.timestamp).toLocaleTimeString()}</span>
      </div>
      
      <div className="space-y-1 mb-4">
         <p className="text-xs font-black text-white uppercase tracking-wider">
           {detection.type === 'defect' ? 'Üretim Kusuru' : detection.type === 'safety_violation' ? 'İSG İhlali' : 'Sistem Analizi'}
         </p>
         <p className="text-xs text-slate-400 font-medium">{detection.subType || detection.type}</p>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-slate-900">
        <div className="flex items-center gap-1.5 text-[9px] font-black text-emerald-500 uppercase tracking-widest">
          <Activity className="w-3 h-3" />
          Güven: %{(detection.confidence * 100).toFixed(0)}
        </div>
        <button className="text-[9px] font-black text-slate-500 hover:text-white uppercase tracking-[0.2em] transition-colors">
          Detay
        </button>
      </div>
    </motion.div>
  )
}
