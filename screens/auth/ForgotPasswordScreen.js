import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, Input, Button, Icon } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      // Mostrar error
      return;
    }

    setLoading(true);
    try {
      // Aquí iría la lógica de recuperación de contraseña
      await new Promise(resolve => setTimeout(resolve, 1500));
      setEmailSent(true);
    } catch (error) {
      console.error('Error al enviar email:', error);
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
            <Icon
              name="lock-reset"
              type="material-community"
              size={60}
              color="#4facfe"
            />
            <Text style={styles.title}>Recuperar Contraseña</Text>
            <Text style={styles.subtitle}>
              Ingresa tu correo electrónico y te enviaremos las instrucciones para restablecer tu contraseña
            </Text>
          </View>

          {!emailSent ? (
            <View style={styles.form}>
              <Input
                placeholder="Correo electrónico"
                value={email}
                onChangeText={setEmail}
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

              <Button
                title="Enviar Instrucciones"
                onPress={handleResetPassword}
                loading={loading}
                buttonStyle={styles.resetButton}
                titleStyle={styles.resetButtonText}
                containerStyle={styles.resetButtonContainer}
              />

              <Button
                title="Volver al Inicio de Sesión"
                onPress={() => navigation.goBack()}
                type="clear"
                titleStyle={styles.backButtonText}
                containerStyle={styles.backButtonContainer}
              />
            </View>
          ) : (
            <View style={styles.successContainer}>
              <Icon
                name="email-check"
                type="material-community"
                size={60}
                color="#4facfe"
              />
              <Text style={styles.successTitle}>¡Correo Enviado!</Text>
              <Text style={styles.successText}>
                Hemos enviado las instrucciones para restablecer tu contraseña a {email}
              </Text>
              <Button
                title="Volver al Inicio de Sesión"
                onPress={() => navigation.navigate('Login')}
                buttonStyle={styles.backToLoginButton}
                titleStyle={styles.backToLoginButtonText}
                containerStyle={styles.backToLoginContainer}
              />
            </View>
          )}
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
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2d3748',
    marginTop: 20,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 24,
  },
  form: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  inputContainer: {
    paddingHorizontal: 0,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    height: 50,
  },
  resetButtonContainer: {
    marginBottom: 16,
  },
  resetButton: {
    backgroundColor: '#4facfe',
    borderRadius: 12,
    height: 50,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  backButtonContainer: {
    width: '100%',
  },
  backButtonText: {
    color: '#718096',
    fontSize: 16,
  },
  successContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d3748',
    marginTop: 20,
    marginBottom: 12,
  },
  successText: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  backToLoginContainer: {
    width: '100%',
    maxWidth: 400,
  },
  backToLoginButton: {
    backgroundColor: '#4facfe',
    borderRadius: 12,
    height: 50,
  },
  backToLoginButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ForgotPasswordScreen; 