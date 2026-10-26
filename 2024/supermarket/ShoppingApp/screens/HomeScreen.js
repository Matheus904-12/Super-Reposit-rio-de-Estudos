import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [total, setTotal] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter your budget:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter budget"
        keyboardType="numeric"
        onChangeText={(text) => setTotal(parseInt(text))}
      />
      <Button title="Go to Cart" onPress={() => navigation.navigate('Cart', { total })} />
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
    marginBottom: 10,
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 10,
    width: 200,
  },
});

export default HomeScreen;
