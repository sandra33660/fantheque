import React, { useState } from "react";

/* ── Direction 4 : "Élégance épurée" ────────────────────────
   Minimalisme féminin haut de gamme, façon maison de beauté
   ou magazine. Blanc cassé, charbon doux, un seul accent
   rose nude. Pas de cartes encadrées : de l'air, des filets
   fins, une typographie raffinée.
   Signature : la ligne de progression ultra-fine soulignant
   chaque titre, comme un trait de crayon.
──────────────────────────────────────────────────────────── */

const C = {
  fond: "#FCFAF7",
  charbon: "#2B2627",
  taupe: "#A89B96",
  nude: "#C9897B", // rose nude — l'unique accent
  nudePale: "#F4E7E2",
  filet: "#ECE5DF",
};

const serif = "'Cormorant', Georgia, serif";
const sans = "'Outfit', sans-serif";

const FICS = [
  {
    id: 1,
    titre: "Les Potions de l'Aube",
    auteur: "PlumeArgentee",
    fandom: "Harry Potter",
    ship: "Severus / Hermione",
    plateforme: "AO3",
    statut: "En cours d'écriture",
    lus: 23,
    total: 31,
    note: 5,
    tags: ["slow burn", "post-guerre", "à relire"],
    notePerso:
      "Chapitre 19 : enfin. J'ai relu la scène trois fois. L'autrice poste le vendredi.",
    liste: "encours",
  },
  {
    id: 2,
    titre: "Cent jours aux cachots",
    auteur: "Mandragore33",
    fandom: "Harry Potter",
    ship: "Severus / Hermione",
    plateforme: "FFnet",
    statut: "Complète",
    lus: 41,
    total: 47,
    note: 4,
    tags: ["huis clos", "enemies to lovers"],
    notePerso: "",
    liste: "encours",
  },
  {
    id: 3,
    titre: "L'Encre sous la pluie",
    auteur: "noctella_writes",
    fandom: "Harry Potter",
    ship: "Drago / Hermione",
    plateforme: "Wattpad",
    statut: "Complète",
    lus: 0,
    total: 28,
    note: null,
    tags: ["UA moldu", "reco de Léa"],
    notePerso: "",
    liste: "alire",
  },
  {
    id: 4,
    titre: "Le Maître des chaudrons",
    auteur: "Asphodelle",
    fandom: "Harry Potter",
    ship: "Severus / Hermione",
    plateforme: "AO3",
    statut: "Complète",
    lus: 52,
    total: 52,
    note: 5,
    tags: ["classique", "coup de cœur"],
    notePerso: "La référence. À relire chaque hiver.",
    liste: "finies",
  },
];

/* Signature : ligne de progression fine comme un trait de crayon */
const Trait = ({ lus, total }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    <div style={{ flex: 1, height: 1, background: C.filet, position: "relative" }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: -0.5,
          height: 2,
          width: `${Math.round((lus / total) * 100)}%`,
          background: C.nude,
          transition: "width .4s ease",
        }}
      />
    </div>
    <span
      style={{
        fontFamily: sans,
        fontSize: 10,
        fontWeight: 400,
        letterSpacing: 1,
        color: C.taupe,
        whiteSpace: "nowrap",
      }}
    >
      {lus} / {total}
    </span>
  </div>
);

