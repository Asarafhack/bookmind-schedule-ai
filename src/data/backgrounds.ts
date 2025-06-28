
// Professional background images for the application
export const professionalBackgrounds = [
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop', // modern office
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1920&h=1080&fit=crop', // workspace
  'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1920&h=1080&fit=crop', // tech workspace
  'https://images.unsplash.com/photo-1554774853-719586f82d77?w=1920&h=1080&fit=crop', // minimalist office
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1920&h=1080&fit=crop', // modern corporate
  'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1920&h=1080&fit=crop', // business meeting
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop', // city office
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop', // digital workspace
];

export const authBackgrounds = [
  'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&h=1080&fit=crop', // professional login
  'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&h=1080&fit=crop', // tech login
  'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&h=1080&fit=crop', // modern auth
];

export const getRandomBackground = (backgrounds: string[]) => {
  return backgrounds[Math.floor(Math.random() * backgrounds.length)];
};
