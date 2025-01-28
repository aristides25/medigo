import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTelemedicine } from '../../../context/TelemedicineContext';

const ActiveConsultationsScreen = ({ navigation }) => {
  const { activeConsultations } = useTelemedicine();

  const handleJoinConsultation = (consultation) => {
    navigation.navigate('ConnectionTest', { consultationId: consultation.id });
  };

  const ConsultationCard = ({ consultation }) => {
    const isUpcoming = new Date(consultation.scheduledDate) > new Date();

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Image
            source={{ uri: consultation.doctor.image }}
            style={styles.doctorImage}
          />
          <View style={styles.consultationInfo}>
            <Text style={styles.doctorName}>{consultation.doctor.name}</Text>
            <Text style={styles.specialty}>{consultation.doctor.specialty}</Text>
            <View style={styles.dateTimeContainer}>
              <MaterialIcons name="event" size={16} color="#666" />
              <Text style={styles.dateTime}>
                {consultation.scheduledDate} - {consultation.scheduledTime}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusBadge,
              isUpcoming ? styles.upcomingBadge : styles.completedBadge,
            ]}
          >
            <Text style={styles.statusText}>
              {isUpcoming ? 'Próxima' : 'Completada'}
            </Text>
          </View>
        </View>

        {isUpcoming && (
          <TouchableOpacity
            style={styles.joinButton}
            onPress={() => handleJoinConsultation(consultation)}
          >
            <MaterialIcons name="video-call" size={24} color="white" />
            <Text style={styles.joinButtonText}>Unirse a la consulta</Text>
          </TouchableOpacity>
        )}

        <View style={styles.cardFooter}>
          <TouchableOpacity style={styles.footerButton}>
            <MaterialIcons name="chat" size={20} color="#666" />
            <Text style={styles.footerButtonText}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton}>
            <MaterialIcons name="description" size={20} color="#666" />
            <Text style={styles.footerButtonText}>Documentos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton}>
            <MaterialIcons name="info" size={20} color="#666" />
            <Text style={styles.footerButtonText}>Detalles</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mis Consultas</Text>
        <TouchableOpacity
          style={styles.newConsultationButton}
          onPress={() => navigation.navigate('SpecialtySelection')}
        >
          <MaterialIcons name="add" size={24} color="white" />
          <Text style={styles.newConsultationText}>Nueva Consulta</Text>
        </TouchableOpacity>
      </View>

      {activeConsultations.length === 0 ? (
        <View style={styles.emptyState}>
          <MaterialIcons name="medical-services" size={64} color="#ccc" />
          <Text style={styles.emptyStateText}>
            No tienes consultas programadas
          </Text>
          <Text style={styles.emptyStateSubtext}>
            Programa una consulta con nuestros especialistas
          </Text>
        </View>
      ) : (
        activeConsultations.map((consultation) => (
          <ConsultationCard
            key={consultation.id}
            consultation={consultation}
          />
        ))
      )}
    </ScrollView>
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
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  newConsultationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 8,
  },
  newConsultationText: {
    color: 'white',
    marginLeft: 4,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 16,
    padding: 16,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  consultationInfo: {
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
    marginBottom: 8,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateTime: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  upcomingBadge: {
    backgroundColor: '#E3F2FD',
  },
  completedBadge: {
    backgroundColor: '#E8F5E9',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  joinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  joinButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 16,
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerButtonText: {
    color: '#666',
    marginLeft: 4,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
    textAlign: 'center',
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default ActiveConsultationsScreen; 