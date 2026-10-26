import React, { useState } from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Fontisto } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import Tela1 from './tela1';
import Tela2 from './tela2';
import Tela3 from './tela3';

const Tab = createBottomTabNavigator();

export default function RotaInterna() {
    const [info1, setInfo1] = useState('');
    const [info2, setInfo2] = useState('');

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveBackgroundColor: "#cd0",
                tabBarStyle: {
                    position: 'absolute',
                    height: 60,
                    bottom: 30,
                    right: 30,
                    left: 30,
                    borderRadius: 5,
                    backgroundColor: "#cfa",
                },
            }}
        >
            <Tab.Screen
                name="tela1"
                options={{
                    tabBarBadge: 1,
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <MaterialIcons name="input" size={24} color="black" />
                    ),
                }}
            >
                {() => <Tela1 textoPronto={setInfo1} textoPronto2={setInfo2} />}
            </Tab.Screen>
            <Tab.Screen
                name="tela2"
                component={Tela2}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <MaterialIcons name="no-encryption-gmailerrorred" size={24} color="black" />
                    ),
                }}
            />
            <Tab.Screen
                name="tela3"
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Fontisto name="preview" size={24} color="black" />                    ),
                }}
            >
                {() => <Tela3 texto={info1} texto2={info2} />}
            </Tab.Screen>
        </Tab.Navigator>
    );
}
