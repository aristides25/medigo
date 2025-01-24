import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Icon, Button } from '@rneui/themed';
import { APPOINTMENT_STATUS } from '../../constants/appointments/appointmentTypes';

const AppointmentCard = ({ appointment, onPress }) => {
  const { doctor, date, type, status } = appointment;
  const statusConfig = APPOINTMENT_STATUS[status];

  return (
    <Card containerStyle={styles.card}>
      <View style={styles.header}>
        <View style={styles.doctorInfo}>
          <Text style={styles.doctorName}>{doctor.name}</Text>
          <Text style={styles.specialty}>{doctor.specialty}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusConfig.color + '20' }]}>
          <Text style={[styles.statusText, { color: statusConfig.color }]}>
            {statusConfig.name}
          </Text>
        </View>
      </View>

      <Card.Divider />

      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Icon
            name="calendar"
            type="material-community"
            size={20}
            color="#666"
          />
          <Text style={styles.detailText}>
            {new Date(date).toLocaleDateString('es-ES', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Icon
            name="clock-outline"
            type="material-community"
            size={20}
            color="#666"
          />
          <Text style={styles.detailText}>
            {new Date(date).toLocaleTimeString('es-ES', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Icon
            name={type.icon}
            type="material-community"
            size={20}
            color="#666"
          />
          <Text style={styles.detailText}>{type.name}</Text>
        </View>
      </View>

      <Button
        title="Ver Detalles"
        onPress={() => onPress(appointment)}
        buttonStyle={styles.button}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    marginHorizontal: 0,
    marginBottom: 15,
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  specialty: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  details: {
    marginTop: 15,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#666',
  },
  button: {
    marginTop: 15,
    borderRadius: 25,
    backgroundColor: '#0077B6',
  },
});

export default AppointmentCard; 