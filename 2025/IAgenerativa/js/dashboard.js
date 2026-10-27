document.addEventListener('DOMContentLoaded', function() {
    // Verifica autenticação
    firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            window.location.href = 'index.html';
        }
    });
    
    // Elementos do DOM
    const toggleDarkMode = document.getElementById('toggle-dark-mode');
    const darkModeStylesheet = document.getElementById('dark-mode');
    const menuToggle = document.querySelector('.btn-menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    // Toggle do menu em dispositivos móveis
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
    
    // Toggle do modo escuro
    toggleDarkMode.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        // Atualiza o ícone e texto do botão
        const icon = toggleDarkMode.querySelector('i');
        const text = isDarkMode ? 'Modo Claro' : 'Modo Escuro';
        icon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
        toggleDarkMode.innerHTML = `<i class="${icon.className}"></i> ${text}`;
        
        // Salva preferência no localStorage
        localStorage.setItem('darkMode', isDarkMode);
    });
    
    // Verifica preferência salva do modo escuro
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        const icon = toggleDarkMode.querySelector('i');
        icon.className = 'fas fa-sun';
        toggleDarkMode.innerHTML = `<i class="${icon.className}"></i> Modo Claro`;
    }
    
    // Carrega estatísticas do dashboard
    loadDashboardStats();
    
    // Inicializa gráficos
    initCharts();
    
    // Carrega atividades recentes
    loadRecentActivities();
});

// Carrega estatísticas do dashboard
function loadDashboardStats() {
    const user = firebase.auth().currentUser;
    if (!user) return;
    
    const db = firebase.firestore();
    
    db.collection('redacoes')
        .where('professorId', '==', user.uid)
        .get()
        .then((querySnapshot) => {
            const totalRedacoes = document.getElementById('total-redacoes');
            const redacoesAnalisadas = document.getElementById('redacoes-analisadas');
            const redacoesIa = document.getElementById('redacoes-ia');
            const mediaGeral = document.getElementById('media-geral');
            
            const total = querySnapshot.size;
            let analisadas = 0;
            let iaDetectada = 0;
            let somaNotas = 0;
            
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                if (data.analisada) analisadas++;
                if (data.iaDetectada) iaDetectada++;
                if (data.nota) somaNotas += data.nota;
            });
            
            totalRedacoes.textContent = total;
            redacoesAnalisadas.textContent = analisadas;
            redacoesIa.textContent = iaDetectada;
            mediaGeral.textContent = total > 0 ? Math.round(somaNotas / total) : 0;
        })
        .catch((error) => {
            console.error('Erro ao carregar estatísticas:', error);
        });
}

