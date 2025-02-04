import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import Fish from '../../assets/svg/fish.svg';
import Logo from '../../assets/svg/logo.svg';

export default function Start({ navigation }: any) {
  const [isButtonPressed, setIsButtonPressed] = useState(false)
  return (
    <View
      style={styles.container}
    >
      <Image 
        source={require('../../assets/png/start-bg.png')}
        resizeMode='contain'
        style={styles.img}
      />
      <View
        style={styles.section}
      >
        <Fish  />
        <Logo marginTop={20} />
        <Text style={styles.text}>
          Dive into the thrill of fishing! 🎣 Catch unique fish, explore scenic spots, and compete for epic rewards in Hook’n’Catch!
        </Text>
        <Pressable 
          style={[styles.button, {backgroundColor: isButtonPressed ? '#99999933' : '#E0941A', borderColor: isButtonPressed ? '#999999' : '#E0941A'}]}
          onPressIn={() => setIsButtonPressed(true)}
          onPressOut={() => setIsButtonPressed(false)}
          onPress={() => navigation.navigate('Tabs')}
        >
          <Text style={[styles.buttonText, {color: isButtonPressed ? '#999999' : '#F4F4F4'}]}>
            GET STARTED
          </Text>
        </Pressable>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D9F2F7',
    flex: 1
  },
  img: {
    width: '100%',
    marginTop: -20,
  },
  section: {
    alignItems: 'center',
    marginTop: -55,
    paddingHorizontal: 20,
  },
  text: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 16,
  },
  button: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 18,
    borderRadius: 30,
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 600,
  }
})