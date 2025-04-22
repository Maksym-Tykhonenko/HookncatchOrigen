import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  Alert,
  Pressable,
  Modal,
  Linking,
  ImageBackground
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {TabContext} from './navigation';
import FishHook from '../../assets/svg/fish-hook.svg';
import Fish from '../../assets/svg/fish.svg';
import Avatar from '../../assets/svg/avatar.svg';
import Pensil from '../../assets/svg/pencil.svg';
import SmallPencil from '../../assets/svg/small-pencil.svg';
import ArrowRight from '../../assets/svg/arrow-right.svg';
import Bag from '../../assets/svg/bag.svg';
import MusicNote from '../../assets/svg/music-note.svg';
import Support from '../../assets/svg/support.svg';
import On from '../../assets/svg/on.svg';
import Off from '../../assets/svg/off.svg';
import ArrowDown from '../../assets/svg/arrow-down.svg';
import {launchImageLibrary} from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile({navigation}: any) {
  const {routeName, setRouteName} = useContext(TabContext);
  const {coins, setCoins} = useContext(TabContext);
  const [isMusic, setIsMusic] = useState(true);
  const [isResetModal, setIsResetModal] = useState(false);
  const [imageUri, setImageUri] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('Female');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showSelectedDate, setShowSelectedDate] = useState<boolean>(false);
  const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        try {
          const files = await RNFS.readDir(RNFS.DocumentDirectoryPath);
          const targetFile = files.find(file => file.name === 'avatar.jpg');
          if (targetFile) {
            setImageUri(targetFile.path);
          } else {
            console.log(`File 'avatar.jpg' not found.`);
          }

          const nameAsync = await AsyncStorage.getItem('name');
          setName(nameAsync ? JSON.parse(nameAsync) : '');

          const lastNameAsync = await AsyncStorage.getItem('last-name');
          setLastName(lastNameAsync ? JSON.parse(lastNameAsync) : '');

          const genderAsync = await AsyncStorage.getItem('gender');
          setGender(genderAsync ? JSON.parse(genderAsync) : 'Female');

          const dateAsync = await AsyncStorage.getItem('date');
          if (dateAsync) {
            try {
              const parsedDate = JSON.parse(dateAsync);
              setSelectedDate(new Date(parsedDate));
              setShowSelectedDate(true);
            } catch (error) {
              console.error('Error parsing date from AsyncStorage:', error);
              setSelectedDate(new Date());
            }
          } else {
            setSelectedDate(new Date());
            setShowSelectedDate(false);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      fetchData();
    }, []),
  );

  const saveAlert = () => {
    Alert.alert(
      'Your data is saved',
      '',
      [
        {
          text: 'Ok',
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };

  const saveData = async () => {
    saveAlert();
    await AsyncStorage.setItem('name', JSON.stringify(name));
    await AsyncStorage.setItem('last-name', JSON.stringify(lastName));
    await AsyncStorage.setItem('gender', JSON.stringify(gender));
    await AsyncStorage.setItem('date', JSON.stringify(selectedDate));
  };

  const resetData = async () => {
    setIsButtonPressed(false);
    setIsResetModal(false);
    setImageUri('');
    setGender('Female');
    setName('');
    setLastName('');
    setShowSelectedDate(false);
    await AsyncStorage.setItem('name', JSON.stringify(''));
    await AsyncStorage.setItem('last-name', JSON.stringify(''));
    await AsyncStorage.setItem('gender', JSON.stringify('Female'));
    await AsyncStorage.setItem('date', JSON.stringify(new Date()));
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleDatePickerConfirm = async (date: Date) => {
    await AsyncStorage.setItem('date', JSON.stringify(date));
    hideDatePicker();
    setSelectedDate(date);
    setShowSelectedDate(true);
  };

  const showAlert = () => {
    Alert.alert(
      'What is your gender?',
      '',
      [
        {
          text: 'Female',
          onPress: () => {
            setGender('Female');
          },
        },
        {
          text: 'Male',
          onPress: () => {
            setGender('Male');
          },
        },
        {
          text: 'Other',
          onPress: () => {
            setGender('Other');
          },
        },
      ],
      {cancelable: false},
    );
  };

  const saveImage = async (uri: string, type: string) => {
    try {
      const fileName =
        type === 'avatar' ? 'avatar.jpg' : `image_${Date.now()}.jpg`;
      const destinationPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

      await RNFS.copyFile(uri, destinationPath);
      await RNFS.readDir(RNFS.DocumentDirectoryPath);
    } catch (error) {
      console.log('Error saving image:', error);
    }
  };

  const pickImage = (type: string) => {
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
        setImageUri(selectedImage.uri);
        saveImage(selectedImage.uri, type);
      }
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground style={{ flex: 1 }} source={require('../../assets/bg.png')}>
      
      <View style={styles.header}>
        <Fish width={56} height={56} />
        <View style={styles.coinsContainer}>
          <FishHook />
          <Text style={styles.coinsText}>{coins}</Text>
        </View>
      </View>
      <ScrollView
        style={{
          flex: 1,
        }}
        showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.avatarContainer}
          activeOpacity={0.7}
          onPress={() => {
            pickImage('avatar');
          }}>
          {!imageUri ? (
            <Avatar />
          ) : (
            <Image
              source={{uri: imageUri}}
              style={{
                width: 120,
                height: 120,
                borderRadius: 100,
              }}
            />
          )}
          <View
            style={{
              psition: 'absolute',
              bottom: 30,
              left: 40,
            }}>
            <Pensil />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.arrowButton}
          activeOpacity={0.7}
          onPress={() => Linking.openURL('mailto:aneckogri@gmail.com')}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Support />
            <Text style={styles.arrowButtonText}>Support</Text>
          </View>
          <ArrowRight />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.arrowButton}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Inventory')}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Bag />
            <Text style={styles.arrowButtonText}>Inventory</Text>
          </View>
          <ArrowRight />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.arrowButton}
          activeOpacity={0.7}
          onPress={() => setIsMusic(!isMusic)}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MusicNote />
            <Text style={styles.arrowButtonText}>Music</Text>
          </View>
          {isMusic ? <On /> : <Off />}
        </TouchableOpacity>
        <Text style={styles.bigText}>User info</Text>
        <View>
          <TextInput
            style={styles.textInput}
            value={name}
            placeholder="Name"
            onChangeText={(value: string) => setName(value)}
            placeholderTextColor={'#042024'}
          />
          <SmallPencil
            style={{
              position: 'absolute',
              right: 10,
              bottom: 30,
            }}
          />
        </View>
        <View>
          <TextInput
            style={styles.textInput}
            value={lastName}
            placeholder="Last Name"
            onChangeText={(value: string) => setLastName(value)}
            placeholderTextColor={'#042024'}
          />
          <SmallPencil
            style={{
              position: 'absolute',
              right: 10,
              bottom: 30,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{width: '45%'}}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.textInput}
              onPress={() => {
                setDatePickerVisible(true);
              }}>
              <Text
                style={{
                  color: '#042024',
                }}>
                {showSelectedDate
                  ? moment(selectedDate).format('DD/MM/YY')
                  : 'DD/MM/YY'}
              </Text>
            </TouchableOpacity>
            <SmallPencil
              style={{
                position: 'absolute',
                right: 10,
                bottom: 30,
              }}
            />
          </View>
          <View style={{width: '45%'}}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.textInput}
              onPress={() => {
                showAlert();
              }}>
              <Text>{gender}</Text>
            </TouchableOpacity>
            <ArrowDown
              style={{
                position: 'absolute',
                right: 10,
                bottom: 30,
              }}
            />
          </View>
        </View>
        <Pressable
          style={[
            styles.buttonSave,
            {
              backgroundColor: isButtonPressed ? '#99999933' : '#E0941A',
              borderColor: isButtonPressed ? '#999999' : '#E0941A',
            },
          ]}
          onPressIn={() => setIsButtonPressed(true)}
          onPressOut={() => setIsButtonPressed(false)}
          onPress={() => saveData()}>
          <Text
            style={[
              styles.buttonSaveText,
              {color: isButtonPressed ? '#999999' : '#F4F4F4'},
            ]}>
            Save data
          </Text>
        </Pressable>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.buttonSave,
            {
              backgroundColor: '#99999933',
              borderColor: '#999999',
              marginBottom: 20,
            },
          ]}
          onPress={() => {
            setIsResetModal(true);
          }}>
          <Text style={[styles.buttonSaveText, {color: '#999999'}]}>Reset</Text>
        </TouchableOpacity>
        {isResetModal && (
          <Modal animationType="slide" transparent={true}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalText}>
                  Are you sure that you want to reset all data?
                </Text>
                <View style={styles.fishContainer}></View>
                <Pressable
                  style={[
                    styles.buttonSave,
                    {
                      backgroundColor: isButtonPressed
                        ? '#99999933'
                        : '#E0941A',
                      borderColor: isButtonPressed ? '#999999' : '#E0941A',
                    },
                  ]}
                  onPressIn={() => setIsButtonPressed(true)}
                  onPressOut={() => setIsButtonPressed(false)}
                  onPress={() => resetData()}>
                  <Text
                    style={[
                      styles.buttonSaveText,
                      {color: isButtonPressed ? '#999999' : '#F4F4F4'},
                    ]}>
                    Rest
                  </Text>
                </Pressable>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[
                    styles.buttonSave,
                    {backgroundColor: '#99999933', borderColor: '#999999'},
                  ]}
                  onPress={() => {
                    setIsResetModal(false);
                  }}>
                  <Text style={[styles.buttonSaveText, {color: '#999999'}]}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </ScrollView>
      <DateTimePickerModal
        date={new Date(selectedDate)}
        isVisible={datePickerVisible}
        mode="date"
        onConfirm={handleDatePickerConfirm}
        onCancel={hideDatePicker}
        display="spinner"
      /></ImageBackground>
    </View>
  );
}

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
  },
  coinsText: {
    fontSize: 18,
    fontWeight: 600,
    color: '#042024',
  },
  avatarContainer: {
    alignItems: 'center',
  },
  arrowButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFDFD',
    height: 56,
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 20,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#D9D9D9',
  },
  arrowButtonText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#042024',
  },
  bigText: {
    fontWeight: 600,
    fontSize: 24,
    color: '#042024',
    textTransform: 'uppercase',
    marginVertical: 20,
  },
  textInput: {
    borderBottomWidth: 1,
    borderColor: '#042024',
    padding: 10,
    marginBottom: 20,
  },
  buttonSave: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 18,
    borderRadius: 30,
    borderWidth: 1,
    marginTop: 20,
  },
  buttonSaveText: {
    fontSize: 18,
    fontWeight: 600,
    textTransform: 'uppercase',
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
    textAlign: 'center',
  },
});
