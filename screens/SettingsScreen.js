import React from 'react';
import { View, ScrollView, StyleSheet, Platform } from 'react-native';
import { ListItem, Icon, Text, Divider } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';

const SettingsScreen = () => {
  const sections = [
    {
      title: 'Notificaciones',
      icon: 'bell',
      items: [
        { title: 'Recordatorios de citas médicas', icon: 'calendar-clock' },
        { title: 'Estado de medicamentos en farmacia', icon: 'pill' },
        { title: 'Mensajes de doctores/enfermeros', icon: 'message-text' },
        { title: 'Alertas de servicios de ambulancia', icon: 'ambulance' },
      ],
    },
    {
      title: 'Privacidad',
      icon: 'shield-lock',
      items: [
        { title: 'Control de acceso a mi expediente médico', icon: 'folder-lock' },
        { title: 'Contactos de emergencia', icon: 'contacts' },
      ],
    },
    {
      title: 'Pagos',
      icon: 'credit-card',
      items: [
        { title: 'Métodos de pago guardados', icon: 'credit-card-multiple' },
        { title: 'Historial de facturas', icon: 'file-document' },
      ],
    },
    {
      title: 'Ayuda',
      icon: 'help-circle',
      items: [
        { title: 'Preguntas frecuentes', icon: 'frequently-asked-questions' },
        { title: 'Contactar a soporte', icon: 'headset' },
        { title: 'Términos y condiciones', icon: 'file-document-outline' },
        { title: 'Acerca de la app', icon: 'information' },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <Text h4 style={styles.headerTitle}>Configuración</Text>
      </View>

      <ScrollView style={styles.container}>
        {sections.map((section, index) => (
          <View key={section.title} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon
                name={section.icon}
                type="material-community"
                color="#2c3e50"
                size={24}
              />
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>
            
            {section.items.map((item, itemIndex) => (
              <ListItem
                key={item.title}
                onPress={() => {}}
                bottomDivider
              >
                <Icon
                  name={item.icon}
                  type="material-community"
                  color="#7f8c8d"
                  size={22}
                />
                <ListItem.Content>
                  <ListItem.Title style={styles.itemTitle}>
                    {item.title}
                  </ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            ))}

            {index < sections.length - 1 && <View style={styles.sectionDivider} />}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  header: {
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 8 : 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    color: '#2c3e50',
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    marginTop: 16,
    backgroundColor: '#fff',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginLeft: 10,
  },
  itemTitle: {
    color: '#34495e',
    fontSize: 16,
  },
  sectionDivider: {
    height: 8,
    backgroundColor: '#f5f6fa',
  },
});

export default SettingsScreen; 