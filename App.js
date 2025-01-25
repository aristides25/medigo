import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './navigation/AppNavigator';
import { CartProvider } from './context/CartContext';
import { PharmacyProvider } from './context/PharmacyContext';
import { MedicalRecordProvider } from './context/MedicalRecordContext';
import { AppointmentProvider } from './context/AppointmentContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <AppointmentProvider>
        <MedicalRecordProvider>
          <PharmacyProvider>
            <CartProvider>
              <ThemeProvider>
                <NavigationContainer>
                  <AppNavigator />
                </NavigationContainer>
              </ThemeProvider>
            </CartProvider>
          </PharmacyProvider>
        </MedicalRecordProvider>
      </AppointmentProvider>
    </SafeAreaProvider>
  );
}
