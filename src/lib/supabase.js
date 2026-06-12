import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const cle = import.meta.env.VITE_SUPABASE_ANON_KEY;

/* Tant que le projet Supabase n'est pas configuré (.env absent),
   l'appli tourne en mode démo avec des données d'exemple. */
export const estConfigure = Boolean(url && cle);

export const supabase = estConfigure ? createClient(url, cle) : null;
