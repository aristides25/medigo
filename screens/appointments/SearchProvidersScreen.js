import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Text, SearchBar, Button, ButtonGroup, Card, Rating, Icon } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

// Constantes de diseño
const SPACING = 8;
const COLORS = {
  primary: '#0077B6',
  primaryLight: '#E1F5FE',
  success: '#4CAF50',
  warning: '#FFC107',
  danger: '#F44336',
  grey: '#757575',
  white: '#FFFFFF',
  background: '#F5F7FA',
  cardBg: 'rgba(255, 255, 255, 0.95)',
};

// Datos de ejemplo - Esto se reemplazará con datos reales del backend
const MOCK_PROVIDERS = [
  {
    id: '1',
    name: 'Dr. Juan Pérez',
    type: 'Doctor',
    specialty: 'Medicina General',
    rating: 4.8,
    reviewCount: 124,
    address: 'Av. Francisco de Miranda, Caracas',
    distance: 2.5,
    availability: 'Hoy 3:00 PM',
    description: 'Médico general con más de 15 años de experiencia. Especializado en medicina preventiva y atención primaria.',
  },
  {
    id: '2',
    name: 'Clínica Santa María',
    type: 'Clínica',
    specialty: 'Cardiología',
    rating: 4.5,
    reviewCount: 89,
    address: 'Av. Libertador, Caracas',
    distance: 3.8,
    availability: 'Mañana 9:00 AM',
    description: 'Centro médico especializado en cardiología y medicina interna.',
  },
  {
    id: '3',
    name: 'Hospital Central',
    type: 'Hospital',
    specialty: 'Múltiples Especialidades',
    rating: 4.3,
    reviewCount: 156,
    address: 'Av. Las Mercedes, Caracas',
    distance: 5.2,
    availability: 'Hoy 2:00 PM',
    description: 'Hospital general con servicios completos y atención de emergencias 24/7.',
  },
];

const filterButtons = ['Todos', 'Médicos', 'Clínicas', 'Hospitales'];

const ProviderCard = ({ provider, onPress }) => {
  const getProviderIcon = (type) => {
    switch(type) {
      case 'Doctor':
        return 'doctor';
      case 'Clínica':
        return 'hospital-building';
      case 'Hospital':
        return 'hospital';
      default:
        return 'medical-bag';
    }
  };

  return (
    <TouchableOpacity 
      onPress={() => onPress(provider)}
      activeOpacity={0.7}
      style={styles.cardContainer}
    >
      <LinearGradient
        colors={[COLORS.cardBg, COLORS.white]}
        style={styles.cardGradient}
      >
        <View style={styles.cardHeader}>
          <View style={styles.providerIconContainer}>
            <Icon
              name={getProviderIcon(provider.type)}
              type="material-community"
              size={32}
              color={COLORS.primary}
            />
          </View>
          <View style={styles.providerInfo}>
            <Text style={styles.providerName}>{provider.name}</Text>
            <Text style={styles.specialty}>{provider.specialty}</Text>
            <View style={styles.ratingContainer}>
              <Rating
                readonly
                startingValue={provider.rating}
                imageSize={16}
                style={styles.rating}
              />
              <Text style={styles.reviewCount}>({provider.reviewCount} reseñas)</Text>
            </View>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Icon name="map-marker" type="material-community" size={16} color={COLORS.grey} />
            <Text style={styles.detailText}>{provider.address}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="clock-outline" type="material-community" size={16} color={COLORS.success} />
            <Text style={[styles.detailText, { color: COLORS.success }]}>
              Disponible: {provider.availability}
            </Text>
          </View>
        </View>

        <Button
          title="Ver Detalles"
          onPress={() => onPress(provider)}
          buttonStyle={styles.detailsButton}
          titleStyle={styles.buttonText}
          icon={{
            name: 'chevron-right',
            type: 'material-community',
            size: 20,
            color: COLORS.white,
          }}
          iconRight
        />
      </LinearGradient>
    </TouchableOpacity>
  );
};

const SearchProvidersScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [allProviders] = useState(MOCK_PROVIDERS);
  const [filteredProviders, setFilteredProviders] = useState(MOCK_PROVIDERS);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleProviderSelect = (provider) => {
    navigation.navigate('BookAppointment', { 
      provider,
      isRescheduling: false
    });
  };

  const updateSearch = (text) => {
    setLoading(true);
    setSearch(text);
    // Simular búsqueda
    setTimeout(() => setLoading(false), 500);
  };

  // Función para filtrar proveedores
  const filterProviders = () => {
    let filtered = [...allProviders];
    
    // Filtrar por texto de búsqueda
    if (search) {
      filtered = filtered.filter(provider => 
        provider.name.toLowerCase().includes(search.toLowerCase()) ||
        provider.specialty.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Filtrar por tipo seleccionado
    if (selectedIndex !== 0) { // Si no es "Todos"
      const selectedType = filterButtons[selectedIndex];
      filtered = filtered.filter(provider => {
        switch(selectedType) {
          case 'Médicos':
            return provider.type === 'Doctor';
          case 'Clínicas':
            return provider.type === 'Clínica';
          case 'Hospitales':
            return provider.type === 'Hospital';
          default:
            return true;
        }
      });
    }
    
    setFilteredProviders(filtered);
  };

  useEffect(() => {
    filterProviders();
  }, [search, selectedIndex]);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[COLORS.primaryLight, COLORS.background]}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Buscar Proveedores</Text>
          <Text style={styles.subtitle}>Encuentra el proveedor médico que necesitas</Text>
        </View>

        <SearchBar
          placeholder="Buscar por nombre o especialidad..."
          onChangeText={updateSearch}
          value={search}
          platform="default"
          containerStyle={styles.searchContainer}
          inputContainerStyle={styles.searchInputContainer}
          inputStyle={styles.searchInput}
          searchIcon={
            <Icon name="magnify" type="material-community" color={COLORS.primary} size={24} />
          }
          clearIcon={
            <Icon 
              name="close" 
              type="material-community" 
              color={COLORS.grey} 
              size={24} 
              onPress={() => setSearch('')}
            />
          }
        />

        <ButtonGroup
          buttons={filterButtons}
          selectedIndex={selectedIndex}
          onPress={setSelectedIndex}
          containerStyle={styles.buttonGroupContainer}
          selectedButtonStyle={styles.selectedButton}
          textStyle={styles.buttonGroupText}
          selectedTextStyle={styles.selectedButtonText}
          buttonContainerStyle={styles.buttonContainer}
        />
      </LinearGradient>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.resultsText}>
          {filteredProviders.length} proveedores encontrados
        </Text>

        {filteredProviders.map((provider) => (
          <ProviderCard
            key={provider.id}
            provider={provider}
            onPress={handleProviderSelect}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerGradient: {
    paddingTop: SPACING * 2,
    paddingBottom: SPACING * 3,
  },
  header: {
    padding: SPACING * 2,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.grey,
    marginBottom: SPACING * 2,
  },
  searchContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingHorizontal: SPACING * 2,
    marginBottom: SPACING * 2,
  },
  searchInputContainer: {
    backgroundColor: COLORS.white,
    borderRadius: SPACING * 3,
    height: 48,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  searchInput: {
    fontSize: 16,
    color: '#333',
  },
  buttonGroupContainer: {
    marginHorizontal: SPACING * 2,
    height: 44,
    borderRadius: 22,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
    marginBottom: 0,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  buttonContainer: {
    borderRadius: 22,
  },
  selectedButton: {
    backgroundColor: COLORS.primary,
  },
  buttonGroupText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  selectedButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING * 2,
  },
  resultsText: {
    fontSize: 14,
    color: COLORS.grey,
    marginBottom: SPACING * 2,
  },
  cardContainer: {
    marginBottom: SPACING * 2,
    borderRadius: SPACING * 2,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  cardGradient: {
    padding: SPACING * 2,
    borderRadius: SPACING * 2,
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: SPACING * 2,
  },
  providerIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: `${COLORS.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING * 2,
  },
  providerInfo: {
    flex: 1,
  },
  providerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: SPACING / 2,
  },
  specialty: {
    fontSize: 14,
    color: COLORS.grey,
    marginBottom: SPACING,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginRight: SPACING,
  },
  reviewCount: {
    fontSize: 12,
    color: COLORS.grey,
  },
  detailsContainer: {
    backgroundColor: `${COLORS.primary}05`,
    borderRadius: SPACING,
    padding: SPACING * 2,
    marginBottom: SPACING * 2,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING,
  },
  detailText: {
    marginLeft: SPACING,
    fontSize: 14,
    color: COLORS.grey,
    flex: 1,
  },
  detailsButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SPACING * 3,
    paddingVertical: SPACING * 1.5,
    paddingHorizontal: SPACING * 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: SPACING,
  },
});

export default SearchProvidersScreen; 