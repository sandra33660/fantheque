import React from "react";
import { C, serif, sans } from "../lib/theme";
import { Entete, Etiquette, Tag, Trait } from "../components/ui";

const isoLocal = (d) => d.toLocaleDateString("sv-SE");

export default function Stats({ fics, lectures }) {
  const moisCourant = isoLocal(new Date()).slice(0, 7);
  const chapitresCeMois = lectures
    .filter((l) => (l.jour ?? "").startsWith(moisCourant))
    .reduce((somme, l) => somme + (l.chapitres ?? 1), 0);

  // Jours d'affilée : on remonte depuis aujourd'hui (ou hier)
  const jours = new Set(lectures.map((l) => l.jour));
  let serie = 0;
  const d = new Date();
  if (!jours.has(isoLocal(d))) d.setDate(d.getDate() - 1);
  while (jours.has(isoLocal(d))) {
    serie++;
    d.setDate(d.getDate() - 1);
  }

  // Top des ships
  const parShip = {};
  fics.forEach((f) => {
    if (f.ship) parShip[f.ship] = (parShip[f.ship] || 0) + 1;
  });
  const ships = Object.entries(parShip)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);
  const maxShip = ships[0]?.[1] || 1;

  // Plateformes
  const parPlateforme = {};
  fics.forEach((f) => {
    if (f.plateforme) parPlateforme[f.plateforme] = (parPlateforme[f.plateforme] || 0) + 1;
  });
  const plateformes = Object.entries(parPlateforme).sort((a, b) => b[1] - a[1]);

  const surTitre = new Date().toLocaleDateString("fr-FR", { month: "long", year: "numeric" });

  return (
    <div style={{ padding: "0 24px" }}>
      <Entete surTitre={surTitre} titre="Statistiques" />
      <div style={{ display: "flex", textAlign: "center", padding: "18px 0 6px" }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: serif, fontSize: 40, fontStyle: "italic", color: C.charbon, lineHeight: 1 }}>
            {chapitresCeMois}
          </div>
          <div style={{ marginTop: 6 }}><Etiquette>chapitres ce mois</Etiquette></div>
        </div>
        <div style={{ width: 1, background: C.filet }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: serif, fontSize: 40, fontStyle: "italic", color: C.nude, lineHeight: 1 }}>
            {serie}
          </div>
          <div style={{ marginTop: 6 }}><Etiquette>jours d'affilée</Etiquette></div>
        </div>
      </div>

      <div style={{ height: 1, background: C.filet, margin: "22px 0" }} />

      <Etiquette>Mes ships les plus lus</Etiquette>
      <div style={{ marginTop: 16 }}>
        {ships.map(([nom, n]) => (
          <div key={nom} style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontFamily: serif, fontSize: 16.5, color: C.charbon }}>{nom}</span>
              <span style={{ fontFamily: sans, fontSize: 10, letterSpacing: 1, color: C.taupe }}>
                {n} fic{n > 1 ? "s" : ""}
              </span>
            </div>
            <div style={{ marginTop: 7 }}>
              <Trait lus={n} total={maxShip} />
            </div>
          </div>
        ))}
        {ships.length === 0 && (
          <div style={{ fontFamily: serif, fontStyle: "italic", fontSize: 15, color: C.taupe, marginTop: 8 }}>
            Ajoute des fics avec un ship pour voir ton classement.
          </div>
        )}
      </div>

      {plateformes.length > 0 && (
        <>
          <div style={{ height: 1, background: C.filet, margin: "10px 0 22px" }} />
          <Etiquette>Mes plateformes</Etiquette>
          <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
            {plateformes.map(([nom, n], i) => (
              <Tag key={nom} accent={i === 0}>
                {nom} · {n}
              </Tag>
            ))}
          </div>
        </>
      )}

      <div
        style={{
          background: C.nudePale,
          borderRadius: 4,
          padding: "16px 18px",
          marginTop: 26,
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        <Etiquette>Premium</Etiquette>
        <div style={{ fontFamily: serif, fontSize: 15.5, fontStyle: "italic", color: C.charbon, marginTop: 5, lineHeight: 1.45 }}>
          Historique complet, export de votre bibliothèque et statistiques par fandom.
        </div>
      </div>
    </div>
  );
}
