<template>
  <div>
    <button @click="exportarCSV">Exportar CSV</button>
    <button @click="exportarPDF">Exportar PDF</button>
  </div>
</template>

<script>
import jsPDF from 'jspdf';

export default {
  name: 'ExportarRelatorio',
  props: {
    gastos: {
      type: Array,
      required: true
    }
  },
  methods: {
    exportarCSV() {
      const linhas = ["Descrição,Valor,Categoria"];
      this.gastos.forEach(g => {
        linhas.push(`${g.descricao},${g.valor},${g.categoria}`);
      });
      const csv = linhas.join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'gastos.csv';
      link.click();
    },
    exportarPDF() {
      const doc = new jsPDF();
      doc.text('Relatório de Gastos', 10, 10);
      let y = 20;
      this.gastos.forEach(g => {
        doc.text(`${g.descricao} - R$${g.valor} (${g.categoria})`, 10, y);
        y += 10;
      });
      doc.save('gastos.pdf');
    }
  }
};
</script>
