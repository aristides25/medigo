import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text, Card, Button, Icon, SearchBar, Chip } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMedicalRecord } from '../../context/MedicalRecordContext';

const DocumentCard = ({ document, onPress }) => {
  const date = new Date(document.date);

  return (
    <TouchableOpacity onPress={onPress}>
      <Card containerStyle={styles.documentCard}>
        <View style={styles.documentHeader}>
          <Icon
            name={document.type === 'LAB_RESULT' ? 'test-tube' : 'file-document'}
            type="material-community"
            size={24}
            color="#0077B6"
          />
          <View style={styles.documentInfo}>
            <Text style={styles.documentTitle}>{document.title}</Text>
            <Text style={styles.documentDate}>
              {date.toLocaleDateString('es-ES')}
            </Text>
          </View>
          <Icon
            name="chevron-right"
            type="material-community"
            size={24}
            color="#666"
          />
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const MedicalDocumentsScreen = ({ navigation }) => {
  const { documents } = useMedicalRecord();
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState(null);
  const [filteredDocuments, setFilteredDocuments] = useState(documents);

  const documentTypes = [
    { label: 'Todos', value: null },
    { label: 'Resultados', value: 'LAB_RESULT' },
    { label: 'Otros', value: 'OTHER' },
  ];

  React.useEffect(() => {
    filterDocuments(search, selectedType);
  }, [search, selectedType, documents]);

  const filterDocuments = (searchText, type) => {
    let filtered = [...documents];

    if (searchText) {
      filtered = filtered.filter(doc =>
        doc.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (type) {
      filtered = filtered.filter(doc => doc.type === type);
    }

    setFilteredDocuments(filtered);
  };

  const handleSearch = (text) => {
    setSearch(text);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
  };

  const handleDocumentPress = (document) => {
    navigation.navigate('DocumentDetail', { document });
  };

  // Agregar botón de subir documento en el header
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          icon={{
            name: 'plus',
            type: 'material-community',
            color: 'white',
          }}
          onPress={() => navigation.navigate('UploadDocument')}
          type="clear"
        />
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        placeholder="Buscar documentos..."
        onChangeText={handleSearch}
        value={search}
        platform="android"
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.searchInputContainer}
        lightTheme
        round
      />

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {documentTypes.map((type) => (
            <Chip
              key={type.value || 'all'}
              title={type.label}
              type={selectedType === type.value ? 'solid' : 'outline'}
              containerStyle={styles.chipContainer}
              onPress={() => handleTypeSelect(type.value)}
              buttonStyle={
                selectedType === type.value
                  ? styles.selectedChip
                  : styles.chip
              }
            />
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredDocuments}
        renderItem={({ item }) => (
          <DocumentCard
            document={item}
            onPress={() => handleDocumentPress(item)}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.documentList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon
              name="file-document-outline"
              type="material-community"
              size={48}
              color="#666"
            />
            <Text style={styles.emptyText}>No hay documentos</Text>
            <Button
              title="Subir Documento"
              onPress={() => navigation.navigate('UploadDocument')}
              buttonStyle={styles.uploadButton}
              icon={{
                name: 'upload',
                type: 'material-community',
                color: 'white',
                size: 20,
              }}
            />
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    padding: 15,
  },
  searchInputContainer: {
    backgroundColor: '#f5f5f5',
  },
  filterContainer: {
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  chipContainer: {
    marginRight: 8,
  },
  chip: {
    backgroundColor: 'white',
    borderColor: '#0077B6',
  },
  selectedChip: {
    backgroundColor: '#0077B6',
  },
  documentList: {
    padding: 10,
  },
  documentCard: {
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
  },
  documentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  documentInfo: {
    flex: 1,
    marginLeft: 10,
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
  documentDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginVertical: 10,
  },
  uploadButton: {
    borderRadius: 25,
    paddingHorizontal: 20,
    backgroundColor: '#0077B6',
    marginTop: 10,
  },
});

export default MedicalDocumentsScreen; 
