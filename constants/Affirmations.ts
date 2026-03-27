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
