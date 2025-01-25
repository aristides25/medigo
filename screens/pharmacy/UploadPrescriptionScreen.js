import React, { useState } from 'react';
import { View, StyleSheet, Alert, Image } from 'react-native';
import { Text, Button, Icon, Card } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { PRESCRIPTION_STATUS, PRESCRIPTION_TYPE } from '../../constants/pharmacy/prescriptions';

const UploadPrescriptionScreen = ({ navigation, route }) => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fromCart = route.params?.fromCart || false;

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permiso requerido',
          'Necesitamos acceso a tu galería para subir la receta.'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error al seleccionar imagen:', error);
      Alert.alert('Error', 'No se pudo seleccionar la imagen');
    }
  };

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permiso requerido',
          'Necesitamos acceso a tu cámara para tomar la foto.'
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error al tomar foto:', error);
      Alert.alert('Error', 'No se pudo tomar la foto');
    }
  };

  const handleUpload = async () => {
    if (!image) {
      Alert.alert('Error', 'Por favor, selecciona o toma una foto de la receta');
      return;
    }

    setUploading(true);

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
      setUploading(false);
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
              title="Seleccionar de galería"
              onPress={pickImage}
              buttonStyle={styles.button}
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
            <Button
              title="Tomar foto"
              onPress={takePhoto}
              buttonStyle={[styles.button, styles.cameraButton]}
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
          </View>
        )}
      </View>

      <Button
        title="Subir Receta"
        onPress={handleUpload}
        loading={uploading}
        disabled={!image || uploading}
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
  cameraButton: {
    backgroundColor: '#00897B',
  },
  changeButton: {
    backgroundColor: '#FF9800',
  },
  uploadButton: {
    backgroundColor: '#4CAF50',
  },
});

export default UploadPrescriptionScreen; 