import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function DesempenhoGrafico({ competencias, notaTotal }) {
  const data = {
    labels: [
      'Competência 1',
      'Competência 2',
      'Competência 3',
      'Competência 4',
      'Competência 5',
    ],
    datasets: [
      {
        label: 'Sua Pontuação',
        data: competencias.length > 0 ? competencias : [0, 0, 0, 0, 0],
        backgroundColor: 'rgba(108, 99, 255, 0.2)',
        borderColor: '#6C63FF',
        borderWidth: 2,
        pointBackgroundColor: '#6C63FF',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#6C63FF',
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: 200,
        ticks: {
          display: false,
        },
        pointLabels: {
          font: {
            size: 14,
            weight: 'bold',
          },
          color: '#555',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <Paper elevation={4} sx={{ p: 3, borderRadius: 2, background: 'linear-gradient(120deg, #e3f2fd 0%, #fff 100%)', boxShadow: '0 8px 32px rgba(25,118,210,0.12)' }}>
      <Typography variant="h6" align="center" sx={{ mb: 2, fontWeight: 700, fontSize: 22 }}>
        Desempenho por Competência
      </Typography>
      <Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Radar data={data} options={options} />
      </Box>
      <Typography variant="h4" align="center" sx={{ mt: 2, fontWeight: 'bold', color: '#6C63FF' }}>
        Nota Total: {notaTotal || 0}
      </Typography>
    </Paper>
  );
}