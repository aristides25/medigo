import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Input, Button, Icon } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '../../context/UserContext';

const PersonalMedicalDataScreen = ({ navigation }) => {
  const { userInfo, updateUserInfo } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: userInfo?.fullName || '',
    bloodType: userInfo?.bloodType || '',
    chronicConditions: userInfo?.chronicConditions || '',
    appointmentFrequency: userInfo?.appointmentFrequency || '',
    medications: userInfo?.medications || '',
    dosage: userInfo?.dosage || '',
  });

  const handleSave = () => {
    updateUserInfo(formData);
    setIsEditing(false);
  };

  const renderField = (label, value, field) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {isEditing ? (
        <Input
          value={formData[field]}
          onChangeText={(text) => setFormData({ ...formData, [field]: text })}
          containerStyle={styles.input}
          inputStyle={styles.inputText}
        />
      ) : (
        <Text style={styles.fieldValue}>{value || 'No especificado'}</Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Icon
            name="account-details"
            type="material-community"
            size={40}
            color="#4facfe"
          />
          <Text style={styles.headerTitle}>Datos Médicos Personales</Text>
        </View>

        <Card containerStyle={styles.card}>
          <Card.Title style={styles.sectionTitle}>Información Básica</Card.Title>
          {renderField('Nombre Completo', formData.fullName, 'fullName')}
          {renderField('Tipo de Sangre', formData.bloodType, 'bloodType')}
        </Card>

        <Card containerStyle={styles.card}>
          <Card.Title style={styles.sectionTitle}>Condiciones Médicas</Card.Title>
          {renderField('Condiciones Crónicas', formData.chronicConditions, 'chronicConditions')}
        </Card>

        <Card containerStyle={styles.card}>
          <Card.Title style={styles.sectionTitle}>Concurrencia Médica</Card.Title>
          {renderField('Frecuencia de Citas', formData.appointmentFrequency, 'appointmentFrequency')}
          {renderField('Medicamentos', formData.medications, 'medications')}
          {renderField('Dosificación', formData.dosage, 'dosage')}
        </Card>

        <View style={styles.buttonContainer}>
          {isEditing ? (
            <>
              <Button
                title="Guardar"
                onPress={handleSave}
                buttonStyle={[styles.button, styles.saveButton]}
                icon={{
                  name: 'content-save',
                  type: 'material-community',
                  color: 'white',
                  size: 20,
                }}
                iconRight
              />
              <Button
                title="Cancelar"
                onPress={() => setIsEditing(false)}
                buttonStyle={[styles.button, styles.cancelButton]}
                type="outline"
              />
            </>
          ) : (
            <Button
              title="Editar Información"
              onPress={() => setIsEditing(true)}
              buttonStyle={styles.button}
              icon={{
                name: 'pencil',
                type: 'material-community',
                color: 'white',
                size: 20,
              }}
              iconRight
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F4F8',
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#4facfe',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2d3748',
    marginTop: 10,
  },
  card: {
    borderRadius: 16,
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#4facfe',
    shadowColor: '#2d3748',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    backgroundColor: '#ffffff',
  },
  sectionTitle: {
    fontSize: 18,
    color: '#2d3748',
    textAlign: 'left',
    marginBottom: 15,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  fieldLabel: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 5,
    fontWeight: '600',
  },
  fieldValue: {
    fontSize: 16,
    color: '#2d3748',
    paddingHorizontal: 10,
  },
  input: {
    paddingHorizontal: 0,
    marginBottom: 0,
  },
  inputText: {
    fontSize: 16,
    color: '#2d3748',
  },
  buttonContainer: {
    padding: 15,
    paddingBottom: 30,
  },
  button: {
    backgroundColor: '#4facfe',
    borderRadius: 12,
    paddingVertical: 12,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButton: {
    borderColor: '#718096',
  },
});

export default PersonalMedicalDataScreen; 