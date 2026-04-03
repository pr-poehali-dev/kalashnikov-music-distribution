import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Icon from "@/components/ui/icon";

const stats = [
  { value: "150+", label: "Платформ" },
  { value: "50K+", label: "Артистов" },
  { value: "2M+", label: "Треков" },
  { value: "99%", label: "Uptime" },
];

const platforms = [
  "Spotify", "Apple Music", "YouTube Music", "VK Музыка",
  "Яндекс.Музыка", "Deezer", "Tidal", "Amazon Music",
  "Spotify", "Apple Music", "YouTube Music", "VK Музыка",
  "Яндекс.Музыка", "Deezer", "Tidal", "Amazon Music",
];

const features = [
  {
    icon: "Zap",
    title: "Авто-модерация",
    desc: "ИИ проверяет релизы за 2 минуты. Автоматический анализ метаданных, обложки и аудио.",
    color: "#00FF87",
  },
  {
    icon: "Shield",
    title: "Ручная проверка",
    desc: "Команда модераторов проверяет сложные случаи. Уведомления в реальном времени.",
    color: "#FF2D78",
  },
  {
    icon: "Globe",
    title: "150+ платформ",
    desc: "Spotify, Apple Music, VK Музыка, Яндекс и ещё 146 стриминговых сервисов.",
    color: "#00C2FF",
  },
  {
    icon: "TrendingUp",
    title: "Аналитика",
    desc: "Детальная статистика по стримам, доходам и аудитории в личном кабинете.",
    color: "#FFE600",
  },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen grid-bg flex items-center overflow-hidden pt-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#00FF87]/5 blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#FF2D78]/5 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-[#00C2FF]/5 blur-3xl animate-float" style={{ animationDelay: "4s" }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-[#00FF87] animate-pulse" />
              <span className="text-sm font-golos text-white/70">Модерация в реальном времени</span>
            </div>

            <h1
              className="font-oswald text-6xl md:text-8xl font-bold leading-none tracking-tight mb-6 animate-fade-in"
              style={{ animationDelay: "0.1s", opacity: 0 }}
            >
              ТВОЯ МУЗЫКА<br />
              <span className="gradient-text">НА ВЕСЬ МИР</span>
            </h1>

            <p
              className="font-golos text-lg md:text-xl text-white/60 max-w-2xl mb-10 leading-relaxed animate-fade-in"
              style={{ animationDelay: "0.2s", opacity: 0 }}
            >
              Дистрибутируй треки на 150+ платформ за 24 часа. Автоматическая модерация,
              прозрачная аналитика, честные роялти без скрытых комиссий.
            </p>

            <div
              className="flex flex-wrap gap-4 animate-fade-in"
              style={{ animationDelay: "0.3s", opacity: 0 }}
            >
              <Link to="/upload">
                <button className="neon-btn px-8 py-4 rounded-xl text-base font-bold font-golos flex items-center gap-2">
                  <Icon name="Upload" size={18} />
                  Загрузить релиз
                </button>
              </Link>
              <Link to="/pricing">
                <button className="glass px-8 py-4 rounded-xl text-base font-semibold font-golos text-white hover:bg-white/10 transition-all flex items-center gap-2">
                  Смотреть тарифы
                  <Icon name="ArrowRight" size={18} />
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 animate-float">
          <div className="glass-strong rounded-2xl p-6 w-72 neon-border-green border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#00FF87]/20 flex items-center justify-center">
                <Icon name="CheckCircle2" size={24} className="text-[#00FF87]" />
              </div>
              <div>
                <div className="text-sm font-golos text-white/50">Релиз одобрен</div>
                <div className="font-oswald text-white font-semibold">MIDNIGHT DRIVE</div>
              </div>
            </div>
            <div className="space-y-2">
              {["Spotify ✓", "Apple Music ✓", "Яндекс.Музыка ✓"].map((p) => (
                <div key={p} className="flex items-center gap-2 text-sm font-golos text-white/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FF87]" />
                  {p}
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <span className="text-xs font-golos text-white/40">Модерация: 1м 47с</span>
            </div>
          </div>
        </div>
      </section>

      {/* Ticker */}
      <section className="py-6 border-y border-white/5 overflow-hidden bg-[#00FF87]/5">
        <div className="flex animate-ticker whitespace-nowrap">
          {platforms.map((p, i) => (
            <span key={i} className="inline-flex items-center gap-4 px-8 font-oswald text-sm text-[#00FF87]/70 tracking-widest uppercase">
              {p}
              <span className="text-[#00FF87]/30">◆</span>
            </span>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="glass rounded-2xl p-6 text-center hover:bg-white/8 transition-all">
              <div className="font-oswald text-4xl md:text-5xl font-bold gradient-text mb-2">{s.value}</div>
              <div className="font-golos text-sm text-white/50">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white mb-4">
            КАК ЭТО <span className="gradient-text-pink">РАБОТАЕТ</span>
          </h2>
          <p className="font-golos text-white/50 max-w-xl mx-auto">
            Полный цикл дистрибуции с автоматической и ручной модерацией
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.title} className="glass rounded-2xl p-6 hover:bg-white/8 transition-all group">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:scale-110"
                style={{ background: `${f.color}20` }}
              >
                <Icon name={f.icon} size={24} style={{ color: f.color }} />
              </div>
              <h3 className="font-oswald text-lg font-semibold text-white mb-2">{f.title}</h3>
              <p className="font-golos text-sm text-white/50 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="glass rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00FF87]/5 via-transparent to-[#FF2D78]/5" />
          <div className="relative z-10">
            <h2 className="font-oswald text-4xl md:text-6xl font-bold text-white mb-4">
              ГОТОВ ЗАПУСТИТЬ<br /><span className="gradient-text">ПЕРВЫЙ РЕЛИЗ?</span>
            </h2>
            <p className="font-golos text-white/50 mb-8 max-w-lg mx-auto">
              Регистрируйся бесплатно. Первый релиз загружается за 5 минут.
            </p>
            <Link to="/upload">
              <button className="neon-btn px-10 py-4 rounded-xl text-lg font-bold font-golos">
                Начать бесплатно
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-oswald text-lg font-bold">
          SOUND<span className="neon-text-green">DROP</span>
        </span>
        <p className="font-golos text-sm text-white/30">© 2026 SoundDrop. Все права защищены.</p>
        <div className="flex gap-6">
          {["Политика", "Оферта", "Поддержка"].map((t) => (
            <button key={t} className="font-golos text-sm text-white/40 hover:text-white/70 transition-colors">{t}</button>
          ))}
        </div>
      </footer>
    </div>
  );
}