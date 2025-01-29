import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed';
import AppNavigator from './AppNavigator';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import EmergencyNavigator from './navigators/EmergencyNavigator';
import SettingsScreen from '../screens/SettingsScreen';

// Placeholder screens
const ProfileScreen = () => (
  <View style={styles.placeholderScreen}>
    <Text>Perfil del Usuario</Text>
  </View>
);

const Tab = createBottomTabNavigator();

// Definimos los colores como constantes para mantener consistencia
const COLORS = {
  primary: '#2c3e50', // Azul oscuro para elementos activos
  inactive: '#95a5a6', // Gris para elementos inactivos
  emergency: '#e74c3c', // Rojo para el botón de emergencia
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#ffffff',
          height: Platform.OS === 'ios' ? 85 : 65,
          paddingBottom: Platform.OS === 'ios' ? 25 : 8,
          paddingTop: 8,
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.inactive,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={AppNavigator}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <Icon
              name="home"
              type="material-community"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Icon
              name="account"
              type="material-community"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Emergency"
        component={EmergencyNavigator}
        options={({ navigation }) => ({
          tabBarLabel: 'Emergencia',
          tabBarLabelStyle: {
            color: COLORS.emergency,
          },
          tabBarIcon: ({ focused }) => (
            <View style={styles.emergencyIconContainer}>
              <Icon
                name="ambulance"
                type="material-community"
                color={COLORS.emergency}
                size={28}
              />
            </View>
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              style={styles.emergencyButton}
              onPress={() => {
                // Navegar directamente a EmergencyType
                navigation.navigate('Home', {
                  screen: 'EmergencyType'
                });
              }}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Ajustes',
          tabBarIcon: ({ color, size }) => (
            <Icon
              name="cog"
              type="material-community"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  placeholderScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emergencyIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 3,
  },
  emergencyButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default TabNavigator; 