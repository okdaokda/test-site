import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { Colors } from '../../constants/Colors';
import { moodEmojis, affirmations } from '../../constants/Affirmations';
import MoodResult from '../../components/MoodResult';

export default function MoodScreen() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [affirmation, setAffirmation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateAffirmation = async (moodKey: string) => {
    setLoading(true);
    setSelectedMood(moodKey);
    setAffirmation(null);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    // Simulate AI generation
    await new Promise((r) => setTimeout(r, 1500 + Math.random() * 1000));

    const pool = affirmations[moodKey];
    const text = pool[Math.floor(Math.random() * pool.length)];

    setAffirmation(text);
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.sparkle}>✨</Text>
        <Text style={styles.title}>AI Mood Check-in</Text>
        <Text style={styles.subtitle}>
          How are you feeling right now? Select your mood and receive a personalized affirmation.
        </Text>

        <View style={styles.moodContainer}>
          {moodEmojis.map((mood) => {
            const isActive = selectedMood === mood.key;
            return (
              <TouchableOpacity
                key={mood.key}
                style={[styles.moodButton, isActive && styles.moodButtonActive]}
                onPress={() => generateAffirmation(mood.key)}
                disabled={loading}
                activeOpacity={0.7}
              >
                <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                <Text
                  style={[
                    styles.moodLabel,
                    isActive && styles.moodLabelActive,
                  ]}
                >
                  {mood.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={Colors.accent} />
            <Text style={styles.loadingText}>Generating your affirmation...</Text>
          </View>
        )}

        {affirmation && selectedMood && !loading && (
          <>
            <MoodResult
              text={affirmation}
              mood={moodEmojis.find((m) => m.key === selectedMood)?.label || ''}
            />
            <TouchableOpacity
              style={styles.regenerateButton}
              onPress={() => generateAffirmation(selectedMood)}
            >
              <Text style={styles.regenerateText}>Generate Another</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  sparkle: {
    fontSize: 48,
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 12,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: Colors.textSecondary,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  moodButton: {
    width: 100,
    height: 100,
    borderRadius: 24,
    backgroundColor: Colors.cardBg,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    gap: 6,
  },
  moodButtonActive: {
    borderColor: Colors.accent,
    backgroundColor: 'rgba(124, 92, 252, 0.15)',
  },
  moodEmoji: {
    fontSize: 36,
  },
  moodLabel: {
    color: Colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  moodLabelActive: {
    color: Colors.accent,
  },
  loadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginTop: 30,
  },
  loadingText: {
    color: Colors.textSecondary,
    fontSize: 14,
    fontStyle: 'italic',
  },
  regenerateButton: {
    alignSelf: 'center',
    marginTop: 20,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.accent,
    minHeight: 44,
    justifyContent: 'center',
  },
  regenerateText: {
    color: Colors.accent,
    fontSize: 15,
    fontWeight: '600',
  },
});
