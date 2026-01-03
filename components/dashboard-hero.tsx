import { Button } from "@/components/ui/button"
import { Shield, Lock, Eye } from "lucide-react"

export function DashboardHero() {
  return (
    <section className="relative bg-gradient-to-br from-primary via-primary/90 to-accent overflow-hidden">
      {/* Islamic Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-20 relative">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Logo/Icon */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">MasjidChain</h1>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight text-balance">
            Transparansi Keuangan Masjid dengan Blockchain
          </h2>

          <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto text-pretty">
            Sistem laporan keuangan berbasis blockchain untuk meningkatkan kepercayaan, keamanan data, dan akuntabilitas
            pengelolaan dana umat.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 h-12 px-8 text-lg">
              Lihat Dashboard
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 h-12 px-8 text-lg"
            >
              Pelajari Lebih Lanjut
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 pt-12 text-white/90">
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              <span className="text-sm font-medium">Terenkripsi</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">Immutable</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              <span className="text-sm font-medium">Transparan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-auto" preserveAspectRatio="none">
          <path
            fill="var(--background)"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          ></path>
        </svg>
      </div>
    </section>
  )
}
