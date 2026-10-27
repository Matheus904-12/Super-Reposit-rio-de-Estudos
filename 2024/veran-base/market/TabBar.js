import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';

const TabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const icon = options.tabBarIcon; // Adicionando a opção de ícone na tab bar
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={styles.tabButton}
            >
              {icon && <Image source={icon} style={[styles.icon, { tintColor: isFocused ? '#FF8517' : '#FFFFFF' }]} />} {/* Renderização do ícone */}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 20, // Ajustando a posição vertical da TabBar
    left: 20, // Ajustando a posição horizontal da TabBar
    right: 20, // Ajustando a posição horizontal da TabBar
    zIndex: 1, // Para garantir que a TabBar fique sobreposta ao conteúdo
  },
  tabBar: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderRadius: 25, // Adicionando border-radius em todos os lados
    backgroundColor: '#3C090D', // Cor vinho
    shadowColor: '#000', // Cor da sombra
    shadowOffset: { width: 0, height: 2 }, // Deslocamento da sombra
    shadowOpacity: 0.3, // Opacidade da sombra
    shadowRadius: 10, // Raio da sombra
    elevation: 5, // Sombra para Android
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 35,
    height: 35,
    marginBottom: 5,
  },
});

export default TabBar;
