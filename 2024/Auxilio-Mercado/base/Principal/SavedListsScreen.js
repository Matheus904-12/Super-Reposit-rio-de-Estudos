import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, TextInput, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const SavedListsScreen = ({ navigation }) => {
  const [lists, setLists] = useState([]);
  const [filteredLists, setFilteredLists] = useState([]);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const [editedList, setEditedList] = useState({});
  const [filter, setFilter] = useState('all');
  const [isProductsModalVisible, setIsProductsModalVisible] = useState(false);

  const filterTranslateY = useSharedValue(-50);
  const listsTranslateY = useSharedValue(50);
  const bounceInValue = useSharedValue(0);
  const modalOpacity = useSharedValue(0);
  const modalScale = useSharedValue(0);

  useEffect(() => {
    fetchLists();
  }, []);

  useEffect(() => {
    filterLists();
  }, [lists, filter]);

  useEffect(() => {
    filterTranslateY.value = withTiming(0, {
      duration: 500,
      easing: Easing.out(Easing.exp),
    });
    listsTranslateY.value = withTiming(0, {
      duration: 500,
      easing: Easing.out(Easing.exp),
    });

    bounceInValue.value = withTiming(1, {
      duration: 1000,
      easing: Easing.bounce,
    });
  }, []);

  const fetchLists = async () => {
    try {
      const storedLists = await AsyncStorage.getItem('shoppingLists');
      const parsedLists = storedLists ? JSON.parse(storedLists) : [];
      setLists(parsedLists);
      setFilteredLists(parsedLists);
    } catch (error) {
      console.error('Error fetching lists:', error);
    }
  };

  const filterLists = () => {
    let filtered = lists;
    if (filter === 'maxItems') {
      filtered = lists.filter((item) => item.products.length > 5);
    } else if (filter === 'recent') {
      filtered = lists.slice().sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
    } else if (filter === 'expensive') {
      filtered = lists.slice().sort((a, b) => b.maxValue - a.maxValue);
    } else if (filter === 'cheap') {
      filtered = lists.slice().sort((a, b) => a.maxValue - b.maxValue);
    }
    setFilteredLists(filtered);
  };

  const handleDeletePress = (list) => {
    setSelectedList(list);
    setIsDeleteModalVisible(true);
    openModal();
  };

  const handleDeleteList = async () => {
    try {
      const updatedLists = lists.filter((item) => item !== selectedList);
      setLists(updatedLists);
      await AsyncStorage.setItem('shoppingLists', JSON.stringify(updatedLists));
      setFilteredLists(updatedLists);
    } catch (error) {
      console.error('Error deleting list:', error);
    } finally {
      setIsDeleteModalVisible(false);
      setSelectedList(null);
      closeModal();
    }
  };

  const handleDeleteAll = async () => {
    try {
      setLists([]);
      await AsyncStorage.removeItem('shoppingLists');
      setFilteredLists([]);
    } catch (error) {
      console.error('Error clearing all lists:', error);
    } finally {
      setIsDeleteModalVisible(false);
      closeModal();
    }
  };

  const handleEditPress = (list) => {
    setSelectedList(list);
    setEditedList(list);
    setIsEditModalVisible(true);
  };

  const saveEditedList = async () => {
    try {
      const updatedLists = lists.map((item) => (item === selectedList ? editedList : item));
      setLists(updatedLists);
      await AsyncStorage.setItem('shoppingLists', JSON.stringify(updatedLists));
      setFilteredLists(updatedLists);
    } catch (error) {
      console.error('Error saving edited list:', error);
    } finally {
      setIsEditModalVisible(false);
      setSelectedList(null);
      setEditedList({});
    }
  };

  const renderList = ({ item }) => (
    <Animated.View style={[styles.listItem, animatedBounceInStyle]}>
      <TouchableOpacity onPress={() => handleListSelect(item)}>
        <Text style={styles.listItemText}>Localização: {item.location}</Text>
        <Text style={styles.listItemText}>Valor Aproximado: {item.maxValue}</Text>
        <Text style={styles.listItemText}>Data e Horário: {item.dateTime}</Text>
        <Text style={styles.listItemText}>Tipo: {item.selectedItem}</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        
        <TouchableOpacity onPress={() => handleDeletePress(item)}>
          <Image source={require('../icons/trash.png')} style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  const handleListSelect = (list) => {
    setSelectedList(list);
    setIsProductsModalVisible(true);
  };

  const animatedFilterStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: filterTranslateY.value }],
  }));

  const animatedListsStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: listsTranslateY.value }],
  }));

  const animatedBounceInStyle = useAnimatedStyle(() => ({
    transform: [{ scale: bounceInValue.value }],
  }));

  const animatedModalStyle = useAnimatedStyle(() => ({
    opacity: modalOpacity.value,
    transform: [{ scale: modalScale.value }],
  }));

  const openModal = () => {
    modalOpacity.value = withTiming(1, { duration: 300 });
    modalScale.value = withTiming(1, { duration: 300, easing: Easing.out(Easing.exp) });
  };

  const closeModal = () => {
    modalOpacity.value = withTiming(0, { duration: 300 });
    modalScale.value = withTiming(0, { duration: 300, easing: Easing.out(Easing.exp) });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Listas Salvas</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => { handleDeleteAll(true); openModal(); }}>
            <Image source={require('../icons/delete.png')} style={styles.headerIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={fetchLists}>
            <Image source={require('../icons/refresh.png')} style={styles.headerIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <Animated.View style={[styles.filterContainer, animatedFilterStyle]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={styles.filterButton} onPress={() => setFilter('all')}>
            <Text style={styles.filterButtonText}>Todas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton} onPress={() => setFilter('maxItems')}>
            <Text style={styles.filterButtonText}>Mais Recheadas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton} onPress={() => setFilter('recent')}>
            <Text style={styles.filterButtonText}>Mais Recentes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton} onPress={() => setFilter('expensive')}>
            <Text style={styles.filterButtonText}>Mais Caras</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton} onPress={() => setFilter('cheap')}>
            <Text style={styles.filterButtonText}>Mais Baratas</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>
      <Animated.View style={[{ flex: 1 }, animatedListsStyle]}>
        <FlatList
          data={filteredLists}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderList}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      </Animated.View>
      <Modal
        transparent={true}
        visible={isDeleteModalVisible}
        onRequestClose={() => { setIsDeleteModalVisible(false); closeModal(); }}
      >
        <View style={styles.modalContainer}>
          <Animated.View style={[styles.modalView, animatedModalStyle]}>
            <Text style={styles.modalTitle}>Confirmação</Text>
            <Text>Você deseja limpar todas as listas salvas?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => { setIsDeleteModalVisible(false); closeModal(); }} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDeleteAll} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Limpar Tudo</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        visible={isEditModalVisible}
        onRequestClose={() => { setIsEditModalVisible(false); closeModal(); }}
      >
        <View style={styles.modalContainer}>
          <Animated.View style={[styles.modalView, animatedModalStyle]}>
            <Text style={styles.modalTitle}>Editar Lista</Text>
            <TextInput
              placeholder="Valor Aproximado"
              value={editedList.maxValue}
              onChangeText={(text) => setEditedList({ ...editedList, maxValue: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Data e Horário"
              value={editedList.dateTime}
              onChangeText={(text) => setEditedList({ ...editedList, dateTime: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Localização"
              value={editedList.location}
              onChangeText={(text) => setEditedList({ ...editedList, location: text })}
              style={styles.input}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => { setIsEditModalVisible(false); closeModal(); }} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={saveEditedList} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        visible={isProductsModalVisible}
        onRequestClose={() => setIsProductsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Produtos da Lista</Text>
            <ScrollView style={styles.productListContainer}>
              {selectedList && selectedList.products.map((product, index) => (
                <View key={index} style={styles.productItem}>
                  <Text style={styles.productText}>Nome: {product.name}</Text>
                  <Text style={styles.productText}>Quantidade: {product.quantity}</Text>
                  <Text style={styles.productText}>Preço: R$ {product.price.toFixed(2)}</Text>
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={() => setIsProductsModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        visible={isDeleteModalVisible}
        onRequestClose={() => { setIsDeleteModalVisible(false); closeModal(); }}
      >
        <View style={styles.modalContainer}>
          <Animated.View style={[styles.modalView, animatedModalStyle]}>
            <Text style={styles.modalTitle}>Confirmação</Text>
            <Text>Você deseja deletar esta lista?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => { setIsDeleteModalVisible(false); closeModal(); }} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDeleteList} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Deletar</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#6f0d15',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    paddingTop: 20,
  },
  headerIcons: {
    flexDirection: 'row',
    paddingTop: 20,
  },
  headerIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
    marginHorizontal: 10,
    paddingTop: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    height: 40,
  },
  filterButton: {
    backgroundColor: '#FF6600',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  filterButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  listItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 25,
    marginBottom: 10,
    elevation: 3,
  },
  listItemText: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  buttonIcon: {
    width: 24,
    height: 24,
    tintColor: '#000',
    marginHorizontal: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#FF6600',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    margin: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  productListContainer: {
    width: '100%',
    maxHeight: 300,
  },
  productItem: {
    backgroundColor: '#f3f3f3',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  productText: {
    fontSize: 14,
    marginBottom: 5,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#ff6600',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SavedListsScreen;
