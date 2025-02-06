import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const PostConsultationScreen = ({ route, navigation }) => {
  const { consultationNotes, consultationId, duration, doctorName } = route.params;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} minutos ${secs} segundos`;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Resumen de la Consulta</Text>
        <Text style={styles.subtitle}>Doctor: {doctorName}</Text>
        <Text style={styles.duration}>Duración: {formatTime(duration)}</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons name="medical-services" size={24} color="#2196F3" />
          <Text style={styles.sectionTitle}>Síntomas Reportados</Text>
        </View>
        <Text style={styles.content}>{consultationNotes.symptoms || 'No se registraron síntomas'}</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons name="assignment" size={24} color="#2196F3" />
          <Text style={styles.sectionTitle}>Diagnóstico</Text>
        </View>
        <Text style={styles.content}>{consultationNotes.diagnosis || 'No se registró diagnóstico'}</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons name="healing" size={24} color="#2196F3" />
          <Text style={styles.sectionTitle}>Tratamiento Recomendado</Text>
        </View>
        <Text style={styles.content}>{consultationNotes.treatment || 'No se registró tratamiento'}</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons name="event" size={24} color="#2196F3" />
          <Text style={styles.sectionTitle}>Próximos Pasos</Text>
        </View>
        <Text style={styles.content}>{consultationNotes.nextSteps || 'No se registraron próximos pasos'}</Text>
      </View>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('TelemedicineHome')}
      >
        <Text style={styles.buttonText}>Volver a Mis Consultas</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F4F8',
  },
  header: {
    padding: 24,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    shadowColor: '#4facfe',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#2d3748',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#4A5568',
    marginBottom: 6,
  },
  duration: {
    fontSize: 15,
    color: '#718096',
  },
  section: {
    backgroundColor: '#ffffff',
    marginTop: 15,
    padding: 20,
    borderRadius: 16,
    marginHorizontal: 15,
    shadowColor: '#4facfe',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#F7FAFC',
    padding: 12,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3748',
    marginLeft: 12,
  },
  content: {
    fontSize: 16,
    color: '#4A5568',
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#4facfe',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#4facfe',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PostConsultationScreen; 