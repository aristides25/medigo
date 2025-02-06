import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text, Card, Button, Icon, SearchBar, Chip } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMedicalRecord } from '../../context/MedicalRecordContext';
import { LinearGradient } from 'expo-linear-gradient';

const DocumentCard = ({ document, onPress }) => {
  const date = new Date(document.date);
  const getDocumentIcon = (type) => {
    switch (type) {
      case 'LAB_RESULT':
        return { name: 'test-tube', color: '#6a11cb' };
      case 'PRESCRIPTION':
        return { name: 'file-document-edit', color: '#1d976c' };
      case 'MEDICAL_REPORT':
        return { name: 'file-certificate', color: '#f77062' };
      default:
        return { name: 'file-document', color: '#4facfe' };
    }
  };

  const icon = getDocumentIcon(document.type);

  return (
    <TouchableOpacity onPress={onPress}>
      <Card containerStyle={[styles.documentCard, { borderLeftColor: icon.color }]}>
        <View style={styles.documentHeader}>
          <View style={[styles.iconContainer, { backgroundColor: `${icon.color}15` }]}>
            <Icon
              name={icon.name}
              type="material-community"
              size={24}
              color={icon.color}
            />
          </View>
          <View style={styles.documentInfo}>
            <Text style={styles.documentTitle}>{document.title}</Text>
            <Text style={styles.documentDate}>
              {date.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Text>
          </View>
          <Icon
            name="chevron-right"
            type="material-community"
            size={24}
            color="#718096"
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
  const [filteredDocuments, setFilteredDocuments] = useState([]);

  const documentTypes = [
    { label: 'Todos', value: null, icon: 'file-multiple' },
    { label: 'Resultados', value: 'LAB_RESULT', icon: 'test-tube' },
    { label: 'Recetas', value: 'PRESCRIPTION', icon: 'file-document-edit' },
    { label: 'Informes', value: 'MEDICAL_REPORT', icon: 'file-certificate' },
    { label: 'Otros', value: 'OTHER', icon: 'file' },
  ];

  const filterDocuments = React.useCallback((searchText, type, docs) => {
    let filtered = [...docs];

    if (searchText) {
      filtered = filtered.filter(doc =>
        doc.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (type) {
      filtered = filtered.filter(doc => doc.type === type);
    }

    setFilteredDocuments(filtered);
  }, []);

  React.useEffect(() => {
    filterDocuments(search, selectedType, documents);
  }, [search, selectedType, documents, filterDocuments]);

  const handleSearch = (text) => {
    setSearch(text);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
  };

  const handleDocumentPress = (document) => {
    navigation.navigate('DocumentDetail', { document });
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          icon={{
            name: 'plus',
            type: 'material-community',
            color: '#4facfe',
            size: 24,
          }}
          type="clear"
          onPress={() => navigation.navigate('UploadDocument')}
        />
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#E8F4F8', '#ffffff']}
        style={styles.headerGradient}
      >
        <View style={styles.searchContainer}>
          <SearchBar
            placeholder="Buscar documentos..."
            onChangeText={handleSearch}
            value={search}
            platform="default"
            containerStyle={styles.searchBarContainer}
            inputContainerStyle={styles.searchBarInputContainer}
            inputStyle={styles.searchBarInput}
            searchIcon={
              <Icon
                name="magnify"
                type="material-community"
                size={24}
                color="#4facfe"
              />
            }
            clearIcon={
              <Icon
                name="close"
                type="material-community"
                size={24}
                color="#718096"
                onPress={() => setSearch('')}
              />
            }
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
        >
          {documentTypes.map((type) => (
            <TouchableOpacity
              key={type.value || 'all'}
              style={[
                styles.filterButton,
                selectedType === type.value && styles.selectedFilterButton
              ]}
              onPress={() => handleTypeSelect(type.value)}
            >
              <Icon
                name={type.icon}
                type="material-community"
                size={20}
                color={selectedType === type.value ? '#fff' : '#4facfe'}
              />
              <Text style={[
                styles.filterText,
                selectedType === type.value && styles.selectedFilterText
              ]}>
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </LinearGradient>

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
              size={60}
              color="#718096"
            />
            <Text style={styles.emptyText}>
              {search
                ? 'No se encontraron documentos'
                : selectedType
                  ? 'No hay documentos de este tipo'
                  : 'No hay documentos guardados'}
            </Text>
            <Button
              title="Subir Documento"
              onPress={() => navigation.navigate('UploadDocument')}
              buttonStyle={styles.uploadButton}
              titleStyle={styles.uploadButtonText}
              icon={{
                name: 'upload',
                type: 'material-community',
                color: 'white',
                size: 20,
              }}
              iconPosition="left"
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
    backgroundColor: '#f8fafc',
  },
  headerGradient: {
    paddingTop: 15,
    paddingBottom: 10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#4facfe',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  searchContainer: {
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingHorizontal: 0,
    marginTop: 0,
    marginBottom: 0,
  },
  searchBarInputContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    height: 45,
  },
  searchBarInput: {
    fontSize: 16,
    color: '#2d3748',
  },
  filterContainer: {
    paddingHorizontal: 15,
    marginBottom: 5,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedFilterButton: {
    backgroundColor: '#4facfe',
  },
  filterText: {
    fontSize: 14,
    color: '#4facfe',
    marginLeft: 6,
    fontWeight: '600',
  },
  selectedFilterText: {
    color: '#fff',
  },
  documentList: {
    padding: 15,
  },
  documentCard: {
    borderRadius: 16,
    marginBottom: 12,
    padding: 15,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  documentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  documentInfo: {
    flex: 1,
    marginRight: 8,
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 4,
  },
  documentDate: {
    fontSize: 14,
    color: '#718096',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#718096',
    marginVertical: 12,
    textAlign: 'center',
  },
  uploadButton: {
    backgroundColor: '#4facfe',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: 8,
  },
  uploadButtonText: {
    fontSize: 16,
    marginLeft: 8,
  },
});

export default MedicalDocumentsScreen; 
