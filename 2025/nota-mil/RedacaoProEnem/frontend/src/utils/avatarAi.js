// Gera URL de avatar AI baseado no nome do aluno usando DiceBear
export function getAvatarUrl(nome) {
  const seed = encodeURIComponent(nome.trim().toLowerCase());
  // Usando estilo 'adventurer' do DiceBear
  return `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}`;
}
