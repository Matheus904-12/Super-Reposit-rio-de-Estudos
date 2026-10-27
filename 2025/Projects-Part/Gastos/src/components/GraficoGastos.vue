<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import { onMounted, ref, watch } from 'vue';
import Chart from 'chart.js/auto';

export default {
  name: 'GraficoGastos',
  props: {
    gastos: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const canvas = ref(null);
    let chartInstance = null;

    const renderChart = () => {
      const categorias = {};
      props.gastos.forEach(g => {
        categorias[g.categoria] = (categorias[g.categoria] || 0) + g.valor;
      });
      const data = {
        labels: Object.keys(categorias),
        datasets: [{
          label: 'Gastos por Categoria',
          data: Object.values(categorias),
          backgroundColor: ['#2c3e50', '#3498db', '#e67e22', '#e74c3c', '#1abc9c']
        }]
      };
      if (chartInstance) chartInstance.destroy();
      chartInstance = new Chart(canvas.value, {
        type: 'bar',
        data,
        options: {
          responsive: true,
          plugins: {
            legend: { display: false }
          }
        }
      });
    };

    onMounted(renderChart);
    watch(() => props.gastos, renderChart, { deep: true });

    return { canvas };
  }
};
</script>
