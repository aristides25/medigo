import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text } from '@rneui/themed';
import ServiceCard from '../../components/nursing/ServiceCard';

const nursingServices = [
  {
    id: '1',
    title: 'Cuidado Post-operatorio',
    description: 'Atención especializada para pacientes después de una cirugía',
    icon: 'medical-bag',
    basePrice: '30.00'
  },
  {
    id: '2',
    title: 'Administración de Medicamentos',
    description: 'Administración profesional de medicamentos según prescripción',
    icon: 'pill',
    basePrice: '20.00'
  },
  {
    id: '3',
    title: 'Terapia Intravenosa',
    description: 'Administración de tratamientos por vía intravenosa',
    icon: 'water',
    basePrice: '35.00'
  },
  {
    id: '4',
    title: 'Control de Signos Vitales',
    description: 'Monitoreo profesional de signos vitales',
    icon: 'heart-pulse',
    basePrice: '15.00'
  },
  {
    id: '5',
    title: 'Cuidado de Heridas',
    description: 'Limpieza y cuidado profesional de heridas',
    icon: 'bandage',
    basePrice: '25.00'
  },
  {
    id: '6',
    title: 'Toma de Muestras',
    description: 'Servicio profesional de toma de muestras a domicilio',
    icon: 'test-tube',
    basePrice: '20.00'
  }
];

const NursingServicesScreen = ({ navigation }) => {
  const handleServiceSelect = (service) => {
    navigation.navigate('NurseList', { service });
  };

  return (
    <View style={styles.container}>
      <Text h4 style={styles.title}>Servicios de Enfermería</Text>
      <Text style={styles.subtitle}>
        Selecciona el servicio que necesitas
      </Text>
      
      <ScrollView style={styles.scrollView}>
        {nursingServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onSelect={handleServiceSelect}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  title: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#2c3e50',
  },
  subtitle: {
    textAlign: 'center',
    color: '#7f8c8d',
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
});

export default NursingServicesScreen; 