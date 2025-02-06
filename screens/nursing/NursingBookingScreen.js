import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Input, Icon } from '@rneui/themed';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

const NursingBookingScreen = ({ route, navigation }) => {
  const { service } = route.params;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [duration, setDuration] = useState('2');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirmDate = (date) => {
    setSelectedDate(date);
    setDatePickerVisible(false);
  };

  const handleConfirmTime = (time) => {
    setSelectedTime(time);
    setTimePickerVisible(false);
  };

  const handleBooking = async () => {
    if (!address.trim()) {
      alert('Por favor ingresa una dirección');
      return;
    }

    setLoading(true);
    // Aquí iría la lógica para crear la reserva
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('NursingTracking', {
        booking: {
          service,
          date: selectedDate,
          time: selectedTime,
          duration,
          address,
          notes,
        },
      });
    }, 1000);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text h4 style={styles.headerText}>{service.title}</Text>
        <Text style={styles.price}>Precio por hora: ${service.price}</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Fecha del Servicio</Text>
        <Button
          title={moment(selectedDate).format('DD/MM/YYYY')}
          onPress={() => setDatePickerVisible(true)}
          buttonStyle={styles.dateButton}
          icon={{
            name: 'calendar',
            type: 'material-community',
            color: '#4facfe',
          }}
          iconPosition="left"
          titleStyle={styles.dateButtonText}
          type="outline"
        />

        <Text style={styles.label}>Hora de Inicio</Text>
        <Button
          title={moment(selectedTime).format('HH:mm')}
          onPress={() => setTimePickerVisible(true)}
          buttonStyle={styles.dateButton}
          icon={{
            name: 'clock-outline',
            type: 'material-community',
            color: '#4facfe',
          }}
          iconPosition="left"
          titleStyle={styles.dateButtonText}
          type="outline"
        />

        <Text style={styles.label}>Duración (horas)</Text>
        <Input
          value={duration}
          onChangeText={setDuration}
          keyboardType="numeric"
          placeholder="Mínimo 2 horas"
          leftIcon={
            <Icon name="timer-outline" type="material-community" color="#4facfe" />
          }
        />

        <Text style={styles.label}>Dirección</Text>
        <Input
          value={address}
          onChangeText={setAddress}
          placeholder="Ingresa la dirección completa"
          multiline
          leftIcon={
            <Icon name="map-marker" type="material-community" color="#4facfe" />
          }
        />

        <Text style={styles.label}>Notas Adicionales</Text>
        <Input
          value={notes}
          onChangeText={setNotes}
          placeholder="Instrucciones especiales, condiciones médicas, etc."
          multiline
          numberOfLines={3}
          leftIcon={
            <Icon name="note-text" type="material-community" color="#4facfe" />
          }
        />
      </View>

      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Resumen del Servicio</Text>
        <Text style={styles.summaryText}>
          Total estimado: ${(parseFloat(service.price) * parseInt(duration)).toFixed(2)}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Confirmar Reserva"
          onPress={handleBooking}
          loading={loading}
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
        />
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={() => setDatePickerVisible(false)}
        minimumDate={new Date()}
      />

      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirmTime}
        onCancel={() => setTimePickerVisible(false)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F4F8',
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#4facfe',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  headerText: {
    color: '#2d3748',
    marginBottom: 8,
    fontSize: 24,
    fontWeight: '800',
  },
  price: {
    fontSize: 18,
    color: '#4facfe',
    fontWeight: '600',
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    color: '#2d3748',
    marginBottom: 8,
    marginTop: 12,
    fontWeight: '600',
  },
  dateButton: {
    borderColor: '#4facfe',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 12,
    backgroundColor: '#ffffff',
  },
  dateButtonText: {
    color: '#4facfe',
    marginLeft: 10,
  },
  summary: {
    padding: 20,
    backgroundColor: '#ffffff',
    marginTop: 12,
    borderRadius: 16,
    shadowColor: '#2d3748',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 16,
    color: '#4facfe',
    fontWeight: '600',
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 30,
  },
  button: {
    backgroundColor: '#4facfe',
    borderRadius: 12,
    paddingVertical: 15,
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default NursingBookingScreen; 