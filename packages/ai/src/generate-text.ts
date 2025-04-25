import { generateText } from "ai";
import { createOllama } from "ollama-ai-provider";

const ollama = createOllama({});
const model = ollama("qwen2.5");

export const answerMyQuestion = async (prompt: string) => {
  const { text } = await generateText({
    model,
    prompt,
  });

  return text;
};
