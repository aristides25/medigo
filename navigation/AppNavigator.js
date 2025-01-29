import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@rneui/themed';
import { TelemedicineProvider } from '../context/TelemedicineContext';

// Screens
import HomeScreen from '../screens/HomeScreen';

// Module Navigators
import AppointmentsNavigator from './navigators/AppointmentsNavigator';
import PharmacyNavigator from './navigators/PharmacyNavigator';
import MedicalRecordsNavigator from './navigators/MedicalRecordsNavigator';
import EmergencyNavigator from './navigators/EmergencyNavigator';
import NursingNavigator from './navigators/NursingNavigator';
import TelemedicineNavigator from './navigators/TelemedicineNavigator';

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
    <TelemedicineProvider>
      <Stack.Navigator screenOptions={screenOptions}>
        {/* Home */}
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            title: 'MediGo',
          }}
        />

        {/* Module Navigators */}
        <Stack.Group>
          {AppointmentsNavigator({ screenOptions })}
          {PharmacyNavigator({ screenOptions })}
          {MedicalRecordsNavigator({ screenOptions })}
          {EmergencyNavigator({ screenOptions })}
          {NursingNavigator({ screenOptions })}
          {TelemedicineNavigator({ screenOptions })}
        </Stack.Group>
      </Stack.Navigator>
    </TelemedicineProvider>
  );
};

export default AppNavigator; 