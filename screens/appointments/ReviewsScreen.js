import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, Rating, Button, Input, Avatar, Divider } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';

// Datos de ejemplo
const MOCK_REVIEWS = [
  {
    id: 1,
    userName: 'María G.',
    rating: 5,
    date: '2024-01-20',
    comment: 'Excelente atención, muy profesional y puntual.',
    avatar: 'MG',
  },
  {
    id: 2,
    userName: 'Carlos R.',
    rating: 4,
    date: '2024-01-18',
    comment: 'Buena experiencia en general, recomendado.',
    avatar: 'CR',
  },
  {
    id: 3,
    userName: 'Ana P.',
    rating: 5,
    date: '2024-01-15',
    comment: 'Muy buen trato y explicación detallada del tratamiento.',
    avatar: 'AP',
  },
];

const ReviewsScreen = ({ route, navigation }) => {
  const { provider } = route.params;
  const [newRating, setNewRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState(MOCK_REVIEWS);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleSubmitReview = () => {
    if (comment.trim()) {
      const newReview = {
        id: reviews.length + 1,
        userName: 'Usuario',
        rating: newRating,
        date: new Date().toISOString().split('T')[0],
        comment: comment.trim(),
        avatar: 'U',
      };

      setReviews([newReview, ...reviews]);
      setComment('');
      setNewRating(5);
      setShowReviewForm(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Resumen de Calificaciones */}
        <Card>
          <View style={styles.ratingHeader}>
            <Text style={styles.providerName}>{provider.name}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingNumber}>{provider.rating}</Text>
              <Rating
                readonly
                startingValue={provider.rating}
                imageSize={20}
              />
              <Text style={styles.reviewCount}>({provider.reviewCount} reseñas)</Text>
            </View>
          </View>
        </Card>

        {/* Botón para Agregar Reseña */}
        {!showReviewForm && (
          <Button
            title="Escribir una Reseña"
            onPress={() => setShowReviewForm(true)}
            buttonStyle={styles.addReviewButton}
            containerStyle={styles.addReviewButtonContainer}
          />
        )}

        {/* Formulario de Reseña */}
        {showReviewForm && (
          <Card>
            <Card.Title>Tu Reseña</Card.Title>
            <View style={styles.reviewForm}>
              <Rating
                showRating
                onFinishRating={setNewRating}
                style={styles.rating}
                startingValue={newRating}
              />
              <Input
                placeholder="Comparte tu experiencia..."
                value={comment}
                onChangeText={setComment}
                multiline
                numberOfLines={4}
                containerStyle={styles.commentInput}
              />
              <View style={styles.buttonContainer}>
                <Button
                  title="Cancelar"
                  onPress={() => setShowReviewForm(false)}
                  buttonStyle={styles.cancelButton}
                  containerStyle={styles.actionButton}
                />
                <Button
                  title="Publicar"
                  onPress={handleSubmitReview}
                  disabled={!comment.trim()}
                  buttonStyle={styles.submitButton}
                  containerStyle={styles.actionButton}
                />
              </View>
            </View>
          </Card>
        )}

        {/* Lista de Reseñas */}
        <Card>
          <Card.Title>Reseñas</Card.Title>
          {reviews.map((review, index) => (
            <View key={review.id}>
              {index > 0 && <Divider style={styles.reviewDivider} />}
              <View style={styles.review}>
                <View style={styles.reviewHeader}>
                  <Avatar
                    rounded
                    title={review.avatar}
                    containerStyle={styles.avatar}
                  />
                  <View style={styles.reviewHeaderText}>
                    <Text style={styles.userName}>{review.userName}</Text>
                    <Text style={styles.reviewDate}>{review.date}</Text>
                  </View>
                </View>
                <Rating
                  readonly
                  startingValue={review.rating}
                  imageSize={16}
                  style={styles.reviewRating}
                />
                <Text style={styles.reviewComment}>{review.comment}</Text>
              </View>
            </View>
          ))}
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
  ratingHeader: {
    alignItems: 'center',
  },
  providerName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ratingContainer: {
    alignItems: 'center',
  },
  ratingNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#0077B6',
    marginBottom: 5,
  },
  reviewCount: {
    color: '#666',
    marginTop: 5,
  },
  addReviewButtonContainer: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
  addReviewButton: {
    backgroundColor: '#0077B6',
    borderRadius: 10,
    paddingVertical: 12,
  },
  reviewForm: {
    alignItems: 'center',
  },
  rating: {
    paddingVertical: 10,
  },
  commentInput: {
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  actionButton: {
    width: '48%',
  },
  submitButton: {
    backgroundColor: '#0077B6',
    borderRadius: 10,
  },
  cancelButton: {
    backgroundColor: '#666',
    borderRadius: 10,
  },
  review: {
    marginVertical: 10,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    backgroundColor: '#0077B6',
  },
  reviewHeaderText: {
    marginLeft: 10,
  },
  userName: {
    fontWeight: 'bold',
  },
  reviewDate: {
    color: '#666',
    fontSize: 12,
  },
  reviewRating: {
    alignItems: 'flex-start',
    marginVertical: 5,
  },
  reviewComment: {
    color: '#444',
    lineHeight: 20,
  },
  reviewDivider: {
    marginVertical: 15,
  },
});

export default ReviewsScreen; 