import { ProsCons } from "../../interfaces";

export const prosConsUseCase = async (prompt: string) => {
  try {
    const resp = await fetch(
      `${import.meta.env.VITE_GPT_API}/pros-cons-discusser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      }
    );

    if (!resp.ok) throw new Error("No se puedo realizar la corrección");

    const data = (await resp.json()) as ProsCons;

    return {
      ok: true,
      ...data,
    };
  } catch (e) {
    return {
      ok: false,
      role: "",
      content: "",
    };
  }
};
