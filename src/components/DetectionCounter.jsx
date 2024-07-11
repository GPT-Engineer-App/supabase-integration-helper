import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Loader from '@/components/ui/loader';

const DetectionCounter = ({ dailyCount, weeklyCount, monthlyCount, allTimeCount }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <CounterCard title="Daily Count" count={dailyCount} />
      <CounterCard title="Weekly Count" count={weeklyCount} />
      <CounterCard title="Monthly Count" count={monthlyCount} />
      <CounterCard title="All-Time Count" count={allTimeCount} />
    </div>
  );
};

const CounterCard = ({ title, count }) => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle className="text-center text-xl md:text-2xl">{title}</CardTitle>
    </CardHeader>
    <CardContent className="flex items-center justify-center h-24 md:h-32">
      {count === null ? <Loader /> : <span className="text-2xl md:text-3xl font-bold">{count}</span>}
    </CardContent>
  </Card>
);

export default DetectionCounter;