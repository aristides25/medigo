import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert, Image, Dimensions } from 'react-native';
import { Text, Card, Button, Icon, Divider } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system';
import { useMedicalRecord } from '../../context/MedicalRecordContext';

const DocumentDetailScreen = ({ route, navigation }) => {
  const { document } = route.params;
  const { shareDocument } = useMedicalRecord();
  const [loading, setLoading] = useState(false);
  const date = new Date(document.date);
  const isPDF = document.file?.type?.includes('pdf');

  const handleShare = async () => {
    try {
      setLoading(true);
      await shareDocument(document.id);
      Alert.alert('Éxito', 'Documento compartido correctamente');
    } catch (error) {
      Alert.alert('Error', 'No se pudo compartir el documento');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      setLoading(true);
      Alert.alert('Información', 'La descarga de documentos estará disponible próximamente');
    } catch (error) {
      Alert.alert('Error', 'No se pudo descargar el documento');
    } finally {
      setLoading(false);
    }
  };

  const renderPreview = () => {
    if (!document.file) {
      return (
        <View style={styles.previewPlaceholder}>
          <Icon
            name="file-document-outline"
            type="material-community"
            size={60}
            color="#666"
          />
          <Text style={styles.previewText}>
            Vista previa no disponible
          </Text>
        </View>
      );
    }

    if (isPDF) {
      return (
        <View style={styles.previewPlaceholder}>
          <Icon
            name="file-pdf-box"
            type="material-community"
            size={60}
            color="#0077B6"
          />
          <Text style={styles.previewText}>
            Documento PDF
          </Text>
          <Text style={styles.previewSubtext}>
            {document.file.name}
          </Text>
        </View>
      );
    }

    return (
      <Image
        source={{ uri: document.file.uri }}
        style={styles.image}
        resizeMode="contain"
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Card containerStyle={styles.headerCard}>
          <View style={styles.iconContainer}>
            <Icon
              name={document.type === 'LAB_RESULT' ? 'test-tube' : 'file-document'}
              type="material-community"
              size={40}
              color="#0077B6"
            />
          </View>
          <Text style={styles.title}>{document.title}</Text>
          <Text style={styles.date}>
            Fecha: {date.toLocaleDateString('es-ES')}
          </Text>
          
          <View style={styles.actionButtons}>
            <Button
              title="Compartir"
              icon={{
                name: 'share-variant',
                type: 'material-community',
                color: 'white',
                size: 20,
              }}
              onPress={handleShare}
              loading={loading}
              buttonStyle={[styles.actionButton, styles.shareButton]}
            />
            <Button
              title="Descargar"
              icon={{
                name: 'download',
                type: 'material-community',
                color: 'white',
                size: 20,
              }}
              onPress={handleDownload}
              loading={loading}
              buttonStyle={[styles.actionButton, styles.downloadButton]}
            />
          </View>
        </Card>

        <Card containerStyle={styles.previewCard}>
          <Text style={styles.sectionTitle}>Vista Previa</Text>
          <Divider style={styles.divider} />
          {renderPreview()}
        </Card>

        <Card containerStyle={styles.historyCard}>
          <Text style={styles.sectionTitle}>Historial de Compartidos</Text>
          <Divider style={styles.divider} />
          
          {document.sharedWith && document.sharedWith.length > 0 ? (
            document.sharedWith.map((share, index) => (
              <View key={index} style={styles.shareHistoryItem}>
                <Icon
                  name="account-clock"
                  type="material-community"
                  size={24}
                  color="#666"
                />
                <View style={styles.shareInfo}>
                  <Text style={styles.shareProvider}>Dr. {share.providerId}</Text>
                  <Text style={styles.shareDate}>
                    Hasta: {new Date(share.accessUntil).toLocaleDateString('es-ES')}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.emptyHistory}>
              Este documento no se ha compartido aún
            </Text>
          )}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerCard: {
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
    textAlign: 'center',
    marginBottom: 5,
  },
  date: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  actionButton: {
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  shareButton: {
    backgroundColor: '#0077B6',
  },
  downloadButton: {
    backgroundColor: '#00897B',
  },
  previewCard: {
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 10,
  },
  divider: {
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: 400,
    borderRadius: 10,
  },
  previewPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    minHeight: 200,
  },
  previewText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
  previewSubtext: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
    textAlign: 'center',
  },
  historyCard: {
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
  },
  shareHistoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  shareInfo: {
    marginLeft: 10,
    flex: 1,
  },
  shareProvider: {
    fontSize: 16,
    color: '#444',
  },
  shareDate: {
    fontSize: 14,
    color: '#666',
  },
  emptyHistory: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    padding: 20,
  },
});

export default DocumentDetailScreen; 