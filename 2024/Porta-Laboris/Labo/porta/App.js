import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, ScrollView, View, Text, TextInput, TouchableOpacity, Image, FlatList, Dimensions, Animated, Linking } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Modal from 'react-native-modal';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync(); //Mantem a tela SplashScreen

const { width: screenWidth } = Dimensions.get('window');

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCreatorIndex, setCurrentCreatorIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const translateX = useRef(new Animated.Value(screenWidth)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const modalRef = useRef(null);

  const toggleMenu = () => {
    if (menuVisible) {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: screenWidth,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => setMenuVisible(false));
    } else {
      setMenuVisible(true);
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: screenWidth * 0.25,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const carouselData = [
    { id: '1', image: require('./assets/image1.png') },
    { id: '2', image: require('./assets/image2.png') },
    { id: '3', image: require('./assets/image3.png') }
  ];

  const creatorsData = [
    { id: '1', image: require('./assets/edgar.jpg'), name: 'Edgar Feitoza De Almeida' },
    { id: '2', image: require('./assets/eu.jpg'), name: 'Matheus Lucindo dos Santos' },
    { id: '3', image: require('./assets/luiss.png'), name: 'Luiz Henrique Barbosa Dias' },
    { id: '4', image: require('./assets/liu.jpg'), name: 'Luis Henrique dos Santos Oliveira' },
    { id: '5', image: require('./assets/kaua.jpg'), name: 'Kauã Santos de Lima' }
  ];

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise(resolve => setTimeout(resolve, 5000));
        await SplashScreen.hideAsync();
      } catch (erro) {
        console.error(erro);
      } 
    }
    prepare();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCreatorIndex((prevIndex) => (prevIndex + 1) % creatorsData.length);
    }, 3000); // Change creator every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const openModal = (content) => {
    setModalContent(content);
    setModalVisible(true);
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.animate('bounceOut', 500).then(() => {
        setModalVisible(false);
      });
    } else {
      setModalVisible(false);
    }
  };

  const renderModalContent = () => {
    switch (modalContent) {
      case 'animation':
        return (
          <ScrollView style={styles.modalScroll}>
            <Text style={styles.modalTitle}>A Animação da CLT</Text>
            <Text style={styles.modalText}>Entenda como a CLT foi desenvolvida e estruturada para proteger os direitos dos trabalhadores brasileiros...</Text>
          </ScrollView>
        );
      case 'history':
        return (
          <ScrollView style={styles.modalScroll}>
            <Text style={styles.modalTitle}>História da CLT</Text>
            <Text style={styles.modalText}>A CLT, criada em 1943, é um marco na regulamentação das relações de trabalho no Brasil. Conheça os principais eventos que levaram à sua criação...</Text>
          </ScrollView>
        );
      case 'reforms':
        return (
          <ScrollView style={styles.modalScroll}>
            <Text style={styles.modalTitle}>Reformas na CLT</Text>
            <Text style={styles.modalText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget, auctor vitae massa...</Text>
          </ScrollView>
        );
      default:
        return <Text style={styles.modalText}>{modalContent}</Text>;
    }
  };

  const openLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={toggleMenu}>
            <Image source={require('./assets/menu.png')} style={styles.menuIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Porta Laboris</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.carousel}>
          <FlatList
            data={carouselData}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={({ nativeEvent }) => {
              const newIndex = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
              setCurrentIndex(newIndex);
            }}
            renderItem={({ item }) => (
              <Image source={item.image} style={styles.carouselImage} />
            )}
          />
          <View style={styles.indicatorContainer}>
            {carouselData.map((_, index) => (
              <View
                key={index}
                style={[styles.indicator, index === currentIndex ? styles.activeIndicator : null]}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nosso Objetivo</Text>
          <Text style={styles.sectionText}>
            Informar o trabalhador sobre as normas, regulamentos, história e edificação da tão famosa CLT (Consolidação das Leis do Trabalho), e como o operário médio pode fazer uso desse importante regulamento.
          </Text>
        </View>

        <View style={styles.section}>
          <TouchableOpacity onPress={() => openModal('animation')} style={styles.card}>
            <Image source={require('./assets/defini2.png')} style={styles.cardBackgroundImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openModal('history')} style={styles.card}>
            <Image source={require('./assets/historia2.png')} style={styles.cardBackgroundImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openModal('reforms')} style={styles.card}>
            <Image source={require('./assets/reform.png')} style={styles.cardBackgroundImage} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle2}>Criadores</Text>
          <View style={styles.sectionSeparator}></View>
          <Text style={styles.sectionText2}>Equipe que contribuiu com a produção do aplicativo.</Text>
          <View style={styles.creators}>
            {creatorsData.map((creator, index) => (
              index === currentCreatorIndex && (
                <Animatable.View
                  key={creator.id}
                  animation="bounceIn"
                  duration={1500}
                  style={styles.creator}
                >
                  <Image source={creator.image} style={styles.creatorImage} />
                  <Text style={styles.creatorName}>{creator.name}</Text>
                </Animatable.View>
              )
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle3}>Fale conosco</Text>
          <View style={styles.sectionSeparator3}></View>
          <Text style={styles.sectionText3}>Preencha os Campos abaixo para entrar em contato conosco!</Text>
          <TextInput style={styles.input} placeholder="Nome" />
          <TextInput style={styles.input} placeholder="Email" />
          <TextInput style={styles.input} placeholder="Seu telefone (opicional)" keyboardType="numeric" />
          <TextInput style={[styles.input, styles.messageInput]} placeholder="Mensagem" multiline />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionSeparator4}></View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => openModal('Telefone: (11) 1234-5678')} style={styles.iconTextContainer}>
            <Image source={require('./assets/fone.png')} style={styles.icon} />
            <Text style={styles.footerText}>Telefone</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openModal('Email: contato@portalaboris.com')} style={styles.iconTextContainer}>
            <Image source={require('./assets/email.png')} style={styles.icon} />
            <Text style={styles.footerText}>Email</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openModal('Endereço: Rua Exemplo, 123, São Paulo, SP')} style={styles.iconTextContainer}>
            <Image source={require('./assets/corp.png')} style={styles.icon} />
            <Text style={styles.footerText}>Endereço</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footerNote}>
          <Text style={styles.fottext}>2024 - Porta Laboris</Text>
          <Text style={styles.fottext}>Política de Privacidade - Política de Cookies</Text>
        </View>

        <Modal
          isVisible={modalVisible}
          onBackdropPress={closeModal}
          style={styles.modal}
        >
          <Animatable.View
            ref={modalRef}
            animation="bounceIn"
            duration={1500}
            style={styles.modalContent}
          >
            {renderModalContent()}
            <TouchableOpacity onPress={closeModal} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Fechar</Text>
            </TouchableOpacity>
          </Animatable.View>
        </Modal>
      </ScrollView>

      {menuVisible && (
        <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
          <TouchableOpacity style={styles.overlayTouchable} onPress={toggleMenu} />
        </Animated.View>
      )}

      <Animated.View style={[styles.sideMenu, { transform: [{ translateX }] }]}>
        <Text style={styles.menuTitle}>Refêrencias</Text>
        
        <TouchableOpacity onPress={() => openLink('https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm')}>
          <Text style={styles.menuItem}>Consolidação - GOV.BR</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink('https://www.gov.br/trabalho-e-emprego/pt-br/servicos/trabalhador/carteira-de-trabalho')}>
          <Text style={styles.menuItem}>Emprega Brasil - GOV.BR</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink('https://www2.senado.leg.br/bdsf/bitstream/handle/id/535468/clt_e_normas_correlatas_1ed.pdf')}>
          <Text style={styles.menuItem}>Senado Federal - BR</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink('https://www.portaldaindustria.com.br/industria-de-a-z/o-que-e-legislacao-trabalhista/')}>
          <Text style={styles.menuItem}>Portal da Indústria - SESI/SENAI</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleMenu}>
          <Text style={styles.closeMenuButton}>Fechar Menu</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252843',
  },
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    zIndex: 1000,
  },
  headerTitle: {
    fontSize: 32,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 5,
  },
  menuIcon: {
    width: 40,
    height: 40,
    marginLeft: 325,
    top: 50,
  },
  carousel: {
    height: 280,
  },
  carouselImage: {
    width: screenWidth,
    height: '100%',
    resizeMode: 'cover',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeIndicator: {
    backgroundColor: '#FF6F00',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    top: 25,
  },
  sectionTitle2: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    top: 45,
  },
  sectionTitle3: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    top: 75,
  },
  sectionSeparator: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    marginBottom: 10,
    top: 65,
    width: 160,
    alignSelf: 'center',
  },
  sectionSeparator3: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    marginBottom: 10,
    top: 95,
    width: 160,
    alignSelf: 'center',
  },
  sectionSeparator4: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    marginBottom: 10,
    top: 175,
    width: 600,
    alignSelf: 'center',
  },
  sectionText: {
    fontSize: 17,
    color: '#fff',
    textAlign: 'center',
    top: 50,
  },
  sectionText2: {
    fontSize: 17,
    color: '#fff',
    textAlign: 'center',
    top: 85,
  },
  sectionText3: {
    fontSize: 17,
    color: '#fff',
    textAlign: 'center',
    top: 115,
  },
  card: {
    top: 45,
    marginVertical: 10,
    borderRadius: 10,
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  creators: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 190,
  },
  creator: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  creatorImage: {
    width: 230,
    height: 230,
    backgroundColor: '#555',
    borderRadius: 200,
    marginBottom: 10,
  },
  creatorName: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    top: 150,
  },
  messageInput: {
    height: 150, // Aumente a altura do campo de mensagem
  },
  button: {
    backgroundColor: '#008f39',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    top: 165,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  footer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 200,
  },
  fottext: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footerNote: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#000',
  },
  iconTextContainer: {
    alignItems: 'center',
    top: -20,
  },
  icon: {
    width: 42,
    height: 42,
  },
  footerText: {
    color: '#fff',
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 17,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: screenWidth * 0.9,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    maxHeight: '80%',
  },
  modalScroll: {
    maxHeight: '70%',
  },
  modalButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#008f39',
    borderRadius: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#666',
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#008f39',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1,
  },
  sideMenu: {
    position: 'absolute',
    top: 120,
    bottom: 20,
    left: 0,
    width: '75%',
    backgroundColor: '#0e0e10',
    zIndex: 2,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  menuTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
    top: 8,
  },
  menuItem: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#fff',
    top: 25,
  },
  closeMenuButton: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#008f39',
    textAlign: 'center',
    top: 123,
  },
});

export default App;