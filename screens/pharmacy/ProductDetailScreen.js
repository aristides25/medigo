import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { Text, Card, Button, Icon, Divider } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../../context/CartContext';
import { usePharmacy } from '../../context/PharmacyContext';
import { AFFILIATED_PHARMACIES } from '../../constants/pharmacy/affiliates';

const PharmacyAvailabilityCard = ({ 
  availability, 
  pharmacy, 
  onSelectPharmacy,
  isSelected 
}) => (
  <Card containerStyle={[
    styles.pharmacyCard,
    isSelected && styles.selectedPharmacyCard
  ]}>
    <View style={styles.pharmacyHeader}>
      <View>
        <Text style={styles.pharmacyName}>{pharmacy.name}</Text>
        <Text style={styles.pharmacyAddress}>{pharmacy.address}</Text>
      </View>
      <View style={styles.pharmacyInfo}>
        <Icon
          name="clock-outline"
          type="material-community"
          size={16}
          color="#666"
        />
        <Text style={styles.deliveryTime}>{pharmacy.deliveryTime}</Text>
      </View>
    </View>

    <Divider style={styles.divider} />

    <View style={styles.availabilityInfo}>
      <View style={styles.priceContainer}>
        <Text style={styles.priceLabel}>Precio:</Text>
        <Text style={styles.price}>Bs. {availability.price.toFixed(2)}</Text>
      </View>

      <View style={styles.stockContainer}>
        <Text style={styles.stockLabel}>Stock:</Text>
        <Text style={[
          styles.stock,
          availability.stock === 0 && styles.outOfStock
        ]}>
          {availability.stock > 0 ? `${availability.stock} unidades` : 'Agotado'}
        </Text>
      </View>

      {availability.canPartialDeliver && (
        <View style={styles.partialDeliveryContainer}>
          <Icon
            name="check-circle"
            type="material-community"
            size={16}
            color="#4CAF50"
          />
          <Text style={styles.partialDeliveryText}>
            Permite entrega parcial
          </Text>
        </View>
      )}
    </View>

    <Button
      title={isSelected ? "Seleccionado" : "Seleccionar Farmacia"}
      onPress={() => onSelectPharmacy(pharmacy.id)}
      disabled={availability.stock === 0 || isSelected}
      buttonStyle={[
        styles.selectButton,
        isSelected && styles.selectedButton
      ]}
    />
  </Card>
);

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const { addToCart } = useCart();
  const { selectedPharmacy, selectPharmacy } = usePharmacy();
  const [selectedAvailability, setSelectedAvailability] = useState(null);

  useEffect(() => {
    // Reset selected pharmacy when entering the screen
    selectPharmacy(null);
  }, []);

  const handleSelectPharmacy = (pharmacyId) => {
    selectPharmacy(pharmacyId);
    if (product.availability) {
      const availability = product.availability.find(
        a => a.pharmacyId === pharmacyId
      );
      setSelectedAvailability(availability);
    }
  };

  const handleAddToCart = () => {
    if (product.availability && !selectedPharmacy) {
      Alert.alert('Error', 'Por favor, selecciona una farmacia primero');
      return;
    }

    if (product.requiresPrescription) {
      navigation.navigate('UploadPrescription', {
        fromProduct: true,
        product: product.availability ? {
          ...product,
          price: selectedAvailability.price,
          pharmacyId: selectedPharmacy.id
        } : product
      });
    } else {
      addToCart(product.availability ? {
        ...product,
        price: selectedAvailability.price,
        pharmacyId: selectedPharmacy.id
      } : product);
      Alert.alert(
        'Éxito',
        'Producto agregado al carrito',
        [
          {
            text: 'Seguir comprando',
            style: 'cancel',
          },
          {
            text: 'Ir al carrito',
            onPress: () => navigation.navigate('Cart'),
          },
        ]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Card containerStyle={styles.productCard}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.presentation}>{product.presentation}</Text>

          {product.requiresPrescription && (
            <View style={styles.prescriptionBadge}>
              <Icon
                name="file-document"
                type="material-community"
                size={16}
                color="#666"
              />
              <Text style={styles.prescriptionText}>Requiere receta médica</Text>
            </View>
          )}

          <Divider style={styles.divider} />

          <Text style={styles.sectionTitle}>Detalles del producto</Text>
          <Text style={styles.description}>{product.description}</Text>
          
          <View style={styles.detailsGrid}>
            {product.activeIngredient && (
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Principio activo:</Text>
                <Text style={styles.detailValue}>{product.activeIngredient}</Text>
              </View>
            )}
            {product.administration && (
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Administración:</Text>
                <Text style={styles.detailValue}>{product.administration}</Text>
              </View>
            )}
          </View>

          {!product.availability && (
            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>Precio:</Text>
              <Text style={styles.price}>Bs. {product.price.toFixed(2)}</Text>
            </View>
          )}
        </Card>

        {product.availability && (
          <>
            <Text style={styles.availabilityTitle}>Disponibilidad en farmacias</Text>
            
            {product.availability.map((availability) => {
              const pharmacy = AFFILIATED_PHARMACIES.find(
                p => p.id === availability.pharmacyId
              );
              return (
                <PharmacyAvailabilityCard
                  key={pharmacy.id}
                  availability={availability}
                  pharmacy={pharmacy}
                  onSelectPharmacy={handleSelectPharmacy}
                  isSelected={selectedPharmacy?.id === pharmacy.id}
                />
              );
            })}
          </>
        )}
      </ScrollView>

      <Card containerStyle={styles.bottomCard}>
        <Button
          title={product.requiresPrescription ? "Continuar con receta" : "Agregar al carrito"}
          onPress={handleAddToCart}
          disabled={product.availability && !selectedPharmacy}
          buttonStyle={styles.addButton}
          icon={
            <Icon
              name={product.requiresPrescription ? "file-upload" : "cart-plus"}
              type="material-community"
              color="white"
              size={20}
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
  productCard: {
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  brand: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  presentation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  prescriptionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 5,
    marginBottom: 10,
  },
  prescriptionText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  divider: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 15,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  detailItem: {
    width: '50%',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  availabilityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    margin: 15,
  },
  pharmacyCard: {
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
  },
  selectedPharmacyCard: {
    borderColor: '#0077B6',
    borderWidth: 2,
  },
  pharmacyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  pharmacyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  pharmacyAddress: {
    fontSize: 14,
    color: '#666',
  },
  pharmacyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryTime: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  availabilityInfo: {
    marginVertical: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0077B6',
  },
  stockContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  stockLabel: {
    fontSize: 14,
    color: '#666',
  },
  stock: {
    fontSize: 14,
    color: '#4CAF50',
  },
  outOfStock: {
    color: '#F44336',
  },
  partialDeliveryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  partialDeliveryText: {
    fontSize: 14,
    color: '#4CAF50',
    marginLeft: 5,
  },
  selectButton: {
    borderRadius: 25,
    marginTop: 10,
    backgroundColor: '#0077B6',
  },
  selectedButton: {
    backgroundColor: '#4CAF50',
  },
  bottomCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    margin: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
  },
  addButton: {
    borderRadius: 25,
    paddingVertical: 12,
    backgroundColor: '#0077B6',
  },
});

export default ProductDetailScreen; 