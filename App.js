import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import Detalle from './components/Detalle';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
        />
        
        <Stack.Screen
          name="Detalle"
          component={Detalle}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
