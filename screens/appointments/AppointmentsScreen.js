import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Text, Button, Card, Icon, Badge, ButtonGroup, Chip } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppointment } from '../../context/AppointmentContext';
import BottomNavbar from '../../components/BottomNavbar';
import { LinearGradient } from 'expo-linear-gradient';

// Constantes de diseño
const SPACING = 8; // Unidad base de espaciado
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

const AppointmentCard = ({ appointment, onPress }) => {
  const getStatusConfig = (status) => {
    const configs = {
      confirmada: {
        color: COLORS.success,
        icon: 'check-circle',
        text: 'Confirmada'
      },
      pendiente: {
        color: COLORS.warning,
        icon: 'clock',
        text: 'Pendiente'
      },
      cancelada: {
        color: COLORS.danger,
        icon: 'close-circle',
        text: 'Cancelada'
      }
    };
    return configs[status] || configs.pendiente;
  };

  const statusConfig = getStatusConfig(appointment.status);

  return (
    <TouchableOpacity 
      onPress={() => onPress(appointment)}
      style={styles.cardTouchable}
      activeOpacity={0.7}
    >
      <LinearGradient
        colors={[COLORS.cardBg, COLORS.white]}
        style={styles.cardGradient}
      >
        <View style={styles.cardHeader}>
          <View style={styles.doctorInfoContainer}>
            <Icon
              name="doctor"
              type="material-community"
              size={40}
              color={COLORS.primary}
              containerStyle={styles.doctorIcon}
            />
            <View style={styles.doctorTextContainer}>
              <Text style={styles.doctorName}>{appointment.provider.name}</Text>
              <Text style={styles.specialty}>{appointment.provider.specialty}</Text>
            </View>
          </View>
          <Chip
            icon={{
              name: statusConfig.icon,
              type: 'material-community',
              size: 16,
              color: statusConfig.color
            }}
            title={statusConfig.text}
            containerStyle={{ backgroundColor: `${statusConfig.color}15` }}
            titleStyle={{ color: statusConfig.color, fontSize: 12 }}
          />
        </View>

        <View style={styles.appointmentDetails}>
          <View style={styles.detailRow}>
            <Icon name="calendar" type="material-community" size={20} color={COLORS.primary} />
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
            <Icon name="clock-outline" type="material-community" size={20} color={COLORS.primary} />
            <Text style={styles.detailText}>
              {new Date(appointment.date).toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Icon name="stethoscope" type="material-community" size={20} color={COLORS.primary} />
            <Text style={styles.detailText}>{appointment.type}</Text>
          </View>
        </View>

        <Button
          title="Ver Detalles"
          icon={{
            name: 'chevron-right',
            type: 'material-community',
            size: 20,
            color: COLORS.white
          }}
          iconRight
          buttonStyle={styles.detailsButton}
          titleStyle={styles.detailsButtonText}
        />
      </LinearGradient>
    </TouchableOpacity>
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
      <LinearGradient
        colors={[COLORS.primaryLight, COLORS.background]}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Mis Citas Médicas</Text>
          <Text style={styles.subtitle}>Gestiona tus consultas médicas</Text>
        </View>

        <ButtonGroup
          buttons={filterButtons}
          selectedIndex={filterStatus}
          onPress={setFilterStatus}
          containerStyle={styles.buttonGroupContainer}
          selectedButtonStyle={styles.selectedButton}
          textStyle={styles.buttonGroupText}
          selectedTextStyle={styles.selectedButtonText}
          buttonContainerStyle={styles.buttonContainer}
        />
      </LinearGradient>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredAppointments.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon
              name="calendar-blank"
              type="material-community"
              size={80}
              color={COLORS.primary}
            />
            <Text style={styles.emptyStateTitle}>No hay citas programadas</Text>
            <Text style={styles.emptyStateText}>
              {filterStatus !== 0 
                ? 'No tienes citas en este estado' 
                : 'Programa tu primera cita médica'}
            </Text>
            <Button
              title="Agendar Cita"
              onPress={handleNewAppointment}
              buttonStyle={styles.emptyStateButton}
              titleStyle={styles.emptyStateButtonText}
              icon={{
                name: 'plus',
                type: 'material-community',
                size: 20,
                color: COLORS.white
              }}
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
      
      {filteredAppointments.length > 0 && (
        <View style={styles.floatingButtonContainer}>
          <Button
            title="Agendar Nueva Cita"
            onPress={handleNewAppointment}
            buttonStyle={styles.floatingButton}
            titleStyle={styles.floatingButtonText}
            icon={{
              name: 'plus',
              type: 'material-community',
              size: 20,
              color: COLORS.white,
              style: { marginRight: SPACING }
            }}
            raised
          />
        </View>
      )}

      <BottomNavbar />
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

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
  buttonGroupContainer: {
    marginHorizontal: SPACING * 2,
    height: 44,
    borderRadius: 22,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
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
  buttonContainer: {
    borderRadius: 22,
  },
  selectedButton: {
    backgroundColor: COLORS.primary,
  },
  buttonGroupText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  selectedButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING * 2,
    paddingBottom: SPACING * 12,
  },
  cardTouchable: {
    marginBottom: SPACING * 2,
    borderRadius: SPACING * 2,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  cardGradient: {
    padding: SPACING * 2,
    borderRadius: SPACING * 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING * 2,
  },
  doctorInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  doctorIcon: {
    backgroundColor: `${COLORS.primary}15`,
    padding: SPACING,
    borderRadius: SPACING * 3,
    marginRight: SPACING * 2,
  },
  doctorTextContainer: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: SPACING / 2,
  },
  specialty: {
    fontSize: 14,
    color: COLORS.grey,
  },
  appointmentDetails: {
    backgroundColor: `${COLORS.primary}05`,
    borderRadius: SPACING,
    padding: SPACING * 2,
    marginBottom: SPACING * 2,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING,
  },
  detailText: {
    marginLeft: SPACING,
    fontSize: 14,
    color: '#666',
  },
  detailsButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SPACING * 3,
    paddingVertical: SPACING * 1.5,
    paddingHorizontal: SPACING * 3,
  },
  detailsButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING * 4,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: SPACING * 2,
    marginBottom: SPACING,
  },
  emptyStateText: {
    fontSize: 16,
    color: COLORS.grey,
    textAlign: 'center',
    marginBottom: SPACING * 3,
  },
  emptyStateButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SPACING * 3,
    paddingVertical: SPACING * 1.5,
    paddingHorizontal: SPACING * 4,
  },
  emptyStateButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 90,
    right: SPACING * 2,
    left: SPACING * 2,
  },
  floatingButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SPACING * 3,
    paddingVertical: SPACING * 2,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  floatingButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AppointmentsScreen; 