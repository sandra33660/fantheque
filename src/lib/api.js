import { supabase, estConfigure } from "./supabase";

export const modeDemo = !estConfigure;

/* ── Mode démo : données d'exemple en mémoire ─────────────── */

const isoLocal = (d) => d.toLocaleDateString("sv-SE"); // AAAA-MM-JJ local

const seedLectures = () => {
  // 12 jours d'affilée, 47 chapitres ce mois (comme la maquette)
  const lectures = [];
  for (let i = 0; i < 12; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    lectures.push({
      id: `demo-lecture-${i}`,
      fic_id: "demo-1",
      jour: isoLocal(d),
      chapitres: i === 11 ? 3 : 4,
    });
  }
  return lectures;
};

const demo = {
  fics: [
    {
      id: "demo-1",
      titre: "Les Potions de l'Aube",
      auteur: "PlumeArgentee",
      fandom: "Harry Potter",
      ship: "Severus / Hermione",
      plateforme: "AO3",
      statut: "En cours d'écriture",
      lien: "",
      lus: 23,
      total: 31,
      note: 5,
      tags: ["slow burn", "post-guerre", "à relire"],
      note_perso:
        "Chapitre 19 : enfin. J'ai relu la scène trois fois. L'autrice poste le vendredi.",
      liste: "encours",
    },
    {
      id: "demo-2",
      titre: "Cent jours aux cachots",
      auteur: "Mandragore33",
      fandom: "Harry Potter",
      ship: "Severus / Hermione",
      plateforme: "FFnet",
      statut: "Complète",
      lien: "",
      lus: 41,
      total: 47,
      note: 4,
      tags: ["huis clos", "enemies to lovers"],
      note_perso: "",
      liste: "encours",
    },
    {
      id: "demo-3",
      titre: "L'Encre sous la pluie",
      auteur: "noctella_writes",
      fandom: "Harry Potter",
      ship: "Drago / Hermione",
      plateforme: "Wattpad",
      statut: "Complète",
      lien: "",
      lus: 0,
      total: 28,
      note: null,
      tags: ["UA moldu", "reco de Léa"],
      note_perso: "",
      liste: "alire",
    },
    {
      id: "demo-4",
      titre: "Le Maître des chaudrons",
      auteur: "Asphodelle",
      fandom: "Harry Potter",
      ship: "Severus / Hermione",
      plateforme: "AO3",
      statut: "Complète",
      lien: "",
      lus: 52,
      total: 52,
      note: 5,
      tags: ["classique", "coup de cœur"],
      note_perso: "La référence. À relire chaque hiver.",
      liste: "finies",
    },
  ],
  moments: [
    {
      id: "demo-m1",
      fic_id: "demo-1",
      extrait: "Tempête de neige, refuge dans la cabane de Hagrid, chap. 14. La scène du feu.",
    },
    {
      id: "demo-m2",
      fic_id: "demo-2",
      extrait: "Le chaudron qui explose et la retenue qui change tout, chap. 3.",
    },
    {
      id: "demo-m3",
      fic_id: "demo-4",
      extrait: "Hermione amnésique après la bataille, fin douce-amère qui m'a achevée.",
    },
  ],
  lectures: seedLectures(),
};

const idDemo = () =>
  (crypto.randomUUID ? crypto.randomUUID() : `demo-${Date.now()}-${Math.random()}`);

/* ── Fics ─────────────────────────────────────────────────── */

export async function listerFics() {
  if (modeDemo) return [...demo.fics];
  const { data, error } = await supabase
    .from("fics")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function ajouterFic(fic) {
  if (modeDemo) {
    const nouvelle = { id: idDemo(), note: null, note_perso: "", tags: [], ...fic };
    demo.fics.unshift(nouvelle);
    return nouvelle;
  }
  const { data, error } = await supabase.from("fics").insert(fic).select().single();
  if (error) throw error;
  return data;
}

export async function majFic(id, champs) {
  if (modeDemo) {
    const f = demo.fics.find((f) => f.id === id);
    if (f) Object.assign(f, champs);
    return;
  }
  const { error } = await supabase.from("fics").update(champs).eq("id", id);
  if (error) throw error;
}

export async function supprimerFic(id) {
  if (modeDemo) {
    demo.fics = demo.fics.filter((f) => f.id !== id);
    demo.moments = demo.moments.filter((m) => m.fic_id !== id);
    return;
  }
  const { error } = await supabase.from("fics").delete().eq("id", id);
  if (error) throw error;
}

/* ── Moments (souvenirs de lecture, pour Retrouve-fic) ────── */

export async function listerMoments() {
  if (modeDemo) return [...demo.moments];
  const { data, error } = await supabase
    .from("moments")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function ajouterMoment(ficId, extrait) {
  if (modeDemo) {
    demo.moments.unshift({ id: idDemo(), fic_id: ficId, extrait });
    return;
  }
  const { error } = await supabase.from("moments").insert({ fic_id: ficId, extrait });
  if (error) throw error;
}

export async function supprimerMoment(id) {
  if (modeDemo) {
    demo.moments = demo.moments.filter((m) => m.id !== id);
    return;
  }
  const { error } = await supabase.from("moments").delete().eq("id", id);
  if (error) throw error;
}

/* ── Lectures (journal, pour les statistiques) ────────────── */

export async function listerLectures() {
  if (modeDemo) return [...demo.lectures];
  const { data, error } = await supabase.from("lectures").select("*");
  if (error) throw error;
  return data;
}

export async function enregistrerLecture(ficId) {
  if (modeDemo) {
    demo.lectures.push({
      id: idDemo(),
      fic_id: ficId,
      jour: isoLocal(new Date()),
      chapitres: 1,
    });
    return;
  }
  const { error } = await supabase.from("lectures").insert({ fic_id: ficId });
  if (error) throw error;
}
