import React from "react";
import { C, serif, sans } from "../lib/theme";

/* Signature : ligne de progression fine comme un trait de crayon */
export const Trait = ({ lus, total }) => (
  <div style={{ position: "relative", height: 2, background: C.filet, borderRadius: 2 }}>
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: `${total ? Math.min(100, (lus / total) * 100) : 0}%`,
        background: C.nude,
        borderRadius: 2,
        transition: "width .4s ease",
      }}
    />
  </div>
);

export const Etiquette = ({ children }) => (
  <span
    style={{
      fontFamily: sans,
      fontSize: 9,
      fontWeight: 500,
      letterSpacing: 2,
      textTransform: "uppercase",
      color: C.taupe,
    }}
  >
    {children}
  </span>
);

export const Tag = ({ children, accent }) => (
  <span
    style={{
      fontFamily: sans,
      fontSize: 10,
      fontWeight: 400,
      letterSpacing: 0.8,
      color: accent ? C.nude : C.taupe,
      border: `1px solid ${accent ? "#E5C4BB" : C.filet}`,
      borderRadius: 999,
      padding: "3px 11px",
      whiteSpace: "nowrap",
      background: accent ? C.nudePale : "transparent",
    }}
  >
    {children}
  </span>
);

/* Étoiles : cliquables si onChange est fourni */
export const Etoiles = ({ n, taille = 13, onChange }) => {
  if (!onChange && !n)
    return <span style={{ color: C.nude, fontSize: taille, letterSpacing: 3 }}>—</span>;
  return (
    <span
      style={{
        color: C.nude,
        fontSize: taille,
        letterSpacing: 3,
        cursor: onChange ? "pointer" : "default",
        userSelect: "none",
      }}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} onClick={onChange ? () => onChange(i === n ? null : i) : undefined}>
          {n >= i ? "★" : "☆"}
        </span>
      ))}
    </span>
  );
};

export function Entete({ surTitre, titre }) {
  return (
    <div style={{ textAlign: "center", padding: "26px 0 8px" }}>
      <Etiquette>{surTitre || "Fanthèque"}</Etiquette>
      <h1
        style={{
          fontFamily: serif,
          fontSize: 30,
          fontWeight: 500,
          fontStyle: "italic",
          margin: "6px 0 0",
          color: C.charbon,
          letterSpacing: 0.5,
        }}
      >
        {titre}
      </h1>
      <div style={{ width: 28, height: 1, background: C.nude, margin: "14px auto 0" }} />
    </div>
  );
}

/* Champ de saisie sur filet, dans l'esprit de la maquette */
export const ChampTexte = ({ label, ...props }) => (
  <div style={{ marginBottom: 22 }}>
    <Etiquette>{label}</Etiquette>
    <input
      {...props}
      style={{
        width: "100%",
        background: "transparent",
        border: "none",
        borderBottom: `1px solid ${C.filet}`,
        outline: "none",
        fontFamily: serif,
        fontSize: 16,
        fontStyle: "italic",
        color: C.charbon,
        padding: "7px 0",
        ...props.style,
      }}
    />
  </div>
);

/* Groupe de pastilles à choix unique */
export const Chips = ({ options, valeur, onChange, etire }) => (
  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
    {options.map((o) => {
      const actif = o === valeur;
      return (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          style={{
            flex: etire ? 1 : "none",
            textAlign: "center",
            padding: etire ? "9px 0" : "7px 16px",
            borderRadius: 999,
            fontFamily: sans,
            fontSize: 10.5,
            letterSpacing: 1.5,
            textTransform: "uppercase",
            fontWeight: actif ? 500 : 300,
            color: actif ? "#fff" : C.taupe,
            background: actif ? C.nude : "transparent",
            border: `1px solid ${actif ? C.nude : C.filet}`,
            cursor: "pointer",
          }}
        >
          {o}
        </button>
      );
    })}
  </div>
);

export const BoutonPlein = ({ children, ...props }) => (
  <button
    {...props}
    style={{
      width: "100%",
      padding: "14px 0",
      borderRadius: 999,
      border: "none",
      background: C.charbon,
      color: "#fff",
      fontFamily: sans,
      fontWeight: 400,
      fontSize: 11.5,
      letterSpacing: 3,
      textTransform: "uppercase",
      cursor: "pointer",
      opacity: props.disabled ? 0.5 : 1,
      ...props.style,
    }}
  >
    {children}
  </button>
);
