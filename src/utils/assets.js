// ========================
// PHOTO FILTERS
// ========================
export const filters = [
  { id: 'normal', name: 'Normal', icon: '🔲', css: 'none', canvas: 'none' },
  { id: 'bw', name: 'B&W', icon: '⬛', css: 'grayscale(100%)', canvas: 'grayscale(100%)' },
  { id: 'sepia', name: 'Vintage', icon: '🟫', css: 'sepia(70%) contrast(1.1) brightness(1.05)', canvas: 'sepia(70%) contrast(1.1) brightness(1.05)' },
  { id: 'warm', name: 'Warm', icon: '🟧', css: 'saturate(1.4) brightness(1.05) hue-rotate(-15deg)', canvas: 'saturate(1.4) brightness(1.05) hue-rotate(-15deg)' },
  { id: 'cool', name: 'Cool', icon: '🟦', css: 'saturate(0.8) brightness(1.1) hue-rotate(20deg)', canvas: 'saturate(0.8) brightness(1.1) hue-rotate(20deg)' },
  { id: 'dramatic', name: 'Dramatic', icon: '🎭', css: 'contrast(1.5) brightness(0.85) saturate(1.3)', canvas: 'contrast(1.5) brightness(0.85) saturate(1.3)' },
  { id: 'dreamy', name: 'Dreamy', icon: '☁️', css: 'brightness(1.15) contrast(0.85) saturate(1.2)', canvas: 'brightness(1.15) contrast(0.85) saturate(1.2)' },
  { id: 'retro', name: 'Retro', icon: '📷', css: 'sepia(25%) contrast(1.2) saturate(1.5) brightness(0.95)', canvas: 'sepia(25%) contrast(1.2) saturate(1.5) brightness(0.95)' },
];

// ========================
// HELPER: Build SVG data URI
// ========================
function svgUri(width, height, content) {
  return 'data:image/svg+xml;utf8,' +
    '<svg width="' + width + '" height="' + height + '" viewBox="0 0 ' + width + ' ' + height + '" xmlns="http://www.w3.org/2000/svg">' +
    content +
    '</svg>';
}

// ========================
// FRAMES (9 total: 3 original + 5 decorated + 1 Sidney Six)
// ========================

// --- 0. Sidney Six (1-photo frame) ---
var sidneySixSvg =
  // Background with single photo hole
  '<path d="M0,0 H1200 V900 H0 Z M60,60 H1140 V700 H60 Z" fill="%231a1a2e" fill-rule="evenodd"/>' +
  // Photo border - double line gold
  '<rect x="55" y="55" width="1090" height="650" fill="none" stroke="%23d4af37" stroke-width="4" rx="4"/>' +
  '<rect x="48" y="48" width="1104" height="664" fill="none" stroke="%23d4af37" stroke-width="1.5" rx="6"/>' +
  // Corner flourishes top-left
  '<line x1="20" y1="20" x2="80" y2="20" stroke="%23d4af37" stroke-width="2"/>' +
  '<line x1="20" y1="20" x2="20" y2="80" stroke="%23d4af37" stroke-width="2"/>' +
  // Corner flourishes top-right
  '<line x1="1120" y1="20" x2="1180" y2="20" stroke="%23d4af37" stroke-width="2"/>' +
  '<line x1="1180" y1="20" x2="1180" y2="80" stroke="%23d4af37" stroke-width="2"/>' +
  // Corner flourishes bottom-left
  '<line x1="20" y1="880" x2="80" y2="880" stroke="%23d4af37" stroke-width="2"/>' +
  '<line x1="20" y1="820" x2="20" y2="880" stroke="%23d4af37" stroke-width="2"/>' +
  // Corner flourishes bottom-right
  '<line x1="1120" y1="880" x2="1180" y2="880" stroke="%23d4af37" stroke-width="2"/>' +
  '<line x1="1180" y1="820" x2="1180" y2="880" stroke="%23d4af37" stroke-width="2"/>' +
  // Stars decorations
  '<circle cx="100" cy="780" r="4" fill="%23d4af37" opacity="0.7"/>' +
  '<circle cx="140" cy="800" r="3" fill="%23d4af37" opacity="0.5"/>' +
  '<circle cx="1060" cy="785" r="4" fill="%23d4af37" opacity="0.7"/>' +
  '<circle cx="1100" cy="800" r="3" fill="%23d4af37" opacity="0.5"/>' +
  // Sparkle left of text
  '<path d="M350 810 C 350 800, 355 805, 365 805 C 355 805, 350 810, 350 820 C 350 810, 345 805, 335 805 C 345 805, 350 800, 350 810 Z" fill="%23d4af37" opacity="0.6"/>' +
  // Sparkle right of text
  '<path d="M850 810 C 850 800, 855 805, 865 805 C 855 805, 850 810, 850 820 C 850 810, 845 805, 835 805 C 845 805, 850 800, 850 810 Z" fill="%23d4af37" opacity="0.6"/>' +
  // Main title text
  '<text x="600" y="800" font-family="Georgia, serif" font-size="56" font-weight="bold" font-style="italic" fill="%23d4af37" text-anchor="middle" letter-spacing="6">SIDNEY SIX</text>' +
  // Decorative line
  '<line x1="400" y1="820" x2="800" y2="820" stroke="%23d4af37" stroke-width="1" opacity="0.4"/>' +
  // Javanese subtitle
  '<text x="600" y="858" font-family="Georgia, serif" font-size="24" fill="%23888888" text-anchor="middle" letter-spacing="3">Monggo Dipunfoto</text>';

