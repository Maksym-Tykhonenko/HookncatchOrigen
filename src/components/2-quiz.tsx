import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable  } from 'react-native';

export default function QuizOne(props: any) {
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
        What time of day do you usually fish?
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <TouchableOpacity 
          style={[styles.button, {backgroundColor: isButton1 ? '#1AE0D0' : '#F4F4F4'}]}
          onPress={() => {
            setIsButton1(!isButton1)
          }}
        >
          <Text>
            Early morning
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, {backgroundColor: isButton2 ? '#1AE0D0' : '#F4F4F4'}]}
          onPress={() => {
            setIsButton2(!isButton2)
          }}
        >
          <Text>
            Midday
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
          style={[styles.button, {backgroundColor: isButton3 ? '#1AE0D0' : '#F4F4F4'}]}
          onPress={() => {
            setIsButton3(!isButton3)
          }}
        >
          <Text>
            Afternoon
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, {backgroundColor: isButton4 ? '#1AE0D0' : '#F4F4F4'}]}
          onPress={() => {
            setIsButton4(!isButton4)
          }}
        >
          <Text>
            Evening
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
          style={[styles.button, {backgroundColor: isButton5 ? '#1AE0D0' : '#F4F4F4'}]}
          onPress={() => {
            setIsButton5(!isButton5)
          }}
        >
          <Text>
            Night
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, {backgroundColor: isButton6 ? '#1AE0D0' : '#F4F4F4'}]}
          onPress={() => {
            setIsButton6(!isButton6)
          }}
        >
          <Text>
            Anytime
          </Text>
        </TouchableOpacity>
      </View>
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
    width: '45%',
    backgroundColor: '#F4F4F4',
    height: 101,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20
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