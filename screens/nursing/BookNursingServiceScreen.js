import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { Text, Button, Input, Icon } from '@rneui/themed';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import moment from 'moment';
import 'moment/locale/es';
import * as Location from 'expo-location';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

moment.locale('es');

const BookNursingServiceScreen = ({ route, navigation }) => {
  const { nurse, service } = route.params;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [duration, setDuration] = useState('2');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [region, setRegion] = useState({
    latitude: 10.4806,    // Coordenadas de Venezuela
    longitude: -66.9036,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [markerPosition, setMarkerPosition] = useState(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  // Horarios disponibles
  const availableTimes = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  // Próximos 7 días
  const nextDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Permiso Denegado',
            'Necesitamos acceso a tu ubicación para continuar',
            [{ text: 'OK' }]
          );
          return;
        }

        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
          maximumAge: 10000,
        });

        const newRegion = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        };

        setRegion(newRegion);
        setMarkerPosition({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        });
      } catch (error) {
        console.error('Error al obtener la ubicación inicial:', error);
      }
    })();
  }, []);

  const getCurrentLocation = async () => {
    try {
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
        maximumAge: 10000,
      });

      const newRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      };

      setRegion(newRegion);
      setMarkerPosition({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });

      if (mapRef.current) {
        mapRef.current.animateToRegion(newRegion, 1000);
      }

    } catch (error) {
      Alert.alert(
        'Error de Ubicación',
        'Verifica que el GPS esté activado y tengas una buena señal',
        [{ text: 'OK' }]
      );
    }
  };

  // Referencia al mapa
  const mapRef = React.useRef(null);

  const handleMapPress = (e) => {
    const newLocation = e.nativeEvent.coordinate;
    setMarkerPosition(newLocation);
  };

  const calculateTotal = () => {
    return parseFloat(nurse.price) * parseInt(duration);
  };

  const handleConfirm = () => {
    // Verificar que tenemos todos los datos necesarios
    if (!markerPosition || !address) {
      Alert.alert(
        'Datos Incompletos',
        'Por favor selecciona una ubicación y proporciona una dirección detallada',
        [{ text: 'OK' }]
      );
      return;
    }

    // Guardar y navegar a la confirmación
    navigation.navigate('NursingConfirmation', {
      nurse,
      service,
      booking: {
        date: selectedDate.toISOString(),
        time: selectedTime,
        duration: parseInt(duration),
        address: address,
        location: {
          latitude: markerPosition.latitude,
          longitude: markerPosition.longitude,
        },
        notes,
        total: calculateTotal(),
      },
    });
  };

  const handleDateConfirm = (date) => {
    setSelectedDate(date);
    setDatePickerVisible(false);
  };

  const formatDay = (date) => {
    return moment(date).format('EEE d MMM');
  };

  const searchAddress = async (text) => {
    try {
      setAddress(text);
      
      if (text.length > 5) {
        const result = await Location.geocodeAsync(text);
        
        if (result.length > 0) {
          const { latitude, longitude } = result[0];
          
          const newLocation = {
            latitude,
            longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          };

          setRegion(newLocation);
          setMarkerPosition({
            latitude,
            longitude
          });

          if (mapRef.current) {
            mapRef.current.animateToRegion(newLocation, 1000);
          }
        }
      }
    } catch (error) {
      console.error('Error al buscar dirección:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Resumen del Servicio */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Resumen del Servicio</Text>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Servicio:</Text>
          <Text style={styles.summaryText}>{service.title}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Enfermero/a:</Text>
          <Text style={styles.summaryText}>{nurse.name}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Precio por hora:</Text>
          <Text style={styles.summaryText}>${nurse.price}</Text>
        </View>
      </View>

      {/* Selector de Fecha */}
      <View style={styles.dateContainer}>
        <Text style={styles.sectionTitle}>Fecha del Servicio</Text>
        <Button
          title={moment(selectedDate).format('dddd D [de] MMMM, YYYY')}
          onPress={() => setDatePickerVisible(true)}
          icon={{
            name: 'calendar',
            type: 'material-community',
            color: '#fff',
            size: 20,
          }}
          buttonStyle={styles.datePickerButton}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={() => setDatePickerVisible(false)}
          minimumDate={new Date()}
          locale="es"
        />
      </View>

      {/* Selector de Hora */}
      <View style={styles.timeContainer}>
        <Text style={styles.sectionTitle}>Hora del Servicio</Text>
        <View style={styles.timeGrid}>
          {availableTimes.map((time) => (
            <TouchableOpacity
              key={time}
              style={[
                styles.timeButton,
                selectedTime === time && styles.selectedTime
              ]}
              onPress={() => setSelectedTime(time)}
            >
              <Text style={[
                styles.timeText,
                selectedTime === time && styles.selectedTimeText
              ]}>
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Mapa y Dirección */}
      <View style={styles.mapContainer}>
        <Text style={styles.sectionTitle}>Ubicación del Servicio</Text>
        <View style={styles.mapWrapper}>
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={region}
            onPress={handleMapPress}
            showsUserLocation
            showsMyLocationButton={false}
            followsUserLocation
            loadingEnabled={true}
            minZoomLevel={15}
            maxZoomLevel={20}
          >
            {markerPosition && (
              <Marker
                coordinate={markerPosition}
                title="Ubicación del Servicio"
                description="Aquí se prestará el servicio"
                pinColor="#3498db"
              />
            )}
          </MapView>
          <TouchableOpacity
            style={[styles.locationButton, { elevation: 8 }]}
            onPress={getCurrentLocation}
            activeOpacity={0.7}
          >
            <View style={[styles.locationButtonInner, { elevation: 8 }]}>
              <Icon
                name="crosshairs-gps"
                type="material-community"
                color="#3498db"
                size={24}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Dirección */}
        <View style={styles.addressInputContainer}>
          <Input
            value={address}
            onChangeText={searchAddress}
            placeholder="Escribe la dirección para buscar en el mapa..."
            multiline
            leftIcon={
              <Icon
                name="map-marker"
                type="material-community"
                color="#86939e"
              />
            }
          />
        </View>
      </View>

      {/* Formulario */}
      <View style={styles.formContainer}>
        {/* Duración del Servicio */}
        <Text style={styles.inputLabel}>Duración (horas)</Text>
        <Input
          value={duration}
          onChangeText={setDuration}
          keyboardType="numeric"
          leftIcon={
            <Icon
              name="clock-outline"
              type="material-community"
              color="#86939e"
            />
          }
        />

        {/* Notas */}
        <Text style={styles.inputLabel}>Notas Adicionales</Text>
        <Input
          value={notes}
          onChangeText={setNotes}
          placeholder="Instrucciones especiales o requerimientos"
          multiline
          numberOfLines={3}
          leftIcon={
            <Icon
              name="note-text"
              type="material-community"
              color="#86939e"
            />
          }
        />
      </View>

      {/* Total y Confirmación */}
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total Estimado:</Text>
          <Text style={styles.totalAmount}>${calculateTotal().toFixed(2)}</Text>
        </View>
        <Button
          title="Continuar a Confirmación"
          onPress={handleConfirm}
          buttonStyle={styles.confirmButton}
          containerStyle={styles.confirmButtonContainer}
          disabled={!selectedDate || !selectedTime || !markerPosition || !address}
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
  summaryCard: {
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
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    color: '#7f8c8d',
    fontSize: 16,
  },
  summaryText: {
    color: '#2c3e50',
    fontSize: 16,
    fontWeight: '500',
  },
  dateContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    margin: 15,
    borderRadius: 10,
  },
  datePickerButton: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  timeContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    margin: 15,
    borderRadius: 10,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeButton: {
    width: '30%',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#3498db',
    alignItems: 'center',
  },
  selectedTime: {
    backgroundColor: '#3498db',
  },
  timeText: {
    color: '#3498db',
    fontSize: 16,
  },
  selectedTimeText: {
    color: '#ffffff',
  },
  mapContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    margin: 15,
    borderRadius: 10,
  },
  mapWrapper: {
    position: 'relative',
    height: 250,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  locationButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    zIndex: 1,
  },
  locationButtonInner: {
    backgroundColor: '#ffffff',
    borderRadius: 30,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  formContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    margin: 15,
    borderRadius: 10,
  },
  inputLabel: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 5,
    marginTop: 10,
  },
  footer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 18,
    color: '#2c3e50',
  },
  totalAmount: {
    fontSize: 24,
    color: '#27ae60',
    fontWeight: 'bold',
  },
  confirmButtonContainer: {
    borderRadius: 10,
  },
  confirmButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
  },
  addressInputContainer: {
    marginTop: 15,
  },
});

export default BookNursingServiceScreen; 