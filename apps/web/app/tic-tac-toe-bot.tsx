"use client";

import { generateTicTacToe } from "@agent/ai/struct";
import { ChatMessage } from "@agent/ai/text";
import { useEffect, useState } from "react";

type Board = [[Cell, Cell, Cell], [Cell, Cell, Cell], [Cell, Cell, Cell]];
type Cell = Player | null;
type Player = "X" | "O";

export const TicTacToeBot = () => {
  const [loading, setLoading] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [retries, setRetries] = useState(0);
  const [newMessage, setNewMessage] = useState(false);
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [turn, setTurn] = useState<Player>("X");
  const [board, setBoard] = useState<Board>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  useEffect(() => {
    const fetchAnswer = async () => {
      if (!newMessage || gameOver) return;
      setNewMessage(false);
      setLoading(true);
      const nextMove = await generateTicTacToe(chat);
      const validMove = (board[nextMove.y] as Cell[])[nextMove.x] === null;
      if (!validMove) {
        if (retries > 16) {
          setGameOver(true);
          setLoading(false);
          return;
        }
        setRetries((prev) => prev + 1);
        setChat((prev) => [
          ...prev,
          {
            role: "user",
            content: `Invalid move (${(nextMove.x, nextMove.y)}), please try again.`,
          },
        ]);
        setNewMessage(true);
        return;
      }
      setRetries(0);
      const newBoard = board.map((row) => [...row]) as Board;
      (newBoard[nextMove.y] as Cell[])[nextMove.x] = "O"; // Bot's move
      setBoard(newBoard);
      setTurn("X");
      setLoading(false);
    };
    fetchAnswer();
  }, [chat, newMessage, board, retries, gameOver]);

  useEffect(() => {
    if (gameOver) {
      console.log("Game Over");
    }
  }, [gameOver]);

  const handleClick = (position: [number, number]) => {
    if ((board[position[0]] as Cell[])[position[1]] === null) {
      const newBoard = board.map((row) => [...row]) as Board;
      (newBoard[position[0]] as Cell[])[position[1]] = "X"; // Player's move
      setBoard(newBoard);
      if (newBoard.flat().every((cell) => cell !== null)) {
        setGameOver(true);
        setLoading(false);
        return;
      }
      setChat((prev) => [
        ...prev,
        {
          role: "user",
          content: `I play at ${position[0]},${position[1]}, the board is now ${newBoard
            .map((row) => row.join(","))
            .join(";")}`,
        },
      ]);
      setTurn("O");
      setNewMessage(true);
    }
  };

  return (
    <div className="flex flex-col w-full items-stretch justify-center gap-4 border-2 rounded-2xl p-8">
      <h1 className="text-4xl font-bold">TicTacToe Bot</h1>
      <p className="text-lg italic text-foreground/80">Make your first move</p>
      <div className="grid grid-cols-[repeat(3,66px)] gap-1 self-center">
        {board.map((row, rowIndex) =>
          row.map((cell, cellIndex) => (
            <button
              disabled={loading || turn === "O"}
              onClick={() => handleClick([rowIndex, cellIndex])}
              key={cellIndex + rowIndex * 3}
              className={`size-17 border-2 flex items-center justify-center text-2xl ${
                cell === "X"
                  ? "text-blue-500"
                  : cell === "O"
                    ? "text-red-500"
                    : ""
              }`}
            >
              {cell}
            </button>
          ))
        )}
      </div>
      {loading && (
        <p className="text-right">
          Thinking ...{Array.from({ length: retries }).map(() => ".")}
        </p>
      )}
      {gameOver && (
        <p className="text-lg border-2 p-3 text-foreground/80 rounded-lg">
          Game Over! {turn !== "X" ? "You win!" : "Bot wins!"}
        </p>
      )}
    </div>
  );
};
