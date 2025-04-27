"use client";
import { answerMyQuestion } from "@agent/ai/text";
import { useEffect, useState } from "react";

export const AnswerBot = () => {
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState<string | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const fetchAnswer = async () => {
      if (question) {
        setLoading(true);
        const answer = await answerMyQuestion(question);
        setLoading(false);
        setAnswer(answer);
      }
    };
    fetchAnswer();
  }, [question]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInputValue("");
    setQuestion(inputValue);
  };

  return (
    <div className="flex flex-col w-full items-stretch justify-center border-2 rounded-2xl p-8">
      <h1 className="text-4xl font-bold">Answer Bot</h1>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Ask me anything..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="mt-4 p-2 border rounded flex-grow"
        />
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Ask
        </button>
      </form>
      <p className="mt-4 text-lg border-2 p-3 text-foreground/80 rounded-lg">
        {loading
          ? "Thinking..."
          : answer
            ? answer
            : "I will answer your question here."}
      </p>
    </div>
  );
};
