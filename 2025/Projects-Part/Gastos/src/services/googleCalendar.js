// Serviço para integração com Google Calendar
// Este arquivo simula a integração. Para produção, utilize OAuth2 e a API oficial do Google.

export async function criarLembreteGasto(gasto) {
  // Simulação: Em produção, aqui você faria uma chamada à API do Google Calendar
  console.log(`Lembrete criado no Google Calendar para: ${gasto.descricao} - R$${gasto.valor}`);
  return true;
}
