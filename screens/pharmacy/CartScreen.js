import React from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../../context/CartContext';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => (
  <Card containerStyle={styles.cartItem}>
    <View style={styles.itemHeader}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Icon
        name="delete"
        type="material-community"
        size={24}
        color="#FF6B6B"
        onPress={() => onRemove(item.id)}
      />
    </View>
    <Text style={styles.itemPresentation}>{item.presentation}</Text>
    <View style={styles.itemDetails}>
      <View style={styles.quantityContainer}>
        <Icon
          name="minus-circle"
          type="material-community"
          size={24}
          color="#0077B6"
          onPress={() => onUpdateQuantity(item.id, item.quantity - 1)}
        />
        <Text style={styles.quantity}>{item.quantity}</Text>
        <Icon
          name="plus-circle"
          type="material-community"
          size={24}
          color="#0077B6"
          onPress={() => onUpdateQuantity(item.id, item.quantity + 1)}
        />
      </View>
      <Text style={styles.itemPrice}>Bs. {(item.price * item.quantity).toFixed(2)}</Text>
    </View>
  </Card>
);

const CartScreen = ({ navigation }) => {
  const { cart, total, updateQuantity, removeFromCart, clearCart } = useCart();

  const handleCheckout = () => {
    if (cart.length === 0) {
      Alert.alert('Carrito vacío', 'Agrega productos a tu carrito para continuar');
      return;
    }

    const requiresPrescription = cart.some(item => item.requiresPrescription);
    if (requiresPrescription) {
      navigation.navigate('UploadPrescription', { fromCart: true });
    } else {
      navigation.navigate('Payment', { fromCart: true });
    }
  };

  const handleRemoveItem = (productId) => {
    Alert.alert(
      'Eliminar producto',
      '¿Estás seguro de que deseas eliminar este producto?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: () => removeFromCart(productId),
          style: 'destructive',
        },
      ]
    );
  };

  if (cart.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyCart}>
          <Icon
            name="cart-off"
            type="material-community"
            size={64}
            color="#666"
          />
          <Text style={styles.emptyText}>Tu carrito está vacío</Text>
          <Button
            title="Ir a comprar"
            onPress={() => navigation.navigate('Pharmacy')}
            buttonStyle={styles.shopButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cart}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onUpdateQuantity={updateQuantity}
            onRemove={handleRemoveItem}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.cartList}
      />
      <Card containerStyle={styles.totalCard}>
        <View style={styles.totalRow}>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={styles.totalAmount}>Bs. {total.toFixed(2)}</Text>
        </View>
        <Button
          title="Proceder al pago"
          onPress={handleCheckout}
          buttonStyle={styles.checkoutButton}
          icon={
            <Icon
              name="cart-arrow-right"
              type="material-community"
              size={20}
              color="white"
              style={{ marginRight: 10 }}
            />
          }
        />
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  cartList: {
    padding: 10,
    paddingBottom: 180,
  },
  cartItem: {
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  itemPresentation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  itemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 15,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0077B6',
  },
  totalCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    margin: 0,
    padding: 20,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0077B6',
  },
  checkoutButton: {
    borderRadius: 25,
    paddingVertical: 12,
    backgroundColor: '#0077B6',
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginVertical: 20,
  },
  shopButton: {
    borderRadius: 25,
    paddingHorizontal: 30,
    backgroundColor: '#0077B6',
  },
});

export default CartScreen; 