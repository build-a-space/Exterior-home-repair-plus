// Content pools used to write town-specific copy. Each service × town page draws
// different combinations (seeded by town + service) and weaves in real local data:
// neighborhoods, nearby towns with distance/direction, county and town character.
// Placeholders: {kw} {Kw} {svc} {town} {county} {section} {need} {near} {miles} {dir} {phone}

// Per-service specifics.
const svc = {
  'roof-replacement': {
    needs: ['tearing off a worn 20-year-old shingle roof', 'replacing soft plywood decking under curling shingles', 'upgrading to impact- and wind-rated architectural shingles', 'fixing poor attic ventilation during a re-roof', 'replacing a roof that has been patched one too many times', 'installing ice & water shield along every eave and valley', 're-roofing after a nor’easter stripped the ridge', 'swapping a failing low-slope porch roof for TPO'],
    costs: ['the roof’s square footage and pitch', 'how many old layers have to come off', 'the amount of rotted decking we find', 'the shingle line and color you choose', 'chimneys, skylights and dormers that need new flashing', 'whether the attic needs added ventilation'],
    timing: ['Most full replacements take one to two days, and late spring through fall is peak season — booking early gets you the best dates.', 'We re-roof year-round when temperatures allow shingles to seal properly, and we never leave a roof open overnight.', 'Fall is a smart time to replace a roof before winter storms, but emergency replacements happen in every season.'],
  },
  'roof-repair': {
    needs: ['tracking down a leak around a chimney', 'replacing shingles torn off in a windstorm', 'swapping cracked rubber pipe boots', 're-flashing a skylight that drips in heavy rain', 'sealing lifted ridge caps', 'fixing a valley that overflows during downpours', 'tarping an active leak after a storm', 'repairing flashing where a porch roof meets the wall'],
    costs: ['how easy the leak is to reach', 'whether decking under the leak is damaged', 'matching older shingle colors', 'how much flashing needs to be replaced', 'whether it is an emergency call'],
    timing: ['Most repairs are handled in a single visit, and active leaks go to the front of the line.', 'Small repairs are often done the same week we inspect — sooner when water is coming inside.', 'We schedule repairs quickly after storms, and tarp first if weather delays the permanent fix.'],
  },
  siding: {
    needs: ['replacing brittle first-generation vinyl', 'repairing panels blown off in high wind', 'installing insulated vinyl on drafty walls', 'switching to fiber cement for a painted-wood look', 'adding cedar-look shake accents to a gable', 'fixing rotted sheathing hidden behind old siding', 'matching replacement panels on one damaged wall', 'wrapping window trim to stop water getting behind siding'],
    costs: ['the total wall area', 'the siding material and style', 'the amount of sheathing repair behind it', 'trim, corners and window wraps', 'second-story and gable access'],
    timing: ['A typical home is re-sided in three to seven days depending on size and material.', 'Siding can be installed most of the year; fiber cement painting is scheduled for warmer, dry days.', 'Storm-damaged sections are usually repaired in a day once matching material is on hand.'],
  },
  gutters: {
    needs: ['replacing sagging sectional gutters with seamless runs', 'upsizing to 6" gutters for a large roof', 'adding micro-mesh guards under heavy tree cover', 'moving downspouts to stop water pooling at the foundation', 're-pitching gutters that hold standing water', 'replacing rotted fascia before new gutters go up', 'adding downspout extensions and drainage', 'repairing leaking seams and end caps'],
    costs: ['the total length of gutter', 'gutter size (5" or 6")', 'the number of downspouts and corners', 'gutter guard choice', 'fascia repairs behind the gutters'],
    timing: ['Seamless gutters are formed on-site and most homes are finished in a single day.', 'Many homeowners schedule gutters and guards right after fall leaf drop.', 'Gutter replacement pairs well with a new roof — we can coordinate both.'],
  },
  windows: {
    needs: ['replacing foggy builder-grade windows', 'swapping drafty single-pane windows for Low-E glass', 'installing a new bay or bow window', 'rebuilding a rotted sill during replacement', 'upgrading to higher wind-rated windows near the water', 'replacing hard-to-open windows in a bedroom', 'adding casement windows over a kitchen sink', 'trimming out new windows with low-maintenance capping'],
    costs: ['the number and size of windows', 'insert versus full-frame installation', 'glass package and frame material', 'specialty shapes like bays and bows', 'interior and exterior trim work'],
    timing: ['Windows are custom-ordered, so lead time is usually a few weeks; installation itself takes one to two days.', 'We install year-round and only open one window at a time so the house stays comfortable.', 'Ordering in late summer means new windows are in before heating season.'],
  },
  doors: {
    needs: ['replacing a dented or drafty front door', 'installing a fiberglass entry door with sidelites', 'swapping a sticking sliding patio door', 'adding a full-view storm door', 'rebuilding a rotted door frame and sill', 'upgrading locks and hardware', 'installing French doors onto a deck', 'sealing a door that leaks during wind-driven rain'],
    costs: ['door material and style', 'sidelites and transoms', 'frame and sill repair', 'hardware and smart-lock options', 'custom sizes'],
    timing: ['Most door installations are completed in a single day once the door arrives.', 'Stock doors can be installed within days; custom doors take a few weeks to order.', 'Storm doors are a quick install and a popular fall upgrade.'],
  },
  decks: {
    needs: ['replacing a splintering wood deck with composite', 'rebuilding unsafe stairs and railings', 'adding a properly flashed and bolted ledger', 'replacing rusted joist hangers and fasteners', 'building a new second-story deck', 'extending a deck with a lower landing', 'rebuilding a front porch and steps', 'installing aluminum or cable railings'],
    costs: ['deck size and height', 'decking material', 'railing system', 'stairs, landings and built-ins', 'permits and footing requirements'],
    timing: ['Most decks are built in one to two weeks after permits are approved.', 'Planning in winter means your deck is ready for summer.', 'Repairs and re-decking jobs often take just a few days.'],
  },
  'soffit-fascia': {
    needs: ['replacing rotted fascia behind overflowing gutters', 'installing vented soffit to cool the attic', 'wrapping fascia in aluminum', 'sealing gaps where squirrels get into the attic', 'rebuilding rafter tails', 'swapping painted wood trim for PVC', 'repairing sagging soffit panels', 'fixing roofline trim damaged by wind'],
    costs: ['linear feet of fascia and soffit', 'rafter-tail or structural repairs', 'material choice (aluminum, vinyl or PVC)', 'second-story access', 'gutter removal and re-hanging'],
    timing: ['Most roofline trim projects take one to three days.', 'Trim repairs are often combined with gutter or roof work to save a trip.', 'We can seal animal entry points the same day we repair the trim.'],
  },
  'storm-damage-repair': {
    needs: ['tarping a roof after a nor’easter', 'replacing siding torn off by wind', 'repairing damage from a fallen tree limb', 'replacing dented gutters and downspouts', 'documenting damage for an insurance claim', 'boarding up a broken window', 'repairing lifted flashing and vents', 'restoring trim and fascia after a storm'],
    costs: ['the extent of the damage', 'emergency tarping or board-up', 'matching existing materials', 'whether hidden decking or sheathing is damaged', 'what your insurance policy covers'],
    timing: ['We prioritize active leaks and tarp as quickly as possible after a storm.', 'Permanent repairs are scheduled as soon as your claim and materials are ready.', 'After major storms demand spikes — calling early gets you on the list sooner.'],
  },
  'exterior-painting': {
    needs: ['repainting peeling cedar shakes', 'refreshing faded trim and shutters', 'staining a weathered deck', 'painting a front door and garage doors', 'priming and painting new fiber cement', 'treating mildew before repainting', 'painting a porch, railings and columns', 'refinishing a fence'],
    costs: ['the size of the home', 'the amount of scraping and prep', 'wood repairs before painting', 'number of colors', 'paint or stain quality'],
    timing: ['Exterior painting runs from late spring through early fall when temperatures stay above 50°F.', 'A typical house is painted in three to six days depending on prep.', 'Decks and fences are best stained in dry weather in late spring or early fall.'],
  },
  'carpentry-wood-rot': {
    needs: ['replacing a rotted window sill', 'rebuilding a door frame and brick molding', 'replacing rotted corner boards', 'repairing porch columns and posts', 'swapping wood trim for PVC', 'fixing a rotted garage door jamb', 'replacing rotted frieze boards', 'rebuilding porch steps'],
    costs: ['how far the rot has spread', 'custom trim profiles', 'PVC versus wood materials', 'painting after repairs', 'structural repairs behind the trim'],
    timing: ['Most rot repairs take one to three days.', 'Catching rot early keeps repairs small — we can usually schedule within a week or two.', 'Rot repairs are often done right before painting so everything is finished together.'],
  },
  'power-washing': {
    needs: ['soft washing green algae off vinyl siding', 'removing black streaks from a roof', 'washing salt film off windows and trim', 'cleaning a slippery deck', 'washing a paver patio', 'cleaning a driveway and walkways', 'prepping a house for paint', 'brightening a weathered fence'],
    costs: ['the size of the home', 'roof washing versus siding only', 'decks, patios and driveways added', 'heavy algae or mildew', 'second-story access'],
    timing: ['Most homes are washed in a few hours.', 'Spring washing clears winter grime and pollen; fall washing removes summer mildew.', 'Near the ocean, a yearly wash keeps salt and algae from building up.'],
  },
};

