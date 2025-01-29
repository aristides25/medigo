import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Emergency Screens
import EmergencyTypeScreen from '../../screens/emergency/EmergencyTypeScreen';
import EmergencyMapScreen from '../../screens/emergency/EmergencyMapScreen';
import EmergencyTrackingScreen from '../../screens/emergency/EmergencyTrackingScreen';

const Stack = createNativeStackNavigator();

const EmergencyNavigator = ({ screenOptions }) => {
  return (
    <>
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
          title: 'Servicio de Ambulancia',
        }}
      />
      <Stack.Screen 
        name="EmergencyTracking" 
        component={EmergencyTrackingScreen}
        options={{
          title: 'Seguimiento',
        }}
      />
    </>
  );
};

export default EmergencyNavigator; 