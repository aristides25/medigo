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
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  duration: {
    fontSize: 14,
    color: '#888',
  },
  section: {
    backgroundColor: 'white',
    marginTop: 12,
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  content: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#2196F3',
    margin: 20,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PostConsultationScreen; 