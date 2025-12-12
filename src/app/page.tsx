"use client";

import { useState } from 'react';
// We use a try/catch import strategy or default to empty array if file missing
import positionsRaw from '@/data/positions.json';
import ScatterGraph from '@/components/ScatterGraph';
import BoardView from '@/components/BoardView';

// TypeScript Interface
interface PositionData {
  id: number;
  fen: string;
  eval: number;
  best_move: string;
}

const positions = positionsRaw as PositionData[];


export default function ChessAtlas() {
  const [ activeId, setActiveId ] = useState<number>(positions.length > 0 ? positions[ 0 ].id : 0);

  const activeData = positions.find(p => p.id === activeId) || positions[ 0 ];

  if (!positions || positions.length === 0) {
    return <div className="p-10 text-center">Data not found. Please run the Python script first.</div>;
  }

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent mb-2">
          The Fischer Atlas
        </h1>
        <p className="text-slate-400">Exploring the fairness of Chess960</p>
      </header>

      {/* CHART SECTION */}
      <section className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 shadow-2xl mb-8 backdrop-blur-sm">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-xl font-semibold text-slate-200">Evaluation Distribution</h2>
          <div className="text-xs text-slate-500">Click a dot to view position</div>
        </div>
        <div className="h-64 w-full" style={{ minHeight: '300px', width: '100%' }}>
          {positions.length > 0 ? (
            <ScatterGraph
              data={positions}
              onPointClick={(id) => setActiveId(id)}
              activeId={activeId}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-slate-500">
              Loading Data...
            </div>
          )}
        </div>      </section>

      {/* DASHBOARD GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* LEFT: BOARD */}
        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 flex justify-center items-center shadow-lg">
          <BoardView fen={activeData.fen} />
        </div>

        {/* RIGHT: DATA */}
        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 shadow-lg flex flex-col justify-center">
          <div className="flex items-center justify-between mb-6 border-b border-slate-700 pb-4">
            <h3 className="text-3xl font-bold text-white">Position #{activeData.id}</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-bold ${activeData.eval > 0.3 ? 'bg-red-900/50 text-red-200' : 'bg-green-900/50 text-green-200'}`}>
              {activeData.eval > 0 ? `+${activeData.eval}` : activeData.eval}
            </span>
          </div>

          <div className="space-y-6">
            <InfoRow label="Best Opening Move" value={activeData.best_move} />
            <InfoRow label="Evaluation" value={`${activeData.eval} (Pawns)`} />

            <div>
              <p className="text-slate-500 text-sm mb-2">FEN String</p>
              <code className="block bg-slate-950 p-3 rounded text-xs text-slate-400 font-mono break-all border border-slate-800">
                {activeData.fen}
              </code>
            </div>

            <a
              href={`https://lichess.org/analysis/standard/${activeData.fen.replace(/ /g, "_")}`}
              target="_blank"
              rel="noreferrer"
              className="block w-full text-center py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors mt-4"
            >
              Analyse on Lichess
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

function InfoRow({ label, value }: { label: string, value: string | number }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-slate-400">{label}</span>
      <span className="text-xl font-mono text-slate-200">{value}</span>
    </div>
  )
}