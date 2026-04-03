import { useState } from "react";
import Navbar from "@/components/Navbar";
import Icon from "@/components/ui/icon";

const steps = ["Файлы", "Метаданные", "Платформы", "Модерация"];

const platformGroups = [
  {
    label: "Главные",
    items: ["Spotify", "Apple Music", "YouTube Music", "Яндекс.Музыка", "VK Музыка", "Deezer"],
  },
  {
    label: "Остальные",
    items: ["Tidal", "Amazon Music", "Beatport", "SoundCloud", "Bandcamp", "Napster"],
  },
];

export default function Upload() {
  const [step, setStep] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [audioFile, setAudioFile] = useState<string | null>(null);
  const [coverFile, setCoverFile] = useState<string | null>(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([
    "Spotify", "Apple Music", "Яндекс.Музыка", "VK Музыка",
  ]);

  const togglePlatform = (p: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 max-w-4xl mx-auto px-6 pb-16">
        <div className="text-center mb-10">
          <h1 className="font-oswald text-4xl md:text-5xl font-bold text-white mb-2">
            ЗАГРУЗКА <span className="gradient-text">РЕЛИЗА</span>
          </h1>
          <p className="font-golos text-white/40">4 шага до публикации на 150+ платформах</p>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-0 mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <button
                onClick={() => setStep(i)}
                className={`flex items-center gap-2 flex-shrink-0 transition-all ${
                  i <= step ? "text-[#00FF87]" : "text-white/30"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-oswald font-bold border-2 transition-all ${
                    i < step
                      ? "bg-[#00FF87] border-[#00FF87] text-black"
                      : i === step
                      ? "border-[#00FF87] text-[#00FF87]"
                      : "border-white/20 text-white/30"
                  }`}
                >
                  {i < step ? <Icon name="Check" size={14} /> : i + 1}
                </div>
                <span className="hidden md:block font-golos text-sm font-medium">{s}</span>
              </button>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-px mx-3 transition-all ${i < step ? "bg-[#00FF87]/50" : "bg-white/10"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 0: Files */}
        {step === 0 && (
          <div className="space-y-4 animate-fade-in">
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => { e.preventDefault(); setDragging(false); setAudioFile("track.wav"); }}
              className={`glass rounded-2xl p-12 text-center border-2 border-dashed transition-all cursor-pointer ${
                dragging ? "border-[#00FF87] bg-[#00FF87]/5" : audioFile ? "border-[#00FF87]/50" : "border-white/10 hover:border-white/20"
              }`}
            >
              {audioFile ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-[#00FF87]/20 flex items-center justify-center">
                    <Icon name="Music2" size={28} className="text-[#00FF87]" />
                  </div>
                  <div className="font-golos font-semibold text-white">{audioFile}</div>
                  <span className="text-xs font-golos text-[#00FF87]">Готов к загрузке</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center">
                    <Icon name="Upload" size={28} className="text-white/30" />
                  </div>
                  <div>
                    <p className="font-golos font-semibold text-white">Перетащите аудиофайл</p>
                    <p className="font-golos text-sm text-white/40 mt-1">WAV / FLAC / MP3 · До 500MB</p>
                  </div>
                  <button
                    className="glass px-5 py-2 rounded-lg font-golos text-sm text-white/70 hover:text-white transition-all mt-2"
                    onClick={() => setAudioFile("track.wav")}
                  >
                    Выбрать файл
                  </button>
                </div>
              )}
            </div>

            <div className="glass rounded-2xl p-6">
              <p className="font-oswald text-sm font-semibold text-white/50 mb-4 tracking-wider">ОБЛОЖКА РЕЛИЗА</p>
              <div className="flex items-center gap-4">
                <div
                  className="w-20 h-20 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 cursor-pointer hover:bg-white/10 transition-all"
                  onClick={() => setCoverFile("cover.jpg")}
                >
                  {coverFile ? (
                    <Icon name="ImageIcon" size={28} className="text-[#00FF87]" />
                  ) : (
                    <Icon name="ImageIcon" size={28} className="text-white/20" />
                  )}
                </div>
                <div>
                  <p className="font-golos text-sm text-white font-medium">
                    {coverFile ? coverFile : "Загрузить обложку"}
                  </p>
                  <p className="font-golos text-xs text-white/40 mt-1">JPG, PNG · Минимум 3000×3000px</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Metadata */}
        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <div className="glass rounded-2xl p-6 space-y-4">
              {[
                { label: "Название релиза", placeholder: "Midnight Drive" },
                { label: "Исполнитель", placeholder: "Artist Name" },
                { label: "Жанр", placeholder: "Electronic / Pop" },
                { label: "Дата выхода", placeholder: "2026-04-15" },
              ].map((field) => (
                <div key={field.label}>
                  <label className="block font-golos text-xs text-white/40 mb-1.5 uppercase tracking-wider">{field.label}</label>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    className="w-full glass rounded-xl px-4 py-3 font-golos text-sm text-white placeholder-white/20 outline-none focus:border-[#00FF87]/50 border border-transparent transition-all"
                  />
                </div>
              ))}
              <div>
                <label className="block font-golos text-xs text-white/40 mb-1.5 uppercase tracking-wider">Лейбл / Издатель</label>
                <input
                  type="text"
                  placeholder="Self-released"
                  className="w-full glass rounded-xl px-4 py-3 font-golos text-sm text-white placeholder-white/20 outline-none focus:border-[#00FF87]/50 border border-transparent transition-all"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Platforms */}
        {step === 2 && (
          <div className="animate-fade-in space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-golos text-sm text-white/50">
                Выбрано: <span className="text-[#00FF87] font-semibold">{selectedPlatforms.length}</span> платформ
              </span>
              <button
                onClick={() => setSelectedPlatforms(platformGroups.flatMap((g) => g.items))}
                className="font-golos text-xs text-white/40 hover:text-white/70 transition-colors"
              >
                Выбрать все
              </button>
            </div>

            {platformGroups.map((group) => (
              <div key={group.label} className="glass rounded-2xl p-6">
                <p className="font-oswald text-xs tracking-widest text-white/40 mb-4 uppercase">{group.label}</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {group.items.map((p) => {
                    const active = selectedPlatforms.includes(p);
                    return (
                      <button
                        key={p}
                        onClick={() => togglePlatform(p)}
                        className={`px-4 py-3 rounded-xl font-golos text-sm font-medium transition-all text-left ${
                          active
                            ? "bg-[#00FF87]/15 text-[#00FF87] border border-[#00FF87]/30"
                            : "glass text-white/50 hover:text-white border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
                            active ? "bg-[#00FF87] border-[#00FF87]" : "border-white/20"
                          }`}>
                            {active && <Icon name="Check" size={10} className="text-black" />}
                          </div>
                          {p}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Step 3: Moderation */}
        {step === 3 && (
          <div className="animate-fade-in">
            <div className="glass rounded-2xl p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-[#00FF87]/15 flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                <Icon name="Zap" size={36} className="text-[#00FF87]" />
              </div>
              <h2 className="font-oswald text-2xl font-bold text-white mb-2">АВТО-МОДЕРАЦИЯ</h2>
              <p className="font-golos text-white/50 max-w-md mx-auto mb-8">
                Система проверит технические параметры аудио, соответствие метаданных
                и качество обложки за ~2 минуты. При необходимости подключится ручная проверка.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { label: "Аудио качество", icon: "Headphones", ok: true },
                  { label: "Метаданные", icon: "FileText", ok: true },
                  { label: "Обложка", icon: "ImageIcon", ok: false },
                ].map((check) => (
                  <div key={check.label} className="glass rounded-xl p-4 text-center">
                    <Icon
                      name={check.icon}
                      size={20}
                      className={check.ok ? "text-[#00FF87] mx-auto mb-2" : "text-white/30 mx-auto mb-2"}
                    />
                    <p className="font-golos text-xs text-white/50">{check.label}</p>
                    <div className={`text-xs font-semibold mt-1 font-golos ${check.ok ? "text-[#00FF87]" : "text-white/30"}`}>
                      {check.ok ? "Готово" : "Не загружено"}
                    </div>
                  </div>
                ))}
              </div>

              <button className="neon-btn px-10 py-4 rounded-xl font-golos font-bold text-base">
                Отправить на модерацию
              </button>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="glass px-6 py-3 rounded-xl font-golos text-sm text-white/70 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Icon name="ChevronLeft" size={16} />
            Назад
          </button>

          {step < steps.length - 1 && (
            <button
              onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
              className="neon-btn px-6 py-3 rounded-xl font-golos font-semibold text-sm flex items-center gap-2"
            >
              Далее
              <Icon name="ChevronRight" size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