// --- 1. Classic Gold Vertical ---
var classicGoldSvg =
  '<path d="M0,0 H800 V2600 H0 Z M50,100 H750 V625 H50 Z M50,675 H750 V1200 H50 Z M50,1250 H750 V1775 H50 Z M50,1825 H750 V2350 H50 Z" fill="%23faf9f6" fill-rule="evenodd"/>' +
  '<rect x="48" y="98" width="704" height="529" fill="none" stroke="%23d4af37" stroke-width="4"/>' +
  '<rect x="48" y="673" width="704" height="529" fill="none" stroke="%23d4af37" stroke-width="4"/>' +
  '<rect x="48" y="1248" width="704" height="529" fill="none" stroke="%23d4af37" stroke-width="4"/>' +
  '<rect x="48" y="1823" width="704" height="529" fill="none" stroke="%23d4af37" stroke-width="4"/>' +
  '<text x="400" y="2440" font-family="Georgia, serif" font-size="56" font-weight="bold" font-style="italic" fill="%23d4af37" text-anchor="middle" letter-spacing="4">SIDNEY SIX</text>' +
  '<line x1="200" y1="2460" x2="600" y2="2460" stroke="%23d4af37" stroke-width="1" opacity="0.4"/>' +
  '<text x="400" y="2510" font-family="Georgia, serif" font-size="28" fill="%23d4af37" text-anchor="middle" opacity="0.7">Kumpul Kanca Lawas</text>';

// --- 2. Elegant 2x2 Grid ---
var elegantGridSvg =
  '<path d="M0,0 H1600 V1400 H0 Z M75,100 H775 V625 H75 Z M825,100 H1525 V625 H825 Z M75,675 H775 V1200 H75 Z M825,675 H1525 V1200 H825 Z" fill="%23faf9f6" fill-rule="evenodd"/>' +
  '<rect x="73" y="98" width="704" height="529" fill="none" stroke="%23d4af37" stroke-width="4"/>' +
  '<rect x="823" y="98" width="704" height="529" fill="none" stroke="%23d4af37" stroke-width="4"/>' +
  '<rect x="73" y="673" width="704" height="529" fill="none" stroke="%23d4af37" stroke-width="4"/>' +
  '<rect x="823" y="673" width="704" height="529" fill="none" stroke="%23d4af37" stroke-width="4"/>' +
  '<text x="800" y="1290" font-family="Georgia, serif" font-size="56" font-weight="bold" font-style="italic" fill="%23d4af37" text-anchor="middle" letter-spacing="4">SIDNEY SIX</text>' +
  '<line x1="550" y1="1310" x2="1050" y2="1310" stroke="%23d4af37" stroke-width="1" opacity="0.4"/>' +
  '<text x="800" y="1365" font-family="Georgia, serif" font-size="28" fill="%23d4af37" text-anchor="middle" opacity="0.7">Ojo Lali Mesem</text>';

// --- 3. Minimalist White ---
var minimalWhiteSvg =
  '<path d="M0,0 H800 V2600 H0 Z M50,100 H750 V625 H50 Z M50,675 H750 V1200 H50 Z M50,1250 H750 V1775 H50 Z M50,1825 H750 V2350 H50 Z" fill="%23ffffff" fill-rule="evenodd"/>' +
  '<rect x="0" y="0" width="800" height="2600" fill="none" stroke="%23dddddd" stroke-width="4"/>' +
  '<text x="400" y="2440" font-family="Georgia, serif" font-size="52" font-weight="bold" font-style="italic" fill="%23333333" text-anchor="middle" letter-spacing="4">SIDNEY SIX</text>' +
  '<line x1="200" y1="2460" x2="600" y2="2460" stroke="%23cccccc" stroke-width="1"/>' +
  '<text x="400" y="2510" font-family="Georgia, serif" font-size="26" fill="%23777777" text-anchor="middle">Urip Iku Urup</text>';

// --- 4. Sakura Blossom (NEW - Vertical) ---
var sakuraSvg =
  // Background with photo holes (punched out)
  '<path d="M0,0 H800 V2600 H0 Z M60,120 H740 V620 H60 Z M60,690 H740 V1190 H60 Z M60,1260 H740 V1760 H60 Z M60,1830 H740 V2330 H60 Z" fill="%23fff0f3" fill-rule="evenodd"/>' +
  // Borders with pink
  '<rect x="58" y="118" width="684" height="504" fill="none" stroke="%23f48fb1" stroke-width="3" rx="8"/>' +
  '<rect x="58" y="688" width="684" height="504" fill="none" stroke="%23f48fb1" stroke-width="3" rx="8"/>' +
  '<rect x="58" y="1258" width="684" height="504" fill="none" stroke="%23f48fb1" stroke-width="3" rx="8"/>' +
  '<rect x="58" y="1828" width="684" height="504" fill="none" stroke="%23f48fb1" stroke-width="3" rx="8"/>' +
  // Sakura flowers - top left
  '<circle cx="90" cy="50" r="18" fill="%23f8bbd0" opacity="0.8"/>' +
  '<circle cx="60" cy="70" r="14" fill="%23f48fb1" opacity="0.6"/>' +
  '<circle cx="120" cy="40" r="12" fill="%23fce4ec" opacity="0.7"/>' +
  '<circle cx="40" cy="35" r="10" fill="%23f48fb1" opacity="0.5"/>' +
  // Sakura flowers - top right
  '<circle cx="710" cy="45" r="16" fill="%23f8bbd0" opacity="0.7"/>' +
  '<circle cx="740" cy="70" r="14" fill="%23f48fb1" opacity="0.6"/>' +
  '<circle cx="680" cy="30" r="12" fill="%23fce4ec" opacity="0.8"/>' +
  '<circle cx="760" cy="30" r="10" fill="%23f48fb1" opacity="0.5"/>' +
  // Scatter petals between rows
  '<circle cx="50" cy="650" r="8" fill="%23f8bbd0" opacity="0.5"/>' +
  '<circle cx="750" cy="655" r="10" fill="%23f48fb1" opacity="0.4"/>' +
  '<circle cx="400" cy="1230" r="8" fill="%23fce4ec" opacity="0.6"/>' +
  '<circle cx="100" cy="1800" r="10" fill="%23f8bbd0" opacity="0.5"/>' +
  '<circle cx="700" cy="1805" r="8" fill="%23f48fb1" opacity="0.4"/>' +
  // Sakura branch (bottom)
  '<line x1="200" y1="2600" x2="500" y2="2370" stroke="%238d6e63" stroke-width="3" opacity="0.6"/>' +
  '<circle cx="480" cy="2390" r="16" fill="%23f8bbd0" opacity="0.7"/>' +
  '<circle cx="520" cy="2380" r="12" fill="%23f48fb1" opacity="0.6"/>' +
  '<circle cx="460" cy="2410" r="10" fill="%23fce4ec" opacity="0.8"/>' +
  '<circle cx="540" cy="2400" r="14" fill="%23f8bbd0" opacity="0.5"/>' +
  '<circle cx="500" cy="2430" r="8" fill="%23f48fb1" opacity="0.6"/>' +
  // Bottom text
  '<text x="400" y="2490" font-family="Georgia, serif" font-size="52" font-weight="bold" font-style="italic" fill="%23f48fb1" text-anchor="middle" letter-spacing="4">SIDNEY SIX</text>' +
  '<line x1="200" y1="2510" x2="600" y2="2510" stroke="%23f48fb1" stroke-width="1" opacity="0.4"/>' +
  '<text x="400" y="2555" font-family="Georgia, serif" font-size="26" fill="%23f48fb1" text-anchor="middle" opacity="0.7">Ayu Tenan Cah</text>' +
  '<text x="400" y="2585" font-family="sans-serif" font-size="20" fill="%23f48fb1" text-anchor="middle" opacity="0.5">✿ ✿ ✿</text>';

