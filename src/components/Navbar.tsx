import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";

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
          <button className="px-4 py-2 text-sm font-golos text-white/70 hover:text-white transition-colors">
            Войти
          </button>
          <Link to="/upload">
            <button className="neon-btn px-5 py-2 rounded-lg text-sm font-semibold font-golos">
              Загрузить релиз
            </button>
          </Link>
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
          <button className="mt-2 neon-btn w-full py-3 rounded-lg text-sm font-semibold font-golos">
            Загрузить релиз
          </button>
        </div>
      )}
    </nav>
  );
}
