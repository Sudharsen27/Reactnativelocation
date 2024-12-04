// app/_layout.tsx
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colorScheme === 'dark' ? '#000' : '#333',
        },
        headerTintColor: colorScheme === 'dark' ? '#fff' : '#000',
      }}
    />
  );
}

