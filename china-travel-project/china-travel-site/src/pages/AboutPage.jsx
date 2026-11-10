import {
  Heart,
  Plane,
  Award,
  Compass,
  Headphones,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import Breadcrumbs from "../components/Breadcrumbs.jsx";

export default function AboutPage({ onNavigate }) {
  // 4 карточки = одновременно «чем помогаем» и «как работаем» (шаги вплетены)
  const services = [
    {
      num: "01",
      icon: Compass,
      title: "Подбор туров",
      text: "Обсуждаем ваши пожелания: куда хотите поехать, когда планируете путешествие и какой бюджет рассматриваете. Изучаем доступные предложения партнёров и помогаем сравнить подходящие туры — разобраться в условиях и найти вариант под ваши интересы, даты и бюджет.",
    },
    {
      num: "02",
      icon: Plane,
      title: "Авиабилеты и страховка",
      text: "Консультируем по выбранному предложению и помогаем с вопросами авиабилетов: подбираем варианты перелёта, сориентируем по покупке билетов. Мы сотрудничаем с надежными страховыми компаниями, разбираемся с организационными моментами перед отправлением, чтобы вы могли подготовиться заранее.",
    },
    {
      num: "03",
      icon: ShieldCheck,
      title: "Проверенные партнёры",
      text: "Сотрудничаем с проверенными туроператорами — это позволяет предлагать доступные варианты туров и помогать выбирать путешествие с учётом индивидуальных запросов. Рассказываем об условиях предложений и помогаем разобраться в деталях перед принятием решения.",
    },
    {
      num: "04",
      icon: Headphones,
      title: "Команда всегда на связи",
      text: "Остаёмся на связи в процессе подготовки: помогаем сориентироваться, отвечаем на ваши обращения и объясняем следующие шаги — чтобы вы понимали процесс, располагали нужной информацией и чувствовали поддержку.",
    },
  ];

  return (
    <>
      {/* ── Крошки — сверху, сразу под шапкой ────────── */}
      <div className="container-shell pt-6">
        <Breadcrumbs
          items={[{ label: "Главная", page: "home" }, { label: "О нас" }]}
          onNavigate={onNavigate}
        />
      </div>

      {/* ── Основной контент ─────────────────────────── */}
      <main className="container-shell pb-12 md:pb-16">
        {/* ── HERO ─────────────────────────────────────── */}
        <section className="relative overflow-hidden rounded-2xl border border-white/10">
          {/* Слой затемнения — здесь настраивается прозрачность (opacity-60) */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f3340] via-[#09232a] to-[#05161a] opacity-60" />
          <div className="relative flex min-h-[560px] flex-col justify-between gap-12 p-6 sm:p-10 md:p-14">
            <div>
              <p className="eyebrow mb-4">О КОМПАНИИ</p>
              <h1 className="mb-6 max-w-3xl text-4xl font-black leading-[1.05] text-white md:text-5xl">
                Путешествие начинается
                <br className="hidden sm:block" />
                <span className="text-coral"> с правильного выбора</span>
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-200 md:text-lg md:leading-8">
                China Travel — турагентство, которое помогает подобрать
                путешествие в Китай и организовать поездку с учётом ваших
                пожеланий. Более 5 лет мы работаем в сфере туризма и помогаем
                путешественникам разбираться в предложениях, планировать
                перелёты и готовиться к поездке.
              </p>
            </div>
            <div className="grid grid-cols-4 gap-px overflow-hidden rounded-xl border border-white/15">
              {[
                [Award, "5 лет опыта"],
                [Compass, "Подбор туров"],
                [Plane, "Авиабилеты"],
                [Heart, "Внимание к деталям"],
              ].map(([Icon, title]) => (
                <div
                  key={title}
                  className="flex flex-col items-center justify-center gap-1.5 px-1 py-4 text-center text-coral sm:gap-3 sm:px-4 sm:py-6"
                >
                  <Icon className="h-4 w-4 sm:h-6 sm:w-6" />
                  <h2 className="text-[10px] font-bold leading-tight sm:text-base sm:leading-snug">
                    {title}
                  </h2>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ЧЕМ МЫ ПОМОГАЕМ (= шаги процесса) ────────── */}
        <section className="mt-16 md:mt-24">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow mb-2">КАК МЫ РАБОТАЕМ</p>
              <h2 className="text-2xl font-extrabold md:text-3xl">
                Помогаем на каждом этапе
              </h2>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {services.map(({ num, icon: Icon, title, text }) => (
              <article
                key={num}
                className="glass-card group relative overflow-hidden rounded-xl p-6 md:p-7"
              >
                <div className="mb-4 flex items-center justify-between">
                  <Icon size={24} className="text-coral" />
                  <span className="text-3xl font-black text-white/10 transition group-hover:text-coral/30">
                    {num}
                  </span>
                </div>
                <h3 className="mb-3 text-lg font-bold text-white">{title}</h3>
                <p className="text-sm leading-6 text-slate-300">{text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────── */}
        <section className="mt-16 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-coral/10 via-white/[0.03] to-transparent p-8 md:mt-24 md:p-12">
          <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <p className="eyebrow mb-3">ДАВАЙТЕ СПЛАНИРУЕМ</p>
              <h2 className="mb-3 text-2xl font-extrabold md:text-3xl">
                Спланируем вашу поездку вместе
              </h2>
              <p className="max-w-xl text-sm leading-6 text-slate-300 md:text-base md:leading-7">
                Расскажите нам о своих планах — поможем разобраться в доступных
                вариантах и подобрать путешествие, которое подойдёт именно вам.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:flex-col md:items-stretch">
              <button
                type="button"
                onClick={() => onNavigate("tours")}
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                Подобрать тур <ArrowRight size={16} />
              </button>
              <button
                type="button"
                onClick={() => onNavigate("contacts")}
                className="btn-secondary"
              >
                Связаться с нами
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
