import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Icon, Avatar, Divider } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';

const NurseProfileScreen = ({ navigation, route }) => {
  const { nurse, service } = route.params;

  const handleConfirmService = () => {
    navigation.navigate('NursingBooking', { service, nurse });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Avatar
            size={120}
            rounded
            source={{ uri: nurse.image }}
            containerStyle={styles.avatar}
          />
          <Text style={styles.name}>{nurse.name}</Text>
          <Text style={styles.specialty}>{nurse.specialty}</Text>
          <View style={styles.ratingContainer}>
            <Icon name="star" type="material-community" size={20} color="#FFC107" />
            <Text style={styles.rating}>{nurse.rating}</Text>
            <Text style={styles.reviews}>({nurse.reviews} reseñas)</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="briefcase-outline" type="material-community" size={24} color="#4facfe" />
            <Text style={styles.sectionTitle}>Experiencia</Text>
          </View>
          <Text style={styles.sectionContent}>{nurse.experience} de experiencia en el campo de la enfermería</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="certificate-outline" type="material-community" size={24} color="#4facfe" />
            <Text style={styles.sectionTitle}>Especialidades</Text>
          </View>
          <View style={styles.specialtiesList}>
            <View style={styles.specialtyTag}>
              <Text style={styles.specialtyTagText}>{nurse.specialty}</Text>
            </View>
            <View style={styles.specialtyTag}>
              <Text style={styles.specialtyTagText}>Primeros Auxilios</Text>
            </View>
            <View style={styles.specialtyTag}>
              <Text style={styles.specialtyTagText}>RCP Certificado</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="clock-outline" type="material-community" size={24} color="#4facfe" />
            <Text style={styles.sectionTitle}>Disponibilidad</Text>
          </View>
          <Text style={styles.sectionContent}>Disponibilidad {nurse.availability.toLowerCase()}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="shield-check-outline" type="material-community" size={24} color="#4facfe" />
            <Text style={styles.sectionTitle}>Verificaciones</Text>
          </View>
          <View style={styles.verificationList}>
            <View style={styles.verificationItem}>
              <Icon name="check-circle" type="material-community" size={20} color="#4CAF50" />
              <Text style={styles.verificationText}>Identidad verificada</Text>
            </View>
            <View style={styles.verificationItem}>
              <Icon name="check-circle" type="material-community" size={20} color="#4CAF50" />
              <Text style={styles.verificationText}>Licencia profesional activa</Text>
            </View>
            <View style={styles.verificationItem}>
              <Icon name="check-circle" type="material-community" size={20} color="#4CAF50" />
              <Text style={styles.verificationText}>Antecedentes verificados</Text>
            </View>
          </View>
        </View>

        <View style={styles.priceSection}>
          <Text style={styles.priceLabel}>Tarifa por hora</Text>
          <Text style={styles.price}>${service.price}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Confirmar Servicio"
            onPress={handleConfirmService}
            buttonStyle={styles.confirmButton}
            titleStyle={styles.buttonTitle}
            icon={{
              name: 'check-circle',
              type: 'material-community',
              size: 20,
              color: 'white',
              style: { marginRight: 10 }
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
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
  avatar: {
    borderWidth: 4,
    borderColor: '#4facfe20',
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2d3748',
    marginBottom: 4,
  },
  specialty: {
    fontSize: 16,
    color: '#718096',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3748',
    marginLeft: 4,
  },
  reviews: {
    fontSize: 14,
    color: '#718096',
    marginLeft: 4,
  },
  section: {
    backgroundColor: '#ffffff',
    margin: 15,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#4facfe',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3748',
    marginLeft: 10,
  },
  sectionContent: {
    fontSize: 16,
    color: '#4A5568',
    lineHeight: 24,
  },
  specialtiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  specialtyTag: {
    backgroundColor: '#E6F7FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  specialtyTagText: {
    color: '#4facfe',
    fontSize: 14,
    fontWeight: '500',
  },
  verificationList: {
    marginTop: 10,
  },
  verificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  verificationText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#4A5568',
  },
  priceSection: {
    backgroundColor: '#ffffff',
    margin: 15,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#4facfe',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  priceLabel: {
    fontSize: 16,
    color: '#718096',
    marginBottom: 4,
  },
  price: {
    fontSize: 28,
    fontWeight: '700',
    color: '#4facfe',
  },
  buttonContainer: {
    padding: 15,
    paddingBottom: 30,
  },
  confirmButton: {
    backgroundColor: '#4facfe',
    borderRadius: 12,
    paddingVertical: 15,
    shadowColor: '#4facfe',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default NurseProfileScreen; 