# 🚨 Problema: InfinityFree + TiDB Cloud

## ⚠️ Situação Atual

O **InfinityFree** (hospedagem gratuita) **bloqueia conexões de saída (outbound)** para bancos de dados externos como TiDB Cloud. Isso causa o erro:

```
SQLSTATE[HY000] [2002] Connection refused
```

---

## 🔍 Por Que Isso Acontece?

1. **InfinityFree limita conexões externas**
   - Apenas permite conexões para serviços específicos (não inclui TiDB)
   - Porta 4000 (TiDB) está bloqueada
   - Conexões MySQL externas são restritas

2. **Política de segurança**
   - Hospedagens gratuitas limitam recursos
   - Evitam abuso de conexões externas
   - Priorizam bancos locais (no mesmo servidor)

---

## ✅ Soluções Possíveis

### Solução 1: Usar Banco MySQL Local do InfinityFree (RECOMENDADO)

**Vantagens:**
- ✅ Funciona imediatamente
- ✅ Mais rápido (sem latência de rede)
- ✅ Sem custos adicionais
- ✅ Suportado oficialmente

**Como configurar:**

1. Acesse o painel do InfinityFree
2. Vá em **MySQL Databases**
3. Crie um banco de dados (ex: `epiz_12345678_positivesense`)
4. Anote as credenciais:
   - Host: `sql123.infinityfreeapp.com` (varia)
   - Database: `epiz_12345678_positivesense`
   - User: `epiz_12345678`
   - Password: (sua senha)

5. Atualize `config/database.php`:

```php
<?php
// Configurações InfinityFree
define('DB_HOST', 'sql123.infinityfreeapp.com'); // Veja no painel
define('DB_NAME', 'epiz_12345678_positivesense');
define('DB_USER', 'epiz_12345678');
define('DB_PASS', 'sua_senha_aqui');
define('DB_CHARSET', 'utf8mb4');

// Remover DB_PORT (usar porta padrão 3306)
```

6. Importe `database/positivesense.sql` via phpMyAdmin do InfinityFree

---

### Solução 2: Migrar para Hospedagem Paga

**Hospedagens que permitem MySQL externo:**

| Hospedagem | Preço/mês | Conexões Externas |
|------------|-----------|-------------------|
| Hostinger  | R$ 9,90   | ✅ Permitido      |
| HostGator  | R$ 14,90  | ✅ Permitido      |
| Heroku     | Grátis*   | ✅ Permitido      |
| Railway    | $5 USD    | ✅ Permitido      |

*Heroku mudou política, não é mais totalmente gratuito.

---

### Solução 3: Usar Proxy/Túnel (NÃO RECOMENDADO)

Criar um proxy intermediário que encaminhe conexões. **Não recomendado porque:**
- ❌ Complexo de configurar
- ❌ Lento (dupla latência)
- ❌ Viola termos de serviço do InfinityFree
- ❌ Pode ser bloqueado

---

### Solução 4: Configuração Dual (Local + Cloud)

Detectar automaticamente o ambiente e usar o banco adequado:

```php
<?php
// Detectar ambiente
$isLocal = (isset($_SERVER['SERVER_NAME']) && $_SERVER['SERVER_NAME'] === 'localhost');

if ($isLocal) {
    // XAMPP local
    define('DB_HOST', 'localhost');
    define('DB_NAME', 'positivesense');
    define('DB_USER', 'root');
    define('DB_PASS', '');
} else {
    // InfinityFree production
    define('DB_HOST', 'sql123.infinityfreeapp.com');
    define('DB_NAME', 'epiz_12345678_positivesense');
    define('DB_USER', 'epiz_12345678');
    define('DB_PASS', 'senha_production');
}

define('DB_CHARSET', 'utf8mb4');
```

---

## 🧪 Como Testar Localmente

1. **No XAMPP, simule TiDB (opcional):**

```php
// Tente conectar ao TiDB localmente
$dsn = "mysql:host=gateway01.us-east-1.prod.aws.tidbcloud.com;port=4000;dbname=positivesense";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::MYSQL_ATTR_SSL_CA => true,
    PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT => false
];

try {
    $conn = new PDO($dsn, '3AnH5bpZdtfsv1T.root', 'ySafo64LG6mrQTrf', $options);
    echo "✅ Conexão TiDB OK no ambiente local!";
} catch (PDOException $e) {
    echo "❌ Erro: " . $e->getMessage();
}
```

2. **Se funcionar localmente mas não no InfinityFree:**
   - É confirmado que o InfinityFree bloqueia
   - Use a **Solução 1** (MySQL local do InfinityFree)

---

## 🔧 Checklist de Verificação

- [ ] Verificou se o InfinityFree permite conexões externas? (Resposta: **NÃO**)
- [ ] Tentou usar banco local do InfinityFree?
- [ ] Importou o SQL no phpMyAdmin do InfinityFree?
- [ ] Atualizou as credenciais em `config/database.php`?
- [ ] Testou a conexão localmente primeiro?
- [ ] Verificou os logs de erro do PHP?

---

## 📞 Recursos Úteis

- [InfinityFree - MySQL Databases](https://forum.infinityfree.com/docs?topic=49)
- [TiDB Cloud - Connection Strings](https://docs.pingcap.com/tidbcloud/connect-to-tidb-cluster)
- [InfinityFree - Free Hosting Limitations](https://forum.infinityfree.com/docs?topic=21)

---

## 💡 Recomendação Final

**Use o MySQL local do InfinityFree** para hospedagem gratuita. Se precisar de TiDB Cloud para produção, migre para uma hospedagem paga que permita conexões externas (Hostinger, HostGator, Railway, etc.).

**Configuração ideal:**
- **Desenvolvimento local:** XAMPP + MySQL local
- **Produção gratuita:** InfinityFree + MySQL local
- **Produção paga:** Hostinger/Railway + TiDB Cloud

---

**Data:** Dezembro 2025
**Status:** InfinityFree não suporta TiDB Cloud
