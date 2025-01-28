import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Button } from '@rneui/themed';
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
        <Text style={styles.nurseInfo}>Por asignar</Text>
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
    backgroundColor: '#f5f5f5',
  },
  card: {
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  status: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0077CC',
    textAlign: 'center',
    marginVertical: 8,
  },
  infoContainer: {
    marginTop: 16,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 8,
    color: '#666',
  },
  value: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  nurseInfo: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
  buttonContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#0077CC',
    borderRadius: 25,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
});

export default NursingTrackingScreen; 