import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image,ImageBackground} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {TabContext} from './navigation';
import FishHook from '../../assets/svg/fish-hook.svg';
import Fish from '../../assets/svg/fish.svg';
import BackArrow from '../../assets/svg/back-arrow.svg';
import {FISH} from '../const/fish';

export default function Inventory({navigation}: any) {
  const {routeName, setRouteName} = useContext(TabContext);
  const {coins, setCoins} = useContext(TabContext);
  const {isKnowFish, setIsKnowFish} = useContext(TabContext);

  return (
    <View style={styles.container}>
      <ImageBackground style={{ flex: 1 }} source={require('../../assets/bg.png')}>
      
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}>
          <BackArrow />
        </TouchableOpacity>
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
      <Text style={styles.title}>Inventory</Text>
      <View style={styles.fishesContainer}>
        <View style={styles.grid}>
          {FISH.map((item, index) => (
            <View
              key={index}
              style={[
                styles.gridItem,
                {
                  backgroundColor: isKnowFish[index] ? '#D9F2F7' : '#006B81',
                },
              ]}>
              <Image
                source={isKnowFish[item.id] ? item.know : item.dontknow}
                resizeMode="contain"
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </View>
          ))}
        </View>
      </View></ImageBackground>
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
    textAlign: 'center',
    marginVertical: 20,
  },
  fishesContainer: {
    backgroundColor: '#69A8C5',
    borderWidth: 4,
    borderColor: '#006B81',
    borderRadius: 20,
    padding: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '32.5%',
    height: undefined,
    aspectRatio: 1,
    margin: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
});
