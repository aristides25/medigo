import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NursingHomeScreen from '../screens/nursing/NursingHomeScreen';
import NursingServiceDetailScreen from '../screens/nursing/NursingServiceDetailScreen';
import NursingBookingScreen from '../screens/nursing/NursingBookingScreen';
import NursingTrackingScreen from '../screens/nursing/NursingTrackingScreen';

const Stack = createNativeStackNavigator();

const commonHeaderOptions = {
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
};

const NursingNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="NursingHome" 
        component={NursingHomeScreen}
        options={{
          ...commonHeaderOptions,
          title: 'Servicios de Enfermería',
        }}
      />
      <Stack.Screen 
        name="NursingServiceDetail" 
        component={NursingServiceDetailScreen}
        options={{
          ...commonHeaderOptions,
          title: 'Detalle del Servicio',
        }}
      />
      <Stack.Screen 
        name="NursingBooking" 
        component={NursingBookingScreen}
        options={{
          ...commonHeaderOptions,
          title: 'Reservar Servicio',
        }}
      />
      <Stack.Screen 
        name="NursingTracking" 
        component={NursingTrackingScreen}
        options={{
          ...commonHeaderOptions,
          title: 'Seguimiento del Servicio',
        }}
      />
    </Stack.Navigator>
  );
};

export default NursingNavigator; 