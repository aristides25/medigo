import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Platform, Alert } from 'react-native';
import { Text, Button, Icon, Divider, Input } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar } from 'react-native-calendars';
import { useAppointment } from '../../context/AppointmentContext';

// Constantes de diseño (mantener consistencia)
const SPACING = 8;
const COLORS = {
  primary: '#0077B6',
  primaryLight: '#E1F5FE',
  success: '#4CAF50',
  warning: '#FFC107',
  danger: '#F44336',
  grey: '#757575',
  white: '#FFFFFF',
  background: '#F5F7FA',
  cardBg: 'rgba(255, 255, 255, 0.95)',
};

// Datos de ejemplo de horarios disponibles
const TIME_SLOTS = [
  { id: '1', time: '09:00', period: 'AM' },
  { id: '2', time: '10:30', period: 'AM' },
  { id: '3', time: '11:45', period: 'AM' },
  { id: '4', time: '02:30', period: 'PM' },
  { id: '5', time: '03:45', period: 'PM' },
  { id: '6', time: '05:00', period: 'PM' },
];

const BookAppointmentScreen = ({ route, navigation }) => {
  const { provider, isRescheduling, originalAppointment } = route.params;
  const { createAppointment, updateAppointment } = useAppointment();
  
  // Si es reprogramación, usar los datos de la cita original
  const [selectedDate, setSelectedDate] = useState(
    isRescheduling ? new Date(originalAppointment.date) : null
  );
  const [selectedTime, setSelectedTime] = useState(
    isRescheduling ? new Date(originalAppointment.date).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    }).replace(':', '') : null
  );
  const [reason, setReason] = useState(
    isRescheduling ? originalAppointment.reason : ''
  );
  const [notes, setNotes] = useState(
    isRescheduling ? originalAppointment.notes : ''
  );
  const [loading, setLoading] = useState(false);

  // Validar que tenemos un proveedor válido
  useEffect(() => {
    if (!provider) {
      Alert.alert(
        'Error',
        'No se encontró información del proveedor',
        [
          {
            text: 'Volver',
            onPress: () => navigation.goBack()
          }
        ]
      );
      return;
    }
  }, [provider]);

  const handleDateSelect = (date) => {
    setSelectedDate(date.dateString);
    setSelectedTime(null);
  };

  const handleTimeSelect = (slot) => {
    setSelectedTime(slot.time);
  };

  const handleConfirmBooking = async () => {
    if (!provider) {
      Alert.alert('Error', 'No se encontró información del proveedor');
      return;
    }

    if (!selectedDate || !selectedTime || !reason) {
      Alert.alert('Error', 'Por favor completa todos los campos requeridos');
      return;
    }

    try {
      setLoading(true);

      // Combinar fecha y hora
      const [hours, minutes] = selectedTime.split(':');
      const appointmentDate = new Date(selectedDate);
      appointmentDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

      const appointmentData = {
        provider: {
          id: provider.id,
          name: provider.name,
          specialty: provider.specialty,
          type: provider.type,
        },
        date: appointmentDate.toISOString(),
        type: 'Consulta General',
        reason,
        notes,
        status: 'pendiente',
      };

      if (isRescheduling && originalAppointment) {
        // Actualizar la cita existente
        await updateAppointment(originalAppointment.id, appointmentData);
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
      console.error('Error al procesar la cita:', error);
      Alert.alert('Error', 'Hubo un error al procesar la cita. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  // Obtener la fecha actual en formato YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];

  // Marcar los próximos 7 días como disponibles
  const getMarkedDates = () => {
    const marked = {};
    let currentDate = new Date();
    
    for (let i = 0; i < 7; i++) {
      const dateString = currentDate.toISOString().split('T')[0];
      marked[dateString] = {
        marked: true,
        dotColor: COLORS.primary,
      };
      
      if (dateString === selectedDate) {
        marked[dateString] = {
          ...marked[dateString],
          selected: true,
          selectedColor: COLORS.primary,
        };
      }
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return marked;
  };

  const TimeSlot = ({ slot, selected }) => (
    <TouchableOpacity
      style={[
        styles.timeSlot,
        selected && styles.selectedTimeSlot
      ]}
      onPress={() => handleTimeSelect(slot)}
      activeOpacity={0.7}
    >
      <Text style={[
        styles.timeText,
        selected && styles.selectedTimeText
      ]}>
        {slot.time} {slot.period}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[COLORS.primaryLight, COLORS.background]}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Agendar Cita</Text>
          <Text style={styles.subtitle}>Selecciona fecha y hora para tu consulta</Text>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.calendarCard}>
          <Text style={styles.sectionTitle}>Fecha de la Cita</Text>
          <Calendar
            current={today}
            minDate={today}
            maxDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
            onDayPress={handleDateSelect}
            markedDates={getMarkedDates()}
            theme={{
              backgroundColor: COLORS.white,
              calendarBackground: COLORS.white,
              textSectionTitleColor: COLORS.grey,
              selectedDayBackgroundColor: COLORS.primary,
              selectedDayTextColor: COLORS.white,
              todayTextColor: COLORS.primary,
              dayTextColor: '#333',
              textDisabledColor: '#d9e1e8',
              dotColor: COLORS.primary,
              selectedDotColor: COLORS.white,
              arrowColor: COLORS.primary,
              monthTextColor: '#333',
              textDayFontWeight: '300',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '300',
            }}
          />
        </View>

        {selectedDate && (
          <View style={styles.timeSection}>
            <Text style={styles.sectionTitle}>Horarios Disponibles</Text>
            <View style={styles.timeSlotsGrid}>
              {TIME_SLOTS.map(slot => (
                <TimeSlot
                  key={slot.id}
                  slot={slot}
                  selected={selectedTime === slot.time}
                />
              ))}
            </View>
          </View>
        )}

        <View style={styles.formSection}>
          {/* Motivo de la Consulta */}
          <View style={styles.inputContainer}>
            <Text style={styles.sectionTitle}>Motivo de la Consulta *</Text>
            <Input
              value={reason}
              onChangeText={setReason}
              placeholder="Ej: Consulta de rutina, dolor de cabeza, etc."
              multiline
              numberOfLines={3}
              containerStyle={styles.inputWrapper}
              inputStyle={styles.input}
              placeholderTextColor={COLORS.grey}
              leftIcon={
                <Icon
                  name="clipboard-text"
                  type="material-community"
                  size={24}
                  color={COLORS.primary}
                />
              }
            />
          </View>

          {/* Notas Adicionales */}
          <View style={styles.inputContainer}>
            <Text style={styles.sectionTitle}>Notas Adicionales (Opcional)</Text>
            <Input
              value={notes}
              onChangeText={setNotes}
              placeholder="Información adicional importante que el médico deba saber"
              multiline
              numberOfLines={3}
              containerStyle={styles.inputWrapper}
              inputStyle={styles.input}
              placeholderTextColor={COLORS.grey}
              leftIcon={
                <Icon
                  name="note-text"
                  type="material-community"
                  size={24}
                  color={COLORS.primary}
                />
              }
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title={isRescheduling ? "Confirmar Reprogramación" : "Confirmar Cita"}
          onPress={handleConfirmBooking}
          disabled={!selectedDate || !selectedTime || !reason || loading}
          loading={loading}
          buttonStyle={[
            styles.confirmButton,
            (!selectedDate || !selectedTime || !reason) && styles.disabledButton
          ]}
          titleStyle={styles.confirmButtonText}
          icon={{
            name: 'check',
            type: 'material-community',
            size: 20,
            color: COLORS.white
          }}
          iconRight
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerGradient: {
    paddingTop: SPACING * 2,
    paddingBottom: SPACING * 3,
  },
  header: {
    padding: SPACING * 2,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.grey,
    marginBottom: SPACING * 2,
  },
  content: {
    flex: 1,
    padding: SPACING * 2,
  },
  calendarCard: {
    backgroundColor: COLORS.white,
    borderRadius: SPACING * 2,
    padding: SPACING * 2,
    marginBottom: SPACING * 2,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: SPACING * 2,
  },
  timeSection: {
    backgroundColor: COLORS.white,
    borderRadius: SPACING * 2,
    padding: SPACING * 2,
    marginBottom: SPACING * 2,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  timeSlotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeSlot: {
    width: '48%',
    backgroundColor: COLORS.background,
    borderRadius: SPACING,
    padding: SPACING * 2,
    marginBottom: SPACING * 2,
    alignItems: 'center',
  },
  selectedTimeSlot: {
    backgroundColor: COLORS.primary,
  },
  timeText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '500',
  },
  selectedTimeText: {
    color: COLORS.white,
  },
  footer: {
    padding: SPACING * 2,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SPACING * 3,
    paddingVertical: SPACING * 2,
  },
  disabledButton: {
    backgroundColor: COLORS.grey,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: SPACING,
  },
  formSection: {
    padding: SPACING * 2,
    backgroundColor: COLORS.white,
    borderRadius: SPACING * 2,
    marginTop: SPACING * 2,
    marginHorizontal: SPACING * 2,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  inputContainer: {
    marginBottom: SPACING * 3,
  },
  inputWrapper: {
    paddingHorizontal: 0,
  },
  input: {
    minHeight: 80,
    textAlignVertical: 'top',
    paddingTop: SPACING,
  },
});

export default BookAppointmentScreen; 