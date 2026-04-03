import Navbar from "@/components/Navbar";
import Icon from "@/components/ui/icon";

const contacts = [
  {
    icon: "Mail",
    label: "Email",
    value: "support@kalashnikov.ru",
    sub: "Отвечаем в течение 4 часов",
    color: "#00C2FF",
  },
  {
    icon: "MessageCircle",
    label: "Telegram",
    value: "@kalashnikov_dist",
    sub: "Быстрые ответы 24/7",
    color: "#00FF87",
  },
  {
    icon: "Phone",
    label: "Телефон",
    value: "+7 (495) 123-45-67",
    sub: "Пн–Пт, 10:00–19:00 МСК",
    color: "#FFE600",
  },
];

const socials = [
  { icon: "Music2", label: "VK", color: "#00C2FF" },
  { icon: "Instagram", label: "Instagram", color: "#FF2D78" },
  { icon: "Youtube", label: "YouTube", color: "#FF2D78" },
  { icon: "Send", label: "Telegram", color: "#00C2FF" },
];

export default function Contacts() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-32 pb-16 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="font-oswald text-5xl md:text-7xl font-bold text-white mb-4">
            СВЯЖИСЬ С <span className="gradient-text">НАМИ</span>
          </h1>
          <p className="font-golos text-white/50 max-w-lg mx-auto">
            Вопросы по дистрибуции, модерации или партнёрству — мы здесь
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact form */}
          <div className="glass rounded-3xl p-8">
            <h2 className="font-oswald text-xl font-bold text-white mb-6">НАПИСАТЬ НАМ</h2>
            <div className="space-y-4">
              <div>
                <label className="block font-golos text-xs text-white/40 mb-1.5 uppercase tracking-wider">Имя</label>
                <input
                  type="text"
                  placeholder="Ваше имя"
                  className="w-full glass rounded-xl px-4 py-3 font-golos text-sm text-white placeholder-white/20 outline-none border border-transparent focus:border-[#00FF87]/40 transition-all"
                />
              </div>
              <div>
                <label className="block font-golos text-xs text-white/40 mb-1.5 uppercase tracking-wider">Email</label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="w-full glass rounded-xl px-4 py-3 font-golos text-sm text-white placeholder-white/20 outline-none border border-transparent focus:border-[#00FF87]/40 transition-all"
                />
              </div>
              <div>
                <label className="block font-golos text-xs text-white/40 mb-1.5 uppercase tracking-wider">Тема</label>
                <select className="w-full glass rounded-xl px-4 py-3 font-golos text-sm text-white/70 outline-none border border-transparent bg-transparent transition-all">
                  <option value="" className="bg-[#0d0d0d]">Выберите тему</option>
                  <option value="moderation" className="bg-[#0d0d0d]">Вопрос по модерации</option>
                  <option value="billing" className="bg-[#0d0d0d]">Оплата и тарифы</option>
                  <option value="distribution" className="bg-[#0d0d0d]">Дистрибуция</option>
                  <option value="partnership" className="bg-[#0d0d0d]">Партнёрство</option>
                  <option value="other" className="bg-[#0d0d0d]">Другое</option>
                </select>
              </div>
              <div>
                <label className="block font-golos text-xs text-white/40 mb-1.5 uppercase tracking-wider">Сообщение</label>
                <textarea
                  rows={4}
                  placeholder="Опишите ваш вопрос..."
                  className="w-full glass rounded-xl px-4 py-3 font-golos text-sm text-white placeholder-white/20 outline-none border border-transparent focus:border-[#00FF87]/40 transition-all resize-none"
                />
              </div>
              <button className="neon-btn w-full py-3 rounded-xl font-golos font-bold text-sm">
                Отправить сообщение
              </button>
            </div>
          </div>

          {/* Contacts + Socials */}
          <div className="space-y-4">
            {contacts.map((c) => (
              <div key={c.label} className="glass rounded-2xl p-6 flex items-center gap-4 hover:bg-white/8 transition-all">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${c.color}20` }}
                >
                  <Icon name={c.icon} size={22} style={{ color: c.color }} />
                </div>
                <div>
                  <div className="font-golos text-xs text-white/40 mb-0.5">{c.label}</div>
                  <div className="font-golos font-semibold text-white">{c.value}</div>
                  <div className="font-golos text-xs text-white/30 mt-0.5">{c.sub}</div>
                </div>
              </div>
            ))}

            <div className="glass rounded-2xl p-6">
              <p className="font-oswald text-sm font-semibold text-white/40 mb-4 tracking-wider">СОЦСЕТИ</p>
              <div className="grid grid-cols-4 gap-3">
                {socials.map((s) => (
                  <button
                    key={s.label}
                    className="aspect-square rounded-xl flex flex-col items-center justify-center gap-1 transition-all hover:scale-105"
                    style={{ background: `${s.color}15` }}
                  >
                    <Icon name={s.icon} size={20} style={{ color: s.color }} />
                    <span className="font-golos text-xs text-white/40">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Moderator notification */}
            <div className="glass rounded-2xl p-6 border border-[#00FF87]/15">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 rounded-full bg-[#00FF87] animate-pulse" />
                <span className="font-oswald text-sm font-semibold text-white">МОДЕРАЦИЯ РАБОТАЕТ</span>
              </div>
              <p className="font-golos text-sm text-white/50">
                Среднее время ответа команды модерации: <span className="text-[#00FF87] font-semibold">2.5 часа</span>.
                Авто-проверка доступна 24/7.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}