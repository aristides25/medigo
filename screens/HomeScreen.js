import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Modal } from 'react-native';
import { Button, Text, Icon, Overlay } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';

const modules = [
  {
    title: 'Citas Médicas',
    icon: 'calendar',
    description: 'Agenda tus citas médicas con profesionales de la salud',
    route: 'Appointments'
  },
  {
    title: 'Farmacia',
    icon: 'medical-bag',
    description: 'Compra medicamentos y productos farmacéuticos',
    route: 'Pharmacy'
  },
  {
    title: 'Expediente Médico',
    icon: 'file-document',
    description: 'Accede a tu historial médico digital',
    route: 'MedicalRecords'
  },
  {
    title: 'Telemedicina',
    icon: 'video',
    description: 'Consultas médicas en línea',
    route: 'TelemedicineHome'
  },
  {
    title: 'Emergencias',
    icon: 'ambulance',
    description: 'Servicios de emergencia y ambulancia',
    route: 'EmergencyMap'
  },
  {
    title: 'Servicios de Enfermería',
    icon: 'heart-pulse',
    description: 'Contrata servicios de enfermería a domicilio',
    route: 'NursingHome'
  }
];

const HomeScreen = ({ navigation }) => {
  const [visibleTooltip, setVisibleTooltip] = useState(null);

  const toggleTooltip = (index) => {
    setVisibleTooltip(visibleTooltip === index ? null : index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text h4 style={styles.welcome}>¡Bienvenido a MediGo!</Text>
        <Text style={styles.subtitle}>Tu salud, nuestra prioridad</Text>
      </View>

      <View style={styles.modulesContainer}>
        <View style={styles.moduleRow}>
          {modules.map((module, index) => (
            <View key={index} style={styles.moduleCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{module.title}</Text>
                <TouchableOpacity onPress={() => toggleTooltip(index)}>
                  <Icon
                    name="information"
                    type="material-community"
                    size={16}
                    color="#0077B6"
                    containerStyle={styles.infoIcon}
                  />
                </TouchableOpacity>
              </View>
              <Icon
                name={module.icon}
                type="material-community"
                size={32}
                color="#0077B6"
                containerStyle={styles.moduleIcon}
              />
              <Button
                title="Acceder"
                onPress={() => navigation.navigate(module.route)}
                buttonStyle={styles.button}
                titleStyle={styles.buttonTitle}
              />
              <Overlay
                isVisible={visibleTooltip === index}
                onBackdropPress={() => setVisibleTooltip(null)}
                overlayStyle={styles.overlay}
              >
                <View style={styles.tooltipContainer}>
                  <Text style={styles.tooltipTitle}>{module.title}</Text>
                  <Text style={styles.tooltipText}>{module.description}</Text>
                  <Button
                    title="Cerrar"
                    onPress={() => setVisibleTooltip(null)}
                    buttonStyle={styles.closeButton}
                    titleStyle={styles.closeButtonTitle}
                  />
                </View>
              </Overlay>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#0077B6',
  },
  welcome: {
    textAlign: 'center',
    marginBottom: 4,
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
  modulesContainer: {
    flex: 1,
    padding: 8,
  },
  moduleRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  moduleCard: {
    width: (width - 32) / 2,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginRight: 4,
  },
  infoIcon: {
    marginLeft: 4,
  },
  moduleIcon: {
    marginVertical: 8,
  },
  tooltipText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
  button: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 6,
    backgroundColor: '#0077B6',
    minWidth: 100,
  },
  buttonTitle: {
    fontSize: 12,
  },
  overlay: {
    width: '80%',
    borderRadius: 10,
    padding: 20,
    backgroundColor: 'white',
  },
  tooltipContainer: {
    alignItems: 'center',
  },
  tooltipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0077B6',
    marginBottom: 10,
  },
  tooltipText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  closeButton: {
    backgroundColor: '#0077B6',
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  closeButtonTitle: {
    fontSize: 14,
  },
});

export default HomeScreen; 