import { AnswerBot } from "./answer-bot";
import { ChatBot } from "./chat-bot";

export default async function Page() {
  return (
    <main className="flex flex-col items-center w-full justify-between min-h-screen p-24">
      <AnswerBot />
      <ChatBot />
    </main>
  );
}
