// Navegacao.js

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from '../HomeScreen';
import ListScreen from '../ListScreen';
import CartScreen from '../CartScreen';
import TabBar from '../../TabBar';
import LoginScreen from './LoginScreen';
import CadastroScreen from './CadastroScreen';
import BemVindoScreen from './BemVindoScreen';
import SucessoScreen from './SucessoScreen';

const Stack = createStackNavigator();

const Navegacao = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  // Simulação de autenticação ao iniciar o aplicativo
  const authenticateUser = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        setUserToken(token);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Erro ao recuperar token do usuário:', error);
    }
  };

  // Chama a função de autenticação ao montar o componente
  useEffect(() => {
    authenticateUser();
  }, []);

  if (isLoading) {
    return null; // Renderiza um componente de carregamento enquanto verifica a autenticação
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={userToken ? 'Main' : 'BemVindo'} headerMode="none">
        <Stack.Screen name="BemVindo" component={BemVindoScreen} />
        <Stack.Screen name="Main" component={MainTabNavigator} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Sucesso" component={SucessoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navegacao;
