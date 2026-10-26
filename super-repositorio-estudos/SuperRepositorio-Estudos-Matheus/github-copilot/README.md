# Guia de Estudos — GitHub Copilot

Este guia deve reunir anotações e exercícios próprios sobre o uso responsável do GitHub Copilot no desenvolvimento de software.

## Trilha sugerida

1. **Fundamentos**
   - O que o Copilot faz e quais são suas limitações.
   - Diferença entre sugestão, chat, edição assistida e agentes, conforme a versão usada.
   - Contexto do repositório, instruções e arquivos de orientação.

2. **Prompts e contexto**
   - Descrever objetivo, restrições, arquivos envolvidos e critérios de aceite.
   - Pedir explicações antes de alterações amplas.
   - Solicitar mudanças pequenas e revisáveis.
   - Evitar enviar tokens, dados de clientes ou código confidencial sem autorização.

3. **Desenvolvimento com segurança**
   - Revisar cada diff.
   - Validar dependências e comandos sugeridos.
   - Rodar testes, lint e análise estática.
   - Conferir SQL, autenticação, autorização, validação de entrada e tratamento de erros.

4. **Testes e depuração**
   - Pedir casos de teste a partir de requisitos.
   - Verificar casos-limite.
   - Reproduzir erros e validar a correção.
   - Nunca considerar uma resposta do modelo como prova de que o código está correto.

5. **Fluxo de trabalho**
   - Abrir uma tarefa pequena.
   - Definir critérios de aceite.
   - Pedir um plano.
   - Implementar em etapas.
   - Revisar o diff.
   - Rodar testes.
   - Documentar o resultado.

## Modelo de exercício

```markdown
# Exercício: [tema]

## Objetivo
[resultado esperado]

## Contexto fornecido
[arquivos e informações não sensíveis]

## Restrições
- Não fazer refatorações fora do escopo.
- Preservar contratos e estrutura existente.
- Explicar mudanças relevantes.

## Critérios de aceite
- [ ] ...
- [ ] ...

## Revisão humana
- [ ] Entendi o código proposto.
- [ ] Revisei o diff.
- [ ] Rodei os testes.
- [ ] Verifiquei segurança e dependências.
- [ ] Registrei o que aprendi.
```

## Fontes oficiais

- Documentação do GitHub Copilot: https://docs.github.com/en/copilot
- Tutoriais do GitHub Skills: https://skills.github.com/

> Confirmar sempre se o material corresponde à versão e ao plano do Copilot que estiver sendo usado.
