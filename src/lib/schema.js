const site = require('../data/site');
const services = require('../data/services');
const { counties, towns } = require('../data/areas');
const { abs } = require('./layout');

const BIZ_ID = abs('/#business');
const SITE_ID = abs('/#website');

function business(full = false) {
  const b = {
    '@type': ['RoofingContractor', 'HomeAndConstructionBusiness'],
    '@id': BIZ_ID,
    name: site.name,
    alternateName: site.shortName,
    slogan: site.tagline,
    url: abs('/'),
    telephone: site.phoneE164,
    email: site.email,
    logo: abs('/assets/img/logo.png'),
    image: abs('/assets/img/og-image.jpg'),
    priceRange: '$$',
    areaServed: [
      ...counties.map((c) => ({ '@type': 'AdministrativeArea', name: `${c.name}, NJ` })),
      ...(full ? towns.map((t) => ({ '@type': 'City', name: `${t.plainName}, NJ` })) : []),
    ],
    knowsAbout: services.map((s) => s.name),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Exterior Home Repair Services',
      itemListElement: services.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.name, url: abs(`/${s.slug}/`) } })),
    },
    contactPoint: { '@type': 'ContactPoint', telephone: site.phoneE164, contactType: 'customer service', areaServed: 'US-NJ', availableLanguage: 'English' },
  };
  const hrs = site.hours.filter((h) => h.schema.length);
  if (hrs.length) b.openingHoursSpecification = hrs.map((h) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: h.schema, opens: h.opens, closes: h.closes }));
  if (site.address.street) {
    b.address = { '@type': 'PostalAddress', streetAddress: site.address.street, addressLocality: site.address.city, addressRegion: 'NJ', postalCode: site.address.zip, addressCountry: 'US' };
  } else {
    b.address = { '@type': 'PostalAddress', addressRegion: 'NJ', addressCountry: 'US' };
  }
  const sameAs = Object.values(site.social).filter(Boolean);
  if (sameAs.length) b.sameAs = sameAs;
  if (site.foundedYear) b.foundingDate = site.foundedYear;
  return b;
}

const website = () => ({ '@type': 'WebSite', '@id': SITE_ID, url: abs('/'), name: site.name, publisher: { '@id': BIZ_ID }, inLanguage: 'en-US' });

const webPage = (path, name, description, type = 'WebPage') => ({
  '@type': type,
  '@id': abs(path) + '#webpage',
  url: abs(path),
  name,
  description,
  isPartOf: { '@id': SITE_ID },
  about: { '@id': BIZ_ID },
  inLanguage: 'en-US',
});

const serviceSchema = (svc, path, area) => ({
  '@type': 'Service',
  '@id': abs(path) + '#service',
  name: area ? `${svc.name} in ${area.name}` : svc.name,
  serviceType: svc.name,
  description: svc.blurb,
  url: abs(path),
  provider: { '@id': BIZ_ID },
  areaServed: area
    ? { '@type': area.type || 'City', name: `${area.name}, NJ`, ...(area.containedIn ? { containedInPlace: { '@type': 'AdministrativeArea', name: `${area.containedIn}, NJ` } } : {}) }
    : counties.map((c) => ({ '@type': 'AdministrativeArea', name: `${c.name}, NJ` })),
});

module.exports = { business, website, webPage, serviceSchema, BIZ_ID };
