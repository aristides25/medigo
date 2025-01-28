import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Card, Text, Icon } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNavbar from '../../components/BottomNavbar';

const emergencyTypes = [
  {
    id: 1,
    title: 'Traslado Médico',
    description: 'Traslado programado a centro médico, hospital o clínica',
    icon: 'ambulance',
    color: '#4CAF50'
  },
  {
    id: 2,
    title: 'Accidente',
    description: 'Atención inmediata por accidente o emergencia',
    icon: 'exclamation-triangle',
    color: '#F44336'
  },
  {
    id: 3,
    title: 'Emergencia Médica',
    description: 'Atención por crisis de salud o emergencia médica',
    icon: 'heartbeat',
    color: '#E91E63'
  },
  {
    id: 4,
    title: 'Alta Médica',
    description: 'Traslado desde centro médico a domicilio',
    icon: 'hospital-o',
    color: '#2196F3'
  },
  {
    id: 5,
    title: 'Traslado Interhospitalario',
    description: 'Traslado entre centros médicos',
    icon: 'exchange',
    color: '#9C27B0'
  },
  {
    id: 6,
    title: 'Otros Motivos',
    description: 'Otros tipos de emergencias o traslados',
    icon: 'plus-circle',
    color: '#607D8B'
  }
];

const EmergencyTypeScreen = ({ navigation }) => {
  const handleSelectType = (emergencyType) => {
    navigation.navigate('EmergencyMap', { emergencyType });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={[styles.content, { marginBottom: 70 }]}>
        <Text style={styles.header}>¿Qué tipo de servicio necesitas?</Text>
        <Text style={styles.subheader}>Selecciona el motivo de la ambulancia</Text>

        <View style={styles.cardsContainer}>
          {emergencyTypes.map((type) => (
            <Card key={type.id} containerStyle={styles.card}>
              <View style={styles.cardContent}>
                <Icon
                  name={type.icon}
                  type="font-awesome"
                  size={30}
                  color={type.color}
                  containerStyle={styles.iconContainer}
                />
                <Card.Title style={styles.cardTitle}>{type.title}</Card.Title>
                <Text style={styles.cardDescription}>{type.description}</Text>
                <Button
                  title="Seleccionar"
                  onPress={() => handleSelectType(type)}
                  buttonStyle={[styles.button, { backgroundColor: type.color }]}
                  titleStyle={styles.buttonText}
                />
              </View>
            </Card>
          ))}
        </View>
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
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  subheader: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  cardsContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  card: {
    borderRadius: 15,
    marginBottom: 15,
    padding: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 8,
    color: '#333',
  },
  cardDescription: {
    textAlign: 'center',
    marginBottom: 15,
    color: '#666',
    fontSize: 14,
  },
  button: {
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default EmergencyTypeScreen; 