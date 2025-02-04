import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import { Text, Button, Icon, SearchBar } from '@rneui/themed';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

const services = [
  {
    id: 1,
    title: 'Ambulancia Básica',
    icon: 'ambulance',
    color: '#e74c3c'
  },
  {
    id: 2,
    title: 'Ambulancia UTI',
    icon: 'heartbeat',
    color: '#c0392b'
  },
  {
    id: 3,
    title: 'Traslado Programado',
    icon: 'calendar',
    color: '#3498db'
  },
  {
    id: 4,
    title: 'Traslado Interhospitalario',
    icon: 'hospital-o',
    color: '#2980b9'
  },
  {
    id: 5,
    title: 'Emergencia Crítica',
    icon: 'medkit',
    color: '#e67e22'
  },
  {
    id: 6,
    title: 'Cuidados Intensivos',
    icon: 'user-md',
    color: '#d35400'
  }
];

const EmergencyMapScreen = ({ navigation, route }) => {
  const mapRef = React.useRef(null);
  const [location, setLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [loading, setLoading] = useState(true);
  const [followsUserLocation, setFollowsUserLocation] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  const [formDataReceived, setFormDataReceived] = useState(false);

  // Función para obtener la dirección de una ubicación
  const getAddressFromCoords = async (coords) => {
    try {
      const address = await Location.reverseGeocodeAsync(coords);
      if (address[0]) {
        const {
          street,
          name,
          district,
          city,
          region,
          country
        } = address[0];

        let fullAddress = [];
        if (street) fullAddress.push(street);
        if (name && name !== street) fullAddress.push(name);
        if (district) fullAddress.push(district);
        if (city) fullAddress.push(city);
        if (region && region !== city) fullAddress.push(region);
        if (country) fullAddress.push(country);

        return fullAddress.join(', ');
      }
      return 'Dirección no encontrada';
    } catch (error) {
      console.error('Error obteniendo dirección:', error);
      return 'Error al obtener la dirección';
    }
  };

  const centerMapOnLocation = (coords, animate = true) => {
    if (mapRef.current) {
      const region = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002,
      };
      
      if (animate) {
        mapRef.current.animateToRegion(region, 1000);
      } else {
        mapRef.current.setRegion(region);
      }
    }
  };

  useEffect(() => {
    const getLocation = async () => {
      try {
        setLoading(true);
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          alert('Se necesitan permisos de ubicación para solicitar una ambulancia');
          return;
        }

        // Configurar la precisión máxima
        await Location.enableNetworkProviderAsync();
        
        // Obtener ubicación con máxima precisión
        let preciseLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.BestForNavigation,
          maximumAge: 0,
          timeout: 5000
        });

        const coords = {
          latitude: preciseLocation.coords.latitude,
          longitude: preciseLocation.coords.longitude,
        };

        setLocation(coords);
        setSelectedLocation(coords);
        
        if (mapRef.current) {
          mapRef.current.animateToRegion({
            ...coords,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
          }, 1000);
        }

        const address = await getAddressFromCoords(coords);
        setSelectedAddress(address);
        setSearchQuery(address);

        // Configurar actualización en tiempo real con máxima precisión
        const locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.BestForNavigation,
            timeInterval: 2000,
            distanceInterval: 1,
          },
          (newLocation) => {
            const updatedCoords = {
              latitude: newLocation.coords.latitude,
              longitude: newLocation.coords.longitude,
            };
            setLocation(updatedCoords);
          }
        );

        return () => {
          if (locationSubscription) {
            locationSubscription.remove();
          }
        };

      } catch (error) {
        console.error('Error configurando ubicación:', error);
        alert('Error al obtener la ubicación. Por favor, verifica que el GPS esté activado.');
      } finally {
        setLoading(false);
      }
    };

    getLocation();
  }, []);

  useEffect(() => {
    if (route.params?.formData) {
      setFormDataReceived(true);
    }
  }, [route.params]);

  const handleSearch = async (text) => {
    setSearchQuery(text);
    if (text.length > 3) {
      try {
        // Primero intentamos con geocoding normal
        const results = await Location.geocodeAsync(text);
        
        // Para cada resultado, obtenemos la dirección completa
        const detailedResults = await Promise.all(
          results.slice(0, 5).map(async (result) => {
            const address = await Location.reverseGeocodeAsync({
              latitude: result.latitude,
              longitude: result.longitude
            });
            
            const location = address[0];
            return {
              ...result,
              formattedAddress: `${location.street || ''} ${location.name || ''}, ${location.district || ''} ${location.city || ''}, ${location.country || ''}`.trim(),
            };
          })
        );

        setSearchResults(detailedResults);
        setShowResults(true);
      } catch (error) {
        console.error('Error buscando ubicación:', error);
      }
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const handleSelectSearchResult = async (result) => {
    try {
      const newLocation = {
        latitude: result.latitude,
        longitude: result.longitude,
      };

      centerMapOnLocation(newLocation);
      const address = await getAddressFromCoords(newLocation);
      setSelectedAddress(address);
      setSearchQuery(address);
      setSelectedLocation(newLocation);
      setShowResults(false);
    } catch (error) {
      console.error('Error seleccionando ubicación:', error);
    }
  };

  const handleMapPress = async (event) => {
    setFollowsUserLocation(false); // Desactivar seguimiento al tocar el mapa
    const newLocation = event.nativeEvent.coordinate;
    centerMapOnLocation(newLocation);
    const address = await getAddressFromCoords(newLocation);
    setSelectedAddress(address);
    setSearchQuery(address);
    setSelectedLocation(newLocation);
    setShowResults(false);
  };

  const handleMyLocationPress = async () => {
    try {
      setFollowsUserLocation(true);
      
      // Obtener la ubicación más reciente
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
      });

      const coords = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      };

      setLocation(coords);
      centerMapOnLocation(coords, true);

      // Actualizar la dirección
      const address = await getAddressFromCoords(coords);
      setSelectedAddress(address);
      setSearchQuery(address);
    } catch (error) {
      console.error('Error al centrar en ubicación actual:', error);
      alert('No se pudo obtener tu ubicación actual');
    }
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  const handleContinue = () => {
    if (selectedLocation && selectedAddress) {
      navigation.navigate('EmergencyTracking', {
        selectedLocation,
        selectedAddress,
        userLocation: location,
        emergencyDetails: route.params?.formData || {}
      });
    }
  };

  const renderSearchResult = ({ item }) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => handleSelectSearchResult(item)}
    >
      <Icon name="place" type="material" color="#e74c3c" size={20} />
      <Text style={styles.resultText}>
        {item.formattedAddress}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#e74c3c" />
        <Text style={styles.loadingText}>Obteniendo tu ubicación...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          ref={mapRef}
          style={styles.map}
          provider="google"
          initialRegion={{
            ...location,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
          }}
          onPress={handleMapPress}
          showsUserLocation={true}
          userLocationUpdateInterval={5000}
          showsMyLocationButton={true}
          showsCompass={true}
          loadingEnabled={true}
          mapPadding={{ top: 100, right: 0, bottom: 100, left: 0 }}
        >
          {selectedLocation && selectedLocation !== location && (
            <Marker
              coordinate={selectedLocation}
              title="Ubicación seleccionada"
              description={selectedAddress}
              pinColor="#e74c3c"
            >
              <Icon name="place" type="material" color="#e74c3c" size={40} />
            </Marker>
          )}
        </MapView>
      )}

      <View style={styles.searchBarTop}>
        <View style={styles.searchContainer}>
          <SearchBar
            placeholder="Buscar dirección"
            onChangeText={handleSearch}
            value={searchQuery}
            containerStyle={styles.searchBarContainer}
            inputContainerStyle={styles.searchBarInputContainer}
            inputStyle={styles.searchBarInput}
            searchIcon={<Icon name="place" type="material" color="#4285F4" size={20} />}
            platform="default"
            lightTheme
            onClear={() => {
              setSearchResults([]);
              setShowResults(false);
            }}
          />
        </View>

        {showResults && searchResults.length > 0 && (
          <View style={styles.searchResults}>
            <FlatList
              data={searchResults}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderSearchResult}
              style={styles.resultsList}
            />
          </View>
        )}

        <ScrollView horizontal style={styles.servicesContainer} showsHorizontalScrollIndicator={false}>
          {services.map((service) => (
            <TouchableOpacity 
              key={service.id} 
              style={[
                styles.serviceCard,
                selectedService?.id === service.id && {backgroundColor: service.color}
              ]}
              onPress={() => handleServiceSelect(service)}
            >
              <Icon
                name={service.icon}
                type="font-awesome"
                size={20}
                color={selectedService?.id === service.id ? '#fff' : service.color}
                style={styles.serviceIcon}
              />
              <Text style={[
                styles.serviceText,
                selectedService?.id === service.id && styles.selectedServiceText
              ]}>
                {service.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <TouchableOpacity 
        style={[
          styles.floatingButton,
          !selectedService && styles.floatingButtonDisabled
        ]}
        onPress={handleContinue}
      >
        <Text style={styles.floatingButtonText}>
          {selectedService 
            ? `Solicitar ${selectedService.title}`
            : 'Selecciona un servicio'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.myLocationButton}
        onPress={handleMyLocationPress}
      >
        <Icon name="my-location" type="material" color="#0288D1" size={24} />
      </TouchableOpacity>

      <TouchableOpacity 
        style={[
          styles.formButton,
          formDataReceived && styles.formButtonSaved
        ]}
        onPress={() => navigation.navigate('EmergencyForm')}
      >
        <Icon 
          name="description" 
          type="material" 
          color={formDataReceived ? "#fff" : "#A0522D"} 
          size={24} 
        />
      </TouchableOpacity>
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
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  searchBarTop: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  searchContainer: {
    marginHorizontal: 10,
    marginBottom: 8,
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingHorizontal: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchBarInputContainer: {
    backgroundColor: '#fff',
    borderRadius: 24,
    height: 45,
  },
  searchBarInput: {
    fontSize: 16,
    color: '#333',
  },
  servicesContainer: {
    backgroundColor: 'transparent',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  serviceIcon: {
    marginRight: 8,
  },
  serviceText: {
    color: '#333',
    fontSize: 14,
  },
  emergencyTypeContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  emergencyTypeText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#2c3e50',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  floatingButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchResults: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    borderRadius: 8,
    maxHeight: 200,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  resultText: {
    color: '#333',
    fontSize: 14,
    marginLeft: 12,
    flex: 1,
  },
  resultsList: {
    padding: 12,
  },
  selectedServiceText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  floatingButtonDisabled: {
    backgroundColor: '#ccc',
  },
  myLocationButton: {
    position: 'absolute',
    right: 16,
    bottom: 100,
    backgroundColor: '#fff',
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formButton: {
    position: 'absolute',
    right: 16,
    bottom: 160,
    backgroundColor: '#fff',
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formButtonSaved: {
    backgroundColor: '#9E9E9E',
  },
});

export default EmergencyMapScreen; 