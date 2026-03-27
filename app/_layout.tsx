import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SubscriptionProvider } from '../context/SubscriptionContext';
import { Colors } from '../constants/Colors';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SubscriptionProvider>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: Colors.background },
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="paywall"
            options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
          />
        </Stack>
      </SubscriptionProvider>
    </SafeAreaProvider>
  );
}
