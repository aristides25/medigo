import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Input, Button, Icon } from '@rneui/themed';

const EmergencyForm = ({ navigation, route }) => {
  // Datos del perfil del usuario
  const userData = {
    name: 'Juan Pérez',
    email: 'juan.perez@email.com',
    phone: '+507 6123-4567',
    birthDate: '15/05/1985',
    bloodType: 'O+',
    address: 'Calle 50, Ciudad de Panamá',
    emergencyContact: 'María Pérez',
    emergencyPhone: '+507 6789-0123',
    insurance: 'Seguro Médico Nacional',
    policyNumber: 'POL-123456'
  };

  // Calcular la edad a partir de la fecha de nacimiento
  const calculateAge = (birthDate) => {
    const [day, month, year] = birthDate.split('/');
    const birthDateObj = new Date(year, month - 1, day);
    const today = new Date();
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const m = today.getMonth() - birthDateObj.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    return age.toString();
  };

  const [formData, setFormData] = useState({
    patientName: userData.name,
    age: calculateAge(userData.birthDate),
    bloodType: userData.bloodType,
    phone: userData.phone,
    address: userData.address,
    emergencyContact: userData.emergencyContact,
    emergencyPhone: userData.emergencyPhone,
    insurance: userData.insurance,
    policyNumber: userData.policyNumber,
    symptoms: '',
    emergencyType: '',
    additionalInfo: ''
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = () => {
    setIsSaved(true);
    
    setTimeout(() => {
      navigation.navigate('EmergencyMap', {
        formData: {
          patientName: formData.patientName,
          age: formData.age,
          bloodType: formData.bloodType,
          phone: formData.phone,
          address: formData.address,
          emergencyContact: formData.emergencyContact,
          emergencyPhone: formData.emergencyPhone,
          insurance: formData.insurance,
          policyNumber: formData.policyNumber,
          symptoms: formData.symptoms,
          emergencyType: formData.emergencyType,
          additionalInfo: formData.additionalInfo
        }
      });
    }, 1000);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text h4 style={styles.title}>Datos del Paciente</Text>
        
        <View style={styles.inputGroup}>
          <Icon name="person" type="material" color="#666" size={24} />
          <Input
            label="Nombre del Paciente"
            value={formData.patientName}
            onChangeText={(text) => setFormData({...formData, patientName: text})}
            containerStyle={styles.inputContainer}
            disabled={isSaved}
          />
        </View>

        <View style={styles.inputGroup}>
          <Icon name="calendar" type="material" color="#666" size={24} />
          <Input
            label="Edad"
            value={formData.age}
            onChangeText={(text) => setFormData({...formData, age: text})}
            containerStyle={styles.inputContainer}
            keyboardType="numeric"
            disabled={isSaved}
          />
        </View>

        <View style={styles.inputGroup}>
          <Icon name="opacity" type="material" color="#666" size={24} />
          <Input
            label="Tipo de Sangre"
            value={formData.bloodType}
            onChangeText={(text) => setFormData({...formData, bloodType: text})}
            containerStyle={styles.inputContainer}
            disabled={isSaved}
          />
        </View>

        <View style={styles.inputGroup}>
          <Icon name="phone" type="material" color="#666" size={24} />
          <Input
            label="Teléfono"
            value={formData.phone}
            onChangeText={(text) => setFormData({...formData, phone: text})}
            containerStyle={styles.inputContainer}
            disabled={isSaved}
          />
        </View>

        <View style={styles.inputGroup}>
          <Icon name="place" type="material" color="#666" size={24} />
          <Input
            label="Dirección"
            value={formData.address}
            onChangeText={(text) => setFormData({...formData, address: text})}
            containerStyle={styles.inputContainer}
            disabled={isSaved}
          />
        </View>

        <Text h4 style={styles.sectionTitle}>Contacto de Emergencia</Text>

        <View style={styles.inputGroup}>
          <Icon name="person" type="material" color="#666" size={24} />
          <Input
            label="Nombre del Contacto"
            value={formData.emergencyContact}
            onChangeText={(text) => setFormData({...formData, emergencyContact: text})}
            containerStyle={styles.inputContainer}
            disabled={isSaved}
          />
        </View>

        <View style={styles.inputGroup}>
          <Icon name="phone" type="material" color="#666" size={24} />
          <Input
            label="Teléfono del Contacto"
            value={formData.emergencyPhone}
            onChangeText={(text) => setFormData({...formData, emergencyPhone: text})}
            containerStyle={styles.inputContainer}
            disabled={isSaved}
          />
        </View>

        <Text h4 style={styles.sectionTitle}>Información de la Emergencia</Text>

        <View style={styles.inputGroup}>
          <Icon name="favorite" type="material" color="#666" size={24} />
          <Input
            label="Síntomas"
            placeholder="Describa los síntomas"
            value={formData.symptoms}
            onChangeText={(text) => setFormData({...formData, symptoms: text})}
            containerStyle={styles.inputContainer}
            multiline
            disabled={isSaved}
          />
        </View>

        <View style={styles.inputGroup}>
          <Icon name="local-hospital" type="material" color="#666" size={24} />
          <Input
            label="Tipo de Emergencia"
            placeholder="Especifique el tipo de emergencia"
            value={formData.emergencyType}
            onChangeText={(text) => setFormData({...formData, emergencyType: text})}
            containerStyle={styles.inputContainer}
            disabled={isSaved}
          />
        </View>

        <View style={styles.inputGroup}>
          <Icon name="info" type="material" color="#666" size={24} />
          <Input
            label="Descripción Adicional"
            placeholder="Información adicional relevante"
            value={formData.additionalInfo}
            onChangeText={(text) => setFormData({...formData, additionalInfo: text})}
            containerStyle={styles.inputContainer}
            multiline
            disabled={isSaved}
          />
        </View>

        <Button
          title={isSaved ? "Información Guardada" : "Guardar Información"}
          onPress={handleSubmit}
          buttonStyle={[
            styles.submitButton,
            isSaved && styles.savedButton
          ]}
          titleStyle={styles.submitButtonText}
          icon={{
            name: isSaved ? "check" : "save",
            type: "material",
            size: 24,
            color: "white",
          }}
          iconRight
          disabled={isSaved}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  sectionTitle: {
    marginTop: 20,
    marginBottom: 15,
    color: '#333',
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  inputContainer: {
    flex: 1,
    marginLeft: 10,
  },
  submitButton: {
    backgroundColor: '#0288D1',
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 20,
  },
  savedButton: {
    backgroundColor: '#9E9E9E',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EmergencyForm; 