import os

svg_templates = {
    'article_indian_cricket.svg': '''<svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a192f"/>
      <stop offset="50%" stop-color="#1e3a8a"/>
      <stop offset="100%" stop-color="#064e3b"/>
    </linearGradient>
    <radialGradient id="floodlight" cx="0.5" cy="0.1" r="0.7">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="800" height="600" fill="url(#bg)"/>
  <rect width="800" height="600" fill="url(#floodlight)"/>
  <ellipse cx="400" cy="520" rx="350" ry="120" fill="#15803d" opacity="0.8"/>
  <rect x="360" y="380" width="80" height="150" fill="#ca8a04" opacity="0.4" rx="8"/>
  <line x1="385" y1="360" x2="385" y2="440" stroke="#fef08a" stroke-width="5"/>
  <line x1="400" y1="360" x2="400" y2="440" stroke="#fef08a" stroke-width="5"/>
  <line x1="415" y1="360" x2="415" y2="440" stroke="#fef08a" stroke-width="5"/>
  <line x1="380" y1="360" x2="420" y2="360" stroke="#fef08a" stroke-width="6"/>
  <circle cx="340" cy="420" r="18" fill="#dc2626"/>
  <path d="M 330 410 Q 340 420 330 430" stroke="#ffffff" stroke-width="2" fill="none"/>
  <rect x="430" y="310" width="22" height="110" rx="4" fill="#fde047" transform="rotate(-25 430 310)"/>
  <rect x="424" y="270" width="10" height="45" rx="3" fill="#ffffff" transform="rotate(-25 424 270)"/>
  <rect x="60" y="60" width="220" height="34" rx="17" fill="#ff9933" opacity="0.9"/>
  <text x="170" y="82" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#0f172a" text-anchor="middle">INDIAN CRICKET NEWS</text>
  <text x="400" y="190" font-family="Arial, sans-serif" font-size="36" font-weight="bold" fill="#ffffff" text-anchor="middle">Men in Blue · Test, ODI &amp; T20I</text>
  <text x="400" y="235" font-family="Arial, sans-serif" font-size="18" fill="#93c5fd" text-anchor="middle">ICC Tournaments, WTC Milestones &amp; Historic Series</text>
</svg>''',

    'article_indian_hockey.svg': '''<svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="hockeyBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0284c7"/>
      <stop offset="60%" stop-color="#0369a1"/>
      <stop offset="100%" stop-color="#0c4a6e"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#hockeyBg)"/>
  <circle cx="400" cy="300" r="180" stroke="#ffffff" stroke-width="4" stroke-opacity="0.3" fill="none"/>
  <line x1="50" y1="300" x2="750" y2="300" stroke="#ffffff" stroke-width="4" stroke-opacity="0.4"/>
  <path d="M 280 460 Q 320 380 340 260" stroke="#f59e0b" stroke-width="14" stroke-linecap="round" fill="none"/>
  <path d="M 280 460 Q 250 490 280 500" stroke="#f59e0b" stroke-width="14" stroke-linecap="round" fill="none"/>
  <path d="M 520 460 Q 480 380 460 260" stroke="#ffffff" stroke-width="14" stroke-linecap="round" fill="none"/>
  <path d="M 520 460 Q 550 490 520 500" stroke="#ffffff" stroke-width="14" stroke-linecap="round" fill="none"/>
  <circle cx="400" cy="460" r="22" fill="#facc15" stroke="#ca8a04" stroke-width="3"/>
  <rect x="60" y="60" width="220" height="34" rx="17" fill="#10b981" opacity="0.9"/>
  <text x="170" y="82" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">INDIAN HOCKEY GLORY</text>
  <text x="400" y="180" font-family="Arial, sans-serif" font-size="38" font-weight="bold" fill="#ffffff" text-anchor="middle">8 Olympic Golds &amp; Modern Renaissance</text>
  <text x="400" y="220" font-family="Arial, sans-serif" font-size="18" fill="#bae6fd" text-anchor="middle">Tokyo &amp; Paris Back-to-Back Olympic Bronze Medals</text>
</svg>''',

    'article_womens_cricket.svg': '''<svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="wcricketBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#4c1d95"/>
      <stop offset="50%" stop-color="#1e1b4b"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#wcricketBg)"/>
  <path d="M 370 280 L 430 280 L 420 420 L 380 420 Z" fill="#fbbf24"/>
  <path d="M 350 300 Q 320 340 375 360" stroke="#f59e0b" stroke-width="6" fill="none"/>
  <path d="M 450 300 Q 480 340 425 360" stroke="#f59e0b" stroke-width="6" fill="none"/>
  <rect x="360" y="420" width="80" height="25" rx="4" fill="#d97706"/>
  <circle cx="400" cy="240" r="30" fill="#f43f5e" opacity="0.8"/>
  <text x="400" y="246" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#ffffff" text-anchor="middle">WPL</text>
  <rect x="60" y="60" width="240" height="34" rx="17" fill="#ec4899" opacity="0.9"/>
  <text x="180" y="82" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">WOMEN IN BLUE CRICKET</text>
  <text x="400" y="160" font-family="Arial, sans-serif" font-size="38" font-weight="bold" fill="#ffffff" text-anchor="middle">Empowering Indian Women's Cricket</text>
  <text x="400" y="500" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#fed7aa" text-anchor="middle">Harmanpreet Kaur · Smriti Mandhana · WPL Era</text>
</svg>''',

    'article_indian_athletics.svg': '''<svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="athleticsBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#b45309"/>
      <stop offset="50%" stop-color="#78350f"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#athleticsBg)"/>
  <path d="M 50 550 Q 400 350 750 550" stroke="#ef4444" stroke-width="12" fill="none" opacity="0.6"/>
  <path d="M 50 520 Q 400 320 750 520" stroke="#ffffff" stroke-width="3" fill="none" opacity="0.7"/>
  <path d="M 50 490 Q 400 290 750 490" stroke="#ffffff" stroke-width="3" fill="none" opacity="0.7"/>
  <line x1="200" y1="460" x2="560" y2="220" stroke="#fef08a" stroke-width="6" stroke-linecap="round"/>
  <polygon points="560,220 540,225 545,240" fill="#fde047"/>
  <line x1="180" y1="480" x2="380" y2="350" stroke="#ff9933" stroke-width="4" stroke-opacity="0.8"/>
  <line x1="190" y1="490" x2="390" y2="360" stroke="#ffffff" stroke-width="4" stroke-opacity="0.8"/>
  <line x1="200" y1="500" x2="400" y2="370" stroke="#138808" stroke-width="4" stroke-opacity="0.8"/>
  <rect x="60" y="60" width="250" height="34" rx="17" fill="#f59e0b" opacity="0.9"/>
  <text x="185" y="82" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#0f172a" text-anchor="middle">INDIAN TRACK &amp; FIELD</text>
  <text x="400" y="160" font-family="Arial, sans-serif" font-size="38" font-weight="bold" fill="#ffffff" text-anchor="middle">Golden Throws &amp; Track Milestones</text>
  <text x="400" y="200" font-family="Arial, sans-serif" font-size="18" fill="#fde68a" text-anchor="middle">Neeraj Chopra · Avinash Sable · World Champions</text>
</svg>''',

    'article_sports_records.svg': '''<svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="recordsBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1e1b4b"/>
      <stop offset="50%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#14532d"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#recordsBg)"/>
  <circle cx="280" cy="360" r="45" fill="#f59e0b" stroke="#fef3c7" stroke-width="4"/>
  <text x="280" y="370" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="#78350f" text-anchor="middle">1</text>
  <circle cx="400" cy="330" r="55" fill="#e2e8f0" stroke="#ffffff" stroke-width="5"/>
  <text x="400" y="342" font-family="Arial, sans-serif" font-size="34" font-weight="bold" fill="#334155" text-anchor="middle">G</text>
  <circle cx="520" cy="360" r="45" fill="#b45309" stroke="#fed7aa" stroke-width="4"/>
  <text x="520" y="370" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="#ffffff" text-anchor="middle">B</text>
  <polygon points="380,220 420,220 410,285 390,285" fill="#ff9933"/>
  <polygon points="390,220 410,220 405,285 395,285" fill="#ffffff"/>
  <rect x="60" y="60" width="240" height="34" rx="17" fill="#3b82f6" opacity="0.9"/>
  <text x="180" y="82" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">SPORTS RECORD VAULT</text>
  <text x="400" y="160" font-family="Arial, sans-serif" font-size="38" font-weight="bold" fill="#ffffff" text-anchor="middle">Iconic Indian Sports Records</text>
  <text x="400" y="470" font-family="Arial, sans-serif" font-size="18" fill="#93c5fd" text-anchor="middle">All-Time Olympic Medals, World Cups &amp; World Records</text>
</svg>''',

    'article_badminton_achievements.svg': '''<svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="badmintonBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#065f46"/>
      <stop offset="50%" stop-color="#0f766e"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#badmintonBg)"/>
  <line x1="100" y1="420" x2="700" y2="420" stroke="#ffffff" stroke-width="4" stroke-opacity="0.5"/>
  <line x1="100" y1="450" x2="700" y2="450" stroke="#ffffff" stroke-width="2" stroke-opacity="0.3"/>
  <circle cx="400" cy="310" r="14" fill="#facc15"/>
  <polygon points="400,310 360,230 440,230" fill="#ffffff" opacity="0.8"/>
  <line x1="360" y1="230" x2="440" y2="230" stroke="#facc15" stroke-width="3"/>
  <circle cx="340" cy="270" r="35" stroke="#f59e0b" stroke-width="6" fill="none"/>
  <circle cx="460" cy="270" r="35" stroke="#38bdf8" stroke-width="6" fill="none"/>
  <rect x="60" y="60" width="240" height="34" rx="17" fill="#10b981" opacity="0.9"/>
  <text x="180" y="82" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">INDIAN SHUTTLE LEGENDS</text>
  <text x="400" y="160" font-family="Arial, sans-serif" font-size="38" font-weight="bold" fill="#ffffff" text-anchor="middle">Thomas Cup Champions &amp; World No. 1</text>
  <text x="400" y="520" font-family="Arial, sans-serif" font-size="18" fill="#a7f3d0" text-anchor="middle">PV Sindhu · Saina Nehwal · Satwik-Chirag Duo</text>
</svg>'''
}

for name, svg_code in svg_templates.items():
    dest_path = f"public/images/{name}"
    with open(dest_path, 'w') as f:
        f.write(svg_code)
    print(f"Created {name}: {os.path.getsize(dest_path) / 1024:.2f} KB")

print("\n--- Summary of all images in public/images ---")
for f in sorted(os.listdir('public/images')):
    if f.endswith('.webp') or f.endswith('.svg') or f.endswith('.jpg'):
        size = os.path.getsize(f"public/images/{f}") / 1024
        print(f"  {f:35} : {size:6.1f} KB")
