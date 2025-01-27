import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Text, Button, Icon, SearchBar } from '@rneui/themed';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

const EmergencyMapScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [loading, setLoading] = useState(true);

  // Función para obtener la dirección de una ubicación
  const getAddressFromCoords = async (coords) => {
    try {
      const address = await Location.reverseGeocodeAsync(coords);
      if (address[0]) {
        return `${address[0].street || ''} ${address[0].name || ''}, ${address[0].city || ''}`;
      }
      return '';
    } catch (error) {
      console.error('Error obteniendo dirección:', error);
      return '';
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

        let initialLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced
        });
        
        const coords = {
          latitude: initialLocation.coords.latitude,
          longitude: initialLocation.coords.longitude,
        };
        
        setLocation(coords);
        setSelectedLocation(coords);

        const address = await getAddressFromCoords(coords);
        setSelectedAddress(address);
        setSearchQuery(address);
      } catch (error) {
        console.error('Error configurando ubicación:', error);
        alert('Error al obtener la ubicación. Por favor, verifica que el GPS esté activado.');
      } finally {
        setLoading(false);
      }
    };

    getLocation();
  }, []);

  const handleSearch = async (text) => {
    setSearchQuery(text);
    if (text.length > 3) {
      try {
        const results = await Location.geocodeAsync(text);
        if (results.length > 0) {
          setSearchResults(results);
          setShowResults(true);
        }
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
    const newLocation = event.nativeEvent.coordinate;
    const address = await getAddressFromCoords(newLocation);
    setSelectedAddress(address);
    setSearchQuery(address);
    setSelectedLocation(newLocation);
    setShowResults(false);
  };

  const handleConfirmLocation = () => {
    if (!selectedLocation) {
      alert('Por favor selecciona una ubicación');
      return;
    }
    
    navigation.navigate('EmergencyTracking', {
      selectedLocation,
      selectedAddress,
      userLocation: location
    });
  };

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
          style={styles.map}
          initialRegion={{
            ...location,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          onPress={handleMapPress}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          {selectedLocation && (
            <Marker
              coordinate={selectedLocation}
              title="Ubicación seleccionada"
              description={selectedAddress}
            >
              <Icon name="place" type="material" color="#e74c3c" size={40} />
            </Marker>
          )}
        </MapView>
      )}

      <View style={styles.bottomPanel}>
        <SearchBar
          placeholder="Buscar ubicación"
          onChangeText={handleSearch}
          value={searchQuery}
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={styles.searchBarInputContainer}
          inputStyle={styles.searchBarInput}
          searchIcon={<Icon name="place" type="material" color="#666" size={24} />}
          platform="default"
          lightTheme
        />
        
        {showResults && searchResults.length > 0 && (
          <View style={styles.searchResults}>
            <FlatList
              data={searchResults}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.resultItem}
                  onPress={() => handleSelectSearchResult(item)}
                >
                  <Icon name="place" type="material" color="#e74c3c" size={20} />
                  <Text style={styles.resultText}>
                    {`${item.latitude.toFixed(6)}, ${item.longitude.toFixed(6)}`}
                  </Text>
                </TouchableOpacity>
              )}
              style={styles.resultsList}
            />
          </View>
        )}

        <TouchableOpacity 
          style={styles.confirmButton}
          onPress={handleConfirmLocation}
        >
          <Text style={styles.confirmButtonText}>Solicitar Ambulancia</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  map: {
    flex: 1,
  },
  bottomPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 15,
    paddingHorizontal: 20,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    padding: 0,
    borderRadius: 8,
    marginBottom: 10,
  },
  searchBarInputContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    height: 45,
  },
  searchBarInput: {
    color: '#000',
  },
  searchResults: {
    backgroundColor: '#fff',
    borderRadius: 8,
    maxHeight: 200,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  resultsList: {
    padding: 10,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  resultText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#2c3e50',
  },
  confirmButton: {
    backgroundColor: '#e74c3c',
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EmergencyMapScreen; 