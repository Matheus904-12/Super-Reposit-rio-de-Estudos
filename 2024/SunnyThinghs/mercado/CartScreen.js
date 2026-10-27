import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';

const CartScreen = ({ navigation }) => {
  const handleClearCart = () => {
    // Lógica para limpar o carrinho
  };

  const handleGoBack = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <Feather name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meu Carrinho</Text>
      </View>

      {/* Total de Itens */}
      <View style={styles.totalItemsContainer}>
        <Text style={styles.totalItemsText}>Total de Itens (0)</Text>
        <TouchableOpacity onPress={handleClearCart}>
          <Text style={styles.clearCartText}>Limpar</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Produtos */}
      <View style={styles.productListContainer}>
        {/* Aqui serão renderizados os cards dos produtos */}
      </View>

      {/* TabBar Expandida */}
      <View style={styles.tabBarExpanded}>
        <Text style={styles.tabBarText}>Quantidade de Produtos: 0</Text>
        <TextInput
          style={styles.couponInput}
          placeholder="Digite seu cupom"
        />
        <Text style={styles.totalPriceText}>Total: R$ 0,00</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.confirmButton}>
            <Text style={styles.confirmButtonText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    fontSize: 20,
    paddingTop: 20,
    textAlign: 'center', // Centraliza o texto

  },
  totalItemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  totalItemsText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    padding: 10,
  },
  clearCartText: {
    color: '#FF8517',
    fontSize: 14,
    fontWeight: 'bold',
    padding: 10,
  },
  productListContainer: {
    flex: 1,
    marginBottom: 20,
    // Aqui virá a lista de produtos
  },
  tabBarExpanded: {
    backgroundColor: '#3C090D',
    padding: 20,
    borderRadius: 10,
    marginBottom: -15,
    transform: [{ scale: 1.1 }],
    borderTopLeftRadius: 20, // Arredonda o canto superior esquerdo
    borderTopRightRadius: 20, // Não arredonda o canto superior direito
    borderBottomLeftRadius: 0, // Não arredonda o canto inferior esquerdo
    borderBottomRightRadius: 0, // Arredonda o canto inferior direito
  },
  tabBarText: {
    color: '#FFFFFF',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  couponInput: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  totalPriceText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#CCCCCC',
    padding: 10,
    borderRadius: 7,
    flex: 1,
    marginRight: 10,
  },
  cancelButtonText: {
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#FF8517',
    padding: 10,
    borderRadius: 7,
    flex: 1,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default CartScreen;
