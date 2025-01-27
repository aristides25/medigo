import React from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { Text, Card, Button, Icon, Divider } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppointment } from '../../context/AppointmentContext';

const AppointmentDetailScreen = ({ route, navigation }) => {
  const { appointment } = route.params;
  const { cancelAppointment } = useAppointment();

  const handleCancelAppointment = () => {
    Alert.alert(
      'Cancelar Cita',
      '¿Estás seguro de que deseas cancelar esta cita?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Sí, Cancelar',
          style: 'destructive',
          onPress: () => {
            cancelAppointment(appointment.id);
            Alert.alert(
              'Cita Cancelada',
              'La cita ha sido cancelada exitosamente',
              [
                {
                  text: 'OK',
                  onPress: () => navigation.goBack(),
                },
              ]
            );
          },
        },
      ]
    );
  };

  const handleReschedule = () => {
    navigation.navigate('BookAppointment', {
      provider: appointment.provider,
      isRescheduling: true,
      originalAppointment: appointment,
    });
  };

  const handleReview = () => {
    navigation.navigate('PostAppointmentReview', { appointment });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmada':
        return '#4CAF50';
      case 'pendiente':
        return '#FFC107';
      case 'cancelada':
        return '#F44336';
      default:
        return '#757575';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Card>
          <View style={styles.statusContainer}>
            <Text style={[styles.status, { color: getStatusColor(appointment.status) }]}>
              {appointment.status.toUpperCase()}
            </Text>
          </View>

          {/* Información del Proveedor */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Proveedor Médico</Text>
            <Text style={styles.providerName}>{appointment.provider.name}</Text>
            <Text style={styles.providerDetail}>{appointment.provider.specialty}</Text>
          </View>

          <Divider style={styles.divider} />

          {/* Detalles de la Cita */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Detalles de la Cita</Text>
            
            <View style={styles.detailRow}>
              <Icon name="calendar" type="font-awesome" size={16} color="#666" />
              <Text style={styles.detailText}>
                {appointment.date ? new Date(appointment.date).toLocaleDateString('es-ES', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }) : 'Fecha no disponible'}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Icon name="clock-o" type="font-awesome" size={16} color="#666" />
              <Text style={styles.detailText}>
                {appointment.date ? new Date(appointment.date).toLocaleTimeString('es-ES', {
                  hour: '2-digit',
                  minute: '2-digit',
                }) : 'Hora no disponible'}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Icon name="stethoscope" type="font-awesome" size={16} color="#666" />
              <Text style={styles.detailText}>{appointment.type}</Text>
            </View>

            {appointment.reason && (
              <View style={styles.detailRow}>
                <Icon name="file-text-o" type="font-awesome" size={16} color="#666" />
                <Text style={styles.detailText}>{appointment.reason}</Text>
              </View>
            )}

            {appointment.notes && (
              <View style={styles.detailRow}>
                <Icon name="sticky-note-o" type="font-awesome" size={16} color="#666" />
                <Text style={styles.detailText}>{appointment.notes}</Text>
              </View>
            )}
          </View>

          <Divider style={styles.divider} />

          {/* Acciones */}
          <View style={styles.actionsContainer}>
            {appointment.status !== 'cancelada' && (
              <>
                <Button
                  title="Reprogramar"
                  icon={{
                    name: 'calendar',
                    type: 'font-awesome',
                    color: 'white',
                  }}
                  buttonStyle={[styles.actionButton, styles.rescheduleButton]}
                  onPress={handleReschedule}
                />

                <Button
                  title="Cancelar Cita"
                  icon={{
                    name: 'times',
                    type: 'font-awesome',
                    color: '#F44336',
                  }}
                  type="outline"
                  buttonStyle={styles.actionButton}
                  titleStyle={{ color: '#F44336' }}
                  onPress={handleCancelAppointment}
                />
              </>
            )}

            {appointment.status === 'completada' && !appointment.hasReview && (
              <Button
                title="Calificar Cita"
                onPress={() => navigation.navigate('PostAppointmentReview', { appointment })}
                buttonStyle={[styles.actionButton, { backgroundColor: '#4CAF50' }]}
                containerStyle={styles.buttonContainer}
                icon={{
                  name: 'star',
                  type: 'material-community',
                  color: 'white',
                  size: 20,
                }}
              />
            )}
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  statusContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  status: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 10,
  },
  providerName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
  },
  providerDetail: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  divider: {
    marginVertical: 15,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  detailText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#444',
  },
  actionsContainer: {
    marginTop: 10,
  },
  actionButton: {
    marginVertical: 5,
    borderRadius: 8,
    paddingVertical: 12,
  },
  rescheduleButton: {
    backgroundColor: '#0077B6',
  },
  reviewButton: {
    backgroundColor: '#FFC107',
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
});

export default AppointmentDetailScreen; 