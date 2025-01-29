import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TabNavigator from './navigation/TabNavigator';
import { CartProvider } from './context/CartContext';
import { PharmacyProvider } from './context/PharmacyContext';
import { MedicalRecordProvider } from './context/MedicalRecordContext';
import { AppointmentProvider } from './context/AppointmentContext';
import { RatingProvider } from './context/RatingContext';

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
                    <TabNavigator />
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
