function generateRedacaoPdf(redacao) {
    // Verifica se jsPDF está disponível
    if (typeof jsPDF === 'undefined') {
        console.error('jsPDF não está disponível');
        return;
    }
    
    // Cria um novo documento PDF
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
        smallText: { fontSize: 10, fontStyle: 'normal', color: [100, 100, 100] },
        primaryColor: [74, 107, 255],
        successColor: [76, 175, 80],
        dangerColor: [244, 67, 54]
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
    yPos = addText('Relatório de Redação - ENEM', margin, yPos, styles.title);
    yPos += 10;
    
    // Informações básicas
    yPos = addText(`Aluno: ${redacao.alunoNome || 'Não identificado'}`, margin, yPos, styles.header);
    yPos = addText(`Tema: ${redacao.tema || 'Não especificado'}`, margin, yPos, styles.header);
    
    const dataUpload = redacao.dataUpload ? redacao.dataUpload.toDate() : new Date();
    yPos = addText(`Data: ${dataUpload.toLocaleDateString('pt-BR')}`, margin, yPos, styles.header);
    
    // Nota
    if (redacao.nota) {
        const notaColor = redacao.nota >= 800 ? styles.successColor : 
                         redacao.nota >= 600 ? styles.primaryColor : styles.dangerColor;
        
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...notaColor);
        doc.text(`Nota: ${redacao.nota}/1000`, pageWidth - margin, margin + 10, { align: 'right' });
    }
    
    // Linha divisória
    yPos += 10;
    doc.setDrawColor(200);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 15;
    
    // Texto Motivador
    checkPageHeight(30);
    yPos = addText('Texto Motivador', margin, yPos, styles.subtitle);
    
    if (redacao.textoMotivador) {
        doc.setFontSize(styles.text.fontSize);
        doc.setFont('helvetica', styles.text.fontStyle);
        doc.setTextColor(...styles.text.color);
        
        const splitText = doc.splitTextToSize(redacao.textoMotivador, contentWidth);
        yPos = doc.text(splitText, margin, yPos + 5);
    } else {
        yPos = addText('Nenhum texto motivador fornecido.', margin, yPos + 5, styles.smallText);
    }
    
    yPos += 15;
    
    // Redação do Aluno
    checkPageHeight(30);
    yPos = addText('Redação do Aluno', margin, yPos, styles.subtitle);
    
    if (redacao.textoExtraido) {
        doc.setFontSize(styles.text.fontSize);
        doc.setFont('helvetica', styles.text.fontStyle);
        doc.setTextColor(...styles.text.color);
        
        const splitText = doc.splitTextToSize(redacao.textoExtraido, contentWidth);
        yPos = doc.text(splitText, margin, yPos + 5);
    } else {
        yPos = addText('Conteúdo da redação não disponível para pré-visualização.', margin, yPos + 5, styles.smallText);
        
        if (redacao.arquivoUrl) {
            yPos = addText(`Arquivo original: ${redacao.arquivoUrl}`, margin, yPos + 5, {
                fontSize: 10,
                fontStyle: 'normal',
                color: [74, 107, 255]
            });
        }
    }
    
    yPos += 20;
    
    // Análise de Autoria
    checkPageHeight(30);
    yPos = addText('Análise de Autoria', margin, yPos, styles.subtitle);
    
    if (redacao.analisada) {
        if (redacao.iaDetectada) {
            yPos = addText('Possível uso de IA detectado', margin, yPos + 5, {
                fontSize: styles.text.fontSize,
                fontStyle: 'bold',
                color: styles.dangerColor
            });
            
            yPos = addText(`Probabilidade: ${redacao.iaProbability || 0}%`, margin, yPos, styles.text);
            
            if (redacao.iaTrechos && redacao.iaTrechos.length > 0) {
                yPos = addText('Trechos possivelmente gerados por IA:', margin, yPos + 10, styles.header);
                
                redacao.iaTrechos.forEach((trecho, index) => {
                    checkPageHeight(20);
                    yPos = addText(`${index + 1}. ${trecho}`, margin + 5, yPos + 5, styles.smallText);
                });
            }
        } else {
            yPos = addText('Nenhum indício claro de uso de IA detectado', margin, yPos + 5, {
                fontSize: styles.text.fontSize,
                fontStyle: 'bold',
                color: styles.successColor
            });
        }
    } else {
        yPos = addText('Esta redação ainda não foi analisada.', margin, yPos + 5, styles.text);
    }
    
    yPos += 20;
    
    // Competências ENEM
    checkPageHeight(40);
    yPos = addText('Competências ENEM', margin, yPos, styles.subtitle);
    
    if (redacao.competencias) {
        const competencias = [
            { name: 'Competência 1: Domínio da norma padrão', key: 'c1' },
            { name: 'Competência 2: Compreensão do tema', key: 'c2' },
            { name: 'Competência 3: Argumentação', key: 'c3' },
            { name: 'Competência 4: Coesão', key: 'c4' },
            { name: 'Competência 5: Proposta de intervenção', key: 'c5' }
        ];
        
        competencias.forEach(comp => {
            checkPageHeight(30);
            
            const score = redacao.competencias[comp.key] || 0;
            const percent = score / 2; // Convert to percentage (0-200 to 0-100)
            
            // Nome da competência e pontuação
            yPos = addText(`${comp.name}: ${score}/200`, margin, yPos + 5, styles.header);
            
            // Barra de progresso
            const barHeight = 5;
            const barWidth = contentWidth * 0.6;
            
            // Fundo da barra
            doc.setFillColor(230, 230, 230);
            doc.rect(margin, yPos, barWidth, barHeight, 'F');
            
            // Preenchimento da barra
            const fillColor = percent >= 80 ? styles.successColor : 
                             percent >= 60 ? styles.primaryColor : styles.dangerColor;
            
            doc.setFillColor(...fillColor);
            doc.rect(margin, yPos, barWidth * (percent / 100), barHeight, 'F');
            
            yPos += barHeight + 5;
            
            // Comentário
            const comment = getCompetenciaComment(comp.key, score);
            yPos = addText(comment, margin, yPos, styles.smallText);
            
            yPos += 10;
        });
    } else {
        yPos = addText('Nenhuma análise de competências disponível.', margin, yPos + 5, styles.text);
    }
    
    yPos += 15;
    
    // Comentários do Professor
    checkPageHeight(30);
    yPos = addText('Comentários do Professor', margin, yPos, styles.subtitle);
    
    if (redacao.comentariosProfessor) {
        doc.setFontSize(styles.text.fontSize);
        doc.setFont('helvetica', styles.text.fontStyle);
        doc.setTextColor(...styles.text.color);
        
        const splitText = doc.splitTextToSize(redacao.comentariosProfessor, contentWidth);
        yPos = doc.text(splitText, margin, yPos + 5);
    } else {
        yPos = addText('Nenhum comentário do professor disponível.', margin, yPos + 5, styles.text);
    }
    
    // Rodapé
    const footerY = doc.internal.pageSize.getHeight() - 10;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(150, 150, 150);
    doc.text(`Gerado por RedaENEM em ${new Date().toLocaleDateString('pt-BR')}`, pageWidth - margin, footerY, { align: 'right' });
    
    // Salva o PDF
    doc.save(`Redacao_ENEM_${redacao.alunoNome || 'aluno'}.pdf`);
}

