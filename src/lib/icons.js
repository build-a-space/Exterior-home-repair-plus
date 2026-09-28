// Inline SVG icons (stroke-based, inherit currentColor). No icon font, no extra requests.
const wrap = (d, extra = '') => `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"${extra}>${d}</svg>`;

const paths = {
  roof: '<path d="M2 12 12 4l10 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/><path d="M16 6.5V4h2.5v4.5"/>',
  hammer: '<path d="m15 12-8.5 8.5a2.1 2.1 0 0 1-3-3L12 9"/><path d="M17.6 15 22 10.6"/><path d="m20.9 11.7-1.3-1.3a2.1 2.1 0 0 1 0-3l.9-.9-2.4-2.4A6 6 0 0 0 13.9 2.3L12 2l1 1.4a4.5 4.5 0 0 1 .5 4.2L12 9l3 3 1.2-1.2a2.1 2.1 0 0 1 3 0l1.3 1.3"/>',
  siding: '<rect x="3" y="4" width="18" height="16" rx="1"/><path d="M3 8h18M3 12h18M3 16h18"/>',
  gutter: '<path d="M2 6h20"/><path d="M4 6v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6"/><path d="M17 11v7a2 2 0 0 0 2 2h1"/><path d="M8 15v.01M10 18v.01M12 15v.01"/>',
  window: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M12 3v18M4 12h16"/>',
  door: '<path d="M6 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17"/><path d="M3 21h18"/><circle cx="15" cy="12" r="1"/>',
  deck: '<path d="M3 10h18"/><path d="M3 14h18"/><path d="M5 14v7M19 14v7M12 14v7"/><path d="M5 10V5M19 10V5"/><path d="M5 6h14"/>',
  fascia: '<path d="M2 11 12 3l10 8"/><path d="M4 11h16v3H4z"/><path d="M6 14v6h12v-6"/>',
  storm: '<path d="M17.5 17H7a5 5 0 1 1 1.3-9.8A6 6 0 0 1 19.8 9 4 4 0 0 1 17.5 17z"/><path d="m13 12-3 5h4l-3 5"/>',
  paint: '<rect x="3" y="3" width="15" height="6" rx="1"/><path d="M18 6h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-8v3"/><rect x="10" y="14" width="4" height="7" rx="1"/>',
  saw: '<path d="M3 17 17 3l4 4L7 21z"/><path d="m7 13 1.5 1.5M10 10l1.5 1.5M13 7l1.5 1.5"/>',
  wash: '<path d="M4 20h6"/><path d="M7 20V10l3-3h5"/><path d="M15 5h3v4h-3z"/><path d="M19 7h2M20 3.5l1.5-1M20 10.5l1.5 1"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
  clipboard: '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 12h6M9 16h4"/>',
  users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
  broom: '<path d="m19 3-7.5 7.5"/><path d="M11.5 10.5 7 15l2 2 4.5-4.5"/><path d="M7 15c-2 0-4 1-4 6 5 0 6-2 6-4"/>',
  doc: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
  close: '<path d="M18 6 6 18M6 6l12 12"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  wave: '<path d="M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0 2 1 2 1"/><path d="M2 17c2-2 4-2 6 0s4 2 6 0 4-2 6 0 2 1 2 1"/><path d="M2 7c2-2 4-2 6 0s4 2 6 0 4-2 6 0 2 1 2 1"/>',
  tree: '<path d="M12 22v-5"/><path d="M12 2 5 12h4l-3 5h12l-3-5h4z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  wind: '<path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/><path d="M17.7 7.7A2.5 2.5 0 1 1 19.5 12H2"/>',
};

const icon = (name, extra) => wrap(paths[name] || paths.check, extra);
module.exports = { icon };
