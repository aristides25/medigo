import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text, Card, Button, Icon, Divider } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMedicalRecord } from '../../context/MedicalRecordContext';
import { LinearGradient } from 'expo-linear-gradient';

const MedicalRecordsScreen = ({ navigation }) => {
  const { appointments, documents, prescriptions, loading } = useMedicalRecord();

  const quickActions = [
    {
      id: 1,
      title: 'Subir Documento',
      icon: 'file-upload',
      route: 'UploadDocument',
      description: 'Añade documentos médicos a tu expediente',
      gradient: ['#4facfe', '#00f2fe']
    },
    {
      id: 2,
      title: 'Compartir Expediente',
      icon: 'share-variant',
      route: 'ShareRecords',
      description: 'Comparte tu expediente con proveedores médicos',
      gradient: ['#6a11cb', '#2575fc']
    },
    {
      id: 3,
      title: 'Recetas Digitales',
      icon: 'file-document-edit',
      route: 'DigitalPrescriptions',
      description: 'Gestiona tus recetas médicas',
      gradient: ['#1d976c', '#93f9b9']
    },
  ];

  const recordSections = [
    {
      id: 1,
      title: 'Historial de Citas',
      icon: 'calendar-clock',
      route: 'AppointmentHistory',
      count: appointments.length,
      color: '#4facfe'
    },
    {
      id: 2,
      title: 'Documentos Médicos',
      icon: 'file-document-multiple',
      route: 'MedicalDocuments',
      count: documents.length,
      color: '#6a11cb'
    },
    {
      id: 3,
      title: 'Resultados de Laboratorio',
      icon: 'test-tube',
      route: 'LabResults',
      count: documents.filter(doc => doc.type === 'LAB_RESULT').length,
      color: '#1d976c'
    },
    {
      id: 4,
      title: 'Historial de Prescripciones',
      icon: 'prescription',
      route: 'PrescriptionHistory',
      count: prescriptions.length,
      color: '#f77062'
    },
  ];

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4facfe" />
        <Text style={styles.loadingText}>Cargando tu expediente médico...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Resumen del Expediente */}
        <LinearGradient
          colors={['#E8F4F8', '#ffffff']}
          style={styles.headerGradient}
        >
          <View style={styles.summaryHeader}>
            <Icon
              name="folder-account"
              type="material-community"
              size={40}
              color="#4facfe"
            />
            <Text style={styles.summaryTitle}>Tu Expediente Médico</Text>
          </View>
          <Text style={styles.lastUpdate}>
            Última actualización: {new Date().toLocaleDateString('es-ES')}
          </Text>
        </LinearGradient>

        {/* Acciones Rápidas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity 
                key={action.id}
                style={styles.actionCard}
                onPress={() => navigation.navigate(action.route)}
              >
                <LinearGradient
                  colors={action.gradient}
                  style={styles.actionGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Icon
                    name={action.icon}
                    type="material-community"
                    size={32}
                    color="#fff"
                  />
                  <Text style={styles.actionTitle}>{action.title}</Text>
                  <Text style={styles.actionDescription}>
                    {action.description}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Secciones del Expediente */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tu Información Médica</Text>
          {recordSections.map((section) => (
            <TouchableOpacity
              key={section.id}
              onPress={() => navigation.navigate(section.route)}
            >
              <Card containerStyle={[styles.sectionCard, { borderLeftColor: section.color }]}>
                <View style={styles.sectionContent}>
                  <View style={styles.sectionLeft}>
                    <View style={[styles.iconContainer, { backgroundColor: `${section.color}15` }]}>
                      <Icon
                        name={section.icon}
                        type="material-community"
                        size={24}
                        color={section.color}
                      />
                    </View>
                    <View style={styles.sectionTextContainer}>
                      <Text style={styles.sectionText}>{section.title}</Text>
                      <Text style={styles.sectionCount}>{section.count} registros</Text>
                    </View>
                  </View>
                  <Icon
                    name="chevron-right"
                    type="material-community"
                    size={24}
                    color="#666"
                  />
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#4a5568',
  },
  headerGradient: {
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
    shadowColor: '#4facfe',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  summaryTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 12,
    color: '#2d3748',
  },
  lastUpdate: {
    color: '#718096',
    fontSize: 14,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2d3748',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    marginBottom: 15,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  actionGradient: {
    padding: 20,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
    textAlign: 'center',
  },
  actionDescription: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 6,
    opacity: 0.9,
  },
  sectionCard: {
    borderRadius: 16,
    marginBottom: 12,
    padding: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  sectionTextContainer: {
    flex: 1,
  },
  sectionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 4,
  },
  sectionCount: {
    fontSize: 14,
    color: '#718096',
  },
});

export default MedicalRecordsScreen; 