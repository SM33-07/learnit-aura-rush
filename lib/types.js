// lib/types.js
// Core types & constants for AURA RUSH — TAKE THE LEAD Multiplayer Extension

export const DEFAULT_POWER_CARDS = [
  { id: 'pc_surge', type: 'SURGE', name: '2× SURGE', icon: '⚡', description: 'Double Aura points for this round', used: false },
  { id: 'pc_shield', type: 'SHIELD', name: 'AURA SHIELD', icon: '🛡️', description: 'Blocks incoming Aura steals', used: false },
  { id: 'pc_drain', type: 'DRAIN', name: 'LEADER DRAIN', icon: '🧲', description: 'Siphon 10% Aura from the #1 player', used: false },
  { id: 'pc_reveal', type: 'REVEAL', name: '50/50 REVEAL', icon: '🔮', description: 'Eliminates 2 wrong answers', used: false },
];

export const PLAYER_COLORS = [
  'yellow',
  'purple',
  'pink',
  'cyan',
  'green',
  'amber',
];

export const PLAYER_AVATARS = ['⚡', '👑', '🚀', '💎', '🔥', '👾'];
