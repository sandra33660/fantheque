import React, { useState } from "react";
import { C, serif, sans } from "../lib/theme";
import { Entete, Etiquette, Trait } from "../components/ui";

export default function Bibliotheque({ fics, ouvrirFic }) {
  const [onglet, setOnglet] = useState("encours");
  const onglets = [
    { id: "encours", label: "En cours" },
    { id: "alire", label: "À lire" },
    { id: "finies", label: "Terminées" },
  ];
  const visibles = fics.filter((f) => f.liste === onglet);

  return (
    <div style={{ padding: "0 24px" }}>
      <Entete titre="Bibliothèque" />
      <div style={{ display: "flex", justifyContent: "center", gap: 26, padding: "14px 0 10px" }}>
        {onglets.map((o) => {
          const actif = onglet === o.id;
          return (
            <button
              key={o.id}
              onClick={() => setOnglet(o.id)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: sans,
                fontSize: 11,
                fontWeight: actif ? 500 : 300,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: actif ? C.charbon : C.taupe,
                borderBottom: actif ? `1px solid ${C.nude}` : "1px solid transparent",
                paddingBottom: 5,
              }}
            >
              {o.label}
            </button>
          );
        })}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, paddingTop: 6 }}>
        {visibles.map((f) => (
          <div
            key={f.id}
            onClick={() => ouvrirFic(f)}
            style={{
              background: "#FFFFFF",
              border: `1px solid ${C.filet}`,
              borderRadius: 16,
              padding: "17px 18px",
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
              <div style={{ fontFamily: serif, fontSize: 21, fontWeight: 500, color: C.charbon, lineHeight: 1.15 }}>
                {f.titre}
              </div>
              <Etiquette>{f.plateforme}</Etiquette>
            </div>
            <div style={{ fontFamily: sans, fontSize: 11, fontWeight: 300, color: C.taupe, marginTop: 4, letterSpacing: 0.5 }}>
              {[f.auteur, f.ship].filter(Boolean).join(" — ")}
            </div>
            <div style={{ marginTop: 14 }}>
              <Trait lus={f.lus} total={f.total} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: sans,
                  fontSize: 10,
                  fontWeight: 300,
                  letterSpacing: 1,
                  color: C.taupe,
                  marginTop: 6,
                }}
              >
                <span>
                  {f.lus >= f.total
                    ? "Terminée"
                    : f.lus === 0
                    ? "À découvrir"
                    : `Chapitre ${f.lus} sur ${f.total}`}
                </span>
                <span style={{ color: C.nude }}>
                  {f.total ? Math.round((f.lus / f.total) * 100) : 0} %
                </span>
              </div>
            </div>
          </div>
        ))}
        {visibles.length === 0 && (
          <div
            style={{
              textAlign: "center",
              fontFamily: serif,
              fontStyle: "italic",
              fontSize: 16,
              color: C.taupe,
              padding: 36,
            }}
          >
            Rien ici pour l'instant.
          </div>
        )}
      </div>
    </div>
  );
}
