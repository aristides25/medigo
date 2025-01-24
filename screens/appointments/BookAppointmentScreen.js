import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Button, Card, Input } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';

const BookAppointmentScreen = ({ route, navigation }) => {
  const { provider } = route.params;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleConfirmBooking = () => {
    navigation.navigate('Payment', {
      provider,
      appointmentData: {
        date: selectedDate,
        time: selectedTime,
        reason,
        notes,
      },
    });
  };

  const availableTimes = [
    '9:00 AM', '10:00 AM', '11:00 AM',
    '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Card>
          <Card.Title>Reservar Cita con {provider.name}</Card.Title>
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
            <Text style={styles.sectionTitle}>Motivo de la Consulta</Text>
            <Input
              value={reason}
              onChangeText={setReason}
              placeholder="Ej: Consulta de rutina"
              multiline
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
            title="Continuar al Pago"
            onPress={handleConfirmBooking}
            disabled={!selectedTime || !reason}
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
    backgroundColor: '#2089dc',
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 10,
  },
});

export default BookAppointmentScreen; 