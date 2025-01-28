import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@rneui/themed';

// Importar pantalla principal
import HomeScreen from '../screens/HomeScreen';

// Importar navegadores de módulos
import TelemedicineNavigator from './navigators/TelemedicineNavigator';
import AppointmentsNavigator from './navigators/AppointmentsNavigator';
import PharmacyNavigator from './navigators/PharmacyNavigator';
import EmergencyNavigator from './navigators/EmergencyNavigator';
import NursingNavigator from './navigators/NursingNavigator';
import MedicalRecordsNavigator from './navigators/MedicalRecordsNavigator';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { theme } = useTheme();

  const screenOptions = {
    headerStyle: {
      backgroundColor: theme.colors.primary,
    },
    headerTintColor: theme.colors.white,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerBackTitle: 'MediGo',
    headerBackTitleStyle: {
      fontFamily: 'System',
      fontSize: 14,
    },
  };

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {/* Home */}
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          title: 'MediGo',
        }}
      />

      {/* Módulos */}
      <Stack.Screen
        name="TelemedicineModule"
        component={TelemedicineNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="AppointmentsModule"
        component={AppointmentsNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="PharmacyModule"
        component={PharmacyNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="EmergencyModule"
        component={EmergencyNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="NursingModule"
        component={NursingNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="MedicalRecordsModule"
        component={MedicalRecordsNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator; 