# ZenPulse: AI Meditation App — План разработки

ЧТ
## Стек
- **React Native + Expo** (Expo Router, TypeScript)
- Без UI-библиотек, без стейт-менеджеров — React Context + useState
- Тестирование через Expo Go на телефоне

## Зависимости
```bash
npx expo install expo-linear-gradient
npx expo install expo-haptics
npx expo install @react-native-async-storage/async-storage
npx expo install react-native-safe-area-context
```

## Структура проекта
```
ZenPulse/
├── app/
│   ├── _layout.tsx              # Root layout + SubscriptionProvider
│   ├── paywall.tsx              # Модальный Paywall (вне табов)
│   └── (tabs)/
│       ├── _layout.tsx          # Конфиг табов (Meditate + Mood)
│       ├── index.tsx            # Экран медитаций
│       └── mood.tsx             # AI Настрой дня
├── components/
│   ├── MeditationCard.tsx       # Карточка медитации (locked/unlocked)
│   ├── PlanSelector.tsx         # Выбор тарифа (Monthly/Annual)
│   └── MoodResult.tsx           # Отображение аффирмации
├── constants/
│   ├── Colors.ts                # Тёмная тема (deep purple, gold, teal)
│   ├── Meditations.ts           # Мок-данные сессий медитаций
│   └── Affirmations.ts          # Тексты аффирмаций по настроениям
├── context/
│   └── SubscriptionContext.tsx  # React Context для isSubscribed
└── README.md
```

## Цветовая палитра
```
background:    #0B0B1A   (deep night blue)
cardBg:        #1A1A2E   (slightly lighter)
accent:        #7C5CFC   (soft purple)
accentGold:    #D4A574   (warm gold для premium)
textPrimary:   #FFFFFF
textSecondary: #A0A0B0
locked:        #2A2A3E   (greyed-out card)
success:       #4CAF50
```

## Таймлайн (90 минут)

### Фаза 1: Setup + Инфраструктура (0-15 мин)
1. `npx create-expo-app ZenPulse --template tabs` → коммит: `chore: initialize Expo project`
2. Установка зависимостей → коммит: `chore: add dependencies`
3. Colors.ts, Meditations.ts (6-8 мок-сессий, первые 2-3 isFree: true)
4. SubscriptionContext.tsx (isSubscribed + AsyncStorage persistence)
5. app/_layout.tsx (SubscriptionProvider обёртка)
6. app/(tabs)/_layout.tsx (два таба: Meditate + Mood)
7. Коммит: `feat: add context, theme, data`

### Фаза 2: Экран медитаций (15-35 мин)
1. MeditationCard.tsx:
   - isFree || isSubscribed → полноцветная карточка с картинкой, названием, временем
   - Locked → серый оверлей + иконка замка, onPress → router.push('/paywall')
   - expo-linear-gradient оверлей, borderRadius: 16, тени
2. app/(tabs)/index.tsx:
   - ScrollView со списком карточек
   - Приветствие "Good evening, [User]" с логикой времени суток
   - Категории-чипы (All / Focus / Sleep / Calm)
   - SafeAreaView edges={['top']}
3. Коммиты: `feat: meditations screen with lock logic` + `style: polish cards`

### Фаза 3: Paywall (35-55 мин)
1. PlanSelector.tsx:
   - Monthly: $9.99/month
   - Annual: $59.99/year + бейдж "Save 50%" (выделен золотом)
   - useState для выбранного плана
2. app/paywall.tsx (presentation: 'modal'):
   - Градиентный фон с иллюстрацией
   - Заголовок "Unlock Your Inner Peace"
   - Список преимуществ (5 пунктов с чекмарками)
   - PlanSelector
   - Кнопка "Try 7 Days Free":
     - Loading state (1 сек setTimeout)
     - setIsSubscribed(true) + AsyncStorage
     - Success alert → router.back()
   - "Restore Purchase" ссылка внизу
   - Кнопка X (закрыть) в правом верхнем углу
3. Связка навигации: locked card → paywall → unlock → карточки разблокированы
4. Коммиты: `feat: paywall with purchase simulation` + `feat: connect paywall flow`

### Фаза 4: AI Настрой дня (55-75 мин)
1. Affirmations.ts: мок-аффирмации по 3 настроениям (calm/anxious/low)
2. MoodResult.tsx: анимированное появление текста, крупный serif-шрифт
3. app/(tabs)/mood.tsx:
   - Заголовок "AI Mood Check-in"
   - Три больших эмодзи-кнопки: 😌 Calm / 😰 Anxious / 😔 Low
   - При выборе: пульсирующая анимация "Generating..." (1.5-2 сек delay)
   - Показ аффирмации + кнопка "Generate Another"
4. Коммит: `feat: AI Mood of the Day`

### Фаза 5: Полировка + Документация (75-90 мин)
1. SafeArea аудит всех экранов
2. expo-haptics на кнопках (light impact на эмодзи, medium на покупку)
3. Анимации входа (Animated.timing / LayoutAnimation)
4. Touch targets минимум 44x44pt
5. README.md с ответом на контрольный вопрос
6. Скриншоты
7. Коммиты: `style: polish UX` + `docs: add README`

## Ключевые технические решения

### Логика подписки
```typescript
// SubscriptionContext.tsx
// { isSubscribed, setIsSubscribed } через React Context
// AsyncStorage для persistence между перезапусками
```

### Блокировка карточек
```typescript
// MeditationCard: если !isFree && !isSubscribed →
//   серый оверлей + замок + onPress → router.push('/paywall')
```

### AI-генерация (мок)
```typescript
const generateAffirmation = async (mood: string) => {
  await new Promise(r => setTimeout(r, 1500 + Math.random() * 1000));
  return affirmations[mood][Math.floor(Math.random() * pool.length)];
};
// Архитектура позволяет заменить на реальный LLM API
```

## Адаптивность (iPhone SE vs Pro Max)
- flex вместо фиксированных высот
- Пропорциональная высота карточек: `width * 0.45`
- Масштабирование шрифтов: `(screenWidth / 375) * fontSize`
- SafeAreaView: `edges={['top']}` для табовых экранов, `edges={['top', 'bottom']}` для модального paywall
- Touch targets: минимум 44x44pt
- StatusBar style="light" на тёмном фоне

## Стратегия коммитов (10 штук)
1. `chore: initialize Expo project with tabs template`
2. `chore: add dependencies (linear-gradient, async-storage, haptics)`
3. `feat: add subscription context, color theme, and meditation data`
4. `feat: implement meditations screen with locked/unlocked card logic`
5. `style: polish meditation cards with featured section and category filters`
6. `feat: implement paywall with plan selection and purchase simulation`
7. `feat: connect paywall navigation and subscription persistence`
8. `feat: implement AI Mood of the Day with emoji selection`
9. `style: polish UX with haptics, animations, and SafeArea fixes`
10. `docs: add README with AI handling notes`

## Контрольный вопрос (для README)
Проблемы AI с мобильной вёрсткой:
- Генерирует position: absolute вместо flex → ломается на разных размерах
- Забывает про SafeArea → текст залезает под Dynamic Island
- Делает мелкие touch targets
- Путает paddingBottom с учётом и без учёта home indicator
- **Контроль:** проверка в Expo Go на реальном устройстве после каждого экрана
