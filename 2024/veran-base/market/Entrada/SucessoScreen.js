// SuccessScreen.js
import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SuccessScreen = () => {
  const navigation = useNavigation();
  const opacity = new Animated.Value(0);

  useEffect(() => {
    // Animação de fade-in
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Redireciona após 2 segundos
    const timer = setTimeout(() => {
      navigation.navigate('Inicio'); // Redireciona para a tela desejada
    }, 2000);

    // Limpar o temporizador ao desmontar o componente
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ ...styles.imageContainer, opacity }}>
        <Image
          source={require('../assets/images/pisca1.gif')} // substitua pelo caminho da sua imagem
          style={styles.image}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B91723', // ou qualquer cor de fundo desejada
  },
  imageContainer: {
    width: 200,
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default SuccessScreen;
