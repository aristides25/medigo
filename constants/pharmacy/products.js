export const PRODUCTS = [
  {
    id: '1',
    name: 'Paracetamol 500mg',
    category: 'Medicamentos',
    description: 'Analgésico y antipirético para alivio del dolor y fiebre',
    requiresPrescription: false,
    brand: 'MediGo Generic',
    presentation: 'Caja x 20 tabletas',
    activeIngredient: 'Paracetamol',
    administration: 'Oral',
    availability: [
      {
        pharmacyId: 'ph1',
        price: 5.99,
        stock: 100,
        canPartialDeliver: true
      },
      {
        pharmacyId: 'ph2',
        price: 6.50,
        stock: 80,
        canPartialDeliver: true
      },
      {
        pharmacyId: 'ph3',
        price: 5.75,
        stock: 0,
        canPartialDeliver: false
      }
    ]
  },
  {
    id: '2',
    name: 'Ibuprofeno 400mg',
    category: 'Medicamentos',
    description: 'Antiinflamatorio no esteroideo (AINE)',
    requiresPrescription: false,
    brand: 'MediGo Generic',
    presentation: 'Caja x 30 tabletas',
    activeIngredient: 'Ibuprofeno',
    administration: 'Oral',
    availability: [
      {
        pharmacyId: 'ph1',
        price: 7.99,
        stock: 50,
        canPartialDeliver: true
      },
      {
        pharmacyId: 'ph2',
        price: 7.50,
        stock: 0,
        canPartialDeliver: false
      },
      {
        pharmacyId: 'ph3',
        price: 8.25,
        stock: 75,
        canPartialDeliver: true
      }
    ]
  },
  {
    id: '3',
    name: 'Amoxicilina 500mg',
    category: 'Medicamentos',
    description: 'Antibiótico de amplio espectro',
    requiresPrescription: true,
    brand: 'MediGo Generic',
    presentation: 'Caja x 21 tabletas',
    activeIngredient: 'Amoxicilina',
    administration: 'Oral',
    availability: [
      {
        pharmacyId: 'ph1',
        price: 12.99,
        stock: 30,
        canPartialDeliver: false
      },
      {
        pharmacyId: 'ph2',
        price: 13.50,
        stock: 25,
        canPartialDeliver: false
      },
      {
        pharmacyId: 'ph3',
        price: 12.75,
        stock: 40,
        canPartialDeliver: false
      }
    ]
  },
  {
    id: '4',
    name: 'Crema Hidratante Facial',
    category: 'Dermocosméticos',
    description: 'Crema hidratante para todo tipo de piel',
    price: 15.99,
    stock: 50,
    image: 'https://example.com/crema.jpg',
    requiresPrescription: false,
    brand: 'DermaCare',
    presentation: 'Frasco 50ml',
  },
  {
    id: '5',
    name: 'Vitamina C 1000mg',
    category: 'Vitaminas',
    description: 'Suplemento de vitamina C para reforzar el sistema inmune',
    price: 12.99,
    stock: 60,
    image: 'https://example.com/vitaminac.jpg',
    requiresPrescription: false,
    brand: 'VitaHealth',
    presentation: 'Frasco x 60 tabletas',
  },
  {
    id: '6',
    name: 'Jabón Antibacterial',
    category: 'Cuidado Personal',
    description: 'Jabón líquido antibacterial para manos',
    price: 4.99,
    stock: 120,
    image: 'https://example.com/jabon.jpg',
    requiresPrescription: false,
    brand: 'CleanCare',
    presentation: 'Botella 250ml',
  },
];

export const CATEGORIES = [
  {
    id: 1,
    name: 'Medicamentos',
    icon: 'pill',
    count: 1500,
  },
  {
    id: 2,
    name: 'Dermocosméticos',
    icon: 'lotion',
    count: 300,
  },
  {
    id: 3,
    name: 'Cuidado Personal',
    icon: 'hand-heart',
    count: 450,
  },
  {
    id: 4,
    name: 'Vitaminas',
    icon: 'vitamin',
    count: 200,
  },
]; 