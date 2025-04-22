import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image,ImageBackground } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { TabContext } from './navigation';
import FishHook from '../../assets/svg/fish-hook.svg';
import Fish from '../../assets/svg/fish.svg';
import BackArrow from '../../assets/svg/back-arrow.svg';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Album({ navigation, route}: any) {
  const { albumName } = route.params;
  const { routeName, setRouteName } = useContext(TabContext);
  const { coins, setCoins } = useContext(TabContext);

  const [imageUri, setImageUri] = useState<string[]>([])


  useFocusEffect(
    React.useCallback(() => {
      // setRouteName('album')
      async function fetchData() {
        const storedImages = await AsyncStorage.getItem(albumName);
        if (storedImages) {
          setImageUri(JSON.parse(storedImages));
        } else {
          setImageUri([]);
        }
      }
      fetchData();
    }, [albumName])
  );

  useEffect(() => {
    async function saveData() {
      await AsyncStorage.setItem(albumName, JSON.stringify(imageUri));
    }
    saveData();
  }, [imageUri, albumName]);

  const pickImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
    };

    launchImageLibrary(options, (response: any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];
        setImageUri((prev) => [...prev, selectedImage.uri]);
      }
    });
  };

  return (
    <View style={{ flex: 1, marginHorizontal: 20 }}>
      <ImageBackground style={{ flex: 1 }} source={require('../../assets/bg.png')}>
      
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <BackArrow />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Fish width={56} height={56} />
          <View style={styles.coinsContainer}>
            <FishHook />
            <Text style={styles.coinsText}>
              {coins}
            </Text>
          </View>
        </View>
      </View>
      <Text
        style={styles.title}
      >
        {albumName}
      </Text>
      <TouchableOpacity
        onPress={() => pickImage()}
        style={styles.addPhoto}
        activeOpacity={0.7}
      >
        <Text
          style={styles.addPhotoText}
        >
          add photo +
        </Text>
      </TouchableOpacity>
      {imageUri &&
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        {imageUri.map((item, index) => {
          return (
            <View
              key={index}
              style={{ 
                width: '45%',
              }}
            >
              <Image
                source={{ uri: item }}
                style={{ 
                  width: '100%',
                  height: undefined,
                  aspectRatio: 1,
                  borderRadius: 20,
                  marginBottom: 20,
                }}
              />
            </View>
          )
        })}
      </View>
        }
        </ImageBackground>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingHorizontal: 20,
    //backgroundColor: '#D9F2F7',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coinsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#042024',
    height: 40,
    width: 83,
    justifyContent: 'center',
    backgroundColor: '#E2EBEE',
    marginLeft: 20,
  },
  coinsText: {
    fontSize: 18,
    fontWeight: 600,
    color: '#042024',
  },
  title: {
    color: '#042024',
    fontSize: 33,
    fontWeight: 500,
    textTransform: 'uppercase',
    marginVertical: 20,
  },
  addPhoto: {
    marginBottom: 20,
    backgroundColor: '#FFFDFD',
    padding: 20,
    borderRadius: 30,
  },
  addPhotoText: {
    color: '#042024',
    fontSize: 20,
    fontWeight: 500,
    textTransform: 'uppercase',
    textAlign: 'center'
  }
})