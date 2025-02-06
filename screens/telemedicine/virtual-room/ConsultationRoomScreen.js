import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useTelemedicine } from '../../../context/TelemedicineContext';

const { width } = Dimensions.get('window');

const ConnectionQualityIndicator = ({ quality }) => {
  const getColor = () => {
    switch (quality) {
      case 'good':
        return '#4CAF50';
      case 'fair':
        return '#FFC107';
      case 'poor':
        return '#F44336';
      default:
        return '#4CAF50';
    }
  };

  return (
    <View style={styles.qualityContainer}>
      <View style={[styles.qualityIndicator, { backgroundColor: getColor() }]} />
      <Text style={styles.qualityText}>{quality.charAt(0).toUpperCase() + quality.slice(1)}</Text>
    </View>
  );
};

const ConsultationRoomScreen = ({ navigation }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [message, setMessage] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const cameraRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [consultationNotes, setConsultationNotes] = useState({
    symptoms: '',
    diagnosis: '',
    treatment: '',
    nextSteps: ''
  });
  
  const {
    currentConsultation,
    callState,
    toggleMute,
    toggleCamera,
    endConsultation,
    simulateConnectionQuality,
  } = useTelemedicine();

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
      if (Math.random() < 0.1) {
        simulateConnectionQuality();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleCameraToggle = () => {
    setIsCameraOff(!isCameraOff);
  };

  const handleEndCall = () => {
    endConsultation();
    navigation.navigate('PostConsultation', { 
      consultationNotes,
      consultationId: currentConsultation?.id,
      duration: elapsedTime,
      doctorName: currentConsultation?.doctor?.name
    });
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Aquí implementarías la lógica para enviar mensajes
      setMessage('');
    }
  };

  if (!permission) {
    return <View style={styles.container}><Text>Solicitando permiso de cámara...</Text></View>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Necesitamos tu permiso para mostrar la cámara</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text>Dar permiso</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ConnectionQualityIndicator quality={callState.connectionQuality} />
        <Text style={styles.timer}>{formatTime(elapsedTime)}</Text>
      </View>

      <View style={styles.videoContainer}>
        <View style={styles.videoGrid}>
          <View style={styles.doctorVideo}>
            <View style={styles.placeholderVideo}>
              <Text style={styles.placeholderText}>Doctor</Text>
            </View>
          </View>
        </View>

        <View style={styles.videoGrid}>
          <View style={styles.patientVideo}>
            <CameraView
              ref={cameraRef}
              style={styles.camera}
              facing="front"
              enableZoomGesture
              active={!isCameraOff}
              muted={isMuted}
              onMountError={(error) => {
                console.error("Error al montar la cámara:", error);
              }}
            />
            {isCameraOff && (
              <View style={styles.cameraOffOverlay}>
                <MaterialIcons name="videocam-off" size={40} color="white" />
                <Text style={styles.cameraOffText}>Cámara apagada</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.controlButton, isMuted && styles.controlButtonActive]}
          onPress={handleMuteToggle}
        >
          <MaterialIcons
            name={isMuted ? 'mic-off' : 'mic'}
            size={24}
            color="white"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlButton, styles.endCallButton]}
          onPress={handleEndCall}
        >
          <MaterialIcons name="call-end" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlButton, isCameraOff && styles.controlButtonActive]}
          onPress={handleCameraToggle}
        >
          <MaterialIcons
            name={isCameraOff ? 'videocam-off' : 'videocam'}
            size={24}
            color="white"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlButton, showChat && styles.controlButtonActive]}
          onPress={() => setShowChat(!showChat)}
        >
          <MaterialIcons name="chat" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {showChat && (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.chatContainer}
        >
          <ScrollView style={styles.chatMessages}>
            {/* Aquí irían los mensajes del chat */}
          </ScrollView>
          <View style={styles.chatInput}>
            <TextInput
              style={styles.input}
              value={message}
              onChangeText={setMessage}
              placeholder="Escribe un mensaje..."
              placeholderTextColor="#999"
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleSendMessage}
            >
              <MaterialIcons name="send" size={24} color="#2196F3" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F4F8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
    shadowColor: '#4facfe',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  qualityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    padding: 8,
    borderRadius: 20,
  },
  qualityIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  qualityText: {
    fontSize: 14,
    color: '#718096',
    fontWeight: '500',
  },
  timer: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3748',
  },
  videoContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 15,
  },
  videoGrid: {
    flex: 1,
    padding: 6,
  },
  doctorVideo: {
    flex: 1,
    backgroundColor: '#2d3748',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#4facfe',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  patientVideo: {
    flex: 1,
    backgroundColor: '#2d3748',
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#4facfe',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  camera: {
    flex: 1,
  },
  placeholderVideo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2d3748',
  },
  placeholderText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '500',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 20,
    backgroundColor: '#ffffff',
    shadowColor: '#4facfe',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  controlButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4facfe',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4facfe',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  controlButtonActive: {
    backgroundColor: '#F56565',
  },
  endCallButton: {
    backgroundColor: '#F56565',
  },
  chatContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    height: 300,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    shadowColor: '#4facfe',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  chatMessages: {
    flex: 1,
  },
  chatInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 15,
    color: '#2d3748',
  },
  sendButton: {
    padding: 10,
  },
  message: {
    fontSize: 16,
    color: '#2d3748',
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    padding: 16,
    backgroundColor: '#4facfe',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#4facfe',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  cameraOffOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(45, 55, 72, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraOffText: {
    color: '#ffffff',
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ConsultationRoomScreen; 