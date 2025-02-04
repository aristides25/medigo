import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Alert, Animated, TouchableOpacity, ScrollView } from 'react-native';
import { Text, Button, Icon, Avatar } from '@rneui/themed';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';

const ESTADOS_SERVICIO = {
  BUSCANDO: { 
    label: 'Buscando\nambulancia', 
    progress: 0.1,
    icon: 'search'
  },
  ASIGNADO: { 
    label: 'Ambulancia\nasignada', 
    progress: 0.25,
    icon: 'add'
  },
  EN_CAMINO: { 
    label: 'En camino', 
    progress: 0.5,
    icon: 'directions-car'
  },
  LLEGANDO: { 
    label: 'Llegando', 
    progress: 0.75,
    icon: 'room'
  },
  COMPLETADO: { 
    label: 'Servicio\ncompletado', 
    progress: 1,
    icon: 'check'
  },
};

const PulseMarker = ({ coordinate }) => {
  const pulseAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]).start(() => animate());
    };

    animate();
  }, []);

  const scale = pulseAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 4],
  });

  const opacity = pulseAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  return (
    <Marker coordinate={coordinate}>
      <View style={styles.markerContainer}>
        <Animated.View
          style={[
            styles.pulse,
            {
              transform: [{ scale }],
              opacity,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.pulse,
            {
              transform: [{ scale: Animated.multiply(scale, 0.75) }],
              opacity,
            },
          ]}
        />
        <View style={styles.marker}>
          <Icon name="place" type="material" color="#e74c3c" size={40} />
        </View>
      </View>
    </Marker>
  );
};

