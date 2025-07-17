import { useEffect, useState } from "react";
import axios from "axios";

export function useFontaines() {
  const [fontaines, setFontaines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filter, setFilter] = useState({
    type: "",
    arrondissement: "",
    etat: "",
  });

  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    const fetchAll = async () => {
      try {
        console.log("📡 Chargement des fontaines...");

        let all = [];
        let offset = 0;
        let total = 0;

        do {
          const res = await axios.get(
            `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/fontaines-a-boire/records`,
            { params: { limit: perPage, offset } }
          );

          const data = res.data;
          const formatted = data.results.map((f) => ({
            ...f,
            arrondissement: f.commune || "N/A",
            etat:
              f.dispo === "OUI"
                ? "Fonctionnelle"
                : f.dispo === "NON"
                ? "Non fonctionnelle"
                : "Inconnu",
          }));

          all = [...all, ...formatted];
          total = data.total_count;
          offset += perPage;
        } while (offset < total);

        setFontaines(all);
        setLoading(false);

        console.log(`✅ ${all.length} fontaines chargées avec succès.`);
      } catch (err) {
        console.error("❌ Erreur lors du chargement des fontaines :", err);
        setError("Erreur chargement fontaines");
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const types = [...new Set(fontaines.map((f) => f.modele).filter(Boolean))].sort();
  const arrondissements = [...new Set(fontaines.map((f) => f.arrondissement).filter(Boolean))].sort();
  const etats = [...new Set(fontaines.map((f) => f.etat).filter(Boolean))].sort();

  const filtered = fontaines.filter((f) => {
    if (filter.type && f.modele !== filter.type) return false;
    if (filter.arrondissement && f.arrondissement !== filter.arrondissement) return false;
    if (filter.etat && f.etat !== filter.etat) return false;
    return true;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const currentData = filtered.slice((page - 1) * perPage, page * perPage);

  useEffect(() => {
    console.log("🔍 Filtres appliqués sur les fontaines :", filter);
    console.log(`📄 Page ${page} / ${totalPages}`);
    console.log(`🔢 Nombre de fontaines filtrées : ${filtered.length}`);
  }, [filter, page, totalPages, filtered.length]);

  return {
    loading,
    error,
    filter,
    setFilter,
    page,
    setPage,
    totalPages,
    types,
    arrondissements,
    etats,
    currentData,
    filteredCount: filtered.length,
  };
}
