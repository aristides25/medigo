import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import { useTelemedicine } from '../../../context/TelemedicineContext';

// Datos de ejemplo de horarios disponibles
const AVAILABLE_DATES = [
  { id: '1', date: '2024-03-20', dayName: 'Miércoles', dayNumber: '20' },
  { id: '2', date: '2024-03-21', dayName: 'Jueves', dayNumber: '21' },
  { id: '3', date: '2024-03-22', dayName: 'Viernes', dayNumber: '22' },
  { id: '4', date: '2024-03-23', dayName: 'Sábado', dayNumber: '23' },
  { id: '5', date: '2024-03-24', dayName: 'Domingo', dayNumber: '24' },
];

const TIME_SLOTS = [
  { id: '1', time: '09:00', period: 'AM' },
  { id: '2', time: '10:30', period: 'AM' },
  { id: '3', time: '11:45', period: 'AM' },
  { id: '4', time: '02:30', period: 'PM' },
  { id: '5', time: '03:45', period: 'PM' },
  { id: '6', time: '05:00', period: 'PM' },
];

const ScheduleScreen = ({ navigation, route }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const { currentConsultation, addConsultation } = useTelemedicine();
  const { doctor } = currentConsultation;

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
        dotColor: '#2196F3',
      };
      
      if (dateString === selectedDate) {
        marked[dateString] = {
          ...marked[dateString],
          selected: true,
          selectedColor: '#2196F3',
        };
      }
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return marked;
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date.dateString);
    setSelectedTime(null);
  };

  const handleTimeSelect = (timeSlot) => {
    setSelectedTime(timeSlot);
  };

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      const consultation = {
        doctor,
        scheduledDate: selectedDate,
        scheduledTime: `${selectedTime.time} ${selectedTime.period}`,
      };
      
      const newConsultation = addConsultation(consultation);
      navigation.navigate('Payment', { consultationId: newConsultation.id });
    }
  };

  const TimeSlot = ({ slot, selected }) => (
    <TouchableOpacity
      style={[styles.timeSlot, selected && styles.selectedTimeSlot]}
      onPress={() => handleTimeSelect(slot)}
    >
      <Text style={[styles.timeText, selected && styles.selectedTimeText]}>
        {slot.time} {slot.period}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.doctorInfo}>
        <Image source={{ uri: doctor.image }} style={styles.doctorImage} />
        <View style={styles.doctorDetails}>
          <Text style={styles.doctorName}>{doctor.name}</Text>
          <Text style={styles.specialty}>{doctor.specialty}</Text>
        </View>
      </View>

      <View style={styles.calendarContainer}>
        <Text style={styles.sectionTitle}>Selecciona una fecha</Text>
        <Calendar
          current={today}
          minDate={today}
          maxDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
          onDayPress={handleDateSelect}
          markedDates={getMarkedDates()}
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#666666',
            selectedDayBackgroundColor: '#2196F3',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#2196F3',
            dayTextColor: '#333333',
            textDisabledColor: '#d9e1e8',
            dotColor: '#2196F3',
            selectedDotColor: '#ffffff',
            arrowColor: '#2196F3',
            monthTextColor: '#333333',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
          }}
        />
      </View>

      {selectedDate && (
        <View style={styles.timeSection}>
          <Text style={styles.sectionTitle}>Horarios disponibles</Text>
          <View style={styles.timeSlotsContainer}>
            {TIME_SLOTS.map(slot => (
              <TimeSlot
                key={slot.id}
                slot={slot}
                selected={selectedTime?.id === slot.id}
              />
            ))}
          </View>
        </View>
      )}

      <TouchableOpacity
        style={[
          styles.confirmButton,
          (!selectedDate || !selectedTime) && styles.disabledButton,
        ]}
        onPress={handleConfirm}
        disabled={!selectedDate || !selectedTime}
      >
        <Text style={styles.confirmButtonText}>Confirmar horario</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    elevation: 2,
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  doctorDetails: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  specialty: {
    fontSize: 14,
    color: '#666',
  },
  calendarContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  timeSection: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    elevation: 2,
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeSlot: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    width: '48%',
    alignItems: 'center',
  },
  selectedTimeSlot: {
    backgroundColor: '#2196F3',
  },
  timeText: {
    fontSize: 16,
    color: '#333',
  },
  selectedTimeText: {
    color: 'white',
  },
  confirmButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ScheduleScreen; 