// Hero / opening lines.
const openers = [
  '{Kw} in {town}, NJ from a local crew that knows {county} homes — honest advice, written pricing and work that lasts.',
  'Need {kw} in {town}? Exterior Home Repair Plus serves every street from {section} to the town line, with free on-site estimates.',
  '{town} homeowners call Exterior Home Repair Plus for {kw} done right the first time — no pressure, no surprises.',
  'Dependable {kw} for {town}, NJ. We inspect, explain what we find and give you an itemized quote — usually within days.',
  'From {section} to the rest of {town}, our crew handles {kw} built for {county} weather.',
  'Local {kw} in {town}, New Jersey — fast scheduling, clean job sites and a written estimate you can compare line by line.',
  "Whether it's one problem area or the whole house, {town} homeowners get honest {kw} advice from a crew that works in {county} every week.",
  '{Kw} for {town} homes of every age — from {section} to the newest streets in town.',
  'Protect your {town} home with {kw} from a local, accountable contractor. Written estimates, clean job sites, no pressure.',
  'Serving {town} and the rest of {county}, we make {kw} simple: one call, one crew, one clear price.',
];

// Direct-answer (AEO) summaries.
const answers = [
  'Exterior Home Repair Plus provides {kw} in {town}, NJ, including {sectionList}. Estimates are free and written; call {phone} to schedule.',
  'For {kw} in {town}, New Jersey, homeowners can call Exterior Home Repair Plus at {phone}. The company serves all of {town} and nearby {nearList} with free, itemized estimates.',
  'In {town}, NJ, Exterior Home Repair Plus handles {kw} for homes in {sectionList}. The crew also covers {nearList}. Free estimates: {phone}.',
  'Yes — Exterior Home Repair Plus offers {kw} throughout {town}, NJ, from {sectionList} to the rest of town. Call {phone} for a free, written estimate.',
  'The local option for {kw} in {town}, NJ is Exterior Home Repair Plus, which also covers {nearList}. Inspections and estimates are free at {phone}.',
  '{town} homeowners looking for {kw} can reach Exterior Home Repair Plus at {phone}. The crew handles homes in {sectionList} and gives itemized, no-pressure quotes.',
];

