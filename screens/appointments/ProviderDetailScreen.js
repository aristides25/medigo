import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Text, Button, Icon, Avatar, Divider, Rating } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

// Constantes de diseño (mantener consistencia)
const SPACING = 8;
const COLORS = {
  primary: '#0077B6',
  primaryLight: '#E1F5FE',
  success: '#4CAF50',
  warning: '#FFC107',
  danger: '#F44336',
  grey: '#757575',
  white: '#FFFFFF',
  background: '#F5F7FA',
  cardBg: 'rgba(255, 255, 255, 0.95)',
};

// Datos de ejemplo del doctor
const DOCTOR_DATA = {
  id: '1',
  name: 'Dr. Juan Pérez',
  specialty: 'Medicina General',
  rating: 4.8,
  reviews: 124,
  experience: '15 años',
  education: 'Universidad Central de Venezuela',
  description: 'Especialista en medicina familiar con amplia experiencia en atención primaria y preventiva. Enfoque integral en la salud del paciente.',
  languages: ['Español', 'Inglés'],
  location: 'Clínica Santa María, Caracas',
  price: 50,
  availability: [
    { day: 'Lunes', hours: '9:00 AM - 5:00 PM' },
    { day: 'Martes', hours: '9:00 AM - 5:00 PM' },
    { day: 'Miércoles', hours: '9:00 AM - 5:00 PM' },
    { day: 'Jueves', hours: '9:00 AM - 5:00 PM' },
    { day: 'Viernes', hours: '9:00 AM - 3:00 PM' },
  ]
};

const ProviderDetailScreen = ({ navigation }) => {
  const [selectedDay, setSelectedDay] = useState(null);

  const handleBookAppointment = () => {
    navigation.navigate('BookAppointment', { doctorId: DOCTOR_DATA.id });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={[COLORS.primaryLight, COLORS.background]}
          style={styles.headerGradient}
        >
          <View style={styles.profileHeader}>
            <Avatar
              size={100}
              rounded
              title={DOCTOR_DATA.name.charAt(0)}
              containerStyle={styles.avatar}
              overlayContainerStyle={{ backgroundColor: COLORS.primary }}
            />
            <Text style={styles.doctorName}>{DOCTOR_DATA.name}</Text>
            <Text style={styles.specialty}>{DOCTOR_DATA.specialty}</Text>
            <View style={styles.ratingContainer}>
              <Rating
                readonly
                startingValue={DOCTOR_DATA.rating}
                imageSize={20}
                style={styles.rating}
              />
              <Text style={styles.reviews}>
                {DOCTOR_DATA.rating} ({DOCTOR_DATA.reviews} reseñas)
              </Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Icon
                name="briefcase-outline"
                type="material-community"
                size={24}
                color={COLORS.primary}
              />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Experiencia</Text>
                <Text style={styles.infoValue}>{DOCTOR_DATA.experience}</Text>
              </View>
            </View>

            <Divider style={styles.divider} />

            <View style={styles.infoRow}>
              <Icon
                name="school-outline"
                type="material-community"
                size={24}
                color={COLORS.primary}
              />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Educación</Text>
                <Text style={styles.infoValue}>{DOCTOR_DATA.education}</Text>
              </View>
            </View>

            <Divider style={styles.divider} />

            <View style={styles.infoRow}>
              <Icon
                name="translate"
                type="material-community"
                size={24}
                color={COLORS.primary}
              />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Idiomas</Text>
                <Text style={styles.infoValue}>{DOCTOR_DATA.languages.join(', ')}</Text>
              </View>
            </View>
          </View>

          <View style={styles.descriptionCard}>
            <Text style={styles.sectionTitle}>Acerca del Doctor</Text>
            <Text style={styles.description}>{DOCTOR_DATA.description}</Text>
          </View>

          <View style={styles.locationCard}>
            <Text style={styles.sectionTitle}>Ubicación</Text>
            <View style={styles.locationRow}>
              <Icon
                name="map-marker-outline"
                type="material-community"
                size={24}
                color={COLORS.primary}
              />
              <Text style={styles.locationText}>{DOCTOR_DATA.location}</Text>
            </View>
          </View>

          <View style={styles.availabilityCard}>
            <Text style={styles.sectionTitle}>Disponibilidad</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.daysScroll}
            >
              {DOCTOR_DATA.availability.map((slot, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dayCard,
                    selectedDay === index && styles.selectedDayCard
                  ]}
                  onPress={() => setSelectedDay(index)}
                >
                  <Text style={[
                    styles.dayText,
                    selectedDay === index && styles.selectedDayText
                  ]}>
                    {slot.day}
                  </Text>
                  <Text style={[
                    styles.hoursText,
                    selectedDay === index && styles.selectedHoursText
                  ]}>
                    {slot.hours}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Consulta desde</Text>
          <Text style={styles.price}>${DOCTOR_DATA.price}</Text>
        </View>
        <Button
          title="Agendar Cita"
          onPress={handleBookAppointment}
          buttonStyle={styles.bookButton}
          titleStyle={styles.bookButtonText}
          icon={{
            name: 'calendar-check',
            type: 'material-community',
            size: 20,
            color: COLORS.white
          }}
          iconRight
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
  },
  headerGradient: {
    paddingVertical: SPACING * 4,
  },
  profileHeader: {
    alignItems: 'center',
  },
  avatar: {
    marginBottom: SPACING * 2,
  },
  doctorName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING,
  },
  specialty: {
    fontSize: 16,
    color: COLORS.grey,
    marginBottom: SPACING * 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginRight: SPACING,
  },
  reviews: {
    fontSize: 14,
    color: COLORS.grey,
  },
  infoSection: {
    padding: SPACING * 2,
  },
  infoCard: {
    backgroundColor: COLORS.white,
    borderRadius: SPACING * 2,
    padding: SPACING * 2,
    marginBottom: SPACING * 2,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING,
  },
  infoTextContainer: {
    marginLeft: SPACING * 2,
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: COLORS.grey,
    marginBottom: SPACING / 2,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
  },
  divider: {
    marginVertical: SPACING,
  },
  descriptionCard: {
    backgroundColor: COLORS.white,
    borderRadius: SPACING * 2,
    padding: SPACING * 2,
    marginBottom: SPACING * 2,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: SPACING * 2,
  },
  description: {
    fontSize: 14,
    color: COLORS.grey,
    lineHeight: 22,
  },
  locationCard: {
    backgroundColor: COLORS.white,
    borderRadius: SPACING * 2,
    padding: SPACING * 2,
    marginBottom: SPACING * 2,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: COLORS.grey,
    marginLeft: SPACING,
    flex: 1,
  },
  availabilityCard: {
    backgroundColor: COLORS.white,
    borderRadius: SPACING * 2,
    padding: SPACING * 2,
    marginBottom: SPACING * 2,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  daysScroll: {
    flexGrow: 0,
  },
  dayCard: {
    backgroundColor: COLORS.background,
    borderRadius: SPACING,
    padding: SPACING * 2,
    marginRight: SPACING,
    minWidth: 120,
    alignItems: 'center',
  },
  selectedDayCard: {
    backgroundColor: COLORS.primary,
  },
  dayText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: SPACING,
  },
  selectedDayText: {
    color: COLORS.white,
  },
  hoursText: {
    fontSize: 14,
    color: COLORS.grey,
  },
  selectedHoursText: {
    color: COLORS.white,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING * 2,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 12,
    color: COLORS.grey,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  bookButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SPACING * 3,
    paddingVertical: SPACING * 1.5,
    paddingHorizontal: SPACING * 3,
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: SPACING,
  },
});

export default ProviderDetailScreen; 