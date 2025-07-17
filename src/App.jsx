import React, { useState } from "react";
import SuggestionsDisplay from "./components/SuggestionsDisplay";
import FontainesDisplay from "./components/FontainesDisplay";
import EspacesVertsDisplay from "./components/EspacesVertsDisplay";
import { motion, AnimatePresence } from "framer-motion";
import { Droplet, TreePalm, Sun } from "lucide-react";
import "./index.css";
import "./styles/custom-ui.css";

export default function App() {
  const [currentView, setCurrentView] = useState("suggestions");

  const menuItems = [
    { key: "suggestions", label: "Suggestions météo", icon: <Sun className="icon" /> },
    { key: "fontaines", label: "Fontaines", icon: <Droplet className="icon" /> },
    { key: "espacesVerts", label: "Espaces Verts", icon: <TreePalm className="icon" /> },
  ];

  return (
    <div className="container">
      <h1 className="main-title">🌿 Paris Fraîcheur</h1>

      <div className="nav-buttons">
        {menuItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setCurrentView(item.key)}
            className={`nav-button ${currentView === item.key ? "active" : ""}`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {currentView === "suggestions" && (
          <motion.div
            key="suggestions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <SuggestionsDisplay />
          </motion.div>
        )}

        {currentView === "fontaines" && (
          <motion.div
            key="fontaines"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <FontainesDisplay />
          </motion.div>
        )}

        {currentView === "espacesVerts" && (
          <motion.div
            key="espacesVerts"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <EspacesVertsDisplay />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
