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
