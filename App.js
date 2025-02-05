import React, { memo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CartProvider } from './context/CartContext';
import { PharmacyProvider } from './context/PharmacyContext';
import { MedicalRecordProvider } from './context/MedicalRecordContext';
import { AppointmentProvider } from './context/AppointmentContext';
import { RatingProvider } from './context/RatingContext';
import { TelemedicineProvider } from './context/TelemedicineContext';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

// Importar las pantallas principales
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';

// Importar pantallas de Telemedicina
import TelemedicineHomeScreen from './screens/telemedicine/consultation/ActiveConsultationsScreen';
import SpecialtySelectionScreen from './screens/telemedicine/consultation/SpecialtySelectionScreen';
import DoctorSelectionScreen from './screens/telemedicine/consultation/DoctorSelectionScreen';
import ScheduleScreen from './screens/telemedicine/consultation/ScheduleScreen';
import TelemedicinePaymentScreen from './screens/telemedicine/consultation/PaymentScreen';
import ConnectionTestScreen from './screens/telemedicine/virtual-room/ConnectionTestScreen';
import WaitingRoomScreen from './screens/telemedicine/virtual-room/WaitingRoomScreen';
import ConsultationRoomScreen from './screens/telemedicine/virtual-room/ConsultationRoomScreen';
import PostConsultationScreen from './screens/telemedicine/virtual-room/PostConsultationScreen';

// Importar pantallas de Farmacia
import PharmacyScreen from './screens/pharmacy/PharmacyScreen';
import PharmacyProductsScreen from './screens/pharmacy/PharmacyProductsScreen';
import ProductDetailScreen from './screens/pharmacy/ProductDetailScreen';
import CartScreen from './screens/pharmacy/CartScreen';
import MyPrescriptionsScreen from './screens/pharmacy/MyPrescriptionsScreen';
import UploadPrescriptionScreen from './screens/pharmacy/UploadPrescriptionScreen';

// Importar pantallas de Citas
import AppointmentsScreen from './screens/appointments/AppointmentsScreen';
import SearchProvidersScreen from './screens/appointments/SearchProvidersScreen';
import ProviderDetailScreen from './screens/appointments/ProviderDetailScreen';
import BookAppointmentScreen from './screens/appointments/BookAppointmentScreen';
import PaymentScreen from './screens/appointments/PaymentScreen';
import ReviewsScreen from './screens/appointments/ReviewsScreen';
import PostAppointmentReviewScreen from './screens/appointments/PostAppointmentReviewScreen';
import AppointmentDetailScreen from './screens/appointments/AppointmentDetailScreen';

// Importar pantallas de Enfermería/Fertilidad
import NursingHomeScreen from './screens/nursing/NursingHomeScreen';
import NursingServiceDetailScreen from './screens/nursing/NursingServiceDetailScreen';
import NursingBookingScreen from './screens/nursing/NursingBookingScreen';
import NursingTrackingScreen from './screens/nursing/NursingTrackingScreen';

// Importar pantallas de Emergencia
import EmergencyMapScreen from './screens/emergency/EmergencyMapScreen';
import EmergencyTypeScreen from './screens/emergency/EmergencyTypeScreen';
import EmergencyTrackingScreen from './screens/emergency/EmergencyTrackingScreen';

// Importar pantallas de Expediente Médico
import MedicalRecordsScreen from './screens/medical-records/MedicalRecordsScreen';
import MedicalDocumentsScreen from './screens/medical-records/MedicalDocumentsScreen';
import DocumentDetailScreen from './screens/medical-records/DocumentDetailScreen';
import UploadDocumentScreen from './screens/medical-records/UploadDocumentScreen';

const Stack = createStackNavigator();

// Componente de navegación memoizado
const Navigation = memo(() => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#fff' }
    }}
  >
    {/* Pantallas principales */}
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
    
    {/* Rutas de Telemedicina */}
    <Stack.Screen name="TelemedicineHome" component={TelemedicineHomeScreen} />
    <Stack.Screen name="SpecialtySelection" component={SpecialtySelectionScreen} />
    <Stack.Screen name="DoctorSelection" component={DoctorSelectionScreen} />
    <Stack.Screen name="Schedule" component={ScheduleScreen} />
    <Stack.Screen name="TelemedicinePayment" component={TelemedicinePaymentScreen} />
    <Stack.Screen name="ConnectionTest" component={ConnectionTestScreen} />
    <Stack.Screen name="WaitingRoom" component={WaitingRoomScreen} />
    <Stack.Screen name="ConsultationRoom" component={ConsultationRoomScreen} />
    <Stack.Screen name="PostConsultation" component={PostConsultationScreen} />

    {/* Rutas de Farmacia */}
    <Stack.Screen name="Pharmacy" component={PharmacyScreen} />
    <Stack.Screen name="PharmacyProducts" component={PharmacyProductsScreen} />
    <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    <Stack.Screen name="Cart" component={CartScreen} />
    <Stack.Screen name="MyPrescriptions" component={MyPrescriptionsScreen} />
    <Stack.Screen name="UploadPrescription" component={UploadPrescriptionScreen} />

    {/* Rutas de Citas */}
    <Stack.Screen name="Appointments" component={AppointmentsScreen} />
    <Stack.Screen name="SearchProviders" component={SearchProvidersScreen} />
    <Stack.Screen name="ProviderDetail" component={ProviderDetailScreen} />
    <Stack.Screen name="BookAppointment" component={BookAppointmentScreen} />
    <Stack.Screen name="Payment" component={PaymentScreen} />
    <Stack.Screen name="Reviews" component={ReviewsScreen} />
    <Stack.Screen name="PostAppointmentReview" component={PostAppointmentReviewScreen} />
    <Stack.Screen name="AppointmentDetail" component={AppointmentDetailScreen} />

    {/* Rutas de Enfermería/Fertilidad */}
    <Stack.Screen name="NursingHome" component={NursingHomeScreen} />
    <Stack.Screen name="NursingServiceDetail" component={NursingServiceDetailScreen} />
    <Stack.Screen name="NursingBooking" component={NursingBookingScreen} />
    <Stack.Screen name="NursingTracking" component={NursingTrackingScreen} />

    {/* Rutas de Emergencia */}
    <Stack.Screen name="EmergencyMap" component={EmergencyMapScreen} />
    <Stack.Screen name="EmergencyType" component={EmergencyTypeScreen} />
    <Stack.Screen name="EmergencyTracking" component={EmergencyTrackingScreen} />

    {/* Rutas de Expediente Médico */}
    <Stack.Screen name="MedicalRecords" component={MedicalRecordsScreen} />
    <Stack.Screen name="MedicalDocuments" component={MedicalDocumentsScreen} />
    <Stack.Screen name="DocumentDetail" component={DocumentDetailScreen} />
    <Stack.Screen name="UploadDocument" component={UploadDocumentScreen} />
  </Stack.Navigator>
));

// Componente de providers separado y memoizado
const AppProviders = memo(({ children }) => (
  <SafeAreaProvider>
    <ThemeProvider>
      <TelemedicineProvider>
        <CartProvider>
          <PharmacyProvider>
            <MedicalRecordProvider>
              <AppointmentProvider>
                <RatingProvider>
                  {children}
                </RatingProvider>
              </AppointmentProvider>
            </MedicalRecordProvider>
          </PharmacyProvider>
        </CartProvider>
      </TelemedicineProvider>
    </ThemeProvider>
  </SafeAreaProvider>
));

// Componente principal de la app
const App = () => {
  return (
    <AppProviders>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </AppProviders>
  );
};

export default memo(App);
