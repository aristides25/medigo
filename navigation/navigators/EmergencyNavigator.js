import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Emergency Screens
import EmergencyTypeScreen from '../../screens/emergency/EmergencyTypeScreen';
import EmergencyMapScreen from '../../screens/emergency/EmergencyMapScreen';
import EmergencyTrackingScreen from '../../screens/emergency/EmergencyTrackingScreen';

const Stack = createNativeStackNavigator();

const EmergencyNavigator = ({ screenOptions }) => {
  const combinedScreenOptions = {
    ...screenOptions,
    animation: 'slide_from_right',
  };

  return (
    <>
      <Stack.Screen 
        name="EmergencyType" 
        component={EmergencyTypeScreen}
        options={{
          ...combinedScreenOptions,
          title: 'Servicio de Ambulancia',
        }}
      />
      <Stack.Screen 
        name="EmergencyMap" 
        component={EmergencyMapScreen}
        options={{
          ...combinedScreenOptions,
          title: 'Servicio de Ambulancia',
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen 
        name="EmergencyTracking" 
        component={EmergencyTrackingScreen}
        options={{
          ...combinedScreenOptions,
          title: 'Seguimiento',
          animation: 'slide_from_right',
        }}
      />
    </>
  );
};

export default EmergencyNavigator; 