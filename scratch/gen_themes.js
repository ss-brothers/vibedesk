const fs = require('fs');

const fontOptions = [
  'font-orbitron', 'font-quicksand', 'font-lora', 'font-caveat', 'font-space',
  'font-amatic', 'font-cinzel', 'font-creepster', 'font-rubik-glitch', 'font-chakra',
  'font-press-start', 'font-nosifer', 'font-eater', 'font-rye', 'font-kalam', 
  'font-yatra', 'font-shrikhand', 'font-bangers', 'font-silkscreen', 'font-uncial'
];

const themesList = [
  // Creepy variations
  { 
    id: 'zombie', name: 'Zombie', img: '1505635552518-3448ff116af3', prim: '#84cc16', tags: ['Creepy', 'Cinematic'], font: 'font-nosifer', msg: 'Survive.',
    // User will provide direct .mp4 and .mp3 links later
    gameUrlOverride: 'https://zombie-game.apoorvdarshan.com/'
  },
  { id: 'hell', name: 'Hell', img: '1505528636903-a128e48b87ee', prim: '#ef4444', tags: ['Creepy', 'Cinematic'], font: 'font-creepster', msg: 'Rip and tear.' },
  { id: 'goth', name: 'Goth', img: '1509249738012-3b2d69f37c35', prim: '#dc2626', tags: ['Creepy', 'Edgy'], font: 'font-eater', msg: 'Embrace shadows.' },
  { id: 'backrooms', name: 'Backrooms', img: '1563212036-74895f3d4530', prim: '#eab308', tags: ['Creepy', 'GenZ'], font: 'font-space', msg: 'You clipped out.' },
  { id: 'liminal', name: 'Liminal', img: '1621252179027-94459d278660', prim: '#94a3b8', tags: ['Creepy', 'Aesthetic'], font: 'font-quicksand', msg: 'Where is everyone?' },
  { id: 'glitchcore', name: 'Glitchcore', img: '1601362840469-51e4d8d58785', prim: '#34d399', tags: ['GenZ', 'Edgy'], font: 'font-rubik-glitch', msg: 'S Y S T E M   E R R O R' },

  // Fantasy / Cinematic / Western
  { id: 'scifi', name: 'Sci-Fi', img: '1515630278258-407f66498911', prim: '#0ff', tags: ['Cinematic', 'Sci-Fi'], font: 'font-orbitron', msg: 'Welcome back.' },
  { id: 'space', name: 'Space', img: '1614730321146-b6fa6a46bcb4', prim: '#14b8a6', tags: ['Cinematic', 'Sci-Fi'], font: 'font-silkscreen', msg: 'Orbit achieved.' },
  { id: 'cyber', name: 'Cyberpunk', img: '1503899036067-04d9b4b04fb0', prim: '#f472b6', tags: ['Cinematic', 'GenZ'], font: 'font-chakra', msg: 'Neon dreams.' },
  { id: 'western', name: 'Wild West', img: '1473445763015-181b5c9077ce', prim: '#d97706', tags: ['Cinematic', 'Cultural'], font: 'font-rye', msg: 'Howdy, partner.' },
  { id: 'tavern', name: 'Tavern', img: '1514933651103-005eec06c04b', prim: '#d97706', tags: ['Fantasy', 'Calm'], font: 'font-uncial', msg: 'Rest here, traveler.' },
  { id: 'magic', name: 'Magic', img: '1518709268805-4e9042af9f23', prim: '#d946ef', tags: ['Fantasy', 'Calm'], font: 'font-cinzel', msg: 'Cast your spell.' },

  // GenZ / Aesthetic
  { id: 'dreamcore', name: 'Dreamcore', img: '1499346030926-9a72daac6c63', prim: '#f472b6', tags: ['Aesthetic', 'Creepy'], font: 'font-caveat', msg: 'Wake up.' },
  { id: 'y2k', name: 'Y2K', img: '1618005182384-a83a8bd57fbe', prim: '#c084fc', tags: ['GenZ', 'Aesthetic'], font: 'font-bangers', msg: 'New millennium.' },
  { id: 'academia', name: 'Academia', img: '1507842217343-583bb7270b66', prim: '#d4a373', tags: ['Aesthetic', 'Focus'], font: 'font-lora', msg: 'Knowledge is power.' },
  { id: 'gaming', name: 'Gaming', img: '1550745165-9bc0b252726f', prim: '#fb923c', tags: ['GenZ', 'Energetic'], font: 'font-press-start', msg: 'Press Start.' },

  // Nature / Calm
  { id: 'beach', name: 'Beach', img: '1507525428034-b723cf961d3e', prim: '#ff9d00', tags: ['Nature', 'Calm'], font: 'font-quicksand', msg: 'Ready to focus?' },
  { id: 'forest', name: 'Forest', img: '1448375240586-882707db888b', prim: '#4ade80', tags: ['Nature', 'Calm'], font: 'font-lora', msg: 'Find your peace.' },
  { id: 'desert', name: 'Desert', img: '1682687220199-d0124f48f95b', prim: '#d97706', tags: ['Nature', 'Calm'], font: 'font-amatic', msg: 'Stay hydrated.' },
  { id: 'lofi', name: 'Lofi Room', img: '1519681393784-d120267933ba', prim: '#a78bfa', tags: ['Calm', 'Focus', 'Aesthetic'], font: 'font-kalam', msg: 'Time to grind.' },

  // Missing Daily Life & Seasons
  { id: 'city', name: 'City', img: '1477959858617-67f85cf4f1df', prim: '#fcd34d', tags: ['Daily Life', 'Cinematic'], font: 'font-space', msg: 'City never sleeps.' },
  { id: 'village', name: 'Village', img: '1505298918237-7f8e847e1329', prim: '#f59e0b', tags: ['Cultural', 'Daily Life', 'Calm'], font: 'font-lora', msg: 'Simple life.' },
  { id: 'cafe', name: 'Cafe', img: '1501339817309-1461ba14ce4c', prim: '#d97706', tags: ['Daily Life', 'Calm'], font: 'font-caveat', msg: 'Coffee time.' },
  { id: 'train', name: 'Train', img: '1474487548417-781cb71495f3', prim: '#94a3b8', tags: ['Daily Life', 'Calm'], font: 'font-space', msg: 'Next stop.' },
  { id: 'library', name: 'Library', img: '1524995997946-a1c2e315a42f', prim: '#d4a373', tags: ['Focus', 'Calm', 'Daily Life'], font: 'font-lora', msg: 'Quiet please.' },
  { id: 'winter', name: 'Winter', img: '1418985991508-e47386d96a71', prim: '#94a3b8', tags: ['Seasons', 'Nature', 'Calm'], font: 'font-lora', msg: 'Stay warm.' },
  { id: 'autumn', name: 'Autumn', img: '1507371341162-763b5e419408', prim: '#f97316', tags: ['Seasons', 'Nature'], font: 'font-lora', msg: 'Crisp air.' },
  { id: 'spring', name: 'Spring', img: '1490750967868-88aa4486c946', prim: '#f43f5e', tags: ['Seasons', 'Nature'], font: 'font-quicksand', msg: 'Bloom.' },
  { id: 'summer', name: 'Summer', img: '1507525428034-b723cf961d3e', prim: '#fcd34d', tags: ['Seasons', 'Nature'], font: 'font-amatic', msg: 'Sun kissed.' },
  { id: 'monsoon', name: 'Monsoon', img: '1515694346937-94d85e41e6f0', prim: '#38bdf8', tags: ['Seasons', 'Nature', 'Calm'], font: 'font-caveat', msg: 'Rainy days.' },
  { id: 'underwater', name: 'Underwater', img: '1682687982501-1e5898cb8e4b', prim: '#38bdf8', tags: ['Nature', 'Calm'], font: 'font-quicksand', msg: 'Deep dive.' },
  { id: 'wildlife', name: 'Wildlife', img: '1472214103451-9374bd1c798e', prim: '#4ade80', tags: ['Nature', 'Calm'], font: 'font-lora', msg: 'Wild and free.' },

  // Global Nations
  { id: 'japan', name: 'Japan', img: '1493976040374-85c8e12f0c0e', prim: '#fda4af', tags: ['Global', 'Cultural', 'Calm'], font: 'font-yatra', msg: 'Find inner peace.' },
  { id: 'usa', name: 'USA', img: '1480714378408-67cf0d13bc1b', prim: '#bfdbfe', tags: ['Global', 'Cinematic', 'City'], font: 'font-bangers', msg: 'The big apple.' },
  { id: 'russia', name: 'Russia', img: '1547448415-e9f5b28e570d', prim: '#cbd5e1', tags: ['Global', 'Cultural'], font: 'font-cinzel', msg: 'Winter wonderland.' },
  { id: 'france', name: 'France', img: '1502602273618-62d295ccde3e', prim: '#f9a8d4', tags: ['Global', 'Cultural', 'Calm'], font: 'font-caveat', msg: 'La vie en rose.' },
  { id: 'uae', name: 'UAE', img: '1512453979798-5ea266f8880c', prim: '#fcd34d', tags: ['Global', 'Cinematic', 'City'], font: 'font-orbitron', msg: 'Desert skyline.' },
  { id: 'bhutan', name: 'Bhutan', img: '1586523959146-51b6814041d5', prim: '#4ade80', tags: ['Global', 'Cultural', 'Calm'], font: 'font-lora', msg: 'Land of thunder dragon.' },

  // ALL 28 States of India (Removed 'Nature' and 'Daily Life' and 'Seasons' where odd)
  { id: 'andhra', name: 'Andhra Pradesh', img: '1583335506079-c56784860cc4', prim: '#fcd34d', tags: ['India', 'Cultural'], font: 'font-kalam', msg: 'Carnatic rhythms.' },
  { id: 'arunachal', name: 'Arunachal Pradesh', img: '1526772662000-3f88f10405ff', prim: '#38bdf8', tags: ['India', 'Cultural'], font: 'font-quicksand', msg: 'Dawn-lit mountains.' },
  { id: 'assam', name: 'Assam', img: '1612457814420-7f2824bbd121', prim: '#4ade80', tags: ['India', 'Cultural'], font: 'font-lora', msg: 'Tea gardens calling.' },
  { id: 'bihar', name: 'Bihar', img: '1605335805389-9148d8dbf436', prim: '#f97316', tags: ['India', 'Cultural'], font: 'font-shrikhand', msg: 'Roots of enlightenment.' },
  { id: 'chhattisgarh', name: 'Chhattisgarh', img: '1448375240586-882707db888b', prim: '#4ade80', tags: ['India', 'Cultural'], font: 'font-amatic', msg: 'Tribal heritage.' },
  { id: 'goa', name: 'Goa', img: '1512100356356-de1b85285315', prim: '#38bdf8', tags: ['India', 'Calm'], font: 'font-kalam', msg: 'Sun, sand, sea.' },
  { id: 'gujarat', name: 'Gujarat', img: '1591873105741-948ffcd33054', prim: '#fcd34d', tags: ['India', 'Cultural', 'Energetic'], font: 'font-yatra', msg: 'Vibrant roots.' },
  { id: 'haryana', name: 'Haryana', img: '1500382017468-9049fed747ef', prim: '#84cc16', tags: ['India', 'Cultural'], font: 'font-shrikhand', msg: 'Heart of agriculture.' },
  { id: 'himachal', name: 'Himachal Pradesh', img: '1526772662000-3f88f10405ff', prim: '#94a3b8', tags: ['India', 'Calm'], font: 'font-lora', msg: 'Snowy peaks.' },
  { id: 'jharkhand', name: 'Jharkhand', img: '1472214103451-9374bd1c798e', prim: '#4ade80', tags: ['India', 'Cultural'], font: 'font-caveat', msg: 'Land of forests.' },
  { id: 'karnataka', name: 'Karnataka', img: '1582510003544-4d00b7f7415e', prim: '#f59e0b', tags: ['India', 'Cultural'], font: 'font-cinzel', msg: 'Ancient ruins.' },
  { id: 'kerala', name: 'Kerala', img: '1602216056096-3b50cc0c0d99', prim: '#34d399', tags: ['India', 'Calm'], font: 'font-lora', msg: 'Gods own country.' },
  { id: 'madhyapradesh', name: 'Madhya Pradesh', img: '1514222134-b57cbb8ce073', prim: '#d97706', tags: ['India', 'Cultural'], font: 'font-shrikhand', msg: 'Heart of India.' },
  { id: 'maharashtra', name: 'Maharashtra', img: '1589123053443-4e4889c1b979', prim: '#a3e635', tags: ['India', 'Cultural'], font: 'font-yatra', msg: 'Majestic forts.' },
  { id: 'manipur', name: 'Manipur', img: '1524995997946-a1c2e315a42f', prim: '#a78bfa', tags: ['India', 'Cultural'], font: 'font-quicksand', msg: 'Jeweled land.' },
  { id: 'meghalaya', name: 'Meghalaya', img: '1448375240586-882707db888b', prim: '#38bdf8', tags: ['India', 'Cultural'], font: 'font-lora', msg: 'Abode of clouds.' },
  { id: 'mizoram', name: 'Mizoram', img: '1464822759023-fed622ff2c3b', prim: '#4ade80', tags: ['India', 'Cultural'], font: 'font-kalam', msg: 'Rolling hills.' },
  { id: 'nagaland', name: 'Nagaland', img: '1472214103451-9374bd1c798e', prim: '#dc2626', tags: ['India', 'Cultural'], font: 'font-rye', msg: 'Land of festivals.' },
  { id: 'odisha', name: 'Odisha', img: '1512100356356-de1b85285315', prim: '#f97316', tags: ['India', 'Cultural'], font: 'font-yatra', msg: 'Soul of India.' },
  { id: 'punjab', name: 'Punjab', img: '1626546377799-73fb4e9e05fa', prim: '#eab308', tags: ['India', 'Cultural', 'Energetic'], font: 'font-bangers', msg: 'Vibrant energy.' },
  { id: 'rajasthan', name: 'Rajasthan', img: '1477587458883-47145ed94245', prim: '#f97316', tags: ['India', 'Cultural'], font: 'font-shrikhand', msg: 'Royal heritage.' },
  { id: 'sikkim', name: 'Sikkim', img: '1526772662000-3f88f10405ff', prim: '#38bdf8', tags: ['India', 'Calm'], font: 'font-lora', msg: 'Mystic mountains.' },
  { id: 'tamilnadu', name: 'Tamil Nadu', img: '1582510003544-4d00b7f7415e', prim: '#f59e0b', tags: ['India', 'Cultural'], font: 'font-cinzel', msg: 'Cultural roots.' },
  { id: 'telangana', name: 'Telangana', img: '1477959858617-67f85cf4f1df', prim: '#fcd34d', tags: ['India', 'Cultural', 'City'], font: 'font-orbitron', msg: 'Deccan vibes.' },
  { id: 'tripura', name: 'Tripura', img: '1493976040374-85c8e12f0c0e', prim: '#4ade80', tags: ['India', 'Cultural'], font: 'font-amatic', msg: 'Bamboo crafts.' },
  { id: 'uttarpradesh', name: 'Uttar Pradesh', img: '1514222134-b57cbb8ce073', prim: '#f97316', tags: ['India', 'Cultural'], font: 'font-yatra', msg: 'Ancient ghats.' },
  { id: 'uttarakhand', name: 'Uttarakhand', img: '1464822759023-fed622ff2c3b', prim: '#38bdf8', tags: ['India', 'Calm'], font: 'font-cinzel', msg: 'Land of gods.' },
  { id: 'bengal', name: 'West Bengal', img: '1558431382-27e303142255', prim: '#fcd34d', tags: ['India', 'Cultural', 'Calm'], font: 'font-lora', msg: 'City of Joy.' },

  // 8 Union Territories
  { id: 'andaman', name: 'Andaman & Nicobar', img: '1507525428034-b723cf961d3e', prim: '#0ea5e9', tags: ['India', 'Calm'], font: 'font-quicksand', msg: 'Pristine shores.' },
  { id: 'chandigarh', name: 'Chandigarh', img: '1500382017468-9049fed747ef', prim: '#34d399', tags: ['India', 'City'], font: 'font-space', msg: 'The beautiful city.' },
  { id: 'dnhdd', name: 'DNH & Daman Diu', img: '1512100356356-de1b85285315', prim: '#38bdf8', tags: ['India', 'Calm'], font: 'font-kalam', msg: 'Coastal peace.' },
  { id: 'delhi', name: 'Delhi', img: '1477959858617-67f85cf4f1df', prim: '#ef4444', tags: ['India', 'City', 'Energetic'], font: 'font-bangers', msg: 'Capital hustle.' },
  { id: 'jk', name: 'Jammu & Kashmir', img: '1418985991508-e47386d96a71', prim: '#94a3b8', tags: ['India', 'Calm'], font: 'font-lora', msg: 'Paradise on earth.' },
  { id: 'ladakh', name: 'Ladakh', img: '1682687220199-d0124f48f95b', prim: '#d97706', tags: ['India', 'Calm'], font: 'font-amatic', msg: 'High altitude peace.' },
  { id: 'lakshadweep', name: 'Lakshadweep', img: '1682687982501-1e5898cb8e4b', prim: '#38bdf8', tags: ['India', 'Calm'], font: 'font-quicksand', msg: 'Coral paradise.' },
  { id: 'puducherry', name: 'Puducherry', img: '1502602273618-62d295ccde3e', prim: '#fcd34d', tags: ['India', 'Cultural', 'Calm'], font: 'font-caveat', msg: 'French riviera of the east.' }
];

