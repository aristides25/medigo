import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Linking } from 'react-native';
import { Text, Icon, Button } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

const DELIVERY_STEPS = [
  { id: 1, icon: 'store', label: 'Preparando', color: '#4CAF50' },
  { id: 2, icon: 'bike', label: 'En camino', color: '#4CAF50' },
  { id: 3, icon: 'map-marker', label: 'Cerca', color: '#4CAF50' },
  { id: 4, icon: 'check-circle', label: 'Entregado', color: '#4CAF50' },
];

const DeliveryTrackingScreen = ({ navigation }) => {
  const [progress, setProgress] = useState(0);
  const [location, setLocation] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();

    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        const newProgress = oldProgress + 1;
        updateDeliveryStep(newProgress);
        return newProgress;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const updateDeliveryStep = (progress) => {
    if (progress < 25) setCurrentStep(1);
    else if (progress < 50) setCurrentStep(2);
    else if (progress < 75) setCurrentStep(3);
    else setCurrentStep(4);
  };

  const handleCallDriver = () => {
    Linking.openURL('tel:+1234567890');
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={styles.stepsContainer}>
          {DELIVERY_STEPS.map((step, index) => (
            <View key={step.id} style={styles.stepItem}>
              <View style={[
                styles.stepIconContainer,
                { backgroundColor: currentStep >= step.id ? step.color : '#e2e8f0' }
              ]}>
                <Icon
                  name={step.icon}
                  type="material-community"
                  size={24}
                  color="#fff"
                />
              </View>
              <Text style={[
                styles.stepLabel,
                currentStep >= step.id && { color: '#4CAF50', fontWeight: '700' }
              ]}>{step.label}</Text>
              {index < DELIVERY_STEPS.length - 1 && (
                <View style={[
                  styles.stepLine,
                  { backgroundColor: currentStep > step.id ? '#4CAF50' : '#e2e8f0' }
                ]} />
              )}
            </View>
          ))}
        </View>
      </View>

      {location && (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Tu ubicación"
          >
            <Icon
              name="map-marker"
              type="material-community"
              size={40}
              color="#4CAF50"
            />
          </Marker>
        </MapView>
      )}

      <View style={styles.overlay}>
        <View style={styles.deliveryInfoContainer}>
          <View style={styles.driverInfo}>
            <Icon
              name="account-circle"
              type="material-community"
              size={50}
              color="#4CAF50"
            />
            <View style={styles.driverDetails}>
              <Text style={styles.driverName}>Juan Pérez</Text>
              <Text style={styles.vehicleInfo}>Moto • ABC123</Text>
            </View>
            <TouchableOpacity
              onPress={handleCallDriver}
              style={styles.callButton}
            >
              <Icon
                name="phone"
                type="material-community"
                size={30}
                color="#4CAF50"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.estimatedTime}>
            <Icon
              name="clock-time-four"
              type="material-community"
              size={24}
              color="#4CAF50"
            />
            <Text style={styles.estimatedTimeText}>
              Tiempo estimado: 15-20 min
            </Text>
          </View>

          {currentStep === 4 && (
            <View style={styles.completeButtonContainer}>
              <Button
                title="Pedido Completado"
                onPress={() => navigation.navigate('Home')}
                buttonStyle={styles.completeButton}
                titleStyle={styles.completeButtonText}
                icon={{
                  name: 'check-circle',
                  type: 'material-community',
                  size: 20,
                  color: 'white',
                }}
                iconRight
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  progressContainer: {
    position: 'absolute',
    top: 40,
    left: 16,
    right: 16,
    zIndex: 1,
    padding: 16,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepItem: {
    alignItems: 'center',
    flex: 1,
    position: 'relative',
  },
  stepIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 2,
    backgroundColor: '#fff',
  },
  stepLabel: {
    fontSize: 12,
    color: '#2d3748',
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 4,
  },
  stepLine: {
    position: 'absolute',
    top: 19,
    right: -40,
    width: 80,
    height: 3,
    backgroundColor: '#e2e8f0',
    zIndex: 1,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  deliveryInfoContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  driverDetails: {
    flex: 1,
    marginLeft: 12,
  },
  driverName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 4,
  },
  vehicleInfo: {
    fontSize: 14,
    color: '#718096',
  },
  callButton: {
    padding: 8,
    backgroundColor: '#E8F4F8',
    borderRadius: 20,
  },
  estimatedTime: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8F4F8',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  estimatedTimeText: {
    fontSize: 16,
    color: '#2d3748',
    marginLeft: 8,
    fontWeight: '500',
  },
  completeButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 1000,
    backgroundColor: 'white',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  completeButton: {
    backgroundColor: '#4CAF50',
    height: 56,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 8,
  },
  completeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 0.5,
  },
});

export default DeliveryTrackingScreen; 