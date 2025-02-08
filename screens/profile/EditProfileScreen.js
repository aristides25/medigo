import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Input, Button, Icon } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '../../context/UserContext';
import { COLORS } from '../../constants';

const EditProfileScreen = ({ navigation }) => {
  const { userInfo, updateUserInfo } = useUser();
  const [formData, setFormData] = useState({ ...userInfo });

  const handleSave = () => {
    updateUserInfo(formData);
    navigation.goBack();
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Editar Perfil</Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Nombre"
            value={formData.name}
            onChangeText={(value) => handleChange('name', value)}
            leftIcon={
              <Icon
                name="account"
                type="material-community"
                size={24}
                color={COLORS.blue}
              />
            }
            containerStyle={styles.inputContainer}
          />

          <Input
            label="Correo Electrónico"
            value={formData.email}
            onChangeText={(value) => handleChange('email', value)}
            keyboardType="email-address"
            leftIcon={
              <Icon
                name="email"
                type="material-community"
                size={24}
                color={COLORS.blue}
              />
            }
            containerStyle={styles.inputContainer}
          />

          <Input
            label="Teléfono"
            value={formData.phone}
            onChangeText={(value) => handleChange('phone', value)}
            keyboardType="phone-pad"
            leftIcon={
              <Icon
                name="phone"
                type="material-community"
                size={24}
                color={COLORS.blue}
              />
            }
            containerStyle={styles.inputContainer}
          />

          <Input
            label="Tipo de Sangre"
            value={formData.bloodType}
            onChangeText={(value) => handleChange('bloodType', value)}
            leftIcon={
              <Icon
                name="water"
                type="material-community"
                size={24}
                color={COLORS.blue}
              />
            }
            containerStyle={styles.inputContainer}
          />

          <Input
            label="Peso"
            value={formData.weight}
            onChangeText={(value) => handleChange('weight', value)}
            leftIcon={
              <Icon
                name="weight"
                type="material-community"
                size={24}
                color={COLORS.blue}
              />
            }
            containerStyle={styles.inputContainer}
          />

          <Input
            label="Altura"
            value={formData.height}
            onChangeText={(value) => handleChange('height', value)}
            leftIcon={
              <Icon
                name="human-male-height"
                type="material-community"
                size={24}
                color={COLORS.blue}
              />
            }
            containerStyle={styles.inputContainer}
          />

          <Button
            title="Guardar Cambios"
            onPress={handleSave}
            buttonStyle={styles.saveButton}
            containerStyle={styles.saveButtonContainer}
          />
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
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2d3748',
  },
  form: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#4facfe',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 15,
  },
  saveButtonContainer: {
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#4facfe',
    borderRadius: 12,
    paddingVertical: 12,
  },
});

export default EditProfileScreen; 