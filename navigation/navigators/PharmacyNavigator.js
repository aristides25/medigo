import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon } from '@rneui/base';

// Importar pantallas de farmacia
import PharmacyScreen from '../../screens/pharmacy/PharmacyScreen';
import PharmacyProductsScreen from '../../screens/pharmacy/PharmacyProductsScreen';
import ProductDetailScreen from '../../screens/pharmacy/ProductDetailScreen';
import CartScreen from '../../screens/pharmacy/CartScreen';
import MyPrescriptionsScreen from '../../screens/pharmacy/MyPrescriptionsScreen';
import UploadPrescriptionScreen from '../../screens/pharmacy/UploadPrescriptionScreen';

const Stack = createNativeStackNavigator();

const PharmacyNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0077B6',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="PharmacyHome" 
        component={PharmacyScreen}
        options={({ navigation }) => ({
          title: 'Farmacia',
          headerLeft: () => (
            <Icon
              name="home"
              type="material-community"
              color="#fff"
              size={24}
              containerStyle={{ marginLeft: 10 }}
              onPress={() => navigation.navigate('Home')}
            />
          ),
        })}
      />
      <Stack.Screen 
        name="PharmacyProducts" 
        component={PharmacyProductsScreen}
        options={{
          animation: 'slide_from_right',
          title: 'Productos',
        }}
      />
      <Stack.Screen 
        name="ProductDetail" 
        component={ProductDetailScreen}
        options={{
          animation: 'slide_from_right',
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
    </Stack.Navigator>
  );
};

export default PharmacyNavigator; 