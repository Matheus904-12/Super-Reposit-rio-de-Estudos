document.addEventListener('DOMContentLoaded', function() {
    // Verifica autenticação
    firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            window.location.href = 'index.html';
        } else {
            // Carrega a lista de redações
            loadRedacoes();
        }
    });
    
    // Elementos do DOM
    const uploadBtn = document.getElementById('upload-redacao');
    const uploadModal = document.getElementById('upload-modal');
    const closeModal = document.querySelector('.modal-close');
    const cancelBtn = document.querySelector('.btn-cancel');
    const uploadStartBtn = document.querySelector('.btn-upload-start');
    const fileInput = document.getElementById('file-input');
    const dropArea = document.getElementById('drop-area');
    const uploadFilesList = document.getElementById('upload-files-list');
    const uploadProgress = document.getElementById('upload-progress');
    
    // Variáveis de estado
    let filesToUpload = [];
    
    // Abre o modal de upload
    uploadBtn.addEventListener('click', () => {
        uploadModal.classList.add('active');
    });
    
    // Fecha o modal de upload
    closeModal.addEventListener('click', () => {
        uploadModal.classList.remove('active');
        resetUploadForm();
    });
    
    cancelBtn.addEventListener('click', () => {
        uploadModal.classList.remove('active');
        resetUploadForm();
    });
    
    // Seleciona arquivos
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            filesToUpload = Array.from(e.target.files);
            updateFilesList();
        }
    });
    
    // Drag and drop
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });
    
    function highlight() {
        dropArea.classList.add('active');
    }
    
    function unhighlight() {
        dropArea.classList.remove('active');
    }
    
    dropArea.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        
        if (files.length > 0) {
            filesToUpload = Array.from(files);
            updateFilesList();
        }
    });
    
    // Atualiza a lista de arquivos para upload
    function updateFilesList() {
        uploadFilesList.innerHTML = '';
        
        if (filesToUpload.length === 0) {
            uploadStartBtn.disabled = true;
            return;
        }
        
        uploadStartBtn.disabled = false;
        
        filesToUpload.forEach((file, index) => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            
            const fileExtension = file.name.split('.').pop().toLowerCase();
            let fileIcon = 'fa-file';
            
            if (['doc', 'docx'].includes(fileExtension)) fileIcon = 'fa-file-word';
            else if (fileExtension === 'pdf') fileIcon = 'fa-file-pdf';
            else if (['txt', 'text'].includes(fileExtension)) fileIcon = 'fa-file-alt';
            
            fileItem.innerHTML = `
                <div class="file-info">
                    <i class="fas ${fileIcon} file-icon"></i>
                    <span class="file-name">${file.name}</span>
                    <span class="file-size">(${formatFileSize(file.size)})</span>
                </div>
                <i class="fas fa-times file-remove" data-index="${index}"></i>
            `;
            
            uploadFilesList.appendChild(fileItem);
        });
        
        // Adiciona event listeners para remover arquivos
        document.querySelectorAll('.file-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                filesToUpload.splice(index, 1);
                updateFilesList();
            });
        });
    }
    
    // Formata tamanho do arquivo
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    // Inicia o upload
    uploadStartBtn.addEventListener('click', () => {
        if (filesToUpload.length === 0) return;
        
        const tema = document.getElementById('upload-tema').value;
        const textoMotivador = document.getElementById('upload-texto-motivador').value;
        const analiseAutomatica = document.getElementById('upload-analise-automatica').checked;
        
        if (!tema) {
            alert('Por favor, informe o tema da redação.');
            return;
        }
        
        // Mostra a barra de progresso
        uploadProgress.style.display = 'block';
        const progressFill = uploadProgress.querySelector('.progress-fill');
        const progressText = uploadProgress.querySelector('.progress-text');
        
        // Desabilita botões durante o upload
        uploadStartBtn.disabled = true;
        cancelBtn.disabled = true;
        
        // Variáveis para acompanhar o progresso
        let uploadedCount = 0;
        const totalFiles = filesToUpload.length;
        
        // Atualiza a barra de progresso
        function updateProgress() {
            const percent = Math.round((uploadedCount / totalFiles) * 100);
            progressFill.style.width = `${percent}%`;
            progressText.textContent = `${percent}%`;
            
            if (uploadedCount === totalFiles) {
                setTimeout(() => {
                    uploadModal.classList.remove('active');
                    resetUploadForm();
                    loadRedacoes(); // Recarrega a lista de redações
                }, 1000);
            }
        }
        
        // Processa cada arquivo
        filesToUpload.forEach(file => {
            uploadRedacao(file, tema, textoMotivador, analiseAutomatica)
                .then(() => {
                    uploadedCount++;
                    updateProgress();
                })
                .catch(error => {
                    console.error('Erro ao enviar redação:', error);
                    uploadedCount++;
                    updateProgress();
                });
        });
    });
    
    // Reseta o formulário de upload
    function resetUploadForm() {
        filesToUpload = [];
        fileInput.value = '';
        document.getElementById('upload-tema').value = '';
        document.getElementById('upload-texto-motivador').value = '';
        document.getElementById('upload-analise-automatica').checked = false;
        uploadFilesList.innerHTML = '';
        uploadProgress.style.display = 'none';
        uploadProgress.querySelector('.progress-fill').style.width = '0%';
        uploadProgress.querySelector('.progress-text').textContent = '0%';
        uploadStartBtn.disabled = true;
        cancelBtn.disabled = false;
    }
    
    // Filtros
    const filterStatus = document.getElementById('filter-status');
    const filterDate = document.getElementById('filter-date');
    const filterScore = document.getElementById('filter-score');
    const filterIa = document.getElementById('filter-ia');
    
    [filterStatus, filterDate, filterScore, filterIa].forEach(filter => {
        filter.addEventListener('change', () => {
            loadRedacoes();
        });
    });
    
    // Paginação
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const currentPageSpan = document.getElementById('current-page');
    const totalPagesSpan = document.getElementById('total-pages');
    
    let currentPage = 1;
    const itemsPerPage = 10;
    let totalPages = 1;
    
    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            loadRedacoes();
        }
    });
    
    nextPageBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            loadRedacoes();
        }
    });
});

