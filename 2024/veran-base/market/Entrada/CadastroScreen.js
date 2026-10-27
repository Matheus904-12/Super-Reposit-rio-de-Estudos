import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

const CadastroScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCPF] = useState('');
  const [endereco, setEndereco] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = () => {
    if (!email || !telefone || !cpf || !endereco || !password || !confirmPassword) {
      setErrorMessage('Todos os campos são obrigatórios!');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('As senhas não coincidem!');
      return;
    }

    // Lógica para realizar o cadastro
    // Após o cadastro, você pode navegar para outra tela
    navigation.navigate('Sucesso');
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <LinearGradient
      colors={['#5A1217', '#B91723']}
      style={styles.container}
    >
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require('../icons/back.png')} style={styles.backIcon} />
      </TouchableOpacity>
      {errorMessage ? (
        <Animatable.View animation="fadeInDown" style={styles.errorBox}>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        </Animatable.View>
      ) : null}
      <Animatable.View animation="fadeIn" style={styles.content}>
        <Text style={styles.title}>Cadastre-se</Text>
        <Animatable.View animation="fadeIn" style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </Animatable.View>
        <Animatable.View animation="fadeIn" style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Telefone"
            value={telefone}
            onChangeText={setTelefone}
            keyboardType="phone-pad"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </Animatable.View>
        <Animatable.View animation="fadeIn" style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="CPF"
            value={cpf}
            onChangeText={setCPF}
            keyboardType="numeric"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </Animatable.View>
        <Animatable.View animation="fadeIn" style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Endereço"
            value={endereco}
            onChangeText={setEndereco}
            autoCapitalize="words"
            autoCorrect={false}
          />
        </Animatable.View>
        <Animatable.View animation="fadeIn" style={[styles.inputContainer, styles.passwordContainer]}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity onPress={toggleShowPassword} style={styles.passwordToggle}>
            <Image
              source={showPassword ? require('../icons/eye-off.png') : require('../icons/eye.png')}
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </Animatable.View>
        <Animatable.View animation="fadeIn" style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirmar Senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
        </Animatable.View>
        <Animatable.View animation="fadeIn" style={styles.inputContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </Animatable.View>
      </Animatable.View>
    </LinearGradient>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  backIcon: {
    width: 30,
    height: 30,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60, // Adicionado para mover os elementos para cima
  },
  title: {
    fontSize: 26,
    marginBottom: 50,
    textAlign: 'center',
    color: '#FFF',
    fontWeight: 'bold',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 15,
    width: '100%',
    color: '#000',
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 50,
  },
  passwordToggle: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  eyeIcon: {
    width: 24,
    height: 24,
  },
  button: {
    backgroundColor: '#FF6600',
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 90,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  errorMessage: {
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  errorBox: {
    position: 'absolute',
    top: 35,
    left: 60,
    right: 60,
    backgroundColor: '#FF8517',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    zIndex: 1,
    paddingVertical: 10, // Reduzindo o padding vertical
    paddingHorizontal: 20, // Reduzindo o padding horizontal
  },
});

export default CadastroScreen;

