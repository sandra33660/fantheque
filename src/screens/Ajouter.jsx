import React, { useState } from "react";
import { ajouterFic } from "../lib/api";
import { C, serif } from "../lib/theme";
import { Entete, Etiquette, ChampTexte, Chips, BoutonPlein } from "../components/ui";

const PLATEFORMES = ["AO3", "FFnet", "Wattpad", "Autre"];
const STATUTS = ["En cours d'écriture", "Complète"];
const LISTES = [
  { label: "À lire", id: "alire" },
  { label: "En cours", id: "encours" },
  { label: "Terminées", id: "finies" },
];

export default function Ajouter({ apresAjout }) {
  const [lien, setLien] = useState("");
  const [titre, setTitre] = useState("");
  const [auteur, setAuteur] = useState("");
  const [total, setTotal] = useState("");
  const [ship, setShip] = useState("");
  const [fandom, setFandom] = useState("");
  const [tags, setTags] = useState("");
  const [plateforme, setPlateforme] = useState("AO3");
  const [statut, setStatut] = useState("En cours d'écriture");
  const [liste, setListe] = useState("alire");
  const [erreur, setErreur] = useState("");
  const [chargement, setChargement] = useState(false);

  const valider = async (e) => {
    e.preventDefault();
    setErreur("");
    setChargement(true);
    try {
      await ajouterFic({
        lien: lien.trim(),
        titre: titre.trim(),
        auteur: auteur.trim(),
        ship: ship.trim(),
        fandom: fandom.trim(),
        plateforme,
        statut,
        liste,
        lus: 0,
        total: Math.max(1, parseInt(total, 10) || 1),
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      });
      await apresAjout();
    } catch (err) {
      setErreur(err.message || "Impossible d'ajouter la fic.");
      setChargement(false);
    }
  };

  return (
    <form onSubmit={valider} style={{ padding: "0 24px" }}>
      <Entete titre="Nouvelle lecture" />
      <div style={{ height: 14 }} />

      <ChampTexte
        label="Lien"
        placeholder="archiveofourown.org/works/…"
        value={lien}
        onChange={(e) => setLien(e.target.value)}
      />
      <ChampTexte
        label="Titre"
        required
        placeholder="Les Potions de l'Aube"
        value={titre}
        onChange={(e) => setTitre(e.target.value)}
      />
      <div style={{ display: "flex", gap: 22 }}>
        <div style={{ flex: 1.5 }}>
          <ChampTexte
            label="Auteur·ice"
            placeholder="PlumeArgentee"
            value={auteur}
            onChange={(e) => setAuteur(e.target.value)}
          />
        </div>
        <div style={{ flex: 0.5 }}>
          <ChampTexte
            label="Chapitres"
            type="number"
            min={1}
            placeholder="31"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
          />
        </div>
      </div>
      <ChampTexte
        label="Ship"
        placeholder="Severus / Hermione"
        value={ship}
        onChange={(e) => setShip(e.target.value)}
      />
      <ChampTexte
        label="Fandom"
        placeholder="Harry Potter"
        value={fandom}
        onChange={(e) => setFandom(e.target.value)}
      />
      <ChampTexte
        label="Tags (séparés par des virgules)"
        placeholder="slow burn, post-guerre…"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <div style={{ marginBottom: 8 }}>
        <Etiquette>Plateforme</Etiquette>
      </div>
      <div style={{ marginBottom: 22 }}>
        <Chips options={PLATEFORMES} valeur={plateforme} onChange={setPlateforme} />
      </div>

      <div style={{ marginBottom: 8 }}>
        <Etiquette>Statut de la fic</Etiquette>
      </div>
      <div style={{ marginBottom: 22 }}>
        <Chips options={STATUTS} valeur={statut} onChange={setStatut} />
      </div>

      <div style={{ marginBottom: 8 }}>
        <Etiquette>Ajouter à</Etiquette>
      </div>
      <div style={{ marginBottom: 30 }}>
        <Chips
          etire
          options={LISTES.map((l) => l.label)}
          valeur={LISTES.find((l) => l.id === liste)?.label}
          onChange={(label) => setListe(LISTES.find((l) => l.label === label).id)}
        />
      </div>

      {erreur && (
        <div style={{ fontFamily: serif, fontStyle: "italic", fontSize: 14.5, color: C.nude, marginBottom: 16 }}>
          {erreur}
        </div>
      )}

      <BoutonPlein type="submit" disabled={chargement}>
        {chargement ? "Un instant…" : "Ajouter"}
      </BoutonPlein>
      <div style={{ height: 24 }} />
    </form>
  );
}
