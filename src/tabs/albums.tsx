import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal, TextInput, Button,ImageBackground } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { TabContext } from './navigation';
import FishHook from '../../assets/svg/fish-hook.svg';
import Fish from '../../assets/svg/fish.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Albums({ navigation }: any) {
  const { routeName, setRouteName } = useContext(TabContext);
  const { coins, setCoins } = useContext(TabContext);
  const { isKnowFish, setIsKnowFish } = useContext(TabContext);

  const [albums, setAlbums] = useState<string[]>([]);
  const [newAlbum, setNewAlbum] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      // setRouteName('album')
      async function fetchData() {
        try {
          const storedAlbums = await AsyncStorage.getItem('albums');
          if (storedAlbums) {
            setAlbums(JSON.parse(storedAlbums));
          } else {
            setAlbums([]);
          }
        } catch (error) {
          console.error('Error fetching albums:', error);
          setAlbums([]);
        }
      }
      fetchData();
    }, [setRouteName]) 
  );

  useEffect(() => {
    async function saveData() {
      try {
        await AsyncStorage.setItem('albums', JSON.stringify(albums));
      } catch (error) {
        console.error('Error saving albums:', error);
      }
    }

    if (albums.length > 0) {
      saveData();
    }
  }, [albums]);

  return (
    <View style={styles.container}>
      <ImageBackground style={{ flex: 1 }} source={require('../../assets/bg.png')}>
      
      <View style={styles.header}>
        <Fish width={56} height={56} />
        <View style={styles.coinsContainer}>
          <FishHook />
          <Text style={styles.coinsText}>
            {coins}
          </Text>
        </View>
      </View>
      <ScrollView
        style={{
          flex: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={styles.title}
        >
          Your Album
        </Text>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            style={{width: '45%'}}
            onPress={() => setIsModalVisible(true)}
          >
            <Image 
              source={require('../../assets/png/add-album.png')}
              style={{
                width: '100%',
              }}
              resizeMode='contain'
            />
          </TouchableOpacity>
          {albums.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.7}
                style={{width: '45%'}}
                onPress={() => navigation.navigate('Album', { albumName: item })}
              >
                <ImageBackground
                  source={require('../../assets/png/album.png')}
                  style={{
                    width: '100%',
                    height: undefined,
                    aspectRatio: 1,
                    marginTop: -15,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                  resizeMode='contain'
                >
                  <Text
                    style={styles.albumText}
                  >
                    {item}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            )
          })}
          {albums.length === 0 &&
            <View style={{width: '45%'}} />
          }
        </View>
      </ScrollView>
      <Modal
        transparent
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Enter a new album name:</Text>
            <TextInput
              style={styles.textInput}
              value={newAlbum}
              onChangeText={setNewAlbum}
              placeholder="Type here..."
            />
            <View style={styles.buttonContainer}>
              <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
              <Button 
                title="Confirm"
                onPress={async() => {
                  setIsModalVisible(false)
                  setAlbums((prevAlbums) => [...prevAlbums, newAlbum]);
                  setNewAlbum('')
                }}
              />
            </View>
          </View>
        </View>
      </Modal></ImageBackground>
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
    backgroundColor: '#E2EBEE'
  },
  coinsText: {
    fontSize: 18,
    fontWeight: 600,
    color: '#042024'
  },
  title: {
    color: '#042024',
    fontSize: 33,
    fontWeight: 500,
    textTransform: 'uppercase',
    marginVertical: 20,
  },
  albumText: {
    color: '#042024',
    fontSize: 16,
    fontWeight: 600,
    textTransform: 'uppercase',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})