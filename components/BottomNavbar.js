import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon } from '@rneui/themed';

const BottomNavbar = () => {
  return (
    <View style={styles.container}>
      <Icon
        name="home"
        type="material-community"
        color="#666"
        size={28}
        containerStyle={styles.iconContainer}
      />
      <Icon
        name="ambulance"
        type="material-community"
        color="#666"
        size={28}
        containerStyle={styles.iconContainer}
      />
      <Icon
        name="account"
        type="material-community"
        color="#666"
        size={28}
        containerStyle={styles.iconContainer}
      />
      <Icon
        name="cog"
        type="material-community"
        color="#666"
        size={28}
        containerStyle={styles.iconContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  iconContainer: {
    padding: 8,
  },
});

export default BottomNavbar; 