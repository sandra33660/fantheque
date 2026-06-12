import React from "react";
import { supabase } from "../lib/supabase";
import { modeDemo } from "../lib/api";
import { C, serif, sans } from "../lib/theme";
import { Entete, Etiquette } from "../components/ui";

export default function Profil({ session, fics }) {
  const email = session?.user?.email ?? "";
  const initiale = (email[0] || "F").toUpperCase();
  const depuis = session?.user?.created_at
    ? new Date(session.user.created_at).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })
    : "";

  const exporter = () => {
    const blob = new Blob([JSON.stringify(fics, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "fantheque.json";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const deconnexion = async () => {
    if (modeDemo) {
      window.alert("Mode démo : configure Supabase pour activer les comptes (voir README).");
      return;
    }
    await supabase.auth.signOut();
  };

  const lignes = [
    { label: "Exporter ma bibliothèque", badge: "JSON", action: exporter },
    { label: "Thème", badge: "Élégance" },
    { label: "Rappels de lecture", badge: "Bientôt" },
    { label: "Confidentialité & RGPD" },
  ];

  return (
    <div style={{ padding: "0 24px" }}>
      <Entete titre="Profil" />
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
          {initiale}
        </div>
        <div style={{ fontFamily: serif, fontSize: 19, color: C.charbon, marginTop: 10 }}>
          {modeDemo ? "Mode démo" : email}
        </div>
        <div style={{ marginTop: 4 }}>
          <Etiquette>
            {depuis ? `Lectrice depuis ${depuis} · ` : ""}
            {fics.length} fic{fics.length > 1 ? "s" : ""}
          </Etiquette>
        </div>
      </div>

      <div style={{ marginTop: 14 }}>
        {lignes.map(({ label, badge, action }, i) => (
          <div
            key={label}
            onClick={action}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "15px 2px",
              borderBottom: i < lignes.length - 1 ? `1px solid ${C.filet}` : "none",
              cursor: action ? "pointer" : "default",
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
                  color: C.nude,
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

      <button
        onClick={deconnexion}
        style={{
          width: "100%",
          marginTop: 30,
          padding: "13px 0",
          borderRadius: 999,
          border: `1px solid ${C.charbon}`,
          background: "transparent",
          color: C.charbon,
          fontFamily: sans,
          fontWeight: 400,
          fontSize: 11,
          letterSpacing: 3,
          textTransform: "uppercase",
          cursor: "pointer",
        }}
      >
        Me déconnecter
      </button>

      <div style={{ textAlign: "center", padding: 20 }}>
        <Etiquette>Fanthèque · v1.0</Etiquette>
      </div>
    </div>
  );
}
