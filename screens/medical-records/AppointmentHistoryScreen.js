import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card, Icon, Button, LinearProgress } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMedicalRecord } from '../../context/MedicalRecordContext';
import { LinearGradient } from 'expo-linear-gradient';

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
        {Object.entries(groupedAppointments).map(([month, monthAppointments]) => (
          <View key={month} style={styles.monthSection}>
            <Text style={styles.monthTitle}>
              {month.charAt(0).toUpperCase() + month.slice(1)}
            </Text>
            {monthAppointments.map((appointment) => (
              <Card key={appointment.id} containerStyle={styles.appointmentCard}>
                <View style={styles.appointmentHeader}>
                  <View style={styles.doctorInfo}>
                    <Text style={styles.doctorName}>
                      {appointment.provider.name}
                    </Text>
                    <Text style={styles.specialty}>
                      {appointment.provider.specialty}
                    </Text>
                  </View>
                  <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>
                      {new Date(appointment.date).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'short'
                      })}
                    </Text>
                    <Text style={styles.timeText}>
                      {new Date(appointment.date).toLocaleTimeString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </Text>
                  </View>
                </View>

                <View style={styles.diagnosisContainer}>
                  <Text style={styles.diagnosisLabel}>Diagnóstico:</Text>
                  <Text style={styles.diagnosisText}>
                    {appointment.diagnosis || 'No registrado'}
                  </Text>
                </View>

                {appointment.notes && (
                  <View style={styles.notesContainer}>
                    <Text style={styles.notesText}>{appointment.notes}</Text>
                  </View>
                )}

                <View style={styles.cardFooter}>
                  {appointment.prescriptionIds?.length > 0 && (
                    <Button
                      title="Ver Receta"
                      type="outline"
                      buttonStyle={styles.prescriptionButton}
                      titleStyle={styles.prescriptionButtonText}
                      icon={{
                        name: 'file-document-outline',
                        type: 'material-community',
                        size: 20,
                        color: '#4facfe'
                      }}
                      onPress={() => navigation.navigate('PrescriptionDetail', {
                        prescriptionId: appointment.prescriptionIds[0]
                      })}
                    />
                  )}
                  <Button
                    title="Detalles"
                    buttonStyle={styles.detailsButton}
                    titleStyle={styles.detailsButtonText}
                    icon={{
                      name: 'chevron-right',
                      type: 'material-community',
                      size: 20,
                      color: '#fff'
                    }}
                    iconRight
                    onPress={() => navigation.navigate('AppointmentDetail', {
                      appointment
                    })}
                  />
                </View>
              </Card>
            ))}
          </View>
        ))}

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
  monthSection: {
    marginBottom: 20,
  },
  monthTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 15,
    paddingLeft: 5,
  },
  appointmentCard: {
    borderRadius: 16,
    marginBottom: 15,
    padding: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#4facfe',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 4,
  },
  specialty: {
    fontSize: 14,
    color: '#718096',
  },
  dateContainer: {
    alignItems: 'flex-end',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4facfe',
  },
  timeText: {
    fontSize: 14,
    color: '#718096',
    marginTop: 2,
  },
  diagnosisContainer: {
    marginTop: 8,
    marginBottom: 12,
  },
  diagnosisLabel: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 4,
  },
  diagnosisText: {
    fontSize: 15,
    color: '#2d3748',
  },
  notesContainer: {
    backgroundColor: '#f7fafc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  notesText: {
    fontSize: 14,
    color: '#4a5568',
    fontStyle: 'italic',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 8,
  },
  prescriptionButton: {
    borderColor: '#4facfe',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 10,
  },
  prescriptionButtonText: {
    color: '#4facfe',
    fontSize: 14,
  },
  detailsButton: {
    backgroundColor: '#4facfe',
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 14,
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