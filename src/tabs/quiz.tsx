import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {TabContext} from './navigation';
import FishHook from '../../assets/svg/fish-hook.svg';
import Fish from '../../assets/svg/fish.svg';
import QuizOne from '../components/1-quiz';
import QuizTwo from '../components/2-quiz';
import QuizThree from '../components/3-quiz';
import QuizFour from '../components/4-quiz';
import QuizFive from '../components/5-quiz';
import QuizSix from '../components/6-quiz';
import QuizSeven from '../components/7-quiz';

export default function Quiz({navigation}: any) {
  const {routeName, setRouteName} = useContext(TabContext);
  const {coins, setCoins} = useContext(TabContext);
  const {isKnowFish, setIsKnowFish} = useContext(TabContext);

  const totalQuestions = 7;

  const [question, setQuestion] = useState<number>(0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Fish width={56} height={56} />
        <View style={styles.coinsContainer}>
          <FishHook />
          <Text style={styles.coinsText}>{coins}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressBarFill,
              {width: `${((question + 1) / totalQuestions) * 100}%`},
            ]}
          />
        </View>
      </View>
      <Text style={styles.text}>QUESTION:</Text>
      {question === 0 ? (
        <QuizOne setQuestion={setQuestion} question={question} />
      ) : question === 1 ? (
        <QuizTwo setQuestion={setQuestion} question={question} />
      ) : question === 2 ? (
        <QuizThree setQuestion={setQuestion} question={question} />
      ) : question === 3 ? (
        <QuizFour setQuestion={setQuestion} question={question} />
      ) : question === 4 ? (
        <QuizFive setQuestion={setQuestion} question={question} />
      ) : question === 5 ? (
        <QuizSix setQuestion={setQuestion} question={question} />
      ) : (
        <QuizSeven
          setQuestion={setQuestion}
          question={question}
          navigation={navigation}
          setCoins={setCoins}
          coins={coins}
          setIsKnowFish={setIsKnowFish}
          isKnowFish={isKnowFish}
        />
      )}
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
  progressBar: {
    width: '100%',
    height: 7,
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#00B8D4',
    borderRadius: 10,
  },
  text: {
    marginVertical: 10,
    fontSize: 12,
    color: '#042024',
  },
});
