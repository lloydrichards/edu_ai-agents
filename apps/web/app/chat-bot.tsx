"use client";
import { ChatMessage, chatWithMe } from "@agent/ai/text";
import { useEffect, useState } from "react";

export const ChatBot = () => {
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState(false);
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const fetchAnswer = async () => {
      if (newMessage) {
        setNewMessage(false);
        setLoading(true);
        const answer = await chatWithMe(chat);
        setLoading(false);
        setChat((prev) => [...prev, { role: "assistant", content: answer }]);
      }
    };
    fetchAnswer();
  }, [chat, newMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInputValue("");
    setChat((prev) => [...prev, { role: "user", content: inputValue }]);
    setNewMessage(true);
  };

  return (
    <div className="flex flex-col w-full items-stretch justify-center border-2 rounded-2xl p-8">
      <h1 className="text-4xl font-bold">Chat Bot</h1>
      <div className="flex flex-col gap-4 mt-4">
        {chat.length === 0 && (
          <p className="text-lg italic p-3 text-foreground/80 rounded-lg">
            What do you want to know about the weather?
          </p>
        )}
        {chat.map((message, index) => (
          <p
            key={index}
            className={`text-lg border-2 p-3 text-foreground/80 rounded-lg ${
              message.role === "user"
                ? "self-end ml-32 bg-primary/10 text-primary"
                : "self-start mr-32 bg-secondary/10 text-foreground/80"
            }`}
          >
            {`${message.content}`}
          </p>
        ))}
        {loading && <p className="text-right">Thinking...</p>}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Write message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="mt-4 p-2 border rounded flex-grow"
        />
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Send
        </button>
      </form>
    </div>
  );
};
