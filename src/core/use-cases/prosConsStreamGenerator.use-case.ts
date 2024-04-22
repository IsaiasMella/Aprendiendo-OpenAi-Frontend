export async function* prosConsStreamGeneratorUseCase(prompt: string, abortSignal: AbortSignal) {
  try {
    const resp = await fetch(
      `${import.meta.env.VITE_GPT_API}/pros-cons-discusser-stream`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
        signal: abortSignal
      }
      // TODO: abortcontroler
    );

    if (!resp.ok) throw new Error("No se puedo realizar la corrección");

    const reader = resp.body?.getReader();

    if (!reader) {
      console.log("no se creo el reader");
      return null;
    }

    const decoder = new TextDecoder();

    let text = "";

    while (true) {
      const { done, value } = await reader!.read();
      if (done) break;
      const decodedChunk = decoder.decode(value, { stream: true });

      text += decodedChunk;
      yield text;
    }
  } catch (e) {
    return {
      ok: false,
      role: "",
      content: "",
    };
  }
}
