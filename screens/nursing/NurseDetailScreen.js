import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Button, Icon, Divider } from '@rneui/themed';

const NurseDetailScreen = ({ route, navigation }) => {
  const { nurse, service } = route.params;

  // Horarios disponibles de ejemplo
  const availableSchedules = [
    { day: 'Lunes', hours: '8:00 AM - 6:00 PM' },
    { day: 'Martes', hours: '8:00 AM - 6:00 PM' },
    { day: 'Miércoles', hours: '8:00 AM - 6:00 PM' },
    { day: 'Jueves', hours: '8:00 AM - 6:00 PM' },
    { day: 'Viernes', hours: '8:00 AM - 4:00 PM' },
  ];

  // Reseñas de ejemplo
  const reviews = [
    { id: 1, rating: 5, comment: 'Excelente profesional, muy puntual y dedicada.' },
    { id: 2, rating: 4, comment: 'Muy buena atención y cuidados.' },
  ];

  const handleBooking = () => {
    navigation.navigate('BookNursingService', { nurse, service });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Encabezado del Perfil */}
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <Text h4 style={styles.name}>{nurse.name}</Text>
          <View style={styles.ratingContainer}>
            <Icon
              name="star"
              type="material-community"
              color="#f1c40f"
              size={20}
            />
            <Text style={styles.rating}>{nurse.rating}</Text>
            <Text style={styles.experience}>
              {nurse.experience} años de experiencia
            </Text>
          </View>
        </View>
      </View>

      {/* Especialidades */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Especialidades</Text>
        <View style={styles.specialtiesContainer}>
          {nurse.specialties.map((specialty, index) => (
            <View key={index} style={styles.specialtyChip}>
              <Text style={styles.specialtyText}>{specialty}</Text>
            </View>
          ))}
        </View>
      </View>

      <Divider style={styles.divider} />

      {/* Horarios Disponibles */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Horarios Disponibles</Text>
        {availableSchedules.map((schedule, index) => (
          <View key={index} style={styles.scheduleItem}>
            <Text style={styles.scheduleDay}>{schedule.day}</Text>
            <Text style={styles.scheduleHours}>{schedule.hours}</Text>
          </View>
        ))}
      </View>

      <Divider style={styles.divider} />

      {/* Reseñas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reseñas</Text>
        {reviews.map((review) => (
          <View key={review.id} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <View style={styles.stars}>
                {[...Array(review.rating)].map((_, i) => (
                  <Icon
                    key={i}
                    name="star"
                    type="material-community"
                    color="#f1c40f"
                    size={16}
                  />
                ))}
              </View>
            </View>
            <Text style={styles.reviewComment}>{review.comment}</Text>
          </View>
        ))}
      </View>

      {/* Precio y Botón de Reserva */}
      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Precio por hora</Text>
          <Text style={styles.price}>${nurse.price}</Text>
        </View>
        <Button
          title="Reservar Servicio"
          onPress={handleBooking}
          buttonStyle={styles.bookButton}
          containerStyle={styles.bookButtonContainer}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  profileInfo: {
    alignItems: 'center',
  },
  name: {
    color: '#2c3e50',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  rating: {
    marginLeft: 5,
    color: '#f1c40f',
    fontWeight: 'bold',
    fontSize: 16,
  },
  experience: {
    marginLeft: 10,
    color: '#7f8c8d',
    fontSize: 14,
  },
  section: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  specialtyChip: {
    backgroundColor: '#3498db',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    margin: 5,
  },
  specialtyText: {
    color: '#ffffff',
    fontSize: 14,
  },
  divider: {
    marginVertical: 10,
  },
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  scheduleDay: {
    color: '#2c3e50',
    fontWeight: '500',
  },
  scheduleHours: {
    color: '#7f8c8d',
  },
  reviewCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  stars: {
    flexDirection: 'row',
  },
  reviewComment: {
    color: '#2c3e50',
    fontSize: 14,
  },
  footer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  priceContainer: {
    marginBottom: 15,
  },
  priceLabel: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  price: {
    fontSize: 24,
    color: '#27ae60',
    fontWeight: 'bold',
  },
  bookButtonContainer: {
    borderRadius: 10,
  },
  bookButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
  },
});

export default NurseDetailScreen; 