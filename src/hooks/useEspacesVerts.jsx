import { useEffect, useState } from "react";
import axios from "axios";

export default function useEspacesVerts() {
  const [espaces, setEspaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filter, setFilter] = useState({
    arrondissement: "",
    ouvert24h: "",
    canicule: "",
    minVegPct: "",
    minVegSurface: "",
  });

  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const fetchAll = async () => {
      try {
        console.log("📡 Récupération des espaces verts...");

        let all = [];
        let offset = 0;
        let total = 0;
        const perPage = 100;

        do {
          const res = await axios.get(
            "https://parisdata.opendatasoft.com/api/explore/v2.1/catalog/datasets/ilots-de-fraicheur-espaces-verts-frais/records",
            { params: { limit: perPage, offset } }
          );

          all = [...all, ...res.data.results];
          total = res.data.total_count;
          offset += perPage;
        } while (offset < total);

        setEspaces(all);
        setLoading(false);

        console.log(`✅ ${all.length} espaces verts récupérés avec succès.`);
      } catch (err) {
        console.error("❌ Erreur lors du chargement des espaces verts :", err);
        setError("Erreur lors du chargement");
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const arrondissements = [...new Set(espaces.map((e) => e.arrondissement).filter(Boolean))].sort();

  const filteredEspaces = espaces.filter((e) => {
    const { arrondissement, ouvert24h, canicule, minVegPct, minVegSurface } = filter;

    if (arrondissement && e.arrondissement !== arrondissement) return false;
    if (ouvert24h && e.ouvert_24h !== ouvert24h) return false;
    if (canicule && e.canicule_ouverture !== canicule) return false;
    if (minVegPct && (e.proportion_vegetation_haute || 0) < parseFloat(minVegPct)) return false;
    if (minVegSurface && (e.surf_veget_sup8m_2024 || 0) < parseFloat(minVegSurface)) return false;

    return true;
  });

  const totalPages = Math.ceil(filteredEspaces.length / pageSize);
  const currentPage = Math.min(Math.max(page, 1), totalPages || 1);
  const paginatedEspaces = filteredEspaces.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  useEffect(() => {
    console.log("🔍 Filtres appliqués :", filter);
    console.log(`📄 Affichage de la page ${currentPage} / ${totalPages}`);
    console.log(`🔢 Nombre d'espaces verts filtrés : ${filteredEspaces.length}`);
  }, [filter, currentPage, totalPages, filteredEspaces.length]);

  return {
    espaces: paginatedEspaces,
    loading,
    error,
    filter,
    setFilter,
    arrondissements,
    page: currentPage,
    totalPages,
    setPage,
    totalFiltered: filteredEspaces.length,
  };
}
