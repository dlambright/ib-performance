'use client';

import { useState, useEffect } from 'react';
import { Leckerli_One } from 'next/font/google';
import { BarChart } from './barChart';
// import { mobileBaselineData } from './data/mobile/baseline';
import { desktopBaselineData } from './data/desktop/baseline';
import { mobileBaselineData } from './data/mobile/baseline';
import { LeviathanBurndown } from './leviathan_burndown';

export default function Home() {
  const [values, setValues] = useState([]);
  const [title, setTitle] = useState('');
  const [label, setLabel] = useState('');
  const [labels, setLabels] = useState([]);
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [lighthouseJSON, setLighthouseJSON] = useState([]);

  const datasets = [
    mobileBaselineData[0],
    desktopBaselineData[0],
    lighthouseJSON,
  ];
  const colors = [
    '#FF0000aa', '#0000FFaa',
  ];
  const borderColors = [
    '#FF0000', '#0000FF',
  ];

  const { audits } = desktopBaselineData[0];
  const numericUnits = Array.from(new Set(Object.keys(audits)
    .map((a) => (audits[a].numericUnit ? audits[a].numericUnit : null))));

  useEffect(() => {
    const newData = [];
    for (let i = 0; i < datasets.length; i += 1) {
      const newDataArray = selectedLabels.map((sl) => datasets[i].audits[sl].numericValue);

      newData.push({
        label: `dataset ${i}`,
        data: newDataArray,
        backgroundColor: colors[i],
        borderColor: borderColors[i],
        stack: `stack ${i}`,
      });
    }
    setValues(newData);
  }, [selectedLabels]);

  const handleClick = (clickVal) => {
    if (selectedLabels.includes(clickVal)) {
      setSelectedLabels(selectedLabels.filter((lbl) => lbl !== clickVal));
    } else {
      setSelectedLabels([...selectedLabels, clickVal]);
    }
  };

  const handleNumericUnitClick = (nu) => {
    setSelectedLabels([]);
    const allAudits = datasets.map((ds) => ds.audits);
    const newLabels = new Set();
    for (let i = 0; i < allAudits.length; i += 1) {
      const keys = Object.keys(allAudits[i]);
      for (let j = 0; j < keys.length; j += 1) {
        if (allAudits[i][keys[j]].numericUnit === nu) {
          newLabels.add(keys[j]);
        }
      }
    }
    setLabels(Array.from(newLabels));
  };

  const uploadData = (rawJSON) => {
    debugger;
    const data = JSON.parse(rawJSON);
    setLighthouseJSON(data);
  };
  return (
    <main>
      {/* <div style={{
        display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '100%', marginTop: '3rem', padding: '1rem',
      }}
      >
        <input type="text" value={lighthouseJSON ? 'JSON Uploaded' : 'Error Parsing JSON'} onChange={(e) => uploadData(e.target.value)} />
        {numericUnits.map((nu) => {
          if (nu) {
            return (
              <button type="button" style={{ margin: '.5rem', padding: '.5rem' }} key={nu} onClick={() => handleNumericUnitClick(nu)}>
                {nu}
              </button>
            );
          }
          return null;
        })}
      </div>
      <BarChart
        label={label}
        labels={selectedLabels}
        values={values}
        title={title}
      />
      <div style={{
        display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '100%', marginTop: '3rem', padding: '1rem',
      }}
      >
        { labels.map((lbl) => (
          <button type="button" style={{ margin: '.5rem', padding: '.5rem', backgroundColor: selectedLabels.includes(lbl) ? 'green' : '#ffffff' }} key={lbl} onClick={() => handleClick(lbl)}>
            {lbl}
          </button>
        )) }

      </div> */}
      <LeviathanBurndown />
    </main>
  );
}
