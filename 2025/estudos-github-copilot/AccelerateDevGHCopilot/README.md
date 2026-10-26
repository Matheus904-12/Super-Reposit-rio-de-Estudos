# AccelerateDevGHCopilot — importação para o monorepo

Projeto de estudo de C#/.NET 9 com GitHub Copilot, originalmente desenvolvido no repositório `AccelerateDevGHCopilot`.

## Estrutura

O código importado fica organizado nesta pasta, preservando os caminhos originais de `src/` e `tests/`. A importação está **parcial**: alguns arquivos-fonte não puderam ser gravados pela integração por bloqueios de segurança e ainda precisam ser conferidos antes de declarar o projeto completo.

Arquivos pendentes de importação:
- `src/Library.ApplicationCore/Interfaces/IPatronService.cs`
- `src/Library.Console/ConsoleState.cs`
- `src/Library.Infrastructure/Data/JsonLoanRepository.cs`
- `src/Library.Infrastructure/Data/JsonPatronRepository.cs`

## Como validar localmente

1. Instale o SDK do .NET compatível com os arquivos de projeto.
2. Entre na pasta deste projeto.
3. Restaure dependências e execute os testes do projeto `tests/UnitTests`.
4. Confirme os caminhos dos arquivos JSON e ajuste-os se a execução a partir da raiz exigir isso.

**Status:** arquivos copiados parcialmente; build e testes não foram executados nesta importação. Não considerar pronto para portfólio até completar os arquivos pendentes e validar a execução.

