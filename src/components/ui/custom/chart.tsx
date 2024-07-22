"use client";

import { useEffect, useState } from "react";
import { Pie, PieChart, Sector } from "recharts";

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
    index,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        className="fill-foreground font-medium flex-wrap flex"
      >
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        className="font-semibold fill-foreground"
      >
        {payload.label
          ? `${payload.label} (${value.toLocaleString("pt-BR")})`
          : `${value.toLocaleString("pt-BR")}`}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        className="fill-slate-400 font-medium"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    </g>
  );
};

type Props = {
  data: () => {
    name: string;
    value: number;
    label: string;
  }[];
};

const isSSR = typeof window === "undefined";

export const Chart = ({ data }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(
    isSSR ? 280 : window.innerWidth
  );

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <PieChart
      height={280}
      width={windowWidth >= 1280 ? 360 : windowWidth / 2}
      style={{
        overflow: "visible",
        minWidth: 280,
      }}
    >
      <Pie
        data={data().map((d, index: number) => ({
          ...d,
          fill: getFillColor(index),
        }))}
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        dataKey="value"
        overflow="visible"
        onMouseEnter={onPieEnter}
      />
    </PieChart>
  );
};

export const ChartLegends = ({ data }: Props) => {
  return data().map((d, index: number) => (
    <div key={d.name} className="flex items-center gap-2">
      <div
        className="w-5 h-4"
        style={{
          background: getFillColor(index),
        }}
      />
      <span>
        {d.name}:{" "}
        <strong className="font-medium">
          {d.value.toLocaleString("pt-BR")}
        </strong>
      </span>
    </div>
  ));
};

const getFillColor = (index: number) =>
  [
    "#f87171",
    "#84cc16",
    "#14b8a6",
    "#6366f1",
    "#d946ef",
    "#fb923c",
    "#22c55e",
    "#06b6d4",
    "#8b5cf6",
    "#ec4899",
    "#f59e0b",
    "#10b981",
    "#0ea5e9",
    "#f43f5e",
    "#eab308",
    "#3b82f6",
    "#a855f7",
    "#b91c1c",
    "#4d7c0f",
    "#0e7490",
    "#4338ca",
    "#a21caf",
    "#ea580c",
    "#15803d",
    "#0369a1",
    "#6d28d9",
    "#be185d",
    "#047857",
    "#1d4ed8",
    "#7e22ce",
    "#be123c",
    "#0f766e",
  ][index];
