import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTelemedicine } from '../../../context/TelemedicineContext';

// Datos de ejemplo de doctores
const DOCTORS = [
  {
    id: '1',
    name: 'Dr. Juan Pérez',
    specialty: 'Medicina General',
    specialtyId: '1',
    rating: 4.8,
    reviews: 124,
    experience: '15 años',
    nextAvailable: '2:30 PM',
    price: 50,
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: '2',
    name: 'Dra. María García',
    specialty: 'Medicina General',
    specialtyId: '1',
    rating: 4.9,
    reviews: 98,
    experience: '12 años',
    nextAvailable: '3:00 PM',
    price: 45,
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: '3',
    name: 'Dr. Carlos Rodríguez',
    specialty: 'Medicina General',
    specialtyId: '1',
    rating: 4.7,
    reviews: 156,
    experience: '10 años',
    nextAvailable: '4:15 PM',
    price: 55,
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
];

const DoctorSelectionScreen = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { specialtyId } = route.params;
  const { currentConsultation, startConsultation } = useTelemedicine();

  const filteredDoctors = DOCTORS.filter(
    doctor =>
      doctor.specialtyId === specialtyId &&
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDoctorSelect = (doctor) => {
    startConsultation({
      ...currentConsultation,
      doctor,
    });
    navigation.navigate('Schedule', { doctorId: doctor.id });
  };

  const DoctorCard = ({ doctor }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleDoctorSelect(doctor)}
    >
      <View style={styles.cardHeader}>
        <Image source={{ uri: doctor.image }} style={styles.doctorImage} />
        <View style={styles.doctorInfo}>
          <Text style={styles.doctorName}>{doctor.name}</Text>
          <Text style={styles.specialty}>{doctor.specialty}</Text>
          <View style={styles.ratingContainer}>
            <MaterialIcons name="star" size={16} color="#FFC107" />
            <Text style={styles.rating}>
              {doctor.rating} ({doctor.reviews} reseñas)
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <MaterialIcons name="work" size={16} color="#666" />
          <Text style={styles.detailText}>{doctor.experience}</Text>
        </View>
        <View style={styles.detailItem}>
          <MaterialIcons name="schedule" size={16} color="#666" />
          <Text style={styles.detailText}>Próximo: {doctor.nextAvailable}</Text>
        </View>
        <View style={styles.detailItem}>
          <MaterialIcons name="attach-money" size={16} color="#666" />
          <Text style={styles.detailText}>${doctor.price} USD</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={24} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar doctor..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView style={styles.doctorsList}>
        {filteredDoctors.map(doctor => (
          <DoctorCard key={doctor.id} doctor={doctor} />
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
  doctorsList: {
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
    marginBottom: 12,
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 12,
  },
  doctorInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  specialty: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
});

export default DoctorSelectionScreen; 