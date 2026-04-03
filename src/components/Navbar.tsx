import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/hooks/useAuth";

const links = [
  { href: "/", label: "Главная" },
  { href: "/pricing", label: "Тарифы" },
  { href: "/dashboard", label: "Кабинет" },
  { href: "/upload", label: "Загрузить" },
  { href: "/contacts", label: "Контакты" },
];

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const { user, logout, openAuth } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg neon-btn flex items-center justify-center">
            <Icon name="Music2" size={16} />
          </div>
          <span className="font-oswald text-xl font-bold tracking-wider text-white">
            SOUND<span className="neon-text-green">DROP</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium font-golos transition-all duration-200 ${
                location.pathname === link.href
                  ? "text-[#00FF87] bg-[#00FF87]/10"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <div className="flex items-center gap-2 glass px-3 py-1.5 rounded-lg">
                <div className="w-6 h-6 rounded-full bg-[#00FF87]/20 flex items-center justify-center">
                  <Icon name="User" size={12} className="text-[#00FF87]" />
                </div>
                <span className="font-golos text-sm text-white/70 max-w-[120px] truncate">
                  {user.artist_name || user.name}
                </span>
              </div>
              <button
                onClick={logout}
                className="px-4 py-2 text-sm font-golos text-white/40 hover:text-white transition-colors flex items-center gap-1"
              >
                <Icon name="LogOut" size={14} />
                Выйти
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => openAuth("login")}
                className="px-4 py-2 text-sm font-golos text-white/70 hover:text-white transition-colors"
              >
                Войти
              </button>
              <button
                onClick={() => openAuth("register")}
                className="neon-btn px-5 py-2 rounded-lg text-sm font-semibold font-golos"
              >
                Регистрация
              </button>
            </>
          )}
        </div>

        <button
          className="md:hidden text-white/70 hover:text-white"
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? "X" : "Menu"} size={24} />
        </button>
      </div>

      {open && (
        <div className="md:hidden glass-strong border-t border-white/5 px-6 py-4 flex flex-col gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setOpen(false)}
              className={`px-4 py-3 rounded-lg text-sm font-medium font-golos transition-all ${
                location.pathname === link.href
                  ? "text-[#00FF87] bg-[#00FF87]/10"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <button
              onClick={() => { logout(); setOpen(false); }}
              className="mt-2 glass w-full py-3 rounded-lg text-sm font-semibold font-golos text-white/70 flex items-center justify-center gap-2"
            >
              <Icon name="LogOut" size={16} />
              Выйти ({user.artist_name || user.name})
            </button>
          ) : (
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => { openAuth("login"); setOpen(false); }}
                className="flex-1 glass py-3 rounded-lg text-sm font-semibold font-golos text-white/70"
              >
                Войти
              </button>
              <button
                onClick={() => { openAuth("register"); setOpen(false); }}
                className="flex-1 neon-btn py-3 rounded-lg text-sm font-semibold font-golos"
              >
                Регистрация
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
