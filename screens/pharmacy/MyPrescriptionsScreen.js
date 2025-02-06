import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card, Button, Icon, Badge } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MOCK_PRESCRIPTIONS, PRESCRIPTION_STATUS, PRESCRIPTION_TYPE } from '../../constants/pharmacy/prescriptions';

const StatusBadge = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case PRESCRIPTION_STATUS.VERIFIED:
        return '#4CAF50';
      case PRESCRIPTION_STATUS.PENDING:
        return '#FFC107';
      case PRESCRIPTION_STATUS.REJECTED:
        return '#F44336';
      case PRESCRIPTION_STATUS.EXPIRED:
        return '#9E9E9E';
      default:
        return '#9E9E9E';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case PRESCRIPTION_STATUS.VERIFIED:
        return 'Verificada';
      case PRESCRIPTION_STATUS.PENDING:
        return 'Pendiente';
      case PRESCRIPTION_STATUS.REJECTED:
        return 'Rechazada';
      case PRESCRIPTION_STATUS.EXPIRED:
        return 'Expirada';
      default:
        return status;
    }
  };

  return (
    <Badge
      value={getStatusText()}
      badgeStyle={[styles.statusBadge, { backgroundColor: getStatusColor() }]}
      textStyle={styles.statusText}
    />
  );
};

const PrescriptionCard = ({ prescription, onPress }) => (
  <Card containerStyle={styles.card}>
    <TouchableOpacity onPress={() => onPress(prescription)}>
      <View style={styles.cardHeader}>
        <View style={styles.cardTitleContainer}>
          <Icon
            name={prescription.type === PRESCRIPTION_TYPE.DIGITAL ? 'file-document' : 'file-upload'}
            type="material-community"
            size={24}
            color="#0077B6"
          />
          <Text style={styles.cardTitle}>
            {prescription.type === PRESCRIPTION_TYPE.DIGITAL ? 'Receta Digital' : 'Receta Externa'}
          </Text>
        </View>
        <StatusBadge status={prescription.status} />
      </View>
      
      <View style={styles.cardContent}>
        <Text style={styles.dateText}>Fecha de emisión: {prescription.issueDate}</Text>
        <Text style={styles.dateText}>Vence: {prescription.expiryDate}</Text>
        
        {prescription.type === PRESCRIPTION_TYPE.DIGITAL && (
          <>
            <Text style={styles.diagnosisText}>Diagnóstico: {prescription.diagnosis}</Text>
            <Text style={styles.medicationCount}>
              Medicamentos: {prescription.medications?.length || 0}
            </Text>
          </>
        )}
        
        {prescription.type === PRESCRIPTION_TYPE.EXTERNAL && (
          <Text style={styles.uploadText}>
            Subida el: {prescription.uploadDate}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  </Card>
);

const MyPrescriptionsScreen = ({ navigation }) => {
  const handlePrescriptionPress = (prescription) => {
    navigation.navigate('PrescriptionDetail', { prescription });
  };

  const handleUploadPress = () => {
    navigation.navigate('UploadPrescription');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button
        title="Subir Nueva Receta"
        onPress={handleUploadPress}
        icon={
          <Icon
            name="file-upload"
            type="material-community"
            color="white"
            size={20}
            style={{ marginRight: 10 }}
          />
        }
        buttonStyle={styles.uploadButton}
        containerStyle={styles.uploadButtonContainer}
      />

      <FlatList
        data={MOCK_PRESCRIPTIONS}
        renderItem={({ item }) => (
          <PrescriptionCard
            prescription={item}
            onPress={handlePrescriptionPress}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F4F8',
  },
  list: {
    padding: 16,
  },
  card: {
    borderRadius: 16,
    marginBottom: 12,
    padding: 16,
    backgroundColor: '#ffffff',
    shadowColor: 'rgba(79, 172, 254, 0.15)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#4facfe',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3748',
    marginLeft: 12,
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  cardContent: {
    backgroundColor: 'rgba(79, 172, 254, 0.05)',
    borderRadius: 12,
    padding: 12,
  },
  dateText: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 6,
  },
  diagnosisText: {
    fontSize: 16,
    color: '#2d3748',
    marginTop: 8,
  },
  medicationCount: {
    fontSize: 14,
    color: '#718096',
    marginTop: 8,
  },
  uploadText: {
    fontSize: 14,
    color: '#718096',
    marginTop: 8,
  },
  uploadButton: {
    backgroundColor: '#4facfe',
    borderRadius: 16,
    paddingVertical: 14,
    shadowColor: 'rgba(79, 172, 254, 0.3)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  uploadButtonContainer: {
    margin: 16,
    marginBottom: 24,
  }
});

export default MyPrescriptionsScreen; 