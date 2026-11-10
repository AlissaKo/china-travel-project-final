import { useMemo, useState } from "react";
import {
  ArrowRight,
  MapPin,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Star,
  Sparkles,
  Compass,
  Plane,
  ShieldCheck,
  Headphones,
} from "lucide-react";
import { tours, questions } from "../data/siteData.js";
import TourCard from "../components/TourCard.jsx";

const reviews = [
  [
    "Анна и Михаил",
    "«Очень понравилась организация: увидели древний Пекин и современный Шанхай, но не чувствовали постоянной спешки. Китай оказался гораздо ближе, чем мы ожидали!»",
    "Классика Китая",
  ],
  [
    "Екатерина",
    "«Природа Чжанцзяцзе — просто невероятная. Нам помогли продумать дни так, чтобы были и прогулки, и время спокойно насладиться видами».",
    "Природные чудеса",
  ],
  [
    "Ирина с семьёй",
    "«Путешествие с ребёнком оказалось намного спокойнее, чем мы думали. Переезды были понятными, а Диснейленд стал главным воспоминанием».",
    "Семейный Китай",
  ],
  [
    "Дмитрий",
    "«Хотелось чего-то не как у всех — и поездка по Шёлковому пути стала настоящим приключением. Очень много историй и впечатлений».",
    "Шёлковый путь",
  ],
];

const whyUs = [
  [
    Compass,
    "Подбор туров",
    "Обсуждаем пожелания и помогаем сравнить подходящие предложения под ваши интересы, даты и бюджет.",
  ],
  [
    Plane,
    "Авиабилеты и страховка",
    "Подбираем варианты перелёта, консультируем по билетам и помогаем с организационными моментами.",
  ],
  [
    ShieldCheck,
    "Проверенные партнёры",
    "Работаем с надёжными туроператорами — предлагаем только проверенные варианты туров.",
  ],
  [
    Headphones,
    "Команда всегда на связи",
    "Помогаем сориентироваться и остаёмся на связи на каждом этапе подготовки к поездке.",
  ],
];

