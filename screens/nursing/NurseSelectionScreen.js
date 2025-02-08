import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Card, Button, Icon, ButtonGroup, Avatar } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';

// Datos de ejemplo de enfermeras
const MOCK_NURSES = [
  {
    id: '1',
    name: 'María González',
    specialty: 'Cuidados Generales',
    experience: '8 años',
    rating: 4.8,
    reviews: 124,
    availability: 'Inmediata',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    id: '2',
    name: 'Ana Martínez',
    specialty: 'Terapia Intravenosa',
    experience: '10 años',
    rating: 4.9,
    reviews: 156,
    availability: 'En 2 horas',
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: '3',
    name: 'Carmen Rodríguez',
    specialty: 'Cuidado de Heridas',
    experience: '6 años',
    rating: 4.7,
    reviews: 98,
    availability: 'Mañana',
    image: 'https://randomuser.me/api/portraits/women/3.jpg',
  },
];

const AVAILABILITY = ['Todas', 'Inmediata', 'Hoy', 'Mañana'];

const NurseSelectionScreen = ({ navigation, route }) => {
  const { service } = route.params;
  const [selectedAvailability, setSelectedAvailability] = useState(0);

  const getFilteredNurses = () => {
    return MOCK_NURSES.filter(nurse => {
      const matchesAvailability = selectedAvailability === 0 || nurse.availability === AVAILABILITY[selectedAvailability];
      return matchesAvailability;
    });
  };

  const handleNurseSelect = (nurse) => {
    navigation.navigate('NurseProfile', { nurse, service });
  };

  const NurseCard = ({ nurse }) => (
    <TouchableOpacity onPress={() => handleNurseSelect(nurse)}>
      <Card containerStyle={styles.nurseCard}>
        <View style={styles.cardHeader}>
          <Avatar
            size={80}
            rounded
            source={{ uri: nurse.image }}
            containerStyle={styles.avatar}
          />
          <View style={styles.nurseInfo}>
            <Text style={styles.nurseName}>{nurse.name}</Text>
            <Text style={styles.specialty}>{nurse.specialty}</Text>
            <View style={styles.ratingContainer}>
              <Icon name="star" type="material-community" size={16} color="#FFC107" />
              <Text style={styles.rating}>{nurse.rating} ({nurse.reviews} reseñas)</Text>
            </View>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Icon name="briefcase-outline" type="material-community" size={16} color="#4facfe" />
            <Text style={styles.detailText}>{nurse.experience}</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="clock-outline" type="material-community" size={16} color="#4facfe" />
            <Text style={styles.detailText}>{nurse.availability}</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Selecciona tu Enfermera</Text>
        <Text style={styles.headerSubtitle}>Para {service.title}</Text>
      </View>

      <View style={styles.floatingFilter}>
        <ButtonGroup
          buttons={AVAILABILITY}
          selectedIndex={selectedAvailability}
          onPress={setSelectedAvailability}
          containerStyle={styles.buttonGroupContainer}
          selectedButtonStyle={styles.selectedButton}
          textStyle={styles.buttonGroupText}
          selectedTextStyle={styles.selectedButtonText}
        />
      </View>

      <ScrollView style={styles.nursesList}>
        {getFilteredNurses().map((nurse) => (
          <NurseCard key={nurse.id} nurse={nurse} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F4F8',
  },
  header: {
    padding: 20,
    paddingBottom: 35,
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#4facfe',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2d3748',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#718096',
  },
  floatingFilter: {
    position: 'absolute',
    top: 160,
    left: 15,
    right: 15,
    zIndex: 1,
  },
  buttonGroupContainer: {
    marginBottom: 15,
    borderRadius: 12,
    borderColor: '#4facfe',
    backgroundColor: 'transparent',
    height: 45,
  },
  selectedButton: {
    backgroundColor: '#4facfe',
  },
  buttonGroupText: {
    fontSize: 13,
    color: '#4facfe',
  },
  selectedButtonText: {
    color: '#ffffff',
  },
  nursesList: {
    padding: 15,
    marginTop: 80,
  },
  nurseCard: {
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#4facfe',
    shadowColor: '#2d3748',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  avatar: {
    borderWidth: 3,
    borderColor: '#4facfe20',
  },
  nurseInfo: {
    marginLeft: 15,
    flex: 1,
    justifyContent: 'center',
  },
  nurseName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2d3748',
    marginBottom: 4,
  },
  specialty: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    color: '#718096',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  detailText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#4A5568',
  },
});

export default NurseSelectionScreen; 