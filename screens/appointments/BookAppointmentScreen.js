import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { Text, Button, Card, Input } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAppointment } from '../../context/AppointmentContext';

const BookAppointmentScreen = ({ route, navigation }) => {
  const { provider, isRescheduling, originalAppointment } = route.params;
  const { createAppointment, updateAppointment } = useAppointment();
  
  // Si es reprogramación, usar los datos de la cita original
  const [selectedDate, setSelectedDate] = useState(
    isRescheduling ? new Date(originalAppointment.date) : new Date()
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(
    isRescheduling ? new Date(originalAppointment.date).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    }).replace(':', '') : ''
  );
  const [reason, setReason] = useState(
    isRescheduling ? originalAppointment.reason : ''
  );
  const [notes, setNotes] = useState(
    isRescheduling ? originalAppointment.notes : ''
  );
  const [loading, setLoading] = useState(false);

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleConfirmBooking = async () => {
    if (!selectedTime || !reason) {
      Alert.alert('Error', 'Por favor completa todos los campos requeridos');
      return;
    }

    try {
      setLoading(true);

      // Combinar fecha y hora
      const [hours, minutes] = selectedTime.match(/(\d+):(\d+)/).slice(1);
      const appointmentDate = new Date(selectedDate);
      appointmentDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

      const appointmentData = {
        provider: {
          id: provider.id,
          name: provider.name,
          specialty: provider.specialty,
          type: provider.type,
        },
        date: appointmentDate.toISOString(), // Convertir a ISO string para consistencia
        type: 'Consulta General',
        reason,
        notes,
      };

      if (isRescheduling) {
        // Actualizar la cita existente
        await updateAppointment(originalAppointment.id, {
          ...appointmentData,
          status: 'pendiente', // Resetear el estado al reprogramar
        });
        Alert.alert(
          'Cita Reprogramada',
          'Tu cita ha sido reprogramada exitosamente',
          [
            {
              text: 'Ver Detalles',
              onPress: () => navigation.navigate('AppointmentDetail', { 
                appointment: {
                  ...originalAppointment,
                  ...appointmentData,
                  id: originalAppointment.id,
                  status: 'pendiente',
                }
              }),
            },
            {
              text: 'Volver a Citas',
              onPress: () => navigation.navigate('Appointments'),
            },
          ]
        );
      } else {
        // Crear nueva cita
        const newAppointment = await createAppointment(appointmentData);
        Alert.alert(
          'Cita Agendada',
          'Tu cita ha sido agendada exitosamente',
          [
            {
              text: 'Ver Detalles',
              onPress: () => navigation.navigate('AppointmentDetail', { appointment: newAppointment }),
            },
            {
              text: 'Volver a Citas',
              onPress: () => navigation.navigate('Appointments'),
            },
          ]
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un error al procesar la cita. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const availableTimes = [
    '09:00', '10:00', '11:00',
    '14:00', '15:00', '16:00'
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Card>
          <Card.Title>
            {isRescheduling ? 'Reprogramar Cita con ' : 'Reservar Cita con '}
            {provider.name}
          </Card.Title>
          <Card.Divider />
          
          {/* Selección de Fecha */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Fecha de la Cita</Text>
            <Button
              title={selectedDate.toLocaleDateString()}
              onPress={() => setShowDatePicker(true)}
              type="outline"
            />
            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="default"
                onChange={handleDateChange}
                minimumDate={new Date()}
              />
            )}
          </View>

          {/* Selección de Hora */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Horarios Disponibles</Text>
            <View style={styles.timeGrid}>
              {availableTimes.map((time) => (
                <Button
                  key={time}
                  title={time}
                  type={selectedTime === time ? "solid" : "outline"}
                  onPress={() => setSelectedTime(time)}
                  containerStyle={styles.timeButton}
                />
              ))}
            </View>
          </View>

          {/* Motivo de la Consulta */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Motivo de la Consulta *</Text>
            <Input
              value={reason}
              onChangeText={setReason}
              placeholder="Ej: Consulta de rutina"
              multiline
              required
            />
          </View>

          {/* Notas Adicionales */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notas Adicionales</Text>
            <Input
              value={notes}
              onChangeText={setNotes}
              placeholder="Información adicional importante"
              multiline
            />
          </View>

          {/* Botón de Confirmación */}
          <Button
            title={isRescheduling ? "Confirmar Reprogramación" : "Confirmar Cita"}
            onPress={handleConfirmBooking}
            disabled={!selectedTime || !reason || loading}
            loading={loading}
            buttonStyle={styles.confirmButton}
          />
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
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#444',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeButton: {
    width: '30%',
    marginBottom: 10,
  },
  confirmButton: {
    backgroundColor: '#0077B6',
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 10,
  },
});

export default BookAppointmentScreen; 