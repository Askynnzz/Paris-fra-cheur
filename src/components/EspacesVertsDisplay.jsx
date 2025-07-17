import React from "react";
import useEspacesVerts from "../hooks/useEspacesVerts";
import { MapPin, TreePalm, Ruler, Droplet } from "lucide-react";
import "../styles/custom-ui.css";

export default function EspacesVertsDisplay() {
  const {
    espaces,
    loading,
    error,
    filter,
    setFilter,
    arrondissements,
    page,
    totalPages,
    setPage,
    totalFiltered,
  } = useEspacesVerts();

  if (loading) {
    return (
      <div className="spinner-wrapper">
        <div className="spinner" />
      </div>
    );
  }

  if (error) {
    return <p className="text-error text-center">{error}</p>;
  }

  return (
    <div className="container">
      <h2 className="title">🌳 Espaces Verts Frais</h2>

      {/* Filtres */}
      <div className="section">
        <h3 className="section-title">Filtres</h3>

        <div className="filters-grid">
          <select
            onChange={(e) => setFilter((f) => ({ ...f, arrondissement: e.target.value }))}
            value={filter.arrondissement}
            className="filter-select"
          >
            <option value="">Arrondissement</option>
            {arrondissements.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>

          <select
            onChange={(e) => setFilter((f) => ({ ...f, ouvert24h: e.target.value }))}
            value={filter.ouvert24h}
            className="filter-select"
          >
            <option value="">Ouvert 24h ?</option>
            <option value="Oui">Oui</option>
            <option value="Non">Non</option>
          </select>

          <select
            onChange={(e) => setFilter((f) => ({ ...f, canicule: e.target.value }))}
            value={filter.canicule}
            className="filter-select"
          >
            <option value="">Ouvert canicule ?</option>
            <option value="Oui">Oui</option>
            <option value="Non">Non</option>
          </select>

          <input
            type="number"
            placeholder="% min végétation haute"
            onChange={(e) => setFilter((f) => ({ ...f, minVegPct: e.target.value }))}
            value={filter.minVegPct}
            className="filter-input"
          />

          <input
            type="number"
            placeholder="Surface végétation (m²)"
            onChange={(e) => setFilter((f) => ({ ...f, minVegSurface: e.target.value }))}
            value={filter.minVegSurface}
            className="filter-input"
          />
        </div>
      </div>

      {/* Liste des espaces verts */}
      <div className="section">
        <h3 className="section-title">Liste des espaces verts</h3>

        <div className="grid">
          {espaces.map((e, i) => (
            <div key={i} className="card">
              <h4 className="card-title">{e.nom}</h4>

              <p className="card-detail">
                <MapPin className="icon text-primary" />
                {e.adresse} - {e.arrondissement}
              </p>

              <p className="card-detail">
                <TreePalm className="icon text-green-600" />
                Ombrage : {e.proportion_vegetation_haute?.toFixed(1)}%
              </p>

              <p className="card-detail">
                <Droplet className="icon text-blue-500" />
                Canicule : {e.canicule_ouverture || "Non"}
              </p>

              <p className="card-detail">
                <Ruler className="icon text-purple-600" />
                Surface : {e.surf_veget_sup8m_2024?.toFixed(1)} m²
              </p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="nav-button"
          >
            Précédent
          </button>

          <span className="pagination-info">Page {page} / {totalPages}</span>

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="nav-button"
          >
            Suivant
          </button>
        </div>

        <p className="footer-info">Total : {totalFiltered} espaces verts</p>
      </div>
    </div>
  );
}
