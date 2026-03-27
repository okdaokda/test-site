# ZenPulse — Пошаговое руководство по написанию кода

---

## ШАГ 1. Создание проекта (0-3 мин)

### 1.1 Инициализация Expo-проекта
```bash
cd ~/Desktop
npx create-expo-app@latest ZenPulse --template tabs
cd ZenPulse
```
Шаблон `tabs` создаст готовую структуру с Expo Router и файловой навигацией.

### 1.2 Первый коммит
```bash
git add .
git commit -m "chore: initialize Expo project with tabs template"
```

---

## ШАГ 2. Установка зависимостей (3-5 мин)

### 2.1 Установка пакетов
```bash
npx expo install expo-linear-gradient
npx expo install expo-haptics
npx expo install @react-native-async-storage/async-storage
npx expo install react-native-safe-area-context
```

### 2.2 Проверка — запустить проект
```bash
npx expo start
```
Отсканировать QR в Expo Go — убедиться, что шаблон работает.

### 2.3 Коммит
```bash
git add .
git commit -m "chore: add dependencies (linear-gradient, async-storage, haptics)"
```

---

## ШАГ 3. Константы — Colors.ts (5-7 мин)

### 3.1 Создать файл `constants/Colors.ts`
```typescript
export const Colors = {
  background: '#0B0B1A',
  cardBg: '#1A1A2E',
  accent: '#7C5CFC',
  accentGold: '#D4A574',
  textPrimary: '#FFFFFF',
  textSecondary: '#A0A0B0',
  locked: '#2A2A3E',
  success: '#4CAF50',
  danger: '#FF6B6B',
  overlay: 'rgba(0,0,0,0.5)',
};
```

**Что тут происходит:** создаём единый источник цветов для всего приложения. Тёмная медитативная палитра — deep night blue фон, фиолетовый акцент, золото для premium-элементов.

---

## ШАГ 4. Константы — Meditations.ts (7-10 мин)

### 4.1 Создать файл `constants/Meditations.ts`
```typescript
export interface Meditation {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  category: 'focus' | 'sleep' | 'calm' | 'energy';
  imageUrl: string;
  isFree: boolean;
}

export const meditations: Meditation[] = [
  {
    id: '1',
    title: 'Morning Clarity',
    subtitle: 'Start your day with intention',
    duration: '5 min',
    category: 'focus',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400',
    isFree: true,
  },
  {
    id: '2',
    title: 'Breath of Calm',
    subtitle: 'Deep breathing for relaxation',
    duration: '10 min',
    category: 'calm',
    imageUrl: 'https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?w=400',
    isFree: true,
  },
  {
    id: '3',
    title: 'Focus Flow',
    subtitle: 'Sharpen your concentration',
    duration: '15 min',
    category: 'focus',
    imageUrl: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=400',
    isFree: false,
  },
  {
    id: '4',
    title: 'Deep Sleep Journey',
    subtitle: 'Drift into restful sleep',
    duration: '20 min',
    category: 'sleep',
    imageUrl: 'https://images.unsplash.com/photo-1511295742362-92c96b1cf484?w=400',
    isFree: false,
  },
  {
    id: '5',
    title: 'Energy Boost',
    subtitle: 'Recharge your inner battery',
    duration: '7 min',
    category: 'energy',
    imageUrl: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=400',
    isFree: false,
  },
  {
    id: '6',
    title: 'Evening Unwind',
    subtitle: 'Release the stress of the day',
    duration: '12 min',
    category: 'calm',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    isFree: false,
  },
];
```

**Что тут происходит:** массив мок-данных медитаций. Первые 2 помечены `isFree: true` — они доступны без подписки. Остальные 4 заблокированы. Картинки с Unsplash по теме медитации/природы.

---

## ШАГ 5. Константы — Affirmations.ts (10-12 мин)

