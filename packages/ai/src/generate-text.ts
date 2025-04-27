import { CoreMessage, generateText } from "ai";
import { createOllama } from "ollama-ai-provider";

const ollama = createOllama({});
const model = ollama("qwen2.5");

export const answerMyQuestion = async (prompt: string) => {
  const { text } = await generateText({
    model,
    prompt,
    system:
      "You are a helpful assistant. Nice short answers are preferred. Answer the question as best as you can.",
  });

  return text;
};

export type ChatMessage = CoreMessage;

export const chatWithMe = async (messages: CoreMessage[]) => {
  const { text } = await generateText({
    model,
    messages,
    system:
      "You only want to talk about the weather. Anything else you will find a way to change the subject.",
  });

  return text;
};
