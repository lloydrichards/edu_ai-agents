import { createOllama } from "ollama-ai-provider";

const ollama = createOllama({});
export const model = ollama("qwen2.5");
