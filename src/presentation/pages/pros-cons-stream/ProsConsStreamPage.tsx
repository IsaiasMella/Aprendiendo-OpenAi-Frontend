import { useRef, useState } from "react";
import {
  GptMessage,
  MyMessage,
  TextMessageBox,
  TypingLoader,
} from "../../components";
import { prosConsStreamGeneratorUseCase } from "../../../core/use-cases/prosConsStreamGenerator.use-case";

interface Message {
  text: string;
  isGpt: boolean;
}

export const ProsConsStreamPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const abortController = useRef(new AbortController());
  const isRunning = useRef(false);

  const handlePost = async (text: string) => {
    if (isRunning.current) {
      abortController.current.abort();
      abortController.current = new AbortController();
    }

    setIsLoading(true);
    isRunning.current = true;
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);

    const stream = prosConsStreamGeneratorUseCase(
      text,
      abortController.current.signal
    );
    setIsLoading(false);

    setMessages((prevMessage) => [...prevMessage, { text: "", isGpt: true }]);

    for await (text of stream) {
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages];
        newMessages[newMessages.length - 1].text = text;
        return newMessages;
      });
    }

    isRunning.current = false;

    // if (!reader) return alert("no hya reader");

    // const decoder = new TextDecoder();

    // let message = "";

    // setMessages((prevMessage) => [
    //   ...prevMessage,
    //   { text: message, isGpt: true },
    // ]);

    // // eslint-disable-next-line no-constant-condition
    // while (true) {
    //   const { done, value } = await reader!.read();
    //   if (done) break;
    //   const decodedChunk = decoder.decode(value, { stream: true });

    //   message += decodedChunk;

    //   setMessages((prevMessages) => {
    //     const newMessages = [...prevMessages];
    //     newMessages[newMessages.length - 1].text = message;
    //     return newMessages;
    //   });
    // }
    //TODO: UseCase

    // Todo: Añadir el mensaje de isGPT en true
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenida */}
          <GptMessage text="¿Qué deseas comprar hoy?" />

          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessage key={index} text={message.text} />
            ) : (
              <MyMessage key={index} text={message.text} />
            )
          )}

          {isLoading && (
            <div className="col-start-1 col-end-12 fade-in">
              <TypingLoader />
            </div>
          )}
        </div>
      </div>

      <TextMessageBox
        onSendMessage={handlePost}
        placeholder="Escribe aquí lo que deseas"
        disableCorrections
      />
    </div>
  );
};
