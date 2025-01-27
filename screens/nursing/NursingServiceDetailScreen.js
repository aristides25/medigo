import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Icon, Divider } from '@rneui/themed';

const NursingServiceDetailScreen = ({ route, navigation }) => {
  const { service } = route.params;

  const handleBooking = () => {
    navigation.navigate('NursingBooking', { service });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Icon
          name={service.icon}
          type="material-community"
          color="#0077CC"
          size={50}
        />
        <Text h3 style={styles.title}>{service.title}</Text>
        <Text style={styles.price}>Desde ${service.price}/hora</Text>
      </View>

      <View style={styles.section}>
        <Text h4 style={styles.sectionTitle}>Descripción del Servicio</Text>
        <Text style={styles.description}>{service.description}</Text>
      </View>

      <Divider style={styles.divider} />

      <View style={styles.section}>
        <Text h4 style={styles.sectionTitle}>¿Qué incluye?</Text>
        <View style={styles.includeItem}>
          <Icon name="check-circle" type="material" color="#2ecc71" size={20} />
          <Text style={styles.includeText}>Personal de enfermería certificado</Text>
        </View>
        <View style={styles.includeItem}>
          <Icon name="check-circle" type="material" color="#2ecc71" size={20} />
          <Text style={styles.includeText}>Equipamiento médico necesario</Text>
        </View>
        <View style={styles.includeItem}>
          <Icon name="check-circle" type="material" color="#2ecc71" size={20} />
          <Text style={styles.includeText}>Seguimiento del tratamiento</Text>
        </View>
      </View>

      <Divider style={styles.divider} />

      <View style={styles.section}>
        <Text h4 style={styles.sectionTitle}>Información Importante</Text>
        <Text style={styles.infoText}>• Servicio disponible 24/7</Text>
        <Text style={styles.infoText}>• Tiempo mínimo de servicio: 2 horas</Text>
        <Text style={styles.infoText}>• Cancelación gratuita hasta 2 horas antes</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Reservar Servicio"
          onPress={handleBooking}
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    color: '#0077CC',
    marginTop: 10,
    textAlign: 'center',
  },
  price: {
    fontSize: 20,
    color: '#2ecc71',
    fontWeight: 'bold',
    marginTop: 10,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    color: '#0077CC',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  divider: {
    backgroundColor: '#e1e8ee',
    height: 1,
    marginHorizontal: 20,
  },
  includeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  includeText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#666',
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 30,
  },
  button: {
    backgroundColor: '#0077CC',
    borderRadius: 25,
    paddingVertical: 15,
  },
  buttonTitle: {
    fontSize: 18,
  },
});

export default NursingServiceDetailScreen; 