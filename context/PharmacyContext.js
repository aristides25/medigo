import React, { createContext, useState, useContext } from 'react';
import { AFFILIATED_PHARMACIES } from '../constants/pharmacy/affiliates';

const PharmacyContext = createContext();

export const PharmacyProvider = ({ children }) => {
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [orders, setOrders] = useState([]);
  const [partialOrders, setPartialOrders] = useState([]);

  const selectPharmacy = (pharmacyId) => {
    const pharmacy = AFFILIATED_PHARMACIES.find(p => p.id === pharmacyId);
    setSelectedPharmacy(pharmacy);
  };

  const createOrder = (items, type = 'full') => {
    const newOrder = {
      id: Date.now().toString(),
      pharmacyId: selectedPharmacy.id,
      items,
      type, // 'full' o 'partial'
      status: 'pending',
      requiresPrescription: items.some(item => item.requiresPrescription),
      createdAt: new Date().toISOString(),
      total: items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      deliveryFee: selectedPharmacy.deliveryFee,
    };

    if (type === 'partial') {
      setPartialOrders([...partialOrders, newOrder]);
    } else {
      setOrders([...orders, newOrder]);
    }

    return newOrder.id;
  };

  const getOrderById = (orderId) => {
    return [...orders, ...partialOrders].find(order => order.id === orderId);
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
    setPartialOrders(partialOrders.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
  };

  return (
    <PharmacyContext.Provider
      value={{
        selectedPharmacy,
        selectPharmacy,
        orders,
        partialOrders,
        createOrder,
        getOrderById,
        updateOrderStatus,
      }}
    >
      {children}
    </PharmacyContext.Provider>
  );
};

export const usePharmacy = () => {
  const context = useContext(PharmacyContext);
  if (!context) {
    throw new Error('usePharmacy debe usarse dentro de un PharmacyProvider');
  }
  return context;
}; 