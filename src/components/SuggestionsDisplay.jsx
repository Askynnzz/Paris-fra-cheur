import React from "react";
import useSuggestions from "../hooks/useSuggestions";
import { MapPin, Droplet, Ruler, Wrench, TreePalm, Leaf } from "lucide-react";
import { motion } from "framer-motion";
import "../styles/custom-ui.css";

export default function SuggestionsDisplay() {
  const { suggestions, loading, weather, error } = useSuggestions();

  if (loading) {
    return (
      <div className="spinner-wrapper">
        <div className="spinner" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="spinner-wrapper">
        <p className="text-error">❌ Erreur : {error}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="container"
    >
      {/* Carte météo */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="weather-card"
      >
        <div>
          <h2 className="title">🌤️ Suggestions météo</h2>
          <p className="subtitle">
            Météo actuelle :{" "}
            <span className="highlight">
              {weather?.weather[0]?.description}
            </span>
            , {weather?.main?.temp}°C
          </p>
        </div>
        <div className="temp-circle">{Math.round(weather?.main?.temp)}°C</div>
      </motion.div>

      {/* Suggestions */}
      {suggestions.map((s, i) => (
        <motion.section
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.3 }}
          className="section"
        >
          <h3 className="section-title">{s.message}</h3>

          {s.data.length === 0 ? (
            <p className="no-data-message">
              <Leaf className="icon text-primary" />
              Aucun lieu à proposer pour cette situation.
            </p>
          ) : (
            <div className="grid">
              {s.data.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="card"
                >
                  <h4 className="card-title">{item.nom_usuel || item.nom}</h4>

                  {(item.adresse || item.arrondissement) && (
                    <p className="card-detail">
                      <MapPin className="icon" />
                      {item.adresse}
                      {item.arrondissement && ` — ${item.arrondissement}`}
                    </p>
                  )}

                  {item.modele && (
                    <p className="card-detail">
                      <Wrench className="icon" />
                      Modèle : {item.modele}
                    </p>
                  )}

                  {item.ombrage !== undefined && (
                    <p className="card-detail">
                      <TreePalm className="icon" />
                      Ombrage : {item.ombrage}%
                    </p>
                  )}

                  {item.surface !== undefined && item.surface !== null && (
                    <p className="card-detail">
                      <Leaf className="icon" />
                      Surface : {item.surface.toFixed(1)} m²
                    </p>
                  )}

                  {item.etat && (
                    <p className="card-detail">
                      <Droplet className="icon" />
                      État : {item.etat}
                    </p>
                  )}

                  {item.distance !== undefined && (
                    <p className="card-detail">
                      <Ruler className="icon" />
                      Distance : {item.distance.toFixed(1)} m
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>
      ))}

      <footer className="footer">
        Données fournies par Open Data Paris • Météo fournie par Open Weather Map
      </footer>
    </motion.div>
  );
}
