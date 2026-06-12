import React, { useState } from "react";
import {
  majFic,
  enregistrerLecture,
  ajouterMoment,
  supprimerMoment,
  supprimerFic,
} from "../lib/api";
import { C, serif, sans } from "../lib/theme";
import { Etiquette, Tag, Etoiles, Trait } from "../components/ui";

export default function FicheFic({ fic, moments, retour, onMaj }) {
  const [notePerso, setNotePerso] = useState(fic.note_perso ?? "");
  const [souvenir, setSouvenir] = useState("");
  const [occupe, setOccupe] = useState(false);
  const pct = fic.total ? Math.round((fic.lus / fic.total) * 100) : 0;

  const plusUnChapitre = async () => {
    if (occupe || fic.lus >= fic.total) return;
    setOccupe(true);
    try {
      const lus = fic.lus + 1;
      let liste = fic.liste;
      if (lus >= fic.total && fic.statut === "Complète") liste = "finies";
      else if (liste === "alire") liste = "encours";
      await majFic(fic.id, { lus, liste });
      await enregistrerLecture(fic.id);
      await onMaj();
    } finally {
      setOccupe(false);
    }
  };

  const changerNote = async (n) => {
    await majFic(fic.id, { note: n });
    await onMaj();
  };

  const sauverNotePerso = async () => {
    if (notePerso === (fic.note_perso ?? "")) return;
    await majFic(fic.id, { note_perso: notePerso });
    await onMaj();
  };

  const capturerSouvenir = async () => {
    const extrait = souvenir.trim();
    if (!extrait) return;
    setSouvenir("");
    await ajouterMoment(fic.id, extrait);
    await onMaj();
  };

  const supprimer = async () => {
    if (!window.confirm(`Supprimer « ${fic.titre} » de ta bibliothèque ?`)) return;
    await supprimerFic(fic.id);
    retour();
    await onMaj();
  };

  return (
    <div style={{ padding: "0 24px" }}>
      <button
        onClick={retour}
        style={{
          background: "none",
          border: "none",
          color: C.taupe,
          fontFamily: sans,
          fontSize: 10.5,
          letterSpacing: 2,
          textTransform: "uppercase",
          cursor: "pointer",
          padding: "22px 0 0",
        }}
      >
        ← Retour
      </button>

      <div style={{ textAlign: "center", padding: "10px 0 0" }}>
        <Etiquette>
          {[fic.plateforme, fic.statut].filter(Boolean).join(" · ")}
        </Etiquette>
        <h1
          style={{
            fontFamily: serif,
            fontSize: 28,
            fontWeight: 500,
            fontStyle: "italic",
            margin: "8px 0 4px",
            color: C.charbon,
            lineHeight: 1.1,
          }}
        >
          {fic.titre}
        </h1>
        <div style={{ fontFamily: sans, fontSize: 11.5, fontWeight: 300, color: C.taupe, letterSpacing: 0.5 }}>
          {fic.auteur ? `par ${fic.auteur}` : ""}
        </div>
        <div style={{ display: "flex", gap: 6, marginTop: 14, flexWrap: "wrap", justifyContent: "center" }}>
          {fic.ship && <Tag accent>{fic.ship}</Tag>}
          {(fic.tags ?? []).map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </div>

      {/* Progression */}
      <div style={{ marginTop: 30 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <Etiquette>Progression</Etiquette>
          <span style={{ fontFamily: serif, fontSize: 22, fontStyle: "italic", color: C.nude }}>{pct} %</span>
        </div>
        <div style={{ marginTop: 10 }}>
          <Trait lus={fic.lus} total={fic.total} />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 18,
          }}
        >
          <span style={{ fontFamily: serif, fontSize: 19, color: C.charbon }}>
            Chapitre {fic.lus} <span style={{ color: C.taupe, fontSize: 15 }}>sur {fic.total}</span>
          </span>
          <button
            onClick={plusUnChapitre}
            disabled={occupe || fic.lus >= fic.total}
            style={{
              background: "transparent",
              border: `1px solid ${C.nude}`,
              borderRadius: 999,
              padding: "9px 20px",
              fontFamily: sans,
              fontSize: 10.5,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: C.nude,
              cursor: "pointer",
              opacity: fic.lus >= fic.total ? 0.4 : 1,
            }}
          >
            {fic.lus >= fic.total ? "Terminée ✓" : "+ 1 chapitre"}
          </button>
        </div>
      </div>

      <div style={{ height: 1, background: C.filet, margin: "26px 0" }} />

      {/* Note + lien */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <Etiquette>Ma note</Etiquette>
          <div style={{ marginTop: 5 }}>
            <Etoiles n={fic.note} taille={16} onChange={changerNote} />
          </div>
        </div>
        {fic.lien && (
          <a
            href={fic.lien.startsWith("http") ? fic.lien : `https://${fic.lien}`}
            target="_blank"
            rel="noreferrer"
            style={{
              fontFamily: sans,
              fontSize: 10.5,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: C.charbon,
              borderBottom: `1px solid ${C.charbon}`,
              paddingBottom: 2,
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            Reprendre la lecture
          </a>
        )}
      </div>

      <div style={{ height: 1, background: C.filet, margin: "26px 0 22px" }} />

      {/* Notes privées */}
      <Etiquette>Mes notes privées</Etiquette>
      <textarea
        value={notePerso}
        onChange={(e) => setNotePerso(e.target.value)}
        onBlur={sauverNotePerso}
        placeholder="capture une impression, une émotion…"
        rows={3}
        style={{
          width: "100%",
          background: "transparent",
          border: "none",
          borderBottom: `1px solid ${C.filet}`,
          outline: "none",
          resize: "vertical",
          fontFamily: serif,
          fontSize: 17,
          fontStyle: "italic",
          lineHeight: 1.55,
          color: C.charbon,
          marginTop: 8,
          padding: "4px 0 10px",
        }}
      />

      <div style={{ height: 1, background: C.filet, margin: "22px 0" }} />

      {/* Souvenirs 📍 — alimentent l'écran Retrouve-fic */}
      <Etiquette>Mes souvenirs de lecture</Etiquette>
      <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
        <input
          value={souvenir}
          onChange={(e) => setSouvenir(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && capturerSouvenir()}
          placeholder="une scène à ne pas oublier…"
          style={{
            flex: 1,
            background: "#FFFFFF",
            border: `1px solid ${C.filet}`,
            borderRadius: 12,
            outline: "none",
            fontFamily: serif,
            fontSize: 15,
            fontStyle: "italic",
            color: C.charbon,
            padding: "10px 14px",
          }}
        />
        <button
          onClick={capturerSouvenir}
          style={{
            border: `1px solid ${C.nude}`,
            background: C.nudePale,
            borderRadius: 12,
            padding: "0 14px",
            fontSize: 15,
            cursor: "pointer",
          }}
        >
          📍
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "14px 0 24px" }}>
        {moments.map((m) => (
          <div
            key={m.id}
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 8,
              fontFamily: serif,
              fontSize: 14.5,
              fontStyle: "italic",
              color: C.charbon,
              lineHeight: 1.5,
              paddingLeft: 12,
              borderLeft: `2px solid ${C.nudePale}`,
            }}
          >
            <span style={{ flex: 1 }}>📍 {m.extrait}</span>
            <button
              onClick={async () => {
                await supprimerMoment(m.id);
                await onMaj();
              }}
              title="Supprimer ce souvenir"
              style={{ background: "none", border: "none", color: C.taupe, cursor: "pointer", fontSize: 12 }}
            >
              ✕
            </button>
          </div>
        ))}
        {moments.length === 0 && (
          <span style={{ fontFamily: serif, fontSize: 14, fontStyle: "italic", color: C.taupe }}>
            Aucun souvenir capturé — ils te serviront à retrouver cette fic plus tard.
          </span>
        )}
      </div>

      <button
        onClick={supprimer}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontFamily: sans,
          fontSize: 10,
          letterSpacing: 2,
          textTransform: "uppercase",
          color: C.taupe,
          padding: "0 0 28px",
        }}
      >
        Supprimer cette fic
      </button>
    </div>
  );
}
