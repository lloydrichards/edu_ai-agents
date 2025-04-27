import { AnswerBot } from "./answer-bot";
import { ChatBot } from "./chat-bot";
import { InterestingMap } from "./interest-map";

export default async function Page() {
  return (
    <main className="flex flex-col items-center w-full gap-8 min-h-screen p-24">
      <AnswerBot />
      <ChatBot />
      <InterestingMap />
    </main>
  );
}
