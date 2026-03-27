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
