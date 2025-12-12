"use client";

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface Position {
  id: number;
  eval: number;
  fen: string;
}

interface Props {
  data: Position[];
  onPointClick: (id: number) => void;
  activeId: number;
}

export default function ScatterVis({ data, onPointClick, activeId }: Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis
          type="number"
          dataKey="id"
          name="ID"
          stroke="#94a3b8"
          tick={{ fill: '#94a3b8' }}
        />
        <YAxis
          type="number"
          dataKey="eval"
          name="Eval"
          stroke="#94a3b8"
          tick={{ fill: '#94a3b8' }}
        />
        <Tooltip
          cursor={{ strokeDasharray: '3 3' }}
          contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
        />
        <Scatter name="Positions" data={data} onClick={(p: any) => onPointClick(p.payload.id)}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.id === activeId ? '#facc15' : (entry.eval > 0.2 ? '#f87171' : '#4ade80')}
              r={entry.id === activeId ? 8 : 4} // Highlight the selected dot
            />
          ))}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
}