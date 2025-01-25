import React, { createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MedicalRecordContext = createContext();

export const MedicalRecordProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar datos iniciales
  const loadInitialData = async () => {
    try {
      setLoading(true);
      // Aquí cargaríamos los datos del AsyncStorage
      // Por ahora usamos datos mock
      setAppointments([
        {
          id: '1',
          date: new Date('2024-01-20'),
          provider: {
            id: 'doc1',
            name: 'Dr. Juan Pérez',
            specialty: 'Medicina General'
          },
          diagnosis: 'Gripe estacional',
          notes: 'Reposo por 3 días',
          prescriptionIds: ['presc1'],
          documents: []
        }
      ]);

      setDocuments([
        {
          id: 'doc1',
          type: 'LAB_RESULT',
          title: 'Análisis de Sangre',
          date: new Date('2024-01-15'),
          file: {
            uri: 'mock://lab-result.pdf',
            type: 'application/pdf',
            name: 'analisis_sangre.pdf'
          },
          sharedWith: []
        }
      ]);

      setPrescriptions([
        {
          id: 'presc1',
          date: new Date('2024-01-20'),
          provider: {
            id: 'doc1',
            name: 'Dr. Juan Pérez'
          },
          medications: [
            {
              name: 'Paracetamol',
              dosage: '500mg',
              frequency: 'Cada 8 horas',
              duration: '5 días',
              notes: 'Tomar con alimentos'
            }
          ],
          status: 'active'
        }
      ]);
    } catch (error) {
      console.error('Error loading medical record data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Cargar datos al montar el componente
  React.useEffect(() => {
    loadInitialData();
  }, []);

  // Funciones para manejar documentos
  const addDocument = async (document) => {
    try {
      const newDocuments = [...documents, { ...document, id: Date.now().toString() }];
      setDocuments(newDocuments);
      // Aquí guardaríamos en AsyncStorage
    } catch (error) {
      console.error('Error adding document:', error);
      throw error;
    }
  };

  const shareDocument = async (documentId, providerId, duration) => {
    try {
      const newDocuments = documents.map(doc => {
        if (doc.id === documentId) {
          return {
            ...doc,
            sharedWith: [
              ...doc.sharedWith,
              {
                providerId,
                accessUntil: new Date(Date.now() + duration)
              }
            ]
          };
        }
        return doc;
      });
      setDocuments(newDocuments);
      // Aquí guardaríamos en AsyncStorage
    } catch (error) {
      console.error('Error sharing document:', error);
      throw error;
    }
  };

  // Funciones para manejar prescripciones
  const addPrescription = async (prescription) => {
    try {
      const newPrescriptions = [...prescriptions, { ...prescription, id: Date.now().toString() }];
      setPrescriptions(newPrescriptions);
      // Aquí guardaríamos en AsyncStorage
    } catch (error) {
      console.error('Error adding prescription:', error);
      throw error;
    }
  };

  return (
    <MedicalRecordContext.Provider
      value={{
        appointments,
        documents,
        prescriptions,
        loading,
        addDocument,
        shareDocument,
        addPrescription,
      }}
    >
      {children}
    </MedicalRecordContext.Provider>
  );
};

export const useMedicalRecord = () => {
  const context = useContext(MedicalRecordContext);
  if (!context) {
    throw new Error('useMedicalRecord debe usarse dentro de un MedicalRecordProvider');
  }
  return context;
}; 