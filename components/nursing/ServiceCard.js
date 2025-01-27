import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text, Icon } from '@rneui/themed';

const ServiceCard = ({ service, onSelect }) => {
  const { title, description, icon, basePrice } = service;

  return (
    <Card containerStyle={styles.card}>
      <Icon
        name={icon}
        type="material-community"
        color="#3498db"
        size={30}
        containerStyle={styles.iconContainer}
      />
      <Card.Title style={styles.title}>{title}</Card.Title>
      <Card.Divider />
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.price}>Desde ${basePrice}</Text>
      <Card.Divider />
      <Card.Image
        style={styles.button}
        onPress={() => onSelect(service)}
      >
        <Text style={styles.buttonText}>Seleccionar</Text>
      </Card.Image>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  iconContainer: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    color: '#2c3e50',
  },
  description: {
    color: '#7f8c8d',
    marginBottom: 10,
    textAlign: 'center',
  },
  price: {
    fontSize: 16,
    color: '#27ae60',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default ServiceCard; 