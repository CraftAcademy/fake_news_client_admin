import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Line, LineChart } from 'recharts';

const StatsGraphs = ({ data }) => {
  return (
    <>
      <BarChart
        width={800}
        height={400}
        data={data.articles_timeline}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}>
        <Bar dataKey='articles' stroke='#fff' fill='aqua' />
        <XAxis dataKey='date' />
        <YAxis dataKey='articles' />
        <Legend />
        <Tooltip />
      </BarChart>

      <BarChart
        width={700}
        height={400}
        data={data.articles}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}>
        <Bar dataKey='published' stroke='#fff' fill='olive' />
        <Bar dataKey='unpublished' stroke='#fff' fill='magenta' />
        <XAxis dataKey='articles' />
        <YAxis />
        <Legend />
        <Tooltip />
      </BarChart>
    </>
  );
};

export default StatsGraphs;
