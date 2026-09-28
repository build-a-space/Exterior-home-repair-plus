// Local-content building blocks. Town "character" + service combine into copy
// that reflects the real conditions homes face in that part of the shore.

const characters = {
  ocean: {
    label: 'oceanfront & barrier-island',
    housing: 'Homes here range from classic shore cottages and cedar-shake capes to elevated new builds and rental properties, and nearly all of them live with salt spray, sand and high wind.',
    challenges: ['Salt-air corrosion of fasteners, flashing and hardware', 'High winds that lift shingles and siding', 'Flood-zone elevation and building requirements', 'Sun and UV fading on south- and ocean-facing walls'],
    tip: 'On the barrier islands we use stainless or hot-dipped galvanized fasteners, high-wind nailing patterns and sealed flashing details because standard installations simply don’t last in salt air.',
  },
  bay: {
    label: 'bay-front & lagoon',
    housing: 'You’ll find ranches, capes, split-levels and raised homes along lagoons, rivers and the bay — many of them updated or elevated after Superstorm Sandy.',
    challenges: ['Wind-driven rain coming across open water', 'Humidity that feeds mildew, algae and wood rot', 'Salt exposure on waterfront properties', 'Older homes with original roofs and single-pane windows'],
    tip: 'Near the water we pay extra attention to flashing, ventilation and moisture-resistant trim, because humidity and wind-driven rain find every weak spot.',
  },
  historic: {
    label: 'historic',
    housing: 'The housing stock includes Victorians, four-squares, shingle-style homes and older colonials with porches, detailed trim and original wood siding.',
    challenges: ['Wood rot in original trim, sills and porch details', 'Matching historic profiles and materials', 'Historic-district and zoning review requirements', 'Old roofs layered over several times'],
    tip: 'On older homes we match trim profiles and reveal lines, use rot-proof PVC where it won’t be noticed, and respect historic-district guidelines where they apply.',
  },
  suburban: {
    label: 'established neighborhood',
    housing: 'Most homes are colonials, split-levels, ranches and capes built between the 1960s and early 2000s — many still wearing their original or second roof, builder-grade windows and first-generation vinyl siding.',
    challenges: ['Roofs from the 1990s–2000s reaching end of life', 'Builder-grade windows that fog and leak air', 'Faded or brittle first-generation vinyl siding', 'Gutters undersized for today’s heavy rainstorms'],
    tip: 'Many homes here were built in waves by the same builders, so we often see the same weak spots — under-ventilated attics, undersized gutters and missing flashing — and fix them the right way.',
  },
  pines: {
    label: 'wooded Pinelands',
    housing: 'Homes sit on wooded lots under oaks and pitch pines, from ranches in active-adult communities to newer two-story homes on larger properties.',
    challenges: ['Pine needles and leaves clogging gutters', 'Moss and algae on shaded roofs', 'Falling limbs during storms', 'Moisture and rot on shaded siding and trim'],
    tip: 'Under heavy tree cover we recommend gutter guards, algae-resistant shingles and good attic ventilation to keep shaded roofs dry and clean.',
  },
  rural: {
    label: 'rural & estate',
    housing: 'Properties include farmhouses, custom estate homes, barns and outbuildings on larger lots — often with long roof runs and complex roof lines.',
    challenges: ['Large, complex roofs with many valleys and dormers', 'Open exposure to wind across fields', 'Older farmhouses with original wood siding and trim', 'Outbuildings, barns and detached garages that need care too'],
    tip: 'Larger properties call for careful planning, clean job sites and crews experienced with complex roof lines — and we’re happy to handle garages, barns and outbuildings in the same project.',
  },
  urban: {
    label: 'city',
    housing: 'Blocks of twins, row homes, multi-family buildings and older single-family homes sit close together, often with limited access and shared walls.',
    challenges: ['Tight lots and limited ladder and dumpster access', 'Attached homes with shared roofs and walls', 'Older flat and low-slope roofs', 'Multi-family properties that need minimal disruption'],
    tip: 'On tight city lots we plan staging, debris removal and parking ahead of time so the job moves fast and neighbors aren’t inconvenienced.',
  },
};

