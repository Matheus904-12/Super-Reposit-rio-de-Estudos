import jsPDF from 'jspdf';
import 'jspdf-autotable';

export function exportRedacoesPdf(redacoes) {
  if (!redacoes || !redacoes.length) return;
  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text('Redações Arquivadas', 14, 16);
  const tableData = redacoes.map(r => [
    r.nomeAluno,
    r.arquivoOriginal,
    new Date(r.dataEnvio).toLocaleString(),
    r.iaDetectado ? 'Sim' : 'Não',
    r.competencias.map(c => `${c.nome}: ${c.nota}`).join(' | '),
    r.texto.slice(0, 120) + (r.texto.length > 120 ? '...' : '')
  ]);
  doc.autoTable({
    head: [['Nome do Aluno', 'Arquivo', 'Data de Envio', 'IA Detectada', 'Competências', 'Trecho do Texto']],
    body: tableData,
    startY: 24,
    styles: { fontSize: 10, cellWidth: 'wrap' },
    headStyles: { fillColor: [22, 160, 133] },
  });
  doc.save('redacoes.pdf');
}
