# Triagem dos projetos de 2025 para o monorepo

Este documento define o que deve ser copiado para dentro do repositório e o que deve continuar independente. A prioridade é **copiar arquivos reais**, não montar uma lista de links.

## Importação em andamento

### AccelerateDevGHCopilot — importar para o monorepo
- Estudo de C#/.NET 9 com GitHub Copilot, criado em 2025.
- Os arquivos foram copiados parcialmente para `2025/estudos-github-copilot/AccelerateDevGHCopilot/`.
- Quatro arquivos ainda estão pendentes por bloqueios de segurança da integração.
- **Próximo passo:** completar a cópia por um método autorizado, revisar a estrutura e executar build/testes antes de declarar concluído.

## Candidatos para avaliar

### DHCP-LAN — verificar possibilidade de importação
- Atividade pequena de redes com três arquivos binários do Cisco Packet Tracer.
- A integração atual não conseguiu copiar os arquivos binários.
- **Decisão:** não marcar como migrado enquanto os arquivos originais não forem preservados integralmente.

### Painel-de-Gastos — manter fora por enquanto
- Projeto com interface, persistência local e endpoints PHP/MySQL.
- Apesar de relativamente pequeno, tem funcionalidades próprias e merece revisão de configuração e execução antes de decidir se é apropriado incorporá-lo.
- **Decisão:** não copiar nesta etapa.

## Projetos que devem continuar em repositórios próprios

- **ConectaTEA:** aplicação independente. Credenciais antigas precisam ser rotacionadas e o deploy testado.
- **EcommerceWeb:** aplicação de e-commerce de maior porte. Concluir revisão de segurança e execução.
- **PositiveSenseWeb:** aplicação independente. Configurações atuais usam variáveis de ambiente, mas credenciais expostas anteriormente ainda precisam ser rotacionadas e os fluxos testados.

## Exclusões desta rodada

Nenhum projeto criado em 2026 deve ser importado nesta rodada. O repositório de estudo de clima `WeatherAPI` e o laboratório `engineering-playground` ficam fora do monorepo; não devem aparecer como projetos importados nem como atalhos de navegação neste catálogo.

## Regras para concluir uma migração

1. Confirmar data de criação e selecionar somente projetos elegíveis.
2. Copiar os arquivos de verdade, preservando diretórios e nomes.
3. Não copiar segredos, dados pessoais, dependências geradas ou materiais sem autorização.
4. Verificar a quantidade e a estrutura dos arquivos copiados.
5. Executar build/testes ou documentar com clareza o que ainda não foi validado.
6. Só excluir a origem após confirmar que a cópia está completa. A integração atual não oferece ação para apagar repositórios inteiros; nenhuma origem foi apagada.
