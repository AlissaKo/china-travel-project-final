import { useState } from "react";
import { MapPin, ArrowRight, CalendarDays } from "lucide-react";
import { useCarouselTick } from "../hooks/useCarouselTick.js";

export default function TourCard({ tour, onDetails }) {
  const initialImages = tour.images ?? (tour.image ? [tour.image] : []);
  const nextDeparture = tour.departures?.find(
    (departure) =>
      departure.available &&
      new Date(`${departure.start}T23:59:59`) >= new Date(),
  );
  const formatDate = (value) =>
    new Date(`${value}T12:00:00`).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
    });

  const [broken, setBroken] = useState(() => new Set());
  const images = initialImages.filter((src) => !broken.has(src));

  const tick = useCarouselTick();
  const [pausedIndex, setPausedIndex] = useState(null);

  const index =
    pausedIndex !== null
      ? pausedIndex
      : images.length
        ? tick % images.length
        : 0;

  function handleError(src) {
    setBroken((prev) => {
      const next = new Set(prev);
      next.add(src);
      return next;
    });
  }

  function open() {
    if (typeof onDetails === "function") {
      onDetails(tour);
    } else {
      console.warn(
        "[TourCard] onDetails не передан. Тур:",
        tour.id,
        "— проверьте, что родитель передаёт onDetails.",
      );
    }
  }

  function handleKey(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open();
    }
  }

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={open}
      onKeyDown={handleKey}
      className="glass-card group cursor-pointer overflow-hidden rounded-xl transition duration-200 hover:-translate-y-0.5 hover:border-aqua/30 hover:shadow-[0_12px_40px_-12px_rgba(85,214,207,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-aqua/50"
    >
      <div
        className={`visual-block relative h-56 overflow-hidden bg-gradient-to-br ${tour.color}`}
        onMouseEnter={() => setPausedIndex(index)}
        onMouseLeave={() => setPausedIndex(null)}
      >
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={tour.title}
            onError={() => handleError(src)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute left-4 top-4 z-10 rounded-full border border-white/20 bg-ink/35 px-2.5 py-1 text-[10px] text-white/90 backdrop-blur">
          {tour.tag}
        </div>
        <div className="absolute bottom-3 left-4 z-10 flex items-center gap-1 text-[10px] text-white/80">
          <MapPin size={11} />
          {tour.places}
        </div>

        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1">
            {images.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full bg-white transition-all duration-300 ${
                  i === index ? "w-3 opacity-100" : "w-1.5 opacity-50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="mb-2 min-h-[40px] text-sm font-bold leading-5">
          {tour.title}
        </h3>
        <p className="mb-2 text-xs leading-5 text-slate-300">
          {tour.days} <span className="mx-1 text-slate-600">•</span>{" "}
          {tour.price}
        </p>
        {nextDeparture && (
          <p className="mb-3 flex items-center gap-1.5 text-[11px] font-medium text-aqua">
            <CalendarDays size={12} />
            Ближайший выезд: {formatDate(nextDeparture.start)}
          </p>
        )}
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold leading-none text-coral">
          Подробнее
          <ArrowRight
            size={12}
            strokeWidth={2.5}
            className="shrink-0 translate-y-px transition-transform duration-200 ease-out group-hover:translate-x-1"
          />
        </span>
      </div>
    </article>
  );
}
