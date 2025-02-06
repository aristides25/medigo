import React, { memo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider, createTheme } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CartProvider } from './context/CartContext';
import { PharmacyProvider } from './context/PharmacyContext';
import { MedicalRecordProvider } from './context/MedicalRecordContext';
import { AppointmentProvider } from './context/AppointmentContext';
import { RatingProvider } from './context/RatingContext';
import { TelemedicineProvider } from './context/TelemedicineContext';
import AppNavigator from './navigation/AppNavigator';
import 'react-native-gesture-handler';

// Definir el tema una sola vez fuera del componente
const theme = createTheme({
  lightColors: {
    primary: '#4facfe',
    secondary: '#00f2fe',
    background: '#f8fafc',
    white: '#ffffff',
    black: '#2d3748',
    grey0: '#718096',
    grey1: '#e2e8f0',
  },
  mode: 'light',
});

// Componente de providers separado y memoizado
const AppProviders = memo(({ children }) => (
  <SafeAreaProvider>
    <ThemeProvider theme={theme}>
      <TelemedicineProvider>
        <CartProvider>
          <PharmacyProvider>
            <MedicalRecordProvider>
              <AppointmentProvider>
                <RatingProvider>
                  {children}
                </RatingProvider>
              </AppointmentProvider>
            </MedicalRecordProvider>
          </PharmacyProvider>
        </CartProvider>
      </TelemedicineProvider>
    </ThemeProvider>
  </SafeAreaProvider>
));

// Componente principal de la app
const App = () => {
  return (
    <AppProviders>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AppProviders>
  );
};

export default memo(App);