const EmergencyTrackingScreen = ({ route, navigation }) => {
  const { selectedLocation, selectedAddress, userLocation, emergencyDetails } = route.params;
  const [currentState, setCurrentState] = useState('BUSCANDO');
  const [ambulanceLocation, setAmbulanceLocation] = useState(null);
  const [remainingTime, setRemainingTime] = useState('Calculando...');
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [progress, setProgress] = useState(0.1);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const mapRef = useRef(null);

  const toggleDetails = () => {
    const toValue = isDetailsOpen ? 0 : 1;
    setIsDetailsOpen(!isDetailsOpen);
    Animated.spring(slideAnim, {
      toValue,
      useNativeDriver: true,
      friction: 8,
      tension: 50,
    }).start();
  };

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

  useEffect(() => {
    if (mapRef.current && selectedLocation) {
      // Centrar el mapa en la ubicación seleccionada con zoom cercano
      mapRef.current.animateToRegion({
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002,
      }, 1000);
    }
  }, [selectedLocation]);

  const renderProgressBar = () => {
    const estados = Object.keys(ESTADOS_SERVICIO);
    const currentIndex = estados.indexOf(currentState);

    return (
      <View style={styles.progressBarContainer}>
        <View style={styles.stepsContainer}>
          {estados.map((estado, index) => {
            const isCompleted = index <= currentIndex;
            const isActive = estado === currentState;
            
            return (
              <View key={estado} style={styles.stepItem}>
                <View style={styles.iconContainer}>
                  {index !== 0 && (
                    <View 
                      style={[
                        styles.stepLine, 
                        isCompleted ? styles.completedLine : styles.pendingLine
                      ]} 
                    />
                  )}
                  <View style={[
                    styles.iconCircle,
                    isCompleted ? styles.completedCircle : styles.pendingCircle,
                  ]}>
                    <Icon
                      name={ESTADOS_SERVICIO[estado].icon}
                      type="material"
                      size={24}
                      color={isCompleted ? '#fff' : '#bdc3c7'}
                    />
                  </View>
                </View>
                {isCompleted && (
                  <Text style={[
                    styles.stepLabel,
                    estado === 'COMPLETADO' && styles.completedLabel
                  ]}>
                    {ESTADOS_SERVICIO[estado].label}
                  </Text>
                )}
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderProgressBar()}
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        minZoomLevel={15}
        maxZoomLevel={20}
      >
        {/* Ruta de la ambulancia */}
        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#e74c3c"
            strokeWidth={3}
          />
        )}

        {/* Marcador pulsante del destino */}
        {currentState === 'BUSCANDO' && (
          <PulseMarker coordinate={selectedLocation} />
        )}

        {/* Marcador normal del destino cuando no está buscando */}
        {currentState !== 'BUSCANDO' && (
          <Marker
            coordinate={selectedLocation}
            title="Destino"
            description={selectedAddress}
          >
            <Icon name="place" type="material" color="#e74c3c" size={40} />
          </Marker>
        )}

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

      <Animated.View 
        style={[
          styles.detailsPanel,
          {
            transform: [{
              translateX: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [400, 0]
              })
            }]
          }
        ]}
      >
        <ScrollView style={styles.mainContent}>
          <View style={styles.headerSection}>
            <Text style={styles.serviceTitleText}>Ambulancia Básica</Text>
            <Text style={styles.addressText}>{selectedAddress}</Text>
          </View>

          <View style={styles.detailsCard}>
            <View style={styles.cardHeader}>
              <Icon name="ambulance" type="font-awesome" color="#0288D1" size={24} />
              <Text style={styles.cardTitle}>Detalles del Servicio</Text>
            </View>

            <View style={styles.detailRow}>
              <Icon name="plus-square" type="font-awesome" color="#757575" size={20} />
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailLabel}>Tipo de Servicio</Text>
                <Text style={styles.detailValue}>Ambulancia Básica</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <Icon name="map-marker" type="font-awesome" color="#757575" size={20} />
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailLabel}>Ubicación</Text>
                <Text style={styles.detailValue}>{selectedAddress}</Text>
              </View>
            </View>
          </View>

          <View style={styles.detailsCard}>
            <View style={styles.cardHeader}>
              <Icon name="user" type="font-awesome" color="#0288D1" size={24} />
              <Text style={styles.cardTitle}>Datos del Paciente</Text>
            </View>

            <View style={styles.detailRow}>
              <Icon name="user-circle" type="font-awesome" color="#757575" size={20} />
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailLabel}>Nombre del Paciente</Text>
                <Text style={styles.detailValue}>{emergencyDetails?.patientName || 'No especificado'}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <Icon name="calendar" type="font-awesome" color="#757575" size={20} />
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailLabel}>Edad</Text>
                <Text style={styles.detailValue}>{emergencyDetails?.age || 'No especificada'}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <Icon name="tint" type="font-awesome" color="#757575" size={20} />
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailLabel}>Tipo de Sangre</Text>
                <Text style={styles.detailValue}>{emergencyDetails?.bloodType || 'No especificado'}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <Icon name="phone" type="font-awesome" color="#757575" size={20} />
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailLabel}>Teléfono</Text>
                <Text style={styles.detailValue}>{emergencyDetails?.phone || 'No especificado'}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <Icon name="map-marker" type="font-awesome" color="#757575" size={20} />
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailLabel}>Dirección</Text>
                <Text style={styles.detailValue}>{emergencyDetails?.address || 'No especificada'}</Text>
              </View>
            </View>

            <View style={styles.sectionDivider} />
            <Text style={styles.subSectionTitle}>Contacto de Emergencia</Text>

            <View style={styles.detailRow}>
              <Icon name="user" type="font-awesome" color="#757575" size={20} />
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailLabel}>Nombre del Contacto</Text>
                <Text style={styles.detailValue}>{emergencyDetails?.emergencyContact || 'No especificado'}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <Icon name="phone" type="font-awesome" color="#757575" size={20} />
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailLabel}>Teléfono del Contacto</Text>
                <Text style={styles.detailValue}>{emergencyDetails?.emergencyPhone || 'No especificado'}</Text>
              </View>
            </View>

            <View style={styles.sectionDivider} />
            <Text style={styles.subSectionTitle}>Información de la Emergencia</Text>

            <View style={styles.detailRow}>
              <Icon name="heartbeat" type="font-awesome" color="#757575" size={20} />
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailLabel}>Síntomas</Text>
                <Text style={styles.detailValue}>{emergencyDetails?.symptoms || 'No especificados'}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <Icon name="ambulance" type="font-awesome" color="#757575" size={20} />
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailLabel}>Tipo de Emergencia</Text>
                <Text style={styles.detailValue}>{emergencyDetails?.emergencyType || 'No especificado'}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <Icon name="info-circle" type="font-awesome" color="#757575" size={20} />
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailLabel}>Descripción Adicional</Text>
                <Text style={[styles.detailValue, styles.descriptionText]}>
                  {emergencyDetails?.additionalInfo || 'No especificada'}
                </Text>
              </View>
            </View>

            <View style={styles.sectionDivider} />
            <Text style={styles.subSectionTitle}>Información del Seguro</Text>

            <View style={styles.detailRow}>
              <Icon name="shield" type="font-awesome" color="#757575" size={20} />
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailLabel}>Seguro Médico</Text>
                <Text style={styles.detailValue}>{emergencyDetails?.insurance || 'No especificado'}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <Icon name="id-card" type="font-awesome" color="#757575" size={20} />
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailLabel}>Número de Póliza</Text>
                <Text style={styles.detailValue}>{emergencyDetails?.policyNumber || 'No especificado'}</Text>
              </View>
            </View>
          </View>

          <View style={styles.detailsCard}>
            <View style={styles.cardHeader}>
              <Icon name="user-md" type="font-awesome" color="#0288D1" size={24} />
              <Text style={styles.cardTitle}>Equipo Médico Asignado</Text>
            </View>

            <View style={styles.doctorInfo}>
              <Avatar
                title="JP"
                containerStyle={styles.avatar}
                rounded
                size={60}
                backgroundColor="#0288D1"
              />
              <View style={styles.doctorDetails}>
                <Text style={styles.doctorName}>Dr. Juan Pérez</Text>
                <Text style={styles.doctorSpecialty}>Emergentólogo</Text>
                <View style={styles.experienceTag}>
                  <Text style={styles.experienceText}>8 años de experiencia</Text>
                </View>
              </View>
            </View>

            <View style={styles.detailRow}>
              <Icon name="ambulance" type="font-awesome" color="#757575" size={20} />
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailLabel}>Unidad</Text>
                <Text style={styles.detailValue}>AMB-001</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </Animated.View>

      <TouchableOpacity 
        style={[
          styles.toggleButton,
          {
            transform: [{
              translateX: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -25]
              })
            }]
          }
        ]}
        onPress={toggleDetails}
      >
        <Icon 
          name={isDetailsOpen ? "chevron-right" : "chevron-left"} 
          type="font-awesome" 
          color="#fff" 
          size={20} 
        />
      </TouchableOpacity>

      {currentState === 'COMPLETADO' && (
        <Button
          title="Finalizar Servicio"
          onPress={() => navigation.navigate('Home')}
          buttonStyle={styles.completeButton}
          titleStyle={styles.completeButtonText}
          containerStyle={styles.completeButtonContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  ambulanceMarker: {
    backgroundColor: '#e74c3c',
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
  },
  progressBarContainer: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    width: '100%',
  },
  stepItem: {
    alignItems: 'center',
    position: 'relative',
    width: 36,
  },
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
    width: '100%',
  },
  stepLine: {
    height: 3,
    width: 45,
    position: 'absolute',
    left: -41,
    top: '50%',
    marginTop: -1.5,
    zIndex: 0,
  },
  completedLine: {
    backgroundColor: '#4CAF50',
  },
  pendingLine: {
    backgroundColor: '#E0E0E0',
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  completedCircle: {
    backgroundColor: '#4CAF50',
    borderWidth: 0,
  },
  pendingCircle: {
    backgroundColor: '#fff',
    borderColor: '#E0E0E0',
  },
  stepLabel: {
    fontSize: 10,
    color: '#4CAF50',
    textAlign: 'center',
    marginTop: 4,
    width: 60,
    position: 'absolute',
    top: 40,
    left: -12,
  },
  completedLabel: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  completeButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 1000,
  },
  completeButton: {
    backgroundColor: '#4CAF50',
    height: 50,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  completeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  pulse: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderWidth: 4,
    borderColor: '#e74c3c',
    borderRadius: 40,
    backgroundColor: 'transparent',
  },
  marker: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleButton: {
    position: 'absolute',
    right: 0,
    top: '50%',
    marginTop: -25,
    backgroundColor: '#0288D1',
    width: 25,
    height: 50,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: -2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1001,
  },
  detailsPanel: {
    position: 'absolute',
    top: 100,
    right: 0,
    width: '85%',
    height: '80%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: -2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6,
  },
  headerSection: {
    marginBottom: 15,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  serviceTitleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  detailsCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0288D1',
    marginLeft: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  detailTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#757575',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatar: {
    backgroundColor: '#0288D1',
  },
  doctorDetails: {
    marginLeft: 15,
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  doctorSpecialty: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  experienceTag: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  experienceText: {
    fontSize: 12,
    color: '#4CAF50',
  },
  descriptionText: {
    fontSize: 13,
    lineHeight: 18,
    marginTop: 2,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },
  subSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0288D1',
    marginBottom: 10,
  },
});

export default EmergencyTrackingScreen; 