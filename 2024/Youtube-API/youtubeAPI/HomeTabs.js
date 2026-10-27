import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import YoutubeScreen from './YoutubeScreen';
import VimeoScreen from './VimeoScreen';

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'YouTube') {
            iconName = focused
              ? require('./assets/youtube_filled.png')
              : require('./assets/youtube_outline.png');
          } else if (route.name === 'Vimeo') {
            iconName = focused
              ? require('./assets/vimeo_filled.png')
              : require('./assets/vimeo_outline.png');
          }

          return <Image source={iconName} style={{ width: 25, height: 25, tintColor: color }} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#c4302b',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="YouTube" component={YoutubeScreen} />
      <Tab.Screen name="Vimeo" component={VimeoScreen} />
    </Tab.Navigator>
  );
}
