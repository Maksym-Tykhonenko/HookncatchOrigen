import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable, Image, Modal } from 'react-native';
import { FISH } from '../const/fish';

export default function QuizSeven(props: any) {
  const [isButton1, setIsButton1] = useState<boolean>(false)
  const [isButton2, setIsButton2] = useState<boolean>(false)
  const [isButton3, setIsButton3] = useState<boolean>(false)
  const [isButton4, setIsButton4] = useState<boolean>(false)
  const [isButtonPressed, setIsButtonPressed] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [fish, setFish] = useState()

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Which fish is typically found in cold mountain rivers?
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
            source={require('../../assets/png/fish-9.png')} resizeMode='cover'
            style={{
              width: '100%',
              height: '60%',
            }}
          />
          <Text style={styles.buttonText}>
            European Perch
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
            source={require('../../assets/png/fish-4.png')} resizeMode='cover'
            style={{
              width: '100%',
              height: '40%',
            }}
          />
          <Text style={styles.buttonText}>
            Rainbow Trout
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
          onPress={() => {
            let arr = []
            for (let i = 0; i < props.isKnowFish.length; i++) {
              if (props.isKnowFish[i]) {
                arr.push(true);
              } else {
                arr.push(true);
                setFish(FISH[i].know);
                for (let j = 0; j < props.isKnowFish.length - i - 1; j++) {
                  arr.push(false);
                }
                props.setIsKnowFish(arr);
                break;
              }
            }
            setIsModalVisible(true)
            setIsButtonPressed(false)
          }}
        >
          <Text style={[styles.buttonTextContinue, {color: isButtonPressed ? '#999999' : '#F4F4F4'}]}>
            CONTINUE
          </Text>
        </Pressable>
      }
      {isModalVisible &&
        <Modal
          animationType="slide"
          transparent={true}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>
                🎉 Congratulations! 🎉
              </Text>
              <Text style={styles.modalText}>
                You've completed the quiz!
              </Text>
              <View
                style={styles.fishContainer}
              >
                <Image 
                  source={fish} 
                  resizeMode='contain'
                  style={{
                    width: '100%',
                  }}
                />
              </View>
                <Pressable 
                  style={[styles.buttonContinue, {backgroundColor: isButtonPressed ? '#99999933' : '#E0941A', borderColor: isButtonPressed ? '#999999' : '#E0941A'}]}
                  onPressIn={() => setIsButtonPressed(true)}
                  onPressOut={() => setIsButtonPressed(false)}
                  onPress={() => {
                    props.setCoins(props.coins + 50)
                    setIsModalVisible(false)
                    props.navigation.navigate('HomeStack')
                    props.setQuestion(0)
                  }}
                >
                  <Text style={[styles.buttonTextContinue, {color: isButtonPressed ? '#999999' : '#F4F4F4'}]}>
                    CONTINUE
                  </Text>
                </Pressable>
            </View>
          </View>
        </Modal>
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
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 300,
    padding: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 22,
    marginBottom: 5,
    color: '#042024',
    textAlign: 'center'
  },
  fishContainer: {
    backgroundColor: '#D9F2F7',
    borderWidth: 2,
    borderColor: '#006B81',
    width: 164,
    height: 164,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    padding: 20,
    marginTop: 10,
  }
})