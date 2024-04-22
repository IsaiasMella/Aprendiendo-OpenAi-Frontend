import { Translate } from "../../interfaces";

export const translateUseCase = async (prompt: string, lang: string) => {
  try {
    const resp = await fetch(`${import.meta.env.VITE_GPT_API}/translate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, lang }),
    });

    if (!resp.ok) throw new Error("No se puedo realizar la corrección");

    const data = (await resp.json()) as Translate;

    return {
      ok: true,
      ...data,
    };
  } catch (e) {
    return {
      ok: false,
      message: "",
    };
  }
};
