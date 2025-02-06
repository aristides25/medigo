import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Text } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileScreen = () => {
  const userInfo = {
    name: 'José Daniel',
    email: 'jose.daniel@email.com',
    phone: '+507 6123-4567',
    bloodType: 'O+',
    weight: '75 kg',
    height: '175 cm',
  };

  const renderProfileItem = (icon, title, value) => (
    <View style={styles.profileItem}>
      <View style={styles.profileIconContainer}>
        <Icon name={icon} size={24} color={COLORS.lightBlue} />
      </View>
      <View style={styles.profileContent}>
        <Text style={styles.profileLabel}>{title}</Text>
        <Text style={styles.profileValue}>{value}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Mi Perfil</Text>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Image
              source={require('../assets/icon.png')}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editAvatarButton}>
              <Icon name="camera" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{userInfo.name}</Text>
          <Text style={styles.userEmail}>{userInfo.email}</Text>
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Editar Perfil</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información Personal</Text>
          {renderProfileItem('phone', 'Teléfono', userInfo.phone)}
          {renderProfileItem('water', 'Tipo de Sangre', userInfo.bloodType)}
          {renderProfileItem('weight', 'Peso', userInfo.weight)}
          {renderProfileItem('human-male-height', 'Altura', userInfo.height)}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Historial Médico</Text>
          <TouchableOpacity style={styles.medicalItem}>
            <View style={styles.profileIconContainer}>
              <Icon name="file-document-outline" size={24} color={COLORS.lightBlue} />
            </View>
            <View style={styles.profileContent}>
              <Text style={styles.medicalTitle}>Historial de Consultas</Text>
              <Text style={styles.medicalDescription}>Ver todas tus consultas anteriores</Text>
            </View>
            <Icon name="chevron-right" size={24} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.medicalItem}>
            <View style={styles.profileIconContainer}>
              <Icon name="pill" size={24} color={COLORS.lightBlue} />
            </View>
            <View style={styles.profileContent}>
              <Text style={styles.medicalTitle}>Medicamentos</Text>
              <Text style={styles.medicalDescription}>Tus medicamentos actuales</Text>
            </View>
            <Icon name="chevron-right" size={24} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.medicalItem}>
            <View style={styles.profileIconContainer}>
              <Icon name="clipboard-text-outline" size={24} color={COLORS.lightBlue} />
            </View>
            <View style={styles.profileContent}>
              <Text style={styles.medicalTitle}>Resultados de Laboratorio</Text>
              <Text style={styles.medicalDescription}>Ver tus resultados médicos</Text>
            </View>
            <Icon name="chevron-right" size={24} color="#666" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.lightestBlue,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 5,
  },
  header: {
    marginBottom: 20,
    backgroundColor: COLORS.lightBlue,
    padding: 20,
    borderRadius: 25,
    shadowColor: COLORS.darkBlue,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.15)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    letterSpacing: 0.5,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: COLORS.darkBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: COLORS.lightBlue,
  },
  editAvatarButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.lightBlue,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2A2A2A',
    marginBottom: 5,
    letterSpacing: 0.3,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
    letterSpacing: 0.2,
  },
  editProfileButton: {
    backgroundColor: COLORS.lightestBlue,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.lightBlue,
  },
  editProfileText: {
    color: COLORS.darkBlue,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    shadowColor: COLORS.darkBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2A2A2A',
    marginBottom: 15,
    paddingLeft: 5,
    letterSpacing: 0.3,
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  profileIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightestBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  profileContent: {
    flex: 1,
  },
  profileLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
    letterSpacing: 0.2,
  },
  profileValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2A2A2A',
    letterSpacing: 0.2,
  },
  medicalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  medicalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2A2A2A',
    marginBottom: 2,
    letterSpacing: 0.2,
  },
  medicalDescription: {
    fontSize: 13,
    color: '#666',
    letterSpacing: 0.2,
  },
});

export default ProfileScreen; 