// Inicializa gráficos do dashboard
function initCharts() {
    // Gráfico de distribuição de notas
    const notasCtx = document.getElementById('notasChart').getContext('2d');
    const notasChart = new Chart(notasCtx, {
        type: 'bar',
        data: {
            labels: ['0-200', '201-400', '401-600', '601-800', '801-1000'],
            datasets: [{
                label: 'Redações',
                data: [12, 19, 8, 15, 6],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
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
    
    // Gráfico de competências
    const competenciasCtx = document.getElementById('competenciasChart').getContext('2d');
    const competenciasChart = new Chart(competenciasCtx, {
        type: 'radar',
        data: {
            labels: ['Competência 1', 'Competência 2', 'Competência 3', 'Competência 4', 'Competência 5'],
            datasets: [{
                label: 'Média por Competência',
                data: [180, 150, 160, 140, 170],
                backgroundColor: 'rgba(74, 107, 255, 0.2)',
                borderColor: 'rgba(74, 107, 255, 1)',
                pointBackgroundColor: 'rgba(74, 107, 255, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(74, 107, 255, 1)'
            }]
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    suggestedMin: 0,
                    suggestedMax: 200
                }
            }
        }
    });
    
    // Atualiza gráficos com dados reais do Firestore
    updateChartsWithRealData();
}

// Atualiza gráficos com dados do Firestore
function updateChartsWithRealData() {
    const user = firebase.auth().currentUser;
    if (!user) return;
    
    const db = firebase.firestore();
    
    db.collection('redacoes')
        .where('professorId', '==', user.uid)
        .where('analisada', '==', true)
        .get()
        .then((querySnapshot) => {
            // Dados para o gráfico de distribuição de notas
            const notasData = [0, 0, 0, 0, 0]; // [0-200, 201-400, 401-600, 601-800, 801-1000]
            
            // Dados para o gráfico de competências
            const competenciasData = [0, 0, 0, 0, 0]; // [C1, C2, C3, C4, C5]
            let count = 0;
            
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const nota = data.nota || 0;
                
                // Distribuição de notas
                if (nota <= 200) notasData[0]++;
                else if (nota <= 400) notasData[1]++;
                else if (nota <= 600) notasData[2]++;
                else if (nota <= 800) notasData[3]++;
                else notasData[4]++;
                
                // Média por competência
                if (data.competencias) {
                    competenciasData[0] += data.competencias.c1 || 0;
                    competenciasData[1] += data.competencias.c2 || 0;
                    competenciasData[2] += data.competencias.c3 || 0;
                    competenciasData[3] += data.competencias.c4 || 0;
                    competenciasData[4] += data.competencias.c5 || 0;
                    count++;
                }
            });
            
            // Atualiza gráfico de distribuição de notas
            const notasChart = Chart.getChart('notasChart');
            if (notasChart) {
                notasChart.data.datasets[0].data = notasData;
                notasChart.update();
            }
            
            // Atualiza gráfico de competências (calcula médias)
            if (count > 0) {
                for (let i = 0; i < competenciasData.length; i++) {
                    competenciasData[i] = Math.round(competenciasData[i] / count);
                }
                
                const competenciasChart = Chart.getChart('competenciasChart');
                if (competenciasChart) {
                    competenciasChart.data.datasets[0].data = competenciasData;
                    competenciasChart.update();
                }
            }
        })
        .catch((error) => {
            console.error('Erro ao carregar dados para gráficos:', error);
        });
}

// Carrega atividades recentes
function loadRecentActivities() {
    const user = firebase.auth().currentUser;
    if (!user) return;
    
    const db = firebase.firestore();
    const activitiesList = document.getElementById('recent-activities');
    
    db.collection('redacoes')
        .where('professorId', '==', user.uid)
        .orderBy('dataUpload', 'desc')
        .limit(5)
        .get()
        .then((querySnapshot) => {
            activitiesList.innerHTML = '';
            
            if (querySnapshot.empty) {
                activitiesList.innerHTML = '<p class="no-activities">Nenhuma redação recente encontrada.</p>';
                return;
            }
            
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const activityItem = document.createElement('div');
                activityItem.className = 'activity-item';
                
                const date = data.dataUpload ? data.dataUpload.toDate() : new Date();
                const dateStr = date.toLocaleDateString('pt-BR');
                const timeStr = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                
                activityItem.innerHTML = `
                    <img src="assets/images/default-student.png" alt="Aluno" class="activity-avatar">
                    <div class="activity-info">
                        <h4>${data.alunoNome || 'Aluno não identificado'}</h4>
                        <p>${data.tema || 'Tema não especificado'}</p>
                    </div>
                    <span class="activity-time">${dateStr} às ${timeStr}</span>
                    ${data.nota ? `<span class="activity-score">${data.nota}</span>` : '<span class="activity-score pending">Pendente</span>'}
                `;
                
                activitiesList.appendChild(activityItem);
            });
        })
        .catch((error) => {
            console.error('Erro ao carregar atividades recentes:', error);
            activitiesList.innerHTML = '<p class="error-activities">Erro ao carregar atividades recentes.</p>';
        });
}