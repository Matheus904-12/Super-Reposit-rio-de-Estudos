import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text } from 'react-native'; // Importe o componente Text

const TabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const icon = options.tabBarIcon;
          const label = options.tabBarLabel || route.name; // Adicione uma label para a tab bar
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
              {/* Renderize a label dentro de um componente Text */}
              <Text style={{ color: isFocused ? '#FF8517' : '#FFFFFF' }}>{label}</Text>
              {/* Renderize o ícone */}
              {icon && <Image source={icon} style={[styles.icon, { tintColor: isFocused ? '#FF8517' : '#FFFFFF' }]} />}
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
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: '#3C090D',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row', // Adicione flexDirection 'row' para alinhar o ícone e o texto horizontalmente
  },
  icon: {
    width: 35,
    height: 35,
    marginBottom: 5,
    marginLeft: 5, // Adicione marginLeft para separar o ícone do texto
  },
});

export default TabBar;
