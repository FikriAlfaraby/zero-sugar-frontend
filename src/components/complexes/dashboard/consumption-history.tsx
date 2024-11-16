'use client';

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useUserJourney } from '../user-journey/service/fetchUserJourney.service';
import Image from 'next/image';

export function ConsumptionHistory({userId} : {userId : number}) {
  const { data: userJourneyResponse} = useUserJourney(userId);

  if(!userJourneyResponse?.data.length) return (
    <div className='flex flex-col justify-center items-center h-[340px]'>
      <Image 
        src="/assets/images/empty-line.svg"
        alt="Start your journey"
        width={180}
        height={180}
        className="mx-auto mb-4" />
      <div className="">No data available</div>
    </div>
  )

  
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
