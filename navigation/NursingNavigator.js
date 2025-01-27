import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importar pantallas
import NursingServicesScreen from '../screens/nursing/NursingServicesScreen';
import NurseListScreen from '../screens/nursing/NurseListScreen';
import NurseDetailScreen from '../screens/nursing/NurseDetailScreen';
import BookNursingServiceScreen from '../screens/nursing/BookNursingServiceScreen';
import NursingConfirmationScreen from '../screens/nursing/NursingConfirmationScreen';

const Stack = createNativeStackNavigator();

const NursingNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="NursingServices"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3498db',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="NursingServices"
        component={NursingServicesScreen}
        options={{
          title: 'Servicios de Enfermería',
        }}
      />
      <Stack.Screen
        name="NurseList"
        component={NurseListScreen}
        options={{
          title: 'Enfermeros Disponibles',
        }}
      />
      <Stack.Screen
        name="NurseDetail"
        component={NurseDetailScreen}
        options={{
          title: 'Detalle del Enfermero',
        }}
      />
      <Stack.Screen
        name="BookNursingService"
        component={BookNursingServiceScreen}
        options={{
          title: 'Reservar Servicio',
        }}
      />
      <Stack.Screen
        name="NursingConfirmation"
        component={NursingConfirmationScreen}
        options={{ 
          title: 'Confirmar Reserva',
          headerBackVisible: false, // Para SDK 52, esta es la forma correcta de ocultar el botón de retroceso
        }}
      />
    </Stack.Navigator>
  );
};

export default NursingNavigator; 