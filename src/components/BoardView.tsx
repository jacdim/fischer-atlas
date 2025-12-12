"use client";

import { Chessboard } from "react-chessboard";

export default function BoardView({ fen }: { fen: string }) {
  return (
    <div className="w-full max-w-[400px] aspect-square">
      <Chessboard
        options={{
          position: fen,
          boardOrientation: "white"
        }}
      />
    </div>
  );
}