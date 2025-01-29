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
          <Text style={styles.productPrice}>$ {product.price}</Text>
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
          titleStyle={styles.addToCartButtonText}
          icon={<Icon name="cart-plus" type="material-community" size={24} color="#FFF" style={{ marginRight: 8 }} />}
        />
      </View>
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
    marginBottom: 20,
  },
  productInfo: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 22,
    color: '#2196F3',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productUnit: {
    fontSize: 16,
    color: '#666',
  },
  quantityContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  quantityLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  quantityText: {
    fontSize: 24,
    marginHorizontal: 24,
    minWidth: 40,
    textAlign: 'center',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2196F3',
  },
  descriptionContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  infoContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
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
    backgroundColor: '#2196F3',
    borderRadius: 8,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
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