### 5.1 Создать файл `constants/Affirmations.ts`
```typescript
export const moodEmojis = [
  { emoji: '😌', label: 'Calm', key: 'calm' },
  { emoji: '😰', label: 'Anxious', key: 'anxious' },
  { emoji: '😔', label: 'Low', key: 'low' },
] as const;

export const affirmations: Record<string, string[]> = {
  calm: [
    'Your stillness is your strength. Like a mountain lake at dawn, your mind reflects clarity and peace. Breathe deeply and know that this moment is exactly where you need to be.',
    'You are grounded in the present. Each breath anchors you deeper into a state of serene awareness. The world may move fast, but your inner world is calm.',
    'Peace flows through you like a gentle river. You have cultivated this tranquility, and it radiates outward, touching everyone around you.',
    'In this stillness, you find your truest self. The noise of the world fades, and what remains is pure, unshakable calm.',
  ],
  anxious: [
    'This feeling is temporary — like clouds passing through an open sky, your anxiety will drift away. You are not your thoughts; you are the vast space that holds them.',
    'Place your hand on your heart. Feel it beating — steady, reliable, strong. Your body knows how to carry you through this. Trust it.',
    'Inhale courage, exhale fear. With every breath, you are choosing peace over panic. You have survived every anxious moment before this one, and you will survive this too.',
    'The storm inside you does not define you. You are the observer, watching the waves with compassion. Let them rise, let them fall. You remain.',
  ],
  low: [
    'Even the sun takes time to rise. Your energy will return, gently and naturally. For now, honor where you are — rest is not weakness, it is wisdom.',
    'You are worthy of good things, even on days when you cannot feel it. This low moment is not your whole story — it is just one quiet chapter.',
    'Imagine a seed resting in dark soil. It is not stuck — it is gathering strength. You are doing the same. Growth is coming, even if you cannot see it yet.',
    'Be gentle with yourself today. You do not need to be productive to be valuable. You do not need to smile to be loved. You are enough, exactly as you are right now.',
  ],
};
```

**Что тут происходит:** три настроения с эмодзи + по 4 реалистичных аффирмации на каждое. Тексты написаны в стиле медитации — спокойные, метафоричные, от второго лица.

---

## ШАГ 6. Контекст подписки — SubscriptionContext.tsx (12-18 мин)

### 6.1 Создать папку `context/` и файл `context/SubscriptionContext.tsx`
```typescript
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SubscriptionContextType {
  isSubscribed: boolean;
  subscribe: () => Promise<void>;
  restorePurchase: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType>({
  isSubscribed: false,
  subscribe: async () => {},
  restorePurchase: async () => {},
});

const STORAGE_KEY = 'zenpulse_subscribed';

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [isSubscribed, setIsSubscribed] = useState(false);

  // При старте — читаем из AsyncStorage
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((value) => {
      if (value === 'true') setIsSubscribed(true);
    });
  }, []);

  // Имитация покупки подписки
  const subscribe = async () => {
    // Имитируем задержку сети
    await new Promise((r) => setTimeout(r, 1000));
    setIsSubscribed(true);
    await AsyncStorage.setItem(STORAGE_KEY, 'true');
  };

  // Восстановление покупки
  const restorePurchase = async () => {
    const value = await AsyncStorage.getItem(STORAGE_KEY);
    if (value === 'true') {
      setIsSubscribed(true);
    }
  };

  return (
    <SubscriptionContext.Provider value={{ isSubscribed, subscribe, restorePurchase }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export const useSubscription = () => useContext(SubscriptionContext);
```

**Что тут происходит:**
- `SubscriptionProvider` оборачивает всё приложение
- `isSubscribed` — флаг, от которого зависит блокировка карточек
- `subscribe()` — имитирует покупку (1 сек задержка + сохранение в AsyncStorage)
- `useSubscription()` — хук для доступа к контексту из любого экрана
- При перезапуске приложения — подписка восстанавливается из хранилища

---

## ШАГ 7. Root Layout — app/_layout.tsx (18-20 мин)

### 7.1 Заменить содержимое `app/_layout.tsx`
```typescript
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
```

**Что тут происходит:**
- `SafeAreaProvider` — обёртка для корректных отступов от "чёлки" и home indicator
- `SubscriptionProvider` — глобальный стейт подписки
- `StatusBar style="light"` — белый текст статус-бара на тёмном фоне
- `paywall` зарегистрирован как модальный экран — будет всплывать снизу поверх табов

---

## ШАГ 8. Tab Layout — app/(tabs)/_layout.tsx (20-22 мин)

### 8.1 Заменить содержимое `app/(tabs)/_layout.tsx`
```typescript
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.cardBg,
          borderTopColor: 'rgba(255,255,255,0.05)',
          height: 85,
          paddingBottom: 30,
          paddingTop: 10,
        },
        tabBarActiveTintColor: Colors.accent,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Meditate',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="leaf-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="mood"
        options={{
          title: 'Mood',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="sparkles-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
```

