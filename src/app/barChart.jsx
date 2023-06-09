'use client';

/* eslint-disable import/prefer-default-export */
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart, registerables,
} from 'chart.js';

Chart.register(...registerables);
// Chart.register(CategoryScale, LinearScale);

export function BarChart(props) {
  const {
    values, title, labels,
  } = props;
  const data = {
    labels,
    datasets: values,
  };
  return (
    <div style={{ height: 400 }}>
      <h2>{title}</h2>
      <Bar
        data={data}
        width={800}
        height={400}
        options={{
          maintainAspectRatio: true,
        }}
      />
    </div>
  );
}
