import Image from "next/image";
import { Card } from "@agent/ui/card";
import { answerMyQuestion } from "@agent/ai/text";

export default async function Page() {
  const answer = await answerMyQuestion("Are you listening to me?");
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <div>
        <h1 className="text-4xl font-bold">Hello, Agent!</h1>
        <p className="mt-4 text-lg border-2 p-3 rounded-lg">{answer}</p>
      </div>
    </main>
  );
}
