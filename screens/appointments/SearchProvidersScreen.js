import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SearchBar, Button, Text, ButtonGroup, LinearProgress, Card, Rating } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';

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
];

const filterButtons = ['Todos', 'Médicos', 'Clínicas', 'Hospitales'];

const ProviderCard = ({ provider, onPress }) => {
  return (
    <Card containerStyle={styles.card}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.providerName}>{provider.name}</Text>
          <Text style={styles.specialty}>{provider.specialty}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <Rating
            readonly
            startingValue={provider.rating}
            imageSize={16}
          />
          <Text style={styles.reviewCount}>({provider.reviewCount} reseñas)</Text>
        </View>
      </View>

      <Text style={styles.address}>{provider.address}</Text>
      <Text style={styles.availability}>Próximo turno: {provider.availability}</Text>

      <Button
        title="Seleccionar"
        onPress={() => onPress(provider)}
        buttonStyle={styles.selectButton}
      />
    </Card>
  );
};

const SearchProvidersScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [providers] = useState(MOCK_PROVIDERS);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleProviderSelect = (provider) => {
    navigation.navigate('ProviderDetail', { provider });
  };

  const updateSearch = (text) => {
    setLoading(true);
    setSearch(text);
    // Simular búsqueda
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <SearchBar
          placeholder="Buscar médicos, clínicas..."
          onChangeText={updateSearch}
          value={search}
          platform="android"
          containerStyle={styles.searchContainer}
          inputContainerStyle={styles.searchInputContainer}
          lightTheme
          round
          showLoading={loading}
          cancelButtonTitle="Cancelar"
          cancelButtonProps={{ color: '#0077B6' }}
        />
      </View>

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

      {loading && <LinearProgress color="#0077B6" style={styles.progress} />}

      <ScrollView style={styles.content}>
        <Text style={styles.resultsText}>
          {providers.length} proveedores encontrados
        </Text>
        {providers.map((provider) => (
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
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchInputContainer: {
    backgroundColor: '#f5f5f5',
  },
  buttonGroupContainer: {
    marginHorizontal: 15,
    marginVertical: 10,
    height: 40,
    borderRadius: 20,
    borderColor: '#0077B6',
  },
  buttonContainer: {
    borderRadius: 20,
  },
  selectedButton: {
    backgroundColor: '#0077B6',
  },
  buttonGroupText: {
    color: '#0077B6',
    fontSize: 14,
  },
  selectedButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  progress: {
    marginHorizontal: 15,
  },
  content: {
    flex: 1,
    padding: 15,
  },
  resultsText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  card: {
    borderRadius: 10,
    marginBottom: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  providerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
  },
  specialty: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  ratingContainer: {
    alignItems: 'flex-end',
  },
  reviewCount: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  availability: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 10,
  },
  selectButton: {
    backgroundColor: '#0077B6',
    borderRadius: 8,
    marginTop: 5,
  },
});

export default SearchProvidersScreen; 