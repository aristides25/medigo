import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text, Button, Icon, Avatar } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../../context/CartContext';

const { width } = Dimensions.get('window');

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params || {};
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  // Si no hay producto, mostramos un mensaje de error
  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Producto no encontrado</Text>
          <Button
            title="Volver"
            onPress={() => navigation.goBack()}
            type="outline"
          />
        </View>
      </SafeAreaView>
    );
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    navigation.goBack();
  };

  const handleQuantityChange = (increment) => {
    const newQuantity = quantity + increment;
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Button
          icon={<Icon name="arrow-left" type="material-community" size={24} color="#000" />}
          type="clear"
          onPress={() => navigation.goBack()}
          containerStyle={styles.backButton}
        />
        <Text style={styles.headerTitle}>Detalle del Producto</Text>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        <View style={styles.productImageContainer}>
          <Avatar
            size={width * 0.5}
            title={product.initial}
            containerStyle={styles.productImage}
            backgroundColor="#E8EAF6"
            titleStyle={{ color: '#3F51B5', fontSize: width * 0.15 }}
          />
        </View>

        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>$ {product.price}</Text>
          </View>
          <Text style={styles.productUnit}>{product.quantity} · ${product.pricePerUnit}/un</Text>
        </View>

        <View style={styles.quantityContainer}>
          <Text style={styles.quantityLabel}>Cantidad:</Text>
          <View style={styles.quantitySelector}>
            <Button
              icon={<Icon name="minus" type="material-community" size={24} color="#2196F3" />}
              type="clear"
              onPress={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
            />
            <Text style={styles.quantityText}>{quantity}</Text>
            <Button
              icon={<Icon name="plus" type="material-community" size={24} color="#2196F3" />}
              type="clear"
              onPress={() => handleQuantityChange(1)}
            />
          </View>
          <Text style={styles.totalText}>Total: $ {(product.price * quantity).toFixed(2)}</Text>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Descripción</Text>
          <Text style={styles.descriptionText}>
            Medicamento de venta libre. Consulte a su médico si los síntomas persisten.
          </Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Información Importante</Text>
          <View style={styles.infoItem}>
            <Icon name="information" type="material-community" size={20} color="#666" />
            <Text style={styles.infoText}>Conservar en lugar fresco y seco</Text>
          </View>
          <View style={styles.infoItem}>
            <Icon name="alert-circle" type="material-community" size={20} color="#666" />
            <Text style={styles.infoText}>Mantener fuera del alcance de los niños</Text>
          </View>
          <View style={styles.infoItem}>
            <Icon name="pill" type="material-community" size={20} color="#666" />
            <Text style={styles.infoText}>Siga la dosificación indicada por su médico</Text>
          </View>
        </View>

        <View style={styles.spacing} />
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Agregar al carrito"
          onPress={handleAddToCart}
          buttonStyle={styles.addToCartButton}
          titleStyle={styles.addToCartText}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F4F8',
  },
  header: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: 'rgba(79, 172, 254, 0.15)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  backButton: {
    marginRight: 8,
  },
  content: {
    flex: 1,
  },
  productImageContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: 'rgba(79, 172, 254, 0.05)',
  },
  productInfo: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  productName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2d3748',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  price: {
    fontSize: 28,
    fontWeight: '700',
    color: '#4facfe',
  },
  productUnit: {
    fontSize: 16,
    color: '#666',
  },
  quantityContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginVertical: 12,
    shadowColor: 'rgba(79, 172, 254, 0.15)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 8,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(79, 172, 254, 0.05)',
    borderRadius: 12,
    padding: 8,
  },
  quantityText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2d3748',
  },
  totalText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4facfe',
    marginTop: 12,
    textAlign: 'right',
  },
  descriptionContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginVertical: 12,
    shadowColor: 'rgba(79, 172, 254, 0.15)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 16,
    color: '#718096',
    lineHeight: 24,
  },
  infoContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginVertical: 12,
    shadowColor: 'rgba(79, 172, 254, 0.15)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(79, 172, 254, 0.05)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#718096',
    marginLeft: 12,
    flex: 1,
  },
  spacing: {
    height: 100,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  addToCartButton: {
    backgroundColor: '#4facfe',
    borderRadius: 16,
    padding: 16,
    margin: 16,
    shadowColor: 'rgba(79, 172, 254, 0.3)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  addToCartText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#666',
  },
});

export default ProductDetailScreen; 