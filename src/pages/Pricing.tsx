import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Icon from "@/components/ui/icon";

const plans = [
  {
    name: "СТАРТ",
    price: "0",
    period: "₽/мес",
    desc: "Для начинающих артистов",
    color: "#00C2FF",
    features: [
      "1 релиз в месяц",
      "15% комиссия с роялти",
      "20 платформ",
      "Базовая аналитика",
      "Email-поддержка",
    ],
    cta: "Начать бесплатно",
    highlighted: false,
  },
  {
    name: "ПРОФИ",
    price: "990",
    period: "₽/мес",
    desc: "Для активных исполнителей",
    color: "#00FF87",
    features: [
      "Безлимит релизов",
      "0% комиссия с роялти",
      "150+ платформ",
      "Расширенная аналитика",
      "Приоритетная поддержка",
      "Ручная модерация",
      "Предрелизная проверка",
    ],
    cta: "Подключить тариф",
    highlighted: true,
  },
  {
    name: "ЛЕЙБЛ",
    price: "4990",
    period: "₽/мес",
    desc: "Для лейблов и агентств",
    color: "#FF2D78",
    features: [
      "До 50 артистов",
      "0% комиссия с роялти",
      "150+ платформ",
      "Полная аналитика лейбла",
      "Персональный менеджер",
      "API интеграция",
      "White-label решение",
    ],
    cta: "Связаться с нами",
    highlighted: false,
  },
];

const faq = [
  {
    q: "Как работает модерация?",
    a: "Авто-модерация проверяет технические параметры за ~2 минуты. Ручная модерация подключается при спорных случаях — команда проверяет в течение 4 часов.",
  },
  {
    q: "Когда я получу роялти?",
    a: "Выплаты — ежемесячно, до 15 числа. Минимальный порог — 500₽. Деньги приходят на карту или счёт.",
  },
  {
    q: "Можно сменить тариф?",
    a: "Да, тариф меняется в любой момент. При переходе на ПРОФИ вы сразу получаете все преимущества.",
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 max-w-7xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
          <Icon name="Sparkles" size={14} className="text-[#FFE600]" />
          <span className="text-sm font-golos text-white/70">Честные условия, без скрытых платежей</span>
        </div>
        <h1 className="font-oswald text-5xl md:text-7xl font-bold text-white mb-4">
          ВЫБЕРИ <span className="gradient-text">ТАРИФ</span>
        </h1>
        <p className="font-golos text-white/50 max-w-lg mx-auto">
          От бесплатного старта до полного решения для лейблов
        </p>
      </section>

      <section className="pb-24 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl p-8 transition-all ${
                plan.highlighted
                  ? "glass-strong scale-105 neon-border-green border"
                  : "glass border border-white/5"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="neon-btn px-4 py-1 rounded-full text-xs font-bold font-golos">
                    ПОПУЛЯРНЫЙ
                  </span>
                </div>
              )}

              <div className="mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${plan.color}20` }}
                >
                  <div className="w-3 h-3 rounded-full" style={{ background: plan.color }} />
                </div>
                <div className="font-oswald text-sm tracking-widest text-white/50 mb-1">{plan.name}</div>
                <div className="flex items-baseline gap-1">
                  <span className="font-oswald text-5xl font-bold text-white">{plan.price}</span>
                  <span className="font-golos text-white/40 text-sm">{plan.period}</span>
                </div>
                <p className="font-golos text-sm text-white/40 mt-1">{plan.desc}</p>
              </div>

              <div className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: `${plan.color}20` }}
                    >
                      <Icon name="Check" size={12} style={{ color: plan.color }} />
                    </div>
                    <span className="font-golos text-sm text-white/70">{f}</span>
                  </div>
                ))}
              </div>

              <button
                className={`w-full py-3 rounded-xl font-golos font-semibold text-sm transition-all ${
                  plan.highlighted
                    ? "neon-btn"
                    : "glass border border-white/10 text-white hover:bg-white/10"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-24 max-w-3xl mx-auto px-6">
        <h2 className="font-oswald text-3xl font-bold text-white text-center mb-10">
          ЧАСТО ЗАДАВАЕМЫЕ <span className="gradient-text-pink">ВОПРОСЫ</span>
        </h2>
        <div className="space-y-4">
          {faq.map((item) => (
            <div key={item.q} className="glass rounded-2xl p-6">
              <h3 className="font-oswald text-base font-semibold text-white mb-2">{item.q}</h3>
              <p className="font-golos text-sm text-white/50 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
