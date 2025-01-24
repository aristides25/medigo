import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItem, Text, Icon, Button, Rating, Badge, Divider } from '@rneui/themed';

const ProviderCard = ({ provider, onPress }) => {
  const {
    name,
    type,
    specialty,
    rating,
    reviewCount,
    address,
    distance,
    availability,
  } = provider;

  return (
    <ListItem.Swipeable
      Component={ListItem.Content}
      containerStyle={styles.container}
    >
      <View style={styles.header}>
        <View style={styles.providerInfo}>
          <ListItem.Title style={styles.name}>{name}</ListItem.Title>
          <ListItem.Subtitle>
            <View style={styles.typeContainer}>
              <Icon
                name={type.icon}
                type="material-community"
                size={16}
                color="#666"
              />
              <Text style={styles.type}>{type.name}</Text>
            </View>
          </ListItem.Subtitle>
        </View>
        <View style={styles.ratingContainer}>
          <Rating
            readonly
            startingValue={rating}
            imageSize={16}
            style={styles.rating}
            type="custom"
            ratingColor="#FFD700"
            tintColor="#fff"
          />
          <Text style={styles.reviewCount}>({reviewCount} reseñas)</Text>
        </View>
      </View>

      <Divider style={styles.divider} />

      <View style={styles.details}>
        <ListItem>
          <Icon
            name={specialty.icon}
            type="material-community"
            size={20}
            color="#666"
          />
          <ListItem.Content>
            <ListItem.Title style={styles.detailText}>
              {specialty.name}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>

        <ListItem>
          <Icon
            name="map-marker"
            type="material-community"
            size={20}
            color="#666"
          />
          <ListItem.Content>
            <ListItem.Title style={styles.detailText}>
              {address} • {distance} km
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>

        {availability && (
          <ListItem containerStyle={styles.availabilityContainer}>
            <Icon
              name="clock-outline"
              type="material-community"
              size={16}
              color="#4CAF50"
            />
            <ListItem.Content>
              <ListItem.Title style={styles.availabilityText}>
                Próximo turno disponible: {availability}
              </ListItem.Title>
            </ListItem.Content>
            <Badge
              value="Disponible"
              status="success"
              containerStyle={styles.badge}
            />
          </ListItem>
        )}
      </View>

      <Button
        title="Seleccionar"
        onPress={() => onPress(provider)}
        buttonStyle={styles.button}
        raised
        titleStyle={{ fontWeight: 'bold' }}
        loadingProps={{ color: 'white' }}
      />
    </ListItem.Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 15,
  },
  providerInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  type: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  ratingContainer: {
    alignItems: 'flex-end',
  },
  rating: {
    marginBottom: 2,
  },
  reviewCount: {
    fontSize: 12,
    color: '#666',
  },
  divider: {
    marginHorizontal: 15,
  },
  details: {
    marginTop: 5,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
  availabilityContainer: {
    backgroundColor: '#E8F5E9',
    borderRadius: 6,
    marginHorizontal: 15,
    marginVertical: 5,
  },
  availabilityText: {
    fontSize: 12,
    color: '#4CAF50',
  },
  badge: {
    marginTop: 0,
  },
  button: {
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 25,
    backgroundColor: '#0077B6',
    paddingVertical: 10,
  },
});

export default ProviderCard; 