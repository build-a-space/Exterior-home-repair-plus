// Every share image the build generates. Keys are referenced by pages via `og`.
const services = require('../data/services');
const articles = require('../data/articles');
const { counties, towns } = require('../data/areas');

const AREA = 'Ocean · Monmouth · Atlantic County, NJ';

function ogJobs() {
  const jobs = [
    { key: 'home', title: 'Jersey Shore Exterior Home Repair', subtitle: AREA, artKey: 'home' },
    { key: 'services', title: 'Exterior Home Services', subtitle: AREA, artKey: 'roof-replacement' },
    { key: 'areas', title: 'Serving 109 Jersey Shore Towns', subtitle: AREA, artKey: 'home' },
    { key: 'about', title: 'Quality. Reliability. Results.', subtitle: 'About Exterior Home Repair Plus', artKey: 'home' },
    { key: 'contact', title: 'Get Your Free Estimate', subtitle: AREA, artKey: 'home' },
    { key: 'faq', title: 'Exterior Repair Questions Answered', subtitle: AREA, artKey: 'roof-repair' },
    { key: 'resources', title: 'Homeowner Resources', subtitle: 'Tips from the Exterior Home Repair Plus crew', artKey: 'gutters' },
  ];
  for (const s of services) jobs.push({ key: `svc-${s.slug}`, title: s.name, subtitle: AREA, artKey: s.slug });
  for (const c of counties) {
    jobs.push({ key: `county-${c.slug}`, title: `Exterior Repair in ${c.name}`, subtitle: `${c.towns.length} towns · New Jersey`, artKey: 'home' });
    for (const s of services) jobs.push({ key: `cs-${s.slug}-${c.slug}`, title: `${s.short} in ${c.name}`, subtitle: 'New Jersey · Free Estimates', artKey: s.slug });
  }
  for (const t of towns) jobs.push({ key: `town-${t.slug}`, title: `Exterior Repair in ${t.plainName}, NJ`, subtitle: `${t.county.name} · Roofing · Siding · Gutters`, artKey: 'home' });
  for (const a of articles) jobs.push({ key: `article-${a.slug}`, title: a.title, subtitle: 'Homeowner Resources', artKey: a.services[0] });
  return jobs;
}

module.exports = { ogJobs };
