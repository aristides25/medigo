import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { Text, Card, Rating, Button, Input, CheckBox } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRating } from '../../context/RatingContext';

const PostAppointmentReviewScreen = ({ route, navigation }) => {
  const { appointment } = route.params;
  const { createRating, loading } = useRating();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [aspects, setAspects] = useState({
    punctuality: true,
    cleanliness: true,
    communication: true,
    professionalism: true
  });

  const handleSubmit = async () => {
    try {
      const reviewData = {
        appointmentId: appointment.id,
        providerId: appointment.provider.id,
        rating,
        aspects,
        comment,
      };

      await createRating(reviewData);
      
      Alert.alert(
        '¡Gracias por tu calificación!',
        'Tu opinión nos ayuda a mejorar el servicio.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Appointments')
          }
        ]
      );
    } catch (error) {
      Alert.alert(
        'Error',
        'No se pudo enviar tu calificación. Por favor, intenta de nuevo.',
        [{ text: 'OK' }]
      );
    }
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
              imageSize={30}
            />
          </View>

          <View style={styles.aspectsSection}>
            <Text style={styles.sectionTitle}>Aspectos Destacados</Text>
            <CheckBox
              title="Puntualidad"
              checked={aspects.punctuality}
              onPress={() => setAspects({...aspects, punctuality: !aspects.punctuality})}
              containerStyle={styles.checkbox}
            />
            <CheckBox
              title="Limpieza e Higiene"
              checked={aspects.cleanliness}
              onPress={() => setAspects({...aspects, cleanliness: !aspects.cleanliness})}
              containerStyle={styles.checkbox}
            />
            <CheckBox
              title="Comunicación Clara"
              checked={aspects.communication}
              onPress={() => setAspects({...aspects, communication: !aspects.communication})}
              containerStyle={styles.checkbox}
            />
            <CheckBox
              title="Profesionalismo"
              checked={aspects.professionalism}
              onPress={() => setAspects({...aspects, professionalism: !aspects.professionalism})}
              containerStyle={styles.checkbox}
            />
          </View>

          <View style={styles.commentSection}>
            <Text style={styles.sectionTitle}>Comentarios (Opcional)</Text>
            <Input
              placeholder="Comparte tu experiencia..."
              value={comment}
              onChangeText={setComment}
              multiline
              numberOfLines={4}
              containerStyle={styles.commentInput}
            />
          </View>

          <Button
            title="Enviar Calificación"
            onPress={handleSubmit}
            buttonStyle={styles.submitButton}
            loading={loading}
            disabled={loading}
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
    padding: 8,
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