// Check for duplicates
const ids = new Set();
themesList.forEach(t => {
  if (ids.has(t.id)) console.error('DUPLICATE ID:', t.id);
  ids.add(t.id);
});

let output = `export type BackgroundType = 'image' | 'video' | 'gradient';

export interface ThemeConfig {
  id: string;
  name: string;
  defaultType: BackgroundType;
  imageUrl: string;
  videoUrl: string;
  gradient: string;
  thumbnailUrl: string;
  audioUrl: string;
  colors: { primary: string; panelBg: string; };
  greetingPrefix: string;
  fontClass: string;
  animationClass?: string;
  gameUrl?: string;
  tags: string[];
}

export const themes: ThemeConfig[] = [\n`;

themesList.forEach((t, i) => {
  // Use a default dark gradient and translucent bg for safety
  const bg = t.bg || 'rgba(10, 10, 10, 0.7)';
  const grad = t.grad || 'linear-gradient(135deg, #111 0%, #000 100%)';
  
  const imgUrl = `https://images.unsplash.com/photo-${t.img}?auto=format&fit=crop&w=1920&q=80`;
  const thumbUrl = `https://images.unsplash.com/photo-${t.img}?auto=format&fit=crop&w=400&q=80`;
  const vidUrl = t.videoUrlOverride || `https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4`;
  const audUrl = t.audioUrlOverride || `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(i%4)+1}.mp3`;
  const gameStr = t.gameUrlOverride ? `,\n    gameUrl: '${t.gameUrlOverride}'` : '';
  
  output += `  {
    id: '${t.id}',
    name: '${t.name}',
    defaultType: 'image',
    imageUrl: '${imgUrl}',
    videoUrl: '${vidUrl}',
    gradient: '${grad}',
    thumbnailUrl: '${thumbUrl}',
    audioUrl: '${audUrl}',
    colors: { primary: '${t.prim}', panelBg: '${bg}' },
    greetingPrefix: '${t.msg}',
    fontClass: '${t.font}',
    tags: ${JSON.stringify(t.tags)}${t.anim ? `,
    animationClass: '${t.anim}'` : ''}${gameStr}
  }${i < themesList.length - 1 ? ',' : ''}\n`;
});

output += `];\n`;

// Write file
fs.writeFileSync('./src/config/themes.ts', output);
console.log('Themes generated successfully! Total Themes: ' + themesList.length);
