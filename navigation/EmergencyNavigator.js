import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importar pantallas
import EmergencyMapScreen from '../screens/emergency/EmergencyMapScreen';
import EmergencyTrackingScreen from '../screens/emergency/EmergencyTrackingScreen';

const Stack = createNativeStackNavigator();

const EmergencyNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="EmergencyMap" 
        component={EmergencyMapScreen}
        options={{
          title: 'Emergencias',
          headerStyle: {
            backgroundColor: '#0077CC',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackTitle: 'MediGo',
          headerBackTitleStyle: {
            fontFamily: 'System',
            fontSize: 14,
          },
        }}
      />
      <Stack.Screen 
        name="EmergencyTracking" 
        component={EmergencyTrackingScreen}
        options={{
          title: 'Seguimiento de Ambulancia',
          headerStyle: {
            backgroundColor: '#0077CC',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackTitle: 'MediGo',
          headerBackTitleStyle: {
            fontFamily: 'System',
            fontSize: 14,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default EmergencyNavigator; 