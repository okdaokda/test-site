import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

interface Plan {
  id: 'monthly' | 'annual';
  title: string;
  price: string;
  perMonth: string;
  badge?: string;
}

const plans: Plan[] = [
  {
    id: 'monthly',
    title: 'Monthly',
    price: '$9.99/mo',
    perMonth: '$9.99/month',
  },
  {
    id: 'annual',
    title: 'Annual',
    price: '$59.99/yr',
    perMonth: '$4.99/month',
    badge: 'Save 50%',
  },
];

interface Props {
  selected: 'monthly' | 'annual';
  onSelect: (plan: 'monthly' | 'annual') => void;
}

export default function PlanSelector({ selected, onSelect }: Props) {
  return (
    <View style={styles.container}>
      {plans.map((plan) => {
        const isSelected = selected === plan.id;
        return (
          <TouchableOpacity
            key={plan.id}
            style={[
              styles.planCard,
              isSelected && styles.planCardSelected,
              plan.badge && styles.planCardHighlighted,
            ]}
            onPress={() => onSelect(plan.id)}
            activeOpacity={0.8}
          >
            {plan.badge && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{plan.badge}</Text>
              </View>
            )}

            <View style={[styles.radio, isSelected && styles.radioSelected]}>
              {isSelected && (
                <Ionicons name="checkmark" size={14} color={Colors.background} />
              )}
            </View>

            <View style={styles.planInfo}>
              <Text style={styles.planTitle}>{plan.title}</Text>
              <Text style={styles.planPrice}>{plan.price}</Text>
              <Text style={styles.planPerMonth}>{plan.perMonth}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
  },
  planCard: {
    flex: 1,
    backgroundColor: Colors.cardBg,
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    minHeight: 120,
  },
  planCardSelected: {
    borderColor: Colors.accent,
  },
  planCardHighlighted: {
    borderColor: Colors.accentGold,
  },
  badge: {
    position: 'absolute',
    top: -10,
    right: 12,
    backgroundColor: Colors.accentGold,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  badgeText: {
    color: Colors.background,
    fontSize: 11,
    fontWeight: '700',
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: Colors.textSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  radioSelected: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  planInfo: {
    gap: 2,
  },
  planTitle: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  planPrice: {
    color: Colors.textPrimary,
    fontSize: 20,
    fontWeight: '800',
    marginTop: 4,
  },
  planPerMonth: {
    color: Colors.textSecondary,
    fontSize: 12,
  },
});
