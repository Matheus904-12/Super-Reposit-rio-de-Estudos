import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Viagem } from './pages/viagem';
import { Livros } from './pages/livros';
import { Aparelho } from './pages/aparelho';
import { Receita } from './pages/receita';
import { Ionicons } from '@expo/vector-icons/'

const Tab = createBottomTabNavigator();

export function Routes() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Receitas"
                component={Receita}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return (<Ionicons size={25} color={"#000"} name="fast-food" />)
                        }
                        return (<Ionicons size={20} color={"red"} name="fast-food-outline" />)
                    }
                }}
            />
            <Tab.Screen
                name="Viagem"
                component={Viagem}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return (<Ionicons size={25} color={"#000"} name="airplane" />)
                        }
                        return (<Ionicons size={20} color={"red"} name="airplane-outline" />)
                    }
                }}
            />
            <Tab.Screen
                name="Livros"
                component={Livros}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return (<Ionicons size={25} color={"#000"} name="book" />)
                        }
                        return (<Ionicons size={20} color={"red"} name="book-outline" />)
                    }
                }}
            />
            <Tab.Screen
                name="Aparelhos"
                component={Aparelho}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return (<Ionicons size={25} color={"#000"} name="phone-portrait" />)
                        }
                        return (<Ionicons size={20} color={"red"} name="phone-portrait-outline" />)
                    }
                }}
            />
        </Tab.Navigator>
    )
}