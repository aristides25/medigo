import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert, Platform } from 'react-native';
import { Text, Card, Button, Icon, Input, Divider } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as DocumentPicker from 'expo-document-picker';
import { useMedicalRecord } from '../../context/MedicalRecordContext';

const DocumentTypeSelector = ({ selectedType, onSelect }) => {
  const types = [
    { value: 'LAB_RESULT', label: 'Resultado de Laboratorio', icon: 'test-tube' },
    { value: 'PRESCRIPTION', label: 'Receta Médica', icon: 'prescription' },
    { value: 'MEDICAL_REPORT', label: 'Informe Médico', icon: 'file-document-edit' },
    { value: 'OTHER', label: 'Otro Documento', icon: 'file' },
  ];

  return (
    <View style={styles.typeContainer}>
      {types.map((type) => (
        <Button
          key={type.value}
          title={type.label}
          icon={{
            name: type.icon,
            type: 'material-community',
            color: selectedType === type.value ? 'white' : '#0077B6',
            size: 20,
          }}
          buttonStyle={[
            styles.typeButton,
            selectedType === type.value && styles.selectedTypeButton,
          ]}
          titleStyle={[
            styles.typeButtonText,
            selectedType === type.value && styles.selectedTypeButtonText,
          ]}
          onPress={() => onSelect(type.value)}
          type={selectedType === type.value ? 'solid' : 'outline'}
        />
      ))}
    </View>
  );
};

const UploadDocumentScreen = ({ navigation }) => {
  const { addDocument } = useMedicalRecord();
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'],
        copyToCacheDirectory: true,
      });

      if (result.type === 'success') {
        setSelectedFile(result);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo seleccionar el archivo');
    }
  };

  const handleUpload = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Por favor ingresa un título para el documento');
      return;
    }

    if (!type) {
      Alert.alert('Error', 'Por favor selecciona el tipo de documento');
      return;
    }

    if (!selectedFile) {
      Alert.alert('Error', 'Por favor selecciona un archivo');
      return;
    }

    try {
      setLoading(true);

      // Crear el nuevo documento
      const newDocument = {
        title: title.trim(),
        type,
        date: new Date(),
        file: {
          uri: selectedFile.uri,
          type: selectedFile.mimeType,
          name: selectedFile.name,
        },
        sharedWith: [],
      };

      await addDocument(newDocument);
      Alert.alert(
        'Éxito',
        'Documento subido correctamente',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'No se pudo subir el documento');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Formulario */}
        <Card containerStyle={styles.formCard}>
          <Input
            placeholder="Título del documento"
            value={title}
            onChangeText={setTitle}
            leftIcon={
              <Icon
                name="file-document-edit"
                type="material-community"
                size={24}
                color="#666"
              />
            }
          />

          <Text style={styles.sectionTitle}>Tipo de Documento</Text>
          <DocumentTypeSelector
            selectedType={type}
            onSelect={setType}
          />
        </Card>

        {/* Selector de Archivo */}
        <Card containerStyle={styles.fileCard}>
          <Text style={styles.sectionTitle}>Archivo</Text>
          <Divider style={styles.divider} />

          {selectedFile ? (
            <View style={styles.selectedFileContainer}>
              <Icon
                name={selectedFile.mimeType?.includes('pdf') ? 'file-pdf-box' : 'file-image'}
                type="material-community"
                size={40}
                color="#0077B6"
              />
              <View style={styles.fileInfo}>
                <Text style={styles.fileName}>{selectedFile.name}</Text>
                <Text style={styles.fileSize}>
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </Text>
              </View>
              <Button
                icon={{
                  name: 'close',
                  type: 'material-community',
                  color: '#666',
                }}
                type="clear"
                onPress={() => setSelectedFile(null)}
              />
            </View>
          ) : (
            <Button
              title="Seleccionar Archivo"
              icon={{
                name: 'upload',
                type: 'material-community',
                color: 'white',
                size: 20,
              }}
              onPress={handleFilePick}
              buttonStyle={styles.uploadButton}
            />
          )}

          <Text style={styles.helperText}>
            Formatos permitidos: PDF, imágenes
          </Text>
        </Card>

        {/* Botón de Subir */}
        <Button
          title="Subir Documento"
          loading={loading}
          disabled={!title || !type || !selectedFile || loading}
          icon={{
            name: 'check',
            type: 'material-community',
            color: 'white',
            size: 20,
          }}
          buttonStyle={styles.submitButton}
          containerStyle={styles.submitButtonContainer}
          onPress={handleUpload}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  formCard: {
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
    marginVertical: 10,
  },
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  typeButton: {
    width: '48%',
    marginBottom: 10,
    borderColor: '#0077B6',
    borderRadius: 10,
    paddingVertical: 10,
  },
  selectedTypeButton: {
    backgroundColor: '#0077B6',
  },
  typeButtonText: {
    fontSize: 14,
    color: '#0077B6',
  },
  selectedTypeButtonText: {
    color: 'white',
  },
  fileCard: {
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
  },
  divider: {
    marginBottom: 15,
  },
  selectedFileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
  },
  fileInfo: {
    flex: 1,
    marginLeft: 10,
  },
  fileName: {
    fontSize: 16,
    color: '#444',
  },
  fileSize: {
    fontSize: 14,
    color: '#666',
  },
  uploadButton: {
    backgroundColor: '#0077B6',
    borderRadius: 10,
    paddingVertical: 15,
  },
  helperText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: '#0077B6',
    borderRadius: 25,
    paddingVertical: 15,
  },
  submitButtonContainer: {
    marginHorizontal: 15,
    marginVertical: 20,
  },
});

export default UploadDocumentScreen; 