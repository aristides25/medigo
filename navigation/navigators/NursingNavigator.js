import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon } from '@rneui/base';

// Importar pantallas de enfermería
import NursingHomeScreen from '../../screens/nursing/NursingHomeScreen';
import NursingServiceDetailScreen from '../../screens/nursing/NursingServiceDetailScreen';
import NursingBookingScreen from '../../screens/nursing/NursingBookingScreen';
import NursingTrackingScreen from '../../screens/nursing/NursingTrackingScreen';

const Stack = createNativeStackNavigator();

const NursingNavigator = () => {
  return (
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
        name="NursingHome" 
        component={NursingHomeScreen}
        options={({ navigation }) => ({
          title: 'Servicios de Enfermería',
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
    </Stack.Navigator>
  );
};

export default NursingNavigator; 