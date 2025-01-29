import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTelemedicine } from '../../../context/TelemedicineContext';

const ConnectionTestScreen = ({ navigation, route }) => {
  const [testStatus, setTestStatus] = useState({
    camera: 'testing',
    microphone: 'testing',
    internet: 'testing',
  });
  const { consultationId } = route.params;
  const { callState, setCallState } = useTelemedicine();

  useEffect(() => {
    // Simulación de pruebas de conexión
    const runTests = async () => {
      // Prueba de cámara
      setTimeout(() => {
        setTestStatus(prev => ({ ...prev, camera: 'success' }));
      }, 2000);

      // Prueba de micrófono
      setTimeout(() => {
        setTestStatus(prev => ({ ...prev, microphone: 'success' }));
      }, 3000);

      // Prueba de internet
      setTimeout(() => {
        setTestStatus(prev => ({ ...prev, internet: 'success' }));
      }, 4000);
    };

    runTests();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'testing':
        return <ActivityIndicator size="small" color="#2196F3" />;
      case 'success':
        return <MaterialIcons name="check-circle" size={24} color="#4CAF50" />;
      case 'error':
        return <MaterialIcons name="error" size={24} color="#F44336" />;
      default:
        return null;
    }
  };

  const allTestsPassed = Object.values(testStatus).every(
    status => status === 'success'
  );

  const handleJoinRoom = () => {
    setCallState({
      isConnected: true,
      isMuted: false,
      isCameraOn: true,
      connectionQuality: 'good',
      elapsedTime: 0,
    });
    navigation.replace('ConsultationRoom', { consultationId });
  };

  const TestItem = ({ title, status, description }) => (
    <View style={styles.testItem}>
      <View style={styles.testHeader}>
        <Text style={styles.testTitle}>{title}</Text>
        {getStatusIcon(status)}
      </View>
      <Text style={styles.testDescription}>{description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Prueba de conexión</Text>
        <Text style={styles.subtitle}>
          Asegúrate de tener una buena conexión antes de iniciar la consulta
        </Text>

        <View style={styles.testList}>
          <TestItem
            title="Cámara"
            status={testStatus.camera}
            description="Verificando acceso y funcionamiento de la cámara"
          />
          <TestItem
            title="Micrófono"
            status={testStatus.microphone}
            description="Comprobando entrada de audio"
          />
          <TestItem
            title="Conexión a Internet"
            status={testStatus.internet}
            description="Evaluando velocidad y estabilidad de la conexión"
          />
        </View>

        {allTestsPassed && (
          <View style={styles.successMessage}>
            <MaterialIcons name="check-circle" size={48} color="#4CAF50" />
            <Text style={styles.successText}>
              ¡Todo listo para iniciar la consulta!
            </Text>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, !allTestsPassed && styles.disabledButton]}
          onPress={handleJoinRoom}
          disabled={!allTestsPassed}
        >
          <MaterialIcons name="video-call" size={24} color="white" />
          <Text style={styles.buttonText}>Unirse a la consulta</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.helpButton}
          onPress={() => navigation.navigate('TechnicalSupport')}
        >
          <MaterialIcons name="help" size={20} color="#666" />
          <Text style={styles.helpButtonText}>Necesito ayuda</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  testList: {
    marginBottom: 32,
  },
  testItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  testHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  testTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  testDescription: {
    fontSize: 14,
    color: '#666',
  },
  successMessage: {
    alignItems: 'center',
    marginTop: 32,
  },
  successText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 16,
    textAlign: 'center',
  },
  footer: {
    padding: 24,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  helpButtonText: {
    color: '#666',
    marginLeft: 4,
  },
});

export default ConnectionTestScreen; 