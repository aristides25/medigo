import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Telemedicine Screens
import SpecialtySelectionScreen from '../../screens/telemedicine/consultation/SpecialtySelectionScreen';
import DoctorSelectionScreen from '../../screens/telemedicine/consultation/DoctorSelectionScreen';
import ScheduleScreen from '../../screens/telemedicine/consultation/ScheduleScreen';
import TelemedicinePaymentScreen from '../../screens/telemedicine/consultation/PaymentScreen';
import ActiveConsultationsScreen from '../../screens/telemedicine/consultation/ActiveConsultationsScreen';
import ConnectionTestScreen from '../../screens/telemedicine/virtual-room/ConnectionTestScreen';
import WaitingRoomScreen from '../../screens/telemedicine/virtual-room/WaitingRoomScreen';
import ConsultationRoomScreen from '../../screens/telemedicine/virtual-room/ConsultationRoomScreen';
import PostConsultationScreen from '../../screens/telemedicine/virtual-room/PostConsultationScreen';

const Stack = createNativeStackNavigator();

const TelemedicineNavigator = ({ screenOptions }) => {
  return (
    <>
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
          title: 'Agendar Consulta',
        }}
      />
      <Stack.Screen 
        name="TelemedicinePayment" 
        component={TelemedicinePaymentScreen}
        options={{
          title: 'Pago de Consulta',
        }}
      />
      <Stack.Screen 
        name="ActiveConsultations" 
        component={ActiveConsultationsScreen}
        options={{
          title: 'Consultas Activas',
        }}
      />
      <Stack.Screen 
        name="ConnectionTest" 
        component={ConnectionTestScreen}
        options={{
          title: 'Prueba de Conexión',
        }}
      />
      <Stack.Screen 
        name="WaitingRoom" 
        component={WaitingRoomScreen}
        options={{
          title: 'Sala de Espera',
        }}
      />
      <Stack.Screen 
        name="ConsultationRoom" 
        component={ConsultationRoomScreen}
        options={{
          title: 'Consulta Virtual',
        }}
      />
      <Stack.Screen 
        name="PostConsultation" 
        component={PostConsultationScreen}
        options={{
          title: 'Post Consulta',
        }}
      />
    </>
  );
};

export default TelemedicineNavigator; 