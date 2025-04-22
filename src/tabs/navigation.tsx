import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {View} from 'react-native';
import {createContext, useState} from 'react';
import ActiveHome from '../../assets/svg/active-home.svg';
import NonActiveHome from '../../assets/svg/nonactive-home.svg';
import ActiveQuiz from '../../assets/svg/active-quiz.svg';
import NonActiveQuiz from '../../assets/svg/nonactive-quiz.svg';
import ActiveProfile from '../../assets/svg/active-profile.svg';
import NonActiveProfile from '../../assets/svg/nonactive-profile.svg';
import ActiveAlbum from '../../assets/svg/active-album.svg';
import NonActiveAlbum from '../../assets/svg/nonactive-album.svg';
import Home from './home';
import Quiz from './quiz';
import Profile from './profile';
import Inventory from './inventory';
import Albums from './albums';
import Album from './album';
import Maps from './maps';

interface TabContextType {
  coins: number;
  setCoins: (name: number) => void;
  sound: boolean;
  setSound: (name: boolean) => void;
  music: boolean;
  setMusic: (name: boolean) => void;
  isKnowFish: boolean[];
  setIsKnowFish: (name: boolean[]) => void;
}

export const TabContext = createContext<TabContextType>({
  coins: 50,
  setCoins: () => {},
  sound: true,
  setSound: () => {},
  music: true,
  setMusic: () => {},
  isKnowFish: [],
  setIsKnowFish: () => {},
});

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Maps" component={Maps} />
    </Stack.Navigator>
  );
}

function AlbumStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Albums" component={Albums} />
      <Stack.Screen name="Album" component={Album} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Inventory" component={Inventory} />
    </Stack.Navigator>
  );
}

export default function Tabs() {
  const [coins, setCoins] = useState<number>(50);
  const [sound, setSound] = useState<boolean>(true);
  const [music, setMusic] = useState<boolean>(true);
  const [isKnowFish, setIsKnowFish] = useState<boolean[]>([
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  return (
    <TabContext.Provider
      value={{
        coins,
        setCoins,
        sound,
        setSound,
        music,
        setMusic,
        isKnowFish,
        setIsKnowFish,
      }}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#0A3D62',
            height: 84,
            paddingTop: 15,
            borderTopWidth: 2,
          },
          headerShown: false,
        }}>
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({focused}) => (
              <View>{focused ? <ActiveHome /> : <NonActiveHome />}</View>
            ),
          }}
        />
        <Tab.Screen
          name="Quiz"
          component={Quiz}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({focused}) => (
              <View>{focused ? <ActiveQuiz /> : <NonActiveQuiz />}</View>
            ),
          }}
        />
        <Tab.Screen
          name="AlbumStack"
          component={AlbumStack}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({focused}) => (
              <View>{focused ? <ActiveAlbum /> : <NonActiveAlbum />}</View>
            ),
          }}
        />
        <Tab.Screen
          name="ProfileStack"
          component={ProfileStack}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({focused}) => (
              <View>{focused ? <ActiveProfile /> : <NonActiveProfile />}</View>
            ),
          }}
        />
      </Tab.Navigator>
    </TabContext.Provider>
  );
}
