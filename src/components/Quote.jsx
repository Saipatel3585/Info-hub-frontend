import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const apiBase = import.meta.env.VITE_API_BASE || "/api";

export default function Quote(){
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const fetchQuote = async () => {
    setLoading(true); setErr("");
    try{
      const res = await axios.get(`${apiBase}/quote`);
      setQuote(res.data);
    }catch(e){
      setErr(e?.response?.data?.error || "Failed to load quote.");
    }finally{
      setLoading(false);
    }
  };

  useEffect(()=>{ fetchQuote(); },[]);

  return (
    <section>
      <h2 style={{marginTop:0}}>Motivational Quote</h2>
      {loading && <p className="small">Finding inspiration…</p>}
      {err && <p className="error">{err}</p>}
      {quote && !err && (
        <motion.div
          className="card"
          style={{marginTop:10}}
          initial={{opacity:0, y:8}}
          animate={{opacity:1, y:0}}
        >
          <div className="value">“{quote.text}”</div>
          <div className="small">— {quote.author || "Unknown"}</div>
        </motion.div>
      )}
      <div className="row" style={{marginTop:10,textAlign:"center",justifyContent:"center"}}>
        <button className="btn" style={{textAlign:"center",justifyContent:"center"}} onClick={fetchQuote}>Another Quote</button>
      </div>
    </section>
  );
}
