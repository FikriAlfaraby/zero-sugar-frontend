'use client';

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  { name: 'Jan', sugar: 40, salt: 24, fat: 55 },
  { name: 'Feb', sugar: 30, salt: 13, fat: 60 },
  { name: 'Mar', sugar: 20, salt: 38, fat: 50 },
  { name: 'Apr', sugar: 27, salt: 39, fat: 45 },
  { name: 'May', sugar: 18, salt: 48, fat: 40 },
  { name: 'Jun', sugar: 23, salt: 38, fat: 65 },
  { name: 'Jul', sugar: 34, salt: 43, fat: 70 },
];

export function ConsumptionHistory() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={value => `${value}g`} />
        <Tooltip />
        <Line type="monotone" dataKey="sugar" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="salt" stroke="#82ca9d" />
        <Line type="monotone" dataKey="fat" stroke="#ffc658" />
      </LineChart>
    </ResponsiveContainer>
  );
}
