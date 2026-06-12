import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import { C, serif, sans } from "../lib/theme";
import { Entete, ChampTexte, BoutonPlein } from "../components/ui";

export default function Connexion() {
  const [mode, setMode] = useState("connexion"); // connexion | inscription
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [erreur, setErreur] = useState("");
  const [info, setInfo] = useState("");
  const [chargement, setChargement] = useState(false);

  const valider = async (e) => {
    e.preventDefault();
    setErreur("");
    setInfo("");
    setChargement(true);
    try {
      if (mode === "inscription") {
        const { error } = await supabase.auth.signUp({ email, password: mdp });
        if (error) throw error;
        setInfo("Compte créé ! Vérifie ta boîte mail pour confirmer ton adresse.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password: mdp });
        if (error) throw error;
      }
    } catch (err) {
      setErreur(err.message || "Une erreur est survenue.");
    } finally {
      setChargement(false);
    }
  };

  return (
    <div style={{ padding: "0 28px", display: "flex", flexDirection: "column", justifyContent: "center", flex: 1 }}>
      <Entete
        titre={mode === "inscription" ? "Créer mon compte" : "Bienvenue"}
        surTitre="Fanthèque"
      />
      <div
        style={{
          textAlign: "center",
          fontFamily: serif,
          fontSize: 15.5,
          fontStyle: "italic",
          color: C.taupe,
          lineHeight: 1.5,
          padding: "4px 10px 28px",
        }}
      >
        Ta bibliothèque de fanfictions, tes souvenirs de lecture, ton rythme.
      </div>

      <form onSubmit={valider}>
        <ChampTexte
          label="Email"
          type="email"
          required
          autoComplete="email"
          placeholder="toi@exemple.fr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <ChampTexte
          label="Mot de passe"
          type="password"
          required
          minLength={6}
          autoComplete={mode === "inscription" ? "new-password" : "current-password"}
          placeholder="••••••••"
          value={mdp}
          onChange={(e) => setMdp(e.target.value)}
        />

        {erreur && (
          <div style={{ fontFamily: serif, fontStyle: "italic", fontSize: 14.5, color: C.nude, marginBottom: 16 }}>
            {erreur}
          </div>
        )}
        {info && (
          <div style={{ fontFamily: serif, fontStyle: "italic", fontSize: 14.5, color: C.charbon, marginBottom: 16 }}>
            {info}
          </div>
        )}

        <div style={{ height: 8 }} />
        <BoutonPlein type="submit" disabled={chargement}>
          {chargement ? "Un instant…" : mode === "inscription" ? "Créer mon compte" : "Me connecter"}
        </BoutonPlein>
      </form>

      <button
        type="button"
        onClick={() => {
          setMode(mode === "inscription" ? "connexion" : "inscription");
          setErreur("");
          setInfo("");
        }}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          marginTop: 22,
          fontFamily: sans,
          fontSize: 10.5,
          letterSpacing: 2,
          textTransform: "uppercase",
          color: C.taupe,
        }}
      >
        {mode === "inscription" ? "J'ai déjà un compte" : "Première visite ? Créer un compte"}
      </button>
    </div>
  );
}
