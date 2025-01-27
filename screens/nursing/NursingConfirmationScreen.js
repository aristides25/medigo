import React, { useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { Text, Button, Icon, Divider } from '@rneui/themed';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

const NursingConfirmationScreen = ({ route, navigation }) => {
  const { nurse, service, booking } = route.params;
  
  // Convertir el string ISO a objeto Date
  const bookingDate = new Date(booking.date);

  // Verificar que tenemos los datos de ubicación
  useEffect(() => {
    if (!booking.location || !booking.address) {
      Alert.alert(
        'Error',
        'No se encontraron los datos de ubicación',
        [
          {
            text: 'Volver',
            onPress: () => navigation.goBack()
          }
        ]
      );
    }
  }, []);

  // Región del mapa con la ubicación guardada
  const mapRegion = {
    latitude: booking.location.latitude,
    longitude: booking.location.longitude,
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,
  };

  const handleConfirmPayment = () => {
    Alert.alert(
      'Confirmar Pago',
      '¿Deseas proceder con el pago?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => {
            Alert.alert(
              '¡Reserva Exitosa!',
              'Tu servicio ha sido confirmado. Recibirás un correo con los detalles.',
              [
                {
                  text: 'OK',
                  onPress: () => navigation.navigate('Home'),
                },
              ]
            );
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Cabecera de Confirmación */}
      <View style={styles.header}>
        <Icon
          name="check-circle"
          type="material-community"
          color="#27ae60"
          size={60}
        />
        <Text style={styles.headerTitle}>Confirma tu Reserva</Text>
      </View>

      {/* Resumen del Servicio */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Detalles del Servicio</Text>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Servicio:</Text>
          <Text style={styles.value}>{service.title}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Enfermero/a:</Text>
          <Text style={styles.value}>{nurse.name}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Fecha:</Text>
          <Text style={styles.value}>
            {moment(bookingDate).format('dddd D [de] MMMM, YYYY')}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Hora:</Text>
          <Text style={styles.value}>{booking.time}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Duración:</Text>
          <Text style={styles.value}>{booking.duration} horas</Text>
        </View>
      </View>

      {/* Ubicación */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Ubicación del Servicio</Text>
        <View style={styles.mapContainer}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={mapRegion}
            region={mapRegion}
            scrollEnabled={false}
            zoomEnabled={false}
            rotateEnabled={false}
            pitchEnabled={false}
            toolbarEnabled={false}
            moveOnMarkerPress={false}
            loadingEnabled={true}
            pointerEvents="none"
            showsUserLocation={false}
            showsMyLocationButton={false}
            showsCompass={false}
            showsScale={false}
            showsBuildings={false}
            showsTraffic={false}
            showsIndoors={false}
          >
            <Marker
              coordinate={{
                latitude: booking.location.latitude,
                longitude: booking.location.longitude
              }}
              title="Ubicación del Servicio"
              description={booking.address}
              pinColor="#3498db"
              draggable={false}
            />
          </MapView>
        </View>
        <View style={styles.addressContainer}>
          <Icon
            name="map-marker-check"
            type="material-community"
            color="#27ae60"
            size={24}
            style={styles.addressIcon}
          />
          <Text style={styles.address}>{booking.address}</Text>
        </View>
      </View>

      {/* Notas */}
      {booking.notes ? (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Notas Adicionales</Text>
          <Text style={styles.notes}>{booking.notes}</Text>
        </View>
      ) : null}

      {/* Resumen de Pago */}
      <View style={[styles.card, styles.totalCard]}>
        <Text style={styles.cardTitle}>Resumen de Pago</Text>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Precio por hora:</Text>
          <Text style={styles.value}>${nurse.price}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Horas:</Text>
          <Text style={styles.value}>{booking.duration}</Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.detailRow}>
          <Text style={styles.totalLabel}>Total a Pagar:</Text>
          <Text style={styles.totalAmount}>${booking.total}</Text>
        </View>
      </View>

      {/* Información Importante */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Información Importante</Text>
        <View style={styles.infoItem}>
          <Icon
            name="information"
            type="material-community"
            color="#3498db"
            size={20}
          />
          <Text style={styles.infoText}>
            Puedes cancelar hasta 24 horas antes del servicio
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Icon
            name="phone"
            type="material-community"
            color="#3498db"
            size={20}
          />
          <Text style={styles.infoText}>
            Línea de emergencia: +58 424-1234567
          </Text>
        </View>
      </View>

      {/* Botones de Acción */}
      <View style={styles.footer}>
        <Button
          title="Modificar Reserva"
          type="outline"
          buttonStyle={styles.modifyButton}
          titleStyle={styles.modifyButtonText}
          onPress={() => navigation.goBack()}
        />
        <Button
          title="Confirmar y Pagar"
          buttonStyle={styles.confirmButton}
          onPress={handleConfirmPayment}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#ffffff',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 10,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    margin: 15,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  value: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '500',
  },
  mapContainer: {
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 10,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    elevation: 1,
  },
  addressIcon: {
    marginRight: 10,
  },
  address: {
    flex: 1,
    fontSize: 16,
    color: '#2c3e50',
    lineHeight: 22,
  },
  notes: {
    fontSize: 16,
    color: '#2c3e50',
    lineHeight: 24,
  },
  totalCard: {
    backgroundColor: '#f8f9fa',
  },
  divider: {
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#27ae60',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoText: {
    fontSize: 14,
    color: '#2c3e50',
    marginLeft: 10,
    flex: 1,
  },
  footer: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  modifyButton: {
    marginBottom: 10,
    borderColor: '#3498db',
    borderWidth: 2,
    borderRadius: 10,
  },
  modifyButtonText: {
    color: '#3498db',
  },
  confirmButton: {
    backgroundColor: '#3498db',
    borderRadius: 10,
    paddingVertical: 12,
  },
});

export default NursingConfirmationScreen; 