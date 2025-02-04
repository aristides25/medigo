import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Avatar, Icon } from '@rneui/themed';

const ProfileScreen = ({ navigation }) => {
  const userData = {
    name: 'Juan Pérez',
    email: 'juan.perez@email.com',
    phone: '+507 6123-4567',
    birthDate: '15/05/1985',
    bloodType: 'O+',
    address: 'Calle 50, Ciudad de Panamá',
    emergencyContact: 'María Pérez',
    emergencyPhone: '+507 6789-0123',
    insurance: 'Seguro Médico Nacional',
    policyNumber: 'POL-123456'
  };

  const renderInfoItem = (icon, title, value) => (
    <View style={styles.infoItem}>
      <Icon name={icon} type="material" color="#0288D1" size={24} style={styles.icon} />
      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>{title}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.header}>
          <Avatar
            size={100}
            rounded
            title="JP"
            containerStyle={styles.avatar}
            titleStyle={{ color: 'white' }}
          />
          <Text style={styles.name}>{userData.name}</Text>
          <Text style={styles.email}>{userData.email}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información Personal</Text>
          {renderInfoItem('phone', 'Teléfono', userData.phone)}
          {renderInfoItem('cake', 'Fecha de Nacimiento', userData.birthDate)}
          {renderInfoItem('opacity', 'Tipo de Sangre', userData.bloodType)}
          {renderInfoItem('place', 'Dirección', userData.address)}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contacto de Emergencia</Text>
          {renderInfoItem('person', 'Nombre', userData.emergencyContact)}
          {renderInfoItem('phone', 'Teléfono', userData.emergencyPhone)}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información de Seguro</Text>
          {renderInfoItem('health-and-safety', 'Seguro', userData.insurance)}
          {renderInfoItem('badge', 'Número de Póliza', userData.policyNumber)}
        </View>
      </ScrollView>

      <View style={styles.navbar}>
        <View style={styles.navItem}>
          <Icon
            name="home"
            type="material"
            size={28}
            color="#666"
            onPress={() => navigation.navigate('Home')}
          />
          <Text style={styles.navText}>Inicio</Text>
        </View>
        
        <View style={styles.navItem}>
          <Icon
            name="person"
            type="material"
            size={28}
            color="#FFD700"
            onPress={() => navigation.navigate('Profile')}
          />
          <Text style={[styles.navText, styles.activeNavText]}>Perfil</Text>
        </View>

        <View style={styles.navItem}>
          <Icon
            name="settings"
            type="material"
            size={28}
            color="#666"
            onPress={() => navigation.navigate('Settings')}
          />
          <Text style={styles.navText}>Configuración</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  avatar: {
    backgroundColor: '#0288D1',
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  icon: {
    marginRight: 15,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    marginTop: 2,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  navText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  activeNavText: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
});

export default ProfileScreen; 