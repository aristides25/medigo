import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Medical Records Screens
import MedicalRecordsScreen from '../../screens/medical-records/MedicalRecordsScreen';
import MedicalDocumentsScreen from '../../screens/medical-records/MedicalDocumentsScreen';
import DocumentDetailScreen from '../../screens/medical-records/DocumentDetailScreen';
import UploadDocumentScreen from '../../screens/medical-records/UploadDocumentScreen';

const Stack = createNativeStackNavigator();

const MedicalRecordsNavigator = ({ screenOptions }) => {
  return (
    <>
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
    </>
  );
};

export default MedicalRecordsNavigator; 