// Service-specific local angle: coastal (ocean/bay), historic, inland (everything else)
const serviceAngles = {
  'roof-replacement': {
    coastal: 'Shore roofs need more than shingles. We install ice & water shield at eaves and valleys, use wind-rated shingles with six-nail high-wind patterns, and seal every edge so nor’easter winds can’t get underneath.',
    historic: 'Older homes often hide multiple layers of old roofing and plank decking. We tear off to the boards, repair the deck and install a roof that looks right on the house.',
    inland: 'Many roofs in the area are original or second roofs from the 1990s and 2000s. A full tear-off lets us fix soft decking and ventilation problems that caused the old roof to age early.',
  },
  'roof-repair': {
    coastal: 'Wind-driven rain off the ocean and bay finds weak flashing and lifted shingles fast. We seal and re-secure problem areas with materials made for coastal exposure.',
    historic: 'Leaks on older homes usually start at chimneys, dormers, valleys and old flashing. We trace the water to the source and repair it with matching materials.',
    inland: 'Most leaks we find come from worn pipe boots, failed flashing and storm-damaged shingles — small repairs that prevent big interior damage.',
  },
  siding: {
    coastal: 'Near the water we fasten siding for high wind, tape every house-wrap seam and flash windows and doors carefully, because wind-driven rain gets behind poorly installed panels.',
    historic: 'We can replace or repair siding to match older profiles, including cedar-look shake and traditional lap reveals, so updates look original to the home.',
    inland: 'Many homes still have first-generation vinyl that has become brittle and faded. Modern insulated vinyl and fiber cement look sharper and hold up far longer.',
  },
  gutters: {
    coastal: 'Coastal downpours dump a lot of water fast. Oversized seamless gutters and downspouts, set on hidden hangers, handle the volume and stay put in high wind.',
    historic: 'We match gutter style to the home — including half-round options — and make sure water is carried away from old foundations and porches.',
    inland: 'Tree cover means clogged gutters. Seamless gutters paired with micro-mesh guards keep water flowing and your weekends ladder-free.',
  },
  windows: {
    coastal: 'Near the shore we recommend windows with higher design-pressure ratings, corrosion-resistant hardware and, where required, impact-rated glass.',
    historic: 'We offer replacement windows with grille patterns and profiles that suit older architecture, and we rebuild rotted sills and trim along the way.',
    inland: 'Builder-grade windows from the 1980s–2000s are often failing now. Low-E, argon-filled replacements cut drafts and energy bills right away.',
  },
  doors: {
    coastal: 'Fiberglass doors with composite frames and stainless hardware are the best defense against salt air, humidity and wind-driven rain.',
    historic: 'We can match traditional door styles and rebuild rotted jambs and sills so your new door suits the character of the home.',
    inland: 'A new insulated entry door with a tight seal instantly improves curb appeal, security and comfort.',
  },
  decks: {
    coastal: 'Shore decks need stainless or hot-dipped galvanized hardware, properly flashed ledgers and low-maintenance composite boards that shrug off sun and salt.',
    historic: 'Porch rebuilds on older homes call for careful carpentry — columns, railings and steps that look original but are built with modern, rot-resistant materials.',
    inland: 'Many decks built in the ’90s and 2000s are near the end of their life. We rebuild safely with composite or pressure-treated lumber and code-compliant railings.',
  },
  'soffit-fascia': {
    coastal: 'Salt air and wind-driven rain rot wood fascia quickly. Aluminum and PVC wrapping stops the cycle for good.',
    historic: 'We rebuild decorative roofline trim on older homes with rot-proof materials milled to match the original profile.',
    inland: 'Overflowing gutters under heavy tree cover are the number-one cause of rotted fascia. We fix the trim and the water problem behind it.',
  },
  'storm-damage-repair': {
    coastal: 'Coastal storms and nor’easters hit here first. We respond fast to tarp roofs, secure siding and document damage for your insurance claim.',
    historic: 'Storm damage on older homes needs careful restoration so repairs match original materials and details.',
    inland: 'Falling trees and limbs are the biggest storm threat inland. We secure the home, remove damaged materials and restore everything properly.',
  },
  'exterior-painting': {
    coastal: 'Salt air and strong sun break down paint fast. Thorough prep, premium acrylics and proper primers make the job last at the shore.',
    historic: 'Historic homes deserve careful scraping, wood repair and multi-color paint schemes that highlight architectural details.',
    inland: 'Shaded, tree-covered homes are prone to mildew. We wash, treat and prime so fresh paint stays clean and bonded.',
  },
  'carpentry-wood-rot': {
    coastal: 'Humidity and salt spray accelerate wood rot on sills, trim and porch posts. We replace failing wood with PVC and treated lumber built for the shore.',
    historic: 'Older homes are full of beautiful trim worth saving. We repair what we can and replicate what we can’t, using rot-proof materials where possible.',
    inland: 'Shaded trim and sills stay damp and rot faster. We rebuild with rot-proof materials and fix the drainage that caused it.',
  },
  'power-washing': {
    coastal: 'Salt film and airborne sand dull siding, windows and trim quickly. A yearly soft wash keeps shore homes looking great and protects finishes.',
    historic: 'We use gentle, low-pressure soft washing on older painted wood and delicate trim so nothing is damaged.',
    inland: 'Shade and tree cover mean green algae and mildew. Soft washing removes it safely and keeps it from coming right back.',
  },
};

