import { describe, expect, it } from "vitest";
import { newPasswordSchema, safeNextPath, signUpSchema } from "@/lib/validation/auth";

describe("safeNextPath", () => {
  it("garde les chemins internes", () => {
    expect(safeNextPath("/compte")).toBe("/compte");
    expect(safeNextPath("/compte/nouveau-mot-de-passe")).toBe("/compte/nouveau-mot-de-passe");
  });
  it.each(["https://pirate.example", "//pirate.example", "/\\pirate.example", "compte", undefined, null, 42])(
    "refuse une redirection vers l'extérieur (%s)",
    (value) => {
      expect(safeNextPath(value)).toBe("/compte");
    },
  );
});

describe("signUpSchema", () => {
  const ok = { displayName: "Madd", email: " Madd@Exemple.CA ", password: "une phrase longue", consent: "on" };
  it("accepte une inscription valide et normalise le courriel", () => {
    const r = signUpSchema.safeParse(ok);
    expect(r.success && r.data.email).toBe("madd@exemple.ca");
  });
  it("exige le consentement", () => {
    const { consent: _omit, ...rest } = ok;
    void _omit;
    expect(signUpSchema.safeParse(rest).success).toBe(false);
  });
  it("refuse un mot de passe de moins de 10 caractères", () => {
    expect(signUpSchema.safeParse({ ...ok, password: "court" }).success).toBe(false);
  });
});

describe("newPasswordSchema", () => {
  it("exige deux mots de passe identiques", () => {
    expect(newPasswordSchema.safeParse({ password: "une phrase longue", confirm: "autre phrase longue" }).success).toBe(false);
    expect(newPasswordSchema.safeParse({ password: "une phrase longue", confirm: "une phrase longue" }).success).toBe(true);
  });
});
