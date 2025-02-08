import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import { Text, Button, Icon, FAB } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

// Datos de ejemplo de recetas
const MOCK_PRESCRIPTIONS = [
  {
    id: '1',
    doctor: 'Dr. Juan Pérez',
    date: '2024-02-15',
    medications: ['Paracetamol 500mg', 'Ibuprofeno 400mg'],
    imageUrl: null,
  },
  {
    id: '2',
    doctor: 'Dra. María García',
    date: '2024-02-10',
    medications: ['Amoxicilina 500mg'],
    imageUrl: null,
  },
];

const DigitalPrescriptionsScreen = ({ navigation }) => {
  const [prescriptions, setPrescriptions] = useState(MOCK_PRESCRIPTIONS);

  const handleAddPrescription = async () => {
    try {
      // Solicitar permisos de cámara
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Necesitamos acceso a la cámara para tomar la foto de la receta.');
        return;
      }

      // Abrir la cámara
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        // Agregar nueva receta con la imagen
        const newPrescription = {
          id: Date.now().toString(),
          doctor: 'Nueva Receta',
          date: new Date().toISOString().split('T')[0],
          medications: [],
          imageUrl: result.assets[0].uri,
        };

        setPrescriptions(prev => [newPrescription, ...prev]);
        Alert.alert('¡Éxito!', 'Receta subida con éxito');
      }
    } catch (error) {
      console.error('Error al capturar la imagen:', error);
      Alert.alert('Error', 'No se pudo capturar la imagen. Intente nuevamente.');
    }
  };

  const renderPrescriptionItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.prescriptionCard}
      onPress={() => navigation.navigate('PrescriptionDetail', { prescription: item })}
    >
      <View style={styles.prescriptionHeader}>
        <Icon
          name="file-document-outline"
          type="material-community"
          size={24}
          color="#4facfe"
        />
        <View style={styles.prescriptionInfo}>
          <Text style={styles.doctorName}>{item.doctor}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
      </View>

      {item.imageUrl && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.imageUrl }} style={styles.prescriptionImage} />
        </View>
      )}

      <View style={styles.medicationList}>
        {item.medications.map((med, index) => (
          <Text key={index} style={styles.medication}>• {med}</Text>
        ))}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={prescriptions}
        renderItem={renderPrescriptionItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.prescriptionsList}
      />
      
      <FAB
        icon={{
          name: 'plus',
          type: 'material-community',
          color: 'white',
        }}
        color="#4facfe"
        placement="right"
        title="Nueva Receta"
        onPress={handleAddPrescription}
        style={styles.fab}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  prescriptionsList: {
    padding: 16,
  },
  prescriptionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#4facfe',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  prescriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  prescriptionInfo: {
    marginLeft: 12,
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3748',
  },
  date: {
    fontSize: 14,
    color: '#718096',
    marginTop: 2,
  },
  imageContainer: {
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
  },
  prescriptionImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  medicationList: {
    paddingLeft: 8,
  },
  medication: {
    fontSize: 14,
    color: '#4a5568',
    marginBottom: 4,
  },
  fab: {
    margin: 16,
  },
});

export default DigitalPrescriptionsScreen; 