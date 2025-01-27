import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, SearchBar, Button } from '@rneui/themed';
import NurseCard from '../../components/nursing/NurseCard';

// Datos de ejemplo de enfermeros
const mockNurses = [
  {
    id: '1',
    name: 'María González',
    rating: 4.8,
    experience: 5,
    specialties: ['Post-operatorio', 'Cuidados intensivos'],
    price: '25.00',
    available: true,
  },
  {
    id: '2',
    name: 'Juan Pérez',
    rating: 4.5,
    experience: 3,
    specialties: ['Geriatría', 'Administración de medicamentos'],
    price: '22.00',
    available: true,
  },
  {
    id: '3',
    name: 'Ana Martínez',
    rating: 4.9,
    experience: 7,
    specialties: ['Pediatría', 'Terapia intravenosa'],
    price: '28.00',
    available: false,
  },
];

const NurseListScreen = ({ route, navigation }) => {
  const [search, setSearch] = useState('');
  const { service } = route.params;

  const handleNurseSelect = (nurse) => {
    navigation.navigate('NurseDetail', { nurse, service });
  };

  return (
    <View style={styles.container}>
      <Text h4 style={styles.title}>
        Enfermeros Disponibles
      </Text>
      <Text style={styles.subtitle}>
        Servicio: {service.title}
      </Text>

      <SearchBar
        placeholder="Buscar enfermero..."
        onChangeText={setSearch}
        value={search}
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.searchInputContainer}
        lightTheme
        round
      />

      <View style={styles.filterContainer}>
        <Button
          title="Filtrar"
          type="outline"
          icon={{
            name: 'filter',
            type: 'material-community',
            size: 15,
            color: '#3498db'
          }}
          buttonStyle={styles.filterButton}
          titleStyle={styles.filterButtonText}
        />
        <Button
          title="Ordenar"
          type="outline"
          icon={{
            name: 'sort',
            type: 'material-community',
            size: 15,
            color: '#3498db'
          }}
          buttonStyle={styles.filterButton}
          titleStyle={styles.filterButtonText}
        />
      </View>

      <ScrollView style={styles.scrollView}>
        {mockNurses.map((nurse) => (
          <NurseCard
            key={nurse.id}
            nurse={nurse}
            onSelect={handleNurseSelect}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  title: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#2c3e50',
  },
  subtitle: {
    textAlign: 'center',
    color: '#7f8c8d',
    marginBottom: 10,
  },
  searchContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingHorizontal: 0,
  },
  searchInputContainer: {
    backgroundColor: '#fff',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  filterButton: {
    borderColor: '#3498db',
    paddingHorizontal: 20,
  },
  filterButtonText: {
    color: '#3498db',
  },
  scrollView: {
    flex: 1,
  },
});

export default NurseListScreen; 