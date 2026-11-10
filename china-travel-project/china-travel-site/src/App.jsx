import { useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import ToursPage from "./pages/ToursPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactsPage from "./pages/ContactsPage.jsx";
import TourPage from "./pages/TourPage.jsx";

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedTour, setSelectedTour] = useState(null);

  function navigate(next, anchor) {
    setPage(next);
    setSelectedTour(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    if (anchor) {
      setTimeout(() => {
        document.getElementById(anchor)?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    }
  }

  function openTour(tour) {
    setSelectedTour(tour);
    setPage("tour");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className="relative isolate min-h-screen overflow-clip bg-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/background13.png')",
            backgroundPosition: "top center",
            backgroundSize: "100% auto",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div className="absolute inset-0 bg-black/25" />

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 55% at 50% 42%, rgba(5,14,18,0.45) 0%, rgba(5,14,18,0.20) 55%, rgba(5,14,18,0) 80%)",
          }}
        />

        <div
          className="absolute inset-x-0 bottom-0 h-[40%]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(9,35,42,0) 0%, rgba(9,35,42,0.45) 40%, rgba(9,35,42,0.85) 75%, rgba(9,35,42,1) 100%)",
          }}
        />
      </div>

      <div className="relative z-10">
        <Header page={page} onNavigate={navigate} />

        {page === "home" && <Home onNavigate={navigate} onDetails={openTour} />}

        {page === "tours" && (
          <ToursPage onDetails={openTour} onNavigate={navigate} />
        )}

        {page === "about" && <AboutPage onNavigate={navigate} />}

        {page === "contacts" && <ContactsPage onNavigate={navigate} />}

        {page === "tour" && selectedTour && (
          <TourPage
            tour={selectedTour}
            onBack={() => navigate("tours")}
            onNavigate={navigate}
            onContact={() => navigate("contacts")}
          />
        )}

        <Footer onNavigate={navigate} />
      </div>
    </div>
  );
}
