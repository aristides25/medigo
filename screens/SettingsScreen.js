import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Text } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [locationEnabled, setLocationEnabled] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  const renderSettingItem = (icon, title, description, value, onValueChange) => (
    <View style={styles.settingItem}>
      <View style={styles.settingIconContainer}>
        <Icon name={icon} size={24} color={COLORS.lightBlue} />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#767577', true: COLORS.lightBlue }}
        thumbColor={value ? COLORS.darkBlue : '#f4f3f4'}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Configuración</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferencias</Text>
          {renderSettingItem(
            'bell-outline',
            'Notificaciones',
            'Recibe alertas sobre tus citas y recordatorios',
            notificationsEnabled,
            setNotificationsEnabled
          )}
          {renderSettingItem(
            'map-marker-outline',
            'Ubicación',
            'Permite acceso a tu ubicación para servicios cercanos',
            locationEnabled,
            setLocationEnabled
          )}
          {renderSettingItem(
            'theme-light-dark',
            'Modo Oscuro',
            'Cambia el tema de la aplicación',
            darkMode,
            setDarkMode
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información</Text>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Icon name="information-outline" size={24} color={COLORS.lightBlue} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Acerca de MediGo</Text>
              <Text style={styles.settingDescription}>Versión 1.0.0</Text>
            </View>
            <Icon name="chevron-right" size={24} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Icon name="shield-check-outline" size={24} color={COLORS.lightBlue} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Privacidad y Seguridad</Text>
              <Text style={styles.settingDescription}>Gestiona tus datos personales</Text>
            </View>
            <Icon name="chevron-right" size={24} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Icon name="help-circle-outline" size={24} color={COLORS.lightBlue} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Ayuda y Soporte</Text>
              <Text style={styles.settingDescription}>Preguntas frecuentes y contacto</Text>
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
  section: {
    marginBottom: 25,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
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
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightestBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2A2A2A',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 13,
    color: '#666',
    letterSpacing: 0.2,
  },
});

export default SettingsScreen; 