// --- 5. Midnight Galaxy (NEW - Grid 2x2) ---
var galaxySvg =
  // Dark background with holes
  '<path d="M0,0 H1600 V1400 H0 Z M75,100 H775 V625 H75 Z M825,100 H1525 V625 H825 Z M75,675 H775 V1200 H75 Z M825,675 H1525 V1200 H825 Z" fill="%231a1a2e" fill-rule="evenodd"/>' +
  // Borders - glowing blue
  '<rect x="73" y="98" width="704" height="529" fill="none" stroke="%234fc3f7" stroke-width="3" rx="6"/>' +
  '<rect x="823" y="98" width="704" height="529" fill="none" stroke="%234fc3f7" stroke-width="3" rx="6"/>' +
  '<rect x="73" y="673" width="704" height="529" fill="none" stroke="%234fc3f7" stroke-width="3" rx="6"/>' +
  '<rect x="823" y="673" width="704" height="529" fill="none" stroke="%234fc3f7" stroke-width="3" rx="6"/>' +
  // Stars scattered
  '<circle cx="50" cy="30" r="3" fill="%23ffffff" opacity="0.9"/>' +
  '<circle cx="200" cy="60" r="2" fill="%23ffffff" opacity="0.7"/>' +
  '<circle cx="400" cy="25" r="4" fill="%23fff9c4" opacity="0.8"/>' +
  '<circle cx="600" cy="50" r="2" fill="%23ffffff" opacity="0.6"/>' +
  '<circle cx="900" cy="35" r="3" fill="%23ffffff" opacity="0.8"/>' +
  '<circle cx="1100" cy="55" r="2" fill="%23fff9c4" opacity="0.7"/>' +
  '<circle cx="1300" cy="30" r="4" fill="%23ffffff" opacity="0.9"/>' +
  '<circle cx="1500" cy="60" r="2" fill="%23ffffff" opacity="0.6"/>' +
  '<circle cx="30" cy="650" r="2" fill="%23ffffff" opacity="0.7"/>' +
  '<circle cx="810" cy="650" r="3" fill="%23fff9c4" opacity="0.6"/>' +
  '<circle cx="1560" cy="640" r="2" fill="%23ffffff" opacity="0.8"/>' +
  // Crescent moon top-right
  '<circle cx="1530" cy="45" r="22" fill="%23fff9c4" opacity="0.9"/>' +
  '<circle cx="1542" cy="38" r="18" fill="%231a1a2e"/>' +
  // Bottom stars
  '<circle cx="100" cy="1250" r="3" fill="%23ffffff" opacity="0.8"/>' +
  '<circle cx="300" cy="1280" r="2" fill="%23fff9c4" opacity="0.6"/>' +
  '<circle cx="800" cy="1240" r="4" fill="%23ffffff" opacity="0.7"/>' +
  '<circle cx="1200" cy="1260" r="2" fill="%23ffffff" opacity="0.9"/>' +
  '<circle cx="1500" cy="1250" r="3" fill="%23fff9c4" opacity="0.7"/>' +
  // Shooting star
  '<line x1="150" y1="40" x2="250" y2="75" stroke="%23ffffff" stroke-width="1.5" opacity="0.5"/>' +
  // Text
  '<text x="800" y="1290" font-family="Georgia, serif" font-size="52" font-weight="bold" font-style="italic" fill="%234fc3f7" text-anchor="middle" letter-spacing="4">SIDNEY SIX</text>' +
  '<line x1="550" y1="1310" x2="1050" y2="1310" stroke="%234fc3f7" stroke-width="1" opacity="0.4"/>' +
  '<text x="800" y="1365" font-family="Georgia, serif" font-size="26" fill="%234fc3f7" text-anchor="middle" opacity="0.7">Ngimpi Sing Dhuwur</text>';