// Neighborhood sentences (one per section, rotated).
const sectionLines = [
  'In {section}, a lot of our {svc} calls involve {need}.',
  'Homes around {section} often need {need}.',
  '{section} is a regular stop for us — typically for {need}.',
  'We’ve worked on plenty of {section} homes, frequently {need}.',
  'Around {section}, {need} is one of the most common requests we get.',
  'For {section} homeowners, {need} is a project we handle often.',
  "Near {section}, we're often called for {need}.",
  'A typical {section} job for us: {need}.',
  '{section} homeowners regularly ask us about {need}.',
  'On {section} streets, {need} comes up again and again.',
];

// Nearby-town sentences (with distance/direction).
const nearLines = [
  '{near} is about {miles} miles {dir} of {town}, and we provide {kw} there too.',
  'Our {kw} crews also work in {near}, roughly {miles} miles to the {dir}.',
  'Just {miles} miles {dir}, {near} homeowners get the same {kw} service.',
  '{near} ({miles} mi {dir}) is on the same {kw} route.',
  'Heading {dir} about {miles} miles, we handle {kw} in {near} as well.',
];

const closers = [
  'Ready to get started in {town}? Call {phone} or request a free estimate online.',
  'Tell us what’s going on with your {town} home and we’ll set up a free inspection — call {phone}.',
  'Get a free, written {kw} estimate for your {town} home: {phone}.',
  "Have questions about {kw} in {town}? Call {phone} — we're happy to talk it through.",
  "Let's get your {town} home taken care of. Call {phone} or send the form and we'll be in touch fast.",
  'One call to {phone} gets a local {kw} pro out to your {town} home.',
];

module.exports = { svc, openers, answers, sectionLines, nearLines, closers };

// "Why us" sentences — two or three are chosen per page.
module.exports.whyLines = [
  'We answer the phone, show up when we say we will and give {town} homeowners a written quote — not a verbal ballpark.',
  'Our crews work across {county} every week, so getting to {town} is never a problem.',
  'Every {town} job ends with a walk-through, a magnetic nail sweep and a clean yard.',
  'You deal with the same local team from the first visit in {town} to the final inspection.',
  'We photograph what we find on your {town} home so you can see the problem for yourself.',
  'No high-pressure sales — {town} homeowners get honest options, including when a repair beats a replacement.',
  'We use materials rated for {county} weather, not whatever is cheapest that week.',
  'From {section} to the other side of {town}, neighbors have trusted us with their homes.',
  'Storm season in {county} is busy, but existing {town} customers always get priority callbacks.',
  'We handle permits and scheduling so your {town} project stays simple.',
  '{town} homeowners get a start date in writing and updates if the weather changes it.',
  "If something isn't right after we finish in {town}, we come back and make it right.",
  'We protect landscaping, AC units and walkways on every {town} job site.',
  "Our estimates for {town} homes list materials by brand and line, so you know exactly what you're getting.",
  'Plenty of our {town} work comes from neighbors who saw our crew down the street.',
  'We explain options in plain English — {town} homeowners never have to decode contractor jargon.',
];

