import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, Alert, ScrollView } from 'react-native';
import { Text, SearchBar, Icon, Badge, Avatar } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../../context/CartContext';

const PHARMACIES = [
  {
    id: '1',
    name: 'Farmacia San José',
    rating: 4.8,
    deliveryTime: '10-25 min',
    deliveryFee: 1.99,
    isOpen: true,
    initial: 'SJ',
    minOrder: 9
  },
  {
    id: '2',
    name: 'Farmacia La Trinidad',
    rating: 4.5,
    deliveryTime: '15-30 min',
    deliveryFee: 2.50,
    isOpen: true,
    initial: 'LT',
    minOrder: 12
  },
  {
    id: '3',
    name: 'Farmacia Santa María',
    rating: 4.7,
    deliveryTime: '20-35 min',
    deliveryFee: 1.75,
    isOpen: false,
    initial: 'SM',
    minOrder: 10
  }
];

const RECOMMENDED_PRODUCTS = [
  {
    id: '1',
    name: 'Paracetamol 500mg',
    price: 12.99,
    quantity: '20 tabletas',
    pricePerUnit: 0.65,
    initial: 'P'
  },
  {
    id: '2',
    name: 'Ibuprofeno 400mg',
    price: 15.99,
    quantity: '30 tabletas',
    pricePerUnit: 0.53,
    initial: 'I'
  },
  {
    id: '3',
    name: 'Vitamina C',
    price: 24.99,
    quantity: '60 tabletas',
    pricePerUnit: 0.42,
    initial: 'V'
  }
];

const BEST_SELLERS = [
  {
    id: '4',
    name: 'Omeprazol 20mg',
    price: 18.99,
    quantity: '14 cápsulas',
    pricePerUnit: 1.36,
    initial: 'O'
  },
  {
    id: '5',
    name: 'Loratadina 10mg',
    price: 14.99,
    quantity: '10 tabletas',
    pricePerUnit: 1.49,
    initial: 'L'
  },
  {
    id: '6',
    name: 'Aspirina 500mg',
    price: 9.99,
    quantity: '20 tabletas',
    pricePerUnit: 0.50,
    initial: 'A'
  }
];

const calculateTotal = (items) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
};

const PharmacyScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const { cartItems = [] } = useCart();
  const [filteredPharmacies, setFilteredPharmacies] = useState(PHARMACIES);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', name: 'Todos', icon: 'apps' },
    { id: 'open', name: 'Abiertos', icon: 'clock-outline' },
    { id: 'rating', name: 'Mejor valorados', icon: 'star-outline' },
    { id: 'delivery', name: 'Menor envío', icon: 'bike' }
  ];

  const handlePharmacySelect = (pharmacy) => {
    if (pharmacy.isOpen) {
      navigation.navigate('PharmacyProducts', { 
        pharmacy,
        screen: 'PharmacyProducts'
      });
    } else {
      Alert.alert(
        'Farmacia Cerrada',
        'Esta farmacia no está disponible en este momento.',
        [{ text: 'Entendido', style: 'default' }]
      );
    }
  };

  const handleSearch = (text) => {
    setSearch(text);
    filterPharmacies(text, selectedFilter);
  };

  const handleFilterSelect = (filterId) => {
    setSelectedFilter(filterId);
    filterPharmacies(search, filterId);
  };

  const filterPharmacies = (searchText, filter) => {
    let filtered = PHARMACIES.filter(pharmacy =>
      pharmacy.name.toLowerCase().includes(searchText.toLowerCase())
    );

    switch (filter) {
      case 'open':
        filtered = filtered.filter(pharmacy => pharmacy.isOpen);
        break;
      case 'rating':
        filtered = filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'delivery':
        filtered = filtered.sort((a, b) => a.deliveryFee - b.deliveryFee);
        break;
    }

    setFilteredPharmacies(filtered);
  };

  const renderPharmacyCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.pharmacyCard}
      onPress={() => handlePharmacySelect(item)}
      activeOpacity={0.7}
    >
      <View style={styles.pharmacyHeader}>
        <Avatar
          size={50}
          rounded
          title={item.initial}
          containerStyle={styles.pharmacyLogo}
          backgroundColor="#2196F3"
        />
        <View style={styles.pharmacyInfo}>
          <Text style={styles.pharmacyName}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <Icon name="star" type="material-community" color="#FFD700" size={16} />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        <View style={item.isOpen ? styles.openBadge : styles.closedBadge}>
          <Text style={item.isOpen ? styles.openText : styles.closedText}>
            {item.isOpen ? 'Abierto' : 'Cerrado'}
          </Text>
        </View>
      </View>

      <View style={styles.deliveryInfo}>
        <View style={styles.infoItem}>
          <Icon name="clock-outline" type="material-community" size={16} color="#666" />
          <Text style={styles.infoText}>{item.deliveryTime}</Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name="bike" type="material-community" size={16} color="#666" />
          <Text style={styles.infoText}>Envío ${item.deliveryFee}</Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name="cart-outline" type="material-community" size={16} color="#666" />
          <Text style={styles.infoText}>Mín. ${item.minOrder}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderFilterItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.filterItem,
        selectedFilter === item.id && styles.filterItemSelected
      ]}
      onPress={() => handleFilterSelect(item.id)}
      activeOpacity={0.7}
    >
      <Icon
        name={item.icon}
        type="material-community"
        size={20}
        color={selectedFilter === item.id ? '#fff' : '#666'}
      />
      <Text style={[
        styles.filterText,
        selectedFilter === item.id && styles.filterTextSelected
      ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.fixedHeader}>
        <View style={styles.headerContainer}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={styles.backButton}
          >
            <Icon name="arrow-left" type="material-community" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Farmacias</Text>
        </View>

        <View style={styles.searchSection}>
          <View style={styles.searchBarContainer}>
            <Icon
              name="magnify"
              type="material-community"
              size={24}
              color="#666"
              style={styles.searchIcon}
            />
            <SearchBar
              placeholder="Buscar farmacias..."
              onChangeText={handleSearch}
              value={search}
              containerStyle={styles.searchContainer}
              inputContainerStyle={styles.searchInputContainer}
              inputStyle={styles.searchInput}
              platform="default"
              searchIcon={null}
              clearIcon={{ size: 20 }}
            />
          </View>

          <FlatList
            data={filters}
            renderItem={renderFilterItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersList}
          />
        </View>
      </View>

      <FlatList
        data={filteredPharmacies}
        renderItem={renderPharmacyCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.pharmaciesList}
        showsVerticalScrollIndicator={false}
        style={styles.pharmaciesListContainer}
      />

      {cartItems && cartItems.length > 0 && (
        <TouchableOpacity 
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart')}
          activeOpacity={0.8}
        >
          <Text style={styles.cartItemCount}>{cartItems.length} producto{cartItems.length > 1 ? 's' : ''}</Text>
          <Text style={styles.cartTotal}>$ {calculateTotal(cartItems)}</Text>
          <Text style={styles.viewCartText}>Ver mi carrito</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fixedHeader: {
    backgroundColor: '#fff',
    zIndex: 1,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  backButton: {
    padding: 8,
  },
  searchSection: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
    height: 48,
    borderWidth: 1,
    borderColor: '#eeeeee',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    padding: 0,
    marginVertical: 0,
  },
  searchInputContainer: {
    backgroundColor: 'transparent',
    borderRadius: 0,
    padding: 0,
    height: 40,
  },
  searchInput: {
    fontSize: 16,
    color: '#333',
  },
  filtersList: {
    paddingVertical: 4,
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#eeeeee',
  },
  filterItemSelected: {
    backgroundColor: '#2196F3',
    borderColor: '#1976D2',
  },
  filterText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  filterTextSelected: {
    color: '#fff',
  },
  pharmaciesListContainer: {
    flex: 1,
    marginTop: 8,
  },
  pharmaciesList: {
    padding: 16,
  },
  pharmacyCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  pharmacyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  pharmacyLogo: {
    marginRight: 12,
  },
  pharmacyInfo: {
    flex: 1,
  },
  pharmacyName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    marginLeft: 4,
    color: '#666',
  },
  openBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  closedBadge: {
    backgroundColor: '#FFEBEE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  openText: {
    color: '#2E7D32',
    fontSize: 12,
    fontWeight: '500',
  },
  closedText: {
    color: '#C62828',
    fontSize: 12,
    fontWeight: '500',
  },
  deliveryInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    marginLeft: 4,
    color: '#666',
    fontSize: 12,
  },
  cartButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#E91E63',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartItemCount: {
    color: '#fff',
    fontSize: 16,
  },
  cartTotal: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  productCard: {
    width: 160,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 120,
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productName: {
    fontSize: 14,
    marginBottom: 4,
  },
  productUnit: {
    fontSize: 12,
    color: '#666',
  },
});

export default PharmacyScreen; 