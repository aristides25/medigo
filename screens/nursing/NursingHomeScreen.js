import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNavbar from '../../components/BottomNavbar';

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
    <SafeAreaView style={styles.container}>
      <ScrollView style={[styles.content, { marginBottom: 70 }]}>
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

      <BottomNavbar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
  },
  headerText: {
    color: '#0077CC',
    marginBottom: 5,
  },
  subheader: {
    color: '#666',
    fontSize: 16,
  },
  card: {
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  serviceTitle: {
    marginLeft: 10,
    fontSize: 18,
    color: '#0077CC',
  },
  description: {
    color: '#666',
    marginBottom: 10,
  },
  priceContainer: {
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    color: '#2ecc71',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#0077CC',
    borderRadius: 25,
    paddingVertical: 10,
  },
});

export default NursingHomeScreen; 