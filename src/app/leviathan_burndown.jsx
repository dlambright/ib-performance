/* eslint-disable import/prefer-default-export */

'use-client';

import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import {
  Chart, registerables,
} from 'chart.js';

Chart.register(...registerables);

const historicalData = {
  carbonite: [770, 770, 700],
  bronzium: [900, 900, 860],
  chromium: [700, 700, 640],
  aurodium: [380, 380, 360],
  electrium: [280, 280, 260],
  zinbiddle: [130, 130, 110],
  impulse: [80, 80, 60],
  aeromagnifier: [80, 80, 60],
  keypad: [40, 40, 40],
  brain: [40, 40, 40],
  fragmented: [585, 585, 545],
  incomplete: [630, 630, 580],
  flawed: [575, 575, 530],
  relics: [32, 32, 30],
  total: [],
};

const burndownPace = {
  carbonite: [770],
  bronzium: [900],
  chromium: [700],
  aurodium: [380],
  electrium: [280],
  zinbiddle: [130],
  impulse: [80],
  aeromagnifier: [80],
  keypad: [40],
  brain: [40],
  fragmented: [585],
  incomplete: [630],
  flawed: [575],
  relics: [32],
  total: [],
};

export function LeviathanBurndown() {
  const burndownDays = 42;
  const [chartData, setChartData] = useState(null);
  const [filterKey, setFilterKey] = useState(null);
  const keys = Object.keys(burndownPace);

  const getTotals = (dict) => {
    const runningTotals = [];
    for (let j = 0; j < dict.carbonite.length; j += 1) {
      runningTotals.push(0);
      for (let i = 0; i < keys.length; i += 1) {
        if (keys[i] === 'total') {
          continue;
        }
        runningTotals[j] += dict[keys[i]][j];
      }
    }
    console.log('running totals: ', runningTotals);
    return runningTotals;
  };

  useEffect(() => {
    for (let i = 0; i < keys.length; i += 1) {
      for (let j = 1; j < burndownDays + 1; j += 1) {
        burndownPace[keys[i]].push(
          burndownPace[keys[i]][0] - burndownPace[keys[i]][0] * (j / burndownDays),
        );
      }
    }
    burndownPace.total = getTotals(burndownPace);
    historicalData.total = getTotals(historicalData);

    const datasets = keys.map((key) => ({
      label: key,
      data: burndownPace[key],
      fill: false,
      pointRadius: 0,
    }));

    setChartData({
      labels: [...Array(burndownDays).keys(), burndownDays],
      datasets,
    });
  }, []);

  useEffect(() => {
    setChartData({
      labels: [...Array(burndownDays).keys(), burndownDays],
      datasets: [{
        label: 'Burndown rate',
        data: burndownPace[filterKey],
        fill: false,
        pointRadius: 0,
      },
      {
        label: 'Actual',
        data: historicalData[filterKey],
        fill: false,
        pointRadius: 0,
      },
      ],
    });
  }, [filterKey]);

  return (
    <>
      <div style={{ height: 400 }}>
        { chartData && (
        <Line
          data={chartData}
          width={800}
          height={400}
          options={{
            maintainAspectRatio: true,
          }}
        />
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {keys.map((k) => (
          <div key={k} style={{ padding: '.5rem' }}>
            <button style={{ padding: '.25rem' }} type="button" onClick={() => setFilterKey(k)}>{k}</button>
          </div>
        ))}
      </div>
    </>
  );
}
