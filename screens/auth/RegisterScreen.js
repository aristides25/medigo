import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, Input, Button, Icon } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const RegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      // Mostrar error
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      // Mostrar error de contraseñas no coinciden
      return;
    }

    setLoading(true);
    try {
      // Aquí iría la lógica de registro
      // Por ahora solo simulamos un delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigation.replace('Home');
    } catch (error) {
      console.error('Error en registro:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#E8F4F8', '#ffffff']}
        style={styles.gradient}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.header}>
              <Text style={styles.title}>Crear Cuenta</Text>
              <Text style={styles.subtitle}>
                Únete a MEDIGO y comienza a cuidar tu salud
              </Text>
            </View>

            <View style={styles.form}>
              <Input
                placeholder="Nombre completo"
                value={formData.name}
                onChangeText={(value) => updateFormData('name', value)}
                leftIcon={
                  <Icon
                    name="account-outline"
                    type="material-community"
                    size={24}
                    color="#4facfe"
                  />
                }
                containerStyle={styles.inputContainer}
                inputContainerStyle={styles.input}
              />

              <Input
                placeholder="Correo electrónico"
                value={formData.email}
                onChangeText={(value) => updateFormData('email', value)}
                autoCapitalize="none"
                keyboardType="email-address"
                leftIcon={
                  <Icon
                    name="email-outline"
                    type="material-community"
                    size={24}
                    color="#4facfe"
                  />
                }
                containerStyle={styles.inputContainer}
                inputContainerStyle={styles.input}
              />

              <Input
                placeholder="Contraseña"
                value={formData.password}
                onChangeText={(value) => updateFormData('password', value)}
                secureTextEntry={!showPassword}
                leftIcon={
                  <Icon
                    name="lock-outline"
                    type="material-community"
                    size={24}
                    color="#4facfe"
                  />
                }
                rightIcon={
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Icon
                      name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                      type="material-community"
                      size={24}
                      color="#718096"
                    />
                  </TouchableOpacity>
                }
                containerStyle={styles.inputContainer}
                inputContainerStyle={styles.input}
              />

              <Input
                placeholder="Confirmar contraseña"
                value={formData.confirmPassword}
                onChangeText={(value) => updateFormData('confirmPassword', value)}
                secureTextEntry={!showPassword}
                leftIcon={
                  <Icon
                    name="lock-outline"
                    type="material-community"
                    size={24}
                    color="#4facfe"
                  />
                }
                containerStyle={styles.inputContainer}
                inputContainerStyle={styles.input}
              />

              <Button
                title="Registrarse"
                onPress={handleRegister}
                loading={loading}
                buttonStyle={styles.registerButton}
                titleStyle={styles.registerButtonText}
                containerStyle={styles.registerButtonContainer}
              />

              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>¿Ya tienes una cuenta?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.loginLink}>Iniciar Sesión</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  gradient: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
  },
  form: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  inputContainer: {
    paddingHorizontal: 0,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    height: 50,
  },
  registerButtonContainer: {
    marginTop: 16,
  },
  registerButton: {
    backgroundColor: '#4facfe',
    borderRadius: 12,
    height: 50,
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  loginText: {
    color: '#718096',
    fontSize: 14,
  },
  loginLink: {
    color: '#4facfe',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
});

export default RegisterScreen; 