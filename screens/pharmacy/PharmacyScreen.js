import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { Text, SearchBar, Icon, Badge } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CATEGORIES, PRODUCTS } from '../../constants/pharmacy/products';

const PHARMACIES = [
  { id: 1, name: 'Farmacia San José', rating: 4.8, isOpen: true },
  { id: 2, name: 'Farmatodo Las Mercedes', rating: 4.5, isOpen: true },
  { id: 3, name: 'Farmacia La Trinidad', rating: 4.7, isOpen: false },
  { id: 4, name: 'Farmacia El Cafetal', rating: 4.6, isOpen: true },
  { id: 5, name: 'Locatel Santa Paula', rating: 4.4, isOpen: true },
];

const PharmacyScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const cartItemsCount = 3; // Este valor vendría de tu contexto de carrito

  const renderProduct = ({ item }) => {
    // Encontrar la disponibilidad para la farmacia seleccionada
    const pharmacyAvailability = selectedPharmacy 
      ? item.availability.find(a => a.pharmacyId === `ph${selectedPharmacy.id}`)
      : item.availability[0];

    if (!pharmacyAvailability) return null;

    return (
      <TouchableOpacity 
        style={styles.productCard}
        onPress={() => navigation.navigate('ProductDetail', { 
          product: item,
          preselectedPharmacy: selectedPharmacy,
          pharmacyAvailability: pharmacyAvailability
        })}
      >
        <Image
          source={item.image}
          style={styles.productImage}
          resizeMode="contain"
        />
        <View style={styles.productTypeTag}>
          <Text style={styles.productTypeText}>{item.type}</Text>
        </View>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>Desde ${pharmacyAvailability.price}</Text>
      </TouchableOpacity>
    );
  };

  const filteredProducts = PRODUCTS.filter(product => {
    let matchesCategory = true;
    let matchesSearch = true;
    let matchesPharmacy = true;

    if (selectedCategory) {
      matchesCategory = product.category === selectedCategory.name;
    }

    if (search) {
      matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    }

    if (selectedPharmacy) {
      // Verificar si el producto está disponible en la farmacia seleccionada
      matchesPharmacy = product.availability.some(
        a => a.pharmacyId === `ph${selectedPharmacy.id}` && a.stock > 0
      );
    }

    return matchesCategory && matchesSearch && matchesPharmacy;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <SearchBar
          placeholder="Buscar productos..."
          onChangeText={setSearch}
          value={search}
          containerStyle={styles.searchContainer}
          inputContainerStyle={styles.searchInputContainer}
          inputStyle={{ fontSize: 14 }}
          searchIcon={{ size: 24, color: '#2A5C82' }}
          platform="default"
          round
          lightTheme
        />
        <TouchableOpacity 
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart')}
        >
          <Icon
            name="cart"
            type="material-community"
            color="#FFFFFF"
            size={24}
          />
          {cartItemsCount > 0 && (
            <Badge
              value={cartItemsCount}
              status="error"
              containerStyle={styles.badge}
            />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Categorías - Lista horizontal */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categorías</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {CATEGORIES.map(category => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryItem,
                  selectedCategory?.id === category.id && styles.selectedItem
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Icon
                  name={category.icon}
                  type="material-community"
                  color={selectedCategory?.id === category.id ? '#2A5C82' : '#666666'}
                  size={24}
                />
                <Text 
                  style={[
                    styles.categoryName,
                    selectedCategory?.id === category.id && { color: '#2A5C82', fontWeight: '500' }
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Farmacias - Lista horizontal */}
        <View style={styles.pharmaciesSection}>
          <Text style={styles.sectionTitle}>Farmacias</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.pharmaciesContainer}
          >
            {PHARMACIES.map(pharmacy => (
              <TouchableOpacity
                key={pharmacy.id}
                style={[
                  styles.pharmacyItem,
                  selectedPharmacy?.id === pharmacy.id && styles.selectedItem
                ]}
                onPress={() => setSelectedPharmacy(pharmacy)}
              >
                <Text style={styles.pharmacyName}>{pharmacy.name}</Text>
                <View style={styles.pharmacyInfo}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name="star" type="material-community" color="#FFD700" size={18} />
                    <Text style={styles.pharmacyRating}>{pharmacy.rating}</Text>
                  </View>
                  {pharmacy.isOpen && (
                    <View style={styles.openBadge}>
                      <Text style={styles.openBadgeText}>Abierto</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Productos - Grid */}
        <View style={styles.productsSection}>
          <Text style={styles.sectionTitle}>
            {selectedCategory ? selectedCategory.name : 'Todos los productos'}
            {selectedPharmacy ? ` en ${selectedPharmacy.name}` : ''}
          </Text>
          <FlatList
            data={filteredProducts}
            renderItem={renderProduct}
            keyExtractor={item => item.id}
            numColumns={2}
            contentContainerStyle={styles.productsList}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A5C82',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A5C82',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  searchContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    padding: 0,
    marginRight: 8,
    height: 50,
  },
  searchInputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    height: 40,
  },
  cartButton: {
    padding: 8,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
  },
  content: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2A5C82',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  // Estilos para la sección de categorías
  categoriesSection: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
  },
  categoriesContainer: {
    paddingHorizontal: 12,
  },
  categoryItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    marginHorizontal: 6,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: 100,
  },
  categoryName: {
    marginTop: 8,
    fontSize: 12,
    color: '#333333',
    textAlign: 'center',
  },
  // Estilos para la sección de farmacias
  pharmaciesSection: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    marginTop: 8,
  },
  pharmaciesContainer: {
    paddingHorizontal: 12,
  },
  pharmacyItem: {
    padding: 12,
    marginHorizontal: 6,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: 200,
  },
  pharmacyName: {
    fontSize: 14,
    marginBottom: 8,
    color: '#333333',
    fontWeight: '500',
  },
  pharmacyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pharmacyRating: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  // Estilos para la sección de productos
  productsSection: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 8,
    paddingTop: 12,
  },
  productCard: {
    flex: 1,
    margin: 6,
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 120,
    marginBottom: 8,
    borderRadius: 4,
    backgroundColor: '#f5f5f5',
  },
  productTypeTag: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#2A5C82',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  productTypeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '500',
  },
  productName: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 8,
    fontWeight: '500',
  },
  productPrice: {
    fontSize: 16,
    color: '#28A745',
    fontWeight: 'bold',
  },
  productsList: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  selectedItem: {
    borderColor: '#2A5C82',
    borderWidth: 2,
  },
  openBadge: {
    backgroundColor: '#C8E6C9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  openBadgeText: {
    color: '#1B5E20',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default PharmacyScreen; 