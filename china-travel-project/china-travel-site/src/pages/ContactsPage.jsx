import { Phone, Mail, Clock, MapPin, MessageCircle, Send } from "lucide-react";
import Breadcrumbs from "../components/Breadcrumbs.jsx";

export default function ContactsPage({ onNavigate }) {
  // Кликабельные каналы связи — основной блок страницы
  const channels = [
    {
      icon: Phone,
      label: "Телефон",
      value: "+7 (999) 000-00-00",
      href: "tel:+79990000000",
      hint: "Звонки в рабочее время",
    },
    {
      icon: MessageCircle,
      label: "Telegram",
      value: "@chinatravel",
      href: "https://t.me/chinatravel",
      hint: "Обычно отвечаем быстрее всего",
    },
    {
      icon: Send,
      label: "WhatsApp",
      value: "+7 (999) 000-00-00",
      href: "https://wa.me/79990000000",
      hint: "Удобно, если пишете с телефона",
    },
    {
      icon: Mail,
      label: "Почта",
      value: "hello@chinatravel.example",
      href: "mailto:hello@chinatravel.example",
      hint: "Подходит для подробных вопросов",
    },
  ];

  return (
    <>
      {/* ── Крошки — сверху, сразу под шапкой ────────── */}
      <div className="container-shell pt-6">
        <Breadcrumbs
          items={[{ label: "Главная", page: "home" }, { label: "Контакты" }]}
          onNavigate={onNavigate}
        />
      </div>

      {/* ── Основной контент ─────────────────────────── */}
      <main className="container-shell pb-12 md:pb-16">
        {/* Заголовок */}
        <p className="eyebrow mb-3">МЫ НА СВЯЗИ</p>
        <h1 className="mb-10 text-4xl font-black">Давайте планировать Китай</h1>
        <p className="mb-10 max-w-2xl text-sm leading-6 text-slate-300">
          Расскажите, о каком путешествии мечтаете — по телефону, в мессенджере
          или по почте. Подскажем, с чего начать, и поможем сориентироваться.
        </p>

        {/* Основные каналы связи — 2×2 */}
        <section className="grid gap-4 sm:grid-cols-2">
          {channels.map(({ icon: Icon, label, value, href, hint }) => (
            <a
              key={label}
              href={href}
              className="glass-card group flex items-start gap-4 rounded-xl p-5 transition hover:border-aqua/40 md:p-6"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-coral/10 text-coral transition group-hover:bg-coral/20">
                <Icon size={20} />
              </span>
              <div className="min-w-0">
                <p className="text-xs text-slate-500">{label}</p>
                <p className="mt-1 truncate text-base font-semibold text-white">
                  {value}
                </p>
                <p className="mt-1 text-xs text-slate-300">{hint}</p>
              </div>
            </a>
          ))}
        </section>

        {/* Часы работы и формат */}
        <section className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="glass-card flex items-start gap-4 rounded-xl p-5 md:p-6">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-coral/10 text-coral">
              <Clock size={20} />
            </span>
            <div>
              <p className="text-xs text-slate-500">Время работы</p>
              <p className="mt-1 text-base font-semibold">Пн–Пт, 10:00–19:00</p>
              <p className="mt-1 text-xs text-slate-300">
                В мессенджерах отвечаем и в выходные — как получится.
              </p>
            </div>
          </div>
          <div className="glass-card flex items-start gap-4 rounded-xl p-5 md:p-6">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-coral/10 text-coral">
              <MapPin size={20} />
            </span>
            <div>
              <p className="text-xs text-slate-500">Формат работы</p>
              <p className="mt-1 text-base font-semibold">
                Онлайн-консультации по записи
              </p>
              <p className="mt-1 text-xs text-slate-300">
                Сначала короткий созвон — потом подробный план в переписке.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