// Carrega a lista de redações
function loadRedacoes() {
    const user = firebase.auth().currentUser;
    if (!user) return;
    
    const db = firebase.firestore();
    const listBody = document.getElementById('redacoes-list-body');
    
    // Mostra loading
    listBody.innerHTML = '<div class="loading">Carregando redações...</div>';
    
    // Obtém filtros
    const statusFilter = document.getElementById('filter-status').value;
    const dateFilter = document.getElementById('filter-date').value;
    const scoreFilter = document.getElementById('filter-score').value;
    const iaFilter = document.getElementById('filter-ia').value;
    
    // Cria query base
    let query = db.collection('redacoes')
        .where('professorId', '==', user.uid)
        .orderBy('dataUpload', 'desc');
    
    // Aplica filtro de status
    if (statusFilter === 'analyzed') {
        query = query.where('analisada', '==', true);
    } else if (statusFilter === 'pending') {
        query = query.where('analisada', '==', false);
    }
    
    // Aplica filtro de data
    if (dateFilter !== 'all') {
        const now = new Date();
        let startDate;
        
        if (dateFilter === 'today') {
            startDate = new Date(now.setHours(0, 0, 0, 0));
        } else if (dateFilter === 'week') {
            const day = now.getDay();
            const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Ajusta para segunda-feira
            startDate = new Date(now.setDate(diff));
            startDate.setHours(0, 0, 0, 0);
        } else if (dateFilter === 'month') {
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        }
        
        query = query.where('dataUpload', '>=', startDate);
    }
    
    // Executa a query
    query.get()
        .then((querySnapshot) => {
            let redacoes = [];
            
            querySnapshot.forEach(doc => {
                redacoes.push({ id: doc.id, ...doc.data() });
            });
            
            // Aplica filtros que não podem ser feitos no Firestore
            redacoes = redacoes.filter(redacao => {
                // Filtro de nota
                if (scoreFilter !== 'all' && redacao.nota) {
                    const [min, max] = scoreFilter.split('-').map(Number);
                    if (redacao.nota < min || redacao.nota > max) return false;
                }
                
                // Filtro de IA
                if (iaFilter !== 'all') {
                    const hasIA = redacao.iaDetectada === true;
                    if ((iaFilter === 'yes' && !hasIA) || (iaFilter === 'no' && hasIA)) return false;
                }
                
                return true;
            });
            
            // Atualiza paginação
            const totalItems = redacoes.length;
            totalPages = Math.ceil(totalItems / itemsPerPage);
            
            document.getElementById('current-page').textContent = currentPage;
            document.getElementById('total-pages').textContent = totalPages;
            
            prevPageBtn.disabled = currentPage === 1;
            nextPageBtn.disabled = currentPage === totalPages;
            
            // Pega os itens da página atual
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const paginatedRedacoes = redacoes.slice(startIndex, endIndex);
            
            // Atualiza a lista
            renderRedacoesList(paginatedRedacoes);
        })
        .catch(error => {
            console.error('Erro ao carregar redações:', error);
            listBody.innerHTML = '<div class="error">Erro ao carregar redações. Tente novamente.</div>';
        });
}

