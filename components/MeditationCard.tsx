import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { Meditation } from '../constants/Meditations';
import { useSubscription } from '../context/SubscriptionContext';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;
const CARD_HEIGHT = CARD_WIDTH * 0.45;

interface Props {
  meditation: Meditation;
}

export default function MeditationCard({ meditation }: Props) {
  const { isSubscribed } = useSubscription();
  const router = useRouter();

  const isLocked = !meditation.isFree && !isSubscribed;

  const handlePress = () => {
    if (isLocked) {
      router.push('/paywall');
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: meditation.imageUrl }}
        style={[styles.image, isLocked && styles.imageLocked]}
      />

      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)']}
        style={styles.gradient}
      />

      <View style={styles.durationBadge}>
        <Ionicons name="time-outline" size={12} color={Colors.textPrimary} />
        <Text style={styles.durationText}>{meditation.duration}</Text>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{meditation.title}</Text>
        <Text style={styles.subtitle}>{meditation.subtitle}</Text>
      </View>

      {isLocked && (
        <View style={styles.lockOverlay}>
          <Ionicons name="lock-closed" size={28} color={Colors.textPrimary} />
          <Text style={styles.lockText}>Premium</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: Colors.cardBg,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageLocked: {
    opacity: 0.4,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '60%',
  },
  durationBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  durationText: {
    color: Colors.textPrimary,
    fontSize: 12,
    fontWeight: '600',
  },
  textContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    color: Colors.textSecondary,
    fontSize: 13,
  },
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  lockText: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
});
