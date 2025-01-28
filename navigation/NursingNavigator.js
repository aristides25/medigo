import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NursingHomeScreen from '../screens/nursing/NursingHomeScreen';
import NursingServiceDetailScreen from '../screens/nursing/NursingServiceDetailScreen';
import NursingBookingScreen from '../screens/nursing/NursingBookingScreen';
import NursingTrackingScreen from '../screens/nursing/NursingTrackingScreen';

const Stack = createNativeStackNavigator();

const NursingNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="NursingHome" 
        component={NursingHomeScreen}
        options={{
          title: 'Servicios de Enfermería',
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
        name="NursingServiceDetail" 
        component={NursingServiceDetailScreen}
        options={{
          title: 'Detalle del Servicio',
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
        name="NursingBooking" 
        component={NursingBookingScreen}
        options={{
          title: 'Reservar Servicio',
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
        name="NursingTracking" 
        component={NursingTrackingScreen}
        options={{
          title: 'Seguimiento del Servicio',
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

export default NursingNavigator; 