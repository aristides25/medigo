import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TelemedicineProvider } from '../context/TelemedicineContext';

// Pantallas de consulta
import SpecialtySelectionScreen from '../screens/telemedicine/consultation/SpecialtySelectionScreen';
import DoctorSelectionScreen from '../screens/telemedicine/consultation/DoctorSelectionScreen';
import ScheduleScreen from '../screens/telemedicine/consultation/ScheduleScreen';
import PaymentScreen from '../screens/telemedicine/consultation/PaymentScreen';
import ActiveConsultationsScreen from '../screens/telemedicine/consultation/ActiveConsultationsScreen';

// Pantallas de sala virtual
import ConnectionTestScreen from '../screens/telemedicine/virtual-room/ConnectionTestScreen';
import WaitingRoomScreen from '../screens/telemedicine/virtual-room/WaitingRoomScreen';
import ConsultationRoomScreen from '../screens/telemedicine/virtual-room/ConsultationRoomScreen';
import PostConsultationScreen from '../screens/telemedicine/virtual-room/PostConsultationScreen';

const Stack = createNativeStackNavigator();

const TelemedicineNavigator = () => {
  return (
    <TelemedicineProvider>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2196F3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          contentStyle: { backgroundColor: '#f5f5f5' },
          animation: 'slide_from_right',
        }}
      >
        {/* Flujo de consulta */}
        <Stack.Screen
          name="ActiveConsultations"
          component={ActiveConsultationsScreen}
          options={{
            title: 'Mis Consultas',
          }}
        />
        <Stack.Screen
          name="SpecialtySelection"
          component={SpecialtySelectionScreen}
          options={{
            title: 'Seleccionar Especialidad',
          }}
        />
        <Stack.Screen
          name="DoctorSelection"
          component={DoctorSelectionScreen}
          options={{
            title: 'Seleccionar Doctor',
          }}
        />
        <Stack.Screen
          name="Schedule"
          component={ScheduleScreen}
          options={{
            title: 'Programar Consulta',
          }}
        />
        <Stack.Screen
          name="Payment"
          component={PaymentScreen}
          options={{
            title: 'Pago',
          }}
        />

        {/* Flujo de sala virtual */}
        <Stack.Screen
          name="ConnectionTest"
          component={ConnectionTestScreen}
          options={{
            title: 'Prueba de Conexión',
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="WaitingRoom"
          component={WaitingRoomScreen}
          options={{
            title: 'Sala de Espera',
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="ConsultationRoom"
          component={ConsultationRoomScreen}
          options={{
            title: 'Consulta en Curso',
            headerBackVisible: false,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PostConsultation"
          component={PostConsultationScreen}
          options={{
            title: 'Finalizar Consulta',
            headerBackVisible: false,
          }}
        />
      </Stack.Navigator>
    </TelemedicineProvider>
  );
};

export default TelemedicineNavigator; 