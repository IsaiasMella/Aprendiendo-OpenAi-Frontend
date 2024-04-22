import type { AudioToTextResponse } from "../../interfaces";

export const audioToTextUseCase = async (audioFile: File, prompt?: string) => {
  try {
    const formData = new FormData();
    formData.append("file", audioFile);

    if (prompt) {
      formData.append("prompt", prompt);
    }

    const resp = await fetch(`${import.meta.env.VITE_GPT_API}/audio-to-text`, {
      method: "POST",
      body: formData,
    });

    // if (!resp.ok) throw new Error("No se puedo realizar la transcripción");

    const data = (await resp.json()) as AudioToTextResponse;

    return {
      ok: true,
      ...data,
    };
  } catch (e) {
    console.log(e);
    return;
    // return {
    //   ok: false,
    //   userScore: 0,
    //   errors: [],
    //   message: "No se ha podido realizar la corrección",
    // };
  }
};
