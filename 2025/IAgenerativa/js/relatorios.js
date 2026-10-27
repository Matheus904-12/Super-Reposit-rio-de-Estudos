document.addEventListener('DOMContentLoaded', function() {
    // Verifica autenticação
    firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            window.location.href = 'index.html';
        } else {
            // Carrega os dados para os relatórios
            loadReportData();
        }
    });
    
    // Elementos do DOM
    const filterPeriod = document.getElementById('filter-period');
    const exportBtn = document.getElementById('export-report');
    
    // Event listeners
    filterPeriod.addEventListener('change', loadReportData);
    exportBtn.addEventListener('click', exportReport);
    
    // Inicializa gráficos
    initReportCharts();
});

// Carrega os dados para os relatórios
function loadReportData() {
    const user = firebase.auth().currentUser;
    if (!user) return;
    
    const period = document.getElementById('filter-period').value;
    const db = firebase.firestore();
    
    // Define o período de tempo
    let startDate = new Date();
    
    switch (period) {
        case 'week':
            startDate.setDate(startDate.getDate() - 7);
            break;
        case 'month':
            startDate.setMonth(startDate.getMonth() - 1);
            break;
        case 'quarter':
            startDate.setMonth(startDate.getMonth() - 3);
            break;
        case 'year':
            startDate.setFullYear(startDate.getFullYear() - 1);
            break;
        default: // 'all'
            startDate = null;
    }
    
    // Consulta as redações no período selecionado
    let query = db.collection('redacoes')
        .where('professorId', '==', user.uid)
        .where('analisada', '==', true);
    
    if (startDate) {
        query = query.where('dataAnalise', '>=', startDate);
    }
    
    query.get()
        .then((querySnapshot) => {
            const redacoes = [];
            let totalNota = 0;
            let totalIA = 0;
            
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                redacoes.push(data);
                totalNota += data.nota || 0;
                if (data.iaDetectada) totalIA++;
            });
            
            // Atualiza as estatísticas
            updateReportStats(redacoes, totalNota, totalIA);
            
            // Atualiza os gráficos
            updateReportCharts(redacoes);
        })
        .catch((error) => {
            console.error('Erro ao carregar dados para relatório:', error);
        });
}

// Atualiza as estatísticas do relatório
function updateReportStats(redacoes, totalNota, totalIA) {
    const totalRedacoes = redacoes.length;
    const mediaNota = totalRedacoes > 0 ? Math.round(totalNota / totalRedacoes) : 0;
    const percentIA = totalRedacoes > 0 ? Math.round((totalIA / totalRedacoes) * 100) : 0;
    
    document.getElementById('report-total').textContent = totalRedacoes;
    document.getElementById('report-average').textContent = mediaNota;
    document.getElementById('report-ia').textContent = `${percentIA}%`;
    
    // Distribuição de notas
    const distribution = [0, 0, 0, 0, 0]; // 0-200, 201-400, 401-600, 601-800, 801-1000
    
    redacoes.forEach(redacao => {
        const nota = redacao.nota || 0;
        if (nota <= 200) distribution[0]++;
        else if (nota <= 400) distribution[1]++;
        else if (nota <= 600) distribution[2]++;
        else if (nota <= 800) distribution[3]++;
        else distribution[4]++;
    });
    
    // Atualiza o gráfico de distribuição
    const distributionChart = Chart.getChart('distributionChart');
    if (distributionChart) {
        distributionChart.data.datasets[0].data = distribution;
        distributionChart.update();
    }
}

