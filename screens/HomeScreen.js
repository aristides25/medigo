import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Button, Text, Card, Icon } from '@rneui/themed';
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
    route: 'Telemedicine'
  },
  {
    title: 'Emergencias',
    icon: 'ambulance',
    description: 'Servicios de emergencia y ambulancia',
    route: 'Emergency'
  },
  {
    title: 'Servicios de Enfermería',
    icon: 'heart-pulse',
    description: 'Contrata servicios de enfermería a domicilio',
    route: 'Nursing'
  }
];

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text h3 style={styles.welcome}>¡Bienvenido a MediGo!</Text>
          <Text style={styles.subtitle}>
            Tu salud, nuestra prioridad
          </Text>
        </View>

        <View style={styles.modulesContainer}>
          {modules.map((module, index) => (
            <Card key={index} containerStyle={styles.card}>
              <Card.Title style={styles.cardTitle}>{module.title}</Card.Title>
              <Card.Divider />
              <View style={styles.cardContent}>
                <Icon
                  name={module.icon}
                  type="material-community"
                  size={40}
                  color="#0077B6"
                />
                <Text style={styles.cardDescription}>
                  {module.description}
                </Text>
                <Button
                  title="Acceder"
                  onPress={() => navigation.navigate(module.route)}
                  buttonStyle={styles.button}
                />
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#0077B6',
  },
  welcome: {
    textAlign: 'center',
    marginBottom: 8,
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  modulesContainer: {
    padding: 10,
  },
  card: {
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardTitle: {
    fontSize: 18,
    color: '#333',
  },
  cardContent: {
    alignItems: 'center',
    padding: 10,
  },
  cardDescription: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#666',
  },
  button: {
    borderRadius: 25,
    paddingHorizontal: 30,
    marginTop: 10,
    backgroundColor: '#0077B6',
  },
});

export default HomeScreen; 