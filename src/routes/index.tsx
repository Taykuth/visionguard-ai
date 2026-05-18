import { createFileRoute, Link } from '@tanstack/react-router'
import { 
  ShieldCheck, 
  Camera, 
  BarChart3, 
  Settings, 
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  HardHat,
  Zap,
  Globe,
  Monitor,
  Cpu,
  Layers,
  Box,
  Truck,
  Users
} from 'lucide-react'
import { motion } from 'framer-motion'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500/30">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-600 p-2 rounded-xl shadow-lg shadow-emerald-900/20">
                <ShieldCheck className="w-6 h-6 text-slate-950" />
              </div>
              <span className="text-2xl font-bold tracking-tighter">VisionGuard <span className="text-emerald-500">AI</span></span>
            </div>
            
            <div className="hidden lg:flex items-center gap-10 text-sm font-semibold text-slate-400">
              <a href="#features" className="hover:text-white transition-colors relative group">
                Özellikler
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full" />
              </a>
              <a href="#solutions" className="hover:text-white transition-colors relative group">
                Çözümler
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full" />
              </a>
              <a href="#pricing" className="hover:text-white transition-colors relative group">
                Fiyatlandırma
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full" />
              </a>
            </div>

            <div className="flex items-center gap-4">
              <Link 
                to="/dashboard" 
                className="hidden sm:block text-sm font-bold text-slate-400 hover:text-white transition-colors"
              >
                Giriş Yap
              </Link>
              <Link 
                to="/dashboard"
                className="bg-white hover:bg-slate-100 text-slate-950 px-6 py-2.5 rounded-full text-sm font-bold transition-all transform hover:scale-105 active:scale-95 shadow-xl"
              >
                Ücretsiz Deneyin
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 lg:pt-56 lg:pb-48 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-emerald-500/5 blur-[120px] rounded-full opacity-50" />
          <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-blue-500/5 blur-[100px] rounded-full opacity-30" />
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/5 blur-[100px] rounded-full opacity-20" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-8"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              Endüstri 4.0'ın Öncü Yapay Zeka Çözümü
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-6xl lg:text-8xl font-black tracking-tight mb-8 leading-[1.1] bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500"
            >
              Üretim Hattınız İçin <br />
              <span className="text-emerald-500">Kusursuz Gözlem</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl lg:text-2xl text-slate-400 mb-12 leading-relaxed max-w-3xl mx-auto font-medium"
            >
              VisionGuard AI, saniyeler içinde binlerce ürünü denetler. 
              İnsan gözünün kaçırdığı hataları yakalayın, maliyetleri düşürün ve kaliteyi garanti altına alın.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-5"
            >
              <Link 
                to="/dashboard"
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-5 rounded-2xl text-xl font-bold transition-all shadow-2xl shadow-emerald-900/40 flex items-center justify-center gap-3 group"
              >
                Dashboard'u Başlat
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
              </Link>
              <Link 
                to="/dashboard"
                className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 px-10 py-5 rounded-2xl text-xl font-bold transition-all flex items-center justify-center gap-3"
              >
                <Monitor className="w-6 h-6" />
                Demo İzle
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Visual Feature Section */}
      <section className="py-24 bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl aspect-square"
              >
                 <img 
                    src="https://images.unsplash.com/photo-1565514020179-026b92b84bb6?q=80&w=2070&auto=format&fit=crop" 
                    className="w-full h-full object-cover"
                    alt="AI Industrial Inspection"
                 />
                 <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-transparent to-transparent opacity-80" />
                 
                 {/* Live Detection Indicators */}
                 <div className="absolute top-10 left-10 p-4 bg-slate-950/90 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl">
                    <div className="flex items-center gap-3 mb-4">
                       <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                       <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Canlı Analiz</span>
                    </div>
                    <div className="space-y-3">
                       <div className="flex items-center justify-between gap-8">
                          <span className="text-sm font-medium text-slate-500">Ürün Tipi:</span>
                          <span className="text-sm font-bold">Motor Bloğu</span>
                       </div>
                       <div className="flex items-center justify-between gap-8">
                          <span className="text-sm font-medium text-slate-500">Doğruluk:</span>
                          <span className="text-sm font-bold text-emerald-400">%99.8</span>
                       </div>
                    </div>
                 </div>

                 <div className="absolute bottom-10 right-10 flex flex-col gap-3">
                    <div className="p-1 rounded-lg border-2 border-red-500 bg-red-500/10">
                       <span className="block px-2 py-1 bg-red-500 text-[10px] font-black text-white uppercase">Hata: Yüzey Çatlağı</span>
                    </div>
                 </div>
              </motion.div>

              <div className="space-y-8">
                 <h2 className="text-4xl lg:text-5xl font-black leading-tight">
                    İnsan Gözünden <br /> 
                    <span className="text-emerald-500">100 Kat Daha Hızlı</span>
                 </h2>
                 <p className="text-lg text-slate-400 leading-relaxed">
                    Yapay zeka modellerimiz saniyede 60 kareyi işleyerek üretim hattınızdaki en küçük sapmaları bile yakalar. Karmaşık montaj hatlarından basit paketleme ünitelerine kadar her alanda yanınızdayız.
                 </p>
                 <div className="space-y-4">
                    <BenefitItem text="Yüksek hızlı YOLOv8 tabanlı mimari" />
                    <BenefitItem text="Işık ve açı değişimlerine karşı dirençli algoritma" />
                    <BenefitItem text="Gecikmesiz yerel (Edge) işleme kapasitesi" />
                    <BenefitItem text="Kolay entegrasyon ve API desteği" />
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-4xl lg:text-6xl font-black mb-6 italic">Full-Stack Kalite Kontrol</h2>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto">Üretimden güvenliğe, analitikten raporlamaya kadar her şey tek bir platformda.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<ShieldCheck className="w-8 h-8 text-emerald-400" />}
              title="Sıfır Hata Hedefi"
              desc="Mikroskobik kusurları tespit edin ve hatalı ürünlerin sevkiyatını tamamen engelleyin."
              color="emerald"
            />
            <FeatureCard 
              icon={<HardHat className="w-8 h-8 text-blue-400" />}
              title="İSG İzleme"
              desc="Yapay zeka ile kask, yelek ve tehlikeli bölge ihlallerini 7/24 otomatik denetleyin."
              color="blue"
            />
            <FeatureCard 
              icon={<BarChart3 className="w-8 h-8 text-purple-400" />}
              title="Tahminleme"
              desc="Üretim verilerinden yola çıkarak olası makine arızalarını ve hata trendlerini öngörün."
              color="purple"
            />
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-32 bg-slate-900/10 border-y border-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-4xl lg:text-6xl font-black mb-6 uppercase tracking-tighter">Sektörel Çözümler</h2>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto">VisionGuard AI, her sektöre özel optimize edilmiş yapay zeka modelleri sunar.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SolutionCard 
              icon={<Box className="w-6 h-6 text-emerald-500" />}
              title="Paketleme & Lojistik"
              desc="Eksik ürün tespiti, ambalaj hasarı ve barkod okuma süreçlerini otomatikleştirin."
            />
            <SolutionCard 
              icon={<Cpu className="w-6 h-6 text-blue-500" />}
              title="Elektronik Üretimi"
              desc="PCB kartlarındaki lehim hatalarını ve bileşen eksikliklerini mikron seviyesinde yakalayın."
            />
            <SolutionCard 
              icon={<Truck className="w-6 h-6 text-purple-500" />}
              title="Otomotiv"
              desc="Yüzey çizikleri, montaj hataları ve boya kusurlarını üretim hattında anlık tespit edin."
            />
            <SolutionCard 
              icon={<Users className="w-6 h-6 text-orange-500" />}
              title="İş Güvenliği"
              desc="Kişisel koruyucu ekipman (KKD) kullanımını ve tehlikeli bölge girişlerini takip edin."
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-32 bg-slate-900/30">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl lg:text-6xl font-black mb-20 uppercase tracking-tighter">Planlar</h2>
            <div className="grid md:grid-cols-3 gap-8">
               <PricingCard 
                  name="Başlangıç" 
                  price="5.000" 
                  currency="TL"
                  features={['3 Kamera Desteği', 'Temel Kusur Tespiti', 'E-posta Bildirimleri', '7 Günlük Veri Saklama', 'Topluluk Desteği']}
               />
               <PricingCard 
                  name="Profesyonel" 
                  price="15.000" 
                  currency="TL"
                  popular
                  features={['15 Kamera Desteği', 'İSG & Güvenlik Modülü', 'Telegram & Sesli Alarm', '30 Günlük Veri Saklama', 'API Erişimi', 'Öncelikli Destek']}
               />
               <PricingCard 
                  name="Kurumsal" 
                  price="Özel" 
                  features={['Sınırsız Kamera', 'Özel Model Eğitimi', 'Yerinde (On-premise) Kurulum', '24/7 Teknik Destek', 'Sınırsız Veri Saklama', 'SLA Garantisi']}
               />
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-slate-900 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <ShieldCheck className="w-8 h-8 text-emerald-500" />
                <span className="text-2xl font-bold tracking-tighter">VisionGuard AI</span>
              </div>
              <p className="text-slate-500 max-w-sm mb-8 font-medium">
                Türkiye'nin lider endüstriyel görüntü işleme platformu. Yapay zeka ile fabrikalarınızı daha akıllı, güvenli ve verimli hale getiriyoruz.
              </p>
              <div className="flex gap-4">
                <SocialIcon />
                <SocialIcon />
                <SocialIcon />
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-sm">Ürün</h4>
              <ul className="space-y-4 text-slate-500 text-sm font-medium">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Özellikler</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Modeller</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Güvenlik</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Entegrasyonlar</a></li>
              </ul>
            </div>
            <div>
               <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-sm">Kurumsal</h4>
               <ul className="space-y-4 text-slate-500 text-sm font-medium">
                  <li><a href="#" className="hover:text-emerald-400 transition-colors">Hakkımızda</a></li>
                  <li><a href="#" className="hover:text-emerald-400 transition-colors">Kariyer</a></li>
                  <li><a href="#" className="hover:text-emerald-400 transition-colors">İletişim</a></li>
                  <li><a href="#" className="hover:text-emerald-400 transition-colors">Blog</a></li>
               </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-600 font-medium italic">
              © 2024 VisionGuard AI Technologies Inc. Kocaeli, Türkiye.
            </p>
            <div className="flex gap-8 text-sm text-slate-600 font-bold uppercase tracking-widest">
              <a href="#" className="hover:text-white transition-colors">Gizlilik</a>
              <a href="#" className="hover:text-white transition-colors">Şartlar</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function BenefitItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-shrink-0 w-5 h-5 bg-emerald-500/20 rounded-full flex items-center justify-center">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
      </div>
      <span className="text-slate-300 font-medium">{text}</span>
    </div>
  )
}

