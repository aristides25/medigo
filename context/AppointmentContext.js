import React, { createContext, useState, useContext } from 'react';

const AppointmentContext = createContext();

export const useAppointment = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('useAppointment must be used within an AppointmentProvider');
  }
  return context;
};

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);

  const createAppointment = (appointmentData) => {
    const newAppointment = {
      id: Date.now(), // Temporal ID generator
      ...appointmentData,
      status: 'pendiente',
      createdAt: new Date(),
    };
    
    setAppointments(prev => [...prev, newAppointment]);
    return newAppointment;
  };

  const updateAppointment = (id, updates) => {
    setAppointments(prev => 
      prev.map(appointment => 
        appointment.id === id ? { ...appointment, ...updates } : appointment
      )
    );
  };

  const cancelAppointment = (id) => {
    updateAppointment(id, { status: 'cancelada' });
  };

  const getAppointmentById = (id) => {
    return appointments.find(appointment => appointment.id === id);
  };

  const value = {
    appointments,
    createAppointment,
    updateAppointment,
    cancelAppointment,
    getAppointmentById,
  };

  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
}; 