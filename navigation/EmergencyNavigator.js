import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importar pantallas
import EmergencyMapScreen from '../screens/emergency/EmergencyMapScreen';
import EmergencyTrackingScreen from '../screens/emergency/EmergencyTrackingScreen';

const Stack = createNativeStackNavigator();

const EmergencyNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#e74c3c', // Color rojo para emergencias
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="EmergencyMap"
        component={EmergencyMapScreen}
        options={{
          title: 'Solicitar Ambulancia',
        }}
      />
      <Stack.Screen
        name="EmergencyTracking"
        component={EmergencyTrackingScreen}
        options={{
          title: 'Seguimiento',
          headerBackTitle: 'Cancelar',
        }}
      />
    </Stack.Navigator>
  );
};

export default EmergencyNavigator; 