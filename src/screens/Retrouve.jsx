import React, { useMemo, useState } from "react";
import { C, serif, sans } from "../lib/theme";
import { Entete, Etiquette } from "../components/ui";

export default function Retrouve({ fics, moments, ouvrirFic }) {
  const [q, setQ] = useState("");
  const mots = q.toLowerCase().split(/\s+/).filter((m) => m.length > 2);

  /* Tout ce qu'on peut fouiller : les souvenirs 📍 et les notes privées */
  const souvenirs = useMemo(() => {
    const liste = moments
      .map((m) => ({ id: m.id, fic: fics.find((f) => f.id === m.fic_id), extrait: m.extrait }))
      .filter((s) => s.fic);
    fics
      .filter((f) => f.note_perso)
      .forEach((f) => liste.push({ id: `note-${f.id}`, fic: f, extrait: f.note_perso }));
    return liste;
  }, [fics, moments]);

  const resultats =
    mots.length === 0
      ? []
      : souvenirs.filter((s) =>
          mots.some(
            (mot) =>
              s.extrait.toLowerCase().includes(mot) ||
              s.fic.titre.toLowerCase().includes(mot) ||
              (s.fic.ship ?? "").toLowerCase().includes(mot) ||
              (s.fic.tags ?? []).some((t) => t.toLowerCase().includes(mot))
          )
        );

  /* Suggestions : les tags de ta bibliothèque */
  const suggestions = useMemo(() => {
    const tous = new Set();
    fics.forEach((f) => (f.tags ?? []).forEach((t) => tous.add(t)));
    return [...tous].slice(0, 4);
  }, [fics]);

  const Surligne = ({ texte }) => {
    if (mots.length === 0) return <>{texte}</>;
    const regex = new RegExp(`(${mots.map((m) => m.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");
    return (
      <>
        {texte.split(regex).map((part, i) =>
          mots.includes(part.toLowerCase()) ? (
            <span key={i} style={{ color: C.nude, fontWeight: 500, fontStyle: "normal" }}>
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  };

  return (
    <div style={{ padding: "0 24px" }}>
      <Entete surTitre="Plus jamais une fic perdue" titre="Retrouve-fic" />
      <div style={{ paddingTop: 16 }}>
        <Etiquette>Décris ce dont tu te souviens</Etiquette>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="une scène, un détail, une émotion…"
          style={{
            width: "100%",
            background: "#FFFFFF",
            border: `1px solid ${C.filet}`,
            borderRadius: 14,
            outline: "none",
            fontFamily: serif,
            fontSize: 17,
            fontStyle: "italic",
            color: C.charbon,
            padding: "13px 16px",
            marginTop: 8,
          }}
        />
        {suggestions.length > 0 && (
          <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
            {suggestions.map((s) => (
              <span
                key={s}
                onClick={() => setQ(s)}
                style={{
                  fontFamily: sans,
                  fontSize: 10,
                  letterSpacing: 0.8,
                  color: q === s ? C.nude : C.taupe,
                  border: `1px solid ${q === s ? "#E5C4BB" : C.filet}`,
                  background: q === s ? C.nudePale : "#fff",
                  borderRadius: 999,
                  padding: "3px 11px",
                  cursor: "pointer",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        )}
      </div>

      <div style={{ marginTop: 22 }}>
        <Etiquette>
          {mots.length === 0
            ? "Tape quelques mots pour fouiller tes souvenirs"
            : resultats.length > 0
            ? `${resultats.length} souvenir${resultats.length > 1 ? "s" : ""} retrouvé${resultats.length > 1 ? "s" : ""}`
            : "Aucun souvenir ne correspond"}
        </Etiquette>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 10 }}>
          {resultats.map((r) => (
            <div
              key={r.id}
              onClick={() => ouvrirFic(r.fic)}
              style={{
                background: "#FFFFFF",
                border: `1px solid ${C.filet}`,
                borderRadius: 16,
                padding: "15px 17px",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
                <div style={{ fontFamily: serif, fontSize: 18.5, fontWeight: 500, color: C.charbon }}>
                  {r.fic.titre}
                </div>
                <Etiquette>{r.fic.plateforme}</Etiquette>
              </div>
              <div style={{ fontFamily: sans, fontSize: 10.5, fontWeight: 300, color: C.taupe, marginTop: 2, letterSpacing: 0.5 }}>
                {r.fic.auteur}
              </div>
              <div
                style={{
                  fontFamily: serif,
                  fontSize: 14.5,
                  fontStyle: "italic",
                  color: C.charbon,
                  lineHeight: 1.5,
                  marginTop: 9,
                  paddingLeft: 12,
                  borderLeft: `2px solid ${C.nudePale}`,
                }}
              >
                📍 <Surligne texte={r.extrait} />
              </div>
            </div>
          ))}
        </div>
        {mots.length > 0 && resultats.length === 0 && (
          <div style={{ fontFamily: serif, fontStyle: "italic", fontSize: 15, color: C.taupe, marginTop: 14, lineHeight: 1.5 }}>
            Essaie d'autres mots — pense aux scènes que tu as capturées avec 📍 sur chaque fiche.
          </div>
        )}
      </div>
      <div style={{ height: 24 }} />
    </div>
  );
}
