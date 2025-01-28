import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon } from '@rneui/base';

// Importar pantallas de emergencia
import EmergencyTypeScreen from '../../screens/emergency/EmergencyTypeScreen';
import EmergencyMapScreen from '../../screens/emergency/EmergencyMapScreen';
import EmergencyTrackingScreen from '../../screens/emergency/EmergencyTrackingScreen';

const Stack = createNativeStackNavigator();

const EmergencyNavigator = () => {
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
        name="EmergencyType" 
        component={EmergencyTypeScreen}
        options={({ navigation }) => ({
          title: 'Servicio de Ambulancia',
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
        name="EmergencyMap" 
        component={EmergencyMapScreen}
        options={{
          title: 'Ubicación de Emergencia',
        }}
      />
      <Stack.Screen 
        name="EmergencyTracking" 
        component={EmergencyTrackingScreen}
        options={{
          title: 'Seguimiento',
        }}
      />
    </Stack.Navigator>
  );
};

export default EmergencyNavigator; 