import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import { useFocusEffect } from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import CustomDropdown from '../CustomDropdown'; // Certifique-se de ajustar o caminho do arquivo

const ListScreen = ({ navigation }) => {
  const [listName, setListName] = useState('');
  const [location, setLocation] = useState('');
  const [maxValue, setMaxValue] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [showSmile, setShowSmile] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const now = new Date();
    const formattedDateTime = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`;
    setDateTime(formattedDateTime);
  }, []);

  const handleSave = async () => {
    if (!listName || !location || !maxValue || !dateTime || !selectedItem) {
      setMessage('Preencha tudo!');
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    try {
      const newList = {
        listName,
        location,
        maxValue,
        dateTime,
        selectedItem,
        products: [], // Adicione lógica para coletar produtos, se necessário
        totalSpent: 0, // Adicione lógica para calcular o total gasto, se necessário
      };

      const storedLists = await AsyncStorage.getItem('shoppingLists');
      const lists = storedLists ? JSON.parse(storedLists) : [];
      lists.push(newList);
      await AsyncStorage.setItem('shoppingLists', JSON.stringify(lists));

      setMessage('Lista salva com sucesso!');
      setShowSmile(true);
      setTimeout(() => {
        setShowSmile(false);
        setMessage('');
        navigation.navigate('SavedListsScreen');
      }, 2000);
    } catch (error) {
      console.error('Erro ao salvar os dados:', error);
    }
  };

  const handleCancel = () => {
    navigation.navigate('Mercado');
  };

  return (
    <View style={styles.container}>
      {message && (
        <Animatable.View animation="fadeInDown" style={styles.messageContainer}>
          <Text style={styles.messageText}>{message}</Text>
        </Animatable.View>
      )}

      <View style={styles.header}>
        <Text style={styles.title}>Lista de Compras</Text>
      </View>

      <ScrollView contentContainerStyle={styles.form}>
        <Animatable.View animation="bounceIn" delay={300}>
          <TextInput
            style={styles.input}
            placeholder="Nome da Lista"
            placeholderTextColor="#888"
            value={listName}
            onChangeText={setListName}
          />
        </Animatable.View>

        <Animatable.View animation="bounceIn" delay={400}>
          <TextInput
            style={styles.input}
            placeholder="Valor Aproximado"
            placeholderTextColor="#888"
            value={maxValue}
            onChangeText={setMaxValue}
            keyboardType="numeric"
          />
        </Animatable.View>

        <Animatable.View animation="bounceIn" delay={500}>
          <TextInput
            style={styles.input}
            placeholder="Data e horário da compra"
            placeholderTextColor="#888"
            value={dateTime}
            onChangeText={setDateTime}
            editable={false}
          />
        </Animatable.View>

        <Animatable.View animation="bounceIn" delay={600}>
          <CustomDropdown
            label="Localização do mercado:"
            items={[
              { label: 'Selecione aqui', value: '' },
              { label: 'Mogi Das Cruzes', value: 'Mogi Das Cruzes' },
              { label: 'Suzano', value: 'Suzano' },
              { label: 'Itaquera', value: 'Itaquera' },
            ]}
            selectedValue={location}
            onValueChange={setLocation}
          />
        </Animatable.View>

        <Animatable.View animation="bounceIn" delay={700}>
          <CustomDropdown
            label="Tipo de compra:"
            items={[
              { label: 'Selecione aqui', value: '' },
              { label: 'Compra do mês', value: 'Compra do mês' },
              { label: 'Compra da semana', value: 'Compra da semana' },
              { label: 'Final de semana', value: 'Final de semana' },
              { label: 'Fim de ano', value: 'Fim de ano' },
            ]}
            selectedValue={selectedItem}
            onValueChange={setSelectedItem}
          />
        </Animatable.View>

        <Animatable.View animation="bounceIn" delay={800} style={styles.buttonsContainer}>
          <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Começar</Text>
          </TouchableOpacity>
        </Animatable.View>
      </ScrollView>

      {showSmile && (
        <Animatable.View animation="bounceIn" style={styles.smileIcon}>
          <Image source={require('../assets/images/pisca1.gif')} style={styles.smileImage} resizeMode="contain" />
        </Animatable.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#6f0d15',
  },
  messageContainer: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1,
  },
  messageText: {
    backgroundColor: '#FF8517',
    color: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    flex: 1,
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 26,
    paddingTop: 20,
  },
  form: {
    flex: 1,
    paddingTop: 20,
  },
  input: {
    backgroundColor: '#ffffff',
    color: '#000000',
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ffffff',
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#FF8517',
    borderRadius: 50,
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
    borderRadius: 50,
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
  smileImage: {
    width: 160,
    height: 160,
    marginBottom: 80,
  },
});

export default ListScreen;
