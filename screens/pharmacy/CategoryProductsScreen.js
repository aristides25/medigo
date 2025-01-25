import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card, Button, Icon, SearchBar } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PRODUCTS } from '../../constants/pharmacy/products';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product, onPress }) => (
  <TouchableOpacity onPress={() => onPress(product)}>
    <Card containerStyle={styles.productCard}>
      <Card.Title style={styles.productTitle}>{product.name}</Card.Title>
      <Card.Divider />
      <View style={styles.productContent}>
        <Text style={styles.productBrand}>{product.brand}</Text>
        <Text style={styles.productPresentation}>{product.presentation}</Text>
        <Text style={styles.productPrice}>
          {product.availability ? 
            `Desde Bs. ${Math.min(...product.availability.map(a => a.price)).toFixed(2)}` :
            `Bs. ${product.price.toFixed(2)}`
          }
        </Text>
        {product.requiresPrescription && (
          <View style={styles.prescriptionBadge}>
            <Icon name="file-document" type="material-community" size={16} color="#666" />
            <Text style={styles.prescriptionText}>Requiere receta</Text>
          </View>
        )}
        <Button
          title="Ver detalles"
          onPress={() => onPress(product)}
          buttonStyle={styles.addButton}
          icon={
            <Icon
              name="arrow-right"
              type="material-community"
              size={20}
              color="white"
              style={{ marginRight: 10 }}
            />
          }
        />
      </View>
    </Card>
  </TouchableOpacity>
);

const CategoryProductsScreen = ({ route, navigation }) => {
  const { category } = route.params;
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { getItemCount } = useCart();

  useEffect(() => {
    const products = PRODUCTS.filter(
      product => product.category === category.name
    );
    setFilteredProducts(products);
  }, [category]);

  const handleSearch = (text) => {
    setSearch(text);
    const filtered = PRODUCTS.filter(
      product =>
        product.category === category.name &&
        (product.name.toLowerCase().includes(text.toLowerCase()) ||
         product.description.toLowerCase().includes(text.toLowerCase()))
    );
    setFilteredProducts(filtered);
  };

  const handleProductPress = (product) => {
    navigation.navigate('ProductDetail', { product });
  };

  // Agregar botón del carrito en el header
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerCart}>
          <Icon
            name="cart"
            type="material-community"
            color="#fff"
            size={24}
            onPress={() => navigation.navigate('Cart')}
          />
          {getItemCount() > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{getItemCount()}</Text>
            </View>
          )}
        </View>
      ),
    });
  }, [navigation, getItemCount]);

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        placeholder="Buscar productos..."
        onChangeText={handleSearch}
        value={search}
        platform="android"
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.searchInputContainer}
        lightTheme
        round
      />
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={handleProductPress}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.productList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
  productList: {
    padding: 10,
  },
  productCard: {
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
  },
  productTitle: {
    fontSize: 16,
    color: '#333',
  },
  productContent: {
    alignItems: 'center',
  },
  productBrand: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  productPresentation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0077B6',
    marginBottom: 10,
  },
  prescriptionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
  prescriptionText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
  addButton: {
    borderRadius: 25,
    paddingHorizontal: 20,
    backgroundColor: '#0077B6',
  },
  headerCart: {
    marginRight: 15,
  },
  cartBadge: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default CategoryProductsScreen; 