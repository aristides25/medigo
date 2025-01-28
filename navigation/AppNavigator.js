import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AppointmentsScreen from '../screens/appointments/AppointmentsScreen';
import SearchProvidersScreen from '../screens/appointments/SearchProvidersScreen';
import ProviderDetailScreen from '../screens/appointments/ProviderDetailScreen';
import BookAppointmentScreen from '../screens/appointments/BookAppointmentScreen';
import PaymentScreen from '../screens/appointments/PaymentScreen';
import ReviewsScreen from '../screens/appointments/ReviewsScreen';
import PostAppointmentReviewScreen from '../screens/appointments/PostAppointmentReviewScreen';
import AppointmentDetailScreen from '../screens/appointments/AppointmentDetailScreen';
import PharmacyScreen from '../screens/pharmacy/PharmacyScreen';
import CategoryProductsScreen from '../screens/pharmacy/CategoryProductsScreen';
import ProductDetailScreen from '../screens/pharmacy/ProductDetailScreen';
import CartScreen from '../screens/pharmacy/CartScreen';
import MyPrescriptionsScreen from '../screens/pharmacy/MyPrescriptionsScreen';
import UploadPrescriptionScreen from '../screens/pharmacy/UploadPrescriptionScreen';
import MedicalRecordsScreen from '../screens/medical-records/MedicalRecordsScreen';
import MedicalDocumentsScreen from '../screens/medical-records/MedicalDocumentsScreen';
import DocumentDetailScreen from '../screens/medical-records/DocumentDetailScreen';
import UploadDocumentScreen from '../screens/medical-records/UploadDocumentScreen';

// Import new navigators
import EmergencyNavigator from './EmergencyNavigator';
import NursingNavigator from './NursingNavigator';

const Stack = createNativeStackNavigator();

// Configuración común del header para todos los módulos
const commonHeaderOptions = {
  headerStyle: {
    backgroundColor: '#0077CC', // Tono de azul usado en el módulo de citas
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

const AppNavigator = () => {
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
        name="Home" 
        component={HomeScreen}
        options={{
          title: 'MediGo',
        }}
      />
      <Stack.Screen 
        name="Appointments" 
        component={AppointmentsScreen}
        options={{
          title: 'Citas Médicas',
        }}
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
          headerBackTitle: 'Atrás'
        }}
      />
      <Stack.Screen 
        name="AppointmentDetail" 
        component={AppointmentDetailScreen}
        options={{
          title: 'Detalles de la Cita',
        }}
      />
      <Stack.Screen 
        name="Pharmacy" 
        component={PharmacyScreen}
        options={{
          title: 'Farmacia',
        }}
      />
      <Stack.Screen 
        name="CategoryProducts" 
        component={CategoryProductsScreen}
        options={({ route }) => ({
          title: route.params.category.name,
        })}
      />
      <Stack.Screen 
        name="ProductDetail" 
        component={ProductDetailScreen}
        options={({ route }) => ({
          title: 'Detalle del Producto',
        })}
      />
      <Stack.Screen 
        name="Cart" 
        component={CartScreen}
        options={{
          title: 'Carrito de Compras',
        }}
      />
      <Stack.Screen 
        name="MyPrescriptions" 
        component={MyPrescriptionsScreen}
        options={{
          title: 'Mis Recetas',
        }}
      />
      <Stack.Screen 
        name="UploadPrescription" 
        component={UploadPrescriptionScreen}
        options={{
          title: 'Subir Receta',
        }}
      />
      <Stack.Screen 
        name="MedicalRecords" 
        component={MedicalRecordsScreen}
        options={{
          title: 'Expediente Médico',
        }}
      />
      <Stack.Screen 
        name="MedicalDocuments" 
        component={MedicalDocumentsScreen}
        options={{
          title: 'Documentos Médicos',
        }}
      />
      <Stack.Screen 
        name="DocumentDetail" 
        component={DocumentDetailScreen}
        options={{
          title: 'Detalle del Documento',
        }}
      />
      <Stack.Screen 
        name="UploadDocument" 
        component={UploadDocumentScreen}
        options={{
          title: 'Subir Documento',
        }}
      />

      {/* New modules */}
      <Stack.Screen
        name="Emergency"
        component={EmergencyNavigator}
        options={{ 
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Nursing"
        component={NursingNavigator}
        options={{ 
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator; 