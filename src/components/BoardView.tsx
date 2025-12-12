"use client";

import { Chessboard } from "react-chessboard";

export default function BoardView({ fen }: { fen: string }) {
  return (
    <div className="w-full max-w-[400px] aspect-square">
      <Chessboard
        id="BasicBoard"
        position={fen}
        boardOrientation="white"
        // customDarkSquareStyle={{ backgroundColor: "#334155" }}
        // customLightSquareStyle={{ backgroundColor: "#94a3b8" }}
        arePiecesDraggable={false}
      />
    </div>
  )
}