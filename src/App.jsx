import React, { useCallback, useEffect, useState } from "react";
import { supabase, estConfigure } from "./lib/supabase";
import { modeDemo, listerFics, listerMoments, listerLectures } from "./lib/api";
import { C, sans, serif } from "./lib/theme";
import Connexion from "./screens/Connexion";
import Bibliotheque from "./screens/Bibliotheque";
import Ajouter from "./screens/Ajouter";
import FicheFic from "./screens/FicheFic";
import Stats from "./screens/Stats";
import Retrouve from "./screens/Retrouve";
import Profil from "./screens/Profil";

const STYLES_GLOBAUX = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Outfit:wght@200;300;400;500&display=swap');
  * { box-sizing: border-box; }
  body { margin: 0; }
  button { font-family: inherit; }
  input::placeholder, textarea::placeholder { color: #C9C0BA; opacity: 1; }
`;

export default function App() {
  const [session, setSession] = useState(undefined); // undefined = chargement
  const [ecran, setEcran] = useState("biblio");
  const [ficOuverteId, setFicOuverteId] = useState(null);
  const [fics, setFics] = useState([]);
  const [moments, setMoments] = useState([]);
  const [lectures, setLectures] = useState([]);

  /* Session : réelle via Supabase, ou factice en mode démo */
  useEffect(() => {
    if (modeDemo) {
      setSession({ user: { email: "demo@fantheque.app", created_at: new Date().toISOString() } });
      return;
    }
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: abonnement } = supabase.auth.onAuthStateChange((_evt, s) => setSession(s));
    return () => abonnement.subscription.unsubscribe();
  }, []);

  const recharger = useCallback(async () => {
    try {
      const [f, m, l] = await Promise.all([listerFics(), listerMoments(), listerLectures()]);
      setFics(f);
      setMoments(m);
      setLectures(l);
    } catch (err) {
      console.error("Chargement impossible :", err);
    }
  }, []);

  useEffect(() => {
    if (session) recharger();
  }, [session, recharger]);

  const ficOuverte = fics.find((f) => f.id === ficOuverteId) ?? null;

  const ouvrirFic = (f) => setFicOuverteId(f.id);
  const fermerFic = () => setFicOuverteId(null);
  const changerEcran = (id) => {
    setEcran(id);
    setFicOuverteId(null);
  };

  const tabs = [
    { id: "biblio", label: "Biblio" },
    { id: "retrouve", label: "Retrouve" },
    { id: "stats", label: "Stats" },
    { id: "profil", label: "Profil" },
  ];

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "linear-gradient(165deg, #F1EAE3, #E4D8CF)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <style>{STYLES_GLOBAUX}</style>

      <div
        style={{
          width: "100%",
          maxWidth: 430,
          height: "100dvh",
          background: C.fond,
          color: C.charbon,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          position: "relative",
          boxShadow: "0 0 60px rgba(43,38,39,.18)",
        }}
      >
        {modeDemo && session && (
          <div
            style={{
              background: C.nudePale,
              textAlign: "center",
              padding: "8px 16px",
              fontFamily: sans,
              fontSize: 10,
              letterSpacing: 1.2,
              color: C.nude,
              textTransform: "uppercase",
            }}
          >
            Mode démo — connecte Supabase pour sauvegarder (voir README)
          </div>
        )}

        {session === undefined && (
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: serif,
              fontStyle: "italic",
              color: C.taupe,
            }}
          >
            Fanthèque…
          </div>
        )}

        {session === null && estConfigure && <Connexion />}

        {session && (
          <>
            <div style={{ flex: 1, overflowY: "auto", paddingBottom: 20 }}>
              {ficOuverte ? (
                <FicheFic
                  fic={ficOuverte}
                  moments={moments.filter((m) => m.fic_id === ficOuverte.id)}
                  retour={fermerFic}
                  onMaj={recharger}
                />
              ) : (
                <>
                  {ecran === "biblio" && <Bibliotheque fics={fics} ouvrirFic={ouvrirFic} />}
                  {ecran === "ajouter" && (
                    <Ajouter
                      apresAjout={async () => {
                        await recharger();
                        setEcran("biblio");
                      }}
                    />
                  )}
                  {ecran === "retrouve" && (
                    <Retrouve fics={fics} moments={moments} ouvrirFic={ouvrirFic} />
                  )}
                  {ecran === "stats" && <Stats fics={fics} lectures={lectures} />}
                  {ecran === "profil" && <Profil session={session} fics={fics} />}
                </>
              )}
            </div>

            {!ficOuverte && ecran !== "ajouter" && (
              <button
                onClick={() => changerEcran("ajouter")}
                aria-label="Ajouter une fic"
                style={{
                  position: "absolute",
                  bottom: 80,
                  right: 22,
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  border: "none",
                  background: C.charbon,
                  color: "#fff",
                  fontSize: 22,
                  fontWeight: 300,
                  cursor: "pointer",
                  boxShadow: "0 8px 22px rgba(43,38,39,.3)",
                }}
              >
                +
              </button>
            )}

            <div
              style={{
                display: "flex",
                background: "rgba(252,250,247,.97)",
                borderTop: `1px solid ${C.filet}`,
                padding: "13px 0 16px",
              }}
            >
              {tabs.map((t) => {
                const actif = ecran === t.id && !ficOuverte;
                return (
                  <button
                    key={t.id}
                    onClick={() => changerEcran(t.id)}
                    style={{
                      flex: 1,
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: sans,
                      fontSize: 9.5,
                      fontWeight: actif ? 500 : 300,
                      letterSpacing: 2.5,
                      textTransform: "uppercase",
                      color: actif ? C.charbon : C.taupe,
                    }}
                  >
                    <div
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        background: actif ? C.nude : "transparent",
                        margin: "0 auto 6px",
                      }}
                    />
                    {t.label}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
