import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, SearchBar, Button, Card, Icon, Badge } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CATEGORIES } from '../../constants/pharmacy/products';

const PharmacyScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');

  const quickActions = [
    {
      id: 1,
      title: 'Subir Receta',
      icon: 'file-upload',
      route: 'UploadPrescription',
      description: 'Sube tu receta médica',
    },
    {
      id: 2,
      title: 'Mis Recetas',
      icon: 'file-document',
      route: 'MyPrescriptions',
      description: 'Ver recetas activas',
    },
    {
      id: 3,
      title: 'Mis Pedidos',
      icon: 'package-variant',
      route: 'MyOrders',
      description: 'Historial de pedidos',
    },
  ];

  const handleSearch = () => {
    if (search.trim()) {
      navigation.navigate('CategoryProducts', {
        category: { name: 'Todos' },
        searchQuery: search,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header con búsqueda */}
        <View style={styles.header}>
          <SearchBar
            placeholder="Buscar medicamentos, productos..."
            onChangeText={setSearch}
            value={search}
            platform="android"
            containerStyle={styles.searchContainer}
            inputContainerStyle={styles.searchInputContainer}
            lightTheme
            round
            onSubmitEditing={handleSearch}
          />
        </View>

        {/* Acciones Rápidas */}
        <View style={styles.quickActionsContainer}>
          {quickActions.map((action) => (
            <Card key={action.id} containerStyle={styles.quickActionCard}>
              <View style={styles.quickActionContent}>
                <Icon
                  name={action.icon}
                  type="material-community"
                  size={32}
                  color="#0077B6"
                />
                <Text style={styles.quickActionTitle}>{action.title}</Text>
                <Text style={styles.quickActionDescription}>
                  {action.description}
                </Text>
                <Button
                  title="Acceder"
                  onPress={() => navigation.navigate(action.route)}
                  buttonStyle={styles.actionButton}
                />
              </View>
            </Card>
          ))}
        </View>

        {/* Categorías */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categorías</Text>
          <View style={styles.categoriesGrid}>
            {CATEGORIES.map((category) => (
              <TouchableOpacity 
                key={category.id}
                onPress={() => navigation.navigate('CategoryProducts', { category })}
                style={styles.categoryWrapper}
              >
                <Card containerStyle={styles.categoryCard}>
                  <View style={styles.categoryContent}>
                    <Icon
                      name={category.icon}
                      type="material-community"
                      size={30}
                      color="#0077B6"
                    />
                    <Text style={styles.categoryName}>{category.name}</Text>
                    <Badge
                      value={category.count}
                      status="primary"
                      containerStyle={styles.badge}
                    />
                  </View>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    padding: 15,
  },
  searchInputContainer: {
    backgroundColor: '#f5f5f5',
  },
  quickActionsContainer: {
    padding: 15,
  },
  quickActionCard: {
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
  },
  quickActionContent: {
    alignItems: 'center',
  },
  quickActionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#444',
  },
  quickActionDescription: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 10,
  },
  actionButton: {
    borderRadius: 25,
    paddingHorizontal: 30,
    backgroundColor: '#0077B6',
    marginTop: 10,
  },
  categoriesSection: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#444',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryWrapper: {
    width: '48%',
    marginBottom: 10,
  },
  categoryCard: {
    width: '100%',
    borderRadius: 10,
    padding: 10,
    margin: 0,
  },
  categoryContent: {
    alignItems: 'center',
    padding: 10,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 5,
    textAlign: 'center',
    color: '#444',
  },
  badge: {
    marginTop: 5,
  },
});

export default PharmacyScreen; 