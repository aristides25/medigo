import React, { createContext, useState, useContext } from 'react';

const TelemedicineContext = createContext();

export const TelemedicineProvider = ({ children }) => {
  // Estado para la consulta actual
  const [currentConsultation, setCurrentConsultation] = useState(null);
  
  // Estado para las consultas activas
  const [activeConsultations, setActiveConsultations] = useState([
    {
      id: '1',
      doctor: {
        id: '1',
        name: 'Dr. Juan Pérez',
        specialty: 'Medicina General',
        image: 'https://randomuser.me/api/portraits/men/1.jpg',
      },
      scheduledDate: '2024-03-25',
      scheduledTime: '10:30 AM',
      status: 'upcoming',
    },
    {
      id: '2',
      doctor: {
        id: '2',
        name: 'Dra. María García',
        specialty: 'Pediatría',
        image: 'https://randomuser.me/api/portraits/women/2.jpg',
      },
      scheduledDate: '2024-03-24',
      scheduledTime: '3:00 PM',
      status: 'completed',
    },
  ]);
  
  // Estado para la videollamada simulada
  const [callState, setCallState] = useState({
    isConnected: false,
    isMuted: false,
    isCameraOn: true,
    connectionQuality: 'good', // 'good', 'fair', 'poor'
    elapsedTime: 0,
  });

  // Estado para la sala de espera
  const [waitingRoom, setWaitingRoom] = useState({
    estimatedWaitTime: 15,
    position: 2,
    messages: [],
  });

  // Funciones para manejar la consulta
  const startConsultation = (consultationData) => {
    setCurrentConsultation(consultationData);
  };

  const endConsultation = () => {
    setCurrentConsultation(null);
    setCallState({
      isConnected: false,
      isMuted: false,
      isCameraOn: true,
      connectionQuality: 'good',
      elapsedTime: 0,
    });
  };

  // Funciones para manejar el estado de la llamada
  const toggleMute = () => {
    setCallState(prev => ({
      ...prev,
      isMuted: !prev.isMuted,
    }));
  };

  const toggleCamera = () => {
    setCallState(prev => ({
      ...prev,
      isCameraOn: !prev.isCameraOn,
    }));
  };

  // Funciones para manejar las consultas activas
  const addConsultation = (consultation) => {
    const newConsultation = {
      id: Date.now().toString(),
      ...consultation,
      status: 'upcoming',
    };
    setActiveConsultations(prev => [...prev, newConsultation]);
    return newConsultation;
  };

  const updateConsultation = (consultationId, updates) => {
    setActiveConsultations(prev =>
      prev.map(consultation =>
        consultation.id === consultationId
          ? { ...consultation, ...updates }
          : consultation
      )
    );
  };

  const cancelConsultation = (consultationId) => {
    setActiveConsultations(prev =>
      prev.filter(consultation => consultation.id !== consultationId)
    );
  };

  // Simulación de conexión
  const simulateConnectionQuality = () => {
    const qualities = ['good', 'fair', 'poor'];
    const randomQuality = qualities[Math.floor(Math.random() * qualities.length)];
    setCallState(prev => ({
      ...prev,
      connectionQuality: randomQuality,
    }));
  };

  const value = {
    // Estados
    currentConsultation,
    activeConsultations,
    callState,
    waitingRoom,

    // Funciones de consulta
    startConsultation,
    endConsultation,
    addConsultation,
    updateConsultation,
    cancelConsultation,

    // Funciones de llamada
    toggleMute,
    toggleCamera,
    simulateConnectionQuality,

    // Setters
    setWaitingRoom,
    setCallState,
  };

  return (
    <TelemedicineContext.Provider value={value}>
      {children}
    </TelemedicineContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useTelemedicine = () => {
  const context = useContext(TelemedicineContext);
  if (!context) {
    throw new Error('useTelemedicine debe ser usado dentro de TelemedicineProvider');
  }
  return context;
};

export default TelemedicineContext; 