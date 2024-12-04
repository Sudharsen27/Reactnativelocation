import React from 'react';
import { Link } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Location Tracker</ThemedText>
      
      <Link href="/location" asChild>
        <TouchableOpacity style={styles.button}>
          <ThemedText type="link">Open Location Tracker</ThemedText>
        </TouchableOpacity>
      </Link>
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
  button: {
    marginTop: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#007bff',
    borderRadius: 10,
  },
});
