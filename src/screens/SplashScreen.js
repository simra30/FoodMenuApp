import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';



export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Menu');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.splashContainer}>
      <Image source={require('../assets/unnamed.png')} style={styles.logo} />
      <Text style={styles.appName}>Food Menu App</Text>
      <ActivityIndicator size="large" color="tomato" />
    </View>
  );
}

const styles = StyleSheet.create({
    splashContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    logo: {
      width: 400,
      height: 400,
      marginBottom: 20,
    },
    appName: {
      fontSize: 28,
      color: 'tomato',
      marginBottom: 20,
      fontWeight: 'bold',
    },
   
  });
  