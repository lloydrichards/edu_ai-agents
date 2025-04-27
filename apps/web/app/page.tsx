import { AnswerBot } from "./answer-bot";
import { ChatBot } from "./chat-bot";
import { InterestingMap } from "./interest-map";
import { TicTacToeBot } from "./tic-tac-toe-bot";

export default async function Page() {
  return (
    <main className="flex flex-col items-center w-full gap-8 min-h-screen p-24">
      <AnswerBot />
      <ChatBot />
      <InterestingMap />
      <TicTacToeBot />
    </main>
  );
}
