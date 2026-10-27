import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Animated, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';

const ConectaScreen = () => {
  const navigation = useNavigation();
  const [fadeIn] = useState(new Animated.Value(0));
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [biometryAvailable, setBiometryAvailable] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const errorMessageRef = useRef(null);

  useEffect(() => {
    checkBiometryAvailability();
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    checkSavedLogin();
  }, []);

  const checkBiometryAvailability = async () => {
    const available = await LocalAuthentication.hasHardwareAsync() && await LocalAuthentication.isEnrolledAsync();
    setBiometryAvailable(available);
  };

  const checkSavedLogin = async () => {
    // Verificar se há um login salvo
    const savedCpf = await AsyncStorage.getItem('cpf');
    if (savedCpf) {
      setCpf(savedCpf);
    }
  };

  const handleBiometryLogin = async () => {
    const result = await LocalAuthentication.authenticateAsync();
    if (result.success) {
      navigation.navigate('Sucesso');
    }
  };

  const handlePress = async () => {
    if (!cpf || !password) {
      setErrorMessage('Todos os campos são obrigatórios!');
      errorMessageRef.current?.fadeInDown(500).then(() => {
        setTimeout(() => {
          errorMessageRef.current?.fadeOutUp(500);
          setErrorMessage('');
        }, 2000);
      });
      return;
    }

    // Simular autenticação
    if (cpf === '000.000.000-00' && password === '123') {
      // Salvar o CPF para login automático na próxima vez
      await AsyncStorage.setItem('cpf', cpf);
      navigation.navigate('Sucesso');
    } else {
      setErrorMessage('Credenciais inválidas. Por favor, tente novamente.');
      errorMessageRef.current?.fadeInDown(500).then(() => {
        setTimeout(() => {
          errorMessageRef.current?.fadeOutUp(500);
          setErrorMessage('');
        }, 2000);
      });
    }
  };

  const handleSignUp = () => {
    navigation.navigate('Cadastro');
  };

  const handleForgotPassword = () => {
    navigation.navigate('RedefinirSenha');
  };

  const formatCPF = (value) => {
    // Remove tudo que não for dígito
    const cpf = value.replace(/\D/g, '');
    
    // Adiciona os pontos e o hífen conforme a máscara do CPF
    if (cpf.length <= 11) {
      return cpf
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }

    return cpf;
  };

  return (
    <LinearGradient
      colors={['#5A1217', '#B91723']}
      style={styles.container}
    >
      <Animatable.View animation="fadeIn" style={[styles.innerContainer, { opacity: fadeIn }]}>
        {errorMessage ? (
          <Animatable.View ref={errorMessageRef} style={styles.errorBox} animation="fadeInDown">
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          </Animatable.View>
        ) : null}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={require('../icons/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Animatable.View animation="fadeIn" style={styles.animationContainer}>
          <LottieView
            source={require('../animation.json')}
            autoPlay
            loop
            style={styles.animation}
          />
          <Image
            source={require('../icons/logo.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </Animatable.View>
        <Text style={styles.title}>Para se conectar, faça login com suas credenciais</Text>
        <Animatable.View animation="fadeIn" style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite: 000.000.000-00"
            type={'cpf'}
            value={cpf}
            onChangeText={ text => setCpf(formatCPF(text)) }
            keyboardType="numeric"
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={14} // Limita o input ao tamanho do CPF formatado
          />
          <TextInput
            style={styles.input}
            placeholder="Digite: 123"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity style={styles.forgotPasswordButton} onPress={handleForgotPassword}>
            <Text style={styles.forgotPasswordButtonText}>Esqueci minha senha</Text>
          </TouchableOpacity>
        </Animatable.View>
        <Animatable.View animation="fadeIn" style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={handlePress}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
          {biometryAvailable && (
            <TouchableOpacity style={styles.biometryButton} onPress={handleBiometryLogin}>
              <Text style={styles.biometryButtonText}>Acessar com Biometria</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.firstAccessText}>Primeiro acesso? Cadastre-se agora!</Text>
          <TouchableOpacity style={[styles.button, styles.signUpButton]} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Cadastre-se</Text>
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
  innerContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
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
  animationContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  animation: {
    width: 200,
    height: 200,
  },
  image: {
    width: 180,
    height: 100,
    marginTop: -50,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    color: '#FFF',
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%',
  },
  input: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  forgotPasswordButton: {
    marginBottom: 10,
  },
  forgotPasswordButtonText: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    borderRadius: 50,
    paddingVertical: 15,
    marginVertical: 10,
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#FF6600',
  },
  signUpButton: {
    backgroundColor: '#5A1217',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  biometryButton: {
    backgroundColor: '#ff6600',
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 90,
    marginVertical: 10,
    alignItems: 'center',
  },
  biometryButtonText: {
    fontSize: 18,
    color: '#fff',
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
    paddingHorizontal: 0, // Reduzindo o padding horizontal
  },
  errorMessage: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  firstAccessText: {
    fontSize: 18,
    color: '#FFF',
    marginTop: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ConectaScreen;
