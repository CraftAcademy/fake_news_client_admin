import React from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import {
  BarChart,
  ResponsiveContainer,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  AreaChart,
  Area,
} from 'recharts';

const StatsGraphs = ({ data }) => {
  const isSmallScreen = useMediaQuery({ query: '(max-width: 1400px)' });
  const { articles_timeline, subscribers } = data;
  const { error } = useSelector((state) => state);

  return (
    <div style={styles.container}>
      {data && (
        <>
          <div
            data-cy='articles-graph'
            style={{
              height: 400,
              width: isSmallScreen ? '100%' : '60%',
              marginBottom: 100,
            }}>
            <h1 style={{ color: 'white', textAlign: 'center' }}>
              Articles created timeline
            </h1>
            <ResponsiveContainer
              height={400}
              width='100%'
              className='box-shadow'>
              <AreaChart
                data={articles_timeline}
                margin={{ top: 25, right: 30, bottom: 5 }}>
                <defs>
                  <linearGradient id='color' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='5%' stopColor='#21d3a4' stopOpacity={0.8} />
                    <stop offset='95%' stopColor='#21d3a4' stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type='monotone'
                  dataKey='articles'
                  stroke='#21d3a4'
                  fillOpacity={1}
                  fill='url(#color)'
                />
                <CartesianGrid strokeDasharray='3 3' style={{ opacity: 0.2 }} />
                <XAxis dataKey='date' style={{ color: 'white' }} />
                <YAxis />
                <Legend />
                <Tooltip />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          {!error && (
            <div
              data-cy='subscribers-graph'
              style={{ height: 400, width: isSmallScreen ? '100%' : '35%' }}>
              <h1 style={{ color: 'white', textAlign: 'center' }}>
                Subscriber tiers
              </h1>
              <ResponsiveContainer
                height={400}
                width='100%'
                className='box-shadow'>
                <BarChart
                  data={[subscribers]}
                  maxBarSize={75}
                  margin={{
                    top: 25,
                    right: 30,
                    bottom: 10,
                  }}>
                  <Bar
                    dataKey='yearly_subscription'
                    stroke='#fff'
                    fill='#42b0e0'
                  />
                  <Bar
                    dataKey='half_year_subscription'
                    stroke='#fff'
                    fill='#21d3a4'
                  />
                  <Bar
                    dataKey='monthly_subscription'
                    stroke='#fff'
                    fill='violet'
                  />
                  <CartesianGrid
                    strokeDasharray='3 3'
                    style={{ opacity: 0.2 }}
                  />
                  <XAxis dataKey={[subscribers]} />
                  <YAxis />
                  <Legend />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StatsGraphs;

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
};
