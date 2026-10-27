import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

interface TranslationResponse {
  data: {
    translations: {
      translatedText: string;
    }[];
  };
}

export default function App() {
  const [originalText, setOriginalText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const handleTranslate = async () => {
    if (!originalText) {
      Alert.alert('Erro', 'Digite uma frase para traduzir!', [{ text: 'OK' }]);
      return;
    }

    try {
      const response = await fetch('https://translation.googleapis.com/language/translate/v2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: originalText,
          target: 'en', // Defina o idioma de destino aqui (por exemplo, 'en' para inglês)
          key: 'SUA_CHAVE_DA_API_AQUI', 
        }),
      });

      const data: TranslationResponse = await response.json();
      setTranslatedText(data.data.translations[0].translatedText);
    } catch (error) {
      console.error('Erro ao traduzir:', error);
      Alert.alert('Erro', 'Erro ao traduzir. Por favor, tente novamente mais tarde.', [{ text: 'OK' }]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tradutor</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite uma frase"
        onChangeText={(text) => setOriginalText(text)}
        value={originalText}
      />
      <TouchableOpacity style={styles.translateButton} onPress={handleTranslate}>
        <Text style={styles.buttonText}>Traduzir</Text>
      </TouchableOpacity>
      {translatedText ? (
        <View style={styles.translationContainer}>
          <Text style={styles.translationTitle}>Tradução:</Text>
          <Text style={styles.translatedText}>{translatedText}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#FFF',
  },
  translateButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  translationContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  translationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  translatedText: {
    fontSize: 16,
    color: '#666',
  },
});
