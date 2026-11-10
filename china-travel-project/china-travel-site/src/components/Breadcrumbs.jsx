import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumbs({ items = [], onNavigate }) {
  return (
    <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs sm:text-sm">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span
            key={`${item.label}-${index}`}
            className="inline-flex items-center gap-2"
          >
            {index > 0 && (
              <ChevronRight
                aria-hidden="true"
                size={13}
                className="text-slate-500"
              />
            )}
            {isLast ? (
              <span aria-current="page" className="font-medium text-slate-100">
                {item.label}
              </span>
            ) : (
              <button
                type="button"
                onClick={() => onNavigate?.(item.page)}
                className="inline-flex items-center gap-1 text-slate-400 transition hover:text-coral"
              >
                {index === 0 && <Home aria-hidden="true" size={13} />}
                {item.label}
              </button>
            )}
          </span>
        );
      })}
    </nav>
  );
}
