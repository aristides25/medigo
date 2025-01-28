import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TelemedicineProvider } from '../../context/TelemedicineContext';
import { Icon } from '@rneui/base';

// Importar pantallas de telemedicina
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

const TelemedicineNavigator = () => {
  return (
    <TelemedicineProvider>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0077B6',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="TelemedicineHome"
          component={ActiveConsultationsScreen}
          options={({ navigation }) => ({
            title: 'Telemedicina',
            headerLeft: () => (
              <Icon
                name="home"
                type="material-community"
                color="#fff"
                size={24}
                containerStyle={{ marginLeft: 10 }}
                onPress={() => navigation.navigate('Home')}
              />
            ),
          })}
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