**Что тут происходит:**
- Два таба: "Meditate" (лист) и "Mood" (искры)
- Тёмный таб-бар с тонкой разделительной линией
- `paddingBottom: 30` — учитывает home indicator на iPhone без кнопки Home
- Фиолетовый акцент для активного таба

### 8.2 Коммит
```bash
git add .
git commit -m "feat: add subscription context, color theme, and meditation data"
```

---

## ШАГ 9. Компонент MeditationCard.tsx (22-30 мин)

### 9.1 Создать `components/MeditationCard.tsx`
```typescript
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
    // Если разблокировано — в реальном приложении открыли бы плеер
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

      {/* Градиент поверх картинки для читаемости текста */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)']}
        style={styles.gradient}
      />

      {/* Бейдж времени */}
      <View style={styles.durationBadge}>
        <Ionicons name="time-outline" size={12} color={Colors.textPrimary} />
        <Text style={styles.durationText}>{meditation.duration}</Text>
      </View>

      {/* Текст внизу карточки */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{meditation.title}</Text>
        <Text style={styles.subtitle}>{meditation.subtitle}</Text>
      </View>

      {/* Оверлей замка для заблокированных */}
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
```

**Что тут происходит:**
- Карточка с фоновой картинкой, градиентом поверх неё и текстом
- Бейдж с длительностью в правом верхнем углу
- Если `isLocked` — картинка затемнена (opacity: 0.4) + оверлей с иконкой замка
- При нажатии на заблокированную карточку — переход на `/paywall`
- Ширина карточки = экран минус паддинги, высота пропорциональна (× 0.45)

---

## ШАГ 10. Экран медитаций — app/(tabs)/index.tsx (30-38 мин)

### 10.1 Заменить содержимое `app/(tabs)/index.tsx`
```typescript
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
        {/* Заголовок */}
        <Text style={styles.greeting}>{getGreeting()}</Text>
        <Text style={styles.title}>Find your peace</Text>

        {/* Категории */}
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

        {/* Список карточек */}
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
```

**Что тут происходит:**
- Приветствие, зависящее от времени суток (утро/день/вечер)
- Горизонтальный скролл с чипами категорий — при нажатии фильтрует карточки
- ScrollView с карточками медитаций (а не FlatList — у нас всего 6 элементов)
- `SafeAreaView edges={['top']}` — отступ сверху от "чёлки", снизу таб-бар сам справится

### 10.2 Коммит
```bash
git add .
git commit -m "feat: implement meditations screen with locked/unlocked card logic"
```

---

## ШАГ 11. Компонент PlanSelector.tsx (38-42 мин)

### 11.1 Создать `components/PlanSelector.tsx`
```typescript
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
            {/* Бейдж "Save 50%" */}
            {plan.badge && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{plan.badge}</Text>
              </View>
            )}

            {/* Чекмарк */}
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
```

**Что тут происходит:**
- Два плана рядом: Monthly и Annual
- У Annual — золотой бейдж "Save 50%" и золотая рамка
- Выбранный план подсвечен фиолетовой рамкой + чекмарк
- `minHeight: 120` + `flex: 1` — одинаковый размер на любом экране

---

## ШАГ 12. Экран Paywall — app/paywall.tsx (42-52 мин)

### 12.1 Создать `app/paywall.tsx`
```typescript
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
        'Welcome to Premium! ✨',
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
      {/* Градиентный фон сверху */}
      <LinearGradient
        colors={[Colors.accent, Colors.background]}
        style={styles.headerGradient}
      />

      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        {/* Кнопка закрытия */}
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
          {/* Иконка */}
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🧘</Text>
          </View>

          {/* Заголовок */}
          <Text style={styles.title}>Unlock Your{'\n'}Inner Peace</Text>
          <Text style={styles.subtitle}>
            Start your 7-day free trial and discover the full ZenPulse experience
          </Text>

          {/* Преимущества */}
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

          {/* Выбор тарифа */}
          <PlanSelector selected={selectedPlan} onSelect={setSelectedPlan} />
        </ScrollView>

        {/* Кнопка покупки — зафиксирована внизу */}
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
```

