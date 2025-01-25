export const PRESCRIPTION_STATUS = {
  PENDING: 'pending',
  VERIFIED: 'verified',
  REJECTED: 'rejected',
  EXPIRED: 'expired',
};

export const PRESCRIPTION_TYPE = {
  DIGITAL: 'digital',    // Generada desde el módulo de citas
  EXTERNAL: 'external',  // Subida por el usuario
};

export const MOCK_PRESCRIPTIONS = [
  {
    id: '1',
    type: PRESCRIPTION_TYPE.DIGITAL,
    patientId: 'user123',
    doctorId: 'doc456',
    issueDate: '2024-01-15',
    expiryDate: '2024-07-15',
    status: PRESCRIPTION_STATUS.VERIFIED,
    medications: [
      {
        medicineId: '1', // ID del producto en el catálogo
        dosage: '1 tableta cada 8 horas',
        quantity: 30,
        maxFills: 2,
        remainingFills: 1,
      }
    ],
    diagnosis: 'Hipertensión arterial',
    notes: 'Tomar después de las comidas',
    verifiedBy: 'pharm789',
    verificationDate: '2024-01-15',
  },
  {
    id: '2',
    type: PRESCRIPTION_TYPE.EXTERNAL,
    patientId: 'user123',
    issueDate: '2024-01-20',
    expiryDate: '2024-07-20',
    status: PRESCRIPTION_STATUS.PENDING,
    image: 'https://example.com/prescription.jpg',
    uploadDate: '2024-01-20',
    notes: 'Pendiente de verificación',
  }
]; 