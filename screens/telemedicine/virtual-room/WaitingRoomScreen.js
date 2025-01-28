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
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  waitingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  waitingText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
  },
  highlightText: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  positionText: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  messagesContainer: {
    flex: 1,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  patientMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#E3F2FD',
  },
  assistantMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
  },
  messageText: {
    fontSize: 14,
    color: '#333',
  },
  messageTime: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    marginTop: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    maxHeight: 100,
    padding: 8,
  },
  sendButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 8,
    marginLeft: 8,
  },
  disabledButton: {
    backgroundColor: '#f5f5f5',
  },
  footer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F44336',
  },
  cancelButtonText: {
    color: '#F44336',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default WaitingRoomScreen; 