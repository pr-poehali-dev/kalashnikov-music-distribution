import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Icon from "@/components/ui/icon";

export default function AuthModal() {
  const { authOpen, authMode, closeAuth, login, register, openAuth } = useAuth();
  const [mode, setMode] = useState<"login" | "register">(authMode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    artist_name: "",
  });

  if (!authOpen) return null;

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setError("");
  };

  const switchMode = (m: "login" | "register") => {
    setMode(m);
    setError("");
    openAuth(m);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    let err: string | null = null;
    if (mode === "login") {
      err = await login(form.email, form.password);
    } else {
      err = await register({
        email: form.email,
        password: form.password,
        name: form.name,
        artist_name: form.artist_name,
      });
    }

    setLoading(false);
    if (err) { setError(err); return; }
    closeAuth();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && closeAuth()}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeAuth} />

      <div className="relative glass-strong rounded-3xl p-8 w-full max-w-md animate-fade-in border border-white/10">
        <button
          onClick={closeAuth}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg glass flex items-center justify-center text-white/40 hover:text-white transition-colors"
        >
          <Icon name="X" size={16} />
        </button>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg neon-btn flex items-center justify-center">
              <Icon name="Music2" size={14} />
            </div>
            <span className="font-oswald text-lg font-bold text-white">
              KALASHNIKOV <span className="neon-text-green">DIST</span>
            </span>
          </div>
          <h2 className="font-oswald text-2xl font-bold text-white">
            {mode === "login" ? "ВОЙТИ В АККАУНТ" : "РЕГИСТРАЦИЯ"}
          </h2>
          <p className="font-golos text-sm text-white/40 mt-1">
            {mode === "login"
              ? "Введите ваши данные для входа"
              : "Создайте аккаунт артиста"}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 glass rounded-xl p-1 mb-6">
          {(["login", "register"] as const).map((m) => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              className={`flex-1 py-2 rounded-lg font-golos text-sm font-medium transition-all ${
                mode === m
                  ? "neon-btn"
                  : "text-white/40 hover:text-white"
              }`}
            >
              {m === "login" ? "Войти" : "Зарегистрироваться"}
            </button>
          ))}
        </div>

        <form onSubmit={submit} className="space-y-4">
          {mode === "register" && (
            <>
              <div>
                <label className="block font-golos text-xs text-white/40 mb-1.5 uppercase tracking-wider">Ваше имя *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={set("name")}
                  placeholder="Иван Иванов"
                  required
                  className="w-full glass rounded-xl px-4 py-3 font-golos text-sm text-white placeholder-white/20 outline-none border border-transparent focus:border-[#00FF87]/40 transition-all"
                />
              </div>
              <div>
                <label className="block font-golos text-xs text-white/40 mb-1.5 uppercase tracking-wider">Псевдоним артиста</label>
                <input
                  type="text"
                  value={form.artist_name}
                  onChange={set("artist_name")}
                  placeholder="DJ Example"
                  className="w-full glass rounded-xl px-4 py-3 font-golos text-sm text-white placeholder-white/20 outline-none border border-transparent focus:border-[#00FF87]/40 transition-all"
                />
              </div>
            </>
          )}

          <div>
            <label className="block font-golos text-xs text-white/40 mb-1.5 uppercase tracking-wider">Email *</label>
            <input
              type="email"
              value={form.email}
              onChange={set("email")}
              placeholder="email@example.com"
              required
              className="w-full glass rounded-xl px-4 py-3 font-golos text-sm text-white placeholder-white/20 outline-none border border-transparent focus:border-[#00FF87]/40 transition-all"
            />
          </div>

          <div>
            <label className="block font-golos text-xs text-white/40 mb-1.5 uppercase tracking-wider">Пароль *</label>
            <input
              type="password"
              value={form.password}
              onChange={set("password")}
              placeholder={mode === "register" ? "Минимум 6 символов" : "••••••••"}
              required
              className="w-full glass rounded-xl px-4 py-3 font-golos text-sm text-white placeholder-white/20 outline-none border border-transparent focus:border-[#00FF87]/40 transition-all"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#FF2D78]/10 border border-[#FF2D78]/20">
              <Icon name="AlertCircle" size={14} className="text-[#FF2D78] flex-shrink-0" />
              <span className="font-golos text-sm text-[#FF2D78]">{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="neon-btn w-full py-3 rounded-xl font-golos font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Icon name="Loader2" size={16} className="animate-spin" />
                {mode === "login" ? "Входим..." : "Регистрируемся..."}
              </>
            ) : (
              mode === "login" ? "Войти" : "Создать аккаунт"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}