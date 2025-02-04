import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Switch } from 'react-native';
import { Text, Icon, Divider } from '@rneui/themed';

const SettingsScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [biometric, setBiometric] = useState(false);

  const renderSettingItem = (icon, title, description, value, onValueChange) => (
    <View style={styles.settingItem}>
      <Icon name={icon} type="material" color="#0288D1" size={24} style={styles.icon} />
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
      {typeof value === 'boolean' && (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={value ? '#0288D1' : '#f4f3f4'}
        />
      )}
    </View>
  );

  const renderSettingLink = (icon, title, description) => (
    <View style={styles.settingItem}>
      <Icon name={icon} type="material" color="#0288D1" size={24} style={styles.icon} />
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
      <Icon name="chevron-right" type="material" color="#666" size={24} />
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>
          {renderSettingItem(
            'notifications',
            'Notificaciones',
            'Recibe alertas sobre tus citas y servicios',
            notifications,
            setNotifications
          )}
          {renderSettingItem(
            'location-on',
            'Servicios de ubicación',
            'Permite acceso a tu ubicación',
            locationServices,
            setLocationServices
          )}
          {renderSettingItem(
            'brightness-2',
            'Modo oscuro',
            'Cambia el tema de la aplicación',
            darkMode,
            setDarkMode
          )}
        </View>

        <Divider style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Seguridad</Text>
          {renderSettingItem(
            'fingerprint',
            'Autenticación biométrica',
            'Usa tu huella digital para iniciar sesión',
            biometric,
            setBiometric
          )}
          {renderSettingLink(
            'lock',
            'Cambiar contraseña',
            'Actualiza tu contraseña de acceso'
          )}
        </View>

        <Divider style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información</Text>
          {renderSettingLink(
            'help',
            'Ayuda y soporte',
            'Preguntas frecuentes y contacto'
          )}
          {renderSettingLink(
            'description',
            'Términos y condiciones',
            'Información legal de la aplicación'
          )}
          {renderSettingLink(
            'privacy-tip',
            'Política de privacidad',
            'Cómo manejamos tus datos'
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.version}>Versión 1.0.0</Text>
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
            color="#666"
            onPress={() => navigation.navigate('Profile')}
          />
          <Text style={styles.navText}>Perfil</Text>
        </View>

        <View style={styles.navItem}>
          <Icon
            name="settings"
            type="material"
            size={28}
            color="#808080"
            onPress={() => navigation.navigate('Settings')}
          />
          <Text style={[styles.navText, styles.activeNavText]}>Configuración</Text>
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
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    marginRight: 15,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  divider: {
    backgroundColor: '#eee',
    height: 1,
  },
  version: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
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
    color: '#808080',
    fontWeight: 'bold',
  },
});

export default SettingsScreen; 