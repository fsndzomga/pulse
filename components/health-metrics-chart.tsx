"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { date: 'Week 1', weight: 180, steps: 5000, calories: 2200 },
  { date: 'Week 2', weight: 178, steps: 6000, calories: 2100 },
  { date: 'Week 3', weight: 176, steps: 7000, calories: 2000 },
  { date: 'Week 4', weight: 174, steps: 8000, calories: 1900 },
  { date: 'Week 5', weight: 172, steps: 9000, calories: 1800 },
  { date: 'Week 6', weight: 170, steps: 10000, calories: 1700 },
];

export function HealthMetricsChart() {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Line yAxisId="left" type="monotone" dataKey="weight" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line yAxisId="right" type="monotone" dataKey="steps" stroke="#82ca9d" />
          <Line yAxisId="left" type="monotone" dataKey="calories" stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
