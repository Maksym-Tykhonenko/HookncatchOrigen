import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable  } from 'react-native';
import Check from '../../assets/svg/checkmark.svg';

export default function QuizSix(props: any) {
  const [isButton1, setIsButton1] = useState<boolean>(false)
  const [isButton2, setIsButton2] = useState<boolean>(false)
  const [isButton3, setIsButton3] = useState<boolean>(false)
  const [isButton4, setIsButton4] = useState<boolean>(false)
  const [isButtonPressed, setIsButtonPressed] = useState(false)

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Which of these fish is a well-known predator?
      </Text>
      <TouchableOpacity 
        style={[
          styles.button, 
          {
            backgroundColor: isButton1 ? '#E3FAF1' : '#F4F4F4', 
            borderColor: isButton1 && '#00935A',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center'
          }
        ]}
        onPress={() => {
          setIsButton1(!isButton1)
        }}
      >
        <Text>
          Redear
        </Text>
        {
          isButton1 &&
          <Check />
        }
      </TouchableOpacity>
      <TouchableOpacity 
        style={[
          styles.button, 
          {
            backgroundColor: isButton2 ? '#E3FAF1' : '#F4F4F4', 
            borderColor: isButton2 && '#00935A',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center'
          }
        ]}
        onPress={() => {
          setIsButton2(!isButton2)
        }}
      >
        <Text>
          Zander
        </Text>
        {
          isButton2 &&
          <Check />
        }
      </TouchableOpacity>
      <TouchableOpacity 
        style={[
          styles.button, 
          {
            backgroundColor: isButton3 ? '#E3FAF1' : '#F4F4F4', 
            borderColor: isButton3 && '#00935A',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center'
          }
        ]}
        onPress={() => {
          setIsButton3(!isButton3)
        }}
      >
        <Text>
          Carp
        </Text>
        {
          isButton3 &&
          <Check />
        }
      </TouchableOpacity>
      <TouchableOpacity 
        style={[
          styles.button, 
          {
            backgroundColor: isButton4 ? '#E3FAF1' : '#F4F4F4', 
            borderColor: isButton4 && '#00935A',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center'
          }
        ]}
        onPress={() => {
          setIsButton4(!isButton4)
        }}
      >
        <Text>
          Brown
        </Text>
        {
          isButton4 &&
          <Check />
        }
      </TouchableOpacity>
      {(isButton1 || isButton2 || isButton3 || isButton4) &&
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
    width: '100%',
    backgroundColor: '#F4F4F4',
    height: 65,
    marginBottom: 20,
    justifyContent: 'center',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#042024',
    paddingHorizontal: 20,
  },
  buttonContinue: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 18,
    borderRadius: 30,
    borderWidth: 1,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 600,
  }
})