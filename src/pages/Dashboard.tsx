import Navbar from "@/components/Navbar";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

const releases = [
  {
    title: "Midnight Drive",
    type: "Сингл",
    status: "published",
    statusLabel: "Опубликован",
    platforms: 48,
    streams: "124K",
    earnings: "3 420 ₽",
    date: "12 март 2026",
    color: "#00FF87",
  },
  {
    title: "Echo Chamber EP",
    type: "EP",
    status: "moderation",
    statusLabel: "Модерация",
    platforms: 0,
    streams: "—",
    earnings: "—",
    date: "02 апр 2026",
    color: "#FFE600",
  },
  {
    title: "Lost in Static",
    type: "Сингл",
    status: "rejected",
    statusLabel: "Отклонён",
    platforms: 0,
    streams: "—",
    earnings: "—",
    date: "28 мар 2026",
    color: "#FF2D78",
  },
  {
    title: "Neon Skyline",
    type: "Альбом",
    status: "published",
    statusLabel: "Опубликован",
    platforms: 150,
    streams: "891K",
    earnings: "24 100 ₽",
    date: "15 янв 2026",
    color: "#00FF87",
  },
];

const notifications = [
  {
    icon: "CheckCircle2",
    text: "Релиз «Midnight Drive» прошёл модерацию",
    time: "2 часа назад",
    color: "#00FF87",
  },
  {
    icon: "Clock",
    text: "«Echo Chamber EP» поступил в очередь ручной проверки",
    time: "5 часов назад",
    color: "#FFE600",
  },
  {
    icon: "XCircle",
    text: "«Lost in Static» отклонён: некорректные метаданные",
    time: "вчера",
    color: "#FF2D78",
  },
];

const statCards = [
  { label: "Всего релизов", value: "12", icon: "Music", color: "#00C2FF" },
  { label: "Общих стримов", value: "1.2M", icon: "Headphones", color: "#00FF87" },
  { label: "Заработано", value: "54 820 ₽", icon: "Wallet", color: "#FFE600" },
  { label: "На модерации", value: "1", icon: "Clock", color: "#FF2D78" },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 max-w-7xl mx-auto px-6 pb-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-oswald text-3xl md:text-4xl font-bold text-white">
              ЛИЧНЫЙ <span className="gradient-text">КАБИНЕТ</span>
            </h1>
            <p className="font-golos text-white/40 mt-1">Привет, Артист 👋</p>
          </div>
          <Link to="/upload">
            <button className="neon-btn px-5 py-3 rounded-xl font-golos font-semibold text-sm flex items-center gap-2">
              <Icon name="Plus" size={16} />
              Новый релиз
            </button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((s) => (
            <div key={s.label} className="glass rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="font-golos text-xs text-white/40">{s.label}</span>
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: `${s.color}20` }}
                >
                  <Icon name={s.icon} size={14} style={{ color: s.color }} />
                </div>
              </div>
              <div className="font-oswald text-2xl font-bold text-white">{s.value}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Releases table */}
          <div className="lg:col-span-2">
            <div className="glass rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                <h2 className="font-oswald text-base font-semibold text-white">МОИ РЕЛИЗЫ</h2>
                <button className="font-golos text-xs text-white/40 hover:text-white/70 transition-colors">
                  Все релизы
                </button>
              </div>

              <div className="divide-y divide-white/5">
                {releases.map((r) => (
                  <div key={r.title} className="px-6 py-4 flex items-center gap-4 hover:bg-white/3 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                      <Icon name="Music2" size={16} className="text-white/40" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="font-golos font-semibold text-white text-sm truncate">{r.title}</div>
                      <div className="font-golos text-xs text-white/40">{r.type} · {r.date}</div>
                    </div>

                    <div className="hidden md:block text-right">
                      <div className="font-golos text-xs text-white/40">Стримы</div>
                      <div className="font-oswald text-sm text-white">{r.streams}</div>
                    </div>

                    <div className="hidden md:block text-right">
                      <div className="font-golos text-xs text-white/40">Доход</div>
                      <div className="font-oswald text-sm text-white">{r.earnings}</div>
                    </div>

                    <div
                      className="px-3 py-1 rounded-full text-xs font-golos font-semibold whitespace-nowrap"
                      style={{ background: `${r.color}20`, color: r.color }}
                    >
                      {r.statusLabel}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div>
            <div className="glass rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-white/5">
                <h2 className="font-oswald text-base font-semibold text-white">УВЕДОМЛЕНИЯ</h2>
              </div>
              <div className="divide-y divide-white/5">
                {notifications.map((n, i) => (
                  <div key={i} className="px-6 py-4">
                    <div className="flex items-start gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: `${n.color}20` }}
                      >
                        <Icon name={n.icon} size={14} style={{ color: n.color }} />
                      </div>
                      <div>
                        <p className="font-golos text-sm text-white/70 leading-snug">{n.text}</p>
                        <span className="font-golos text-xs text-white/30 mt-1 block">{n.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Moderator panel */}
            <div className="glass rounded-2xl p-5 mt-4 border border-[#FF2D78]/20">
              <div className="flex items-center gap-2 mb-3">
                <Icon name="ShieldAlert" size={16} className="text-[#FF2D78]" />
                <span className="font-oswald text-sm font-semibold text-[#FF2D78]">МОДЕРАТОРУ</span>
              </div>
              <p className="font-golos text-xs text-white/50 mb-4">
                1 релиз ожидает ручной проверки. Средний срок — 3 часа.
              </p>
              <button className="neon-btn-pink w-full py-2.5 rounded-xl font-golos font-semibold text-sm">
                Открыть очередь
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
