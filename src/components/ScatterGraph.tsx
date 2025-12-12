"use client";

import { CartesianGrid, Cell, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts";

interface Position {
  id: number;
  eval: number;
  fen: string;
}

interface ScatterGraphProps {
  data: Position[];
  onPointClick: (id: number) => void;
  activeId: number;
}

function getPointStyle(entry: Position, activeId: number) {
  const isActive = entry.id === activeId

  const fill = isActive
    ? chartTheme.points.active
    : entry.eval > 0.2
      ? chartTheme.points.positive
      : chartTheme.points.other

  return {
    fill,
    r: isActive ? chartTheme.radii.active : chartTheme.radii.normal,
    stroke: chartTheme.points.stroke,
    strokeWidth: isActive ? chartTheme.strokeWidth.active : chartTheme.strokeWidth.normal,
  }
}

export default function ScatterGraph({ data, onPointClick, activeId }: ScatterGraphProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} />

        <XAxis
          type="number"
          dataKey="id"
          name="Position #"
          stroke={chartTheme.axisText}
          tick={{ fill: chartTheme.axisText }}
          axisLine={{ stroke: chartTheme.axisLine }}
          tickLine={{ stroke: chartTheme.axisLine }}
        />

        <YAxis
          type="number"
          dataKey="eval"
          name="Eval"
          stroke={chartTheme.axisText}
          tick={{ fill: chartTheme.axisText }}
          axisLine={{ stroke: chartTheme.axisLine }}
          tickLine={{ stroke: chartTheme.axisLine }}
        />

        <Tooltip
          cursor={{ strokeDasharray: "3 3", stroke: chartTheme.axisLine }}
          contentStyle={{
            backgroundColor: chartTheme.bg,
            borderColor: chartTheme.axisLine,
            color: chartTheme.tooltipText,
            borderRadius: 8,
            boxShadow: chartTheme.shadow,
          }}
          labelStyle={{ color: chartTheme.axisText }}
          itemStyle={{ color: chartTheme.tooltipText }}
        />

        <Scatter
          name="Positions"
          data={data}
          onClick={(p: any) => onPointClick(p.payload.id)}
        >
          {data.map((entry) => {
            const style = getPointStyle(entry, activeId)

            return (
              <Cell
                key={`cell-${entry.id}`}
                fill={style.fill}
                r={style.r}
                stroke={style.stroke}
                strokeWidth={style.strokeWidth}
              />
            )
          })}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  )
}


export const chartTheme = {
  bg: "#0f172a",

  grid: "#23304a",
  axisLine: "#334155",
  axisText: "#60a5fa",
  tooltipText: "#e0e7ef",
  shadow: "0 4px 16px #0f172a88",

  points: {
    active: "#facc15",
    positive: "#38bdf8",
    other: "#6366f1",
    stroke: "#0f172a",
  },

  radii: {
    active: 8,
    normal: 5,
  },

  strokeWidth: {
    active: 1,
    normal: 0.5,
  }
} as const