const angleKey = (character) => (character === 'ocean' || character === 'bay' ? 'coastal' : character === 'historic' ? 'historic' : 'inland');

module.exports = { characters, serviceAngles, angleKey };

// Alternate phrasings so towns of the same character don't read identically.
const variants = {
  ocean: {
    housing: [
      'Shore cottages, raised post-Sandy homes and summer rentals sit side by side here, and all of them take salt spray and sand every day.',
      'Many homes are elevated or rebuilt, mixed with older cedar-shake capes and beach blocks of rentals — every one exposed to open-ocean weather.',
    ],
    tip: [
      'Near the beach we switch to stainless or hot-dipped galvanized fasteners and follow high-wind nailing schedules, because standard hardware corrodes fast.',
      'Ocean exposure calls for sealed flashing, corrosion-proof hardware and wind-rated materials — details we never skip on a shore house.',
    ],
  },
  bay: {
    housing: [
      'Lagoon ranches, raised capes and older bungalows line the water here, many of them updated after Superstorm Sandy.',
      'Homes along the bay, rivers and lagoons range from 1950s bungalows to elevated rebuilds, with plenty of split-levels in between.',
    ],
    tip: [
      'Wind off open water pushes rain sideways, so we focus on flashing, sealed seams and moisture-resistant trim on bay-front homes.',
      'Humidity near the water feeds mildew and rot, which is why we lean on PVC trim, good ventilation and careful flashing here.',
    ],
  },
  historic: {
    housing: [
      'Victorian porches, four-squares and older colonials with original wood siding and detailed trim define the streetscape.',
      'Much of the housing predates World War II — ornate trim, deep porches and wood clapboard that deserve careful work.',
    ],
    tip: [
      'We match original trim profiles and reveals, and use rot-proof PVC where it won’t change the look of an older home.',
      'Older homes reward patience: we repair what can be saved, replicate what can’t, and respect any historic-district rules.',
    ],
  },
  suburban: {
    housing: [
      'Streets are lined with colonials, split-levels, ranches and capes from the 1960s through the 2000s, many on their first or second roof.',
      'Neighborhoods here were mostly built between the ’60s and early 2000s, so original windows, siding and roofs are reaching the end of the road.',
    ],
    tip: [
      'Homes built in the same era tend to share weak spots — thin attic ventilation, undersized gutters and missing flashing — and we fix them properly.',
      'On established homes we look past the obvious problem to the cause, like poor ventilation or gutters that can’t keep up with modern downpours.',
    ],
  },
  pines: {
    housing: [
      'Houses sit under oaks and pitch pines on wooded lots, from ranches in adult communities to newer two-story homes.',
      'Tree-covered lots are the norm, with ranch homes, capes and newer colonials tucked into the woods.',
    ],
    tip: [
      'Heavy shade means moss, needles and damp trim, so we recommend gutter guards, algae-resistant shingles and strong attic ventilation.',
      'Under this much tree cover, keeping water moving is everything — guards, properly pitched gutters and breathable roofs make the difference.',
    ],
  },
  rural: {
    housing: [
      'Farmhouses, custom homes, barns and detached garages spread across larger lots, often with long, complex roof lines.',
      'Properties tend to be big — estate homes, older farmhouses and outbuildings exposed to wind across open fields.',
    ],
    tip: [
      'Bigger properties need planning, clean job sites and crews used to complex roofs — and we can handle barns and garages in the same project.',
      'Open fields mean more wind, so we pay close attention to fastening and edge details on large, exposed roofs.',
    ],
  },
  urban: {
    housing: [
      'Twins, row homes and multi-family buildings sit close together, often with shared walls and tight access.',
      'Dense blocks of older homes and multi-unit buildings make access, staging and neighbor-friendly work essential.',
    ],
    tip: [
      'On tight lots we plan dumpsters, ladders and parking in advance so the job moves fast without blocking the street.',
      'Attached homes need careful tie-ins at shared roofs and walls — we coordinate so neighbors aren’t affected.',
    ],
  },
};
module.exports.variants = variants;

