import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importar pantallas
import EmergencyMapScreen from '../screens/emergency/EmergencyMapScreen';
import EmergencyTrackingScreen from '../screens/emergency/EmergencyTrackingScreen';
import EmergencyTypeScreen from '../screens/emergency/EmergencyTypeScreen';

const Stack = createNativeStackNavigator();

const EmergencyNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="EmergencyType"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0077CC',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="EmergencyType"
        component={EmergencyTypeScreen}
        options={{
          title: 'Servicio de Ambulancia',
        }}
      />
      <Stack.Screen
        name="EmergencyMap"
        component={EmergencyMapScreen}
        options={{
          title: 'Ubicación de Emergencia',
        }}
      />
      <Stack.Screen
        name="EmergencyTracking"
        component={EmergencyTrackingScreen}
        options={{
          title: 'Seguimiento',
        }}
      />
    </Stack.Navigator>
  );
};

export default EmergencyNavigator; 