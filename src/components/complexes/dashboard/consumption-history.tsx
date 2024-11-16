'use client';

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useUserJourney } from '../user-journey/service/fetchUserJourney.service';

export function ConsumptionHistory({userId} : {userId : number}) {
  const { data: userJourneyResponse} = useUserJourney(userId);

  
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={userJourneyResponse?.data}>
        <XAxis dataKey="CREATED_AT" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={value => `${value}g`} />
        <Tooltip />
        <Line type="monotone" dataKey="SUGAR" stroke="#23C1C1" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
