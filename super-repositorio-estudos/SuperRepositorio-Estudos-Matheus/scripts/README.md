# Scripts de inventário

A integração disponível nesta sessão permite ler e editar arquivos em repositórios existentes, mas não disponibiliza uma ação para criar um repositório remoto novo. Por isso, este pacote é um ponto de partida local; depois de criar o repositório no GitHub, publique-o com Git.

Para inventariar os repositórios, a CLI oficial do GitHub (`gh`) pode exportar metadados. Exemplo:

```bash
gh repo list Matheus904-12 --limit 1000 --json name,url,visibility,createdAt,updatedAt,description \
  > repositorios.json
```

Depois, classifique os repositórios manualmente e valide a visibilidade antes de importar código. Não use scripts para publicar automaticamente todos os conteúdos sem auditoria.
