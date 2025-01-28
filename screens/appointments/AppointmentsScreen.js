import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Button, Card, Icon, Badge, ButtonGroup } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppointment } from '../../context/AppointmentContext';

const AppointmentCard = ({ appointment, onPress }) => {
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

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmada':
        return 'Confirmada';
      case 'pendiente':
        return 'Pendiente';
      case 'cancelada':
        return 'Cancelada';
      default:
        return status;
    }
  };

  return (
    <Card containerStyle={styles.card}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.doctorName}>{appointment.provider.name}</Text>
          <Text style={styles.specialty}>{appointment.provider.specialty}</Text>
        </View>
        <Badge
          value={getStatusText(appointment.status)}
          badgeStyle={{ backgroundColor: getStatusColor(appointment.status) }}
          containerStyle={styles.badge}
        />
      </View>

      <View style={styles.appointmentDetails}>
        <View style={styles.detailRow}>
          <Icon name="calendar" type="font-awesome" size={16} color="#666" />
          <Text style={styles.detailText}>
            {new Date(appointment.date).toLocaleDateString('es-ES', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Icon name="clock-o" type="font-awesome" size={16} color="#666" />
          <Text style={styles.detailText}>
            {new Date(appointment.date).toLocaleTimeString('es-ES', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Icon name="stethoscope" type="font-awesome" size={16} color="#666" />
          <Text style={styles.detailText}>{appointment.type}</Text>
        </View>
      </View>

      <Button
        title="Ver Detalles"
        onPress={() => onPress(appointment)}
        buttonStyle={styles.detailsButton}
      />
    </Card>
  );
};

const AppointmentsScreen = ({ navigation }) => {
  const { appointments } = useAppointment();
  const [filterStatus, setFilterStatus] = useState(0);
  const filterButtons = ['Todas', 'Pendientes', 'Confirmadas', 'Canceladas'];

  const handleAppointmentPress = (appointment) => {
    navigation.navigate('AppointmentDetail', { appointment });
  };

  const handleNewAppointment = () => {
    navigation.navigate('SearchProviders');
  };

  const getFilteredAppointments = () => {
    if (filterStatus === 0) return appointments;
    
    const statusMap = {
      1: 'pendiente',
      2: 'confirmada',
      3: 'cancelada'
    };
    
    return appointments.filter(appointment => 
      appointment.status === statusMap[filterStatus]
    );
  };

  const filteredAppointments = getFilteredAppointments();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mis Citas Médicas</Text>
      </View>

      <ButtonGroup
        buttons={filterButtons}
        selectedIndex={filterStatus}
        onPress={setFilterStatus}
        containerStyle={styles.buttonGroupContainer}
        selectedButtonStyle={styles.selectedButton}
        textStyle={styles.buttonGroupText}
        selectedTextStyle={styles.selectedButtonText}
      />

      <ScrollView style={styles.content}>
        {filteredAppointments.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon
              name="calendar-plus-o"
              type="font-awesome"
              size={50}
              color="#666"
            />
            <Text style={styles.emptyStateText}>No tienes citas {filterStatus !== 0 ? 'en este estado' : ''}</Text>
            <Button
              title="Agendar Nueva Cita"
              onPress={handleNewAppointment}
              buttonStyle={styles.newAppointmentButton}
            />
          </View>
        ) : (
          filteredAppointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onPress={handleAppointmentPress}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#444',
  },
  buttonGroupContainer: {
    marginHorizontal: 15,
    marginVertical: 10,
    height: 40,
    borderRadius: 20,
    borderColor: '#0077B6',
  },
  selectedButton: {
    backgroundColor: '#0077B6',
  },
  buttonGroupText: {
    color: '#0077B6',
    fontSize: 14,
  },
  selectedButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  card: {
    borderRadius: 10,
    marginBottom: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
  },
  specialty: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  badge: {
    marginTop: 0,
  },
  appointmentDetails: {
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  detailText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#666',
  },
  detailsButton: {
    backgroundColor: '#0077B6',
    borderRadius: 8,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    marginVertical: 15,
    textAlign: 'center',
  },
  newAppointmentButton: {
    backgroundColor: '#0077B6',
    paddingHorizontal: 30,
    borderRadius: 25,
  },
});

export default AppointmentsScreen; 