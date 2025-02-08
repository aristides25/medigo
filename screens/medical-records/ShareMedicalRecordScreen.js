import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Platform, Linking, ScrollView } from 'react-native';
import { Text, Button, Icon, Input, Avatar } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants';
import * as DocumentPicker from 'expo-document-picker';

// Datos de ejemplo mientras se instalan las dependencias
const MOCK_CONTACTS = [
  {
    id: '1',
    name: 'Dr. Juan Pérez',
    phoneNumbers: [{ number: '+507 6123-4567' }],
  },
  {
    id: '2',
    name: 'Dra. María García',
    phoneNumbers: [{ number: '+507 6234-5678' }],
  },
  {
    id: '3',
    name: 'Hospital Nacional',
    phoneNumbers: [{ number: '+507 3456-7890' }],
  },
];

const ShareMedicalRecordScreen = ({ navigation }) => {
  const [contacts, setContacts] = useState(MOCK_CONTACTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSelectFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*', // Permite cualquier tipo de archivo
        copyToCacheDirectory: true
      });

      if (result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        setSelectedFile(file);
      }
    } catch (error) {
      console.error('Error al seleccionar el archivo:', error);
    }
  };

  const handleShareViaWhatsApp = async (contact) => {
    const phoneNumber = contact.phoneNumbers?.[0]?.number?.replace(/[^\d]/g, '');
    if (!phoneNumber) {
      alert('Este contacto no tiene número de teléfono');
      return;
    }

    const message = 'Te comparto mi expediente médico desde MediGo';
    const whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    try {
      const canOpen = await Linking.canOpenURL(whatsappUrl);
      if (canOpen) {
        await Linking.openURL(whatsappUrl);
      } else {
        alert('WhatsApp no está instalado en este dispositivo');
      }
    } catch (error) {
      console.error('Error al abrir WhatsApp:', error);
      alert('No se pudo abrir WhatsApp');
    }
  };

  const filteredContacts = contacts.filter(contact => 
    contact.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContactItem = ({ item }) => (
    <View style={styles.contactItem}>
      <View style={styles.contactInfo}>
        <Avatar
          rounded
          title={item.name?.[0] || '?'}
          containerStyle={styles.avatar}
        />
        <View style={styles.contactDetails}>
          <Text style={styles.contactName}>{item.name}</Text>
          <Text style={styles.contactPhone}>
            {item.phoneNumbers?.[0]?.number || 'Sin número'}
          </Text>
        </View>
      </View>
      <TouchableOpacity 
        style={styles.whatsappButton}
        onPress={() => handleShareViaWhatsApp(item)}
      >
        <Icon
          name="whatsapp"
          type="font-awesome"
          color="#25D366"
          size={24}
        />
      </TouchableOpacity>
    </View>
  );

  const ListHeaderComponent = () => (
    <>
      <View style={styles.fileSection}>
        <Text style={styles.sectionTitle}>Seleccionar Archivo</Text>
        <TouchableOpacity 
          style={styles.uploadButton}
          onPress={handleSelectFile}
        >
          <Icon
            name="file-upload"
            type="material"
            size={32}
            color="#4facfe"
          />
          <Text style={styles.uploadText}>
            {selectedFile ? 'Cambiar archivo' : 'Seleccionar archivo'}
          </Text>
        </TouchableOpacity>

        {selectedFile && (
          <View style={styles.selectedFileContainer}>
            <Icon
              name="file-document"
              type="material-community"
              size={24}
              color="#4facfe"
            />
            <View style={styles.fileInfo}>
              <Text style={styles.fileName}>{selectedFile.name}</Text>
              <Text style={styles.fileSize}>
                {(selectedFile.size / 1024).toFixed(2)} KB
              </Text>
            </View>
          </View>
        )}
      </View>

      <Input
        placeholder="Buscar contactos..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        leftIcon={
          <Icon
            name="search"
            type="material"
            color={COLORS.gray}
          />
        }
        containerStyle={styles.searchContainer}
      />
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredContacts}
        renderItem={renderContactItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contactsList}
        ListHeaderComponent={ListHeaderComponent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    padding: 20,
  },
  fileSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2d3748',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f9ff',
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#4facfe',
  },
  uploadText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#4facfe',
    fontWeight: '600',
  },
  selectedFileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f9ff',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  fileInfo: {
    marginLeft: 12,
    flex: 1,
  },
  fileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3748',
  },
  fileSize: {
    fontSize: 14,
    color: '#718096',
    marginTop: 4,
  },
  searchContainer: {
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
  },
  contactsList: {
    padding: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#4facfe',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: '#4facfe',
    marginRight: 12,
  },
  contactDetails: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 4,
  },
  contactPhone: {
    fontSize: 14,
    color: '#718096',
  },
  whatsappButton: {
    padding: 8,
  },
});

export default ShareMedicalRecordScreen; 