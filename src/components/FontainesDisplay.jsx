import React from "react";
import { useFontaines } from "../hooks/useFontaines";
import { MapPin, Droplet, Wrench, Ruler } from "lucide-react";
import "../styles/custom-ui.css";

export default function FontainesDisplay() {
  const {
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
    filteredCount,
  } = useFontaines();

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
      <h2 className="title">💧 Fontaines à boire</h2>

      {/* Filtres */}
      <div className="section">
        <h3 className="section-title">Filtres</h3>

        <div className="filters-grid">
          <select
            value={filter.type}
            onChange={(e) => setFilter({ ...filter, type: e.target.value })}
            className="filter-select"
          >
            <option value="">Type</option>
            {types.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          <select
            value={filter.arrondissement}
            onChange={(e) => setFilter({ ...filter, arrondissement: e.target.value })}
            className="filter-select"
          >
            <option value="">Arrondissement</option>
            {arrondissements.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>

          <select
            value={filter.etat}
            onChange={(e) => setFilter({ ...filter, etat: e.target.value })}
            className="filter-select"
          >
            <option value="">État</option>
            {etats.map((e) => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Liste des fontaines */}
      <div className="section">
        <h3 className="section-title">Liste des fontaines</h3>

        <div className="grid">
          {currentData.map((f, i) => (
            <div key={i} className="card">
              <h4 className="card-title">{f.modele}</h4>

              <p className="card-detail">
                <MapPin className="icon text-primary" />
                {[f.numero, f.voie].filter(Boolean).join(" ")} - {f.arrondissement}
              </p>

              <p className="card-detail">
                <Wrench className="icon text-yellow-600" />
                Modèle : {f.modele}
              </p>

              <p className="card-detail">
                <Droplet className="icon text-cyan-600" />
                État : {f.etat}
              </p>

              {f.distance !== undefined && (
                <p className="card-detail">
                  <Ruler className="icon text-purple-600" />
                  Distance : {f.distance.toFixed(1)} m
                </p>
              )}
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

        <p className="footer-info">Total : {filteredCount} fontaines</p>
      </div>
    </div>
  );
}
