import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CartProvider } from './context/CartContext';
import { PharmacyProvider } from './context/PharmacyContext';
import { MedicalRecordProvider } from './context/MedicalRecordContext';
import { AppointmentProvider } from './context/AppointmentContext';
import { RatingProvider } from './context/RatingContext';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

// Importar las pantallas
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <MedicalRecordProvider>
        <PharmacyProvider>
          <AppointmentProvider>
            <RatingProvider>
              <CartProvider>
                <ThemeProvider>
                  <NavigationContainer>
                    <Stack.Navigator
                      initialRouteName="Home"
                      screenOptions={{
                        headerShown: false,
                        cardStyle: { backgroundColor: '#fff' }
                      }}
                    >
                      <Stack.Screen name="Home" component={HomeScreen} />
                      <Stack.Screen name="Profile" component={ProfileScreen} />
                      <Stack.Screen name="Settings" component={SettingsScreen} />
                    </Stack.Navigator>
                  </NavigationContainer>
                </ThemeProvider>
              </CartProvider>
            </RatingProvider>
          </AppointmentProvider>
        </PharmacyProvider>
      </MedicalRecordProvider>
    </SafeAreaProvider>
  );
}
