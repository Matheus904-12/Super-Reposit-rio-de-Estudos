import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigation = useNavigation();

  const categories = [
    { id: 1, image: require('../path/to/image1.png') },
    { id: 2, image: require('../path/to/image2.png') },
    { id: 3, image: require('../path/to/image3.png') },
    { id: 4, image: require('../path/to/image4.png') },
    { id: 5, image: require('../path/to/image5.png') },
  ];
  const products = {
    1: [
      { id: 1, name: 'Coxão Duro 1kg', price: 32.00, originalPrice: 34.20, image: require('../path/to/caxa.png') },
      { id: 2, name: 'Frango Inteiro Congelado', price: 20.00, originalPrice: 25.00, image: require('../path/to/fran.png') },
      { id: 3, name: 'Pacote de Linguiça - Aurora 1k', price: 14.00, originalPrice: 24.20, image: require('../path/to/lin.png') },
      { id: 4, name: 'Carne de Sol 1kg', price: 17.00, originalPrice: 22.00, image: require('../path/to/cs.png') },
      { id: 5, name: 'Contra Filé 1kg', price: 22.00, originalPrice: 34.20, image: require('../path/to/contt.png') },
    ],
    2: [
      { id: 1, name: 'Biscoito Negrito', price: 2.50, originalPrice: 4.20, image: require('../path/to/nigr.png') },
      { id: 2, name: 'Toddy 370g', price: 7.00, originalPrice: 10.00, image: require('../path/to/toddy.png') },
      { id: 3, name: 'Pão de Forma - Puma', price: 5.00, originalPrice: 8.60, image: require('../path/to/pua.png') },
      { id: 4, name: 'Pacote de Pão De Queijo', price: 13.00, originalPrice: 16.00, image: require('../path/to/qui.png') },
      { id: 5, name: 'Pacote de Waffles', price: 14.00, originalPrice: 24.20, image: require('../path/to/wa.png') },
    ],
    3: [
      { id: 1, name: 'Cenoura', price: 3.00, originalPrice: 4.20, image: require('../path/to/cen.png') },
      { id: 2, name: 'Pimentão', price: 2.00, originalPrice: 3.50, image: require('../path/to/pimen.png') },
      { id: 3, name: 'Abóbora', price: 10.00, originalPrice: 12.20, image: require('../path/to/ababe.png') },
      { id: 4, name: 'Tomate', price: 2.50, originalPrice: 3.00, image: require('../path/to/tom.png') },
      { id: 5, name: 'Beterraba', price: 4.00, originalPrice: 4.20, image: require('../path/to/bet.png') },
    ],
    4: [
      { id: 1, name: 'Banana', price: 4.00, originalPrice: 4.20, image: require('../path/to/bana.png') },
      { id: 2, name: 'Maça', price: 3.20, originalPrice: 4.00, image: require('../path/to/maca.png') },
      { id: 3, name: 'Mamão', price: 3.00, originalPrice: 3.20, image: require('../path/to/mam.png') },
      { id: 4, name: 'Pera', price: 2.00, originalPrice: 3.60, image: require('../path/to/pear.png') },
      { id: 5, name: 'Abacaxi', price: 4.90, originalPrice: 6.20, image: require('../path/to/aba.png') },
    ],
    5: [
      { id: 1, name: 'Brocolis', price: 3.80, originalPrice: 5.60, image: require('../path/to/alfa.png') },
      { id: 2, name: 'Repolho', price: 2.00, originalPrice: 3.20, image: require('../path/to/repo.png') },
      { id: 3, name: 'Couve', price: 4.00, originalPrice: 4.20, image: require('../path/to/couve.png') },
      { id: 4, name: 'Abobrinha', price: 7.00, originalPrice: 9.50, image: require('../path/to/ab.png') },
      { id: 5, name: 'Berinjela', price: 4.00, originalPrice: 4.50, image: require('../path/to/ber.png') },
    ],
  };

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    Alert.alert('Produto adicionado com sucesso');
    navigation.navigate('Carrinho', { cart: [...cart, product] });
  };

  const handleCategoryPress = (categoryId) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
  };

  const filteredProducts = selectedCategory ? products[selectedCategory].filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  ) : [];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../path/to/your/logo.png')} style={styles.logo} />
        <View style={styles.searchBar}>
          <TextInput
            style={styles.input}
            placeholder="Pesquisar produtos"
            value={search}
            onChangeText={setSearch}
          />
          <TouchableOpacity onPress={() => console.log("Filter clicked")}>
            <Image source={require('../icons/filter.png')} style={styles.filterIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.carousel}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map(category => (
            <TouchableOpacity key={category.id} style={styles.categoryItem} onPress={() => handleCategoryPress(category.id)}>
              <Animatable.Image animation="bounceIn" source={category.image} style={styles.categoryImage} />
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <ScrollView style={styles.productContainer} showsVerticalScrollIndicator={false}>
        {filteredProducts.map(product => (
          <Animatable.View animation="bounceIn" key={product.id} style={styles.quadradoLaranja}>
            <View style={styles.productCard}>
              <Image source={product.image} style={styles.productImage} />
              <View style={styles.productDescription}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>R$ {product.price.toFixed(2)}</Text>
                <TouchableOpacity style={styles.TextoBotao} onPress={() => handleAddToCart(product)}>
                  <Text style={styles.BotaoTexto}>Adicionar Ao Carrinho</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animatable.View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6F0D15',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: '#6F0D15',
  },
  logo: {
    width: 100,
    height: 70,
    resizeMode: 'contain',
    marginBottom: 15,
    marginLeft: 10,
    marginTop: -20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 50,
    padding: 5,
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  filterIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  carousel: {
    marginTop: 3,
    paddingHorizontal: 15,
  },
  categoryItem: {
    marginRight: 10,
    padding: 20,
    backgroundColor: '#B91723',
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    width: 153,
    height: 157,
  },
  categoryImage: {
    width: 153,
    height: 157,
    borderRadius: 10,
  },
  categoryText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  productContainer: {
    paddingHorizontal: 20,
    marginBottom: 100,
    marginTop: 20,
  },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#B91723',
    borderRadius: 20,
    padding: 15,
    width: '95%',
    height: '75%',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 1,
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 5,
  },
  productName: {
    marginTop: -40,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  productPrice: {
    marginTop: -15,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'yellow',
    marginBottom: 30,
  },
  productDescription: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '95%',
    marginTop: 90,
  },
  quadradoLaranja: {
    width: '100%',
    height: 184,
    backgroundColor: '#FF8517',
    marginBottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 35,
    borderBottomRightRadius: 35,
    marginTop: 20,
  },
  TextoBotao: {
    width: '100%',
    height: '35%',
    backgroundColor: '#FF0000',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: -20,
  },
  BotaoTexto: {
    fontWeight: 'bold',
    color: 'yellow',
    textShadowColor: '#000',
    textShadowOffset: { width: 0.3, height: 0.3 },
    textShadowRadius: 2,
  },
});

export default HomeScreen;
