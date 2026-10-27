import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, ActivityIndicator, TouchableOpacity, Platform, StatusBar, ImageBackground } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { auth, firestore } from './firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, addDoc, getDocs, query, where, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';

export default function App() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [usuario, setUsuario] = useState(null);
  const [entrada, setEntrada] = useState('');

  const [mensagens, setMensagens] = useState([]);
  const [carregando, setCarregando] = useState(false);

  const cadastrar = () => {
    createUserWithEmailAndPassword(auth, email, senha)
      .then(userCredential => {
        setUsuario(userCredential.user);
        setEmail('');
        setSenha('');
      })
      .catch(error => alert(error.message));
  };

  const entrar = () => {
    signInWithEmailAndPassword(auth, email, senha)
      .then(userCredential => {
        setUsuario(userCredential.user);
        setEmail('');
        setSenha('');
      })
      .catch(error => alert(error.message));
  };

  const sair = () => {
    signOut(auth)
      .then(() => setUsuario(null))
      .catch(error => alert(error.message));
  };

  useEffect(() => {
    const atualizaUsuario = onAuthStateChanged(auth, (usuario) => {
      setUsuario(usuario);
    });

    return () => atualizaUsuario();
  }, []);

  // se o user for autenticado, ele busca as mensagens do usuario
  useEffect(() => {
    if (usuario) {
      buscarMensagens();
    } else {
      setMensagens([]);
    }
  }, [usuario]);

  const buscarMensagens = async () => {
    setCarregando(true);
    try {
      if (usuario) {
        // aq ele requisita a coleção messages do firestore, procurando no uid = ao respectivo do usuario
        const q = query(collection(firestore, 'messages'), where('uid', '==', usuario.uid));
        const querySnapshot = await getDocs(q);
        const mensagensBuscadas = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMensagens(mensagensBuscadas);
      }
    } catch (error) {
      console.error("Erro ao buscar mensagens: ", error);
    } finally {
      setCarregando(false);
    }
  };

  const enviarMensagem = async () => {
    if (entrada && usuario) {
      try {
        await addDoc(collection(firestore, 'messages'), {
          text: entrada,
          createdAt: serverTimestamp(),
          uid: usuario.uid
        });
        setEntrada('');
        buscarMensagens();
      } catch (error) {
        console.error("Erro ao adicionar mensagem: ", error);
      }
    }
  };

  const excluirMensagem = async (idMensagem) => {
    try {
      await deleteDoc(doc(firestore, 'messages', idMensagem));
      buscarMensagens();
    } catch (error) {
      console.error("Erro ao excluir mensagem: ", error);
    }
  };



  return (
    <ImageBackground source={require('./assets/bground.png')} style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {usuario ? (
        <>
          <Text style={styles.welcomeText}>Bem-vindo, {usuario.email}</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite uma mensagem"
            value={entrada}
            onChangeText={setEntrada}
          />
          <TouchableOpacity style={styles.botao} onPress={enviarMensagem}>
            <MaterialIcons name="send" size={24} color="white" />
            <Text style={styles.botaoTexto}>Enviar Mensagem</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoSair} onPress={sair}>
            <MaterialIcons name="logout" size={24} color="white" />
            <Text style={styles.botaoTexto}>Sair</Text>
          </TouchableOpacity>
          {carregando ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <ScrollView style={styles.mensagensContainer}>
              {mensagens.map((msg) => (
                <View key={msg.id} style={styles.mensagemContainer}>
                  <Text style={styles.mensagemTexto}>{msg.text}</Text>
                  <Text style={styles.timestamp}>
                    {new Date(msg.createdAt?.toDate()).toLocaleString()}
                  </Text>
                  <TouchableOpacity onPress={() => excluirMensagem(msg.id)} style={styles.excluirBotao}>
                    <MaterialIcons name="delete" size={24} color="white" />
                    <Text style={styles.excluirTexto}>Excluir</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          )}
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />
          <TouchableOpacity style={styles.botao} onPress={cadastrar}>
            <MaterialIcons name="person-add" size={24} color="white" />
            <Text style={styles.botaoTexto}>Cadastrar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botao} onPress={entrar}>
            <MaterialIcons name="login" size={24} color="white" />
            <Text style={styles.botaoTexto}>Entrar</Text>
          </TouchableOpacity>
        </>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 20,
    },
    welcomeText: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333',
      elevation: 4,
    },
    input: {
      fontSize: 20,
      width: '100%',
      padding: 15,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 10,
      backgroundColor: '#fff',
      elevation: 2,
    },
    mensagensContainer: {
      width: '100%',
      flex: 1,
    },
    mensagemContainer: {
      marginVertical: 10,
      padding: 15,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 10,
      backgroundColor: '#fff',
      elevation: 2,
    },
    mensagemTexto: {
      fontSize: 18,
      color: '#333',
    },
    timestamp: {
      fontSize: 12,
      color: '#666',
      marginTop: 5,
    },
    excluirBotao: {
      marginTop: 10,
      backgroundColor: '#CA222D',
      padding: 10,
      borderRadius: 5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 3,
    },
    excluirTexto: {
      color: '#fff',
      textAlign: 'center',
      fontWeight: 'bold',
      marginLeft: 5,
    },
    botao: {
      backgroundColor: '#4CAF50',
      padding: 15,
      borderRadius: 10,
      width: '100%',
      alignItems: 'center',
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      elevation: 3,
    },
    botaoSair: {
      backgroundColor: '#f44336',
      padding: 15,
      borderRadius: 10,
      width: '100%',
      alignItems: 'center',
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      elevation: 3,
    },
    botaoTexto: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 10,
    },
  });