**Что тут происходит:**
- Модальный экран, всплывающий снизу (настроено в _layout.tsx)
- Градиент от фиолетового к тёмному фону сверху
- Эмодзи 🧘 как иллюстрация (без внешних зависимостей)
- Список из 5 преимуществ с золотыми чекмарками
- PlanSelector для выбора тарифа
- Кнопка "Try 7 Days Free" с градиентом и loading state
- При покупке: haptics → 1 сек задержка → alert → router.back()
- `SafeAreaView edges={['top', 'bottom']}` — модал не имеет таб-бара, нужен отступ снизу
- Кнопка X с hitSlop для увеличения зоны касания

### 12.2 Коммит
```bash
git add .
git commit -m "feat: implement paywall with plan selection and purchase simulation"
```

---

## ШАГ 13. Компонент MoodResult.tsx (52-55 мин)

### 13.1 Создать `components/MoodResult.tsx`
```typescript
import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
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
```

**Что тут происходит:**
- Анимированное появление: fade in + slide up за 800мс
- При каждом новом тексте анимация перезапускается (useEffect на `text`)
- Карточка с тонкой фиолетовой рамкой, заголовок "Your calm/anxious/low affirmation"
- Текст аффирмации курсивом, крупный шрифт для медитативного ощущения

---

## ШАГ 14. Экран AI Mood — app/(tabs)/mood.tsx (55-68 мин)

### 14.1 Создать `app/(tabs)/mood.tsx`
```typescript
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

    // Имитация AI-генерации
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
        {/* Заголовок */}
        <Text style={styles.sparkle}>✨</Text>
        <Text style={styles.title}>AI Mood Check-in</Text>
        <Text style={styles.subtitle}>
          How are you feeling right now? Select your mood and receive a personalized affirmation.
        </Text>

        {/* Выбор настроения */}
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

        {/* Загрузка */}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={Colors.accent} />
            <Text style={styles.loadingText}>Generating your affirmation...</Text>
          </View>
        )}

        {/* Результат */}
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
```

**Что тут происходит:**
- Три кнопки-эмодзи (100×100pt — отлично для пальцев)
- При нажатии: haptics → скрыть предыдущий результат → показать "Generating..." (1.5-2.5 сек) → показать аффирмацию с анимацией
- Кнопка "Generate Another" — перегенерация для того же настроения
- Кнопки заблокированы во время генерации (`disabled={loading}`)

### 14.2 Коммит
```bash
git add .
git commit -m "feat: implement AI Mood of the Day with emoji selection and affirmation generation"
```

---

## ШАГ 15. Удалить лишние файлы из шаблона (68-70 мин)

### 15.1 Убрать файлы шаблона, которые не нужны
Шаблон `tabs` создаёт файлы типа `app/(tabs)/explore.tsx`, `app/(tabs)/two.tsx` и т.п. Удалить всё, что не входит в нашу структуру:
```bash
# Удалить лишние экраны из шаблона (точные имена зависят от версии)
rm app/(tabs)/explore.tsx 2>/dev/null
rm app/(tabs)/two.tsx 2>/dev/null
rm -rf app/+not-found.tsx 2>/dev/null
```

### 15.2 Проверить, что всё работает
```bash
npx expo start
```
Пройти полный флоу: медитации → нажать заблокированную карточку → paywall → купить → карточки разблокированы → таб Mood → выбрать эмодзи → получить аффирмацию.

### 15.3 Коммит
```bash
git add .
git commit -m "chore: remove template boilerplate files"
```

---

## ШАГ 16. Полировка UX (70-80 мин)

### 16.1 Проверить SafeArea на всех экранах
- Открыть каждый экран в Expo Go
- Убедиться, что текст не залезает под Dynamic Island / "чёлку"
- Убедиться, что контент не перекрывается home indicator

### 16.2 Проверить touch targets
- Все кнопки ≥ 44×44pt
- Если какая-то мелкая — добавить `minHeight: 44` и `hitSlop`

### 16.3 Проверить на разных экранах
- iPhone SE (375×667) — всё помещается? Нет горизонтального overflow?
- iPhone Pro Max (430×932) — карточки не слишком мелкие? Текст читаемый?

### 16.4 Добавить анимацию появления карточек (опционально)
В `MeditationsScreen` — добавить `LayoutAnimation.configureNext()` при смене категории:
```typescript
import { LayoutAnimation } from 'react-native';

// В начале функции фильтрации:
LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
```

