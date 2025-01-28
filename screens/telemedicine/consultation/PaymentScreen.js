import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTelemedicine } from '../../../context/TelemedicineContext';

const PaymentScreen = ({ navigation }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const { currentConsultation, startConsultation } = useTelemedicine();
  const { doctor, scheduledDate, scheduledTime } = currentConsultation;

  const PAYMENT_METHODS = [
    {
      id: 'card',
      title: 'Tarjeta de crédito/débito',
      icon: 'credit-card',
    },
    {
      id: 'paypal',
      title: 'PayPal',
      icon: 'payment',
    },
  ];

  const handlePaymentMethodSelect = (methodId) => {
    setSelectedMethod(methodId);
  };

  const handlePayment = () => {
    // Aquí iría la lógica de procesamiento del pago
    startConsultation({
      ...currentConsultation,
      paymentStatus: 'completed',
      paymentMethod: selectedMethod,
    });
    navigation.navigate('ActiveConsultations');
  };

  const PaymentMethodCard = ({ method, selected }) => (
    <TouchableOpacity
      style={[styles.methodCard, selected && styles.selectedMethodCard]}
      onPress={() => handlePaymentMethodSelect(method.id)}
    >
      <MaterialIcons
        name={method.icon}
        size={24}
        color={selected ? 'white' : '#666'}
      />
      <Text style={[styles.methodTitle, selected && styles.selectedMethodText]}>
        {method.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.summaryContainer}>
        <Text style={styles.sectionTitle}>Resumen de la consulta</Text>
        <View style={styles.doctorInfo}>
          <Image source={{ uri: doctor.image }} style={styles.doctorImage} />
          <View style={styles.doctorDetails}>
            <Text style={styles.doctorName}>{doctor.name}</Text>
            <Text style={styles.specialty}>{doctor.specialty}</Text>
          </View>
        </View>

        <View style={styles.appointmentDetails}>
          <View style={styles.detailRow}>
            <MaterialIcons name="event" size={20} color="#666" />
            <Text style={styles.detailText}>{scheduledDate}</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialIcons name="schedule" size={20} color="#666" />
            <Text style={styles.detailText}>{scheduledTime}</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialIcons name="attach-money" size={20} color="#666" />
            <Text style={styles.detailText}>${doctor.price} USD</Text>
          </View>
        </View>
      </View>

      <View style={styles.paymentSection}>
        <Text style={styles.sectionTitle}>Método de pago</Text>
        {PAYMENT_METHODS.map(method => (
          <PaymentMethodCard
            key={method.id}
            method={method}
            selected={selectedMethod === method.id}
          />
        ))}

        {selectedMethod === 'card' && (
          <View style={styles.cardInputs}>
            <TextInput
              style={styles.input}
              placeholder="Número de tarjeta"
              value={cardNumber}
              onChangeText={setCardNumber}
              keyboardType="numeric"
            />
            <View style={styles.cardSecurityRow}>
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="MM/AA"
                value={expiryDate}
                onChangeText={setExpiryDate}
              />
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="CVV"
                value={cvv}
                onChangeText={setCvv}
                keyboardType="numeric"
                maxLength={3}
              />
            </View>
          </View>
        )}
      </View>

      <TouchableOpacity
        style={[styles.payButton, !selectedMethod && styles.disabledButton]}
        onPress={handlePayment}
        disabled={!selectedMethod}
      >
        <Text style={styles.payButtonText}>Pagar ${doctor.price} USD</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  summaryContainer: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  specialty: {
    fontSize: 14,
    color: '#666',
  },
  appointmentDetails: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  paymentSection: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 16,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  selectedMethodCard: {
    backgroundColor: '#2196F3',
  },
  methodTitle: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  selectedMethodText: {
    color: 'white',
  },
  cardInputs: {
    marginTop: 16,
  },
  input: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  cardSecurityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  payButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  payButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PaymentScreen; 