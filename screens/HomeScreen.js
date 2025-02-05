import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { Text } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Location from 'expo-location';

const HomeScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [locationText, setLocationText] = useState('Obteniendo ubicación...');
  const [searchText, setSearchText] = useState('');
  const [showResults, setShowResults] = useState(false);

  // Definir los módulos disponibles para búsqueda
  const modules = [
    { 
      name: 'Farmacia', 
      route: 'Pharmacy',
      keywords: ['farmacia', 'medicamentos', 'medicina', 'drogueria']
    },
    { 
      name: 'Citas Presenciales', 
      route: 'Appointments',
      keywords: ['cita', 'presencial', 'doctor', 'medico', 'consulta']
    },
    { 
      name: 'Telemedicina', 
      route: 'TelemedicineHome',
      keywords: ['tele', 'virtual', 'online', 'video consulta']
    },
    { 
      name: 'Servicios de Fertilidad', 
      route: 'NursingHome',
      keywords: ['fertilidad', 'embarazo', 'reproduccion']
    },
    { 
      name: 'Ambulancia', 
      route: 'EmergencyMap',
      keywords: ['emergencia', 'urgencia', 'ambulancia']
    },
    { 
      name: 'Portal del Paciente', 
      route: 'MedicalRecords',
      keywords: ['portal', 'perfil', 'historial', 'expediente']
    }
  ];

  // Función para filtrar módulos basado en el texto de búsqueda
  const getFilteredModules = () => {
    if (!searchText) return [];
    const searchLower = searchText.toLowerCase();
    return modules.filter(module => 
      module.name.toLowerCase().includes(searchLower) ||
      module.keywords.some(keyword => keyword.includes(searchLower))
    );
  };

  // Función para manejar la selección de un módulo
  const handleModuleSelect = (route) => {
    setSearchText('');
    setShowResults(false);
    navigation.navigate(route);
  };

  useEffect(() => {
    let locationSubscription;
    let isMounted = true;
    
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        if (isMounted) setLocationText('Permiso de ubicación denegado');
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        if (isMounted) {
          setLocation(location);
          
          // Obtener dirección a partir de coordenadas
          let address = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          });

          if (address && address[0] && isMounted) {
            const addr = address[0];
            setLocationText(`${addr.street || ''} ${addr.name || ''}, ${addr.city || ''}`);
          }
        }

        // Iniciar la suscripción después de obtener la ubicación inicial
        locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 10000, // Aumentado a 10 segundos
            distanceInterval: 50  // Aumentado a 50 metros
          },
          async (newLocation) => {
            if (!isMounted) return;
            
            setLocation(newLocation);
            try {
              let address = await Location.reverseGeocodeAsync({
                latitude: newLocation.coords.latitude,
                longitude: newLocation.coords.longitude
              });

              if (address && address[0] && isMounted) {
                const addr = address[0];
                setLocationText(`${addr.street || ''} ${addr.name || ''}, ${addr.city || ''}`);
              }
            } catch (error) {
              console.log('Error al obtener dirección:', error);
            }
          }
        );
      } catch (error) {
        if (isMounted) setLocationText('No se pudo obtener la ubicación');
      }
    })();

    return () => {
      isMounted = false;
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, []); // Solo se ejecuta una vez al montar el componente

  // Simulamos que no hay cita (esto después se conectará con los datos reales)
  const proximaCita = null; // Aquí vendría la próxima cita desde tu backend

  const renderAppointmentCard = () => {
    if (proximaCita) {
      return (
        <TouchableOpacity style={styles.appointmentCard} onPress={() => navigation.navigate('Appointments')}>
          <Image 
            source={require('../assets/icon.png')}
            style={styles.doctorAvatar}
          />
          <View style={styles.appointmentInfo}>
            <Text style={styles.doctorName}>{proximaCita.doctorName}</Text>
            <Text style={styles.appointmentTime}>{proximaCita.datetime}</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#666" />
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity 
        style={[styles.appointmentCard, styles.newAppointmentCard]} 
        onPress={() => navigation.navigate('Appointments')}
      >
        <View style={[styles.iconContainer, { marginRight: 15 }]}>
          <Icon name="calendar-plus" size={24} color={COLORS.lightBlue} />
        </View>
        <View style={styles.appointmentInfo}>
          <Text style={[styles.doctorName, { color: COLORS.darkBlue }]}>¿Necesitas una cita médica?</Text>
          <Text style={styles.appointmentTime}>Toca aquí para agendar</Text>
        </View>
        <Icon name="chevron-right" size={24} color="#666" />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Contenido existente */}
        <View style={styles.content}>
          {/* Header con saludo */}
          <View style={styles.header}>
            <Text style={styles.greeting}>Hola, José Daniel</Text>
          </View>

          {/* Tarjeta de próxima cita */}
          {renderAppointmentCard()}

          {/* Ubicación en tiempo real */}
          <View style={styles.locationBar}>
            <Icon name="map-marker" size={24} color={COLORS.lightBlue} />
            <Text style={styles.locationText} numberOfLines={1} ellipsizeMode="tail">
              {locationText}
            </Text>
            {location && (
              <View style={styles.locationPulse}>
                <Icon name="circle" size={8} color={COLORS.lightBlue} />
              </View>
            )}
          </View>

          {/* Barra de búsqueda mejorada */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Icon name="magnify" size={24} color={COLORS.lightBlue} />
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar por especialidad o servicio"
                placeholderTextColor="#666"
                value={searchText}
                onChangeText={(text) => {
                  setSearchText(text);
                  setShowResults(!!text);
                }}
              />
              {searchText ? (
                <TouchableOpacity 
                  onPress={() => {
                    setSearchText('');
                    setShowResults(false);
                  }}
                >
                  <Icon name="close" size={20} color="#666" />
                </TouchableOpacity>
              ) : null}
            </View>
            
            {/* Resultados de búsqueda */}
            {showResults && (
              <View style={styles.searchResults}>
                {getFilteredModules().map((module, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.searchResultItem}
                    onPress={() => handleModuleSelect(module.route)}
                  >
                    <Text style={styles.searchResultText}>{module.name}</Text>
                    <Icon name="chevron-right" size={20} color="#666" />
                  </TouchableOpacity>
                ))}
                {getFilteredModules().length === 0 && searchText && (
                  <View style={styles.searchResultItem}>
                    <Text style={styles.noResultsText}>No se encontraron resultados</Text>
                  </View>
                )}
              </View>
            )}
          </View>

          {/* Grid de servicios */}
          <View style={styles.servicesGrid}>
            {/* Farmacia */}
            <TouchableOpacity 
              style={styles.serviceCard} 
              onPress={() => navigation.navigate('Pharmacy')}
            >
              <View style={styles.iconContainer}>
                <Icon name="pharmacy" size={24} color={COLORS.lightBlue} />
              </View>
              <Text style={styles.serviceText}>Farmacia</Text>
            </TouchableOpacity>

            {/* Citas Médicas */}
            <TouchableOpacity 
              style={styles.serviceCard} 
              onPress={() => navigation.navigate('Appointments')}
            >
              <View style={styles.iconContainer}>
                <Icon name="hospital-building" size={24} color={COLORS.lightBlue} />
              </View>
              <Text style={styles.serviceText}>Citas Presenciales</Text>
            </TouchableOpacity>

            {/* Telemedicina */}
            <TouchableOpacity 
              style={styles.serviceCard} 
              onPress={() => navigation.navigate('TelemedicineHome')}
            >
              <View style={styles.iconContainer}>
                <Icon name="phone-plus" size={24} color={COLORS.lightBlue} />
              </View>
              <Text style={styles.serviceText}>Telemedicina</Text>
            </TouchableOpacity>

            {/* Servicios de Fertilidad */}
            <TouchableOpacity 
              style={styles.serviceCard} 
              onPress={() => navigation.navigate('NursingHome')}
            >
              <View style={styles.iconContainer}>
                <Icon name="baby-face-outline" size={24} color={COLORS.lightBlue} />
              </View>
              <Text style={styles.serviceText}>Servicios de Fertilidad</Text>
            </TouchableOpacity>

            {/* Ambulancia - reemplazando Salud General */}
            <TouchableOpacity 
              style={styles.serviceCard} 
              onPress={() => navigation.navigate('EmergencyMap')}
            >
              <View style={styles.iconContainer}>
                <Icon name="ambulance" size={24} color={COLORS.lightBlue} />
              </View>
              <Text style={styles.serviceText}>Ambulancia</Text>
            </TouchableOpacity>

            {/* Portal del Paciente */}
            <TouchableOpacity 
              style={styles.serviceCard} 
              onPress={() => navigation.navigate('MedicalRecords')}
            >
              <View style={styles.iconContainer}>
                <Icon name="account" size={24} color={COLORS.lightBlue} />
              </View>
              <Text style={styles.serviceText}>Portal del Paciente</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Barra de navegación inferior */}
        <View style={styles.navbar}>
          <TouchableOpacity 
            style={styles.navItem} 
            onPress={() => {}}  // Inicio - ya estamos aquí
          >
            <Icon name="home" size={24} color={COLORS.lightBlue} />
            <Text style={[styles.navText, { color: COLORS.lightBlue }]}>Inicio</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.navItem} 
            onPress={() => navigation.navigate('Settings')}
          >
            <Icon name="cog" size={24} color="#666" />
            <Text style={styles.navText}>Configuración</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.navItem} 
            onPress={() => navigation.navigate('Profile')}
          >
            <Icon name="account" size={24} color="#666" />
            <Text style={styles.navText}>Perfil</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.lightestBlue,
    height: '100%',
    paddingTop: 50,
  },
  container: {
    flex: 1,
    height: '100%',
    paddingBottom: 65,
    paddingTop: 0,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
    paddingBottom: 65,
  },
  header: {
    marginTop: 0,
    marginBottom: 15,
    backgroundColor: COLORS.lightBlue,
    padding: 18,
    borderRadius: 25,
    shadowColor: COLORS.darkBlue,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  greeting: {
    fontSize: 26,
    fontWeight: '800',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.15)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    letterSpacing: 0.5,
  },
  appointmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 20,
    marginBottom: 15,
    shadowColor: COLORS.darkBlue,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    transform: [{ scale: 1 }],
  },
  doctorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    borderWidth: 2,
    borderColor: COLORS.lightBlue,
  },
  appointmentInfo: {
    flex: 1,
    paddingRight: 10,
  },
  doctorName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2A2A2A',
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  appointmentTime: {
    fontSize: 14,
    color: '#666',
    letterSpacing: 0.2,
  },
  locationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 20,
    marginBottom: 15,
    shadowColor: COLORS.darkBlue,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  locationText: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
    fontSize: 15,
    color: '#2A2A2A',
    letterSpacing: 0.2,
  },
  locationPulse: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(83, 178, 193, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    animation: 'pulse 2s infinite',
  },
  searchContainer: {
    marginBottom: 20,
    zIndex: 1000,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 12,
    borderRadius: 20,
    shadowColor: COLORS.darkBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: '#2A2A2A',
    height: 40,
    letterSpacing: 0.2,
  },
  searchResults: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 15,
    marginTop: 5,
    shadowColor: COLORS.darkBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    maxHeight: 200,
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  searchResultText: {
    fontSize: 15,
    color: '#2A2A2A',
    fontWeight: '500',
  },
  noResultsText: {
    fontSize: 15,
    color: '#666',
    fontStyle: 'italic',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
    marginBottom: 10,
    flex: 0.8,
  },
  serviceCard: {
    width: '31%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: COLORS.darkBlue,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 7,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    aspectRatio: 0.85,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.lightestBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: COLORS.darkBlue,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  serviceText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2A2A2A',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 16,
    letterSpacing: 0.2,
  },
  navbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 10,
    height: 60,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    flex: 1,
  },
  navText: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
    color: '#666',
    letterSpacing: 0.2,
  },
  newAppointmentCard: {
    borderStyle: 'dashed',
    borderColor: COLORS.lightBlue,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
});

export default HomeScreen; 