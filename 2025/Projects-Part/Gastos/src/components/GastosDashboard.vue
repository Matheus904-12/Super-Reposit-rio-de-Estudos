<template>
  <div class="dashboard-layout" style="display: flex; min-height: 100vh; background: #f6f6fa;">
    <aside class="sidebar">
      <div class="profile">
        <img src="https://www.gravatar.com/avatar?d=mp" alt="Avatar" class="avatar" />
        <div>
          <div class="user-name">{{ googleUser.name || 'Usuário' }}</div>
          <div class="user-email">{{ googleUser.email || 'Conecte ao Google' }}</div>
        </div>
      </div>
      <nav>
          <button @click="showForm = true">+ Nova Conta</button>
          <button @click="loginGoogle" style="width:100%;background:#4285F4;color:#fff;margin-bottom:1rem;">Conectar ao Google</button>
          <button @click="exportarGastos" style="width:100%;background:#6c63ff;color:#fff;margin-bottom:1rem;">Exportar Contas (JSON)</button>
          <button @click="importarGastos" style="width:100%;background:#6c63ff;color:#fff;margin-bottom:1rem;">Importar Contas (JSON)</button>
          <button @click="apagarGastos" style="width:100%;background:#ff4d4f;color:#fff;margin-bottom:1rem;">Apagar Todas as Contas</button>
          <ul>
            <li :class="{active: activeTab === 'overview'}" @click="activeTab = 'overview'">Visão Geral</li>
            <li :class="{active: activeTab === 'paid'}" @click="activeTab = 'paid'">Contas Pagas</li>
            <li :class="{active: activeTab === 'due'}" @click="activeTab = 'due'">Contas a Vencer</li>
            <li :class="{active: activeTab === 'report'}" @click="activeTab = 'report'">Relatório do Mês</li>
          </ul>
      </nav>
    </aside>
  <main class="main-content" style="flex: 1;">
      <header class="main-header">
        <h1>Bem-vindo de volta 👋</h1>
        <input v-model="search" placeholder="Pesquisar conta..." class="search" />
      </header>
      <section v-if="activeTab === 'overview'">
        <div class="cards">
          <div class="card highlight">
            <div class="card-title">Total Devido</div>
            <div class="card-value">R$ {{ totalDevido }}</div>
          </div>
          <div class="card">
            <div class="card-title">Contas para Estabilidade</div>
            <div class="card-value">{{ contasRestantes }}</div>
          </div>
          <div class="card">
            <div class="card-title">Total Pago</div>
            <div class="card-value">R$ {{ totalPago }}</div>
          </div>
          <div class="card">
            <div class="card-title">Contas Próximas do Vencimento</div>
            <div class="card-value">{{ contasVencendo }}</div>
          </div>
        </div>
        <GraficoGastos :gastos="gastos" />
      </section>
      <section v-if="activeTab === 'paid'">
        <h2>Contas Pagas no Mês</h2>
        <ul>
          <li v-for="g in contasPagas" :key="g.id">{{ g.descricao }} - R$ {{ g.valor }} ({{ g.categoria }})</li>
        </ul>
      </section>
      <section v-if="activeTab === 'due'">
        <h2>Contas a Vencer</h2>
        <ul>
          <li v-for="g in contasAVencer" :key="g.id">{{ g.descricao }} - R$ {{ g.valor }} (Vence em {{ g.dataVencimento }})</li>
        </ul>
      </section>
      <section v-if="activeTab === 'report'">
        <ExportarRelatorio :gastos="gastos" />
      </section>
      <section class="calendar-section">
        <GoogleCalendarPanel />
      </section>
      <div v-if="showForm" class="modal">
        <form @submit.prevent="adicionarGasto" class="form-modal">
          <h2>Nova Conta</h2>
          <input v-model="novoGasto.descricao" placeholder="Descrição" required />
          <input v-model.number="novoGasto.valor" type="number" placeholder="Valor" required />
          <input v-model="novoGasto.categoria" placeholder="Categoria" required />
          <input v-model="novoGasto.dataVencimento" type="date" required />
          <button type="submit">Salvar</button>
          <button type="button" @click="showForm = false">Cancelar</button>
        </form>
      </div>
    </main>
  </div>
</template>
<script>

import GraficoGastos from './GraficoGastos.vue';
import ExportarRelatorio from './ExportarRelatorio.vue';
import GoogleCalendarPanel from './GoogleCalendarPanel.vue';
import { gapi } from 'gapi-script';

const CLIENT_ID = 'REMOVIDO_CLIENT_ID.apps.googleusercontent.com';
const API_KEY = 'REMOVIDA_CHAVE_API';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