// --- 6. Vintage Cinema (NEW - Vertical, Film Strip) ---
var cinemaSvg =
  // Black film strip background with photo holes
  '<path d="M0,0 H800 V2600 H0 Z M80,100 H720 V600 H80 Z M80,680 H720 V1180 H80 Z M80,1260 H720 V1760 H80 Z M80,1840 H720 V2340 H80 Z" fill="%23111111" fill-rule="evenodd"/>' +
  // Sprocket holes - left side
  '<rect x="15" y="30" width="35" height="50" rx="8" fill="%23333333"/>' +
  '<rect x="15" y="150" width="35" height="50" rx="8" fill="%23333333"/>' +
  '<rect x="15" y="650" width="35" height="50" rx="8" fill="%23333333"/>' +
  '<rect x="15" y="770" width="35" height="50" rx="8" fill="%23333333"/>' +
  '<rect x="15" y="1230" width="35" height="50" rx="8" fill="%23333333"/>' +
  '<rect x="15" y="1350" width="35" height="50" rx="8" fill="%23333333"/>' +
  '<rect x="15" y="1810" width="35" height="50" rx="8" fill="%23333333"/>' +
  '<rect x="15" y="1930" width="35" height="50" rx="8" fill="%23333333"/>' +
  '<rect x="15" y="2390" width="35" height="50" rx="8" fill="%23333333"/>' +
  '<rect x="15" y="2510" width="35" height="50" rx="8" fill="%23333333"/>' +
  // Sprocket holes - right side
  '<rect x="750" y="30" width="35" height="50" rx="8" fill="%23333333"/>' +
  '<rect x="750" y="150" width="35" height="50" rx="8" fill="%23333333"/>' +
  '<rect x="750" y="650" width="35" height="50" rx="8" fill="%23333333"/>' +
  '<rect x="750" y="770" width="35" height="50" rx="8" fill="%23333333"/>' +
  '<rect x="750" y="1230" width="35" height="50" rx="8" fill="%23333333"/>' +
  '<rect x="750" y="1350" width="35" height="50" rx="8" fill="%23333333"/>' +
  '<rect x="750" y="1810" width="35" height="50" rx="8" fill="%23333333"/>' +
  '<rect x="750" y="1930" width="35" height="50" rx="8" fill="%23333333"/>' +
  '<rect x="750" y="2390" width="35" height="50" rx="8" fill="%23333333"/>' +
  '<rect x="750" y="2510" width="35" height="50" rx="8" fill="%23333333"/>' +
  // Frame borders thin white
  '<rect x="78" y="98" width="644" height="504" fill="none" stroke="%23555555" stroke-width="2"/>' +
  '<rect x="78" y="678" width="644" height="504" fill="none" stroke="%23555555" stroke-width="2"/>' +
  '<rect x="78" y="1258" width="644" height="504" fill="none" stroke="%23555555" stroke-width="2"/>' +
  '<rect x="78" y="1838" width="644" height="504" fill="none" stroke="%23555555" stroke-width="2"/>' +
  // Frame numbers
  '<text x="120" y="80" font-family="monospace" font-size="28" fill="%23ff6600" opacity="0.7">01</text>' +
  '<text x="120" y="660" font-family="monospace" font-size="28" fill="%23ff6600" opacity="0.7">02</text>' +
  '<text x="120" y="1240" font-family="monospace" font-size="28" fill="%23ff6600" opacity="0.7">03</text>' +
  '<text x="120" y="1820" font-family="monospace" font-size="28" fill="%23ff6600" opacity="0.7">04</text>' +
  // Bottom text
  '<text x="400" y="2440" font-family="Georgia, serif" font-size="50" font-weight="bold" font-style="italic" fill="%23ff6600" text-anchor="middle" letter-spacing="4" opacity="0.9">SIDNEY SIX</text>' +
  '<line x1="200" y1="2460" x2="600" y2="2460" stroke="%23ff6600" stroke-width="1" opacity="0.3"/>' +
  '<text x="400" y="2505" font-family="Georgia, serif" font-size="24" fill="%23ff6600" text-anchor="middle" opacity="0.6">Kenangan Mbiyen</text>' +
  '<text x="400" y="2550" font-family="monospace" font-size="18" fill="%23666666" text-anchor="middle">35mm PREMIUM FILM</text>';

