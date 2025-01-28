import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Text, SearchBar, Icon, Avatar, Button } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../../context/CartContext';

const CATEGORIES = [
  { id: '1', name: 'Analgésicos', icon: 'pill' },
  { id: '2', name: 'Antibióticos', icon: 'medication' },
  { id: '3', name: 'Vitaminas', icon: 'vitamin' },
  { id: '4', name: 'Cuidado Personal', icon: 'face-man' },
  { id: '5', name: 'Primeros Auxilios', icon: 'medical-bag' },
  { id: '6', name: 'Dermatológicos', icon: 'bandage' },
  { id: '7', name: 'Gripe y Tos', icon: 'virus' },
  { id: '8', name: 'Digestivos', icon: 'stomach' }
];

const PRODUCTS = [
  {
    id: '1',
    name: 'Paracetamol 500mg',
    price: 12.99,
    quantity: '20 tabletas',
    pricePerUnit: 0.65,
    initial: 'P',
    category: '1',
    description: 'Analgésico y antipirético'
  },
  {
    id: '2',
    name: 'Amoxicilina 500mg',
    price: 25.99,
    quantity: '15 cápsulas',
    pricePerUnit: 1.73,
    initial: 'A',
    category: '2',
    description: 'Antibiótico de amplio espectro'
  },
  {
    id: '3',
    name: 'Vitamina C 1000mg',
    price: 18.99,
    quantity: '30 tabletas',
    pricePerUnit: 0.63,
    initial: 'V',
    category: '3',
    description: 'Suplemento vitamínico'
  },
  {
    id: '4',
    name: 'Protector Solar SPF50',
    price: 29.99,
    quantity: '120ml',
    pricePerUnit: 0.25,
    initial: 'P',
    category: '4',
    description: 'Protección UVA/UVB'
  },
  {
    id: '5',
    name: 'Vendas Elásticas',
    price: 8.99,
    quantity: '2 unidades',
    pricePerUnit: 4.50,
    initial: 'V',
    category: '5',
    description: 'Para lesiones y torceduras'
  },
  {
    id: '6',
    name: 'Crema Hidratante',
    price: 15.99,
    quantity: '200ml',
    pricePerUnit: 0.08,
    initial: 'C',
    category: '6',
    description: 'Para piel seca'
  },
  {
    id: '7',
    name: 'Jarabe para la Tos',
    price: 13.99,
    quantity: '120ml',
    pricePerUnit: 0.12,
    initial: 'J',
    category: '7',
    description: 'Alivia la tos seca'
  },
  {
    id: '8',
    name: 'Omeprazol 20mg',
    price: 19.99,
    quantity: '14 cápsulas',
    pricePerUnit: 1.43,
    initial: 'O',
    category: '8',
    description: 'Para acidez estomacal'
  },
  {
    id: '9',
    name: 'Ibuprofeno 400mg',
    price: 14.99,
    quantity: '30 tabletas',
    pricePerUnit: 0.50,
    initial: 'I',
    category: '1',
    description: 'Antiinflamatorio'
  },
  {
    id: '10',
    name: 'Complejo B',
    price: 22.99,
    quantity: '60 tabletas',
    pricePerUnit: 0.38,
    initial: 'B',
    category: '3',
    description: 'Vitaminas del complejo B'
  }
];

const calculateTotal = (items) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
};

const PharmacyProductsScreen = ({ route, navigation }) => {
  const { pharmacy } = route.params;
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { cartItems = [], addToCart } = useCart();

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory.id : true;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
  };

  const renderProductCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { 
        product: item,
        pharmacy: pharmacy
      })}
    >
      <Avatar
        size={100}
        title={item.initial}
        containerStyle={styles.productImage}
        backgroundColor="#E8EAF6"
        titleStyle={{ color: '#3F51B5' }}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <Text style={styles.productUnit}>{item.quantity} · ${item.pricePerUnit}/un</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.productPrice}>$ {item.price}</Text>
          <Button
            title="Agregar"
            buttonStyle={styles.addButton}
            titleStyle={styles.addButtonText}
            icon={<Icon name="plus" type="material-community" size={16} color="#FFF" />}
            onPress={() => handleAddToCart(item)}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" type="material-community" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.pharmacyInfo}>
          <Text style={styles.pharmacyName}>{pharmacy.name}</Text>
          <View style={styles.pharmacyDetails}>
            <Icon name="clock-outline" type="material-community" size={16} color="#666" />
            <Text style={styles.pharmacyText}>{pharmacy.deliveryTime}</Text>
            <Icon name="bike" type="material-community" size={16} color="#666" style={styles.detailIcon} />
            <Text style={styles.pharmacyText}>Envío ${pharmacy.deliveryFee}</Text>
          </View>
        </View>
      </View>

      <SearchBar
        placeholder="Buscar productos..."
        onChangeText={setSearch}
        value={search}
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.searchInputContainer}
        inputStyle={styles.searchInput}
        searchIcon={{ size: 24, color: '#666' }}
        platform="default"
        round
        lightTheme
      />

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        {CATEGORIES.map(category => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryItem,
              selectedCategory?.id === category.id && styles.selectedCategory
            ]}
            onPress={() => setSelectedCategory(selectedCategory?.id === category.id ? null : category)}
          >
            <Icon
              name={category.icon}
              type="material-community"
              size={24}
              color={selectedCategory?.id === category.id ? '#fff' : '#666'}
            />
            <Text style={[
              styles.categoryName,
              selectedCategory?.id === category.id && styles.selectedCategoryText
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filteredProducts}
        renderItem={renderProductCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.productsList}
        showsVerticalScrollIndicator={false}
      />

      {cartItems && cartItems.length > 0 && (
        <TouchableOpacity 
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart')}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
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
  pharmacyDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pharmacyText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  detailIcon: {
    marginLeft: 12,
  },
  searchContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    padding: 8,
    marginBottom: 8,
  },
  searchInputContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    height: 40,
  },
  searchInput: {
    fontSize: 16,
  },
  categoriesContainer: {
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 4,
  },
  selectedCategory: {
    backgroundColor: '#2196F3',
  },
  categoryName: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  productsList: {
    padding: 8,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  productUnit: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  addButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
    minWidth: 100,
  },
  addButtonText: {
    fontSize: 14,
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
});

export default PharmacyProductsScreen; 