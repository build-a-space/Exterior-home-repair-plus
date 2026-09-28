// Brand-colored SVG illustrations, one per service (written to /assets/img/services/
// at build time). Placeholders until real project photos are available — alt text on
// every <img> says "Illustration" so nothing is presented as a real job photo.
const C = { ink: '#101418', steel: '#232b34', wall: '#55606c', wall2: '#434c57', gold: '#f4b41a', blue: '#1f5fbf', silver: '#c9ced6', glass: '#8fb4e6' };

const house = (o = {}) => `
  <path d="M0 390h800v60H0z" fill="#0b0e11"/>
  <path d="M170 230 400 90l230 140z" fill="${o.roof || C.steel}" stroke="${C.ink}" stroke-width="4"/>
  <path d="M205 230h390v160H205z" fill="${o.wall || C.wall}" stroke="${C.ink}" stroke-width="4"/>
  ${o.siding ? Array.from({ length: 11 }, (_, i) => `<path d="M205 ${244 + i * 13}h390" stroke="${C.ink}" stroke-opacity=".35" stroke-width="2"/>`).join('') : ''}
  <path d="M355 290h90v100h-90z" fill="${o.door || C.steel}" stroke="${C.ink}" stroke-width="3"/>
  <circle cx="430" cy="342" r="4" fill="${C.gold}"/>
  <path d="M235 260h70v55h-70zM495 260h70v55h-70z" fill="${o.win || C.gold}" stroke="${C.ink}" stroke-width="3"/>
  <path d="M270 260v55M235 287h70M530 260v55M495 287h70" stroke="${C.ink}" stroke-width="2"/>
  <path d="M470 120h28v55h-28z" fill="#6b5b4b" stroke="${C.ink}" stroke-width="3"/>`;

const frame = (inner, accent = C.gold) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <defs><radialGradient id="g" cx="75%" cy="0%" r="90%"><stop offset="0" stop-color="${C.blue}" stop-opacity=".45"/><stop offset="1" stop-color="${C.ink}" stop-opacity="0"/></radialGradient></defs>
  <rect width="800" height="450" fill="${C.ink}"/><rect width="800" height="450" fill="url(#g)"/>
  ${inner}
  <path d="M0 444h267v6H0z" fill="${C.blue}"/><path d="M267 444h266v6H267z" fill="${accent}"/><path d="M533 444h267v6H533z" fill="${C.silver}"/>
