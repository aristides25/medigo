import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Alert } from 'react-native';
import { Text, Button, Icon } from '@rneui/themed';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline, Circle } from 'react-native-maps';
import * as Location from 'expo-location';

const GOOGLE_MAPS_API_KEY = 'TU_API_KEY'; // Necesitarás una API key de Google Maps

const ESTADOS_SERVICIO = {
  ASIGNADO: { label: 'Ambulancia asignada', progress: 0.25 },
  EN_CAMINO: { label: 'Ambulancia en camino', progress: 0.5 },
  LLEGANDO: { label: 'Ambulancia llegando', progress: 0.75 },
  COMPLETADO: { label: 'Servicio completado', progress: 1 },
};

const SIMULATION_SPEED = 300; // Velocidad de la simulación (ms)

const EmergencyTrackingScreen = ({ route, navigation }) => {
  const { selectedLocation, selectedAddress, userLocation } = route.params;
  const mapRef = useRef(null);
  const [currentState, setCurrentState] = useState('ASIGNADO');
  const [ambulanceLocation, setAmbulanceLocation] = useState(userLocation);
  const [remainingTime, setRemainingTime] = useState('10 min');
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(userLocation);
  const [progress, setProgress] = useState(0);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const animationTimerRef = useRef(null);

  // Verificar permisos de ubicación y obtener ubicación inicial
  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Permisos necesarios',
            'Necesitamos acceso a tu ubicación para mostrar tu posición en el mapa.',
            [{ text: 'OK' }]
          );
          return;
        }
        setHasLocationPermission(true);

        // Obtener ubicación inicial
        const initialLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced
        });

        const initialCoords = {
          latitude: initialLocation.coords.latitude,
          longitude: initialLocation.coords.longitude,
        };
        setCurrentLocation(initialCoords);

        // Iniciar seguimiento de ubicación en tiempo real
        const locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.Balanced,
            timeInterval: 2000,
            distanceInterval: 10,
          },
          (location) => {
            const newCoords = {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            };
            setCurrentLocation(newCoords);
            
            // Centrar mapa en la nueva ubicación si es necesario
            mapRef.current?.animateToRegion({
              ...newCoords,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }, 1000);
          }
        );

        return () => {
          if (locationSubscription) {
            locationSubscription.remove();
          }
        };
      } catch (error) {
        console.error('Error al obtener ubicación:', error);
        Alert.alert(
          'Error',
          'No se pudo obtener tu ubicación. Por favor, verifica que el GPS esté activado.',
          [{ text: 'OK' }]
        );
      }
    })();
  }, []);

  // Función para decodificar la polyline de Google Maps
  const decodePolyline = (encoded) => {
    const points = [];
    let index = 0, lat = 0, lng = 0;

    while (index < encoded.length) {
      let shift = 0, result = 0;
      
      do {
        let byte = encoded.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (result & 0x20);
      
      lat += ((result & 1) ? ~(result >> 1) : (result >> 1));
      
      shift = 0;
      result = 0;
      
      do {
        let byte = encoded.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (result & 0x20);
      
      lng += ((result & 1) ? ~(result >> 1) : (result >> 1));
      
      points.push({
        latitude: lat * 1e-5,
        longitude: lng * 1e-5,
      });
    }
    
    return points;
  };

  // Función para obtener la ruta real usando Google Directions API
  const getRouteFromGoogle = async () => {
    try {
      const origin = `${userLocation.latitude},${userLocation.longitude}`;
      const destination = `${selectedLocation.latitude},${selectedLocation.longitude}`;
      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=driving&key=${GOOGLE_MAPS_API_KEY}`;
      
      const response = await fetch(url);
      const result = await response.json();
      
      if (result.routes.length > 0) {
        const route = result.routes[0];
        const points = decodePolyline(route.overview_polyline.points);
        setRouteCoordinates(points);
        
        // Obtener tiempo estimado
        const duration = route.legs[0].duration.text;
        setRemainingTime(duration);
      }
    } catch (error) {
      console.error('Error obteniendo ruta:', error);
    }
  };

  // Función para animar el movimiento de la ambulancia
  const animateAmbulance = (newLocation) => {
    mapRef.current?.animateCamera({
      center: newLocation,
      pitch: 45,
      heading: 90,
      zoom: 17,
      duration: 1000,
    });
  };

  const startSimulation = () => {
    console.log('Iniciando simulación con', routeCoordinates.length, 'puntos');
    let step = 0;
    const totalSteps = routeCoordinates.length;

    // Si no hay ruta, crear una ruta directa
    if (totalSteps === 0) {
      const directRoute = [
        userLocation,
        {
          latitude: (userLocation.latitude + selectedLocation.latitude) / 2,
          longitude: (userLocation.longitude + selectedLocation.longitude) / 2,
        },
        selectedLocation
      ];
      setRouteCoordinates(directRoute);
      return; // La simulación se iniciará cuando se actualice routeCoordinates
    }

    if (animationTimerRef.current) {
      clearInterval(animationTimerRef.current);
    }

    // Iniciar secuencia
    setCurrentState('ASIGNADO');
    setProgress(0.25);

    setTimeout(() => {
      setCurrentState('EN_CAMINO');
      setProgress(0.5);

      animationTimerRef.current = setInterval(() => {
        if (step < totalSteps) {
          console.log('Moviendo ambulancia paso:', step, 'de', totalSteps);
          setAmbulanceLocation(routeCoordinates[step]);
          
          const currentProgress = step / totalSteps;
          
          if (currentProgress >= 0.7) {
            setCurrentState('LLEGANDO');
            setProgress(0.75);
          }

          if (step === totalSteps - 1) {
            console.log('Completando servicio');
            setCurrentState('COMPLETADO');
            setProgress(1);
            setAmbulanceLocation(selectedLocation);
            clearInterval(animationTimerRef.current);
          }

          step++;
        }
      }, SIMULATION_SPEED);
    }, 2000);
  };

  // Obtener ruta y comenzar simulación
  useEffect(() => {
    const initializeRoute = async () => {
      if (hasLocationPermission) {
        try {
          const origin = `${userLocation.latitude},${userLocation.longitude}`;
          const destination = `${selectedLocation.latitude},${selectedLocation.longitude}`;
          const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=driving&key=${GOOGLE_MAPS_API_KEY}`;
          
          const response = await fetch(url);
          const result = await response.json();
          
          if (result.routes && result.routes.length > 0) {
            const route = result.routes[0];
            const points = decodePolyline(route.overview_polyline.points);
            console.log('Ruta obtenida con', points.length, 'puntos');
            setRouteCoordinates(points);
          } else {
            // Si no hay ruta, crear una ruta directa
            console.log('Creando ruta directa');
            const directRoute = [
              userLocation,
              {
                latitude: (userLocation.latitude + selectedLocation.latitude) / 2,
                longitude: (userLocation.longitude + selectedLocation.longitude) / 2,
              },
              selectedLocation
            ];
            setRouteCoordinates(directRoute);
          }
        } catch (error) {
          console.error('Error obteniendo ruta:', error);
          // En caso de error, crear ruta directa
          const directRoute = [
            userLocation,
            {
              latitude: (userLocation.latitude + selectedLocation.latitude) / 2,
              longitude: (userLocation.longitude + selectedLocation.longitude) / 2,
            },
            selectedLocation
          ];
          setRouteCoordinates(directRoute);
        }
      }
    };

    initializeRoute();
  }, [hasLocationPermission]);

  // Iniciar simulación cuando tengamos la ruta
  useEffect(() => {
    if (routeCoordinates.length > 0) {
      console.log('Ruta lista para simulación');
      startSimulation();
    }
  }, [routeCoordinates]);

  // Limpiar al desmontar
  useEffect(() => {
    return () => {
      if (animationTimerRef.current) {
        clearInterval(animationTimerRef.current);
      }
    };
  }, []);

  const renderProgressBar = () => {
    return (
      <View style={styles.progressContainer}>
        <View 
          style={[
            styles.progressBar, 
            { width: `${progress * 100}%` }
          ]} 
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          ...currentLocation,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        showsTraffic={true}
      >
        {/* Círculo de ubicación actual */}
        {currentLocation && (
          <Circle
            center={currentLocation}
            radius={50}
            fillColor="rgba(33, 150, 243, 0.2)"
            strokeColor="rgba(33, 150, 243, 0.5)"
            strokeWidth={2}
          />
        )}

        {/* Ruta de la ambulancia */}
        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#e74c3c"
            strokeWidth={4}
            strokeColors={['#e74c3c']}
          />
        )}

        {/* Marcador de ubicación actual */}
        <Marker
          coordinate={currentLocation}
          title="Tu ubicación"
          pinColor="blue"
        >
          <View style={styles.userLocationMarker}>
            <Icon name="my-location" type="material" color="#2196F3" size={24} />
          </View>
        </Marker>

        {/* Marcador del destino */}
        <Marker
          coordinate={selectedLocation}
          title="Destino"
          description={selectedAddress}
        >
          <Icon name="place" type="material" color="#e74c3c" size={40} />
        </Marker>

        {/* Marcador de la ambulancia */}
        <Marker
          coordinate={ambulanceLocation}
          title="Ambulancia"
          description="Unidad: AMB-001"
        >
          <View style={styles.ambulanceMarker}>
            <Icon name="local-hospital" type="material" color="#fff" size={20} />
          </View>
        </Marker>
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
    justifyContent: 'space-between',
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
    marginBottom: 10,
  },
  completeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userLocationMarker: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#2196F3',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default EmergencyTrackingScreen; 