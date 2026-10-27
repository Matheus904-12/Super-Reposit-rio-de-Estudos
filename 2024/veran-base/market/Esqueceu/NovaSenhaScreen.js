// NovaSenhaScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';

const NovaSenhaScreen = ({ navigation, route }) => {
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSalvarSenha = async () => {
    if (!novaSenha || !confirmarSenha) {
      setErrorMessage('Por favor, preencha todos os campos!');
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setErrorMessage('As senhas não coincidem!');
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
      return;
    }

    // Salvar a nova senha no AsyncStorage
    try {
      await AsyncStorage.setItem(route.params.email, novaSenha);
      navigation.navigate('Conecta');
    } catch (error) {
      console.error('Erro ao salvar a nova senha:', error);
    }
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
      <Animatable.View animation="fadeIn" style={styles.innerContainer}>
        <Text style={styles.title}>Nova Senha</Text>
        <Animatable.View animation="fadeIn" style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nova Senha"
            value={novaSenha}
            onChangeText={setNovaSenha}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmar Senha"
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity style={styles.button} onPress={handleSalvarSenha}>
            <Text style={styles.buttonText}>Salvar Senha</Text>
          </TouchableOpacity>
        </Animatable.View>
      </Animatable.View>
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
  inputContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF6600',
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
    left: 60,
    right: 60,
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

export default NovaSenhaScreen;
