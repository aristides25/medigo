import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon } from '@rneui/base';

// Importar pantallas de citas
import AppointmentsScreen from '../../screens/appointments/AppointmentsScreen';
import SearchProvidersScreen from '../../screens/appointments/SearchProvidersScreen';
import ProviderDetailScreen from '../../screens/appointments/ProviderDetailScreen';
import BookAppointmentScreen from '../../screens/appointments/BookAppointmentScreen';
import PaymentScreen from '../../screens/appointments/PaymentScreen';
import ReviewsScreen from '../../screens/appointments/ReviewsScreen';
import PostAppointmentReviewScreen from '../../screens/appointments/PostAppointmentReviewScreen';
import AppointmentDetailScreen from '../../screens/appointments/AppointmentDetailScreen';

const Stack = createNativeStackNavigator();

const AppointmentsNavigator = () => {
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
        name="AppointmentsHome" 
        component={AppointmentsScreen}
        options={({ navigation }) => ({
          title: 'Citas Médicas',
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
        name="SearchProviders" 
        component={SearchProvidersScreen}
        options={{
          title: 'Buscar Proveedores',
        }}
      />
      <Stack.Screen 
        name="ProviderDetail" 
        component={ProviderDetailScreen}
        options={{
          title: 'Detalles del Proveedor',
        }}
      />
      <Stack.Screen 
        name="BookAppointment" 
        component={BookAppointmentScreen}
        options={{
          title: 'Reservar Cita',
        }}
      />
      <Stack.Screen 
        name="Payment" 
        component={PaymentScreen}
        options={{
          title: 'Pago',
        }}
      />
      <Stack.Screen 
        name="Reviews" 
        component={ReviewsScreen}
        options={{
          title: 'Reseñas y Calificaciones',
        }}
      />
      <Stack.Screen 
        name="PostAppointmentReview" 
        component={PostAppointmentReviewScreen}
        options={{
          title: 'Calificar Cita',
        }}
      />
      <Stack.Screen 
        name="AppointmentDetail" 
        component={AppointmentDetailScreen}
        options={{
          title: 'Detalles de la Cita',
        }}
      />
    </Stack.Navigator>
  );
};

export default AppointmentsNavigator; 