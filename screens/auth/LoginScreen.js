import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, Input, Button, Icon } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Credenciales de prueba
  const TEST_CREDENTIALS = {
    email: 'usuario@medigo.com',
    password: '123456'
  };

  const handleLogin = async () => {
    setError('');
    
    if (!email || !password) {
      setError('Por favor, completa todos los campos');
      return;
    }

    setLoading(true);
    try {
      // Simulamos verificación de credenciales
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (email === TEST_CREDENTIALS.email && password === TEST_CREDENTIALS.password) {
        navigation.replace('Home');
      } else {
        setError('Credenciales inválidas. Usa:\nEmail: usuario@medigo.com\nContraseña: 123456');
      }
    } catch (error) {
      console.error('Error en login:', error);
      setError('Error al iniciar sesión. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#E8F4F8', '#ffffff']}
        style={styles.gradient}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.content}
        >
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Icon
                name="medical-services"
                type="material"
                size={80}
                color="#718096"
              />
            </View>
            <Text style={styles.subtitle}>Tu salud en buenas manos</Text>
          </View>

          <View style={styles.form}>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            
            <Input
              placeholder="Correo electrónico"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setError('');
              }}
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
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setError('');
              }}
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

            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}
              style={styles.forgotPassword}
            >
              <Text style={styles.forgotPasswordText}>
                ¿Olvidaste tu contraseña?
              </Text>
            </TouchableOpacity>

            <Button
              title="Iniciar Sesión"
              onPress={handleLogin}
              loading={loading}
              buttonStyle={styles.loginButton}
              titleStyle={styles.loginButtonText}
              containerStyle={styles.loginButtonContainer}
            />

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>O</Text>
              <View style={styles.divider} />
            </View>

            <Button
              title="Registrarse"
              onPress={() => navigation.navigate('Register')}
              type="outline"
              buttonStyle={styles.registerButton}
              titleStyle={styles.registerButtonText}
              containerStyle={styles.registerButtonContainer}
            />
          </View>
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
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    paddingTop: 20,
  },
  logoContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#f8fafc',
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  logo: {
    width: '100%',
    height: '100%',
    tintColor: '#718096',
  },
  subtitle: {
    fontSize: 18,
    color: '#718096',
    marginTop: 10,
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#4facfe',
    fontSize: 14,
  },
  loginButtonContainer: {
    marginBottom: 16,
  },
  loginButton: {
    backgroundColor: '#4facfe',
    borderRadius: 12,
    height: 50,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#e2e8f0',
  },
  dividerText: {
    color: '#718096',
    paddingHorizontal: 16,
    fontSize: 14,
  },
  registerButtonContainer: {
    width: '100%',
  },
  registerButton: {
    borderColor: '#4facfe',
    borderWidth: 2,
    borderRadius: 12,
    height: 50,
  },
  registerButtonText: {
    color: '#4facfe',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 14,
    lineHeight: 20,
  },
});

export default LoginScreen; 