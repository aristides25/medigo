import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text, Avatar } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, THEME } from '../../constants';

const ProfileScreen = () => {
  const renderInfoItem = (icon, label, value) => (
    <View style={styles.infoItem}>
      <View style={styles.iconContainer}>
        <Icon name={icon} size={24} color={COLORS.blue} />
      </View>
      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.profileCard}>
          <View style={styles.avatarSection}>
            <Avatar
              size={100}
              rounded
              icon={{ name: 'camera', type: 'material-community' }}
              containerStyle={styles.avatar}
            />
            <Text style={styles.name}>José Daniel</Text>
            <Text style={styles.email}>jose.daniel@email.com</Text>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Editar Perfil</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Información Personal</Text>
          {renderInfoItem('phone', 'Teléfono', '+507 6123-4567')}
          {renderInfoItem('water', 'Tipo de Sangre', 'O+')}
          {renderInfoItem('weight', 'Peso', '75 kg')}
          {renderInfoItem('human-male-height', 'Altura', '175 cm')}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.lightestBlue,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  profileCard: {
    backgroundColor: COLORS.white,
    borderRadius: 25,
    padding: 20,
    marginBottom: 20,
    ...THEME.shadow.medium,
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatar: {
    backgroundColor: COLORS.lighterBlue,
    borderWidth: 4,
    borderColor: COLORS.lightBlue,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.black,
    marginTop: 15,
  },
  email: {
    fontSize: 16,
    color: COLORS.gray,
    marginTop: 5,
  },
  editButton: {
    backgroundColor: COLORS.blue,
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 20,
    marginTop: 20,
    ...THEME.shadow.light,
  },
  editButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  infoSection: {
    backgroundColor: COLORS.white,
    borderRadius: 25,
    padding: 20,
    ...THEME.shadow.medium,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.black,
    marginBottom: 20,
    paddingLeft: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightestBlue,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.lightestBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: '600',
  },
});

export default ProfileScreen; 