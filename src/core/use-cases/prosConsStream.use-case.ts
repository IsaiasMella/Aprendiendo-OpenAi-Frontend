export const prosConsStreamUseCase = async (prompt: string) => {
  try {
    const resp = await fetch(
      `${import.meta.env.VITE_GPT_API}/pros-cons-discusser-stream`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      }
      // TODO: abortcontroler
    );

    if (!resp.ok) throw new Error("No se puedo realizar la corrección");

    const reader = resp.body?.getReader();

    if (!reader) {
      console.log("no se creo el reader");
      return null;
    }

    return reader

    // const decoder = new TextDecoder();

    // let text = "";

    // // eslint-disable-next-line no-constant-condition
    // while (true) {
    //   const { done, value } = await reader!.read();
    //   if (done) break;
    //   const decodedChunk = decoder.decode(value, { stream: true });

    //   text += decodedChunk;
    //   console.log(text);
    // }
  } catch (e) {
    return {
      ok: false,
      role: "",
      content: "",
    };
  }
};
