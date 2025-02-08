import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Text, Card, Icon, Button, LinearProgress } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMedicalRecord } from '../../context/MedicalRecordContext';
import { LinearGradient } from 'expo-linear-gradient';

// Datos de ejemplo
const MOCK_APPOINTMENTS = [
  {
    id: '1',
    doctor: 'Dr. Juan Pérez',
    specialty: 'Medicina General',
    date: '2024-02-15',
    time: '14:30',
    status: 'Completada',
    notes: 'Control de rutina'
  },
  {
    id: '2',
    doctor: 'Dra. María García',
    specialty: 'Cardiología',
    date: '2024-02-01',
    time: '10:00',
    status: 'Completada',
    notes: 'Chequeo cardíaco anual'
  },
  {
    id: '3',
    doctor: 'Dr. Carlos Rodríguez',
    specialty: 'Dermatología',
    date: '2024-01-20',
    time: '16:15',
    status: 'Completada',
    notes: 'Revisión de lunar'
  }
];

const AppointmentHistoryScreen = ({ navigation }) => {
  const { appointments } = useMedicalRecord();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const years = [...new Set(appointments.map(app => new Date(app.date).getFullYear()))].sort((a, b) => b - a);

  const filteredAppointments = appointments
    .filter(app => new Date(app.date).getFullYear() === selectedYear)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const getMonthName = (date) => {
    return new Date(date).toLocaleString('es-ES', { month: 'long' });
  };

  const groupedAppointments = filteredAppointments.reduce((groups, appointment) => {
    const month = getMonthName(appointment.date);
    if (!groups[month]) {
      groups[month] = [];
    }
    groups[month].push(appointment);
    return groups;
  }, {});

  const renderAppointmentItem = ({ item }) => (
    <Card containerStyle={styles.card}>
      <View style={styles.cardHeader}>
        <Icon
          name="calendar-check"
          type="material-community"
          size={24}
          color="#4facfe"
        />
        <View style={styles.headerInfo}>
          <Text style={styles.doctorName}>{item.doctor}</Text>
          <Text style={styles.specialty}>{item.specialty}</Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Icon name="calendar" type="font-awesome" size={16} color="#718096" />
          <Text style={styles.detailText}>{item.date}</Text>
        </View>

        <View style={styles.detailRow}>
          <Icon name="clock" type="material-community" size={16} color="#718096" />
          <Text style={styles.detailText}>{item.time}</Text>
        </View>

        <View style={styles.detailRow}>
          <Icon name="note-text" type="material-community" size={16} color="#718096" />
          <Text style={styles.detailText}>{item.notes}</Text>
        </View>

        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#E8F4F8', '#ffffff']}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <Icon
            name="calendar-clock"
            type="material-community"
            size={32}
            color="#4facfe"
          />
          <Text style={styles.headerTitle}>Historial de Citas</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.yearSelector}
        >
          {years.map(year => (
            <TouchableOpacity
              key={year}
              style={[
                styles.yearButton,
                selectedYear === year && styles.selectedYearButton
              ]}
              onPress={() => setSelectedYear(year)}
            >
              <Text style={[
                styles.yearText,
                selectedYear === year && styles.selectedYearText
              ]}>
                {year}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <FlatList
          data={MOCK_APPOINTMENTS}
          renderItem={renderAppointmentItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
        />

        {filteredAppointments.length === 0 && (
          <View style={styles.emptyState}>
            <Icon
              name="calendar-blank"
              type="material-community"
              size={60}
              color="#718096"
            />
            <Text style={styles.emptyStateText}>
              No hay citas registradas en {selectedYear}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  headerGradient: {
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#4facfe',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 12,
    color: '#2d3748',
  },
  yearSelector: {
    paddingHorizontal: 15,
  },
  yearButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedYearButton: {
    backgroundColor: '#4facfe',
  },
  yearText: {
    fontSize: 16,
    color: '#4a5568',
    fontWeight: '600',
  },
  selectedYearText: {
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  listContainer: {
    padding: 16,
  },
  card: {
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#4facfe',
    shadowColor: '#4facfe',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerInfo: {
    marginLeft: 12,
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3748',
  },
  specialty: {
    fontSize: 14,
    color: '#718096',
    marginTop: 2,
  },
  detailsContainer: {
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#4a5568',
  },
  statusContainer: {
    marginTop: 8,
    backgroundColor: '#e6fffa',
    padding: 8,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: '#38b2ac',
    fontSize: 14,
    fontWeight: '500',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#718096',
    marginTop: 12,
    textAlign: 'center',
  },
});

export default AppointmentHistoryScreen; 