import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CustomDropdown = ({ label, items, selectedValue, onValueChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [heightAnim] = useState(new Animated.Value(0));

  const toggleDropdown = () => {
    if (isOpen) {
      Animated.timing(heightAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setIsOpen(false));
    } else {
      setIsOpen(true);
      Animated.timing(heightAnim, {
        toValue: items.length * 40,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.dropdownHeader} onPress={toggleDropdown}>
        <Text style={styles.selectedValue}>
          {selectedValue ? selectedValue : 'Selecione aqui'}
        </Text>
        <Icon name={isOpen ? 'chevron-up' : 'chevron-down'} size={20} color="white" />
      </TouchableOpacity>
      {isOpen && (
        <Animated.View style={[styles.dropdownContent, { height: heightAnim }]}>
          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.dropdownItem}
              onPress={() => {
                onValueChange(item.value);
                toggleDropdown();
              }}
            >
              <Text style={styles.dropdownItemText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dropdownHeader: {
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#444444',
  },
  selectedValue: {
    color: '#000',
    fontSize: 16,
  },
  dropdownContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#444444',
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dropdownItemText: {
    color: '#000',
    fontSize: 16,
  },
});

export default CustomDropdown;
