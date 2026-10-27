import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Certifique-se de importar isso
import { View, ActivityIndicator, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from './Principal/HomeScreen';
import ListScreen from './Principal/ListScreen';
import CartScreen from './Principal/CartScreen';
import TabBar from './TabBar';
import LoginScreen from './Entrada/LoginScreen';
import PersonalDataScreen from './Principal/PersonalDataScreen';
import SavedListsScreen from './Principal/SavedListsScreen';
import ConectaScreen from './Entrada/ConectaScreen';
import CadastroScreen from './Entrada/CadastroScreen';
import SucessoScreen from './Entrada/SucessoScreen'; // Certifique-se de importar este também

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => (
  <Tab.Navigator 
    tabBar={props => <TabBar {...props} />}
    screenOptions={{
      tabBarStyle: {
        backgroundColor: '#5A1217', // Cor de fundo desejada
        borderTopWidth: 0, // Remova a borda superior
        elevation: 0, // Remova a sombra no Android
      },
    }}
  >
    <Tab.Screen 
      name="Início" 
      component={PersonalDataScreen} 
      options={{ 
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Image source={require('./icons/home.png')} style={{ tintColor: color, width: size, height: size }} />
        ),
      }} 
    />
    <Tab.Screen 
      name="Mercado" 
      component={HomeScreen} 
      options={{ 
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Image source={require('./icons/store.png')} style={{ tintColor: color, width: size, height: size }} />
        ),
      }} 
    />
    <Tab.Screen 
      name="Nova Lista" 
      component={ListScreen} 
      options={{ 
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Image source={require('./icons/list.png')} style={{ tintColor: color, width: size, height: size }} />
        ),
      }} 
    />
    <Tab.Screen 
      name="Carrinho" 
      component={CartScreen} 
      options={{ 
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Image source={require('./icons/cart.png')} style={{ tintColor: color, width: size, height: size }} />
        ),
      }} 
    />
    <Tab.Screen 
      name="Salvos" 
      component={SavedListsScreen} 
      options={{ 
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Image source={require('./icons/save.png')} style={{ tintColor: color, width: size, height: size }} />
        ),
      }} 
    />
  </Tab.Navigator>
);

const Routes = () => {
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

  // Renderiza a tela de carregamento enquanto verifica a autenticação
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#6F0D15" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {userToken ? (
        <MainTabs />
      ) : (
        <Stack.Navigator initialRouteName="Conecta"> 
          <Stack.Screen 
            name="Conecta" 
            component={ConectaScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Cadastro" 
            component={CadastroScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Sucesso" 
            component={SucessoScreen} 
            options={{ headerShown: false }} 
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Routes;
