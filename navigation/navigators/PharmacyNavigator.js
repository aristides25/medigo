import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Pharmacy Screens
import PharmacyScreen from '../../screens/pharmacy/PharmacyScreen';
import CategoryProductsScreen from '../../screens/pharmacy/CategoryProductsScreen';
import ProductDetailScreen from '../../screens/pharmacy/ProductDetailScreen';
import CartScreen from '../../screens/pharmacy/CartScreen';
import MyPrescriptionsScreen from '../../screens/pharmacy/MyPrescriptionsScreen';
import UploadPrescriptionScreen from '../../screens/pharmacy/UploadPrescriptionScreen';

const Stack = createNativeStackNavigator();

const PharmacyNavigator = ({ screenOptions }) => {
  return (
    <>
      <Stack.Screen 
        name="Pharmacy" 
        component={PharmacyScreen}
        options={{
          title: 'Farmacia',
        }}
      />
      <Stack.Screen 
        name="CategoryProducts" 
        component={CategoryProductsScreen}
        options={({ route }) => ({
          title: route.params.category.name,
        })}
      />
      <Stack.Screen 
        name="ProductDetail" 
        component={ProductDetailScreen}
        options={{
          title: 'Detalle del Producto',
        }}
      />
      <Stack.Screen 
        name="Cart" 
        component={CartScreen}
        options={{
          title: 'Carrito de Compras',
        }}
      />
      <Stack.Screen 
        name="MyPrescriptions" 
        component={MyPrescriptionsScreen}
        options={{
          title: 'Mis Recetas',
        }}
      />
      <Stack.Screen 
        name="UploadPrescription" 
        component={UploadPrescriptionScreen}
        options={{
          title: 'Subir Receta',
        }}
      />
    </>
  );
};

export default PharmacyNavigator; 