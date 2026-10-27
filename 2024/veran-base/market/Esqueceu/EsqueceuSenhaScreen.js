// EsqueceuSenhaScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

const EsqueceuSenhaScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const enviarCodigoPorEmail = async (email) => {
    // Simulação do envio do código de verificação
    // Substitua esta função por uma implementação real que utilize um serviço de e-mail
    try {
      // Aqui você chamaria a API ou o serviço de e-mail para enviar o código
      console.log(`Código de verificação enviado para ${email}`);
      navigation.navigate('VerificarCodigo', { email });
    } catch (error) {
      console.error('Erro ao enviar o código por e-mail:', error);
      setErrorMessage('Erro ao enviar o código por e-mail. Por favor, tente novamente.');
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
    }
  };

  const handleEnviarCodigo = () => {
    if (!email) {
      setErrorMessage('Por favor, preencha o campo de email!');
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
      return;
    }

    enviarCodigoPorEmail(email);
  };

  return (
    <LinearGradient colors={['#5A1217', '#B91723']} style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require('../icons/back.png')} style={styles.backIcon} />
      </TouchableOpacity>
      {errorMessage ? (
        <Animatable.View animation="fadeInDown" style={styles.errorBox}>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        </Animatable.View>
      ) : null}
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Esqueceu a senha?</Text>
        <Text style={styles.subtitle}>Digite o seu email para receber um código de verificação.</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity style={styles.button} onPress={handleEnviarCodigo}>
          <Text style={styles.buttonText}>Enviar Código</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  innerContainer: {
    width: '80%',
    alignItems: 'center',
    elevation: 5, // Elevação para sombra no Android
  },
  title: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#FFF',
    width: '100%',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF6600',
    width: '100%',
    borderRadius: 50,
    paddingVertical: 15,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorBox: {
    position: 'absolute',
    top: 40,
    left: 50,
    right: 50,
    backgroundColor: '#FF8517',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    zIndex: 1,
    borderRadius: 10,
    padding: 10,
  },
  errorMessage: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default EsqueceuSenhaScreen;
