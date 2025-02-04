import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable, Image  } from 'react-native';

export default function QuizFive(props: any) {
  const [isButton1, setIsButton1] = useState<boolean>(false)
  const [isButton2, setIsButton2] = useState<boolean>(false)
  const [isButton3, setIsButton3] = useState<boolean>(false)
  const [isButton4, setIsButton4] = useState<boolean>(false)
  const [isButtonPressed, setIsButtonPressed] = useState(false)

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Which of these fish can weigh over 200 kg?
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <TouchableOpacity 
          style={[
            styles.button,
            {
              backgroundColor: isButton1 ? '#E3FAF1' : '#F4F4F4',
              borderColor: isButton1 ? '#00935A' : '#F4F4F4',
            }
          ]}
          onPress={() => {
            setIsButton1(!isButton1)
          }}
        >
          <Image 
            source={require('../../assets/png/fish-2.png')} resizeMode='cover'
            style={{
              width: '100%',
              height: '30%',
            }}
          />
          <Text style={styles.buttonText}>
            Wels Catfish
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.button,
            {
              backgroundColor: isButton2 ? '#E3FAF1' : '#F4F4F4',
              borderColor: isButton2 ? '#00935A' : '#F4F4F4',
            }
          ]}
          onPress={() => {
            setIsButton2(!isButton2)
          }}
        >
          <Image 
            source={require('../../assets/png/fish-5.png')} resizeMode='cover'
            style={{
              width: '100%',
              height: '60%',
            }}
          />
          <Text style={styles.buttonText}>
            Zander (Pikeperch)
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <TouchableOpacity 
          style={[
            styles.button,
            {
              backgroundColor: isButton3 ? '#E3FAF1' : '#F4F4F4',
              borderColor: isButton3 ? '#00935A' : '#F4F4F4',
            }
          ]}
          onPress={() => {
            setIsButton3(!isButton3)
          }}
        >
          <Image 
            source={require('../../assets/png/fish-6.png')} resizeMode='cover'
            style={{
              width: '100%',
              height: '60%',
            }}
          />
          <Text style={styles.buttonText}>
            Common Carp
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.button,
            {
              backgroundColor: isButton4 ? '#E3FAF1' : '#F4F4F4',
              borderColor: isButton4 ? '#00935A' : '#F4F4F4',
            }
          ]}
          onPress={() => {
            setIsButton4(!isButton4)
          }}
        >
          <Image 
            source={require('../../assets/png/fish-7.png')} resizeMode='cover'
            style={{
              width: '100%',
              height: '40%',
            }}
          />
          <Text style={styles.buttonText}>
            Northern Pike
          </Text>
        </TouchableOpacity>
      </View>
      {(isButton1 || isButton2 || isButton3 || isButton4) &&
        <Pressable 
          style={[styles.buttonContinue, {backgroundColor: isButtonPressed ? '#99999933' : '#E0941A', borderColor: isButtonPressed ? '#999999' : '#E0941A'}]}
          onPressIn={() => setIsButtonPressed(true)}
          onPressOut={() => setIsButtonPressed(false)}
          onPress={() => props.setQuestion(props.question + 1)}
      >
        <Text style={[styles.buttonTextContinue, {color: isButtonPressed ? '#999999' : '#F4F4F4'}]}>
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
    width: '47%',
    backgroundColor: '#F4F4F4',
    height: 127,
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    padding: 10,
    borderWidth: 1,
  },
  buttonContinue: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 18,
    borderRadius: 30,
    borderWidth: 1,
    marginTop: 20,
  },
  buttonTextContinue: {
    fontSize: 18,
    fontWeight: 600,
  },
  buttonText: {
    position: 'absolute',
    bottom: -25,
  }
})