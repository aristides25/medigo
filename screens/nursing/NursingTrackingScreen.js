import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Button, Avatar } from '@rneui/themed';
import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

const NursingTrackingScreen = ({ route, navigation }) => {
  const { booking } = route.params || {};

  const formatDate = (date) => {
    if (!date) return 'No disponible';
    return moment(date).format('LL');
  };

  const formatTime = (time) => {
    if (!time) return 'No disponible';
    return moment(time, 'HH:mm').format('hh:mm A');
  };

  const handleGoHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
        <Card.Title>Estado del Servicio</Card.Title>
        <Text style={styles.status}>En Proceso</Text>
        
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Fecha:</Text>
          <Text style={styles.value}>{formatDate(booking?.date)}</Text>
          
          <Text style={styles.label}>Hora:</Text>
          <Text style={styles.value}>{formatTime(booking?.time)}</Text>
          
          <Text style={styles.label}>Duración:</Text>
          <Text style={styles.value}>{booking?.duration || 'No disponible'}</Text>
          
          <Text style={styles.label}>Dirección:</Text>
          <Text style={styles.value}>{booking?.address || 'No disponible'}</Text>
        </View>
      </Card>
      
      <Card containerStyle={styles.card}>
        <Card.Title>Enfermero/a Asignado/a</Card.Title>
        {booking?.nurse ? (
          <View style={styles.nurseContainer}>
            <Avatar
              size={60}
              rounded
              source={{ uri: booking.nurse.image }}
              containerStyle={styles.nurseAvatar}
            />
            <View style={styles.nurseInfo}>
              <Text style={styles.nurseName}>{booking.nurse.name}</Text>
              <Text style={styles.nurseSpecialty}>{booking.nurse.specialty}</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.rating}>⭐ {booking.nurse.rating}</Text>
                <Text style={styles.reviews}>({booking.nurse.reviews} reseñas)</Text>
              </View>
            </View>
          </View>
        ) : (
          <Text style={styles.nurseInfo}>Por asignar</Text>
        )}
      </Card>

      <Button
        title="Volver al Inicio"
        onPress={handleGoHome}
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
        icon={{
          name: 'home',
          type: 'font-awesome',
          size: 20,
          color: 'white',
        }}
        iconRight
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#E8F4F8',
  },
  card: {
    borderRadius: 16,
    marginBottom: 16,
    padding: 20,
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
  status: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4facfe',
    textAlign: 'center',
    marginVertical: 12,
    backgroundColor: '#E8F4F8',
    padding: 12,
    borderRadius: 12,
  },
  infoContainer: {
    marginTop: 16,
  },
  label: {
    fontWeight: '600',
    marginTop: 12,
    color: '#718096',
    fontSize: 14,
  },
  value: {
    fontSize: 16,
    color: '#2d3748',
    marginBottom: 8,
    marginTop: 4,
  },
  nurseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F4F8',
    padding: 12,
    borderRadius: 12,
  },
  nurseAvatar: {
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#4facfe',
  },
  nurseInfo: {
    flex: 1,
  },
  nurseName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 4,
  },
  nurseSpecialty: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: '#2d3748',
    marginRight: 4,
  },
  reviews: {
    fontSize: 14,
    color: '#718096',
  },
  buttonContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#4facfe',
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 10,
    color: '#ffffff',
  },
});

export default NursingTrackingScreen; 