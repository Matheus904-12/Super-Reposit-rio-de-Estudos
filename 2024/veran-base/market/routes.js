import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from './Principal/HomeScreen';
import ListScreen from './Principal/ListScreen';
import CartScreen from './Principal/CartScreen';
import TabBar from './TabBar';
import LoginScreen from './Entrada/LoginScreen';
import PersonalDataScreen from './Principal/PersonalDataScreen';
import SavedListsScreen from './Principal/SavedListsScreen';
import ConectaScreen from './Entrada/ConectaScreen';

const Stack = createStackNavigator();

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
        <Tab.Navigator 
          tabBar={props => <TabBar {...props} />}
          tabBarOptions={{
            style: {
              backgroundColor: '#5A1217', // Cor de fundo desejada
              borderTopWidth: 0, // Remova a borda superior
              elevation: 0, // Remova a sombra no Android
            },
          }}
        >
          {/* Mantenha seus Tab.Screen aqui */}
          <Tab.Screen 
            name="Início" 
            component={PersonalDataScreen} 
            options={{ 
              headerShown: false,
              tabBarIcon: require('./icons/home.png'), // Ícone para a tela Perfil
            }}
          />
          <Tab.Screen 
            name="Mercado" 
            component={HomeScreen} 
            options={{ 
              headerShown: false,
              tabBarIcon: require('./icons/store.png'), // Ícone para a tela Home
            }} 
          />
          <Tab.Screen 
            name="Nova Lista" 
            component={ListScreen} 
            options={{ 
              headerShown: false,
              tabBarIcon: require('./icons/list.png'), // Ícone para a tela List
            }} 
          />
          <Tab.Screen 
            name="Carrinho" 
            component={CartScreen} 
            options={{ 
              headerShown: false,
              tabBarIcon: require('./icons/cart.png'), // Ícone para a tela Cart
            }} 
            />
            <Tab.Screen 
            name="Salvos" 
            component={SavedListsScreen} 
            options={{ 
              headerShown: false,
              tabBarIcon: require('./icons/save.png'), // Ícone para a tela Cart
            }} 
            />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="BemVindo"> 
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
