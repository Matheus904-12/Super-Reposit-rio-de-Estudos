import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Modal } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';

const CartScreen = ({ route, navigation }) => {
  const [cart, setCart] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [savedLists, setSavedLists] = useState([]);
  const [selectedListIndex, setSelectedListIndex] = useState(null);

  const loadCart = async () => {
    try {
      const savedCart = await AsyncStorage.getItem('@cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Failed to load the cart", error);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  useEffect(() => {
    if (route.params && route.params.cart) {
      setCart(route.params.cart);
    }
  }, [route.params]);

  useEffect(() => {
    calculateTotal();
    saveCart(cart);
  }, [cart]);

  const saveCart = async (cart) => {
    try {
      await AsyncStorage.setItem('@cart', JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save the cart", error);
    }
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleGoBack = () => {
    navigation.navigate('Home');
  };

  const handleReload = () => {
    loadCart();
  };

  const calculateTotal = () => {
    let totalItemsCount = 0;
    let totalPriceValue = 0;
    cart.forEach((product) => {
      totalItemsCount += product.quantity || 1;
      totalPriceValue += (product.price || 0) * (product.quantity || 1);
    });
    setTotalItems(totalItemsCount);
    setTotalPrice(totalPriceValue);
  };

  const handleAddQuantity = (productId) => {
    const updatedCart = cart.map((product) => {
      if (product.id === productId) {
        return { ...product, quantity: (product.quantity || 1) + 1 };
      }
      return product;
    });
    setCart(updatedCart);
  };

  const handleRemoveQuantity = (productId) => {
    const updatedCart = cart.map((product) => {
      if (product.id === productId && product.quantity > 1) {
        return { ...product, quantity: (product.quantity || 1) - 1 };
      }
      return product;
    });
    setCart(updatedCart);
  };

  const handleSavePress = async () => {
    try {
      const storedLists = await AsyncStorage.getItem('shoppingLists');
      const parsedLists = storedLists ? JSON.parse(storedLists) : [];
      setSavedLists(parsedLists);
      setIsModalVisible(true);
    } catch (error) {
      console.error('Failed to load saved lists', error);
    }
  };

  const handleListSelect = async (index) => {
    setSelectedListIndex(index);
    const updatedList = [...savedLists];
    updatedList[index].products = [...(updatedList[index].products || []), ...cart];
    await AsyncStorage.setItem('shoppingLists', JSON.stringify(updatedList));
    setIsModalVisible(false);
    setCart([]);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Animatable.View animation="bounceIn" delay={100} style={styles.header}>
        <Text style={styles.headerTitle}>Meu Carrinho</Text>
        <TouchableOpacity onPress={handleReload} style={styles.reloadButton}>
          <Image source={require('../icons/refresh.png')} style={styles.reloadIcon} />
        </TouchableOpacity>
      </Animatable.View>

      <Animatable.View animation="bounceIn" delay={200} style={styles.totalItemsContainer}>
        <Text style={styles.totalItemsText}>Total de Itens: {totalItems}</Text>
        <TouchableOpacity onPress={handleClearCart}>
          <Text style={styles.clearCartText}>Limpar</Text>
        </TouchableOpacity>
      </Animatable.View>

      <View style={styles.scrollViewContainer}>
        <ScrollView style={styles.productListContainer} showsVerticalScrollIndicator={false}>
          {cart.map((product) => (
            <Animatable.View key={product.id} animation="bounceIn" delay={300} style={styles.productItem}>
              <Image source={{ uri: product.image }} style={styles.productImage} />
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{product.name}</Text>
                <View style={styles.productQuantity}>
                  <TouchableOpacity onPress={() => handleRemoveQuantity(product.id)} style={styles.quantityButton}>
                    <Image source={require('../icons/add2.png')} style={styles.quantityButtonText} />
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{product.quantity || 1}</Text>
                  <TouchableOpacity onPress={() => handleAddQuantity(product.id)} style={styles.quantityButton}>
                    <Image source={require('../icons/min2.png')} style={styles.quantityButtonText} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.productPrice}>R$ {((product.price || 0) * (product.quantity || 1)).toFixed(2)}</Text>
              </View>
            </Animatable.View>
          ))}
        </ScrollView>
      </View>

      <Animatable.View animation="bounceIn" delay={400} style={styles.bottomBar}>
        <Text style={styles.totalPrice}>Total: R$ {totalPrice.toFixed(2)}</Text>
        <TouchableOpacity style={styles.saveButton} onPress={handleSavePress}>
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>
      </Animatable.View>

      {isModalVisible && (
        <Modal transparent={true} animationType="slide" visible={isModalVisible}>
          <View style={styles.modalContainer}>
            <Animatable.View animation="bounceIn" style={styles.modalView}>
              <Text style={styles.modalTitle}>Listas Salvas</Text>
              <ScrollView style={styles.savedListsContainer} showsVerticalScrollIndicator={false}>
                {savedLists.map((list, index) => (
                  <TouchableOpacity key={index} style={styles.savedListItem} onPress={() => handleListSelect(index)}>
                    <Text style={styles.savedListText}>Localização: {list.location}</Text>
                    <Text style={styles.savedListText}>Valor Máximo: {list.maxValue}</Text>
                    <Text style={styles.savedListText}>Data e Horário: {list.dateTime}</Text>
                    <Text style={styles.savedListText}>Tipo: {list.selectedItem}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Fechar</Text>
              </TouchableOpacity>
            </Animatable.View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6F0D15',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 26,
    flex: 1,
    paddingTop: 20,
  },
  reloadButton: {
    padding: 10,
  },
  reloadIcon: {
    width: 24,
    height: 24,
  },
  totalItemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  totalItemsText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  clearCartText: {
    color: '#FF8517',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollViewContainer: {
    flex: 1,
    marginBottom: 165, // Deixe espaço para a bottomBar
  },
  productListContainer: {
    flex: 1,
  },
  productItem: {
    flexDirection: 'row',
    backgroundColor: '#8B1A1F',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  productDetails: {
    flex: 1,
    marginLeft: 10,
  },
  productName: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  productQuantity: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FF8517',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    width: 36,
    height: 36,
  },
  quantity: {
    color: '#FFFFFF',
    fontSize: 16,
    marginHorizontal: 10,
  },
  productPrice: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#5A1217',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 110,
  },
  totalPrice: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  saveButton: {
    backgroundColor: '#FF8517',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  savedListsContainer: {
    width: '100%',
    maxHeight: 300, // Ajuste conforme necessário
  },
  savedListItem: {
    backgroundColor: '#F3F3F3',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  savedListText: {
    fontSize: 14,
    marginBottom: 5,
  },
  closeButton: {
    marginTop: 20,
  },
  closeButtonText: {
    color: '#FF8517',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartScreen;
