import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Alert } from 'react-native';
import { Text, Button, Icon } from '@rneui/themed';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';

const ESTADOS_SERVICIO = {
  BUSCANDO: { label: 'Buscando ambulancia cercana', progress: 0.1 },
  ASIGNADO: { label: 'Ambulancia asignada', progress: 0.25 },
  EN_CAMINO: { label: 'Ambulancia en camino', progress: 0.5 },
  LLEGANDO: { label: 'Ambulancia llegando', progress: 0.75 },
  COMPLETADO: { label: 'Servicio completado', progress: 1 },
};

const EmergencyTrackingScreen = ({ route, navigation }) => {
  const { selectedLocation, selectedAddress, userLocation } = route.params;
  const [currentState, setCurrentState] = useState('BUSCANDO');
  const [ambulanceLocation, setAmbulanceLocation] = useState(null);
  const [remainingTime, setRemainingTime] = useState('Calculando...');
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [progress, setProgress] = useState(0.1);

  // Simular el proceso de asignación y seguimiento de ambulancia
  useEffect(() => {
    let timeoutId;
    const simulateEmergencyProcess = async () => {
      // Simular búsqueda de ambulancia (3 segundos)
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Asignar ambulancia
      setCurrentState('ASIGNADO');
      setProgress(ESTADOS_SERVICIO.ASIGNADO.progress);
      setAmbulanceLocation({
        latitude: userLocation.latitude + 0.002,
        longitude: userLocation.longitude + 0.002
      });
      setRemainingTime('8 min');
      
      // Simular ambulancia en camino (5 segundos)
      await new Promise(resolve => setTimeout(resolve, 5000));
      setCurrentState('EN_CAMINO');
      setProgress(ESTADOS_SERVICIO.EN_CAMINO.progress);
      setAmbulanceLocation({
        latitude: userLocation.latitude + 0.001,
        longitude: userLocation.longitude + 0.001
      });
      setRemainingTime('4 min');
      
      // Simular ambulancia llegando (5 segundos)
      await new Promise(resolve => setTimeout(resolve, 5000));
      setCurrentState('LLEGANDO');
      setProgress(ESTADOS_SERVICIO.LLEGANDO.progress);
      setAmbulanceLocation(selectedLocation);
      setRemainingTime('1 min');
      
      // Simular servicio completado (3 segundos)
      await new Promise(resolve => setTimeout(resolve, 3000));
      setCurrentState('COMPLETADO');
      setProgress(ESTADOS_SERVICIO.COMPLETADO.progress);
      setRemainingTime('Completado');
    };

    simulateEmergencyProcess();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [userLocation, selectedLocation]);

  // Simular ruta de la ambulancia
  useEffect(() => {
    if (ambulanceLocation && selectedLocation) {
      setRouteCoordinates([
        ambulanceLocation,
        selectedLocation
      ]);
    }
  }, [ambulanceLocation, selectedLocation]);

  const renderProgressBar = () => {
    return (
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          ...selectedLocation,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {/* Ruta de la ambulancia */}
        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#e74c3c"
            strokeWidth={3}
          />
        )}

        {/* Marcador del destino */}
        <Marker
          coordinate={selectedLocation}
          title="Destino"
          description={selectedAddress}
        >
          <Icon name="place" type="material" color="#e74c3c" size={40} />
        </Marker>

        {/* Marcador de la ambulancia */}
        {ambulanceLocation && (
          <Marker
            coordinate={ambulanceLocation}
            title="Ambulancia"
            description="Unidad: AMB-001"
          >
            <View style={styles.ambulanceMarker}>
              <Icon name="local-hospital" type="material" color="#fff" size={20} />
            </View>
          </Marker>
        )}
      </MapView>

      <View style={styles.infoPanel}>
        <Text style={styles.statusText}>
          {ESTADOS_SERVICIO[currentState].label}
        </Text>
        {renderProgressBar()}
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Icon name="timer" type="material" color="#e74c3c" size={24} />
            <Text style={styles.detailText}>
              Tiempo estimado: {remainingTime}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <Icon name="local-hospital" type="material" color="#e74c3c" size={24} />
            <Text style={styles.detailText}>Unidad: AMB-001</Text>
          </View>

          <View style={styles.detailRow}>
            <Icon name="place" type="material" color="#e74c3c" size={24} />
            <Text style={styles.detailText} numberOfLines={2}>
              Destino: {selectedAddress || 'Ubicación seleccionada'}
            </Text>
          </View>
        </View>

        {currentState === 'COMPLETADO' && (
          <Button
            title="Finalizar Servicio"
            onPress={() => navigation.navigate('Home')}
            buttonStyle={styles.completeButton}
            titleStyle={styles.completeButtonText}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.6,
  },
  ambulanceMarker: {
    backgroundColor: '#e74c3c',
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
  },
  infoPanel: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  statusText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
    textAlign: 'center',
  },
  progressContainer: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginBottom: 15,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#e74c3c',
    borderRadius: 4,
  },
  detailsContainer: {
    marginTop: 5,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#2c3e50',
    flex: 1,
  },
  completeButton: {
    backgroundColor: '#2ecc71',
    height: 50,
    borderRadius: 25,
    marginTop: 10,
  },
  completeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EmergencyTrackingScreen; 