const Etiquette = ({ children }) => (
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

const Tag = ({ children, accent }) => (
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

const Etoiles = ({ n, taille = 13 }) => (
  <span style={{ color: C.nude, fontSize: taille, letterSpacing: 3 }}>
    {n ? "★".repeat(n) + "☆".repeat(5 - n) : "—"}
  </span>
);

function Entete({ surTitre, titre }) {
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

/* ════════ ÉCRAN 1 · BIBLIOTHÈQUE ════════ */
function Bibliotheque({ ouvrirFic }) {
  const [onglet, setOnglet] = useState("encours");
  const onglets = [
    { id: "encours", label: "En cours" },
    { id: "alire", label: "À lire" },
    { id: "finies", label: "Terminées" },
  ];
  const fics = FICS.filter((f) => f.liste === onglet);

  return (
    <div style={{ padding: "0 24px" }}>
      <Entete titre="Ma bibliothèque" />

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

      {fics.map((f, i) => (
        <div
          key={f.id}
          onClick={() => ouvrirFic(f)}
          style={{
            padding: "20px 2px",
            borderBottom: i < fics.length - 1 ? `1px solid ${C.filet}` : "none",
            cursor: "pointer",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <Etiquette>
              {f.plateforme} · {f.statut}
            </Etiquette>
            <Etoiles n={f.note} taille={11} />
          </div>
          <div
            style={{
              fontFamily: serif,
              fontSize: 21,
              fontStyle: "italic",
              fontWeight: 500,
              color: C.charbon,
              margin: "5px 0 2px",
            }}
          >
            {f.titre}
          </div>
          <div
            style={{
              fontFamily: sans,
              fontSize: 11,
              fontWeight: 300,
              letterSpacing: 0.5,
              color: C.taupe,
              marginBottom: 12,
            }}
          >
            {f.auteur} · {f.ship}
          </div>
          <Trait lus={f.lus} total={f.total} />
          <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
            {f.tags.map((t, j) => (
              <Tag key={t} accent={j === 0 && f.liste === "encours"}>
                {t}
              </Tag>
            ))}
          </div>
          {f.notePerso && (
            <div
              style={{
                fontFamily: serif,
                fontSize: 14,
                fontStyle: "italic",
                color: C.taupe,
                marginTop: 12,
                paddingLeft: 12,
                borderLeft: `1px solid ${C.nude}`,
              }}
            >
              {f.notePerso}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ════════ ÉCRAN 2 · AJOUTER ════════ */
function Ajouter({ retour }) {
  const Champ = ({ label, placeholder }) => (
    <div style={{ marginBottom: 22 }}>
      <Etiquette>{label}</Etiquette>
      <div
        style={{
          fontFamily: serif,
          fontSize: 16,
          fontStyle: "italic",
          color: "#C9C0BA",
          borderBottom: `1px solid ${C.filet}`,
          padding: "7px 0",
        }}
      >
        {placeholder}
      </div>
    </div>
  );

  return (
    <div style={{ padding: "0 24px" }}>
      <Entete surTitre="Nouvelle lecture" titre="Ajouter une fic" />
      <div style={{ height: 14 }} />

      <Champ label="Lien" placeholder="colle l'adresse de la fic…" />
      <Champ label="Titre" placeholder="Les Potions de l'Aube" />
      <Champ label="Auteur·ice" placeholder="PlumeArgentee" />

      <div style={{ display: "flex", gap: 22 }}>
        <div style={{ flex: 1.5 }}>
          <Champ label="Ship" placeholder="Severus / Hermione" />
        </div>
        <div style={{ flex: 0.5 }}>
          <Champ label="Chapitres" placeholder="31" />
        </div>
      </div>

      <Champ label="Fandom" placeholder="Harry Potter" />

      <div style={{ marginBottom: 8 }}>
        <Etiquette>Ajouter à</Etiquette>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 30 }}>
        {["À lire", "En cours", "Terminées"].map((l, i) => (
          <span
            key={l}
            style={{
              flex: 1,
              textAlign: "center",
              padding: "9px 0",
              borderRadius: 999,
              fontFamily: sans,
              fontSize: 10.5,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              fontWeight: i === 0 ? 500 : 300,
              color: i === 0 ? "#fff" : C.taupe,
              background: i === 0 ? C.nude : "transparent",
              border: `1px solid ${i === 0 ? C.nude : C.filet}`,
            }}
          >
            {l}
          </span>
        ))}
      </div>

      <button
        onClick={retour}
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
        }}
      >
        Ajouter
      </button>
    </div>
  );
}

/* ════════ ÉCRAN 3 · FICHE FIC ════════ */
function FicheFic({ fic, retour }) {
  const [lus, setLus] = useState(fic.lus);
  const pct = Math.round((lus / fic.total) * 100);

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

      <div style={{ textAlign: "center", padding: "18px 0 6px" }}>
        <Etiquette>
          {fic.plateforme} · {fic.statut}
        </Etiquette>
        <h1
          style={{
            fontFamily: serif,
            fontSize: 28,
            fontWeight: 500,
            fontStyle: "italic",
            margin: "8px 0 4px",
            color: C.charbon,
          }}
        >
          {fic.titre}
        </h1>
        <div
          style={{
            fontFamily: sans,
            fontSize: 11.5,
            fontWeight: 300,
            letterSpacing: 0.5,
            color: C.taupe,
          }}
        >
          {fic.auteur} · {fic.ship}
        </div>
        <div style={{ marginTop: 12 }}>
          <Etoiles n={fic.note} taille={15} />
        </div>
        <div style={{ width: 28, height: 1, background: C.nude, margin: "16px auto 0" }} />
      </div>

      <div style={{ padding: "20px 0 6px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 10,
          }}
        >
          <Etiquette>Ma progression</Etiquette>
          <span
            style={{
              fontFamily: serif,
              fontSize: 18,
              fontStyle: "italic",
              color: C.nude,
            }}
          >
            {pct}%
          </span>
        </div>
        <Trait lus={lus} total={fic.total} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 22,
            marginTop: 18,
          }}
        >
          <button
            onClick={() => setLus(Math.max(0, lus - 1))}
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              border: `1px solid ${C.filet}`,
              background: "transparent",
              color: C.taupe,
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            −
          </button>
          <span
            style={{
              fontFamily: serif,
              fontSize: 22,
              fontStyle: "italic",
              color: C.charbon,
              minWidth: 110,
              textAlign: "center",
            }}
          >
            chapitre {lus}
          </span>
          <button
            onClick={() => setLus(Math.min(fic.total, lus + 1))}
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              border: "none",
              background: C.nude,
              color: "#fff",
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            +
          </button>
        </div>
      </div>

      <div style={{ padding: "22px 0 0" }}>
        <Etiquette>Mes tags</Etiquette>
        <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
          {fic.tags.map((t, i) => (
            <Tag key={t} accent={i === 0}>
              {t}
            </Tag>
          ))}
        </div>
      </div>

      <div style={{ padding: "24px 0" }}>
        <Etiquette>Ma note de lecture</Etiquette>
        <div
          style={{
            fontFamily: serif,
            fontSize: 15,
            fontStyle: "italic",
            color: fic.notePerso ? C.charbon : "#C9C0BA",
            lineHeight: 1.6,
            marginTop: 10,
            paddingLeft: 12,
            borderLeft: `1px solid ${C.nude}`,
          }}
        >
          {fic.notePerso || "capture un moment, une scène, une émotion…"}
        </div>
      </div>
    </div>
  );
}

/* ════════ ÉCRAN 4 · STATS ════════ */
function Stats() {
  const ships = [
    { nom: "Severus / Hermione", n: 38, pct: 100 },
    { nom: "Drago / Hermione", n: 11, pct: 29 },
    { nom: "Remus / Tonks", n: 6, pct: 16 },
  ];

  return (
    <div style={{ padding: "0 24px" }}>
      <Entete surTitre="Mon année de lecture" titre="Statistiques" />

      <div style={{ display: "flex", textAlign: "center", padding: "18px 0 6px" }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: serif, fontSize: 40, fontStyle: "italic", color: C.charbon, lineHeight: 1 }}>47</div>
          <div style={{ marginTop: 6 }}>
            <Etiquette>chapitres ce mois</Etiquette>
          </div>
        </div>
        <div style={{ width: 1, background: C.filet }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: serif, fontSize: 40, fontStyle: "italic", color: C.nude, lineHeight: 1 }}>12</div>
          <div style={{ marginTop: 6 }}>
            <Etiquette>jours d'affilée</Etiquette>
          </div>
        </div>
      </div>

      <div style={{ padding: "26px 0 0" }}>
        <Etiquette>Mes ships les plus lus</Etiquette>
        {ships.map((s) => (
          <div key={s.nom} style={{ padding: "14px 0 4px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  fontFamily: serif,
                  fontSize: 16,
                  fontStyle: "italic",
                  color: C.charbon,
                }}
              >
                {s.nom}
              </span>
              <span
                style={{
                  fontFamily: sans,
                  fontSize: 10,
                  letterSpacing: 1,
                  color: C.taupe,
                }}
              >
                {s.n} fics
              </span>
            </div>
            <div style={{ height: 1, background: C.filet, position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: -0.5,
                  height: 2,
                  width: `${s.pct}%`,
                  background: C.nude,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: "30px 0" }}>
        <Etiquette>Mes plateformes</Etiquette>
        <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
          <Tag accent>AO3 · 31</Tag>
          <Tag>FFnet · 14</Tag>
          <Tag>Wattpad · 10</Tag>
        </div>
      </div>
    </div>
  );
}

/* ════════ ÉCRAN 5 · PROFIL ════════ */
function Profil() {
  const lignes = [
    ["Rappels de lecture"],
    ["Mes tags personnalisés"],
    ["Exporter ma bibliothèque", "Premium"],
    ["Thème", "Élégance"],
    ["Confidentialité & RGPD"],
  ];

  return (
    <div style={{ padding: "0 24px" }}>
      <Entete titre="Mon profil" />

      <div style={{ textAlign: "center", padding: "16px 0 8px" }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            border: `1px solid ${C.nude}`,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: serif,
            fontSize: 26,
            fontStyle: "italic",
            color: C.nude,
          }}
        >
          S
        </div>
        <div style={{ fontFamily: serif, fontSize: 21, color: C.charbon, marginTop: 10 }}>Sandra</div>
        <div style={{ marginTop: 4 }}>
          <Etiquette>Lectrice depuis juin 2026 · 4 fics</Etiquette>
        </div>
      </div>

      <div style={{ marginTop: 14 }}>
        {lignes.map(([label, badge], i) => (
          <div
            key={label}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "15px 2px",
              borderBottom: i < lignes.length - 1 ? `1px solid ${C.filet}` : "none",
            }}
          >
            <span style={{ flex: 1, fontFamily: sans, fontSize: 13, fontWeight: 300, color: C.charbon, letterSpacing: 0.5 }}>
              {label}
            </span>
            {badge && (
              <span
                style={{
                  fontFamily: sans,
                  fontSize: 9,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  color: badge === "Premium" ? C.nude : C.taupe,
                  marginRight: 8,
                }}
              >
                {badge}
              </span>
            )}
            <span style={{ color: C.taupe, fontSize: 13 }}>›</span>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", padding: 20 }}>
        <Etiquette>Fanthèque · v1.0</Etiquette>
      </div>
    </div>
  );
}

/* ════════ ÉCRAN 6 · RETROUVE-FIC ════════
   Recherche par souvenirs : on fouille titres, ships, tags
   ET les notes/moments capturés pendant la lecture. */
const MOMENTS = [
  {
    ficId: 1,
    titre: "Les Potions de l'Aube",
    auteur: "PlumeArgentee",
    plateforme: "AO3",
    extrait: "Tempête de neige, refuge dans la cabane de Hagrid, chap. 14. La scène du feu.",
  },
  {
    ficId: 2,
    titre: "Cent jours aux cachots",
    auteur: "Mandragore33",
    plateforme: "FFnet",
    extrait: "Le chaudron qui explose et la retenue qui change tout, chap. 3.",
  },
  {
    ficId: 4,
    titre: "Le Maître des chaudrons",
    auteur: "Asphodelle",
    plateforme: "AO3",
    extrait: "Hermione amnésique après la bataille, fin douce-amère qui m'a achevée.",
  },
];

function Retrouve({ ouvrirFic }) {
  const [q, setQ] = useState("tempête");
  const mots = q.toLowerCase().split(/\s+/).filter((m) => m.length > 2);
  const resultats =
    mots.length === 0
      ? []
      : MOMENTS.filter((m) =>
          mots.some(
            (mot) =>
              m.extrait.toLowerCase().includes(mot) ||
              m.titre.toLowerCase().includes(mot)
          )
        );

  const Surligne = ({ texte }) => {
    if (mots.length === 0) return <>{texte}</>;
    const regex = new RegExp(`(${mots.join("|")})`, "gi");
    return (
      <>
        {texte.split(regex).map((part, i) =>
          regex.test(part) ? (
            <span key={i} style={{ color: C.nude, fontWeight: 500, fontStyle: "normal" }}>
              {part}
            </span>
          ) : (
            <React.Fragment key={i}>{part}</React.Fragment>
          )
        )}
      </>
    );
  };

  return (
    <div style={{ padding: "0 24px" }}>
      <Entete surTitre="C'était quelle fic, déjà ?" titre="Retrouve-fic" />

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
        <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
          {["tempête", "chaudron", "amnésique"].map((s) => (
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
      </div>

      <div style={{ padding: "24px 0 4px" }}>
        <Etiquette>
          {resultats.length > 0
            ? `${resultats.length} souvenir${resultats.length > 1 ? "s" : ""} retrouvé${resultats.length > 1 ? "s" : ""}`
            : "aucun souvenir ne correspond"}
        </Etiquette>
      </div>

      {resultats.map((m, i) => {
        const fic = FICS.find((f) => f.id === m.ficId);
        return (
          <div
            key={m.ficId}
            onClick={() => fic && ouvrirFic(fic)}
            style={{
              padding: "16px 2px",
              borderBottom: i < resultats.length - 1 ? `1px solid ${C.filet}` : "none",
              cursor: "pointer",
            }}
          >
            <Etiquette>{m.plateforme}</Etiquette>
            <div
              style={{
                fontFamily: serif,
                fontSize: 19,
                fontStyle: "italic",
                fontWeight: 500,
                color: C.charbon,
                margin: "4px 0 2px",
              }}
            >
              {m.titre}
            </div>
            <div
              style={{
                fontFamily: sans,
                fontSize: 11,
                fontWeight: 300,
                color: C.taupe,
                marginBottom: 8,
              }}
            >
              {m.auteur}
            </div>
            <div
              style={{
                fontFamily: serif,
                fontSize: 14,
                fontStyle: "italic",
                color: C.taupe,
                lineHeight: 1.5,
                paddingLeft: 12,
                borderLeft: `1px solid ${C.nude}`,
              }}
            >
              « <Surligne texte={m.extrait} /> »
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function App() {
  const [ecran, setEcran] = useState("biblio");
  const [ficOuverte, setFicOuverte] = useState(null);

  const tabs = [
    { id: "biblio", label: "Biblio" },
    { id: "retrouve", label: "Retrouve" },
    { id: "stats", label: "Stats" },
    { id: "profil", label: "Profil" },
  ];

  const ouvrirFic = (fic) => {
    setFicOuverte(fic);
    setEcran("fiche");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(165deg, #F1EAE3, #E4D8CF)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Outfit:wght@200;300;400;500&display=swap'); * { box-sizing: border-box; }`}</style>

      <div
        style={{
          width: 390,
          maxWidth: "100%",
          height: 780,
          background: C.fond,
          borderRadius: 36,
          boxShadow: "0 24px 70px rgba(43,38,39,.18)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <div style={{ flex: 1, overflowY: "auto" }}>
          {ecran === "biblio" && <Bibliotheque ouvrirFic={ouvrirFic} />}
          {ecran === "retrouve" && <Retrouve ouvrirFic={ouvrirFic} />}
          {ecran === "stats" && <Stats />}
          {ecran === "profil" && <Profil />}
          {ecran === "ajouter" && <Ajouter retour={() => setEcran("biblio")} />}
          {ecran === "fiche" && ficOuverte && (
            <FicheFic fic={ficOuverte} retour={() => setEcran("biblio")} />
          )}
          <div style={{ height: 30 }} />
        </div>

        {/* bouton flottant + */}
        {ecran !== "ajouter" && ecran !== "fiche" && (
          <button
            onClick={() => setEcran("ajouter")}
            style={{
              position: "absolute",
              right: 22,
              bottom: 78,
              width: 50,
              height: 50,
              borderRadius: "50%",
              border: "none",
              background: C.charbon,
              color: "#fff",
              fontSize: 22,
              fontWeight: 200,
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(43,38,39,.25)",
            }}
          >
            +
          </button>
        )}

        {/* barre d'onglets */}
        <div
          style={{
            display: "flex",
            borderTop: `1px solid ${C.filet}`,
            background: C.fond,
          }}
        >
          {tabs.map((t) => {
            const actif =
              ecran === t.id || (t.id === "biblio" && (ecran === "fiche" || ecran === "ajouter"));
            return (
              <button
                key={t.id}
                onClick={() => setEcran(t.id)}
                style={{
                  flex: 1,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "14px 0 16px",
                  fontFamily: sans,
                  fontSize: 9.5,
                  fontWeight: actif ? 500 : 300,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: actif ? C.nude : C.taupe,
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
