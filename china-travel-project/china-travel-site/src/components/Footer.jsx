import { navItems } from "../data/siteData.js";
import { Instagram, Mail, PhoneCall } from "lucide-react";

export default function Footer({ onNavigate }) {
  return (
    <footer className="border-t border-white/10 bg-[#061a20] py-5">
      <div className="container-shell">
        <div className="flex flex-col justify-between gap-5 sm:flex-row">
          <div>
            <button
              onClick={() => onNavigate("home")}
              className="mb-2 flex items-center gap-2"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-coral text-[10px] font-black">
                中
              </span>
              <span className="text-xs font-extrabold tracking-[.15em]">
                CHINA TRAVEL
              </span>
            </button>
            <p className="max-w-xs text-xs leading-4 text-slate-500">
              Китай ближе, чем кажется. Найдём маршрут, который подходит именно
              вам.
            </p>
            <div className="mt-2 flex gap-3 text-slate-300">
              <Mail size={14} />
              <PhoneCall size={14} />
            </div>
          </div>
          <div className="flex flex-col gap-1 text-xs leading-4">
            <p className="mb-1 font-bold">Навигация</p>
            {navItems.map((n) => (
              <button
                key={n.id}
                onClick={() => onNavigate(n.id)}
                className="text-left text-slate-300 hover:text-white"
              >
                {n.label}
              </button>
            ))}
          </div>
          <div className="text-xs leading-4">
            <p className="mb-2 font-bold">Контакты</p>
            <p className="text-slate-300">+7 (999) 000-00-00</p>
            <p className="mt-1 text-slate-300">hello@chinatravel.example</p>
          </div>
        </div>
        <div className="mt-4 border-t border-white/5 pt-3 text-[10px] text-slate-600">
          © 2026 China Travel.
        </div>
      </div>
    </footer>
  );
}
