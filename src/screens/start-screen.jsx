import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Start({navigation}: any) {
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground style={{ flex: 1 }} source={require('../../assets/loader3.jpg')}>
        <ScrollView style={styles.container}>
      
          <View style={styles.section}>
            
            <Pressable
              style={[
                styles.button,
                {
                  backgroundColor: isButtonPressed ? '#99999933' : '#E0941A',
                  borderColor: isButtonPressed ? '#999999' : '#E0941A',
                },
              ]}
              onPressIn={() => setIsButtonPressed(true)}
              onPressOut={() => setIsButtonPressed(false)}
              onPress={() => navigation.navigate('Tabs')}>
              <Text
                style={[
                  styles.buttonText,
                  { color: isButtonPressed ? '#999999' : '#F4F4F4' },
                ]}>
                GET STARTED
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    //backgroundColor: '#D9F2F7',
    flex: 1,
  },
  img: {
    width: '100%',
    marginTop: -20,
  },
  section: {
    alignItems: 'center',
    marginTop: windowHeight * 0.8,
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
    marginBottom: 50,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 600,
  },
});
