import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './navigation/AppNavigator';
import { CartProvider } from './context/CartContext';
import { PharmacyProvider } from './context/PharmacyContext';
import { MedicalRecordProvider } from './context/MedicalRecordContext';

export default function App() {
  return (
    <SafeAreaProvider>
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
    </SafeAreaProvider>
  );
}
