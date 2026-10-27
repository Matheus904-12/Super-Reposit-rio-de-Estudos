import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen.js';
import ListScreen from './ListScreen.js';
import CartScreen from './CartScreen.js';
import TabBar from './TabBar';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
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
        <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Tab.Screen name="List" component={ListScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Cart" component={CartScreen} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
