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
            color: '#0077CC',
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
            color: '#0077CC',
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
            <Icon name="timer-outline" type="material-community" color="#0077CC" />
          }
        />

        <Text style={styles.label}>Dirección</Text>
        <Input
          value={address}
          onChangeText={setAddress}
          placeholder="Ingresa la dirección completa"
          multiline
          leftIcon={
            <Icon name="map-marker" type="material-community" color="#0077CC" />
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
            <Icon name="note-text" type="material-community" color="#0077CC" />
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
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  headerText: {
    color: '#0077CC',
    marginBottom: 5,
  },
  price: {
    fontSize: 18,
    color: '#2ecc71',
    fontWeight: 'bold',
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    color: '#0077CC',
    marginBottom: 5,
    marginTop: 10,
  },
  dateButton: {
    borderColor: '#0077CC',
    borderWidth: 1,
    marginBottom: 15,
  },
  dateButtonText: {
    color: '#0077CC',
    marginLeft: 10,
  },
  summary: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    marginTop: 10,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0077CC',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 16,
    color: '#2ecc71',
    fontWeight: 'bold',
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 30,
  },
  button: {
    backgroundColor: '#0077CC',
    borderRadius: 25,
    paddingVertical: 15,
  },
  buttonTitle: {
    fontSize: 18,
  },
});

export default NursingBookingScreen; 