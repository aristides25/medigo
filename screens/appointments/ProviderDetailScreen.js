import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Button, Card, Icon, ListItem, Divider, Rating } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';

const MOCK_SCHEDULE = [
  { id: 1, day: 'Lunes', hours: '9:00 AM - 5:00 PM' },
  { id: 2, day: 'Martes', hours: '9:00 AM - 5:00 PM' },
  { id: 3, day: 'Miércoles', hours: '9:00 AM - 5:00 PM' },
  { id: 4, day: 'Jueves', hours: '9:00 AM - 5:00 PM' },
  { id: 5, day: 'Viernes', hours: '9:00 AM - 3:00 PM' },
];

const MOCK_SERVICES = [
  { id: 1, name: 'Consulta General', price: '$50.00' },
  { id: 2, name: 'Consulta Especializada', price: '$75.00' },
  { id: 3, name: 'Procedimientos Menores', price: '$100.00' },
];

const ProviderDetailScreen = ({ route, navigation }) => {
  const { provider } = route.params;
  const [selectedDate, setSelectedDate] = useState(null);

  const handleStartBooking = () => {
    navigation.navigate('BookAppointment', { provider });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Información Principal */}
        <Card>
          <Card.Title style={styles.name}>{provider.name}</Card.Title>
          <Card.Divider />
          <View style={styles.mainInfo}>
            <Text style={styles.specialty}>{provider.specialty}</Text>
            <View style={styles.ratingContainer}>
              <Rating
                readonly
                startingValue={provider.rating}
                imageSize={16}
                style={styles.rating}
              />
              <TouchableOpacity 
                onPress={() => navigation.navigate('Reviews', { provider })}
                style={styles.reviewsLink}
              >
                <Text style={styles.reviewCount}>({provider.reviewCount} reseñas)</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.address}>{provider.address}</Text>
          </View>
          <Text style={styles.description}>{provider.description}</Text>
        </Card>

        {/* Horarios */}
        <Card>
          <Card.Title>Horarios de Atención</Card.Title>
          <Card.Divider />
          {MOCK_SCHEDULE.map((schedule) => (
            <ListItem key={schedule.id}>
              <ListItem.Content>
                <ListItem.Title>{schedule.day}</ListItem.Title>
                <ListItem.Subtitle>{schedule.hours}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))}
        </Card>

        {/* Servicios */}
        <Card>
          <Card.Title>Servicios</Card.Title>
          <Card.Divider />
          {MOCK_SERVICES.map((service) => (
            <ListItem key={service.id}>
              <ListItem.Content>
                <ListItem.Title>{service.name}</ListItem.Title>
                <ListItem.Subtitle>{service.price}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))}
        </Card>

        {/* Botón de Reserva */}
        <View style={styles.bookingContainer}>
          <Button
            title="Reservar Cita"
            onPress={handleStartBooking}
            buttonStyle={styles.bookingButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F4F8',
  },
  mainInfo: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 16,
    shadowColor: '#2d3748',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 10,
  },
  specialty: {
    fontSize: 18,
    color: '#718096',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    marginRight: 8,
  },
  reviewCount: {
    color: '#4facfe',
    fontSize: 14,
  },
  address: {
    color: '#718096',
    fontSize: 14,
    marginTop: 8,
  },
  description: {
    color: '#718096',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 12,
  },
  bookingContainer: {
    padding: 20,
  },
  bookingButton: {
    backgroundColor: '#4facfe',
    borderRadius: 12,
    paddingVertical: 12,
  },
  reviewsLink: {
    marginLeft: 8,
  },
});

export default ProviderDetailScreen; 