// Renderiza a lista de redações
function renderRedacoesList(redacoes) {
    const listBody = document.getElementById('redacoes-list-body');
    
    if (redacoes.length === 0) {
        listBody.innerHTML = '<div class="no-results">Nenhuma redação encontrada com os filtros atuais.</div>';
        return;
    }
    
    listBody.innerHTML = '';
    
    redacoes.forEach(redacao => {
        const listItem = document.createElement('div');
        listItem.className = 'list-item';
        
        const dataUpload = redacao.dataUpload ? redacao.dataUpload.toDate() : new Date();
        const dateStr = dataUpload.toLocaleDateString('pt-BR');
        
        // Status
        const statusBadge = redacao.analisada ? 
            '<span class="status-badge analyzed">Analisada</span>' : 
            '<span class="status-badge pending">Pendente</span>';
        
        // Nota
        let notaDisplay = '<span class="score-discard pending">-</span>';
        if (redacao.nota) {
            const scoreClass = redacao.nota >= 800 ? 'high' : 
                             redacao.nota >= 600 ? 'medium' : 'low';
            notaDisplay = `<span class="score-display ${scoreClass}">${redacao.nota}</span>`;
        }
        
        // IA Detectada
        const iaBadge = redacao.iaDetectada ? 
            '<span class="ia-badge yes">Sim</span>' : 
            '<span class="ia-badge no">Não</span>';
        
        listItem.innerHTML = `
            <div class="header-item">${redacao.alunoNome || 'Aluno não identificado'}</div>
            <div class="header-item">${redacao.tema || 'Tema não especificado'}</div>
            <div class="header-item">${dateStr}</div>
            <div class="header-item">${statusBadge}</div>
            <div class="header-item">${notaDisplay}</div>
            <div class="header-item">${redacao.analisada ? iaBadge : '-'}</div>
            <div class="header-item">
                <div class="action-buttons">
                    <button class="action-btn primary" data-id="${redacao.id}" title="Visualizar">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn" data-id="${redacao.id}" title="Analisar">
                        <i class="fas fa-search"></i>
                    </button>
                    <button class="action-btn danger" data-id="${redacao.id}" title="Excluir">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        
        listBody.appendChild(listItem);
    });
    
    // Adiciona event listeners aos botões
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const redacaoId = e.currentTarget.getAttribute('data-id');
            const action = e.currentTarget.querySelector('i').className;
            
            if (action.includes('fa-eye')) {
                // Visualizar redação
                viewRedacao(redacaoId);
            } else if (action.includes('fa-search')) {
                // Analisar redação
                analyzeRedacao(redacaoId);
            } else if (action.includes('fa-trash')) {
                // Excluir redação
                deleteRedacao(redacaoId);
            }
        });
    });
}

// Visualiza uma redação
function viewRedacao(redacaoId) {
    // Armazena o ID da redação para ser acessado na página de análise
    sessionStorage.setItem('currentRedacaoId', redacaoId);
    window.location.href = 'analise.html';
}

// Analisa uma redação
function analyzeRedacao(redacaoId) {
    // Aqui você pode implementar a lógica para analisar uma redação
    // Pode ser uma chamada para a função de análise automática ou abrir o modal de análise
    alert(`Análise da redação ${redacaoId} será implementada aqui.`);
}

// Exclui uma redação
function deleteRedacao(redacaoId) {
    if (confirm('Tem certeza que deseja excluir esta redação? Esta ação não pode ser desfeita.')) {
        const db = firebase.firestore();
        
        db.collection('redacoes').doc(redacaoId).delete()
            .then(() => {
                alert('Redação excluída com sucesso!');
                loadRedacoes(); // Recarrega a lista
            })
            .catch(error => {
                console.error('Erro ao excluir redação:', error);
                alert('Erro ao excluir redação. Tente novamente.');
            });
    }
}

// Faz upload de uma redação para o Firestore
function uploadRedacao(file, tema, textoMotivador, analiseAutomatica) {
    return new Promise((resolve, reject) => {
        const user = firebase.auth().currentUser;
        if (!user) {
            reject('Usuário não autenticado');
            return;
        }
        
        const db = firebase.firestore();
        const storage = firebase.storage();
        
        // Extrai o nome do aluno do nome do arquivo (pode ser personalizado)
        const fileName = file.name.replace(/\.[^/.]+$/, ""); // Remove extensão
        const alunoNome = fileName.split('_')[0] || fileName;
        
        // Cria um ID único para a redação
        const redacaoId = db.collection('redacoes').doc().id;
        
        // Define o caminho no Storage
        const filePath = `redacoes/${user.uid}/${redacaoId}/${file.name}`;
        const fileRef = storage.ref(filePath);
        
        // Faz upload do arquivo para o Storage
        const uploadTask = fileRef.put(file);
        
        uploadTask.on('state_changed',
            (snapshot) => {
                // Pode ser usado para mostrar progresso individual
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload: ${progress}%`);
            },
            (error) => {
                console.error('Erro no upload:', error);
                reject(error);
            },
            () => {
                // Upload completo, obtém a URL de download
                uploadTask.snapshot.ref.getDownloadURL()
                    .then((downloadURL) => {
                        // Salva os metadados no Firestore
                        const redacaoData = {
                            professorId: user.uid,
                            alunoNome: alunoNome,
                            tema: tema,
                            textoMotivador: textoMotivador,
                            arquivoNome: file.name,
                            arquivoUrl: downloadURL,
                            arquivoPath: filePath,
                            dataUpload: firebase.firestore.FieldValue.serverTimestamp(),
                            analisada: false,
                            iaDetectada: false,
                            nota: null,
                            competencias: null,
                            comentarios: null
                        };
                        
                        db.collection('redacoes').doc(redacaoId).set(redacaoData)
                            .then(() => {
                                console.log('Redação salva no Firestore');
                                
                                // Se análise automática estiver ativada, inicia a análise
                                if (analiseAutomatica) {
                                    analyzeRedacaoAutomatically(redacaoId, file, downloadURL);
                                }
                                
                                resolve();
                            })
                            .catch(error => {
                                console.error('Erro ao salvar redação:', error);
                                reject(error);
                            });
                    })
                    .catch(error => {
                        console.error('Erro ao obter URL de download:', error);
                        reject(error);
                    });
            }
        );
    });
}

