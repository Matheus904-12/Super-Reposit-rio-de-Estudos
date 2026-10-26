import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const CartScreen = ({ route }) => {
  const [products, setProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const { total } = route.params;

  const handleAddProduct = () => {
    // Simulando a adição de produtos
    const randomPrice = Math.floor(Math.random() * 100) + 1;
    const newProduct = {
      name: `Product ${products.length + 1}`,
      price: randomPrice,
    };
    setProducts([...products, newProduct]);
    setTotalAmount(totalAmount + randomPrice);
  };

  const handleSaveCart = () => {
    // Simulando o salvamento do carrinho
    alert('Cart saved!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Total budget: {total}</Text>
      <TextInput style={styles.input} placeholder="Enter product" />
      <Button title="Add to Cart" onPress={handleAddProduct} />
      <Text style={styles.label}>Cart:</Text>
      {products.map((product, index) => (
        <Text key={index}>{product.name} - ${product.price}</Text>
      ))}
      <Text style={styles.label}>Total Amount: ${totalAmount}</Text>
      <Button title="Save Cart" onPress={handleSaveCart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 10,
    width: 200,
  },
});

export default CartScreen;
