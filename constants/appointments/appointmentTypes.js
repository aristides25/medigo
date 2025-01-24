export const APPOINTMENT_TYPES = {
  GENERAL: {
    id: 'general',
    name: 'Consulta General',
    description: 'Consulta médica general',
    icon: 'doctor',
  },
  SPECIALIST: {
    id: 'specialist',
    name: 'Especialista',
    description: 'Consulta con médico especialista',
    icon: 'doctor-plus',
  },
  FOLLOWUP: {
    id: 'followup',
    name: 'Seguimiento',
    description: 'Consulta de seguimiento',
    icon: 'calendar-check',
  },
  EMERGENCY: {
    id: 'emergency',
    name: 'Emergencia',
    description: 'Consulta de emergencia',
    icon: 'ambulance',
  },
};

export const APPOINTMENT_STATUS = {
  PENDING: {
    id: 'pending',
    name: 'Pendiente',
    color: '#FFA500',
  },
  CONFIRMED: {
    id: 'confirmed',
    name: 'Confirmada',
    color: '#4CAF50',
  },
  CANCELLED: {
    id: 'cancelled',
    name: 'Cancelada',
    color: '#F44336',
  },
  COMPLETED: {
    id: 'completed',
    name: 'Completada',
    color: '#2196F3',
  },
}; 