### 16.5 Коммит
```bash
git add .
git commit -m "style: polish UX with haptics, animations, and SafeArea fixes"
```

---

## ШАГ 17. README.md (80-87 мин)

### 17.1 Написать README.md
```markdown
# ZenPulse: AI Meditation App

Мобильное приложение для медитации с AI-генерацией аффирмаций.

## Запуск
npm install
npx expo start

## Стек
- React Native + Expo (Expo Router)
- TypeScript
- expo-linear-gradient, expo-haptics, AsyncStorage

## Экраны
1. **Meditations** — список сессий с логикой блокировки (isSubscribed)
2. **Paywall** — модальный экран подписки с выбором тарифа
3. **AI Mood** — генерация аффирмаций по настроению

## Как AI справился с мобильной спецификой
- Навигация: Expo Router с файловой структурой — AI корректно создал layout-файлы
- SafeArea: Потребовалась ручная проверка edges={['top']} vs edges={['top', 'bottom']}
- Отступы: AI иногда забывал про paddingBottom для home indicator на iPhone без кнопки

## Контрольный вопрос
**С какими проблемами мобильной вёрстки AI справляется хуже всего?**

1. SafeArea — AI генерирует `edges={['top', 'bottom']}` везде, хотя для экранов с табами нужен только `['top']`
2. Touch targets — AI делает кнопки по размеру текста (30×20pt), нужно вручную добавлять minHeight: 44
3. Адаптивность — AI использует фиксированные размеры вместо flex и процентов
4. Home indicator — AI путает paddingBottom с и без учёта safe area

Контроль: проверка каждого экрана в Expo Go на реальном устройстве после генерации.
```

### 17.2 Коммит
```bash
git add .
git commit -m "docs: add README with AI handling notes and mobile UX decisions"
```

---

## ШАГ 18. Финальная проверка и скриншоты (87-90 мин)

### 18.1 Полный прогон приложения
1. Открыть приложение → экран медитаций → видны 2 открытые + 4 заблокированные карточки
2. Нажать заблокированную → открывается paywall снизу
3. Выбрать тариф → нажать "Try 7 Days Free" → loading → alert → закрытие
4. Все карточки разблокированы
5. Перейти на таб Mood → выбрать эмодзи → "Generating..." → аффирмация
6. Нажать "Generate Another" → новая аффирмация

### 18.2 Сделать скриншоты
- Экран медитаций (с заблокированными карточками)
- Paywall
- Экран медитаций (после покупки)
- AI Mood (выбор эмодзи)
- AI Mood (результат — аффирмация)

### 18.3 Финальный коммит
```bash
git add .
git commit -m "chore: finalize project"
```

### 18.4 Пушнуть на GitHub
```bash
gh repo create ZenPulse --public --source=. --push
```

---

## Итого: 10 коммитов, 18 шагов, 90 минут

| Шаг | Что делаем | Файлы | Время |
|-----|------------|-------|-------|
| 1 | Создание проекта | — | 0-3 мин |
| 2 | Зависимости | package.json | 3-5 мин |
| 3 | Colors.ts | constants/Colors.ts | 5-7 мин |
| 4 | Meditations.ts | constants/Meditations.ts | 7-10 мин |
| 5 | Affirmations.ts | constants/Affirmations.ts | 10-12 мин |
| 6 | SubscriptionContext | context/SubscriptionContext.tsx | 12-18 мин |
| 7 | Root Layout | app/_layout.tsx | 18-20 мин |
| 8 | Tab Layout | app/(tabs)/_layout.tsx | 20-22 мин |
| 9 | MeditationCard | components/MeditationCard.tsx | 22-30 мин |
| 10 | Экран медитаций | app/(tabs)/index.tsx | 30-38 мин |
| 11 | PlanSelector | components/PlanSelector.tsx | 38-42 мин |
| 12 | Paywall | app/paywall.tsx | 42-52 мин |
| 13 | MoodResult | components/MoodResult.tsx | 52-55 мин |
| 14 | Экран Mood | app/(tabs)/mood.tsx | 55-68 мин |
| 15 | Удаление лишнего | — | 68-70 мин |
| 16 | Полировка UX | все файлы | 70-80 мин |
| 17 | README | README.md | 80-87 мин |
| 18 | Скриншоты + push | — | 87-90 мин |
