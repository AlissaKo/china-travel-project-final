import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Calendar,
  Wallet,
  CheckCircle2,
  Quote,
  Sparkles,
} from "lucide-react";
import { useCarouselTick } from "../hooks/useCarouselTick.js";
import Breadcrumbs from "../components/Breadcrumbs.jsx";

export default function TourPage({ tour, onBack, onContact, onNavigate }) {
  const tick = useCarouselTick();
  const [pausedIndex, setPausedIndex] = useState(null);

  const photos = tour.images ?? (tour.image ? [tour.image] : []);
  const index =
    pausedIndex !== null
      ? pausedIndex
      : photos.length
        ? tick % photos.length
        : 0;

  return (
    <>
      <div className="container-shell pt-6">
        <Breadcrumbs
          items={[
            { label: "Главная", page: "home" },
            { label: "Туры", page: "tours" },
            { label: tour.title },
          ]}
          onNavigate={onNavigate}
        />
      </div>

      <main className="container-shell pb-8 md:pb-12">
        <button
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 text-xs font-semibold text-slate-300 transition hover:text-white"
        >
          <ArrowLeft size={14} /> Все туры
        </button>

        <div className="glass-card relative flex flex-col overflow-hidden rounded-2xl border border-white/10 lg:min-h-[500px] lg:flex-row">
          <div className="order-2 flex flex-col justify-start p-6 pt-10 sm:p-8 sm:pt-12 lg:order-1 lg:w-[55%] lg:p-12 lg:pt-14 xl:p-14 xl:pt-16">
            <p className="eyebrow mb-4 text-coral">{tour.tag}</p>

            <h1 className="mb-6 text-3xl font-black leading-[1.15] text-white sm:text-4xl md:text-5xl">
              {tour.title}
            </h1>

            <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-slate-300">
              <span className="flex items-center gap-2">
                <MapPin size={16} className="text-coral" />
                {tour.places}
              </span>
              <span className="flex items-center gap-2">
                <Calendar size={16} className="text-coral" />
                {tour.days}
              </span>
              <span className="flex items-center gap-2">
                <Wallet size={16} className="text-coral" />
                {tour.price}
              </span>
            </div>

            <p className="mb-10 text-base leading-8 text-slate-300">
              {tour.desc}
            </p>

            <div className="mt-auto flex flex-wrap gap-2.5">
              {tour.features.map((f) => (
                <span
                  key={f}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-panel/50 px-4 py-2 text-[13px] text-slate-200"
                >
                  <CheckCircle2 size={13} className="text-coral" />
                  {f}
                </span>
              ))}
            </div>
          </div>

          <div className="order-1 flex w-full shrink-0 p-4 sm:p-6 lg:order-2 lg:w-[45%] lg:py-8 lg:pr-8 lg:pl-0">
            <div
              className="group relative h-[300px] w-full overflow-hidden rounded-xl border border-white/10 shadow-lg sm:h-[400px] lg:h-auto"
              onMouseEnter={() => setPausedIndex(index)}
              onMouseLeave={() => setPausedIndex(null)}
            >
              {photos.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={tour.title}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                    i === index ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}

              {photos.length > 1 && (
                <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1 rounded-full bg-black/40 px-2 py-1.5 backdrop-blur-md">
                  {photos.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setPausedIndex(i)}
                      className={`h-1 rounded-full bg-white transition-all duration-300 ${
                        i === index
                          ? "w-4 opacity-100"
                          : "w-1 opacity-50 hover:opacity-80"
                      }`}
                      aria-label={`Фото ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 w-full sm:mt-14">
          {tour.departures?.length > 0 && (
            <section className="mb-10 sm:mb-12">
              <p className="eyebrow mb-4 flex items-center gap-1.5 sm:mb-5">
                <Calendar size={12} className="text-coral" /> ДАТЫ БЛИЖАЙШИХ
                ПОЕЗДОК
              </p>
              <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                {tour.departures
                  .filter(
                    (departure) =>
                      new Date(`${departure.end}T23:59:59`) >= new Date(),
                  )
                  .slice(0, 3)
                  .map((departure) => {
                    const formatDate = (value) =>
                      new Date(`${value}T12:00:00`).toLocaleDateString(
                        "ru-RU",
                        { day: "numeric", month: "long" },
                      );
                    return (
                      <div
                        key={departure.start}
                        className="rounded-lg border border-white/10 bg-panel/60 p-4 sm:rounded-xl sm:p-5"
                      >
                        <div className="mb-2.5 flex items-center justify-between gap-2">
                          <span className="text-xs text-slate-400 sm:text-[13px]">
                            Групповой выезд
                          </span>
                          <span className="rounded-full border border-aqua/25 bg-aqua/10 px-2 py-1 text-[10px] font-semibold text-aqua sm:px-2.5 sm:py-1 sm:text-[11px]">
                            Есть места
                          </span>
                        </div>
                        <p className="text-base font-bold text-white">
                          {formatDate(departure.start)} —{" "}
                          {formatDate(departure.end)}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </section>
          )}

          {tour.result && (
            <div className="mb-12 max-w-4xl border-l-2 border-coral/60 pl-5">
              <p className="eyebrow mb-2 flex items-center gap-1.5">
                <Quote size={12} className="text-coral" /> ПОЧЕМУ ЭТОТ ТУР
              </p>
              <p className="text-[15px] leading-7 text-slate-300">
                {tour.result}
              </p>
            </div>
          )}

          {tour.itinerary?.length > 0 && (
            <div className="mb-12 max-w-4xl">
              <p className="eyebrow mb-7 flex items-center gap-1.5">
                <Sparkles size={12} className="text-coral" /> ПЛАН ТУРА ПО ДНЯМ
              </p>
              <ol className="relative">
                {tour.itinerary.map((day, i) => (
                  <li
                    key={`${tour.id}-day-${i + 1}`}
                    className="relative flex items-start gap-5 pb-8 last:pb-0"
                  >
                    {i < tour.itinerary.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="absolute left-[15px] top-8 h-full w-px bg-white/15"
                      />
                    )}
                    <span className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-coral/60 bg-ink text-[12px] font-bold text-coral">
                      {i + 1}
                    </span>
                    <div className="min-w-0 pt-1">
                      <h2 className="mb-2 text-base font-semibold text-slate-200">
                        День {i + 1}. {day.title}
                      </h2>
                      <p className="text-[15px] leading-7 text-slate-300">
                        {day.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          <div className="mt-12 border-t border-white/10 pt-8">
            <button
              onClick={onContact}
              className="btn-primary group inline-flex items-center gap-2"
            >
              Обсудить поездку
              <ArrowRight
                size={13}
                strokeWidth={2.5}
                className="shrink-0 translate-y-px transition-transform duration-200 ease-out group-hover:translate-x-0.5"
              />
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
