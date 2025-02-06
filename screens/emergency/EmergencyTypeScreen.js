import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Text, Icon } from '@rneui/themed';

const emergencyTypes = [
  {
    id: 1,
    title: 'Ambulancia Emergencia',
    description: 'Atención inmediata para emergencias médicas',
    icon: 'ambulance',
    color: '#e74c3c'
  },
  {
    id: 2,
    title: 'Traslado',
    description: 'Traslado programado a centro médico',
    icon: 'hospital-o',
    color: '#3498db'
  },
  {
    id: 3,
    title: 'Accidente',
    description: 'Atención inmediata por accidente',
    icon: 'medkit',
    color: '#e67e22'
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