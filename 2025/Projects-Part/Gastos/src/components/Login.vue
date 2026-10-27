<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input v-model="usuario" placeholder="Usuário" required />
      <input v-model="senha" type="password" placeholder="Senha" required />
      <button type="submit">Entrar</button>
    </form>
    <p v-if="erro" class="erro">Usuário ou senha inválidos!</p>
  </div>
</template>

<script>
import { autenticar } from '../services/auth';

export default {
  name: 'Login',
  data() {
    return {
      usuario: '',
      senha: '',
      erro: false
    };
  },
  methods: {
    login() {
      if (autenticar(this.usuario, this.senha)) {
        this.$emit('autenticado');
      } else {
        this.erro = true;
      }
    }
  }
};
</script>

<style scoped>
.login {
  max-width: 300px;
  margin: 2rem auto;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
input, button {
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}
button {
  background: #2c3e50;
  color: #fff;
  border: none;
  cursor: pointer;
}
.erro {
  color: #e74c3c;
}
</style>