// --- 7. Sweet Love (NEW - Grid 2x2) ---
var loveSvg =
  // Warm pink bg with photo holes
  '<path d="M0,0 H1600 V1400 H0 Z M80,120 H770 V620 H80 Z M830,120 H1520 V620 H830 Z M80,700 H770 V1200 H80 Z M830,700 H1520 V1200 H830 Z" fill="%23fce4ec" fill-rule="evenodd"/>' +
  // Borders
  '<rect x="78" y="118" width="694" height="504" fill="none" stroke="%23e91e63" stroke-width="3" rx="12"/>' +
  '<rect x="828" y="118" width="694" height="504" fill="none" stroke="%23e91e63" stroke-width="3" rx="12"/>' +
  '<rect x="78" y="698" width="694" height="504" fill="none" stroke="%23e91e63" stroke-width="3" rx="12"/>' +
  '<rect x="828" y="698" width="694" height="504" fill="none" stroke="%23e91e63" stroke-width="3" rx="12"/>' +
  // Hearts top
  '<path d="M80 50 C 68 30, 40 30, 40 50 C 40 70, 80 90, 80 90 C 80 90, 120 70, 120 50 C 120 30, 92 30, 80 50" fill="%23e91e63" opacity="0.7"/>' +
  '<path d="M1520 50 C 1508 30, 1480 30, 1480 50 C 1480 70, 1520 90, 1520 90 C 1520 90, 1560 70, 1560 50 C 1560 30, 1532 30, 1520 50" fill="%23f48fb1" opacity="0.6"/>' +
  // Hearts middle
  '<path d="M800 650 C 788 630, 760 630, 760 650 C 760 670, 800 690, 800 690 C 800 690, 840 670, 840 650 C 840 630, 812 630, 800 650" fill="%23e91e63" opacity="0.5"/>' +
  // Scattered small hearts
  '<path d="M300 50 C 295 42, 285 42, 285 50 C 285 58, 300 66, 300 66 C 300 66, 315 58, 315 50 C 315 42, 305 42, 300 50" fill="%23f8bbd0" opacity="0.6"/>' +
  '<path d="M1300 45 C 1295 37, 1285 37, 1285 45 C 1285 53, 1300 61, 1300 61 C 1300 61, 1315 53, 1315 45 C 1315 37, 1305 37, 1300 45" fill="%23f8bbd0" opacity="0.5"/>' +
  // Bottom scattered hearts
  '<path d="M200 1300 C 195 1292, 185 1292, 185 1300 C 185 1308, 200 1316, 200 1316 C 200 1316, 215 1308, 215 1300 C 215 1292, 205 1292, 200 1300" fill="%23e91e63" opacity="0.5"/>' +
  '<path d="M1400 1290 C 1395 1282, 1385 1282, 1385 1290 C 1385 1298, 1400 1306, 1400 1306 C 1400 1306, 1415 1298, 1415 1290 C 1415 1282, 1405 1282, 1400 1290" fill="%23f48fb1" opacity="0.6"/>' +
  // Text
  '<text x="800" y="1280" font-family="Georgia, serif" font-size="52" font-weight="bold" font-style="italic" fill="%23e91e63" text-anchor="middle" letter-spacing="4">SIDNEY SIX</text>' +
  '<line x1="550" y1="1300" x2="1050" y2="1300" stroke="%23e91e63" stroke-width="1" opacity="0.4"/>' +
  '<text x="800" y="1350" font-family="Georgia, serif" font-size="26" fill="%23e91e63" text-anchor="middle" opacity="0.7">Tresno Sejati</text>' +
  '<text x="800" y="1385" font-family="sans-serif" font-size="18" fill="%23f48fb1" text-anchor="middle" opacity="0.5">♥ ♥ ♥</text>';

// --- 8. Tropical Paradise (NEW - Vertical) ---
var tropicalSvg =
  // Teal bg with photo holes
  '<path d="M0,0 H800 V2600 H0 Z M55,110 H745 V610 H55 Z M55,685 H745 V1185 H55 Z M55,1260 H745 V1760 H55 Z M55,1835 H745 V2335 H55 Z" fill="%23004d40" fill-rule="evenodd"/>' +
  // Borders gold on teal
  '<rect x="53" y="108" width="694" height="504" fill="none" stroke="%23ffb300" stroke-width="3" rx="6"/>' +
  '<rect x="53" y="683" width="694" height="504" fill="none" stroke="%23ffb300" stroke-width="3" rx="6"/>' +
  '<rect x="53" y="1258" width="694" height="504" fill="none" stroke="%23ffb300" stroke-width="3" rx="6"/>' +
  '<rect x="53" y="1833" width="694" height="504" fill="none" stroke="%23ffb300" stroke-width="3" rx="6"/>' +
  // Monstera leaf shapes (top-left)
  '<ellipse cx="60" cy="50" rx="50" ry="35" fill="%2300695c" opacity="0.7" transform="rotate(-30 60 50)"/>' +
  '<ellipse cx="100" cy="30" rx="40" ry="28" fill="%2300796b" opacity="0.6" transform="rotate(10 100 30)"/>' +
  '<ellipse cx="30" cy="80" rx="35" ry="25" fill="%2300897b" opacity="0.5" transform="rotate(-50 30 80)"/>' +
  // Top-right leaves
  '<ellipse cx="740" cy="50" rx="50" ry="35" fill="%2300695c" opacity="0.7" transform="rotate(30 740 50)"/>' +
  '<ellipse cx="700" cy="30" rx="40" ry="28" fill="%2300796b" opacity="0.6" transform="rotate(-10 700 30)"/>' +
  '<ellipse cx="770" cy="80" rx="35" ry="25" fill="%2300897b" opacity="0.5" transform="rotate(50 770 80)"/>' +
  // Small accent leaves between rows
  '<ellipse cx="30" cy="650" rx="20" ry="14" fill="%2300695c" opacity="0.6" transform="rotate(-20 30 650)"/>' +
  '<ellipse cx="770" cy="1230" rx="20" ry="14" fill="%2300695c" opacity="0.5" transform="rotate(20 770 1230)"/>' +
  '<ellipse cx="30" cy="1808" rx="22" ry="15" fill="%2300796b" opacity="0.5" transform="rotate(-30 30 1808)"/>' +
  // Hibiscus flower (bottom)
  '<circle cx="400" cy="2430" r="30" fill="%23ffb300" opacity="0.8"/>' +
  '<circle cx="370" cy="2400" r="18" fill="%23ff7043" opacity="0.7"/>' +
  '<circle cx="430" cy="2400" r="18" fill="%23ff7043" opacity="0.7"/>' +
  '<circle cx="370" cy="2460" r="18" fill="%23ff7043" opacity="0.7"/>' +
  '<circle cx="430" cy="2460" r="18" fill="%23ff7043" opacity="0.7"/>' +
  '<circle cx="400" cy="2430" r="12" fill="%23ffeb3b" opacity="0.9"/>' +
  // Bottom leaves
  '<ellipse cx="300" cy="2500" rx="50" ry="30" fill="%2300695c" opacity="0.6" transform="rotate(-20 300 2500)"/>' +
  '<ellipse cx="500" cy="2510" rx="55" ry="32" fill="%2300695c" opacity="0.5" transform="rotate(15 500 2510)"/>' +
  // Text
  '<text x="400" y="2490" font-family="Georgia, serif" font-size="50" font-weight="bold" font-style="italic" fill="%23ffb300" text-anchor="middle" letter-spacing="4">SIDNEY SIX</text>' +
  '<line x1="200" y1="2510" x2="600" y2="2510" stroke="%23ffb300" stroke-width="1" opacity="0.4"/>' +
  '<text x="400" y="2555" font-family="Georgia, serif" font-size="26" fill="%23ffb300" text-anchor="middle" opacity="0.7">Seger Waras Kabeh</text>';

