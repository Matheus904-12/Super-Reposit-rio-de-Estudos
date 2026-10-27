import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform, StatusBar, ScrollView, ActivityIndicator, Alert, Keyboard } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const alturaStatusBar = StatusBar.currentHeight;
const KEY_GPT = 'SUA_CHAVE_DE_API';

export function Livros() {

    const [load, defLoad] = useState(false);
    const [receita, defReceita] = useState("");

    const [ingr1, defIngr1] = useState("");
    const [ingr2, defIngr2] = useState("");
    const [ingr3, defIngr3] = useState("");
    const [ingr4, defIngr4] = useState("");
    const [ocasiao, defOcasiao] = useState("");

    async function gerarReceita() {
        if (ingr1 === "" || ingr2 === "" || ingr3 === "" || ingr4 === "" || ocasiao === "") {
            Alert.alert("Atenção", "Informe todas as informações!", [{ text: "Beleza!" }])
            return;
        }
        defReceita("");
        defLoad(true);
        Keyboard.dismiss();

        const prompt = `Sugira livros com titulos populares e bem avalidados com essas especiicações: ${ingr1}, ${ingr2}, ${ingr3} e ${ingr4}, além de mostrar serviços que contém esses livros e pesquise sobre algum video de alguém indicando o livro no YouTube. Caso encontre, informe o link.`;

        fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${KEY_GPT}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.20,
                max_tokens: 500,
                top_p: 1,
            })
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data.choices[0].message.content);
                defReceita(data.choices[0].message.content)
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                defLoad(false);
            })
    }

    return (
        <ScrollView>
            <View style={ESTILOS.container}>
                <StatusBar barStyle="dark-content" translucent={true} backgroundColor="#F1F1F1" />
                <Text style={ESTILOS.header}>Livros</Text>
                <View style={ESTILOS.form}>
                    <Text style={ESTILOS.label}>Insira as informações abaixo:</Text>
                    <TextInput
                        placeholder="Gênero"
                        style={ESTILOS.input}
                        value={ingr1}
                        onChangeText={(texto) => defIngr1(texto)}
                    />
                    <TextInput
                        placeholder="Ator"
                        style={ESTILOS.input}
                        value={ingr2}
                        onChangeText={(texto) => defIngr2(texto)}
                    />
                    <TextInput
                        placeholder="Ano"
                        style={ESTILOS.input}
                        value={ingr3}
                        onChangeText={(texto) => defIngr3(texto)}
                    />
                    <TextInput
                        placeholder="Classificações"
                        style={ESTILOS.input}
                        value={ingr4}
                        onChangeText={(texto) => defIngr4(texto)}
                    />
                    <TextInput
                        placeholder="Nível de Popularidade"
                        style={ESTILOS.input}
                        value={ocasiao}
                        onChangeText={(texto) => defOcasiao(texto)}
                    />
                </View>

                <TouchableOpacity style={ESTILOS.button} onPress={gerarReceita}>
                    <Text style={ESTILOS.buttonText}>Gerar Livro 📖</Text>
                </TouchableOpacity>

                <ScrollView contentContainerStyle={{ paddingBottom: 24, marginTop: 4, }} style={ESTILOS.containerScroll} showsVerticalScrollIndicator={false} >
                    {load && (
                        <View style={ESTILOS.content}>
                            <Text style={ESTILOS.title}>Procurando livro...</Text>
                            <ActivityIndicator color="#000" size="large" />
                        </View>
                    )}

                    {receita && (
                        <View style={ESTILOS.content}>
                            <Text style={ESTILOS.title}>Livro sugerido 👇</Text>
                            <Text style={{ lineHeight: 24 }}>{receita} </Text>
                        </View>
                    )}
                </ScrollView>
            </View>
        </ScrollView>
    );
}

const ESTILOS = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
        paddingTop: 20,
    },
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        paddingTop: Platform.OS === 'android' ? alturaStatusBar : 54
    },
    form: {
        backgroundColor: '#FFF',
        width: '90%',
        borderRadius: 8,
        padding: 16,
        marginTop: 16,
        marginBottom: 8,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#94a3b8',
        padding: 8,
        fontSize: 16,
        marginBottom: 16,
    },
    button: {
        backgroundColor: 'red',
        width: '90%',
        borderRadius: 8,
        flexDirection: 'row',
        padding: 14,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    buttonText: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold'
    },
    content: {
        backgroundColor: '#FFF',
        padding: 16,
        width: '100%',
        marginTop: 16,
        borderRadius: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 14
    },
    containerScroll: {
        width: '90%',
        marginTop: 8,
    }
});