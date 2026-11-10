import { navItems } from "../data/siteData.js";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header({ page, onNavigate }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/95 backdrop-blur">
      <div className="container-shell flex h-[68px] items-center justify-between">
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2.5 text-left"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-coral text-sm font-black">
            中
          </span>
          <span>
            <span className="block text-xs font-extrabold tracking-[.15em]">
              CHINA TRAVEL
            </span>
            <span className="block text-[9px] tracking-[.12em] text-muted">
              ПУТЕШЕСТВИЯ С ХАРАКТЕРОМ
            </span>
          </span>
        </button>
        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((n) => (
            <button
              key={n.id}
              onClick={() => onNavigate(n.id)}
              className={`text-xs transition hover:text-coral ${page === n.id ? "text-coral" : "text-slate-300"}`}
            >
              {n.label}
            </button>
          ))}
          <button
            onClick={() => onNavigate("contacts")}
            className="text-xs text-slate-300 hover:text-white"
          >
            +7 (999) 000-00-00
          </button>
        </nav>
        <button
          aria-label="Открыть меню"
          onClick={() => setOpen(!open)}
          className="rounded-lg border border-white/10 p-2 md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {open && (
        <nav className="container-shell flex flex-col gap-1 pb-4 md:hidden">
          {navItems.map((n) => (
            <button
              key={n.id}
              onClick={() => {
                onNavigate(n.id);
                setOpen(false);
              }}
              className="rounded-md px-3 py-3 text-left text-sm hover:bg-panel"
            >
              {n.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
