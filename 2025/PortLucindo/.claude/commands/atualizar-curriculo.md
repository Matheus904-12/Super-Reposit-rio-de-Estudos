---
description: Atualiza o perfil e o currículo PDF a partir do LinkedIn
---

Atualize o portfólio com dados novos do LinkedIn. Entrada: $ARGUMENTS (texto colado do perfil ou caminho do .zip do export oficial).

1. Se for um .zip, rode `npm run cv:importar -- <zip>` e leia o diff. Se for texto colado, compare com `src/content/data/*.ts` e `src/content/publico.ts`.
2. Mostre ao Senhor o que mudou (itens novos, datas, cargos) e **espere o "ok"**. Não grave nada antes.
3. Aplique nos arquivos de `src/content/` (nunca em `privado.ts`, a menos que o Senhor peça).
4. Rode `npm test` e `npm run cv`; confira o PDF com `pdftoppm -r 60 -png public/curriculo-matheus-lucindo.pdf /tmp/cv` (até 2 páginas).
5. Commit: `feat(dados): atualiza perfil a partir do LinkedIn`.

Regras: nunca incluir telefone, idade, CPF, RG ou endereço no site ou no PDF. Depoimentos de terceiros não são editados.
