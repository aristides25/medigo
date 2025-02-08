import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, Icon } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';

// Datos de ejemplo
const MOCK_LAB_RESULTS = [
  {
    id: '1',
    type: 'Hemograma Completo',
    date: '2024-02-10',
    laboratory: 'Laboratorio Central',
    status: 'Completado',
    results: [
      { name: 'Hemoglobina', value: '14.5 g/dL', reference: '12.0-16.0 g/dL' },
      { name: 'Hematocrito', value: '43%', reference: '36-46%' },
      { name: 'Plaquetas', value: '250,000/μL', reference: '150,000-450,000/μL' }
    ]
  },
  {
    id: '2',
    type: 'Perfil Lipídico',
    date: '2024-01-15',
    laboratory: 'Laboratorio Médico',
    status: 'Completado',
    results: [
      { name: 'Colesterol Total', value: '180 mg/dL', reference: '< 200 mg/dL' },
      { name: 'HDL', value: '45 mg/dL', reference: '> 40 mg/dL' },
      { name: 'LDL', value: '100 mg/dL', reference: '< 130 mg/dL' }
    ]
  }
];

const LabResultsScreen = () => {
  const renderResultItem = ({ item }) => (
    <Card containerStyle={styles.card}>
      <View style={styles.cardHeader}>
        <Icon
          name="test-tube"
          type="material-community"
          size={24}
          color="#4facfe"
        />
        <View style={styles.headerInfo}>
          <Text style={styles.testType}>{item.type}</Text>
          <Text style={styles.laboratory}>{item.laboratory}</Text>
        </View>
      </View>

      <View style={styles.dateContainer}>
        <Icon name="calendar" type="font-awesome" size={16} color="#718096" />
        <Text style={styles.date}>{item.date}</Text>
      </View>

      <View style={styles.resultsContainer}>
        {item.results.map((result, index) => (
          <View key={index} style={styles.resultRow}>
            <Text style={styles.resultName}>{result.name}</Text>
            <View style={styles.resultValues}>
              <Text style={styles.resultValue}>{result.value}</Text>
              <Text style={styles.reference}>Ref: {result.reference}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={MOCK_LAB_RESULTS}
        renderItem={renderResultItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#4facfe',
    shadowColor: '#4facfe',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerInfo: {
    marginLeft: 12,
    flex: 1,
  },
  testType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3748',
  },
  laboratory: {
    fontSize: 14,
    color: '#718096',
    marginTop: 2,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#f8fafc',
    padding: 8,
    borderRadius: 8,
  },
  date: {
    marginLeft: 8,
    fontSize: 14,
    color: '#4a5568',
  },
  resultsContainer: {
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 8,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  resultName: {
    fontSize: 14,
    color: '#2d3748',
    flex: 1,
  },
  resultValues: {
    alignItems: 'flex-end',
  },
  resultValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4a5568',
  },
  reference: {
    fontSize: 12,
    color: '#718096',
    marginTop: 2,
  },
  statusContainer: {
    marginTop: 12,
    backgroundColor: '#e6fffa',
    padding: 8,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: '#38b2ac',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default LabResultsScreen; 