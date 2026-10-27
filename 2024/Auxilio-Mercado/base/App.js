import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Biblioteca para gerenciar o armazenamento local
import { Image } from 'react-native'; // Para os ícones
import HomeScreen from './Principal/HomeScreen';
import ListScreen from './Principal/ListScreen';
import CartScreen from './Principal/CartScreen';
import TabBar from './TabBar';
import PersonalDataScreen from './Principal/PersonalDataScreen';
import SavedListsScreen from './Principal/SavedListsScreen';
import LoginScreen from './Entrada/LoginScreen';
import ConectaScreen from './Entrada/ConectaScreen';
import CadastroScreen from './Entrada/CadastroScreen';
import EsqueceuSenhaScreen from './Esqueceu/EsqueceuSenhaScreen';
import VerificarCodigoScreen from './Esqueceu/VerificarCodigoScreen';
import NovaSenhaScreen from './Esqueceu/NovaSenhaScreen';
import SucessoScreen from './Entrada/SucessoScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabs = () => (
  <Tab.Navigator 
    tabBar={props => <TabBar {...props} />}
    screenOptions={{
      tabBarStyle: {
        backgroundColor: '#5A1217',
        borderTopWidth: 0,
        elevation: 0,
      },
    }}
  >
    <Tab.Screen 
      name="Inicio" 
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
      name="Lista" 
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

const App = () => {
  const navigationRef = React.createRef();

  useEffect(() => {
    const checkAuth = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      if (!userToken && navigationRef.current) {
        navigationRef.current.navigate('Login');
      }
    };

    checkAuth();
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName='MainTabs' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Conecta" component={ConectaScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="Mercado" component={HomeScreen} />
        <Stack.Screen name="RedefinirSenha" component={EsqueceuSenhaScreen} />
        <Stack.Screen name="VerificarCodigo" component={VerificarCodigoScreen} />
        <Stack.Screen name="NovaSenha" component={NovaSenhaScreen} />
        <Stack.Screen name="Sucesso" component={SucessoScreen} />
        <Stack.Screen name="Carrinho" component={CartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
