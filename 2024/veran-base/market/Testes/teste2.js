import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
    const navigation = useNavigation();

    const handlePress = () => {
      navigation.navigate('PersonalDataScreen');
    };

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image
          source={require('./icons/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.containerForm}>
        <Text style={styles.title}>Bem Vindo!</Text>
        <Text style={styles.text}>Conecte-se para começar</Text>
        
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Conectar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  containerLogo: {
    flex: 2,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 180,
    height: 100,
  },
  containerForm: {
    flex: 1,
    backgroundColor: '#3C090D',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginTop: 20,
    marginBottom: 12,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    color: '#a1a1a1',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
    fontSize: 17,
  },
  button: {
    backgroundColor: '#FF6600',
    borderRadius: 50,
    paddingVertical: 15,
    width: '60%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
