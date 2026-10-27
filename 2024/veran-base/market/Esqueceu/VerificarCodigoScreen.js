// VerificarCodigoScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

const VerificarCodigoScreen = ({ navigation, route }) => {
  const [codigo, setCodigo] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleVerificarCodigo = () => {
    if (!codigo) {
      setErrorMessage('Por favor, preencha o campo de código!');
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
      return;
    }

    // Aqui você verificaria se o código inserido é válido
    // e depois navegar para a tela NovaSenhaScreen
    navigation.navigate('NovaSenha', { email: route.params.email });
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
        <Text style={styles.title}>Verificar Código</Text>
        <Text style={styles.subtitle}>
          Insira o código de verificação enviado para{' '}
          <Text style={styles.email}>{route.params.email}</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Código"
          value={codigo}
          onChangeText={setCodigo}
          keyboardType="numeric"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity style={styles.button} onPress={handleVerificarCodigo}>
          <Text style={styles.buttonText}>Verificar Código</Text>
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
  email: {
    fontWeight: 'bold',
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

export default VerificarCodigoScreen;
