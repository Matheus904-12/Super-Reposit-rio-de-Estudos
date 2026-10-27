import { createFluidNavigator } from 'react-navigation-fluid-transitions';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './HomeScreen';
import ListScreen from './ListScreen';
import CartScreen from './CartScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="List" component={ListScreen} />
    <Tab.Screen name="Cart" component={CartScreen} />
  </Tab.Navigator>
);

export default createFluidNavigator({
  TabNavigator,
});
