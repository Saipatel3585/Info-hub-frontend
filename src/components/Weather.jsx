import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const apiBase = import.meta.env.VITE_API_BASE || "/api";

export default function Weather() {
  const [city, setCity] = useState("Hyderabad");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const fetchWeather = async (c = city) => {
    setLoading(true); setErr("");
    try {
      const res = await axios.get(`${apiBase}/weather`, { params: { city: c } });
      setData(res.data);
      console.log(res.data)
    } catch (e) {
      setErr(e?.response?.data?.error || "Failed to load weather.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchWeather(city); }, []);

  return (
    <section>
      <h2 style={{ marginTop: 0, textAlign: "center", justifyContent: "center" }}>
        Real-time Weather
      </h2>

      <div className="row" style={{ textAlign: "center", justifyContent: "center" }}>
        <input
          className="input"
          value={city}
          onChange={(e) => {
            const value = e.target.value;
            const formatted =
              value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
            setCity(formatted);
          }}
          placeholder="Enter city (e.g., Hyderabad)"
        />
        <button className="btn primary" onClick={() => fetchWeather(city)}>
          Get Weather
        </button>
      </div>


      {loading && <p className="small">Loading weather…</p>}
      {err && <p className="error">{err}</p>}

      {data && !err && (
        <div className="kpi">
          <motion.div className="card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <span className="label">City</span>
            <span className="value">{data.city}</span>
          </motion.div>
          <motion.div className="card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .05 }}>
            <span className="label">Temperature</span>
            <span className="value">{data.temperature}°C</span>
          </motion.div>
          <motion.div className="card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .05 }}>
            <span className="label">Feels Like</span>
            <span className="value">{data.feelsLike}°C</span>
          </motion.div>
          <motion.div className="card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .05 }}>
            <span className="label">Humidity</span>
            <span className="value">{data.humidity}%</span>
          </motion.div>
          <motion.div className="card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1 }}>
            <span className="label">Condition</span>
            <span className="value" style={{ textTransform: "capitalize" }}>
              {data.condition}
              {data.icon && (
                <img
                  src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
                  alt={data.condition}
                  style={{ height: 28, verticalAlign: "middle", marginLeft: 8 }}
                />
              )}
            </span>
          </motion.div>
        </div>
      )}
    </section>
  );
}
