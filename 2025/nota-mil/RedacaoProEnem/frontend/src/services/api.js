// Serviço para integração com o backend
const API_URL = 'http://localhost:3001';


export async function uploadRedacao(file, nomeAluno = 'Aluno') {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('nomeAluno', nomeAluno);
  const res = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    body: formData,
  });
  return res.json();
}

export async function getRedacoes() {
  const res = await fetch(`${API_URL}/redacoes`);
  return res.json();
}
