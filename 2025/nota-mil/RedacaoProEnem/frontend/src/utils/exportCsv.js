export function exportRedacoesCsv(redacoes) {
  if (!redacoes || !redacoes.length) return;
  const header = [
    'Nome do Aluno',
    'Arquivo',
    'Data de Envio',
    'IA Detectada',
    'Competências',
    'Texto'
  ];
  const rows = redacoes.map(r => [
    r.nomeAluno,
    r.arquivoOriginal,
    new Date(r.dataEnvio).toLocaleString(),
    r.iaDetectado ? 'Sim' : 'Não',
    r.competencias.map(c => `${c.nome}: ${c.nota}`).join(' | '),
    r.texto.replace(/\n/g, ' ')
  ]);
  const csvContent = [header, ...rows].map(row => row.map(field => `"${field}"`).join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', 'redacoes.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
