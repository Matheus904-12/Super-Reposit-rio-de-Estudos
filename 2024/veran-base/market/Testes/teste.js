import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const PersonalDataScreen = () => {
  const navigation = useNavigation();
  const fadeInCardOpacity = useSharedValue(0);

  const fadeInCardStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeInCardOpacity.value,
    };
  });

  React.useEffect(() => {
    fadeInCardOpacity.value = withTiming(1, { duration: 1500 });
  }, []);

  const data = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Details')} style={styles.cardContainer}>
        <Animated.View style={[styles.card, fadeInCardStyle]}>
          <BarChart
            data={data}
            width={300}
            height={150}
            yAxisSuffix="k"
            chartConfig={{
              backgroundGradientFrom: '#5A1217',
              backgroundGradientTo: '#5A1217',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 15,
              },
            }}
            style={{ marginVertical: 8, borderRadius: 15 }}
          />
        </Animated.View>
      </TouchableOpacity>
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
  cardContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  card: {
    width: 300,
    height: 150,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PersonalDataScreen;


editable={!email} // Não permitir edição se o email já estiver preenchido