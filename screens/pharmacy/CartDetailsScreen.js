import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Icon, Button } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../../context/CartContext';

const CartDetailsScreen = ({ navigation }) => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productUnit}>{item.quantity} unidades</Text>
        <Text style={styles.productPrice}>$ {(item.price * item.quantity).toFixed(2)}</Text>
      </View>
      <View style={styles.itemActions}>
        <View style={styles.quantityControls}>
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
          >
            <Icon name="minus" type="material-community" size={20} color="#4facfe" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <Icon name="plus" type="material-community" size={20} color="#4facfe" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={() => handleRemoveItem(item.id)}
        >
          <Icon name="delete" type="material-community" size={24} color="#E91E63" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {cart.length > 0 ? (
        <>
          <FlatList
            data={cart}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.cartList}
          />

          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>$ {calculateTotal()}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Envío</Text>
              <Text style={styles.summaryValue}>$ 1.99</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>$ {(parseFloat(calculateTotal()) + 1.99).toFixed(2)}</Text>
            </View>

            <Button
              title="Confirmar Pedido"
              onPress={() => {
                navigation.navigate('DeliveryTracking');
              }}
              buttonStyle={styles.confirmButton}
              titleStyle={styles.confirmButtonText}
              icon={{
                name: 'check-circle',
                type: 'material-community',
                size: 20,
                color: 'white',
              }}
              iconRight
            />
          </View>
        </>
      ) : (
        <View style={styles.emptyCart}>
          <Icon
            name="cart-off"
            type="material-community"
            size={80}
            color="#ccc"
          />
          <Text style={styles.emptyCartText}>Tu carrito está vacío</Text>
          <Button
            title="Ir a Comprar"
            onPress={() => navigation.goBack()}
            buttonStyle={styles.shopButton}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F4F8',
  },
  cartList: {
    padding: 16,
  },
  cartItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  productInfo: {
    flex: 1,
    marginBottom: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 4,
  },
  productUnit: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4facfe',
  },
  itemActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7fafc',
    borderRadius: 20,
    padding: 4,
  },
  quantityButton: {
    padding: 8,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 12,
    color: '#2d3748',
  },
  deleteButton: {
    padding: 8,
  },
  summaryContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: 'rgba(79, 172, 254, 0.25)',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#718096',
  },
  summaryValue: {
    fontSize: 16,
    color: '#2d3748',
    fontWeight: '600',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 12,
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2d3748',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4facfe',
  },
  confirmButton: {
    backgroundColor: '#4facfe',
    borderRadius: 12,
    paddingVertical: 12,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyCartText: {
    fontSize: 18,
    color: '#718096',
    marginTop: 16,
    marginBottom: 24,
  },
  shopButton: {
    backgroundColor: '#4facfe',
    paddingHorizontal: 32,
    borderRadius: 12,
  },
});

export default CartDetailsScreen; 