// Analisa a redação automaticamente (simulação)
function analyzeRedacaoAutomatically(redacaoId, file, fileUrl) {
    // Esta é uma simulação - na implementação real, você chamaria sua API de análise
    
    // Para arquivos de texto, podemos tentar ler o conteúdo
    if (file.type === 'text/plain') {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const text = e.target.result;
            simulateAnalysis(redacaoId, text);
        };
        
        reader.readAsText(file);
    } else {
        // Para outros tipos de arquivo, apenas simula a análise
        setTimeout(() => {
            simulateAnalysis(redacaoId, "Conteúdo da redação não disponível para pré-visualização.");
        }, 2000);
    }
}

// Simula a análise automática (substitua por chamada real à API)
function simulateAnalysis(redacaoId, textContent) {
    const db = firebase.firestore();
    
    // Simula análise de IA (30% de chance de detectar IA)
    const iaDetectada = Math.random() < 0.3;
    const iaProbability = iaDetectada ? Math.floor(Math.random() * 50) + 50 : Math.floor(Math.random() * 50);
    
    // Simula trechos de IA
    const iaTrechos = [];
    if (iaDetectada) {
        const sentences = textContent.split(/[.!?]+/).filter(s => s.trim().length > 0);
        if (sentences.length > 0) {
            const numTrechos = Math.min(3, Math.floor(sentences.length / 3));
            for (let i = 0; i < numTrechos; i++) {
                const idx = Math.floor(Math.random() * sentences.length);
                iaTrechos.push(sentences[idx].trim() + (textContent[idx]?.match(/[.!?]/) ? '' : '.'));
            }
        }
    }
    
    // Simula nota baseada no ENEM (400-1000, com distribuição normal)
    const nota = Math.floor(Math.random() * 300) + 600; // Entre 600-900
    const adjustedNota = Math.min(1000, Math.max(0, nota));
    
    // Simula competências (cada uma de 0-200)
    const competencias = {
        c1: Math.floor(Math.random() * 150) + 50, // Domínio da norma padrão
        c2: Math.floor(Math.random() * 150) + 50, // Compreensão do tema
        c3: Math.floor(Math.random() * 150) + 50, // Argumentação
        c4: Math.floor(Math.random() * 150) + 50, // Coesão
        c5: Math.floor(Math.random() * 150) + 50  // Proposta de intervenção
    };
    
    // Atualiza a redação com os resultados da análise
    db.collection('redacoes').doc(redacaoId).update({
        analisada: true,
        iaDetectada: iaDetectada,
        iaProbability: iaProbability,
        iaTrechos: iaTrechos,
        nota: adjustedNota,
        competencias: competencias,
        dataAnalise: firebase.firestore.FieldValue.serverTimestamp(),
        comentarios: "Análise automática realizada pelo sistema."
    })
    .then(() => {
        console.log('Análise automática concluída para redação:', redacaoId);
    })
    .catch(error => {
        console.error('Erro ao salvar análise:', error);
    });
}