</svg>`;

const art = {
  'roof-replacement': frame(`${house({ roof: '#2b3440' })}
    ${Array.from({ length: 7 }, (_, i) => `<path d="M${200 + i * 8} ${212 - i * 17}h${400 - i * 16}" stroke="${C.gold}" stroke-opacity="${0.35 + i * 0.08}" stroke-width="3"/>`).join('')}
    <path d="M152 236 400 76l248 160" fill="none" stroke="${C.gold}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
    <g stroke="${C.silver}" stroke-width="5" stroke-linecap="round"><path d="M660 150l30 240M700 150l30 240"/><path d="M664 190h30M669 235h30M675 280h30M680 325h30"/></g>`),
  'roof-repair': frame(`${house()}
    <path d="M300 170l40-25 40 25-40 25z" fill="${C.gold}" stroke="${C.ink}" stroke-width="3"/>
    <g transform="translate(560 120) rotate(35)"><rect x="0" y="0" width="16" height="110" rx="4" fill="#a57a4a"/><rect x="-24" y="-10" width="64" height="26" rx="5" fill="${C.silver}"/></g>
    <path d="M152 236 400 76l248 160" fill="none" stroke="${C.blue}" stroke-width="6" stroke-linecap="round"/>`),
  siding: frame(`${house({ wall: '#6a7684', siding: true })}
    <path d="M205 230h195v160H205z" fill="${C.gold}" fill-opacity=".18"/>
    <path d="M152 236 400 76l248 160" fill="none" stroke="${C.silver}" stroke-width="6" stroke-linecap="round"/>`),
  gutters: frame(`${house()}
    <path d="M180 232h440v14H180z" fill="${C.gold}" stroke="${C.ink}" stroke-width="3"/>
    <path d="M600 246h14v140h26v10h-40z" fill="${C.gold}" stroke="${C.ink}" stroke-width="3"/>
    ${Array.from({ length: 5 }, (_, i) => `<path d="M${648 + i * 6} ${400 + (i % 2) * 6}v10" stroke="${C.glass}" stroke-width="3" stroke-linecap="round"/>`).join('')}`),
  windows: frame(`${house({ win: C.glass })}
    <path d="M225 250h90v75h-90zM485 250h90v75h-90z" fill="none" stroke="${C.gold}" stroke-width="6"/>
    <path d="M250 272l30-12M510 272l30-12" stroke="#fff" stroke-opacity=".7" stroke-width="4" stroke-linecap="round"/>`),
  doors: frame(`${house({ door: '#7a2e2e' })}
    <path d="M345 282h110v112H345z" fill="none" stroke="${C.gold}" stroke-width="6"/>
    <path d="M330 390h140v8H330z" fill="${C.silver}"/>`),
  decks: frame(`${house()}
    <path d="M560 330h200v14H560z" fill="#a57a4a" stroke="${C.ink}" stroke-width="3"/>
    ${Array.from({ length: 6 }, (_, i) => `<path d="M${570 + i * 36} 344v46" stroke="#8a6238" stroke-width="8"/>`).join('')}
    <path d="M560 300h200M560 300v30M760 300v30" stroke="${C.gold}" stroke-width="5"/>
    ${Array.from({ length: 9 }, (_, i) => `<path d="M${580 + i * 20} 300v30" stroke="${C.gold}" stroke-width="3"/>`).join('')}`),
  'soffit-fascia': frame(`${house()}
    <path d="M160 226h480v16H160z" fill="${C.gold}" stroke="${C.ink}" stroke-width="3"/>
    ${Array.from({ length: 12 }, (_, i) => `<path d="M${180 + i * 38} 242v8" stroke="${C.silver}" stroke-width="3"/>`).join('')}`),
  'storm-damage-repair': frame(`${house()}
    <path d="M540 70a40 40 0 0 1 75-12 34 34 0 0 1 60 24 28 28 0 0 1-8 55H548a34 34 0 0 1-8-67z" fill="${C.steel}" stroke="${C.silver}" stroke-width="3"/>
    <path d="M610 140l-22 40h26l-20 42" fill="none" stroke="${C.gold}" stroke-width="7" stroke-linejoin="round"/>
    <path d="M230 180l170-100 60 36" fill="none" stroke="${C.blue}" stroke-width="10" stroke-opacity=".8"/>`),
  'exterior-painting': frame(`${house({ wall: '#6d7a88' })}
    <path d="M205 230h160v160H205z" fill="${C.gold}" fill-opacity=".85"/>
    <g transform="translate(380 250)"><rect x="0" y="0" width="70" height="26" rx="6" fill="${C.silver}" stroke="${C.ink}" stroke-width="3"/><path d="M70 13h20v40h-40v30" fill="none" stroke="${C.silver}" stroke-width="6"/></g>`),
  'carpentry-wood-rot': frame(`${house()}
    <path d="M228 316h84v10h-84zM488 316h84v10h-84z" fill="${C.gold}" stroke="${C.ink}" stroke-width="2"/>
    <path d="M345 282h8v108h-8zM447 282h8v108h-8z" fill="${C.gold}"/>
    <g transform="translate(600 300) rotate(-30)"><rect x="0" y="0" width="120" height="30" rx="4" fill="${C.silver}"/><path d="M0 30l10 10 10-10 10 10 10-10 10 10 10-10 10 10 10-10 10 10 10-10 10 10 10-10" fill="none" stroke="${C.silver}" stroke-width="3"/></g>`),
  'power-washing': frame(`${house()}
    <path d="M205 230h195v160H205z" fill="#fff" fill-opacity=".12"/>
    <path d="M700 380l-60-60" stroke="${C.gold}" stroke-width="10" stroke-linecap="round"/>
    ${Array.from({ length: 6 }, (_, i) => `<path d="M636 316l${-90 - i * 12} ${-40 + i * 16}" stroke="${C.glass}" stroke-width="3" stroke-linecap="round" stroke-dasharray="6 8"/>`).join('')}`),
  home: frame(`${house()}<path d="M152 236 400 76l248 160" fill="none" stroke="${C.gold}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>`),
};

module.exports = { art };
