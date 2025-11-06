import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Currency from "./components/Currency.jsx";
import Quote from "./components/Quote.jsx";
import Weather from "./components/Weather.jsx";

const tabs = [
  { key: "weather", label: "Weather" },
  { key: "currency", label: "Currency" },
  { key: "quotes",  label: "Quotes"  }
];

export default function App(){
  const [active, setActive] = useState("weather");

  return (
    <>
      {/* animated background blobs */}
      <div className="blob" />
      <div className="blob b2" />

      <div className="container">
        <header className="header" style={{ flexDirection: "column", textAlign: "center", gap: "14px" }}>

  {/* Title */}
  <div className="brand" style={{ justifyContent: "center", gap: "12px" }}>
    <div className="brand-badge" style={{ fontSize: "22px", width: "42px", height: "42px" }}>☀️</div>
    <div style={{ fontSize: "36px", fontWeight: "800", letterSpacing: "0.5px" }}>
      InfoHub
    </div>
  </div>

  {/* Description */}
  <p
  style={{
    margin: "12px auto 26px auto",
    fontSize: "18px",
    lineHeight: "1.65",
    maxWidth: "720px",
    color: "var(--muted)",
    fontWeight: "400",
    textAlign: "center",
    padding: "0 12px"
  }}
>
  InfoHub is designed to simplify your everyday digital experience by bringing essential tools together in one place. 
  Whether you want to check real-time weather updates, convert currency with accurate live exchange rates, or boost your day 
  with a motivational quote, InfoHub helps you access everything instantly without switching apps. With a clean interface, 
  smooth navigation, and a modern user experience, it ensures that staying informed and inspired is effortless and enjoyable.
</p>

  {/* Tabs */}
  <nav
  className="tabs"
  style={{
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    marginTop: "10px",
    flexWrap: "wrap"
  }}
>
  {tabs.map((t) => (
    <button
      key={t.key}
      className={`tab ${active === t.key ? "active" : ""}`}
      onClick={() => setActive(t.key)}
      aria-pressed={active === t.key}
      style={{
        fontSize: "18px",
        padding: "12px 22px",
        borderRadius: "14px"
      }}
    >
      {t.label}
    </button>
  ))}
</nav>

</header>
        <section className="panel" style={{textAlign:"center",justifyContent:"center"}}>
          <AnimatePresence mode="wait">
            <motion.div style={{textAlign:"center"}}
              key={active}
              initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {active === "weather" && <Weather />}
              {active === "currency" && <Currency />}
              {active === "quotes"  && <Quote />}
            </motion.div>
          </AnimatePresence>
        </section>

        <div className="footer">
          @2025 Info Hub All Rights Reserved.
        </div>
      </div>
    </>
  );
}
