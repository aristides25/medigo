import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@rneui/themed';
import { TelemedicineProvider } from '../context/TelemedicineContext';

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
import PharmacyProductsScreen from '../screens/pharmacy/PharmacyProductsScreen';
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
// Telemedicine
import SpecialtySelectionScreen from '../screens/telemedicine/consultation/SpecialtySelectionScreen';
import DoctorSelectionScreen from '../screens/telemedicine/consultation/DoctorSelectionScreen';
import ScheduleScreen from '../screens/telemedicine/consultation/ScheduleScreen';
import TelemedicinePaymentScreen from '../screens/telemedicine/consultation/PaymentScreen';
import ActiveConsultationsScreen from '../screens/telemedicine/consultation/ActiveConsultationsScreen';
import ConnectionTestScreen from '../screens/telemedicine/virtual-room/ConnectionTestScreen';
import WaitingRoomScreen from '../screens/telemedicine/virtual-room/WaitingRoomScreen';
import ConsultationRoomScreen from '../screens/telemedicine/virtual-room/ConsultationRoomScreen';
import PostConsultationScreen from '../screens/telemedicine/virtual-room/PostConsultationScreen';

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
    <TelemedicineProvider>
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
          name="PharmacyProducts" 
          component={PharmacyProductsScreen}
          options={{
            animation: 'slide_from_right',
            title: 'Productos',
          }}
        />
        <Stack.Screen 
          name="ProductDetail" 
          component={ProductDetailScreen}
          options={{
            animation: 'slide_from_right',
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

        {/* Telemedicine */}
        <Stack.Screen
          name="TelemedicineHome"
          component={ActiveConsultationsScreen}
          options={{
            title: 'Telemedicina',
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
          name="TelemedicineSchedule"
          component={ScheduleScreen}
          options={{
            title: 'Programar Consulta',
          }}
        />
        <Stack.Screen
          name="TelemedicinePayment"
          component={TelemedicinePaymentScreen}
          options={{
            title: 'Pago',
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

export default AppNavigator; 