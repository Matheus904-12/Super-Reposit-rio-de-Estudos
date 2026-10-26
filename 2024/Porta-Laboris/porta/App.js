import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, ScrollView, View, Text, TextInput, TouchableOpacity, Image, FlatList, Dimensions, Animated, Linking } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Modal from 'react-native-modal';

const { width: screenWidth } = Dimensions.get('window');

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCreatorIndex, setCurrentCreatorIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const translateX = useRef(new Animated.Value(screenWidth)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

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
    { id: '2', image: require('./assets/matheus.jpg'), name: 'Matheus Lucindo dos Santos' },
    { id: '3', image: require('./assets/luiss.png'), name: 'Luiz Henrique Barbosa Dias' },
    { id: '4', image: require('./assets/image1.png'), name: 'Luis' },
    { id: '5', image: require('./assets/kaua.jpg'), name: 'Kauã Santos de Lima' }
  ];

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image source={require('./assets/menu.png')} style={styles.menuIcon} />
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
          <TextInput style={styles.input} placeholder="Seu telefone (opicional)" />
          <TextInput style={styles.input} placeholder="Mensagem" multiline />
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
      </ScrollView>

      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        useNativeDriver={true}
        animationIn="zoomIn"
        animationOut="zoomOut"
        backdropTransitionOutTiming={0}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          
          <Text style={styles.modalText}>
            {modalContent === 'animation' && (
              <>
                <Text style={styles.modalTitle}>A Animação da CLT</Text>
                <Text>Entenda como a CLT foi desenvolvida e estruturada para proteger os direitos dos trabalhadores brasileiros...</Text>
              </>
            )}
            {modalContent === 'history' && (
              <>
                <Text style={styles.modalTitle}>História da CLT</Text>
                <Text>A CLT, criada em 1943, é um marco na regulamentação das relações de trabalho no Brasil. Conheça os principais eventos que levaram à sua criação...</Text>
              </>
            )}
            {modalContent === 'reforms' && (
              <>
                <Text style={styles.modalTitle}>Reformas na CLT</Text>
                <Text>A Consolidação das Leis do Trabalho (CLT) foi instituída em 1943, durante o governo de Getúlio Vargas, com o objetivo de unificar e regulamentar as relações de trabalho no Brasil. Desde então, a CLT passou por várias reformas, refletindo as transformações econômicas, sociais e políticas do país.

A reforma mais significativa ocorreu em 2017, conhecida como a Reforma Trabalhista, sancionada pela Lei nº 13.467. Essa reforma introduziu profundas mudanças na legislação trabalhista, com o intuito de modernizar as relações de trabalho e aumentar a competitividade das empresas. Entre as principais alterações, destacam-se:

Prevalência do Negociado sobre o Legislado: Uma das mudanças mais debatidas foi a possibilidade de acordos coletivos prevalecerem sobre a legislação. Isso significa que os sindicatos e empregadores podem negociar condições de trabalho diferentes das previstas na CLT, desde que não contrariem os direitos essenciais dos trabalhadores.

Jornada de Trabalho: A reforma flexibilizou a jornada de trabalho, permitindo a adoção do regime de jornada intermitente, onde o trabalhador é pago apenas pelas horas efetivamente trabalhadas. Também foi permitido o aumento da jornada diária para 12 horas, desde que respeitado o limite de 44 horas semanais.

Férias: A divisão das férias em até três períodos foi autorizada, sendo que um dos períodos não pode ser inferior a 14 dias e os outros não podem ser inferiores a cinco dias cada um. Essa flexibilização visa atender melhor as necessidades dos empregadores e empregados.

Contribuição Sindical: A contribuição sindical, que era obrigatória, passou a ser facultativa. Essa mudança impactou significativamente o financiamento dos sindicatos, que precisaram buscar novas formas de arrecadação e se adaptar a um novo cenário de representatividade.

Trabalho Remoto: A reforma regulamentou o teletrabalho, ou home office, estabelecendo que o controle da jornada não se aplica a essa modalidade. Também ficou definido que as despesas com equipamentos e infraestrutura devem ser acordadas entre empregador e empregado.

Terceirização: Foi ampliada a possibilidade de terceirização para todas as atividades da empresa, inclusive a atividade-fim. Isso permitiu uma maior flexibilidade na contratação de serviços especializados e a adaptação das empresas às demandas de mercado.

Rescisão Contratual: A rescisão contratual pode ser feita por acordo entre empregador e empregado, com o pagamento de metade do aviso prévio e da multa do FGTS, além do saque de 80% do saldo do FGTS.

A Reforma Trabalhista de 2017 foi alvo de intensos debates e polarização. Seus defensores argumentam que as mudanças trouxeram maior dinamismo ao mercado de trabalho, incentivaram a formalização de empregos e ajudaram a reduzir a burocracia para as empresas. Por outro lado, os críticos apontam que a reforma enfraqueceu a proteção aos trabalhadores, aumentou a precarização das condições de trabalho e dificultou a atuação dos sindicatos.

Independentemente das opiniões divergentes, a reforma representa um marco importante na história das relações de trabalho no Brasil, refletindo a busca por um equilíbrio entre a necessidade de modernização das leis e a preservação dos direitos dos trabalhadores. As consequências e os impactos dessas mudanças ainda estão sendo avaliados e discutidos, mas certamente moldarão o futuro do trabalho no país.</Text>
              </>
            )}
          </Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
    backgroundColor: '#FF5C00',
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
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#FF5C00',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  menu: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '75%',
    height: '100%',
    backgroundColor: '#000',
    zIndex: 2000,
    padding: 20,
  },
  menuTitle: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  menuSeparator: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  menuButton: {
    paddingVertical: 15,
  },
  menuButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    opacity: 0.5,
    zIndex: 1500,
  },
  overlayTouchable: {
    width: '100%',
    height: '100%',
  },
});

export default App;
