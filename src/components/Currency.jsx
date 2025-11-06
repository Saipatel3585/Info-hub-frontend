import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";

const apiBase = import.meta.env.VITE_API_BASE || "/api";

export default function Currency(){
  const [amount, setAmount] = useState("100");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const convert = async () => {
    const n = Number(amount);
    if(Number.isNaN(n) || n < 0){
      setErr("Enter a valid non-negative number");
      return;
    }
    setLoading(true); setErr("");
    try{
      const res = await axios.get(`${apiBase}/currency`, { params:{ amount: n }});
      setData(res.data);
    }catch(e){
      setErr(e?.response?.data?.error || "Failed to convert.");
    }finally{
      setLoading(false);
    }
  };

  return (
    <section>
      <h2 style={{marginTop:0,textAlign:"center",justifyContent:"center"}}>Currency Converter (INR → USD / EUR)</h2>
      <div className="row" style={{textAlign:"center",justifyContent:"center"}}>
        <input
          className="input"
          inputMode="decimal"
          value={amount}
          onChange={e=>setAmount(e.target.value)}
          placeholder="Amount in INR"
        />
        <button className="btn primary" onClick={convert}>Convert</button>
      </div>

      {loading && <p className="small">Converting…</p>}
      {err && <p className="error">{err}</p>}

      {data && !err && (
        <>
          <div className="kpi">
            <motion.div className="card" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}>
              <span className="label">Base</span>
              <span className="value">{data.base}</span>
            </motion.div>
            <motion.div className="card" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:.05}}>
              <span className="label">USD</span>
              <span className="value">{data.usd !== null ? `$ ${data.usd}` : "—"}</span>
            </motion.div>
            <motion.div className="card" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:.1}}>
              <span className="label">EUR</span>
              <span className="value">{data.eur !== null ? `€ ${data.eur}` : "—"}</span>
            </motion.div>
          </div>
          {data?.rates && (
            <p className="small" style={{marginTop:8}}>
              Live rates: 1 {data.base} ≈ {data.rates.USD?.toFixed?.(4)} USD • {data.rates.EUR?.toFixed?.(4)} EUR
            </p>
          )}
        </>
      )}
    </section>
  );
}
