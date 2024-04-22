import type { Orthography } from "../../interfaces";

export const orthographyUseCase = async (prompt: string) => {
  try {
    const resp = await fetch(
      `${import.meta.env.VITE_GPT_API}/orthography-check`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      }
    );

    if (!resp.ok) throw new Error("No se puedo realizar la corrección");

    const data = (await resp.json()) as Orthography;

    return {
      ok: true,
      ...data,
    };
  } catch (e) {
    return {
      ok: false,
      userScore: 0,
      errors: [],
      message: "No se ha podido realizar la corrección",
    };
  }
};
