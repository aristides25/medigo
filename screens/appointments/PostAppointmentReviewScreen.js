import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, Rating, Button, Input, CheckBox } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';

const PostAppointmentReviewScreen = ({ route, navigation }) => {
  const { appointment } = route.params;
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [punctuality, setPunctuality] = useState(true);
  const [cleanliness, setCleanliness] = useState(true);
  const [communication, setCommunication] = useState(true);

  const handleSubmit = () => {
    // Aquí se manejaría la lógica para guardar la reseña
    // Por ahora solo navegamos de vuelta
    navigation.navigate('Appointments', {
      message: '¡Gracias por tu reseña!'
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Card>
          <Card.Title>Califica tu Experiencia</Card.Title>
          <Card.Divider />
          
          <View style={styles.providerInfo}>
            <Text style={styles.providerName}>{appointment.provider.name}</Text>
            <Text style={styles.appointmentDate}>
              Cita del {new Date(appointment.date).toLocaleDateString()}
            </Text>
          </View>

          <View style={styles.ratingSection}>
            <Text style={styles.sectionTitle}>Calificación General</Text>
            <Rating
              showRating
              onFinishRating={setRating}
              style={styles.rating}
              startingValue={rating}
            />
          </View>

          <View style={styles.aspectsSection}>
            <Text style={styles.sectionTitle}>Aspectos del Servicio</Text>
            <CheckBox
              title="Puntualidad"
              checked={punctuality}
              onPress={() => setPunctuality(!punctuality)}
              containerStyle={styles.checkbox}
            />
            <CheckBox
              title="Limpieza e Higiene"
              checked={cleanliness}
              onPress={() => setCleanliness(!cleanliness)}
              containerStyle={styles.checkbox}
            />
            <CheckBox
              title="Comunicación Clara"
              checked={communication}
              onPress={() => setCommunication(!communication)}
              containerStyle={styles.checkbox}
            />
          </View>

          <View style={styles.commentSection}>
            <Text style={styles.sectionTitle}>Tu Opinión</Text>
            <Input
              placeholder="Comparte los detalles de tu experiencia..."
              value={comment}
              onChangeText={setComment}
              multiline
              numberOfLines={4}
              containerStyle={styles.commentInput}
            />
          </View>

          <Button
            title="Enviar Reseña"
            onPress={handleSubmit}
            buttonStyle={styles.submitButton}
            disabled={!comment.trim()}
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  providerInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  providerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
  },
  appointmentDate: {
    color: '#666',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 10,
  },
  ratingSection: {
    marginBottom: 20,
  },
  rating: {
    paddingVertical: 10,
  },
  aspectsSection: {
    marginBottom: 20,
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  commentSection: {
    marginBottom: 20,
  },
  commentInput: {
    paddingHorizontal: 0,
  },
  submitButton: {
    backgroundColor: '#0077B6',
    borderRadius: 10,
    paddingVertical: 12,
  },
});

export default PostAppointmentReviewScreen; 