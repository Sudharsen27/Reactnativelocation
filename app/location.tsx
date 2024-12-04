import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as Location from 'expo-location';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function LocationScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    try {
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    } catch (error) {
      Alert.alert('Error', 'Could not fetch location');
    }
  };

  const watchLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    try {
      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        (newLocation) => {
          setLocation(newLocation);
        }
      );

      // Optional: Return a cleanup function to stop watching location
      return () => subscription.remove();
    } catch (error) {
      Alert.alert('Error', 'Could not watch location');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Location Tracker</ThemedText>
      
      {location ? (
        <ThemedView style={styles.locationContainer}>
          <ThemedText type="default">
            Latitude: {location.coords.latitude}
          </ThemedText>
          <ThemedText type="default">
            Longitude: {location.coords.longitude}
          </ThemedText>
          <ThemedText type="default">
            Accuracy: {location.coords.accuracy} meters
          </ThemedText>
        </ThemedView>
      ) : (
        <ThemedText type="default">
          Press a button to get your location
        </ThemedText>
      )}

      {errorMsg && (
        <ThemedText type="default" style={styles.errorText}>
          {errorMsg}
        </ThemedText>
      )}

      <ThemedView style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={requestLocationPermission}
        >
          <ThemedText type="link">Get Current Location</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={watchLocation}
        >
          <ThemedText type="link">Watch Location</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  locationContainer: {
    marginVertical: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
  },
  button: {
    flex: 1,
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 10,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginVertical: 10,
  },
});