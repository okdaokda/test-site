import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Colors } from '../constants/Colors';
import { useSubscription } from '../context/SubscriptionContext';
import PlanSelector from '../components/PlanSelector';

const benefits = [
  'Unlimited meditation sessions',
  'AI-powered daily affirmations',
  'Sleep stories & ambient sounds',
  'Offline downloads',
  'No ads, ever',
];

export default function PaywallScreen() {
  const router = useRouter();
  const { subscribe } = useSubscription();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('annual');
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    setLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      await subscribe();
      Alert.alert(
        'Welcome to Premium!',
        'You now have access to all meditations and AI features.',
        [{ text: 'Start Meditating', onPress: () => router.back() }]
      );
    } catch {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.accent, Colors.background]}
        style={styles.headerGradient}
      />

      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="close" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🧘</Text>
          </View>

          <Text style={styles.title}>Unlock Your{'\n'}Inner Peace</Text>
          <Text style={styles.subtitle}>
            Start your 7-day free trial and discover the full ZenPulse experience
          </Text>

          <View style={styles.benefitsContainer}>
            {benefits.map((benefit) => (
              <View key={benefit} style={styles.benefitRow}>
                <Ionicons
                  name="checkmark-circle"
                  size={22}
                  color={Colors.accentGold}
                />
                <Text style={styles.benefitText}>{benefit}</Text>
              </View>
            ))}
          </View>

          <PlanSelector selected={selectedPlan} onSelect={setSelectedPlan} />
        </ScrollView>

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.purchaseButton}
            onPress={handlePurchase}
            disabled={loading}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[Colors.accent, '#5A3FD9']}
              style={styles.purchaseGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              {loading ? (
                <ActivityIndicator color={Colors.textPrimary} />
              ) : (
                <Text style={styles.purchaseText}>Try 7 Days Free</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.restoreButton}>
            <Text style={styles.restoreText}>Restore Purchase</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300,
  },
  safeArea: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 10,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 22,
  },
  scrollContent: {
    paddingTop: 80,
    paddingBottom: 20,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    fontSize: 64,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 38,
    marginBottom: 12,
  },
  subtitle: {
    color: Colors.textSecondary,
    fontSize: 15,
    textAlign: 'center',
    paddingHorizontal: 40,
    marginBottom: 30,
    lineHeight: 22,
  },
  benefitsContainer: {
    paddingHorizontal: 30,
    marginBottom: 30,
    gap: 14,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  benefitText: {
    color: Colors.textPrimary,
    fontSize: 15,
    fontWeight: '500',
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  purchaseButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
  },
  purchaseGradient: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
  },
  purchaseText: {
    color: Colors.textPrimary,
    fontSize: 17,
    fontWeight: '700',
  },
  restoreButton: {
    alignItems: 'center',
    paddingVertical: 12,
    minHeight: 44,
    justifyContent: 'center',
  },
  restoreText: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
});