// Inicializa os gráficos do relatório
function initReportCharts() {
    // Gráfico de distribuição de notas
    const distributionCtx = document.getElementById('distributionChart').getContext('2d');
    new Chart(distributionCtx, {
        type: 'bar',
        data: {
            labels: ['0-200', '201-400', '401-600', '601-800', '801-1000'],
            datasets: [{
                label: 'Redações',
                data: [0, 0, 0, 0, 0],
                backgroundColor: 'rgba(74, 107, 255, 0.7)',
                borderColor: 'rgba(74, 107, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Quantidade de Redações'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Faixa de Notas'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
    
    // Gráfico de competências ao longo do tempo (simplificado)
    const competencesCtx = document.getElementById('competencesChart').getContext('2d');
    new Chart(competencesCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            datasets: [
                {
                    label: 'Competência 1',
                    data: [120, 140, 150, 160, 170, 180, 170, 160, 175, 180, 185, 190],
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    tension: 0.3
                },
                {
                    label: 'Competência 2',
                    data: [100, 110, 120, 130, 140, 150, 145, 150, 155, 160, 165, 170],
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    tension: 0.3
                },
                {
                    label: 'Competência 3',
                    data: [110, 120, 130, 140, 150, 160, 155, 160, 165, 170, 175, 180],
                    borderColor: 'rgba(255, 206, 86, 1)',
                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                    tension: 0.3
                },
                {
                    label: 'Competência 4',
                    data: [130, 140, 150, 160, 170, 180, 175, 180, 185, 190, 195, 200],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    tension: 0.3
                },
                {
                    label: 'Competência 5',
                    data: [90, 100, 110, 120, 130, 140, 135, 140, 145, 150, 155, 160],
                    borderColor: 'rgba(153, 102, 255, 1)',
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    tension: 0.3
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false,
                    min: 0,
                    max: 200,
                    title: {
                        display: true,
                        text: 'Pontuação Média'
                    }
                }
            }
        }
    });
}

// Atualiza os gráficos do relatório com dados reais
function updateReportCharts(redacoes) {
    // Agrupa por mês para o gráfico de competências ao longo do tempo
    const monthlyData = {};
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    
    redacoes.forEach(redacao => {
        if (!redacao.dataAnalise || !redacao.competencias) return;
        
        const date = redacao.dataAnalise.toDate();
        const month = date.getMonth(); // 0-11
        
        if (!monthlyData[month]) {
            monthlyData[month] = {
                c1: [], c2: [], c3: [], c4: [], c5: [],
                count: 0
            };
        }
        
        monthlyData[month].c1.push(redacao.competencias.c1 || 0);
        monthlyData[month].c2.push(redacao.competencias.c2 || 0);
        monthlyData[month].c3.push(redacao.competencias.c3 || 0);
        monthlyData[month].c4.push(redacao.competencias.c4 || 0);
        monthlyData[month].c5.push(redacao.competencias.c5 || 0);
        monthlyData[month].count++;
    });
    
    // Calcula médias mensais
    const competencesChart = Chart.getChart('competencesChart');
    if (competencesChart) {
        competencesChart.data.datasets.forEach(dataset => {
            const compKey = dataset.label.replace('Competência ', 'c');
            dataset.data = months.map((_, month) => {
                if (monthlyData[month] && monthlyData[month].count > 0) {
                    const sum = monthlyData[month][compKey].reduce((a, b) => a + b, 0);
                    return Math.round(sum / monthlyData[month][compKey].length);
                }
                return null;
            });
        });
        
        competencesChart.update();
    }
}

// Exporta o relatório para PDF
function exportReport() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Configurações
    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const contentWidth = pageWidth - (margin * 2);
    let yPos = margin;
    
    // Estilos
    const styles = {
        title: { fontSize: 18, fontStyle: 'bold', color: [40, 40, 40] },
        subtitle: { fontSize: 14, fontStyle: 'bold', color: [60, 60, 60] },
        header: { fontSize: 12, fontStyle: 'bold', color: [40, 40, 40] },
        text: { fontSize: 11, fontStyle: 'normal', color: [80, 80, 80] },
        smallText: { fontSize: 10, fontStyle: 'normal', color: [100, 100, 100] }
    };
    
    // Função para adicionar texto com estilo
    function addText(text, x, y, style, options = {}) {
        doc.setFontSize(style.fontSize);
        doc.setFont('helvetica', style.fontStyle);
        doc.setTextColor(...style.color);
        doc.text(text, x, y, options);
        return y + (style.fontSize / 2) + 2;
    }
    
    // Função para adicionar uma nova página se necessário
    function checkPageHeight(neededSpace) {
        if (yPos + neededSpace > doc.internal.pageSize.getHeight() - margin) {
            doc.addPage();
            yPos = margin;
        }
    }
    
    // Cabeçalho
    yPos = addText('Relatório de Desempenho - RedaENEM', margin, yPos, styles.title);
    
    const period = document.getElementById('filter-period').value;
    const periodText = {
        'week': 'Última Semana',
        'month': 'Último Mês',
        'quarter': 'Último Trimestre',
        'year': 'Último Ano',
        'all': 'Todo o Período'
    }[period] || 'Período Selecionado';
    
    yPos = addText(periodText, margin, yPos, styles.subtitle);
    
    const user = firebase.auth().currentUser;
    if (user) {
        yPos = addText(`Professor: ${user.displayName || user.email}`, margin, yPos, styles.text);
    }
    
    const dateStr = new Date().toLocaleDateString('pt-BR');
    yPos = addText(`Gerado em: ${dateStr}`, margin, yPos, styles.text);
    
    yPos += 10;
    
    // Linha divisória
    doc.setDrawColor(200);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 15;
    
    // Estatísticas resumidas
    checkPageHeight(50);
    yPos = addText('Resumo Estatístico', margin, yPos, styles.subtitle);
    
    const totalRedacoes = document.getElementById('report-total').textContent;
    const mediaNota = document.getElementById('report-average').textContent;
    const percentIA = document.getElementById('report-ia').textContent;
    
    yPos = addText(`Total de Redações Analisadas: ${totalRedacoes}`, margin, yPos + 5, styles.text);
    yPos = addText(`Média Geral de Notas: ${mediaNota}`, margin, yPos, styles.text);
    yPos = addText(`Percentual com IA Detectada: ${percentIA}`, margin, yPos, styles.text);
    
    yPos += 15;
    
    // Distribuição de notas
    checkPageHeight(100);
    yPos = addText('Distribuição de Notas', margin, yPos, styles.subtitle);
    
    // Adiciona gráfico de distribuição (simplificado)
    const distributionChart = document.getElementById('distributionChart');
    if (distributionChart) {
        const chartImage = distributionChart.toDataURL('image/png');
        doc.addImage(chartImage, 'PNG', margin, yPos, contentWidth, 80);
        yPos += 90;
    } else {
        yPos = addText('Gráfico de distribuição não disponível', margin, yPos + 5, styles.smallText);
        yPos += 10;
    }
    
    // Competências ao longo do tempo
    checkPageHeight(100);
    yPos = addText('Desempenho por Competência', margin, yPos, styles.subtitle);
    
    const competencesChart = document.getElementById('competencesChart');
    if (competencesChart) {
        const chartImage = competencesChart.toDataURL('image/png');
        doc.addImage(chartImage, 'PNG', margin, yPos, contentWidth, 80);
        yPos += 90;
    } else {
        yPos = addText('Gráfico de competências não disponível', margin, yPos + 5, styles.smallText);
        yPos += 10;
    }
    
    // Observações
    checkPageHeight(30);
    yPos = addText('Observações', margin, yPos, styles.subtitle);
    yPos = addText('Este relatório foi gerado automaticamente pela plataforma RedaENEM.', margin, yPos + 5, styles.smallText);
    yPos = addText('Para mais informações, acesse a plataforma ou entre em contato com o suporte.', margin, yPos, styles.smallText);
    
    // Rodapé
    const footerY = doc.internal.pageSize.getHeight() - 10;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(150, 150, 150);
    doc.text('© RedaENEM - Plataforma de Análise de Redações do ENEM', margin, footerY);
    
    // Salva o PDF
    doc.save(`Relatorio_RedaENEM_${dateStr.replace(/\//g, '-')}.pdf`);
}