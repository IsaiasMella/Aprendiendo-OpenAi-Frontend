import { QuesstionResponse } from "../../../interfaces";

interface Options {
  threadId: string;
  question: string;
}

export const postQuestionUseCase = async (options: Options) => {
  const { question, threadId } = options;

  try {
    const resp = await fetch(
      `${import.meta.env.VITE_ASSISTANT_API}/user-question`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ threadId, question }),
      }
    );

    const replies = (await resp.json()) as QuesstionResponse[];

    return replies
  } catch (error) {
    throw new Error("error in posting questions assistant");
  }
};