export const frames = [
  {
    id: 'luxury-vertical',
    name: 'Kumpul Kanca Lawas',
    type: '4-cut-vertical',
    canvasWidth: 800,
    canvasHeight: 2600,
    slots: [
      { x: 50, y: 100, w: 700, h: 525 },
      { x: 50, y: 675, w: 700, h: 525 },
      { x: 50, y: 1250, w: 700, h: 525 },
      { x: 50, y: 1825, w: 700, h: 525 },
    ],
    src: svgUri(800, 2600, classicGoldSvg)
  },
  {
    id: 'luxury-grid',
    name: 'Ojo Lali Mesem',
    type: '4-cut-grid',
    canvasWidth: 1600,
    canvasHeight: 1400,
    slots: [
      { x: 75, y: 100, w: 700, h: 525 },
      { x: 825, y: 100, w: 700, h: 525 },
      { x: 75, y: 675, w: 700, h: 525 },
      { x: 825, y: 675, w: 700, h: 525 },
    ],
    src: svgUri(1600, 1400, elegantGridSvg)
  },
  {
    id: 'minimal-vertical',
    name: 'Urip Iku Urup',
    type: '4-cut-vertical',
    canvasWidth: 800,
    canvasHeight: 2600,
    slots: [
      { x: 50, y: 100, w: 700, h: 525 },
      { x: 50, y: 675, w: 700, h: 525 },
      { x: 50, y: 1250, w: 700, h: 525 },
      { x: 50, y: 1825, w: 700, h: 525 },
    ],
    src: svgUri(800, 2600, minimalWhiteSvg)
  },
  {
    id: 'sakura-blossom',
    name: 'Ayu Tenan Cah',
    type: '4-cut-vertical',
    canvasWidth: 800,
    canvasHeight: 2600,
    slots: [
      { x: 60, y: 120, w: 680, h: 500 },
      { x: 60, y: 690, w: 680, h: 500 },
      { x: 60, y: 1260, w: 680, h: 500 },
      { x: 60, y: 1830, w: 680, h: 500 },
    ],
    src: svgUri(800, 2600, sakuraSvg)
  },
  {
    id: 'midnight-galaxy',
    name: 'Ngimpi Sing Dhuwur',
    type: '4-cut-grid',
    canvasWidth: 1600,
    canvasHeight: 1400,
    slots: [
      { x: 75, y: 100, w: 700, h: 525 },
      { x: 825, y: 100, w: 700, h: 525 },
      { x: 75, y: 675, w: 700, h: 525 },
      { x: 825, y: 675, w: 700, h: 525 },
    ],
    src: svgUri(1600, 1400, galaxySvg)
  },
  {
    id: 'vintage-cinema',
    name: 'Kenangan Mbiyen',
    type: '4-cut-vertical',
    canvasWidth: 800,
    canvasHeight: 2600,
    slots: [
      { x: 80, y: 100, w: 640, h: 500 },
      { x: 80, y: 680, w: 640, h: 500 },
      { x: 80, y: 1260, w: 640, h: 500 },
      { x: 80, y: 1840, w: 640, h: 500 },
    ],
    src: svgUri(800, 2600, cinemaSvg)
  },
  {
    id: 'sweet-love',
    name: 'Tresno Sejati',
    type: '4-cut-grid',
    canvasWidth: 1600,
    canvasHeight: 1400,
    slots: [
      { x: 80, y: 120, w: 690, h: 500 },
      { x: 830, y: 120, w: 690, h: 500 },
      { x: 80, y: 700, w: 690, h: 500 },
      { x: 830, y: 700, w: 690, h: 500 },
    ],
    src: svgUri(1600, 1400, loveSvg)
  },
  {
    id: 'tropical-paradise',
    name: 'Seger Waras Kabeh',
    type: '4-cut-vertical',
    canvasWidth: 800,
    canvasHeight: 2600,
    slots: [
      { x: 55, y: 110, w: 690, h: 500 },
      { x: 55, y: 685, w: 690, h: 500 },
      { x: 55, y: 1260, w: 690, h: 500 },
      { x: 55, y: 1835, w: 690, h: 500 },
    ],
    src: svgUri(800, 2600, tropicalSvg)
  },
  {
    id: 'sidney-six',
    name: 'Monggo Dipunfoto',
    type: '1-photo',
    canvasWidth: 1200,
    canvasHeight: 900,
    slots: [
      { x: 60, y: 60, w: 1080, h: 640 },
    ],
    src: svgUri(1200, 900, sidneySixSvg)
  }
];

