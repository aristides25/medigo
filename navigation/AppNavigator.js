import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@rneui/themed';

// Screens imports
import HomeScreen from '../screens/HomeScreen';
// Appointments
import AppointmentsScreen from '../screens/appointments/AppointmentsScreen';
import SearchProvidersScreen from '../screens/appointments/SearchProvidersScreen';
import ProviderDetailScreen from '../screens/appointments/ProviderDetailScreen';
import BookAppointmentScreen from '../screens/appointments/BookAppointmentScreen';
import PaymentScreen from '../screens/appointments/PaymentScreen';
import ReviewsScreen from '../screens/appointments/ReviewsScreen';
import PostAppointmentReviewScreen from '../screens/appointments/PostAppointmentReviewScreen';
import AppointmentDetailScreen from '../screens/appointments/AppointmentDetailScreen';
// Pharmacy
import PharmacyScreen from '../screens/pharmacy/PharmacyScreen';
import CategoryProductsScreen from '../screens/pharmacy/CategoryProductsScreen';
import ProductDetailScreen from '../screens/pharmacy/ProductDetailScreen';
import CartScreen from '../screens/pharmacy/CartScreen';
import MyPrescriptionsScreen from '../screens/pharmacy/MyPrescriptionsScreen';
import UploadPrescriptionScreen from '../screens/pharmacy/UploadPrescriptionScreen';
// Medical Records
import MedicalRecordsScreen from '../screens/medical-records/MedicalRecordsScreen';
import MedicalDocumentsScreen from '../screens/medical-records/MedicalDocumentsScreen';
import DocumentDetailScreen from '../screens/medical-records/DocumentDetailScreen';
import UploadDocumentScreen from '../screens/medical-records/UploadDocumentScreen';
// Emergency
import EmergencyMapScreen from '../screens/emergency/EmergencyMapScreen';
import EmergencyTrackingScreen from '../screens/emergency/EmergencyTrackingScreen';
// Nursing
import NursingHomeScreen from '../screens/nursing/NursingHomeScreen';
import NursingServiceDetailScreen from '../screens/nursing/NursingServiceDetailScreen';
import NursingBookingScreen from '../screens/nursing/NursingBookingScreen';
import NursingTrackingScreen from '../screens/nursing/NursingTrackingScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { theme } = useTheme();

  const screenOptions = {
    headerStyle: {
      backgroundColor: theme.colors.primary,
    },
    headerTintColor: theme.colors.white,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerBackTitle: 'MediGo',
    headerBackTitleStyle: {
      fontFamily: 'System',
      fontSize: 14,
    },
  };

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {/* Home */}
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          title: 'MediGo',
        }}
      />

      {/* Appointments */}
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
        }}
      />
      <Stack.Screen 
        name="AppointmentDetail" 
        component={AppointmentDetailScreen}
        options={{
          title: 'Detalles de la Cita',
        }}
      />

      {/* Pharmacy */}
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
        options={{
          title: 'Detalle del Producto',
        }}
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

      {/* Medical Records */}
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

      {/* Emergency */}
      <Stack.Screen 
        name="EmergencyMap" 
        component={EmergencyMapScreen}
        options={{
          title: 'Emergencias',
        }}
      />
      <Stack.Screen 
        name="EmergencyTracking" 
        component={EmergencyTrackingScreen}
        options={{
          title: 'Seguimiento de Ambulancia',
        }}
      />

      {/* Nursing */}
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
    </Stack.Navigator>
  );
};

export default AppNavigator; 