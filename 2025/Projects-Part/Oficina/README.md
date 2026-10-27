# Painel de Serviços e Orçamento de Oficina

## Descrição
Sistema para oficinas mecânicas, com cadastro de veículos, diagnóstico de problemas, sugestões de melhorias e escopo de gastos para o cliente.

## Tecnologias
- Java (Spring Boot)
- Thymeleaf (frontend)
- JUnit (testes)

## Funcionalidades
- Cadastro de veículos
- Diagnóstico automático por tipo de veículo
- Sugestão de melhorias
- Escopo de gastos do reparo
- Histórico de serviços
- Testes automatizados

## Instalação
```bash
mvn install
mvn spring-boot:run
```

## Testes
```bash
mvn test
```

## Documentação
O código é totalmente comentado e cada função explicada. Veja os arquivos em `src/`.

---

# Estrutura Inicial
- src/main/java/
- src/main/resources/
- src/test/java/
- pom.xml
- README.md

---

# Como funciona o diagnóstico?
O sistema possui uma base de dados de veículos e problemas comuns, sugerindo soluções e estimando custos automaticamente.

---

# Contato
Dúvidas? Veja os comentários no código ou entre em contato pelo LinkedIn.
