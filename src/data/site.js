// Central business info. Edit here and rebuild — every page, schema block and
// the sitemap pull from this file.
module.exports = {
  name: 'Exterior Home Repair Plus',
  shortName: 'Exterior Home Repair +',
  tagline: 'Quality. Reliability. Results.',
  url: (process.env.SITE_URL || 'https://www.exteriorhomerepairplus.com').replace(/\/$/, ''),
  phone: '(908) 636-9745',
  phoneE164: '+19086369745',
  email: 'Exteriorhomerepairplus@gmail.com',
  state: 'New Jersey',
  stateAbbr: 'NJ',
  region: 'Jersey Shore',

  // Leave blank until confirmed — fields render only when filled in.
  address: { street: '', city: '', zip: '' },
  hicNumber: '', // NJ Home Improvement Contractor registration #, e.g. '13VH12345678'
  foundedYear: '',
  // Confirmed by the owner.
  hours: [
    { days: 'Monday – Friday', open: '7:00 AM', close: '6:00 PM', schema: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:00', closes: '18:00' },
    { days: 'Saturday', open: '8:00 AM', close: '4:00 PM', schema: ['Saturday'], opens: '08:00', closes: '16:00' },
    { days: 'Sunday', open: 'Emergency calls only', close: '', schema: [], opens: '', closes: '' },
  ],
  social: {
    facebook: '',
    instagram: '',
    google: '', // Google Business Profile URL
    yelp: '',
    nextdoor: '',
  },
};
