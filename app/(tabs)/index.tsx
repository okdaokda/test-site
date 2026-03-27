import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { meditations } from '../../constants/Meditations';
import MeditationCard from '../../components/MeditationCard';

const categories = ['All', 'Focus', 'Sleep', 'Calm', 'Energy'];

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export default function MeditationsScreen() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All'
      ? meditations
      : meditations.filter(
          (m) => m.category === activeCategory.toLowerCase()
        );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.greeting}>{getGreeting()}</Text>
        <Text style={styles.title}>Find your peace</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryChip,
                activeCategory === cat && styles.categoryChipActive,
              ]}
              onPress={() => setActiveCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryText,
                  activeCategory === cat && styles.categoryTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.cardsContainer}>
          {filtered.map((meditation) => (
            <MeditationCard key={meditation.id} meditation={meditation} />
          ))}
        </View>
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
    paddingBottom: 20,
  },
  greeting: {
    color: Colors.textSecondary,
    fontSize: 16,
    marginTop: 16,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: 28,
    fontWeight: '700',
    marginTop: 4,
    marginBottom: 20,
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesContent: {
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.cardBg,
    minHeight: 44,
    justifyContent: 'center',
  },
  categoryChipActive: {
    backgroundColor: Colors.accent,
  },
  categoryText: {
    color: Colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  categoryTextActive: {
    color: Colors.textPrimary,
  },
  cardsContainer: {
    alignItems: 'center',
  },
});