// Second phrasing of each service × area-type angle.
const angleAlt = {
  'roof-replacement': { coastal: 'Wind uplift is the enemy of shore roofs, so we seal starter strips, use six nails per shingle and install ice & water shield well beyond the code minimum.', historic: 'Old plank decking, layered shingles and tricky dormers are common; we tear off completely and rebuild the details so the new roof suits the house.', inland: 'Second-generation roofs here often failed early because of poor ventilation — we correct intake and exhaust while the roof is open.' },
  'roof-repair': { coastal: 'Salt and wind loosen flashing and lift shingle tabs; we re-secure and seal with materials meant for coastal exposure.', historic: 'On older roofs we trace water past old patches to the real entry point, often at a chimney or valley.', inland: 'Tree limbs, worn boots and aging flashing cause most inland leaks — small fixes that stop big ceiling damage.' },
  siding: { coastal: 'Coastal siding needs taped house wrap, careful window flashing and a high-wind fastening schedule to keep water out.', historic: 'We match older reveals and profiles so new siding looks like it has always been part of the house.', inland: 'Swapping tired first-generation vinyl for heavier or insulated panels changes the look of a house overnight.' },
  gutters: { coastal: 'Shore downpours arrive fast and sideways; oversized gutters on hidden hangers keep up and stay attached.', historic: 'We size and style gutters to fit older architecture, including half-round, and move water away from old foundations.', inland: 'Oaks and pines fill gutters quickly — micro-mesh guards on seamless runs keep things flowing.' },
  windows: { coastal: 'Near the water, design-pressure ratings and corrosion-resistant hardware matter as much as energy efficiency.', historic: 'Grille patterns and sash proportions matter on older homes; we pick windows that respect the original look.', inland: 'Replacing foggy builder-grade units with Low-E glass is one of the fastest comfort upgrades you can make.' },
  doors: { coastal: 'Fiberglass slabs, composite frames and stainless hardware stand up to salt and humidity far better than steel or wood.', historic: 'Traditional panel styles and rebuilt jambs keep a new door in character with an older facade.', inland: 'A tight-sealing insulated entry door improves comfort, security and curb appeal all at once.' },
  decks: { coastal: 'Salt eats ordinary fasteners, so shore decks get stainless or hot-dipped hardware and flashed ledgers.', historic: 'Porch rebuilds on older homes blend traditional columns and rails with modern rot-resistant materials.', inland: 'Many older decks lack proper ledger bolts or footings — we rebuild to current code with low-maintenance boards.' },
  'soffit-fascia': { coastal: 'Wind-driven rain and salt rot bare wood trim; aluminum or PVC wrapping ends the repaint-and-repair cycle.', historic: 'Decorative roofline trim can be replicated in PVC so it keeps its character without the rot.', inland: 'When gutters overflow under trees, fascia is the first thing to rot — we fix the trim and the cause.' },
  'storm-damage-repair': { coastal: 'Coastal storms hit here first; we secure roofs and siding quickly and document everything for insurance.', historic: 'Storm repairs on older homes need matching materials and careful carpentry, not quick patches.', inland: 'Inland storm damage usually comes from falling trees — we secure the house, then restore it properly.' },
  'exterior-painting': { coastal: 'Sun and salt break paint down fast, so we prime bare wood, use premium acrylics and caulk every joint.', historic: 'Multi-color schemes highlight period details, and careful prep protects old wood for years.', inland: 'Shade breeds mildew; washing, treating and priming keep fresh paint clean and bonded.' },
  'carpentry-wood-rot': { coastal: 'Humidity and spray rot sills and porch posts quickly; PVC and treated lumber stop it from coming back.', historic: 'We save original trim where we can and replicate profiles where we can’t.', inland: 'Shaded trim stays damp and rots faster — we rebuild with rot-proof materials and fix the drainage.' },
  'power-washing': { coastal: 'Salt film and sand dull a house quickly; a yearly soft wash protects paint, siding and glass.', historic: 'Gentle, low-pressure washing protects older paint and delicate trim.', inland: 'Soft washing removes green algae and mildew from shaded walls and keeps it from returning quickly.' },
};
module.exports.angleAlt = angleAlt;

