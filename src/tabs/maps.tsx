import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Pressable,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import ModalComponent from 'react-native-modal';
import Fish from '../../assets/svg/fish.svg';
import FishHook from '../../assets/svg/fish-hook.svg';
import BackArrow from '../../assets/svg/back-arrow.svg';
import Line from '../../assets/svg/line.svg';
import Pint from '../../assets/svg/point.svg';
import {TabContext} from './navigation';
import {useNavigation} from '@react-navigation/native';

export default function Maps() {
  const navigation = useNavigation();
  const {coins, setCoins} = useContext(TabContext);
  const [activeSpot, setActiveSpot] = useState<number>(0);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [textInputText, setTextInputText] = useState('');

  const spots = [
    {
      id: 1,
      name: 'Lake Superior',
      coordinate: {latitude: 47.7, longitude: -87.5},
    },
    {
      id: 2,
      name: 'Lake Michigan',
      coordinate: {latitude: 44.0, longitude: -87.0},
    },
    {id: 3, name: 'Lake Huron', coordinate: {latitude: 44.5, longitude: -82.5}},
    {id: 4, name: 'Lake Erie', coordinate: {latitude: 42.2, longitude: -81.2}},
    {
      id: 5,
      name: 'Lake Ontario',
      coordinate: {latitude: 43.7, longitude: -78.0},
    },
  ];

  const handleSubmit = () => {
    setTextInputText('');
    Alert.alert('Yor comment sent!');
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 44.5,
          longitude: -85.0,
          latitudeDelta: 8.0,
          longitudeDelta: 8.0,
        }}>
        <View style={styles.header}>
          <Pressable
            onPress={() => {
              navigation.navigate('Home');
            }}>
            <BackArrow />
          </Pressable>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Fish width={56} height={56} />
            <View style={styles.coinsContainer}>
              <FishHook />
              <Text style={styles.coinsText}>{coins}</Text>
            </View>
          </View>
        </View>
        {spots.map(spot => (
          <Marker
            key={spot.id}
            coordinate={spot.coordinate}
            onPress={() => {
              setActiveSpot(spot.id);
              setSelectedMarker(spot);
              setModalVisible(true);
            }}>
            <View>
              <Image
                source={
                  activeSpot === spot.id
                    ? require('../../assets/png/active-spot.png')
                    : require('../../assets/png/spot.png')
                }
              />
              <Text>{spot.name}</Text>
            </View>
          </Marker>
        ))}
      </MapView>
      <ModalComponent
        isVisible={isModalVisible}
        onBackdropPress={() => {
          setModalVisible(false);
          setActiveSpot(0);
        }}
        style={styles.modal}>
        <View style={[styles.modalContent, {height: '80%'}]}>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Line />
          </View>
          <Text style={styles.modalTitle}>{selectedMarker?.name}</Text>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Pint />
            <Text style={styles.pointText}>1,4 km near you</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 15,
            }}>
            <View
              style={{
                width: '47%',
              }}>
              <Image
                style={{width: '100%'}}
                resizeMode="contain"
                source={require('../../assets/png/fish-img-1.png')}
              />
            </View>
            <View
              style={{
                width: '47%',
              }}>
              <Image
                style={{width: '100%'}}
                resizeMode="contain"
                source={require('../../assets/png/fish-img-2.png')}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 15,
            }}>
            <View
              style={{
                width: '47%',
              }}>
              <Image
                style={{width: '100%'}}
                resizeMode="contain"
                source={require('../../assets/png/fish-img-3.png')}
              />
            </View>
            <View
              style={{
                width: '47%',
              }}>
              <Image
                style={{width: '100%'}}
                resizeMode="contain"
                source={require('../../assets/png/fish-img-4.png')}
              />
            </View>
          </View>
          <Text style={styles.modalText}>Spotted fish</Text>
          <View>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
              <View>
                <View
                  style={{
                    width: 155,
                    height: 71,
                    marginRight: 15,
                  }}>
                  <Image
                    style={{width: '100%'}}
                    resizeMode="contain"
                    source={require('../../assets/png/scroll-fish-1.png')}
                  />
                </View>
                <Text style={styles.fishText}>Redear Sunfish</Text>
              </View>
              <View>
                <View
                  style={{
                    width: 155,
                    height: 71,
                    marginRight: 15,
                  }}>
                  <Image
                    style={{width: '100%'}}
                    resizeMode="contain"
                    source={require('../../assets/png/scroll-fish-2.png')}
                  />
                </View>
                <Text style={styles.fishText}>Wels Catfish</Text>
              </View>
              <View>
                <View
                  style={{
                    width: 155,
                    height: 71,
                    marginRight: 15,
                  }}>
                  <Image
                    style={{width: '100%'}}
                    resizeMode="contain"
                    source={require('../../assets/png/scroll-fish-3.png')}
                  />
                </View>
                <Text style={styles.fishText}>Brown Trout</Text>
              </View>
            </ScrollView>
          </View>
          <Text style={[styles.pointText, {fontSize: 14, marginTop: 20}]}>
            Your comment
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={(value: string) => setTextInputText(value)}
            value={textInputText}
            placeholder="Write here"
            multiline
            onSubmitEditing={handleSubmit}
            returnKeyType="done"
            onKeyPress={({nativeEvent}) => {
              if (nativeEvent.key === 'Enter') {
                setTextInputText('');
                handleSubmit();
              }
            }}
          />
        </View>
      </ModalComponent>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //backgroundColor: '#D9F2F7',
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
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
  map: {
    flex: 1,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 600,
    marginBottom: 10,
    marginTop: 30,
    color: '#042024',
    textTransform: 'uppercase',
  },
  closeButton: {
    color: 'blue',
    marginTop: 10,
  },
  pointText: {
    color: 'rgba(4, 32, 36, 0.6)',
    marginLeft: 3,
    fontSize: 12,
    marginBottom: 30,
  },
  modalText: {
    fontSize: 20,
    fontWeight: 500,
    color: '#042024',
    marginBottom: 15,
  },
  fishText: {
    fontSize: 14,
    fontWeight: 500,
    color: '#042024',
    marginTop: 5,
    textAlign: 'center',
    marginLeft: -10,
  },
  input: {
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 30,
    height: 100,
    marginTop: -20,
    padding: 15,
  },
});
