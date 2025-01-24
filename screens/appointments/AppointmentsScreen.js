import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Button, Card, Icon, Badge, FAB } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';

// Datos de ejemplo
const MOCK_APPOINTMENTS = [
  {
    id: 1,
    provider: {
      id: 1,
      name: 'Dr. Juan Pérez',
      specialty: 'Medicina General',
      type: 'Doctor',
    },
    date: new Date('2024-01-25T10:30:00'),
    type: 'Consulta General',
    status: 'confirmada',
  },
  {
    id: 2,
    provider: {
      id: 2,
      name: 'Dra. María González',
      specialty: 'Cardiología',
      type: 'Doctor',
    },
    date: new Date('2024-01-26T15:00:00'),
    type: 'Especialista',
    status: 'pendiente',
  },
];

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
            {appointment.date.toLocaleDateString('es-ES', {
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
            {appointment.date.toLocaleTimeString('es-ES', {
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
  const [appointments] = useState(MOCK_APPOINTMENTS);
  const [filterStatus, setFilterStatus] = useState('todas');

  const handleAppointmentPress = (appointment) => {
    navigation.navigate('AppointmentDetail', { appointment });
  };

  const handleNewAppointment = () => {
    navigation.navigate('SearchProviders');
  };

  const filteredAppointments = appointments.filter(appointment => {
    if (filterStatus === 'todas') return true;
    return appointment.status === filterStatus;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mis Citas Médicas</Text>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => {
            // Aquí iría la lógica del filtro
          }}
        >
          <Icon name="filter" type="font-awesome" size={20} color="#0077B6" />
          <Text style={styles.filterText}>Filtrar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {filteredAppointments.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            onPress={handleAppointmentPress}
          />
        ))}
      </ScrollView>

      <FAB
        icon={{ name: 'add', color: 'white' }}
        color="#0077B6"
        placement="right"
        onPress={handleNewAppointment}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#444',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  filterText: {
    marginLeft: 5,
    color: '#0077B6',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  card: {
    borderRadius: 10,
    marginHorizontal: 15,
    marginVertical: 8,
    padding: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
    marginTop: 2,
  },
  appointmentDetails: {
    marginTop: 15,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  detailText: {
    marginLeft: 10,
    color: '#666',
    fontSize: 14,
  },
  detailsButton: {
    marginTop: 15,
    backgroundColor: '#0077B6',
    borderRadius: 8,
  },
});

export default AppointmentsScreen; 