// More town-description phrasings per area type.
const moreVariants = {
  ocean: { housing: ['From beach bungalows to large new builds on pilings, homes here share one thing: constant exposure to wind, salt and sand.', 'Rental cottages, year-round homes and elevated rebuilds line these blocks, all within reach of the ocean breeze.'], tip: ['Everything we install at the beach is chosen for corrosion resistance and high wind ratings.', 'We treat every oceanfront job as a high-wind job — fastening, flashing and sealing to match.'] },
  bay: { housing: ['Capes, ranches and raised homes follow the lagoons and shoreline, with plenty of older homes getting modern upgrades.', 'Waterfront streets mix original bungalows with homes rebuilt higher after recent storms.'], tip: ['Along the water we detail every opening carefully, since wind-driven rain finds any gap.', 'Moisture is the main enemy near the bay, so ventilation and rot-proof trim are part of every plan.'] },
  historic: { housing: ['Porch-front homes, older colonials and Victorian details give these streets their character.', 'You will find original clapboard, decorative trim and homes more than a century old.'], tip: ['We are careful with older homes — matching what is there and upgrading only what is out of sight.', 'Where rules apply, we plan work to fit historic guidelines from the start.'] },
  suburban: { housing: ['Subdivisions of colonials, bi-levels and ranches make up most neighborhoods, many built in the ’80s and ’90s.', 'Much of the housing went up in waves from the ’60s through the 2000s, and those original exteriors are showing their age.'], tip: ['We look for builder shortcuts — missing kick-out flashing, thin ventilation, small gutters — and correct them.', 'Upgrading exteriors from this era is about fixing the original weak points, not just replacing materials.'] },
  pines: { housing: ['Wooded lots with ranches, capes and newer colonials are typical, many surrounded by pine and oak.', 'Homes sit back among the trees, including large active-adult communities and newer subdivisions.'], tip: ['Needles and shade are hard on roofs and gutters, so we plan for debris and moisture from day one.', 'Guards, algae-resistant shingles and good airflow keep wooded-lot homes in better shape.'] },
  rural: { housing: ['Larger lots hold farmhouses, custom homes and outbuildings, often with complex rooflines.', 'Estate properties and working farms bring bigger roofs, barns and detached garages.'], tip: ['We plan staging and access carefully on large properties and keep job sites tidy.', 'Wide-open exposure means extra attention to wind ratings and fastening.'] },
  urban: { housing: ['Closely spaced homes, twins and multi-unit buildings fill these blocks.', 'Older city homes and small apartment buildings sit shoulder to shoulder here.'], tip: ['We coordinate parking, permits and debris removal before day one on tight city lots.', 'Shared walls and roofs require careful tie-ins, which we plan with neighbors in mind.'] },
};
for (const [k, v] of Object.entries(moreVariants)) {
  variants[k].housing.push(...v.housing);
  variants[k].tip.push(...v.tip);
}
