import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {TabContext} from './navigation';
import FishHook from '../../assets/svg/fish-hook.svg';
import Fish from '../../assets/svg/fish.svg';
import Temp from '../../assets/svg/temperature.svg';
import BigHook from '../../assets/svg/big-hook.svg';
import {FISH} from '../const/fish';

export default function Home({navigation}: any) {
  const {routeName, setRouteName} = useContext(TabContext);
  const {coins, setCoins} = useContext(TabContext);
  const {isKnowFish, setIsKnowFish} = useContext(TabContext);

  // console.log(routeName);

  // React.useEffect(() => {
  //   setRouteName('home');
  // }, []);

  return (
    <View style={styles.container}>
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
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Quiz')}>
          <ImageBackground
            source={require('../../assets/png/fish-bg.png')}
            resizeMode="cover"
            style={{
              width: '100%',
              height: undefined,
              aspectRatio: 1.67,
              marginBottom: 20,
            }}>
            <View style={styles.imgContainer}>
              <View style={styles.hookContainer}>
                <BigHook />
                <View style={{marginLeft: 10}}>
                  <Text style={styles.hookText}>Quiz & Win!</Text>
                  <Text style={styles.hookTextSmall}>
                    Click to start the challenge
                  </Text>
                </View>
              </View>
              <View>
                <Text style={styles.bigText}>CATCH ONE!</Text>
                <Text style={[styles.hookText, {fontSize: 10}]}>
                  Complete our fun quiz and win a unique fish as your prize!
                  Don’t miss your chance to add this special reward to your
                  collection. Start the quiz now and see what awaits you!
                </Text>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <Text style={[styles.bigText, {color: '#042024', marginBottom: 25}]}>
          FISH CATALOG:
        </Text>
        {FISH.map((item: any) => {
          return (
            <TouchableOpacity
              activeOpacity={isKnowFish[item.id] ? 0.7 : 1}
              key={item.id}
              style={[
                styles.fishItem,
                {backgroundColor: isKnowFish[item.id] ? '#EFEBE4' : '#999999'},
              ]}
              onPress={() => navigation.navigate('Maps')}>
              <View>
                <Text style={styles.nameText}>
                  {isKnowFish[item.id] ? item.name : '???'}
                </Text>
                <Text
                  style={[
                    styles.nameText,
                    {fontSize: 14, fontWeight: 400, marginBottom: 50},
                  ]}>
                  {isKnowFish[item.id] ? item.description : '...'}
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Temp />
                  <Text
                    style={[styles.nameText, {fontSize: 14, fontWeight: 400}]}>
                    {isKnowFish[item.id] ? item.temp : '...'}°C
                  </Text>
                </View>
              </View>
              <View style={{position: 'absolute', right: 10}}>
                <Image
                  source={isKnowFish[item.id] ? item.know : item.dontknow}
                  resizeMode="containe"
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#D9F2F7',
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
  imgContainer: {
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  hookContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  hookText: {
    color: '#F4F4F4',
    fontSize: 12,
    fontWeight: 500,
  },
  hookTextSmall: {
    color: '#F4F4F4',
    fontSize: 8,
  },
  bigText: {
    color: '#F4F4F4',
    fontSize: 32,
    fontWeight: 600,
  },
  fishItem: {
    marginBottom: 20,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    height: 150,
    alignItems: 'center',
  },
  nameText: {
    color: '#042024',
    fontSize: 20,
    fontWeight: 500,
    marginBottom: 3,
  },
});
