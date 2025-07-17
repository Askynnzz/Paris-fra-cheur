import useMeteoParis from "./useMeteoParis";
import useEspacesVerts from "./useEspacesVerts";
import { useFontaines } from "./useFontaines";
import { useMemo } from "react";

export default function useSuggestions() {
  const { meteo, loading: loadingMeteo, erreur: errorMeteo } = useMeteoParis();
  const { espaces } = useEspacesVerts();
  const { currentData: fontaines } = useFontaines();

  const loading = loadingMeteo;
  const error = errorMeteo;

  const suggestions = useMemo(() => {
    if (!meteo || !espaces || !fontaines) return [];

    const temp = meteo.main.temp;
    const result = [];

    // --------- Tranches de température ---------

    if (temp >= 35) {
      // Alerte forte chaleur : proposeruniquement des lieux très frais + prévention
      let parcsOmbragés = espaces.filter((e) => {
        const ombrage = parseFloat(e.proportion_vegetation_haute) || 0;
        return ombrage > 30 && (e.canicule_ouverture || "").toUpperCase() === "OUI";
      });

      if (parcsOmbragés.length === 0) {
        parcsOmbragés = espaces.filter((e) => (parseFloat(e.proportion_vegetation_haute) || 0) > 20);
      }

      const parcsFormatés = parcsOmbragés.map((e) => ({
        nom: e.nom,
        adresse: e.adresse,
        distance: e.distance,
        ombrage: e.proportion_vegetation_haute,
      }));

      result.push({
        type: "espacesVerts",
        message: "🔥 Alerte forte chaleur ! Voici des parcs très ombragés ouverts pendant la canicule.",
        data: parcsFormatés,
      });

      const fontainesFonctionnelles = fontaines.filter((f) => f.dispo === "OUI");

      const fontainesFormatées = fontainesFonctionnelles.map((f) => ({
        nom_usuel: f.nom_usuel || f.modele,
        adresse: `${f.no_voirie_pair || f.no_voirie_impair || ""} ${f.voie}`,
        arrondissement: f.commune,
        etat: "Fonctionnelle",
        modele: f.modele,
        distance: f.distance,
      }));

      result.push({
        type: "fontaines",
        message: "💧 Hydratez-vous fréquemment ! Voici des fontaines accessibles.",
        data: fontainesFormatées,
      });
    }

    else if (temp >= 30) {
      // Chaleur normale : parcs avec ombrage + fontaines
      const parcsOmbragés = espaces.filter((e) => (parseFloat(e.proportion_vegetation_haute) || 0) > 20);

      const parcsFormatés = parcsOmbragés.map((e) => ({
        nom: e.nom,
        adresse: e.adresse,
        distance: e.distance,
        ombrage: e.proportion_vegetation_haute,
      }));

      result.push({
        type: "espacesVerts",
        message: "🌳 Il fait chaud ! Voici des parcs ombragés à proximité.",
        data: parcsFormatés,
      });

      const fontainesFonctionnelles = fontaines.filter((f) => f.dispo === "OUI");

      const fontainesFormatées = fontainesFonctionnelles.map((f) => ({
        nom_usuel: f.nom_usuel || f.modele,
        adresse: `${f.no_voirie_pair || f.no_voirie_impair || ""} ${f.voie}`,
        arrondissement: f.commune,
        etat: "Fonctionnelle",
        modele: f.modele,
        distance: f.distance,
      }));

      result.push({
        type: "fontaines",
        message: "💧 Pensez à vous hydrater ! Voici des fontaines proches.",
        data: fontainesFormatées,
      });
    }

    else if (temp >= 20) {
      // Température agréable : parcs ouverts 24h
      const parcsAccessibles = espaces.filter((e) => (e.ouvert_24h || "").toUpperCase() === "OUI");

      const parcsFormatés = parcsAccessibles.map((e) => ({
        nom: e.nom,
        adresse: e.adresse,
        distance: e.distance,
      }));

      result.push({
        type: "espacesVerts",
        message: "☀️ Temps idéal pour se balader. Voici des parcs ouverts 24h.",
        data: parcsFormatés,
      });
    }

    else if (temp >= 10) {
      // Température fraîche : balades courtes
      const petitsParcs = espaces.filter((e) => (parseFloat(e.surf_veget_sup8m_2024) || 0) < 5000);

      const parcsFormatés = petitsParcs.map((e) => ({
        nom: e.nom,
        adresse: e.adresse,
        distance: e.distance,
        surface: e.surf_veget_sup8m_2024,
      }));

      result.push({
        type: "espacesVerts",
        message: "🍂 Temps frais, voici des petits espaces verts pour une balade rapide.",
        data: parcsFormatés,
      });
    }

    else {
      // Froid : message d'alerte sans suggestions de lieux
      result.push({
        type: "info",
        message: "❄️ Il fait froid actuellement, pensez à bien vous couvrir.",
        data: [],
      });
    }

    return result;
  }, [meteo, espaces, fontaines]);

  return { suggestions, loading, error, weather: meteo };
}