export default {
  name: 'GastosDashboard',
  components: { GraficoGastos, ExportarRelatorio, GoogleCalendarPanel },
  data() {
    return {
      googleUser: {
        name: '',
        email: '',
        avatar: ''
      },
      activeTab: 'overview',
      showForm: false,
      search: '',
      gastos: JSON.parse(localStorage.getItem('gastos') || '[]'),
      novoGasto: {
        descricao: '',
        valor: 0,
        categoria: '',
        dataVencimento: ''
      },
      eventosGoogle: []
    };
  },
  computed: {
    totalDevido() {
      return this.gastos.filter(g => !g.pago).reduce((acc, g) => acc + g.valor, 0);
    },
    contasRestantes() {
      return this.gastos.filter(g => !g.pago).length;
    },
    totalPago() {
      return this.gastos.filter(g => g.pago).reduce((acc, g) => acc + g.valor, 0);
    },
    contasVencendo() {
      const hoje = new Date();
      return this.gastos.filter(g => !g.pago && new Date(g.dataVencimento) - hoje < 3 * 24 * 60 * 60 * 1000).length;
    },
    contasPagas() {
      return this.gastos.filter(g => g.pago && this.isMesAtual(g.dataVencimento));
    },
    contasAVencer() {
      const hoje = new Date();
      return this.gastos.filter(g => !g.pago && new Date(g.dataVencimento) >= hoje);
    }
  },
  methods: {
      adicionarGasto() {
        this.gastos.push({ ...this.novoGasto, pago: false, id: Date.now() });
        localStorage.setItem('gastos', JSON.stringify(this.gastos));
        this.novoGasto = { descricao: '', valor: 0, categoria: '', dataVencimento: '' };
        this.showForm = false;
      },
      removerGasto(index) {
        this.gastos.splice(index, 1);
        localStorage.setItem('gastos', JSON.stringify(this.gastos));
      },
      marcarComoPago(id) {
        const gasto = this.gastos.find(g => g.id === id);
        if (gasto) gasto.pago = true;
        localStorage.setItem('gastos', JSON.stringify(this.gastos));
      },
      exportarGastos() {
        const blob = new Blob([JSON.stringify(this.gastos, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'gastos.json';
        a.click();
        URL.revokeObjectURL(url);
      },
      importarGastos() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';
        input.onchange = (e) => {
          const file = e.target.files[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = (evt) => {
            try {
              const dados = JSON.parse(evt.target.result);
              if (Array.isArray(dados)) {
                this.gastos = dados;
                localStorage.setItem('gastos', JSON.stringify(this.gastos));
              }
            } catch {}
          };
          reader.readAsText(file);
        };
        input.click();
      },
      apagarGastos() {
        this.gastos = [];
        localStorage.removeItem('gastos');
      },
  mounted() {
    // Atualiza os dados do localStorage ao carregar
    const gastosSalvos = localStorage.getItem('gastos');
    if (gastosSalvos) {
      this.gastos = JSON.parse(gastosSalvos);
    }
  },
    isMesAtual(data) {
      const d = new Date(data);
      const hoje = new Date();
      return d.getMonth() === hoje.getMonth() && d.getFullYear() === hoje.getFullYear();
    },
    loginGoogle() {
      gapi.load('client:auth2', () => {
        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        }).then(() => {
          const GoogleAuth = gapi.auth2.getAuthInstance();
          GoogleAuth.signIn().then(user => {
            const profile = user.getBasicProfile();
            this.googleUser = {
              name: profile.getName(),
              email: profile.getEmail(),
              avatar: profile.getImageUrl()
            };
            this.listarEventos();
          });
        });
      });
    },
    listarEventos() {
      gapi.client.calendar.events.list({
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: 'startTime'
      }).then(response => {
        this.eventosGoogle = response.result.items;
      });
    }
  }
};
</script>
}

<style>
/* Sidebar fixa à esquerda, estilo dashboard moderno */
.sidebar {
  width: 220px;
  background: #fff;
  border-radius: 24px;
  margin: 1rem 0 1rem 1rem;
  padding: 2rem 1rem;
  box-shadow: 0 2px 16px rgba(44,62,80,0.07);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 87vh;
  max-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
}
.profile {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}
.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #eee;
}
.user-name {
  font-weight: bold;
  font-size: 1.1rem;
}
.user-email {
  font-size: 0.9rem;
  color: #888;
}
nav {
  width: 100%;
}
nav button {
  width: 100%;
  background: #6c63ff;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.7rem;
  font-size: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
}
nav ul {
  list-style: none;
  padding: 0;
}
nav li {
  padding: 0.7rem 1rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  cursor: pointer;
  color: #444;
  transition: background 0.2s;
}
nav li.active, nav li:hover {
  background: #f0f0ff;
  color: #6c63ff;
}
.main-content {
  flex: 1;
  padding: 2rem 3rem;
  display: flex;
  flex-direction: column;
  min-width: 0;
  margin-left: 260px;
}
.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}
.main-header h1 {
  font-size: 2rem;
  color: #2c3e50;
}
.search {
  padding: 0.7rem 1.2rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
  width: 260px;
}
.cards {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
}
.card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(44,62,80,0.07);
  padding: 1.5rem 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.card-title {
  font-size: 1rem;
  color: #888;
  margin-bottom: 0.5rem;
}
.card-value {
  font-size: 1.7rem;
  font-weight: bold;
  color: #6c63ff;
}
.card.highlight {
  background: linear-gradient(90deg,#6c63ff 60%,#7f7fff 100%);
  color: #fff;
}
.card.highlight .card-title {
  color: #fff;
}
.card.highlight .card-value {
  color: #fff;
}
.calendar-section {
  margin-top: 2rem;
}
.modal {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
}
.form-modal {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(44,62,80,0.07);
  padding: 2rem;
  min-width: 320px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.form-modal input, .form-modal button {
  padding: 0.7rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
}
.form-modal button {
  background: #6c63ff;
  color: #fff;
  border: none;
  cursor: pointer;
}
</style>
