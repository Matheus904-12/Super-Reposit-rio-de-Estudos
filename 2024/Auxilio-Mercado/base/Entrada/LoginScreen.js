import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [fadeIn] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePress = () => {
    navigation.navigate('Sucesso');
  };

  const goToLogin = () => {
    navigation.navigate('Conecta'); // Troque 'OutraTela' pelo nome da tela que você deseja ir
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeIn }]}>
      <LinearGradient
        colors={['#B91723', '#5A1217']}
        style={styles.gradient}
      >
        <View style={styles.logoContainer}>
          <Image
            source={require('../icons/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Bem-Vindo!</Text>
          <Text style={styles.subtitle}>Conecte-se para começar</Text>
          
          <TouchableOpacity style={styles.button} onPress={goToLogin}>
            <Text style={styles.buttonText}>Conectar</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 180,
    height: 100,
  },
  formContainer: {
    flex: 1,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFF',
  },
  subtitle: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 30,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#FF6600',
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
