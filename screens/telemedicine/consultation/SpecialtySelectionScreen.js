import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTelemedicine } from '../../../context/TelemedicineContext';

// Datos de ejemplo de especialidades
const SPECIALTIES = [
  {
    id: '1',
    name: 'Medicina General',
    icon: 'medical-services',
    description: 'Consultas generales y atención primaria',
    availableDoctors: 15,
  },
  {
    id: '2',
    name: 'Pediatría',
    icon: 'child-care',
    description: 'Atención médica para niños y adolescentes',
    availableDoctors: 8,
  },
  {
    id: '3',
    name: 'Cardiología',
    icon: 'favorite',
    description: 'Especialistas en salud cardiovascular',
    availableDoctors: 5,
  },
  {
    id: '4',
    name: 'Dermatología',
    icon: 'face',
    description: 'Tratamiento de condiciones de la piel',
    availableDoctors: 6,
  },
  {
    id: '5',
    name: 'Psicología',
    icon: 'psychology',
    description: 'Salud mental y bienestar emocional',
    availableDoctors: 10,
  },
];

const SpecialtySelectionScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { startConsultation } = useTelemedicine();

  const filteredSpecialties = SPECIALTIES.filter(specialty =>
    specialty.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSpecialtySelect = (specialty) => {
    startConsultation({ specialty });
    navigation.navigate('DoctorSelection', { specialtyId: specialty.id });
  };

  const SpecialtyCard = ({ specialty }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleSpecialtySelect(specialty)}
    >
      <View style={styles.cardHeader}>
        <MaterialIcons name={specialty.icon} size={32} color="#2196F3" />
        <View style={styles.cardHeaderText}>
          <Text style={styles.specialtyName}>{specialty.name}</Text>
          <Text style={styles.doctorsAvailable}>
            {specialty.availableDoctors} médicos disponibles
          </Text>
        </View>
      </View>
      <Text style={styles.description}>{specialty.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={24} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar especialidad..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView style={styles.specialtiesList}>
        {filteredSpecialties.map(specialty => (
          <SpecialtyCard key={specialty.id} specialty={specialty} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  specialtiesList: {
    flex: 1,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardHeaderText: {
    marginLeft: 12,
    flex: 1,
  },
  specialtyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  doctorsAvailable: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default SpecialtySelectionScreen; 