// Função auxiliar para comentários de competência (mesma do analise.js)
function getCompetenciaComment(competenciaKey, score) {
    const comments = {
        c1: {
            low: 'O texto apresenta diversos desvios gramaticais e de norma padrão.',
            medium: 'O texto demonstra domínio razoável da norma padrão, com alguns desvios pontuais.',
            high: 'O texto demonstra excelente domínio da norma padrão da língua portuguesa.'
        },
        c2: {
            low: 'O texto não compreende adequadamente o tema proposto ou foge ao assunto.',
            medium: 'O texto aborda o tema, mas com algumas limitações na compreensão.',
            high: 'O texto demonstra plena compreensão do tema proposto.'
        },
        c3: {
            low: 'O texto apresenta argumentação frágil ou ausente.',
            medium: 'O texto apresenta argumentação satisfatória, mas poderia ser mais desenvolvida.',
            high: 'O texto apresenta argumentação consistente e bem desenvolvida.'
        },
        c4: {
            low: 'O texto apresenta problemas graves de coesão e organização.',
            medium: 'O texto apresenta coesão satisfatória, com alguns problemas pontuais.',
            high: 'O texto apresenta excelente coesão e organização lógica.'
        },
        c5: {
            low: 'O texto não apresenta proposta de intervenção ou ela é inadequada.',
            medium: 'O texto apresenta proposta de intervenção satisfatória, mas poderia ser mais detalhada.',
            high: 'O texto apresenta proposta de intervenção bem elaborada e detalhada.'
        }
    };
    
    const level = score < 100 ? 'low' : score < 160 ? 'medium' : 'high';
    return comments[competenciaKey][level];
}