// Extra timing lines per service (merged into svc[*].timing below).
const moreTiming = {
  'roof-replacement': ['Material delivery usually happens the day before, and the old roof comes off first thing in the morning.', 'We watch the forecast closely and only open a roof when a clear window is ahead.'],
  'roof-repair': ['Leak repairs are usually quick; tracking the leak often takes longer than fixing it.', 'If the weather is too wet to repair safely, we tarp the area and return on the next dry day.'],
  siding: ['Old siding comes off one wall at a time so the house is never left exposed for long.', 'Special-order colors can add a week or two, so we lock in material as soon as you approve the estimate.'],
  gutters: ['We run the seamless gutter machine in your driveway, so there are no seams to leak later.', 'Guard installation adds only a few hours to a gutter job.'],
  windows: ['Measurements are taken on the first visit so ordering can start right away.', 'Each opening is only exposed for a short time, even on a full-house job.'],
  doors: ['Door lead times vary by style — we give you a realistic date up front.', 'Hardware and weatherstripping are adjusted before we leave so the door closes perfectly.'],
  decks: ['Footing inspections come first, then framing, decking and railings.', 'Composite materials can be ordered in advance so the build moves quickly once permits clear.'],
  'soffit-fascia': ['Trim work goes fastest when gutters come down at the same time.', 'Aluminum wrap is bent on-site to fit each board exactly.'],
  'storm-damage-repair': ['Documentation happens on the first visit so your claim can move while materials are ordered.', 'Temporary protection goes on the same day whenever conditions are safe.'],
  'exterior-painting': ['Prep usually takes as long as painting — that is what makes the finish last.', 'We paint sun-facing walls at the right time of day so paint does not flash-dry.'],
  'carpentry-wood-rot': ['Custom trim profiles may need to be milled, which can add a few days.', 'New wood is primed on all sides before it goes up so it resists moisture.'],
  'power-washing': ['We pre-wet plants and rinse thoroughly so landscaping is protected.', 'Roof washing is scheduled on calm days so overspray is controlled.'],
};
for (const [k, v] of Object.entries(moreTiming)) module.exports.svc[k].timing.push(...v);

const moreNeeds = {
  'roof-replacement': ['replacing a roof with widespread granule loss', 'switching from 3-tab shingles to architectural', 'adding ridge vents during a full tear-off', 'replacing a roof before selling the house'],
  'roof-repair': ['fixing a leak that only shows up in wind-driven rain', 'replacing a cracked vent cap', 'resealing a leaking chimney cricket', 'repairing shingles damaged by a fallen limb'],
  siding: ['re-siding a cape after years of fading', 'repairing siding melted by a grill', 'adding board-and-batten accents', 'replacing warped panels on a sunny wall'],
  gutters: ['adding a gutter over a back door that floods', 'replacing crushed downspouts', 'installing larger outlets on a long run', 'reattaching gutters pulled down by ice'],
  windows: ['replacing a leaking picture window', 'swapping old aluminum sliders', 'installing egress-size basement windows', 'replacing windows with failed seals'],
  doors: ['replacing a warped back door', 'adding a door with a pet door insert', 'installing a new garage entry door', 'swapping a front door for one with glass'],
  decks: ['resurfacing a structurally sound deck', 'adding privacy walls to a deck', 'building a ground-level patio deck', 'replacing rotted deck posts'],
  'soffit-fascia': ['closing gaps where bees nest in the soffit', 'replacing fascia behind a new roof', 'upgrading solid soffit to vented', 'repairing trim around a dormer'],
  'storm-damage-repair': ['securing siding flapping after high winds', 'repairing a porch roof hit by a limb', 'replacing a storm door ripped off its hinges', 'patching a roof after hail'],
  'exterior-painting': ['painting a house for resale', 'changing the color scheme of trim and shutters', 'repainting chalky aluminum siding', 'refreshing a weathered front porch'],
  'carpentry-wood-rot': ['replacing a rotted fascia return', 'rebuilding a rotted bay window base', 'repairing rot around an exterior door', 'replacing rotted porch floorboards'],
  'power-washing': ['washing a vinyl fence', 'removing rust stains from concrete', 'cleaning gutters faces of black streaks', 'washing a pool deck'],
};
for (const [k, v] of Object.entries(moreNeeds)) module.exports.svc[k].needs.push(...v);
