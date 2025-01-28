import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon } from '@rneui/base';

// Importar pantallas de expedientes médicos
import MedicalRecordsScreen from '../../screens/medical-records/MedicalRecordsScreen';
import MedicalDocumentsScreen from '../../screens/medical-records/MedicalDocumentsScreen';
import DocumentDetailScreen from '../../screens/medical-records/DocumentDetailScreen';
import UploadDocumentScreen from '../../screens/medical-records/UploadDocumentScreen';

const Stack = createNativeStackNavigator();

const MedicalRecordsNavigator = () => {
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
        name="MedicalRecords" 
        component={MedicalRecordsScreen}
        options={({ navigation }) => ({
          title: 'Expediente Médico',
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
    </Stack.Navigator>
  );
};

export default MedicalRecordsNavigator; 