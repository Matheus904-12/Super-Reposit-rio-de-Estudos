import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Animated } from 'react-native';
import { WebView } from 'react-native-webview';
import { buscarVideos } from './youtube'; // Certifique-se de que o caminho está correto

export default function YoutubeScreen() {
  const [pesquisa, setPesquisa] = useState('');
  const [videos, setVideos] = useState([]);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const pesquisar = async () => {
    try {
      const resultados = await buscarVideos(pesquisa);
      setVideos(resultados);
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    } catch (erro) {
      console.error('Erro ao pesquisar vídeos:', erro);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua pesquisa"
          value={pesquisa}
          onChangeText={setPesquisa}
          onSubmitEditing={pesquisar} // Adicionado para pesquisar ao pressionar "Enter"
        />
        <TouchableOpacity style={styles.button} onPress={pesquisar}>
          <Text style={styles.buttonText}>Pesquisar</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        {videos.map((video) => (
          <Animated.View key={video.id.videoId} style={[styles.videoContainer, { opacity: fadeAnim }]}>
            <Text style={styles.videoTitle}>{video.snippet.title}</Text>
            <WebView
              style={styles.webview}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              source={{ html: `<iframe width="100%" height="215" src="https://www.youtube.com/embed/${video.id.videoId}" frameborder="0" allowfullscreen></iframe>` }}
            />
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#c4302b',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  videoContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  webview: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 10,
  },
});
