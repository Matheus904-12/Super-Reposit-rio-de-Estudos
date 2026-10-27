import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Picker } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import { Feather } from '@expo/vector-icons'; // Importe Feather

const ListScreen = ({ navigation }) => {
  const [location, setLocation] = useState('');
  const [maxValue, setMaxValue] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [showSmile, setShowSmile] = useState(false);

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem('location', location);
      await AsyncStorage.setItem('maxValue', maxValue);
      await AsyncStorage.setItem('dateTime', dateTime);
      await AsyncStorage.setItem('selectedItem', selectedItem);

      setShowSmile(true);
      setTimeout(() => {
        setShowSmile(false);
        navigation.navigate('Home');
      }, 2000);
    } catch (error) {
      console.error('Erro ao salvar os dados:', error);
    }
  };

  const handleCancel = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Feather name="arrow-left" size={24} color="#FF9739" />
        </TouchableOpacity>
        <Text style={styles.title}>Lista de Compras</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Localização do mercado"
          value={location}
          onChangeText={setLocation}
        />
        <TextInput
          style={styles.input}
          placeholder="Valor máximo"
          value={maxValue}
          onChangeText={setMaxValue}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Data e horário da compra"
          value={dateTime}
          onChangeText={setDateTime}
          keyboardType="numeric"
        />
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownLabel}>Tipo de compra:</Text>
          <Picker
            selectedValue={selectedItem}
            onValueChange={(itemValue) => setSelectedItem(itemValue)}
            style={styles.dropdown}
          >
            <Picker.Item label="Selecione aqui" />
            <Picker.Item label="Compra do mês" value="compra do mês" />
            <Picker.Item label="Compra da semana" value="compra da semana" />
            <Picker.Item label="Final de semana" value="final de semana" />
            <Picker.Item label="Fim de ano" value="fim de ano" />
          </Picker>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Começar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {showSmile && (
        <View style={styles.smileIcon}>
          <LottieView
            source={require('./smile-animation.json')}
            autoPlay
            loop={false}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#6F0D15',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    paddingHorizontal: 10,
  },
  title: {
    flex: 1,
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center', // Centraliza o texto
    paddingTop: 10,
  },
  form: {
    flex: 1,
    paddingTop: 20,
  },
  input: {
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 15,
  },
  dropdownContainer: {
    marginBottom: 15,
  },
  dropdownLabel: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dropdown: {
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    marginBottom: 15,
    padding: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#FF8517',
    borderRadius: 7,
    paddingVertical: 15,
    alignItems: 'center',
    width: '48%',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#CCCCCC',
    borderRadius: 7,
    paddingVertical: 15,
    alignItems: 'center',
    width: '48%',
  },
  cancelButtonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  smileIcon: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
});

export default ListScreen;
