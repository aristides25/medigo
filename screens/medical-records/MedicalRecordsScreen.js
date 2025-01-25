import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card, Button, Icon, Divider } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';

const MedicalRecordsScreen = ({ navigation }) => {
  const quickActions = [
    {
      id: 1,
      title: 'Subir Documento',
      icon: 'file-upload',
      route: 'UploadDocument',
      description: 'Añade documentos médicos a tu expediente',
    },
    {
      id: 2,
      title: 'Compartir Expediente',
      icon: 'share-variant',
      route: 'ShareRecords',
      description: 'Comparte tu expediente con proveedores médicos',
    },
    {
      id: 3,
      title: 'Recetas Digitales',
      icon: 'file-document-edit',
      route: 'DigitalPrescriptions',
      description: 'Gestiona tus recetas médicas',
    },
  ];

  const recordSections = [
    {
      id: 1,
      title: 'Historial de Citas',
      icon: 'calendar-clock',
      route: 'AppointmentHistory',
      count: 12,
    },
    {
      id: 2,
      title: 'Documentos Médicos',
      icon: 'file-document-multiple',
      route: 'MedicalDocuments',
      count: 8,
    },
    {
      id: 3,
      title: 'Resultados de Laboratorio',
      icon: 'test-tube',
      route: 'LabResults',
      count: 5,
    },
    {
      id: 4,
      title: 'Historial de Prescripciones',
      icon: 'prescription',
      route: 'PrescriptionHistory',
      count: 15,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Resumen del Expediente */}
        <Card containerStyle={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Icon
              name="folder-account"
              type="material-community"
              size={40}
              color="#0077B6"
            />
            <Text style={styles.summaryTitle}>Tu Expediente Médico</Text>
          </View>
          <Divider style={styles.divider} />
          <Text style={styles.lastUpdate}>
            Última actualización: {new Date().toLocaleDateString('es-ES')}
          </Text>
        </Card>

        {/* Acciones Rápidas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
          {quickActions.map((action) => (
            <Card key={action.id} containerStyle={styles.actionCard}>
              <View style={styles.actionContent}>
                <Icon
                  name={action.icon}
                  type="material-community"
                  size={32}
                  color="#0077B6"
                />
                <View style={styles.actionText}>
                  <Text style={styles.actionTitle}>{action.title}</Text>
                  <Text style={styles.actionDescription}>
                    {action.description}
                  </Text>
                </View>
                <Button
                  icon={{
                    name: 'chevron-right',
                    type: 'material-community',
                    color: 'white',
                  }}
                  onPress={() => navigation.navigate(action.route)}
                  buttonStyle={styles.actionButton}
                />
              </View>
            </Card>
          ))}
        </View>

        {/* Secciones del Expediente */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tu Información Médica</Text>
          {recordSections.map((section) => (
            <Card key={section.id} containerStyle={styles.sectionCard}>
              <TouchableOpacity
                onPress={() => navigation.navigate(section.route)}
                style={styles.sectionContent}
              >
                <View style={styles.sectionLeft}>
                  <Icon
                    name={section.icon}
                    type="material-community"
                    size={24}
                    color="#0077B6"
                  />
                  <Text style={styles.sectionText}>{section.title}</Text>
                </View>
                <View style={styles.sectionRight}>
                  <Text style={styles.sectionCount}>{section.count}</Text>
                  <Icon
                    name="chevron-right"
                    type="material-community"
                    size={24}
                    color="#666"
                  />
                </View>
              </TouchableOpacity>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  summaryCard: {
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  summaryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#444',
  },
  divider: {
    marginVertical: 10,
  },
  lastUpdate: {
    color: '#666',
    fontSize: 14,
  },
  section: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#444',
  },
  actionCard: {
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    flex: 1,
    marginLeft: 15,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
  actionDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  actionButton: {
    borderRadius: 25,
    backgroundColor: '#0077B6',
    paddingHorizontal: 15,
  },
  sectionCard: {
    borderRadius: 10,
    marginBottom: 10,
    padding: 0,
  },
  sectionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  sectionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#444',
  },
  sectionRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionCount: {
    fontSize: 16,
    color: '#666',
    marginRight: 10,
  },
});

export default MedicalRecordsScreen; 