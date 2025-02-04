import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable, Dimensions  } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function QuizFour(props: any) {
  const [isButton1, setIsButton1] = useState<boolean>(false)
  const [isButton2, setIsButton2] = useState<boolean>(false)
  const [isButton3, setIsButton3] = useState<boolean>(false)
  const [isButton4, setIsButton4] = useState<boolean>(false)
  const [isButton5, setIsButton5] = useState<boolean>(false)
  const [isButton6, setIsButton6] = useState<boolean>(false)
  const [isButtonPressed, setIsButtonPressed] = useState(false)

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        What is your favorite fishing method?
      </Text>
      <TouchableOpacity 
        style={[
          styles.button,
          {
            backgroundColor: isButton1 ? '#1AE0D0' : '#F4F4F4',
            top: height * 0.2,
            left: width * 0.01,
          }
        ]}
        onPress={() => {
          setIsButton1(!isButton1)
        }}
      >
        <Text>
          Netting
        </Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[
          styles.button,
          {
            backgroundColor: isButton2 ? '#1AE0D0' : '#F4F4F4',
            top: height * 0.3,
            left: width * 0.6,
          }
        ]}
        onPress={() => {
          setIsButton2(!isButton2)
        }}
      >
        <Text>
          Spinning
        </Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[
          styles.button,
          {
            backgroundColor: isButton3 ? '#1AE0D0' : '#F4F4F4',
            top: height * 0.38,
            left: width * 0.2,
          }
        ]}
        onPress={() => {
          setIsButton3(!isButton3)
        }}
      >
        <Text>
          Bottom fishing
        </Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[
          styles.button,
          {
            backgroundColor: isButton4 ? '#1AE0D0' : '#F4F4F4',
            top: height * 0.15,
            left: width * 0.6,
          }
        ]}
        onPress={() => {
          setIsButton4(!isButton4)
        }}
      >
        <Text>
          Float fishing
        </Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[
          styles.button,
          {
            backgroundColor: isButton5 ? '#1AE0D0' : '#F4F4F4',
            top: height * 0.1,
            left: width * 0.3,
          }
        ]}
        onPress={() => {
          setIsButton5(!isButton5)
        }}
      >
        <Text>
          Bare hands
        </Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[
          styles.button,
          {
            backgroundColor: isButton6 ? '#1AE0D0' : '#F4F4F4',
            top: height * 0.25,
            left: width * 0.3,
          }]}
        onPress={() => {
          setIsButton6(!isButton6)
        }}
      >
        <Text>
          Sonar fishing
        </Text>
      </TouchableOpacity>
      {(isButton1 || isButton2 || isButton3 || isButton4 || isButton5 || isButton6) &&
        <Pressable 
          style={[styles.buttonContinue, {backgroundColor: isButtonPressed ? '#99999933' : '#E0941A', borderColor: isButtonPressed ? '#999999' : '#E0941A'}]}
          onPressIn={() => setIsButtonPressed(true)}
          onPressOut={() => setIsButtonPressed(false)}
          onPress={() => props.setQuestion(props.question + 1)}
      >
        <Text style={[styles.buttonText, {color: isButtonPressed ? '#999999' : '#F4F4F4'}]}>
          CONTINUE
        </Text>
      </Pressable>
      }
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    color: '#042024',
    textTransform: 'uppercase',
    marginBottom: 30,
  },
  button: {
    width: 110,
    backgroundColor: '#F4F4F4',
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
    borderColor: '#042024',
    position: 'absolute',
  },
  buttonContinue: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 18,
    borderRadius: 30,
    borderWidth: 1,
    marginTop: 20,
    position: 'absolute',
    bottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 600,
  }
})