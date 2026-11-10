import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { tours } from "../data/siteData.js";
import TourCard from "../components/TourCard.jsx";
import Breadcrumbs from "../components/Breadcrumbs.jsx";

export default function ToursPage({ onDetails, onNavigate }) {
  const [filter, setFilter] = useState("Все");
  const categories = [
    "Все",
    "История",
    "Природа",
    "Море",
    "Города",
    "Необычные",
  ];
  const categoryMap = {
    classic: "История",
    nature: "Природа",
    beach: "Море",
    food: "Города",
    yunnan: "Необычные",
    silk: "Необычные",
    family: "История",
    budget: "Море",
    urban: "Города",
    tibet: "Необычные",
  };
  const filtered =
    filter === "Все"
      ? tours
      : tours.filter((t) => categoryMap[t.id] === filter);

  return (
    <>
      <div className="container-shell pt-6">
        <Breadcrumbs
          items={[
            { label: "Главная", page: "home" },
            { label: "Туры", page: "tours" },
          ]}
          onNavigate={onNavigate}
        />
      </div>

      <main className="container-shell pb-12 md:pb-16">
        <p className="eyebrow mb-3">КОЛЛЕКЦИЯ МАРШРУТОВ</p>
        <h1 className="mb-4 text-4xl font-black">Все туры по Китаю</h1>
        <p className="mb-8 max-w-2xl text-sm leading-6 text-slate-300">
          От знаковых достопримечательностей до тихих пляжей и редких маршрутов.
          Выберите направление, а детали мы поможем адаптировать под вас.
        </p>

        <div className="mb-7 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                filter === c
                  ? "bg-coral text-white"
                  : "border border-white/10 text-slate-300 hover:border-aqua"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => (
            <TourCard key={t.id} tour={t} onDetails={onDetails} />
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-white/10 bg-panel/60 p-6 sm:flex sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold">Не знаете, что выбрать?</h2>
            <p className="mt-1 text-sm text-slate-300">
              Ответьте на 5 вопросов — и найдите маршрут под свой характер.
            </p>
          </div>
          <button
            onClick={() => onNavigate("home", "quiz")}
            className="btn-primary mt-4 inline-flex items-center gap-2 sm:mt-0"
          >
            Подобрать тур <ArrowRight size={14} />
          </button>
        </div>
      </main>
    </>
  );
}
