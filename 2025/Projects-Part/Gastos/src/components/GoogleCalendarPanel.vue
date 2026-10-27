<template>
  <div class="calendar-panel">
    <button @click="loginGoogle">Conectar com Google Calendar</button>
    <div v-if="calendarUrl">
      <iframe :src="calendarUrl" width="100%" height="600" style="border:0;"></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoogleCalendarPanel',
  data() {
    return {
      calendarUrl: ''
    };
  },
  methods: {
    loginGoogle() {
      // Substitua pelo seu calendarId do Google
      const calendarId = 'primary';
      // Exemplo de URL pública do Google Calendar (para visualização mensal)
      this.calendarUrl = `https://calendar.google.com/calendar/embed?src=${calendarId}&ctz=America/Sao_Paulo`;
      // Para integração OAuth2 real, utilize a API do Google
    }
  }
};
</script>

<style scoped>
.calendar-panel {
  margin-top: 2rem;
  text-align: center;
}
button {
  background: #4285f4;
  color: #fff;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1rem;
}
iframe {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
</style>
