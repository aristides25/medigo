import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Text, Icon } from '@rneui/themed';

const emergencyTypes = [
  {
    id: 1,
    title: 'Traslado Médico',
    description: 'Traslado programado a centro médico',
    icon: 'ambulance',
    color: '#4CAF50'
  },
  {
    id: 2,
    title: 'Accidente',
    description: 'Atención inmediata por accidente',
    icon: 'exclamation-triangle',
    color: '#F44336'
  },
  {
    id: 3,
    title: 'Emergencia Médica',
    description: 'Atención por crisis de salud',
    icon: 'heartbeat',
    color: '#E91E63'
  },
  {
    id: 4,
    title: 'Alta Médica',
    description: 'Traslado desde centro médico',
    icon: 'hospital-o',
    color: '#2196F3'
  },
  {
    id: 5,
    title: 'Traslado Interhospitalario',
    description: 'Traslado entre centros médicos',
    icon: 'exchange',
    color: '#9C27B0'
  }
];

const EmergencyTypeScreen = ({ navigation }) => {
  const handleSelectType = (emergencyType) => {
    navigation.navigate('EmergencyMap', { emergencyType });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Servicios de Emergencia</Text>
      <Text style={styles.subheader}>Selecciona el tipo de servicio que necesitas</Text>

      <View style={styles.servicesContainer}>
        {emergencyTypes.map((type) => (
          <TouchableOpacity 
            key={type.id} 
            style={styles.serviceCard}
            onPress={() => handleSelectType(type)}
          >
            <Icon
              name={type.icon}
              type="font-awesome"
              size={24}
              color={type.color}
              containerStyle={styles.iconContainer}
            />
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceTitle}>{type.title}</Text>
              <Text style={styles.serviceDescription}>{type.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
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
  servicesContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  iconContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default EmergencyTypeScreen; 