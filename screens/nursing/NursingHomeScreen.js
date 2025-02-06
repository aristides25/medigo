import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';

const nursingServices = [
  {
    id: 1,
    title: 'Cuidados Básicos',
    description: 'Asistencia en actividades diarias, control de signos vitales y administración de medicamentos.',
    icon: 'heart-pulse',
    price: '25.00'
  },
  {
    id: 2,
    title: 'Terapia Intravenosa',
    description: 'Administración de medicamentos y fluidos por vía intravenosa.',
    icon: 'water',
    price: '35.00'
  },
  {
    id: 3,
    title: 'Cuidado de Heridas',
    description: 'Limpieza y curación de heridas, cambio de vendajes.',
    icon: 'bandage',
    price: '30.00'
  },
  {
    id: 4,
    title: 'Fisioterapia',
    description: 'Ejercicios terapéuticos y rehabilitación física.',
    icon: 'run',
    price: '40.00'
  }
];

const NursingHomeScreen = ({ navigation }) => {
  const handleServicePress = (service) => {
    navigation.navigate('NursingServiceDetail', { service });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text h4 style={styles.headerText}>Servicios Disponibles</Text>
        <Text style={styles.subheader}>Selecciona el servicio que necesitas</Text>
      </View>

      {nursingServices.map((service) => (
        <Card key={service.id} containerStyle={styles.card}>
          <View style={styles.cardHeader}>
            <Icon
              name={service.icon}
              type="material-community"
              color="#0077CC"
              size={30}
            />
            <Text h4 style={styles.serviceTitle}>{service.title}</Text>
          </View>
          
          <Text style={styles.description}>{service.description}</Text>
          
          <View style={styles.priceContainer}>
            <Text style={styles.price}>Desde ${service.price}/hora</Text>
          </View>

          <Button
            title="Ver Detalles"
            onPress={() => handleServicePress(service)}
            buttonStyle={styles.button}
          />
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F4F8',
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#4facfe',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  headerText: {
    color: '#2d3748',
    marginBottom: 8,
    fontSize: 26,
    fontWeight: '800',
  },
  subheader: {
    color: '#718096',
    fontSize: 16,
  },
  card: {
    borderRadius: 16,
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 15,
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
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceTitle: {
    marginLeft: 12,
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3748',
  },
  description: {
    color: '#718096',
    marginBottom: 12,
    lineHeight: 20,
  },
  priceContainer: {
    marginBottom: 12,
    backgroundColor: '#E8F4F8',
    padding: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  price: {
    fontSize: 16,
    color: '#4facfe',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#4facfe',
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 8,
  },
});

export default NursingHomeScreen; 