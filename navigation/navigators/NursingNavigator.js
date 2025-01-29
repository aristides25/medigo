import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Nursing Screens
import NursingHomeScreen from '../../screens/nursing/NursingHomeScreen';
import NursingServiceDetailScreen from '../../screens/nursing/NursingServiceDetailScreen';
import NursingBookingScreen from '../../screens/nursing/NursingBookingScreen';
import NursingTrackingScreen from '../../screens/nursing/NursingTrackingScreen';

const Stack = createNativeStackNavigator();

const NursingNavigator = ({ screenOptions }) => {
  return (
    <>
      <Stack.Screen 
        name="NursingHome" 
        component={NursingHomeScreen}
        options={{
          title: 'Servicios de Enfermería',
        }}
      />
      <Stack.Screen 
        name="NursingServiceDetail" 
        component={NursingServiceDetailScreen}
        options={{
          title: 'Detalle del Servicio',
        }}
      />
      <Stack.Screen 
        name="NursingBooking" 
        component={NursingBookingScreen}
        options={{
          title: 'Reservar Servicio',
        }}
      />
      <Stack.Screen 
        name="NursingTracking" 
        component={NursingTrackingScreen}
        options={{
          title: 'Seguimiento del Servicio',
        }}
      />
    </>
  );
};

export default NursingNavigator; 