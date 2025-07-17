import { useEffect, useState } from "react";
import axios from "axios";

export default function useMeteoParis() {
  const [meteo, setMeteo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState(null);
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  useEffect(() => {
    const fetchMeteo = async () => {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=Paris,fr&appid=${API_KEY}&units=metric`
        );
        setMeteo(res.data);
      } catch (err) {
        setErreur("Erreur météo");
      } finally {
        setLoading(false);
      }
    };

    fetchMeteo();
  }, []);

  return { meteo, loading, erreur };
}
