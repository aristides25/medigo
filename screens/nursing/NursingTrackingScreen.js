import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '@rneui/themed';

const NursingTrackingScreen = ({ route }) => {
  const { booking } = route.params || {};

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
        <Card.Title>Estado del Servicio</Card.Title>
        <Text style={styles.status}>En Proceso</Text>
        
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Fecha:</Text>
          <Text>{booking?.date || 'No disponible'}</Text>
          
          <Text style={styles.label}>Hora:</Text>
          <Text>{booking?.time || 'No disponible'}</Text>
          
          <Text style={styles.label}>Duración:</Text>
          <Text>{booking?.duration || 'No disponible'}</Text>
          
          <Text style={styles.label}>Dirección:</Text>
          <Text>{booking?.address || 'No disponible'}</Text>
        </View>
      </Card>
      
      <Card containerStyle={styles.card}>
        <Card.Title>Enfermero/a Asignado/a</Card.Title>
        <Text style={styles.nurseInfo}>Por asignar</Text>
      </Card>
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
  nurseInfo: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
});

export default NursingTrackingScreen; 