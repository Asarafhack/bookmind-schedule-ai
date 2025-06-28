
import { Location } from '@/types/booking';

export const locations: Location[] = [
  {
    id: 'del',
    name: 'Delhi',
    code: 'DEL',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=600&fit=crop',
    timezone: 'Asia/Kolkata'
  },
  {
    id: 'che',
    name: 'Chennai',
    code: 'CHE',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop',
    timezone: 'Asia/Kolkata'
  },
  {
    id: 'coi',
    name: 'Coimbatore',
    code: 'COI',
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&h=600&fit=crop',
    timezone: 'Asia/Kolkata'
  },
  {
    id: 'ban',
    name: 'Bangalore',
    code: 'BAN',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&h=600&fit=crop',
    timezone: 'Asia/Kolkata'
  }
];

export const cheatCodes = [
  { code: 'bm0123', type: 'casual' as const, description: 'Casual dress code allowed' },
  { code: 'bm0111', type: 'fever' as const, description: 'Health monitoring waived' },
  { code: 'bm0789', type: 'casual' as const, description: 'Extended break time' },
  { code: 'bm0456', type: 'fever' as const, description: 'Remote work option' }
];

export const timestampCheatCodes = [
  { code: 'ts2024', description: 'Backdated entry for 2024', allowsBackdating: true },
  { code: 'flex01', description: 'Flexible timing mode', allowsFlexibleHours: true },
  { code: 'early9', description: 'Early bird - 9 AM start', fixedStartTime: '09:00' },
  { code: 'night8', description: 'Night shift - 8 PM start', fixedStartTime: '20:00' },
  { code: 'admin0', description: 'Admin override for any time', adminOverride: true }
];

export const backgroundImages = [
  'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=1920&h=1080&fit=crop', // woman with laptop
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&h=1080&fit=crop', // woman in office
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1920&h=1080&fit=crop', // matrix style
  'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=1920&h=1080&fit=crop', // starry night
  'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=1920&h=1080&fit=crop'  // lights between trees
];
