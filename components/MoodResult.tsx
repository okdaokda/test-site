import React, { useEffect, useRef } from 'react';
import { Text, Animated, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

interface Props {
  text: string;
  mood: string;
}

export default function MoodResult({ text, mood }: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    fadeAnim.setValue(0);
    slideAnim.setValue(20);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [text]);

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
      ]}
    >
      <Text style={styles.label}>Your {mood} affirmation</Text>
      <Text style={styles.text}>{text}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.cardBg,
    borderRadius: 20,
    padding: 24,
    marginTop: 24,
    borderWidth: 1,
    borderColor: 'rgba(124, 92, 252, 0.2)',
  },
  label: {
    color: Colors.accentGold,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  text: {
    color: Colors.textPrimary,
    fontSize: 18,
    lineHeight: 28,
    fontStyle: 'italic',
  },
});
