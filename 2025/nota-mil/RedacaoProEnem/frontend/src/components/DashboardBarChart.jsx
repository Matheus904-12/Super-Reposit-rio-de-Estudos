import React from 'react';
import { Paper, Typography, Box, Button } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ['Alunos', 'Autoavaliação', 'Mentoria'],
  datasets: [
    {
      label: 'Redações',
      data: [0, 0, 0],
      backgroundColor: [
        '#6C63FF',
        '#B388FF',
        '#FFD600',
      ],
      borderRadius: 12,
      barPercentage: 0.6,
      categoryPercentage: 0.6,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { display: false },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: '#222', font: { weight: 600 } },
    },
    y: {
      grid: { display: false },
      beginAtZero: true,
      ticks: { color: '#222', font: { weight: 600 } },
    },
  },
};

export default function DashboardBarChart() {
  return (
  <Paper elevation={0} sx={{ p: 3, borderRadius: 2, bgcolor: '#fff', boxShadow: '0 4px 24px rgba(108,99,255,0.08)', minWidth: 320 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>Minhas Redações</Typography>
        <Button variant="text" sx={{ color: '#6C63FF', fontWeight: 600 }}>Ver Detalhes</Button>
      </Box>
      <Bar data={data} options={options} height={180} />
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 12, height: 12, bgcolor: '#6C63FF', borderRadius: '50%' }} />
          <Typography variant="caption">Alunos</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 12, height: 12, bgcolor: '#B388FF', borderRadius: '50%' }} />
          <Typography variant="caption">Autoavaliação</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 12, height: 12, bgcolor: '#FFD600', borderRadius: '50%' }} />
          <Typography variant="caption">Mentoria</Typography>
        </Box>
      </Box>
    </Paper>
  );
}