function FeatureCard({ icon, title, desc, color }: { icon: React.ReactNode, title: string, desc: string, color: string }) {
  const colorClasses: Record<string, string> = {
    emerald: 'group-hover:border-emerald-500/50 group-hover:bg-emerald-500/5',
    blue: 'group-hover:border-blue-500/50 group-hover:bg-blue-500/5',
    purple: 'group-hover:border-purple-500/50 group-hover:bg-purple-500/5',
  }
  
  return (
    <div className={`p-10 rounded-[2.5rem] border border-slate-800 bg-slate-900/40 transition-all group duration-500 ${colorClasses[color]}`}>
      <div className="mb-8 p-4 rounded-2xl bg-slate-950 border border-slate-800 w-fit group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4 tracking-tight">{title}</h3>
      <p className="text-slate-400 leading-relaxed font-medium">
        {desc}
      </p>
    </div>
  )
}

function SolutionCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-8 rounded-3xl border border-slate-800/50 bg-slate-900/20 hover:bg-slate-900/40 transition-all hover:border-slate-700">
      <div className="mb-6 p-3 rounded-xl bg-slate-950 border border-slate-800 w-fit">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed font-medium">
        {desc}
      </p>
    </div>
  )
}

function PricingCard({ name, price, currency = "", popular = false, features }: { name: string, price: string, currency?: string, popular?: boolean, features: string[] }) {
   return (
      <div className={`relative p-10 rounded-[2.5rem] border ${popular ? 'border-emerald-500 bg-emerald-500/5 shadow-2xl shadow-emerald-900/20' : 'border-slate-800 bg-slate-900/40'} text-left transition-all hover:scale-[1.02]`}>
         {popular && (
            <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-slate-950 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">En Popüler</span>
         )}
         <h3 className="text-xl font-bold mb-2">{name}</h3>
         <div className="flex items-baseline gap-1 mb-8">
            <span className="text-4xl font-black">{price}{currency}</span>
            {price !== 'Özel' && <span className="text-slate-500 font-bold">/ay</span>}
         </div>
         <ul className="space-y-4 mb-10">
            {features.map((f, i) => (
               <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  {f}
               </li>
            ))}
         </ul>
         <button className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${popular ? 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-xl shadow-emerald-900/30' : 'bg-slate-800 text-white hover:bg-slate-700'}`}>
            Planı Seç
         </button>
      </div>
   )
}

function SocialIcon() {
   return (
      <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer">
         <Globe className="w-5 h-5 text-slate-400" />
      </div>
   )
}
