import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay } from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';

const images = [
  { source: require('../Videos/Vamoss5.gif'), duration: 53000 },
];

const PersonalDataScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  const fadeInHeaderOpacity = useSharedValue(0);
  const fadeInCardOpacity = useSharedValue(0);
  const fadeInButtonsOpacity = useSharedValue(0);

  const imageOpacity = useSharedValue(1);

  const modalAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const fadeInHeaderStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeInHeaderOpacity.value,
    };
  });

  const fadeInCardStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeInCardOpacity.value,
    };
  });

  const fadeInButtonsStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeInButtonsOpacity.value,
    };
  });

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: imageOpacity.value,
    };
  });

  useEffect(() => {
    fadeInHeaderOpacity.value = withDelay(300, withTiming(1, { duration: 1000 }));
    fadeInCardOpacity.value = withDelay(600, withTiming(1, { duration: 1000 }));
    fadeInButtonsOpacity.value = withDelay(900, withTiming(1, { duration: 1000 }));

    const changeImage = (index) => {
      imageOpacity.value = withTiming(0, { duration: 1000 }, () => {
        setCurrentImageIndex(index);
        imageOpacity.value = withTiming(1, { duration: 1000 });
      });
    };

    const scheduleNextImage = (index, delay) => {
      setTimeout(() => {
        changeImage((index + 1) % images.length);
      }, delay);
    };

    let totalTime = 0;

    images.forEach((image, index) => {
      totalTime += image.duration;
      scheduleNextImage(index, totalTime);
    });

    return () => {
      images.forEach((image, index) => {
        clearTimeout(scheduleNextImage);
      });
    };
  }, []);

  const openModal = () => {
    setModalVisible(true);
    scale.value = withTiming(1, { duration: 300 });
    opacity.value = withTiming(1, { duration: 300 });
  };

  const closeModal = () => {
    scale.value = withTiming(0, { duration: 300 }, () => {
      setModalVisible(false);
    });
    opacity.value = withTiming(0, { duration: 300 });
  };

  const goToLogin = () => {
    fadeInButtonsOpacity.value = withTiming(0, { duration: 500 }, () => {
      navigation.navigate('Login');
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      fadeInHeaderOpacity.value = withDelay(300, withTiming(1, { duration: 1000 }));
      fadeInCardOpacity.value = withDelay(600, withTiming(1, { duration: 1000 }));
      fadeInButtonsOpacity.value = withDelay(900, withTiming(1, { duration: 1000 }));

      return () => {
        fadeInHeaderOpacity.value = withTiming(0, { duration: 1000 });
        fadeInCardOpacity.value = withTiming(0, { duration: 1000 });
        fadeInButtonsOpacity.value = withTiming(0, { duration: 1000 });
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, fadeInHeaderStyle]}>
        <TouchableOpacity onPress={openModal} style={styles.profileButton}>
          <Image source={require('../icons/perfil.png')} style={styles.headerIcon} />
        </TouchableOpacity>

        <Image source={require('../icons/Sunnythings.png')} style={styles.headerImage} />

        <TouchableOpacity onPress={goToLogin} style={styles.logoutButton}>
          <Image source={require('../icons/logout.png')} style={styles.headerIcon} />
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.carouselContainer}>
        <View style={styles.carousel}>
          <Animated.Image source={images[currentImageIndex].source} style={[styles.carouselImage, imageAnimatedStyle]} />
        </View>
      </View>

      <Animated.View style={[styles.buttonContainer, fadeInButtonsStyle]}>
        <TouchableOpacity style={styles.button} onPress={openModal}>
          <Image source={require('../icons/pix.png')} style={styles.icon} />
          <Text style={styles.buttonText}>Área Pix</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={openModal}>
          <Image source={require('../icons/key.png')} style={styles.icon} />
          <Text style={styles.buttonText}>Mudar Senha</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={openModal}>
          <Image source={require('../icons/shield.png')} style={styles.icon} />
          <Text style={styles.buttonText}>Proteção</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={openModal}>
          <Image source={require('../icons/config.png')} style={styles.icon} />
          <Text style={styles.buttonText}>Configurações</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={openModal}>
          <Image source={require('../icons/card.png')} style={styles.icon} />
          <Text style={styles.buttonText}>Novo Cartão</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={openModal}>
          <Image source={require('../icons/help.png')} style={styles.icon} />
          <Text style={styles.buttonText}>Ajuda</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={openModal}>
          <Image source={require('../icons/calender.png')} style={styles.icon} />
          <Text style={styles.buttonText}>Vencimento</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={openModal}>
          <Image source={require('../icons/notifi.png')} style={styles.icon} />
          <Text style={styles.buttonText}>Notificações</Text>
        </TouchableOpacity>
      </Animated.View>

      <Modal
        transparent={true}
        animationType="none"
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <Animated.View style={[styles.modalView, modalAnimatedStyle]}>
            <FontAwesome name="exclamation-circle" size={48} color="black" />
            <Text style={styles.modalText}>Função Limitada</Text>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5A1217',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    width: '100%',
    height: 250,
    backgroundColor: '#B91723',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 20,
    borderBottomLeftRadius: 120,
    borderBottomRightRadius: 120,
    position: 'absolute',
    top: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  headerImage: {
    width: 400,
    height: 70,
    marginBottom: 120,
    transform: [{ scale: 0.4 }],
    right: 14,
  },
  profileButton: {
    position: 'absolute',
    top: 40,
    left: 10,
  },
  logoutButton: {
    position: 'absolute',
    top: 40,
    right: 10,
  },
  headerIcon: {
    width: 30,
    height: 30,
  },
  carouselContainer: {
    marginTop: 80,
    width: 350,
    height: 210,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carousel: {
    width: '100%',
    height: '100%',
    backgroundColor: '#5A1217', // Removido o flash branco
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 270,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  icon: {
    width: 36,
    height: 36,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    width: 80,
    height: 80,
    backgroundColor: '#FF6C1C',
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 20,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#FF6600',
    padding: 10,
    borderRadius: 10,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PersonalDataScreen;
