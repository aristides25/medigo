import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, Button, Input, Divider } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';

const PaymentScreen = ({ route, navigation }) => {
  const { provider, appointmentData } = route.params;
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');

  // Precio de ejemplo - En producción vendría del backend
  const appointmentPrice = 50.00;
  const platformFee = appointmentPrice * 0.1; // 10% de comisión
  const total = appointmentPrice + platformFee;

  const handlePayment = () => {
    // Aquí iría la integración con 2checkout 2Sell
    // 1. Validar datos de la tarjeta
    // 2. Procesar el pago
    // 3. Guardar la cita en la base de datos
    // 4. Enviar confirmación por email
    navigation.navigate('AppointmentConfirmation', {
      provider,
      appointmentData,
      paymentInfo: {
        amount: total,
        date: new Date(),
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Card>
          <Card.Title>Resumen de la Cita</Card.Title>
          <Card.Divider />
          
          {/* Detalles de la Cita */}
          <View style={styles.section}>
            <Text style={styles.providerName}>{provider.name}</Text>
            <Text style={styles.appointmentDetail}>
              {appointmentData.date.toLocaleDateString()} - {appointmentData.time}
            </Text>
            <Text style={styles.appointmentDetail}>{appointmentData.reason}</Text>
          </View>

          <Divider style={styles.divider} />

          {/* Desglose de Costos */}
          <View style={styles.section}>
            <View style={styles.costRow}>
              <Text>Costo de la consulta</Text>
              <Text>${appointmentPrice.toFixed(2)}</Text>
            </View>
            <View style={styles.costRow}>
              <Text>Comisión de la plataforma</Text>
              <Text>${platformFee.toFixed(2)}</Text>
            </View>
            <Divider style={styles.divider} />
            <View style={[styles.costRow, styles.totalRow]}>
              <Text style={styles.totalText}>Total a pagar</Text>
              <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
            </View>
          </View>

          <Divider style={styles.divider} />

          {/* Formulario de Pago */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Información de Pago</Text>
            
            <Input
              placeholder="Número de Tarjeta"
              value={cardNumber}
              onChangeText={setCardNumber}
              keyboardType="numeric"
              maxLength={16}
              leftIcon={{ type: 'font-awesome', name: 'credit-card' }}
            />

            <View style={styles.row}>
              <Input
                containerStyle={styles.halfInput}
                placeholder="MM/YY"
                value={expiryDate}
                onChangeText={setExpiryDate}
                maxLength={5}
              />
              <Input
                containerStyle={styles.halfInput}
                placeholder="CVV"
                value={cvv}
                onChangeText={setCvv}
                keyboardType="numeric"
                maxLength={4}
                secureTextEntry
              />
            </View>

            <Input
              placeholder="Nombre en la Tarjeta"
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Botón de Pago */}
          <Button
            title="Pagar y Confirmar Cita"
            onPress={handlePayment}
            buttonStyle={styles.payButton}
            disabled={!cardNumber || !expiryDate || !cvv || !name}
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#444',
  },
  providerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
  },
  appointmentDetail: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  divider: {
    marginVertical: 15,
  },
  costRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  totalRow: {
    marginTop: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0077B6',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    flex: 1,
  },
  payButton: {
    backgroundColor: '#0077B6',
    borderRadius: 10,
    paddingVertical: 12,
  },
});

export default PaymentScreen; 