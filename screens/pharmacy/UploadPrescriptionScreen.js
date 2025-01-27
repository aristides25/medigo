import React, { useState } from 'react';
import { View, StyleSheet, Alert, Image } from 'react-native';
import { Text, Button, Icon, Card } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { PRESCRIPTION_STATUS, PRESCRIPTION_TYPE } from '../../constants/pharmacy/prescriptions';

const UploadPrescriptionScreen = ({ navigation, route }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const fromCart = route.params?.fromCart || false;

  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permiso denegado',
        'Necesitamos acceso a la cámara para tomar la foto de la receta.',
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  };

  const takePhoto = async () => {
    try {
      const hasPermission = await requestCameraPermission();
      if (!hasPermission) return;

      setLoading(true);
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo tomar la foto. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    try {
      setLoading(true);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo seleccionar la imagen. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!image) {
      Alert.alert('Error', 'Por favor tome una foto o seleccione una imagen de la receta.');
      return;
    }

    setLoading(true);

    try {
      // Aquí iría la lógica de subida de la imagen
      // Por ahora solo simulamos un delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulamos la creación de una nueva receta
      const newPrescription = {
        id: Date.now().toString(),
        type: PRESCRIPTION_TYPE.EXTERNAL,
        patientId: 'user123',
        issueDate: new Date().toISOString().split('T')[0],
        expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: PRESCRIPTION_STATUS.PENDING,
        image: image,
        uploadDate: new Date().toISOString().split('T')[0],
        notes: 'Pendiente de verificación',
      };

      // Aquí se guardaría la receta en el estado global o backend

      Alert.alert(
        'Éxito',
        'Receta subida correctamente. Será revisada por nuestro equipo.',
        [
          {
            text: 'OK',
            onPress: () => {
              if (fromCart) {
                navigation.navigate('Cart');
              } else {
                navigation.navigate('MyPrescriptions');
              }
            },
          },
        ]
      );
    } catch (error) {
      console.error('Error al subir receta:', error);
      Alert.alert('Error', 'No se pudo subir la receta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Card containerStyle={styles.instructionsCard}>
        <Text style={styles.instructionsTitle}>Instrucciones:</Text>
        <Text style={styles.instructionsText}>
          1. La receta debe ser clara y legible{'\n'}
          2. Debe mostrar fecha de emisión{'\n'}
          3. Debe incluir sello y firma del médico{'\n'}
          4. Solo se aceptan recetas con máximo 6 meses de antigüedad
        </Text>
      </Card>

      <View style={styles.uploadSection}>
        {image ? (
          <>
            <Image source={{ uri: image }} style={styles.preview} />
            <Button
              title="Cambiar imagen"
              onPress={pickImage}
              buttonStyle={[styles.button, styles.changeButton]}
              icon={
                <Icon
                  name="image-edit"
                  type="material-community"
                  color="white"
                  size={20}
                  style={{ marginRight: 10 }}
                />
              }
            />
          </>
        ) : (
          <View style={styles.buttonContainer}>
            <Button
              title="Tomar Foto"
              onPress={takePhoto}
              loading={loading}
              disabled={loading}
              buttonStyle={styles.button}
              icon={
                <Icon
                  name="camera"
                  type="material-community"
                  color="white"
                  size={20}
                  style={{ marginRight: 10 }}
                />
              }
            />
            <Button
              title="Seleccionar de Galería"
              onPress={pickImage}
              loading={loading}
              disabled={loading}
              buttonStyle={[styles.button, styles.galleryButton]}
              icon={
                <Icon
                  name="image"
                  type="material-community"
                  color="white"
                  size={20}
                  style={{ marginRight: 10 }}
                />
              }
            />
          </View>
        )}
      </View>

      <Button
        title="Subir Receta"
        onPress={handleUpload}
        loading={loading}
        disabled={!image || loading}
        buttonStyle={[styles.button, styles.uploadButton]}
        icon={
          <Icon
            name="cloud-upload"
            type="material-community"
            color="white"
            size={20}
            style={{ marginRight: 10 }}
          />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  instructionsCard: {
    borderRadius: 10,
    marginBottom: 20,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  instructionsText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  uploadSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  preview: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    borderRadius: 25,
    paddingVertical: 12,
    marginBottom: 15,
    backgroundColor: '#0077B6',
  },
  galleryButton: {
    backgroundColor: '#666',
  },
  changeButton: {
    backgroundColor: '#FF9800',
  },
  uploadButton: {
    backgroundColor: '#4CAF50',
  },
});

export default UploadPrescriptionScreen; 