export const elements = [
  // --- Originals (enhanced) ---
  {
    id: 'gold-sparkles',
    name: 'Gold Sparkle',
    src: svgUri(100, 100, '<path d="M50 0 C 50 40, 60 50, 100 50 C 60 50, 50 60, 50 100 C 50 60, 40 50, 0 50 C 40 50, 50 40, 50 0 Z" fill="%23d4af37"/>')
  },
  {
    id: 'gold-crown',
    name: 'Mahkota Emas',
    src: svgUri(100, 100, '<path d="M10 80 L90 80 L80 20 L65 50 L50 10 L35 50 L20 20 Z" fill="%23d4af37" stroke="%23b5952f" stroke-width="2"/><rect x="10" y="80" width="80" height="10" rx="3" fill="%23d4af37"/><circle cx="30" cy="80" r="3" fill="%23fff"/><circle cx="50" cy="80" r="3" fill="%23fff"/><circle cx="70" cy="80" r="3" fill="%23fff"/>')
  },
  {
    id: 'heart-red',
    name: 'Hati Merah',
    src: svgUri(100, 100, '<path d="M50 88 C -15 50, 15 -10, 50 25 C 85 -10, 115 50, 50 88" fill="%23e91e63"/><path d="M50 88 C -15 50, 15 -10, 50 25 C 85 -10, 115 50, 50 88" fill="none" stroke="%23c2185b" stroke-width="2"/>')
  },
  {
    id: 'star-gold',
    name: 'Bintang Emas',
    src: svgUri(100, 100, '<polygon points="50,5 61,35 95,35 68,54 78,85 50,65 22,85 32,54 5,35 39,35" fill="%23d4af37"/><polygon points="50,15 58,37 85,37 63,51 71,75 50,60 29,75 37,51 15,37 42,37" fill="%23f5d060"/>')
  },
  // --- Fun & Quirky ---
  {
    id: 'cool-glasses',
    name: 'Kacamata Keren',
    src: svgUri(120, 60, '<ellipse cx="32" cy="30" rx="25" ry="20" fill="none" stroke="%23333" stroke-width="4"/><ellipse cx="88" cy="30" rx="25" ry="20" fill="none" stroke="%23333" stroke-width="4"/><line x1="57" y1="30" x2="63" y2="30" stroke="%23333" stroke-width="4"/><line x1="7" y1="28" x2="0" y2="24" stroke="%23333" stroke-width="3"/><line x1="113" y1="28" x2="120" y2="24" stroke="%23333" stroke-width="3"/><ellipse cx="32" cy="30" rx="22" ry="17" fill="%234fc3f7" opacity="0.3"/><ellipse cx="88" cy="30" rx="22" ry="17" fill="%234fc3f7" opacity="0.3"/>')
  },
  {
    id: 'mustache',
    name: 'Kumis Gaul',
    src: svgUri(120, 60, '<path d="M60 35 C 55 15, 30 10, 10 25 C 5 28, 5 35, 15 33 C 25 31, 40 28, 55 38 Z" fill="%233e2723"/><path d="M60 35 C 65 15, 90 10, 110 25 C 115 28, 115 35, 105 33 C 95 31, 80 28, 65 38 Z" fill="%233e2723"/>')
  },
  {
    id: 'bow-tie',
    name: 'Dasi Kupu',
    src: svgUri(100, 60, '<path d="M50 30 L15 8 L15 52 Z" fill="%23e91e63"/><path d="M50 30 L85 8 L85 52 Z" fill="%23e91e63"/><circle cx="50" cy="30" r="8" fill="%23c2185b"/><circle cx="50" cy="30" r="4" fill="%23fff" opacity="0.5"/>')
  },
  {
    id: 'party-hat',
    name: 'Topi Pesta',
    src: svgUri(100, 100, '<path d="M50 5 L85 90 L15 90 Z" fill="%23ff9800"/><path d="M50 5 L60 90 L40 90 Z" fill="%23ffb74d" opacity="0.5"/><line x1="25" y1="60" x2="75" y2="60" stroke="%234fc3f7" stroke-width="3"/><line x1="30" y1="75" x2="70" y2="75" stroke="%23e91e63" stroke-width="3"/><circle cx="50" cy="5" r="6" fill="%23ffeb3b"/><circle cx="50" cy="5" r="3" fill="%23ff5722"/><ellipse cx="50" cy="90" rx="38" ry="6" fill="%23e65100"/>')
  },
  {
    id: 'kiss-lips',
    name: 'Bibir Kiss',
    src: svgUri(100, 80, '<path d="M50 15 C 30 5, 8 20, 15 40 C 20 55, 45 70, 50 75 C 55 70, 80 55, 85 40 C 92 20, 70 5, 50 15 Z" fill="%23e91e63"/><path d="M50 15 C 38 8, 20 18, 22 32" fill="none" stroke="%23f48fb1" stroke-width="2" opacity="0.6"/><ellipse cx="35" cy="35" rx="6" ry="4" fill="%23f48fb1" opacity="0.4"/>')
  },
  {
    id: 'butterfly',
    name: 'Kupu-kupu',
    src: svgUri(100, 80, '<path d="M50 40 C 30 10, 0 15, 10 40 C 0 65, 30 70, 50 40 Z" fill="%239c27b0" opacity="0.8"/><path d="M50 40 C 70 10, 100 15, 90 40 C 100 65, 70 70, 50 40 Z" fill="%23ab47bc" opacity="0.8"/><path d="M50 40 C 35 25, 18 28, 22 40 C 18 52, 35 55, 50 40 Z" fill="%23ce93d8" opacity="0.6"/><path d="M50 40 C 65 25, 82 28, 78 40 C 82 52, 65 55, 50 40 Z" fill="%23ce93d8" opacity="0.6"/><line x1="50" y1="25" x2="50" y2="60" stroke="%23333" stroke-width="2"/><circle cx="45" cy="22" r="2" fill="%23333"/><circle cx="55" cy="22" r="2" fill="%23333"/>')
  },
  {
    id: 'rainbow',
    name: 'Pelangi',
    src: svgUri(120, 70, '<path d="M10 65 A 50 50 0 0 1 110 65" fill="none" stroke="%23f44336" stroke-width="6"/><path d="M16 65 A 44 44 0 0 1 104 65" fill="none" stroke="%23ff9800" stroke-width="6"/><path d="M22 65 A 38 38 0 0 1 98 65" fill="none" stroke="%23ffeb3b" stroke-width="6"/><path d="M28 65 A 32 32 0 0 1 92 65" fill="none" stroke="%234caf50" stroke-width="6"/><path d="M34 65 A 26 26 0 0 1 86 65" fill="none" stroke="%232196f3" stroke-width="6"/><path d="M40 65 A 20 20 0 0 1 80 65" fill="none" stroke="%239c27b0" stroke-width="6"/>')
  },
  {
    id: 'diamond',
    name: 'Berlian',
    src: svgUri(100, 100, '<polygon points="50,8 85,38 50,95 15,38" fill="%234fc3f7"/><polygon points="50,8 65,38 50,95" fill="%2329b6f6" opacity="0.7"/><polygon points="50,8 85,38 65,38" fill="%2381d4fa" opacity="0.5"/><polygon points="50,8 35,38 15,38" fill="%2381d4fa" opacity="0.5"/><line x1="15" y1="38" x2="85" y2="38" stroke="%23fff" stroke-width="1" opacity="0.6"/>')
  },
  {
    id: 'lightning',
    name: 'Petir',
    src: svgUri(80, 100, '<polygon points="45,0 15,45 35,45 20,100 65,40 42,40 60,0" fill="%23ffeb3b"/><polygon points="45,0 15,45 35,45 20,100 65,40 42,40 60,0" fill="none" stroke="%23f9a825" stroke-width="2"/>')
  },
  {
    id: 'music-notes',
    name: 'Nada Musik',
    src: svgUri(100, 100, '<circle cx="25" cy="75" r="12" fill="%23333"/><circle cx="75" cy="65" r="12" fill="%23333"/><line x1="37" y1="75" x2="37" y2="15" stroke="%23333" stroke-width="4"/><line x1="87" y1="65" x2="87" y2="10" stroke="%23333" stroke-width="4"/><path d="M37 15 C 50 5, 74 0, 87 10" fill="none" stroke="%23333" stroke-width="5"/><path d="M37 25 C 50 15, 74 10, 87 20" fill="none" stroke="%23333" stroke-width="5"/>')
  },
  {
    id: 'angel-halo',
    name: 'Halo Malaikat',
    src: svgUri(100, 50, '<ellipse cx="50" cy="30" rx="40" ry="15" fill="none" stroke="%23ffd54f" stroke-width="5"/><ellipse cx="50" cy="30" rx="40" ry="15" fill="none" stroke="%23fff9c4" stroke-width="2"/><ellipse cx="50" cy="30" rx="35" ry="12" fill="%23fff9c4" opacity="0.2"/>')
  },
  {
    id: 'speech-wow',
    name: 'Balon WOW!',
    src: svgUri(120, 80, '<path d="M10 10 H110 V55 H70 L60 75 L55 55 H10 Z" rx="12" fill="%23ffffff" stroke="%23333" stroke-width="2"/><text x="60" y="42" font-family="sans-serif" font-size="24" font-weight="bold" fill="%23e91e63" text-anchor="middle">WOW!</text>')
  },
  {
    id: 'fire-flame',
    name: 'Api Membara',
    src: svgUri(80, 100, '<path d="M40 95 C 10 70, 5 40, 25 20 C 28 35, 35 40, 38 30 C 38 15, 40 5, 50 0 C 48 15, 55 25, 58 20 C 65 10, 70 20, 75 35 C 80 50, 70 70, 40 95 Z" fill="%23ff9800"/><path d="M40 95 C 20 75, 18 50, 32 35 C 35 45, 42 48, 43 40 C 45 30, 50 20, 55 15 C 53 28, 58 35, 60 30 C 65 22, 68 35, 68 45 C 68 60, 55 80, 40 95 Z" fill="%23f44336"/><path d="M40 95 C 28 82, 28 65, 38 55 C 40 62, 45 65, 46 58 C 48 50, 52 42, 54 38 C 53 48, 56 52, 57 48 C 60 42, 62 50, 60 60 C 58 70, 50 85, 40 95 Z" fill="%23ffeb3b"/>')
  },
  {
    id: 'peace-sign',
    name: 'Peace ✌️',
    src: svgUri(100, 100, '<circle cx="50" cy="50" r="45" fill="none" stroke="%239c27b0" stroke-width="5"/><line x1="50" y1="5" x2="50" y2="95" stroke="%239c27b0" stroke-width="5"/><line x1="50" y1="50" x2="18" y2="82" stroke="%239c27b0" stroke-width="5"/><line x1="50" y1="50" x2="82" y2="82" stroke="%239c27b0" stroke-width="5"/>')
  },
  {
    id: 'flower-crown',
    name: 'Mahkota Bunga',
    src: svgUri(120, 60, '<path d="M10 45 Q 30 20, 60 35 Q 90 20, 110 45" fill="none" stroke="%234caf50" stroke-width="3"/><circle cx="20" cy="30" r="10" fill="%23f48fb1"/><circle cx="20" cy="30" r="5" fill="%23ffeb3b"/><circle cx="45" cy="22" r="12" fill="%23e91e63"/><circle cx="45" cy="22" r="6" fill="%23ffeb3b"/><circle cx="75" cy="22" r="12" fill="%23ff9800"/><circle cx="75" cy="22" r="6" fill="%23ffeb3b"/><circle cx="100" cy="30" r="10" fill="%239c27b0"/><circle cx="100" cy="30" r="5" fill="%23ffeb3b"/><circle cx="60" cy="18" r="8" fill="%234fc3f7"/><circle cx="60" cy="18" r="4" fill="%23fff"/>')
  }
];

