import { createFileRoute, Link } from '@tanstack/react-router'
import { 
  Settings, 
  Cpu, 
  ShieldCheck, 
  Bell, 
  Database, 
  Upload, 
  Play, 
  Square,
  CheckCircle2,
  Trash2,
  LayoutDashboard,
  ShieldAlert,
  BarChart3,
  Camera,
  LogOut,
  Download
} from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/settings')({
  component: SettingsPage,
})

function SettingsPage() {
  const [confidence, setConfidence] = useState(0.75)
  const [modelRunning, setModelRunning] = useState(true)

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
          <SidebarLink icon={<BarChart3 className="w-5 h-5" />} label="Analiz" to="/analytics" />
          <SidebarLink icon={<Camera className="w-5 h-5" />} label="Kameralar" to="/dashboard" />
          <SidebarLink icon={<Settings className="w-5 h-5" />} label="Ayarlar" active to="/settings" />
        </nav>

        <div className="p-4 border-t border-slate-900">
           <div className="p-4 bg-slate-900/40 rounded-2xl border border-slate-800 text-center">
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2 text-center italic">Admin Mode</p>
           </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto custom-scrollbar p-8">
        <div className="max-w-4xl mx-auto py-12">
          <div className="flex items-center gap-4 mb-16">
             <div className="p-4 bg-emerald-600/10 border border-emerald-500/20 rounded-[1.5rem]">
                <Settings className="w-8 h-8 text-emerald-500" />
             </div>
             <div>
                <h1 className="text-4xl font-black tracking-tighter uppercase italic">Sistem Konfigürasyonu</h1>
                <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">AI parametreleri ve global ayarlar</p>
             </div>
          </div>

          <div className="space-y-12">
            {/* AI Model Management */}
            <section className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-10 relative overflow-hidden shadow-2xl">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-2 bg-slate-950 border border-slate-800 rounded-xl">
                   <Cpu className="w-5 h-5 text-emerald-500" />
                </div>
                <h2 className="text-xl font-black uppercase tracking-tight italic">AI Model Kontrolü</h2>
              </div>

              <div className="space-y-8">
                <div className="flex items-center justify-between p-6 bg-slate-950 border border-slate-800 rounded-3xl group hover:border-emerald-500/30 transition-all">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform">
                      <ShieldCheck className="w-8 h-8 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-lg font-black text-white">YOLOv8-Quality-Pro.pt</p>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Sürüm: v2.4.1 • Optimizasyon: TensorRT</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setModelRunning(!modelRunning)}
                      className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        modelRunning 
                        ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20' 
                        : 'bg-emerald-600/10 text-emerald-500 hover:bg-emerald-600/20 border border-emerald-500/20'
                      }`}
                    >
                      {modelRunning ? <Square className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                      {modelRunning ? 'Durdur' : 'Başlat'}
                    </button>
                    <button className="p-3 text-slate-600 hover:text-red-500 transition-colors bg-slate-900 border border-slate-800 rounded-2xl">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="p-8 bg-slate-950 border border-slate-800 rounded-3xl space-y-6">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Güven Eşiği (Confidence)</label>
                    <span className="text-sm font-mono text-emerald-400 font-black">%{Math.round(confidence * 100)}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.01" 
                    value={confidence} 
                    onChange={(e) => setConfidence(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                     <span>Daha Hassas</span>
                     <span>Daha Katı</span>
                  </div>
                </div>

                <button className="w-full border-2 border-dashed border-slate-800 rounded-3xl p-10 flex flex-col items-center justify-center gap-4 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group">
                  <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl group-hover:scale-110 transition-transform">
                     <Upload className="w-8 h-8 text-slate-500 group-hover:text-emerald-500 transition-colors" />
                  </div>
                  <div className="text-center">
                     <p className="text-sm font-black text-white uppercase tracking-widest mb-1">Yeni Model Yükle</p>
                     <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Sürükle bırak veya dosyayı seç (.pt, .onnx)</p>
                  </div>
                </button>
              </div>
            </section>

            {/* Alert Configuration */}
            <section className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-10 shadow-2xl">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-2 bg-slate-950 border border-slate-800 rounded-xl">
                   <Bell className="w-5 h-5 text-orange-500" />
                </div>
                <h2 className="text-xl font-black uppercase tracking-tight italic">Bildirim & Alarm</h2>
              </div>

              <div className="grid gap-4">
                <ToggleSetting 
                  label="Telegram Entegrasyonu" 
                  desc="Kritik hatalarda belirlenen gruba anlık fotoğraf ve detay gönderir." 
                  enabled={true}
                />
                <ToggleSetting 
                  label="E-Posta Özetleri" 
                  desc="Mesai bitiminde üretim performans raporunu PDF olarak gönderir." 
                  enabled={false}
                />
                <ToggleSetting 
                  label="Donanım Alarmları" 
                  desc="Tesis içi sesli ve ışıklı uyarı sistemlerini tetikler." 
                  enabled={true}
                />
              </div>
            </section>

            {/* Database & Export */}
            <section className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-10 shadow-2xl">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-2 bg-slate-950 border border-slate-800 rounded-xl">
                   <Database className="w-5 h-5 text-blue-500" />
                </div>
                <h2 className="text-xl font-black uppercase tracking-tight italic">Veri & Arşiv</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button className="flex flex-col items-start p-6 bg-slate-950 border border-slate-800 rounded-3xl hover:bg-slate-900 transition-all group">
                  <div className="flex items-center justify-between w-full mb-4">
                     <div className="p-2 bg-slate-900 border border-slate-800 rounded-xl">
                        <Download className="w-5 h-5 text-slate-500 group-hover:text-white" />
                     </div>
                     <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest">32.4 GB</span>
                  </div>
                  <p className="text-sm font-black text-white uppercase tracking-widest mb-1">Veritabanını Yedekle</p>
                  <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Tüm log ve tespit verilerini dışa aktar</p>
                </button>
                <button className="flex flex-col items-start p-6 bg-slate-950 border border-slate-800 rounded-3xl hover:bg-red-500/5 hover:border-red-500/20 transition-all group">
                   <div className="flex items-center justify-between w-full mb-4">
                      <div className="p-2 bg-slate-900 border border-slate-800 rounded-xl group-hover:border-red-500/20">
                         <Trash2 className="w-5 h-5 text-slate-600 group-hover:text-red-500" />
                      </div>
                   </div>
                   <p className="text-sm font-black text-white uppercase tracking-widest mb-1 group-hover:text-red-500">Geçmişi Temizle</p>
                   <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">90 günden eski kayıtları kalıcı olarak sil</p>
                </button>
              </div>
            </section>
          </div>

          <div className="mt-20 flex justify-end gap-6">
            <button className="px-8 py-4 text-xs font-black uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-colors italic">İşlemi İptal Et</button>
            <button className="px-12 py-4 bg-white text-slate-950 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all transform hover:scale-105 active:scale-95 shadow-2xl">Ayarları Uygula</button>
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

function ToggleSetting({ label, desc, enabled }: { label: string, desc: string, enabled: boolean }) {
  const [isOn, setIsOn] = useState(enabled)

  return (
    <div className="flex items-center justify-between p-6 bg-slate-950 border border-slate-800 rounded-3xl hover:border-slate-600 transition-colors">
      <div className="max-w-[70%]">
        <p className="font-black text-xs text-white uppercase tracking-widest mb-1">{label}</p>
        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest leading-relaxed">{desc}</p>
      </div>
      <button 
        onClick={() => setIsOn(!isOn)}
        className={`w-14 h-7 rounded-full relative transition-all duration-300 shadow-inner ${isOn ? 'bg-emerald-600' : 'bg-slate-800'}`}
      >
        <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all duration-300 shadow-md ${isOn ? 'right-1' : 'left-1'}`} />
      </button>
    </div>
  )
}
