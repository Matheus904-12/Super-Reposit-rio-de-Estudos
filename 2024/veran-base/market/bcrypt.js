import bcrypt from 'bcryptjs';

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error('Erro ao fazer hash da senha:', error);
    return null;
  }
};

// Usando a função para fazer hash da senha antes de salvá-la
const salvarSenha = async (senha) => {
  const hashedPassword = await hashPassword(senha);
  if (hashedPassword) {
    // Salvar hashedPassword no AsyncStorage
  } else {
    // Tratar erro
  }
};

// Verificar a senha ao fazer login
const verificarSenha = async (senha, hashedPassword) => {
  try {
    const match = await bcrypt.compare(senha, hashedPassword);
    return match;
  } catch (error) {
    console.error('Erro ao verificar senha:', error);
    return false;
  }
};

// Exemplo de uso
const senhaDoUsuario = 'senha123';
salvarSenha(senhaDoUsuario);

// Ao fazer login
const senhaDigitada = 'senha123';
const senhaHashSalva = 'hashDaSenhaSalva'; // Recuperado do AsyncStorage
const senhaCorreta = await verificarSenha(senhaDigitada, senhaHashSalva);
if (senhaCorreta) {
  // Senha correta, permitir login
} else {
  // Senha incorreta, tratar erro
}
