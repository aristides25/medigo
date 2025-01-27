import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from '@rneui/themed';

const NurseCard = ({ nurse, onSelect }) => {
  const { name, rating, experience, specialties, price, available } = nurse;

  return (
    <View style={styles.card}>
      <View style={styles.nurseInfo}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.rating}>⭐ {rating}</Text>
        <Text style={styles.experience}>
          {experience} años de experiencia
        </Text>
        <Text style={styles.specialties}>
          {specialties.join(' • ')}
        </Text>
        <Text style={styles.price}>
          ${price}/hora
        </Text>
      </View>
      <Button
        title={available ? "Seleccionar" : "No Disponible"}
        disabled={!available}
        onPress={() => onSelect(nurse)}
        buttonStyle={[
          styles.selectButton,
          !available && styles.disabledButton
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  nurseInfo: {
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  rating: {
    fontSize: 16,
    color: '#f1c40f',
    marginVertical: 5,
  },
  experience: {
    color: '#7f8c8d',
  },
  specialties: {
    color: '#7f8c8d',
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    color: '#27ae60',
    fontWeight: 'bold',
  },
  selectButton: {
    backgroundColor: '#3498db',
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: '#bdc3c7',
  },
});

export default NurseCard; 