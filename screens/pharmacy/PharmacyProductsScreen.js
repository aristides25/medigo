import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, ScrollView, TextInput, Platform } from 'react-native';
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
  const { cart = [], addToCart } = useCart();

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
        backgroundColor="rgba(79, 172, 254, 0.05)"
        titleStyle={{ color: '#4facfe' }}
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
    <View style={styles.container}>
      <View style={styles.banner}>
        <View style={styles.bannerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" type="material-community" size={24} color="#fff" />
          </TouchableOpacity>
          
          <View style={styles.pharmacyInfo}>
            <Text style={styles.pharmacyName}>{pharmacy.name}</Text>
            <View style={styles.deliveryInfo}>
              <Icon name="truck-delivery" type="material-community" size={16} color="#fff" style={styles.deliveryIcon} />
              <Text style={styles.deliveryText}>Entrega a domicilio</Text>
              <Text style={styles.deliveryPrice}>$ {pharmacy.deliveryFee.toFixed(2)}</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.cartButton}
            onPress={() => navigation.navigate('CartDetails')}
          >
            <Icon name="cart" type="material-community" size={24} color="#fff" />
            {cart.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cart.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.filtersContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersList}
        >
          {CATEGORIES.map(category => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.filterItem,
                selectedCategory?.id === category.id && styles.filterItemSelected
              ]}
              onPress={() => setSelectedCategory(selectedCategory?.id === category.id ? null : category)}
            >
              <Icon
                name={category.icon}
                type="material-community"
                size={20}
                color={selectedCategory?.id === category.id ? '#fff' : '#666'}
              />
              <Text style={[
                styles.filterText,
                selectedCategory?.id === category.id && styles.filterTextSelected
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={renderProductCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.productsList}
      />

      {cart && cart.length > 0 && (
        <TouchableOpacity 
          style={[styles.cartButton, styles.floatingCartButton]}
          onPress={() => navigation.navigate('CartDetails')}
        >
          <Text style={styles.cartItemCount}>{cart.length} producto{cart.length > 1 ? 's' : ''}</Text>
          <Text style={styles.cartTotal}>$ {calculateTotal(cart)}</Text>
          <Text style={styles.viewCartText}>Ver mi carrito</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  banner: {
    backgroundColor: '#4facfe',
    paddingTop: Platform.OS === 'ios' ? 48 : 32,
    paddingBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: 'rgba(79, 172, 254, 0.4)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  pharmacyInfo: {
    flex: 1,
    marginLeft: 12,
  },
  pharmacyName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryIcon: {
    marginRight: 4,
  },
  deliveryText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginRight: 8,
  },
  deliveryPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  cartButton: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#E91E63',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 6,
  },
  filtersContainer: {
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: '#E8F4F8',
  },
  filtersList: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  filterItemSelected: {
    backgroundColor: '#4facfe',
  },
  filterText: {
    color: '#666',
    marginLeft: 6,
    fontSize: 14,
  },
  filterTextSelected: {
    color: '#fff',
  },
  productsList: {
    paddingTop: 8,
    paddingHorizontal: 12,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfo: {
    flex: 1,
    marginLeft: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 4,
  },
  productUnit: {
    fontSize: 14,
    color: '#718096',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4facfe',
  },
  addButton: {
    backgroundColor: '#4facfe',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  floatingCartButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#E31837',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  cartItemCount: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
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