export default function Home({ onNavigate, onDetails }) {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);

  const scores = useMemo(() => {
    const tally = Object.fromEntries(tours.map((t) => [t.id, 0]));
    questions.forEach((q, i) => {
      const a = answers[q.key];
      if (a !== undefined)
        Object.entries(q.options[a].scores).forEach(
          ([id, n]) => (tally[id] += n),
        );
    });
    return tally;
  }, [answers]);

  const completed = questions.filter(
    (q) => answers[q.key] !== undefined,
  ).length;

  function choose(index) {
    setAnswers((prev) => ({ ...prev, [questions[activeQuestion].key]: index }));
    setResult(null);
  }

  function calculate() {
    if (completed !== 5) return;
    const max = Math.max(...Object.values(scores));
    setResult(tours.filter((t) => scores[t.id] === max));
  }

  function resetQuiz() {
    setAnswers({});
    setResult(null);
    setActiveQuestion(0);
  }

  return (
    <>
      <section className="container-shell grid min-h-[470px] items-center gap-8 py-16 md:py-20">
        <div className="w-full max-w-[700px] text-left">
          <p className="eyebrow mb-4">АВТОРСКИЕ МАРШРУТЫ · КИТАЙ</p>
          <h1 className="mb-6 text-[clamp(2.25rem,5.5vw,4.25rem)] font-black leading-[1.05] tracking-tight">
            Китай, который
            <br />
            хочется увидеть
          </h1>
          <p className="mb-8 max-w-[620px] text-[17px] leading-[1.65] text-slate-300">
            Погрузитесь в древнюю историю, откройте невероятную природу и
            почувствуйте ритм современных городов. Найдём путешествие под ваш
            характер.
          </p>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => onNavigate("tours")} className="btn-primary">
              Выбрать тур
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("quiz")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-secondary"
            >
              Пройти тест
            </button>
          </div>
          <div className="mt-9 flex flex-col gap-3 text-[11px] text-slate-300 sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-3">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-coral" />
              Авторские маршруты
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-coral" />
              Поддержка на каждом этапе
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-coral" />
              Продуманная логистика
            </span>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-[#09232a]/60 py-12 backdrop-blur-sm">
        <div className="container-shell">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-2">ВЫБЕРИТЕ СВОЙ МАРШРУТ</p>
              <h2 className="text-2xl font-extrabold">Популярные туры</h2>
            </div>
            <button
              onClick={() => onNavigate("tours")}
              className="hidden items-center gap-2 text-xs font-semibold text-coral sm:flex"
            >
              Все туры <ArrowRight size={14} />
            </button>
          </div>
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:pb-0 lg:grid-cols-4">
            {tours.slice(0, 4).map((t) => (
              <div key={t.id} className="w-[78%] shrink-0 snap-start sm:w-auto">
                <TourCard tour={t} onDetails={onDetails} />
              </div>
            ))}
          </div>
          <button
            onClick={() => onNavigate("tours")}
            className="btn-secondary mt-5 w-full sm:hidden"
          >
            Смотреть все туры
          </button>
        </div>
      </section>

      <section id="quiz" className="container-shell py-14 md:py-20">
        <div className="glass-card relative overflow-hidden rounded-xl">
          <div className="relative grid lg:h-[560px] lg:grid-cols-[.85fr_1.15fr]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-[320px] bg-cover bg-center [mask-image:linear-gradient(to_bottom,black_45%,transparent_100%)] lg:inset-y-0 lg:right-auto lg:h-full lg:w-[49%] lg:[mask-image:linear-gradient(to_right,black_50%,transparent_92%)]"
              style={{ backgroundImage: "url('/images/map.png')" }}
            />

            <div className="relative z-10 flex min-h-[280px] items-end p-7 lg:min-h-0">
              <div>
                <h2 className="max-w-xs text-3xl font-extrabold leading-tight [text-shadow:0_2px_6px_rgba(0,0,0,0.9)]">
                  Путешествие начинается с первого решения
                </h2>
                <p className="mt-3 max-w-xs text-sm leading-6 text-slate-100 [text-shadow:0_1px_4px_rgba(0,0,0,0.9)]">
                  Ответьте на несколько вопросов, и мы подскажем маршрут,
                  который подойдёт именно вам.
                </p>
              </div>
            </div>

            <div className="relative z-10 flex flex-col p-5 sm:p-7 lg:min-h-0">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p className="eyebrow mb-2">ПОДБОР ТУРА</p>
                  <h3 className="text-lg font-bold">
                    {result
                      ? "Ваш результат"
                      : `Вопрос ${Math.min(activeQuestion + 1, 5)} из 5`}
                  </h3>
                </div>
                <span className="text-xs text-slate-300">
                  {completed}/5 отвечено
                </span>
              </div>
              <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-coral transition-all"
                  style={{ width: `${(completed / 5) * 100}%` }}
                />
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto pr-1 lg:pr-3 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/20 hover:[&::-webkit-scrollbar-thumb]:bg-white/30">
                {result ? (
                  <div className="space-y-4">
                    <p className="text-sm leading-6 text-slate-300">
                      {result.length > 1
                        ? "У вас получились близкие варианты — выберите тот, который больше откликается."
                        : "По вашим ответам мы подобрали маршрут, с которого стоит начать."}
                    </p>
                    <div className="space-y-3">
                      {result.map((t) => (
                        <div
                          key={t.id}
                          className="overflow-hidden rounded-lg border border-coral/40 bg-coral/5"
                        >
                          <div className="flex flex-col sm:flex-row">
                            {(t.image || t.images?.[0]) && (
                              <div className="relative h-40 w-full shrink-0 overflow-hidden sm:h-auto sm:w-56">
                                <img
                                  src={t.image ?? t.images[0]}
                                  alt={t.title}
                                  className="h-full w-full object-cover"
                                />
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent sm:bg-gradient-to-r" />
                              </div>
                            )}
                            <div className="flex flex-1 flex-col p-4 pr-5 sm:pr-6">
                              <p className="mb-1 text-sm font-bold">
                                {t.title}
                              </p>
                              <p className="text-sm leading-6 text-slate-300">
                                {t.result}
                              </p>
                              <button
                                onClick={() => onDetails(t)}
                                className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold leading-none text-coral"
                              >
                                Посмотреть тур
                                <ArrowRight
                                  size={12}
                                  strokeWidth={2.5}
                                  className="shrink-0 translate-y-px transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button onClick={resetQuiz} className="btn-secondary">
                      Пройти тест заново
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="mb-4 text-sm font-semibold">
                      {questions[activeQuestion].title}
                    </p>
                    <p className="mb-4 text-xs text-slate-300">
                      {questions[activeQuestion].hint}
                    </p>
                    <div className="space-y-2">
                      {questions[activeQuestion].options.map((o, i) => (
                        <label
                          key={o.label}
                          className={`option-card ${answers[questions[activeQuestion].key] === i ? "selected" : ""}`}
                        >
                          <input
                            type="radio"
                            name={questions[activeQuestion].key}
                            checked={
                              answers[questions[activeQuestion].key] === i
                            }
                            onChange={() => choose(i)}
                          />
                          <span className="text-sm leading-5">{o.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {!result && (
                <div className="mt-6 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setActiveQuestion((n) => Math.max(0, n - 1))}
                    disabled={activeQuestion === 0}
                    className="btn-secondary inline-flex items-center gap-1 disabled:opacity-30"
                  >
                    <ChevronLeft size={15} /> Назад
                  </button>
                  {activeQuestion < 4 ? (
                    <button
                      onClick={() =>
                        setActiveQuestion((n) => Math.min(4, n + 1))
                      }
                      disabled={
                        answers[questions[activeQuestion].key] === undefined
                      }
                      className="btn-primary disabled:opacity-40"
                    >
                      Далее <ChevronRight size={15} />
                    </button>
                  ) : (
                    <button
                      onClick={calculate}
                      disabled={completed !== 5}
                      className="btn-primary disabled:opacity-40"
                    >
                      Узнать результат <ArrowRight size={15} />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-[#09232a]/60 py-12 backdrop-blur-sm">
        <div className="container-shell grid gap-10 md:grid-cols-2">
          <div>
            <p className="eyebrow mb-2">ПОЧЕМУ МЫ</p>
            <h2 className="mb-6 text-2xl font-extrabold">
              Почему выбирают China Travel?
            </h2>
            <div className="space-y-4">
              {whyUs.map(([Icon, title, text]) => (
                <div className="flex gap-3" key={title}>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-coral/15 text-coral">
                    <Icon size={17} />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold">{title}</h3>
                    <p className="mt-1 text-xs leading-5 text-slate-300">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="pl-12 sm:pl-14">
              <p className="eyebrow mb-2">ОТЗЫВЫ ПУТЕШЕСТВЕННИКОВ</p>
              <h2 className="mb-6 text-2xl font-extrabold">
                Истории, которые остаются
              </h2>
            </div>

            <div className="relative grid">
              {reviews.map(([name, quote, tour], index) => (
                <article
                  key={name}
                  aria-hidden={index !== reviewIndex}
                  className={`glass-card col-start-1 row-start-1 mx-12 rounded-xl p-6 sm:mx-14 ${
                    index === reviewIndex ? "" : "invisible"
                  }`}
                >
                  <div className="mb-3 flex gap-1 text-sand">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={13} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-sm leading-6 text-slate-300">{quote}</p>
                  <div className="mt-4 text-sm font-bold">{name}</div>
                  <div className="mt-1 text-xs text-slate-500">Тур: {tour}</div>
                </article>
              ))}

              <button
                type="button"
                aria-label="Предыдущий отзыв"
                onClick={() => setReviewIndex((i) => (i - 1 + 4) % 4)}
                className="btn-secondary absolute left-0 top-1/2 -translate-y-1/2"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                type="button"
                aria-label="Следующий отзыв"
                onClick={() => setReviewIndex((i) => (i + 1) % 4)}
                className="btn-secondary absolute right-0 top-1/2 -translate-y-1/2"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="mt-4 pl-12 sm:pl-14">
              <button
                onClick={() => onNavigate("about")}
                className="group inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-bold leading-none text-coral"
              >
                Больше об агентстве и отзывах
                <ArrowRight
                  size={12}
                  strokeWidth={2.5}
                  className="shrink-0 translate-y-px transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
