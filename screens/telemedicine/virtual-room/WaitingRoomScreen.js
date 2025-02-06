import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTelemedicine } from '../../../context/TelemedicineContext';

const WaitingRoomScreen = ({ navigation, route }) => {
  const [message, setMessage] = useState('');
  const { consultationId } = route.params;
  const { waitingRoom, setWaitingRoom } = useTelemedicine();

  useEffect(() => {
    // Simulación de actualización del tiempo de espera
    const interval = setInterval(() => {
      setWaitingRoom(prev => ({
        ...prev,
        estimatedWaitTime: Math.max(0, prev.estimatedWaitTime - 1),
        position: prev.position > 1 ? prev.position - 1 : prev.position,
      }));
    }, 60000); // Actualizar cada minuto

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = () => {
    if (message.trim()) {
      setWaitingRoom(prev => ({
        ...prev,
        messages: [
          ...prev.messages,
          {
            id: Date.now().toString(),
            text: message,
            sender: 'patient',
            timestamp: new Date().toISOString(),
          },
        ],
      }));
      setMessage('');

      // Simular respuesta del asistente
      setTimeout(() => {
        setWaitingRoom(prev => ({
          ...prev,
          messages: [
            ...prev.messages,
            {
              id: (Date.now() + 1).toString(),
              text: 'Gracias por su mensaje. El doctor estará con usted pronto.',
              sender: 'assistant',
              timestamp: new Date().toISOString(),
            },
          ],
        }));
      }, 1000);
    }
  };

  const formatTime = (minutes) => {
    if (minutes < 1) return 'menos de un minuto';
    return `${minutes} minuto${minutes === 1 ? '' : 's'}`;
  };

  const MessageItem = ({ message }) => (
    <View
      style={[
        styles.messageContainer,
        message.sender === 'patient'
          ? styles.patientMessage
          : styles.assistantMessage,
      ]}
    >
      <Text style={styles.messageText}>{message.text}</Text>
      <Text style={styles.messageTime}>
        {new Date(message.timestamp).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Sala de espera</Text>
        <View style={styles.waitingInfo}>
          <MaterialIcons name="schedule" size={24} color="#2196F3" />
          <Text style={styles.waitingText}>
            Tiempo estimado de espera:{' '}
            <Text style={styles.highlightText}>
              {formatTime(waitingRoom.estimatedWaitTime)}
            </Text>
          </Text>
        </View>
        {waitingRoom.position > 1 && (
          <Text style={styles.positionText}>
            Hay {waitingRoom.position - 1} paciente
            {waitingRoom.position - 1 === 1 ? '' : 's'} antes que usted
          </Text>
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.chatTitle}>Chat con asistente</Text>
        <ScrollView style={styles.messagesContainer}>
          {waitingRoom.messages.map(msg => (
            <MessageItem key={msg.id} message={msg} />
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Escribe un mensaje..."
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <TouchableOpacity
            style={[styles.sendButton, !message.trim() && styles.disabledButton]}
            onPress={handleSendMessage}
            disabled={!message.trim()}
          >
            <MaterialIcons
              name="send"
              size={24}
              color={message.trim() ? 'white' : '#ccc'}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="close" size={24} color="#F44336" />
          <Text style={styles.cancelButtonText}>Cancelar consulta</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F4F8',
  },
  header: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    shadowColor: '#4facfe',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#2d3748',
    marginBottom: 16,
  },
  waitingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#F7FAFC',
    padding: 12,
    borderRadius: 12,
  },
  waitingText: {
    fontSize: 16,
    color: '#4A5568',
    marginLeft: 10,
    flex: 1,
  },
  highlightText: {
    color: '#4facfe',
    fontWeight: '600',
  },
  positionText: {
    fontSize: 15,
    color: '#718096',
    marginTop: 10,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  chatTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2d3748',
    marginBottom: 16,
  },
  messagesContainer: {
    flex: 1,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  patientMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#4facfe',
  },
  assistantMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ffffff',
    shadowColor: '#4facfe',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  messageText: {
    fontSize: 15,
    color: '#ffffff',
    lineHeight: 20,
  },
  assistantMessageText: {
    color: '#2d3748',
  },
  messageTime: {
    fontSize: 12,
    color: '#ffffff80',
    marginTop: 6,
    alignSelf: 'flex-end',
  },
  assistantMessageTime: {
    color: '#71809680',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    marginTop: 16,
    shadowColor: '#4facfe',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    maxHeight: 100,
    padding: 8,
    color: '#2d3748',
  },
  sendButton: {
    backgroundColor: '#4facfe',
    borderRadius: 10,
    padding: 10,
    marginLeft: 10,
  },
  disabledButton: {
    backgroundColor: '#CBD5E0',
  },
  footer: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF5F5',
    borderRadius: 12,
    padding: 16,
  },
  cancelButtonText: {
    color: '#F56565',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default WaitingRoomScreen; 