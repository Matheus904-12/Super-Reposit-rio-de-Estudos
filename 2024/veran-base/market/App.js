import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Biblioteca para gerenciar o armazenamento local
import HomeScreen from './Principal/HomeScreen.js';
import ListScreen from './Principal/ListScreen.js';
import CartScreen from './Principal/CartScreen.js';
import TabBar from './TabBar';
import PersonalDataScreen from './Principal/PersonalDataScreen.js';
import SavedListsScreen from './Principal/SavedListsScreen.js';
import LoginScreen from './Entrada/LoginScreen.js';
import ConectaScreen from './Entrada/ConectaScreen.js';
import CadastroScreen from './Entrada/CadastroScreen.js';
import EsqueceuSenhaScreen from './Esqueceu/EsqueceuSenhaScreen.js';
import VerificarCodigoScreen from './Esqueceu/VerificarCodigoScreen.js';
import NovaSenhaScreen from './Esqueceu/NovaSenhaScreen.js';
import SucessoScreen from './Entrada/SucessoScreen.js';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabs = () => (
  <Tab.Navigator 
    tabBar={props => <TabBar {...props} />}
    tabBarOptions={{
      style: {
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
        tabBarIcon: require('./icons/home.png'),
      }} 
    />
    <Tab.Screen 
      name="Mercado" 
      component={HomeScreen} 
      options={{ 
        headerShown: false,
        tabBarIcon: require('./icons/store.png'),
      }} 
    />
    <Tab.Screen 
      name="Lista" 
      component={ListScreen} 
      options={{ 
        headerShown: false,
        tabBarIcon: require('./icons/list.png'),
      }} 
    />
    <Tab.Screen 
      name="Carrinho" 
      component={CartScreen} 
      options={{ 
        headerShown: false,
        tabBarIcon: require('./icons/cart.png'),
      }} 
    />
    <Tab.Screen 
      name="Salvos" 
      component={SavedListsScreen} 
      options={{ 
        headerShown: false,
        tabBarIcon: require('./icons/save.png'),
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
        {/* <Stack.Screen name="Inicio" component={PersonalDataScreen} /> */}
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