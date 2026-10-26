var pdf = require("html-pdf");

// Dados do boletim
var nomeDoAluno = "Matheus Lucindo dos Santos";
var turma = "3°A";
var curso = "Técnico em Desenvolvimento de Sistemas";
var duracaoCurso = "2023 - 2024 (4 semestres)";
var competencias = [
    {
        nome: "Fundamentos de Programação Orientada a Objeto",
        nota: 9.5,
        topicos: [
            "Linguagem de programação: Princípios; Características; Tipo.",
            "Lógica de programação orientada a objeto: Definição; Aplicação; Algoritmo; Técnicas de código limpo (clean code).",
            "Programação Orientada a Objetos: Definição; Pacotes; Classes; Objetos; Interface; Polimorfismo; Enumerações; Relacionamentos de objetos.",
            "Ambiente de desenvolvimento: Instalação e configuração; Gerenciamento de dependências; Recursos e interfaces.",
            "Manipulação de arquivos: Escrita; Leitura.",
            "Controle de versões: Definição; Repositório."
        ]
    },
    {
        nome: "Sistemas Operacionais",
        nota: 9.0,
        topicos: [
            "Arquitetura dos sistemas operacionais: Definição; Histórico; Classificação; Gerenciador de processos; Sistemas de arquivos.",
            "Sistema operacional código fechado e aberto: Modo texto; Modo gráfico; Instalação na máquina virtual.",
            "Editor de texto e planilhas eletrônicas: Criação; Formatação; Inserção de dados e gráficos."
        ]
    },
    {
        nome: "Hardware e Redes",
        nota: 9.2,
        topicos: [
            "Hardware: Histórico; Arquitetura; Instalação de sistemas operacionais e drivers.",
            "Redes de computadores: Definição; Aplicabilidade; Tipos; Protocolo; Segurança de Redes; Firewall."
        ]
    },
    {
        nome: "Linguagem de Marcação",
        nota: 8.8,
        topicos: [
            "Linguagens de marcação: Definição; Tipos.",
            "HTML e CSS: Elementos, Semântica, Validação de código pelo W3C, Box model, Diagramação.",
            "Imagens: Criação, Edição, Vetorização, SVG."
        ]
    },
    {
        nome: "Banco de Dados",
        nota: 9.4,
        topicos: [
            "Sistema Gerenciador de Banco de Dados (SGBD): Definição; Tipos.",
            "Modelo Relacional: SQL, DDL, DML, Subconsultas, Funções, Triggers."
        ]
    }
];

// Montando o conteúdo HTML
var conteudo = `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
    <div style="text-align: center; margin-bottom: 30px;">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/SENAI_S%C3%A3o_Paulo_logo.png/1200px-SENAI_S%C3%A3o_Paulo_logo.png" alt="Logo SENAI" width="150" />
    </div>
    <h1 style="text-align: center; color: #2c3e50;">Boletim Escolar</h1>
    <p style="text-align: center; font-size: 1.2em; color: #2980b9;">${curso}</p>
    <hr style="border: 1px solid #2980b9;">
    <p style="font-size: 1.1em;"><strong>Nome do Aluno:</strong> ${nomeDoAluno}</p>
    <p style="font-size: 1.1em;"><strong>Turma:</strong> ${turma}</p>
    <p style="font-size: 1.1em;"><strong>Duração do Curso:</strong> ${duracaoCurso}</p>
    
    <h2 style="color: #2980b9; margin-top: 20px;">Disciplinas e Notas</h2>
    
    ${competencias.map(comp => `
      <div style="margin-bottom: 30px;">
        <h3 style="color: #8e44ad; border-bottom: 2px solid #8e44ad; padding-bottom: 5px;">
          ${comp.nome} - Nota: ${comp.nota}
        </h3>
        <ul style="list-style-type: square; padding-left: 20px;">
          ${comp.topicos.map(topico => `<li style="margin-bottom: 5px;">${topico}</li>`).join('')}
        </ul>
      </div>
    `).join('')}
    
    <footer style="text-align: center; margin-top: 40px;">
      <p style="font-size: 0.9em; color: #7f8c8d;">Gerado automaticamente - Boletim Escolar ${curso} - ${duracaoCurso}</p>
    </footer>
  </div>
`;

// Opções de formatação do PDF
var options = { 
    format: 'A4', 
    border: {
        top: "10mm",
        right: "10mm",
        bottom: "10mm",
        left: "10mm"
    }
};

// Gerando o PDF
pdf.create(conteudo, options).toFile("./boletim_escolar.pdf", (err, res) => {
    if (err) {
        console.log("Erro ao gerar o PDF:", err);
    } else {
        console.log("PDF gerado com sucesso:", res.filename);
    }
});
