import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert, Platform } from 'react-native';
import { Text, Card, Button, Icon, Input, Divider } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { useMedicalRecord } from '../../context/MedicalRecordContext';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

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
        <View key={type.value} style={styles.typeButtonWrapper}>
          <Button
            title={type.label}
            icon={{
              name: type.icon,
              type: 'material-community',
              color: selectedType === type.value ? 'white' : '#0077B6',
              size: 28,
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
        </View>
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
  const [uploadProgress, setUploadProgress] = useState(0);

  const validateFile = async (file) => {
    // Verificar tamaño
    if (file.size > MAX_FILE_SIZE) {
      throw new Error('El archivo es demasiado grande. Máximo 10MB.');
    }

    // Verificar tipo
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.mimeType)) {
      throw new Error('Tipo de archivo no permitido. Solo PDF e imágenes.');
    }

    return true;
  };

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'],
        copyToCacheDirectory: true,
      });

      if (result.type === 'success') {
        try {
          await validateFile(result);
          setSelectedFile(result);
        } catch (error) {
          Alert.alert('Error', error.message);
        }
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo seleccionar el archivo');
    }
  };

  const uploadFile = async (fileUri) => {
    try {
      // Simular progreso de carga
      for (let i = 0; i <= 100; i += 10) {
        setUploadProgress(i);
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Por ahora solo retornamos el URI original
      // La lógica real de subida se implementará cuando tengamos el backend
      return fileUri;
    } catch (error) {
      throw new Error('Error al subir el archivo');
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
      const fileUri = await uploadFile(selectedFile.uri);

      const newDocument = {
        id: Date.now().toString(),
        title: title.trim(),
        type,
        date: new Date(),
        file: {
          uri: fileUri,
          type: selectedFile.mimeType,
          name: selectedFile.name,
          size: selectedFile.size,
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
      setUploadProgress(0);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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
            Formatos permitidos: PDF, imágenes (máx. 10MB)
          </Text>
        </Card>

        {uploadProgress > 0 && uploadProgress < 100 && (
          <Card containerStyle={styles.progressCard}>
            <Text style={styles.progressText}>Subiendo archivo... {uploadProgress}%</Text>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${uploadProgress}%` }]} />
            </View>
          </Card>
        )}

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
}

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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    marginVertical: 15,
  },
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  typeButtonWrapper: {
    width: '48%',
    marginBottom: 15,
  },
  typeButton: {
    borderColor: '#0077B6',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 10,
    height: 80,
    justifyContent: 'center',
  },
  selectedTypeButton: {
    backgroundColor: '#0077B6',
  },
  typeButtonText: {
    fontSize: 13,
    color: '#0077B6',
    textAlign: 'center',
    marginTop: 8,
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
  progressCard: {
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#0077B6',
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