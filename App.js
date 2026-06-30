import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native'

import HomeScreen from './src/screens/HomeScreen'
import DetailScreen from './src/screens/DetailScreen'
import ProfileScreen from './src/screens/ProfileScreen'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <SafeAreaView> <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="Home" component={HomeScreen}
        />
        <Stack.Screen
          name="Detail" component={DetailScreen}
        />
        <Stack.Screen
          name="Profile" component={ProfileScreen}
        />
      </Stack.Navigator>
    </NavigationContainer></SafeAreaView>

  )
}