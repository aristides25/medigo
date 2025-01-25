import React from 'react';
import { View, ScrollView, StyleSheet, Share, Alert } from 'react-native';
import { Text, Card, Button, Icon, Divider } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMedicalRecord } from '../../context/MedicalRecordContext';

const DocumentDetailScreen = ({ route, navigation }) => {
  const { document } = route.params;
  const { shareDocument } = useMedicalRecord();
  const date = new Date(document.date);

  // Función para compartir documento
  const handleShare = async () => {
    try {
      // Por ahora solo mostramos un mensaje
      Alert.alert(
        'Función en desarrollo',
        'La funcionalidad de compartir estará disponible próximamente'
      );
      // Aquí iría la lógica real de compartir
      // const result = await Share.share({
      //   message: `Documento médico: ${document.title}`,
      //   url: document.file.uri
      // });
    } catch (error) {
      Alert.alert('Error', 'No se pudo compartir el documento');
    }
  };

  // Función para descargar documento
  const handleDownload = () => {
    // Por ahora solo mostramos un mensaje
    Alert.alert(
      'Función en desarrollo',
      'La funcionalidad de descarga estará disponible próximamente'
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Encabezado del documento */}
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
              buttonStyle={[styles.actionButton, styles.downloadButton]}
            />
          </View>
        </Card>

        {/* Detalles del documento */}
        <Card containerStyle={styles.detailsCard}>
          <Text style={styles.sectionTitle}>Detalles del Documento</Text>
          <Divider style={styles.divider} />
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Tipo:</Text>
            <Text style={styles.detailValue}>
              {document.type === 'LAB_RESULT' ? 'Resultado de Laboratorio' : 'Documento Médico'}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Archivo:</Text>
            <Text style={styles.detailValue}>{document.file.name}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Formato:</Text>
            <Text style={styles.detailValue}>{document.file.type}</Text>
          </View>
        </Card>

        {/* Vista previa - Por ahora solo un placeholder */}
        <Card containerStyle={styles.previewCard}>
          <Text style={styles.sectionTitle}>Vista Previa</Text>
          <Divider style={styles.divider} />
          
          <View style={styles.previewPlaceholder}>
            <Icon
              name="file-pdf-box"
              type="material-community"
              size={60}
              color="#666"
            />
            <Text style={styles.previewText}>
              Vista previa no disponible
            </Text>
            <Button
              title="Ver Documento"
              onPress={handleDownload}
              buttonStyle={styles.viewButton}
              icon={{
                name: 'eye',
                type: 'material-community',
                color: 'white',
                size: 20,
              }}
            />
          </View>
        </Card>

        {/* Historial de compartidos - Por ahora vacío */}
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
    fontSize: 24,
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
    backgroundColor: '#00B4D8',
  },
  detailsCard: {
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
  detailRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  detailLabel: {
    flex: 1,
    fontSize: 16,
    color: '#666',
  },
  detailValue: {
    flex: 2,
    fontSize: 16,
    color: '#444',
  },
  previewCard: {
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
  },
  previewPlaceholder: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  previewText: {
    fontSize: 16,
    color: '#666',
    marginVertical: 10,
  },
  viewButton: {
    marginTop: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    backgroundColor: '#0077B6',
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
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    fontStyle: 'italic',
  },
});

export default DocumentDetailScreen; 