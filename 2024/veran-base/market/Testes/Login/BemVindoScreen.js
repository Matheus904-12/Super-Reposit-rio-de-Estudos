import React, { useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function BemVindoScreen() {
    
    const navigation = useNavigation();

    const onLayoutRootView = useCallback(async () => {
        await SplashScreen.hideAsync();
    }, []);

    return (
        <View style={styles.container} onLayout={onLayoutRootView}>
            <View style={styles.containerLogo}>
                <Animatable.Image
                    delay={1000}
                    animation="flipInY"
                    source={require("./assets/boom.png")}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>
            <Animatable.View delay={600} animation='fadeInUp' style={styles.containerForm}>
                <View style={styles.containerForm}>
                    <Text style={styles.title}>
                        Bem Vindo!
                    </Text>
                    <Text style={styles.text}>
                        Faça o login para começar
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('HomeScreen')} style={styles.button}>
                        <Text style={styles.buttonText}>
                            Acessar
                        </Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    containerLogo: {
        flex: 2,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: "190%",
    },
    containerForm: {
        flex: 1,
        backgroundColor: '#3C090D',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%',
    },
    title: {
        fontSize: 24,
        marginTop: 20,
        marginBottom: 12,
        color: "#FFF",
        textAlign: 'center',
        fontWeight: 'bold',
    },
    text: {
        color: '#FF8517',
        paddingTop: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
    button: {
        position: 'absolute',
        backgroundColor: '#FF8517',
        borderRadius: 50,
        paddingVertical: 14,
        width: '60%',
        alignSelf: 'center',
        bottom: '30%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold'
    }
});
