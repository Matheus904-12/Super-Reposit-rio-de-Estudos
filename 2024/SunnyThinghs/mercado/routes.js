import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { Transition } from 'react-transition-group';

import HomeScreen from './HomeScreen.js';
import ListScreen from './ListScreen.js';
import CartScreen from './CartScreen.js';
import TabBar from './TabBar';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="List" component={ListScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Cart" component={CartScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const Routes = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={props => <TabBar {...props} />}>
        <Tab.Screen name="Home">
          {() => (
            <Transition in={true} timeout={1500}>
              {state => (
                <div style={{
                  ...defaultStyle,
                  ...transitionStyles[state]
                }}>
                  <MyStack />
                </div>
              )}
            </Transition>
          )}
        </Tab.Screen>
        <Tab.Screen name="List">
          {() => (
            <Transition in={true} timeout={1500}>
              {state => (
                <div style={{
                  ...defaultStyle,
                  ...transitionStyles[state]
                }}>
                  <MyStack />
                </div>
              )}
            </Transition>
          )}
        </Tab.Screen>
        <Tab.Screen name="Cart">
          {() => (
            <Transition in={true} timeout={1500}>
              {state => (
                <div style={{
                  ...defaultStyle,
                  ...transitionStyles[state]
                }}>
                  <MyStack />
                </div>
              )}
            </Transition>
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const defaultStyle = {
  transition: `opacity 1.5s ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
};

export default Routes;
