import React, { createContext, useState, useContext } from 'react';

const RatingContext = createContext();

export const useRating = () => {
  const context = useContext(RatingContext);
  if (!context) {
    throw new Error('useRating debe usarse dentro de un RatingProvider');
  }
  return context;
};

export const RatingProvider = ({ children }) => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(false);

  // Crear una nueva calificación
  const createRating = async (ratingData) => {
    setLoading(true);
    try {
      // Aquí iría la llamada al backend
      const newRating = {
        id: Date.now().toString(),
        ...ratingData,
        createdAt: new Date().toISOString()
      };
      
      setRatings(prevRatings => [...prevRatings, newRating]);
      
      // Actualizar el promedio del proveedor
      updateProviderRating(ratingData.providerId);
      
      return newRating;
    } catch (error) {
      console.error('Error al crear calificación:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Obtener calificaciones de un proveedor
  const getProviderRatings = (providerId) => {
    return ratings.filter(rating => rating.providerId === providerId);
  };

  // Calcular promedio de calificaciones de un proveedor
  const calculateProviderAverage = (providerId) => {
    const providerRatings = getProviderRatings(providerId);
    if (providerRatings.length === 0) return 0;
    
    const sum = providerRatings.reduce((acc, curr) => acc + curr.rating, 0);
    return (sum / providerRatings.length).toFixed(1);
  };

  // Actualizar el rating promedio del proveedor
  const updateProviderRating = (providerId) => {
    const average = calculateProviderAverage(providerId);
    // Aquí se actualizaría el rating en el provider context
    // cuando esté implementado
  };

  // Verificar si una cita ya fue calificada
  const hasAppointmentRating = (appointmentId) => {
    return ratings.some(rating => rating.appointmentId === appointmentId);
  };

  // Obtener calificación de una cita específica
  const getAppointmentRating = (appointmentId) => {
    return ratings.find(rating => rating.appointmentId === appointmentId);
  };

  const value = {
    ratings,
    loading,
    createRating,
    getProviderRatings,
    calculateProviderAverage,
    hasAppointmentRating,
    getAppointmentRating
  };

  return (
    <RatingContext.Provider value={value}>
      {children}
    </RatingContext.Provider>
  );
}; 