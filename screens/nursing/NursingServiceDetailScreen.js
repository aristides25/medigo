import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Icon, Divider } from '@rneui/themed';

const NursingServiceDetailScreen = ({ route, navigation }) => {
  const { service } = route.params;

  const handleBooking = () => {
    navigation.navigate('NurseSelection', { service });
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
    backgroundColor: '#E8F4F8',
  },
  header: {
    alignItems: 'center',
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
  title: {
    color: '#2d3748',
    marginTop: 12,
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '800',
  },
  price: {
    fontSize: 20,
    color: '#4facfe',
    fontWeight: '600',
    marginTop: 12,
  },
  section: {
    padding: 20,
    backgroundColor: '#ffffff',
    margin: 15,
    borderRadius: 16,
    shadowColor: '#2d3748',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  sectionTitle: {
    color: '#2d3748',
    marginBottom: 15,
    fontSize: 18,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    color: '#718096',
    lineHeight: 24,
  },
  divider: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    height: 1,
    marginHorizontal: 20,
  },
  includeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#E8F4F8',
    padding: 12,
    borderRadius: 12,
  },
  includeText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#2d3748',
  },
  infoText: {
    fontSize: 16,
    color: '#718096',
    marginBottom: 12,
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 30,
  },
  button: {
    backgroundColor: '#4facfe',
    borderRadius: 12,
    paddingVertical: 15,
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default NursingServiceDetailScreen; 