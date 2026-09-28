// Service area data: every municipality in Ocean, Monmouth and Atlantic County, NJ,
// plus the neighborhoods / sections / villages people actually search by.
//
// Town row: [name, lat, lng, character, sections[], localNote, slugOverride?]
// character drives the local content angle:
//   ocean    – oceanfront / barrier island: salt air, wind, flood elevation
//   bay      – bay, river & lagoon towns: humidity, wind off the water, older capes & ranches
//   historic – Victorian / historic districts: detailed trim, older construction
//   suburban – established neighborhoods: aging roofs, siding & windows from the 80s–2000s
//   pines    – Pinelands / wooded inland: tree debris, shade, moss, gutters
//   rural    – farm & estate country: large homes, outbuildings, long roof runs
//   urban    – dense city blocks: attached homes, multi-family, tight access
// Coordinates are approximate town centers, used only to link nearby towns.

const counties = [
  {
    slug: 'ocean-county',
    name: 'Ocean County',
    seat: 'Toms River',
    intro: 'From the barrier islands of Long Beach Island and the Barnegat Peninsula to the bay towns along Barnegat Bay and the Pinelands communities inland, Ocean County homes face salt air, nor’easters, coastal wind and humid summers. We repair and replace roofs, siding, gutters, windows, doors and decks in all 33 Ocean County municipalities.',
    climate: 'Ocean County sits squarely in New Jersey’s coastal wind zone. Homes on the barrier islands and along Barnegat Bay see wind-driven rain, salt corrosion and flood-zone building requirements, while Pinelands towns like Jackson, Manchester and Plumsted deal with heavy tree cover, pine needles in gutters and moss on shaded roofs.',
    towns: [
      ['Barnegat', 39.753, -74.223, 'bay', ['Barnegat Village', 'Ocean Acres (border)', 'Barnegat Bay waterfront'], 'Barnegat’s historic village, bay-front lagoons and fast-growing developments mean we see everything from 100-year-old homes to newer builds with builder-grade roofs reaching the end of their life.'],
      ['Barnegat Light', 39.760, -74.106, 'ocean', ['High Bar Harbor', 'Barnegat Light Borough'], 'At the northern tip of Long Beach Island in the shadow of “Old Barney,” homes in Barnegat Light take direct ocean and inlet wind year-round.'],
      ['Bay Head', 40.070, -74.046, 'ocean', ['Bay Head Borough', 'Twilight Lake area'], 'Bay Head’s classic cedar-shingle shore cottages and large oceanfront homes demand careful craftsmanship and materials that can handle constant salt exposure.'],
      ['Beach Haven', 39.559, -74.243, 'ocean', ['Beach Haven Historic District', 'Beach Haven Borough'], 'Beach Haven’s historic district and Victorian-era cottages on Long Beach Island need detail-oriented trim and siding work built to stand up to storm season.'],
      ['Beachwood', 39.939, -74.193, 'bay', ['Beachwood Borough', 'Toms River waterfront'], 'Beachwood’s tree-lined streets along the Toms River are full of capes and ranches with aging roofs, gutters that fill with leaves and fascia that needs attention.'],
      ['Berkeley Township', 39.897, -74.188, 'suburban', ['Bayville', 'Pelican Island', 'Holiday City', 'Silver Ridge Park', 'Manitou Park', 'South Seaside Park'], 'Berkeley Township stretches from Bayville and the Holiday City adult communities to Pelican Island and South Seaside Park on the barrier island, so we handle both inland homes and oceanfront properties.'],
      ['Brick', 40.060, -74.109, 'suburban', ['Herbertsville', 'Breton Woods', 'Cedarwood Park', 'Laurelton', 'Normandy Beach', 'Shore Acres', 'Mandalay Beach', 'Bayside/Lagoon homes'], 'Brick Township has miles of lagoon-front homes along the Metedeconk River and Barnegat Bay plus established neighborhoods like Herbertsville and Laurelton where original roofs and siding are due for replacement.'],
      ['Eagleswood', 39.656, -74.300, 'bay', ['West Creek', 'Eagleswood Township'], 'Eagleswood and the village of West Creek sit between the Pinelands and the bay marshes, where homes see both tree debris and wind coming off Barnegat Bay.'],
      ['Harvey Cedars', 39.702, -74.139, 'ocean', ['Harvey Cedars Borough', 'Bayfront Harvey Cedars'], 'Harvey Cedars is one of the narrowest parts of Long Beach Island, so homes here take wind and salt spray from both the ocean and the bay.'],
      ['Island Heights', 39.942, -74.150, 'historic', ['Island Heights Historic District', 'Toms River bluffs'], 'Island Heights’ Victorian homes on the bluffs above the Toms River feature ornate trim, porches and wood siding that call for careful restoration.'],
      ['Jackson', 40.103, -74.359, 'pines', ['Cassville', 'Vista Center', 'Jackson Mills', 'Whitesville', 'Van Hiseville', 'Harmony'], 'Jackson is one of the largest townships in New Jersey, with wooded lots near the Pinelands where falling branches, pine needles and shade-loving moss take a toll on roofs and gutters.'],
      ['Lacey Township', 39.863, -74.262, 'bay', ['Forked River', 'Lanoka Harbor', 'Bamber Lakes', 'Forked River lagoons'], 'Lacey Township’s Forked River and Lanoka Harbor lagoon communities mix waterfront wind exposure with wooded lots west of Route 9.'],
      ['Lakehurst', 40.015, -74.311, 'pines', ['Lakehurst Borough', 'Lake Horicon area'], 'Lakehurst, next to Joint Base McGuire-Dix-Lakehurst, has classic older homes around Lake Horicon that benefit from roof, window and siding upgrades.'],
      ['Lakewood', 40.080, -74.209, 'suburban', ['Leisure Village', 'Pine Park area', 'Lake Carasaljo', 'Downtown Lakewood', 'Westgate'], 'Lakewood is one of the fastest-growing towns in New Jersey, with everything from historic homes near Lake Carasaljo to new multi-family construction and active-adult communities.'],
      ['Lavallette', 39.970, -74.069, 'ocean', ['Lavallette Borough', 'Bayfront Lavallette', 'Ocean Beach (border)'], 'Lavallette sits on the narrow Barnegat Peninsula between the ocean and Barnegat Bay, where wind, salt and flood elevation drive every exterior decision.'],
      ['Little Egg Harbor', 39.596, -74.344, 'bay', ['Mystic Island', 'Osborn Island', 'Parkertown', 'Harbour Green'], 'Little Egg Harbor’s Mystic Island lagoon homes were hit hard by Superstorm Sandy, and many elevated and rebuilt homes now need the right roofing and siding to protect that investment.'],
      ['Long Beach Township', 39.640, -74.190, 'ocean', ['Loveladies', 'North Beach', 'Brant Beach', 'Beach Haven Crest', 'Brighton Beach', 'Spray Beach', 'North Beach Haven', 'Haven Beach', 'Holgate', 'Peahala Park', 'High Point'], 'Long Beach Township covers most of Long Beach Island — from the upscale homes of Loveladies and North Beach down to Holgate — and every section faces full-strength ocean weather.'],
      ['Manchester Township', 39.994, -74.354, 'pines', ['Whiting', 'Pine Lake Park', 'Ridgeway', 'Crestwood Village', 'Leisure Knoll', 'Cedar Glen Lakes', 'Heritage Village'], 'Manchester Township is home to large active-adult communities like Crestwood Village in Whiting, where ranch homes need dependable roof, gutter and siding service.'],
      ['Mantoloking', 40.043, -74.050, 'ocean', ['Mantoloking Borough', 'Bayfront Mantoloking'], 'Mantoloking’s oceanfront and bayfront estates were rebuilt after Superstorm Sandy, and these homes deserve premium materials and precise installation.'],
      ['Ocean Gate', 39.926, -74.134, 'bay', ['Ocean Gate Borough', 'Ocean Gate waterfront'], 'Ocean Gate is a small bayfront borough at the mouth of the Toms River where compact shore homes face wind and moisture off the water.'],
      ['Ocean Township (Waretown)', 39.791, -74.195, 'bay', ['Waretown', 'Waretown lagoons', 'Sands Point Harbor'], 'Ocean Township, known to most as Waretown, mixes bay-front lagoon homes with wooded neighborhoods west of Route 9.', 'waretown-ocean-township'],
      ['Pine Beach', 39.936, -74.170, 'bay', ['Pine Beach Borough', 'Toms River shoreline'], 'Pine Beach’s shaded streets along the Toms River are lined with older homes where rotted trim, clogged gutters and aging roofs are common.'],
      ['Plumsted', 40.063, -74.494, 'rural', ['New Egypt', 'Cream Ridge (border)', 'Plumsted farmland'], 'Plumsted and the village of New Egypt bring a rural feel to western Ocean County, with farmhouses, larger lots and outbuildings.'],
      ['Point Pleasant', 40.083, -74.068, 'bay', ['Point Pleasant Borough', 'Beaver Dam Creek', 'Bay Head Harbor (border)', 'Manasquan River waterfront'], 'Point Pleasant Borough is surrounded by water — the Manasquan River, Barnegat Bay and the Point Pleasant Canal — with lagoon homes and established neighborhoods throughout.'],
      ['Point Pleasant Beach', 40.091, -74.048, 'ocean', ['Point Pleasant Beach Borough', 'Boardwalk area', 'Manasquan Inlet'], 'Point Pleasant Beach, home to Jenkinson’s Boardwalk and the Manasquan Inlet, has classic shore homes that take salt air and wind every day.'],
      ['Seaside Heights', 39.944, -74.073, 'ocean', ['Seaside Heights Borough', 'Boardwalk district', 'Bayfront Seaside Heights'], 'Seaside Heights’ densely built shore homes and rentals need durable, low-maintenance exteriors that survive busy summers and stormy winters.'],
      ['Seaside Park', 39.926, -74.077, 'ocean', ['Seaside Park Borough', 'Bayfront Seaside Park', 'Island Beach State Park gateway'], 'Seaside Park sits at the gateway to Island Beach State Park, where homes face ocean wind on one side and Barnegat Bay on the other.'],
      ['Ship Bottom', 39.643, -74.181, 'ocean', ['Ship Bottom Borough', 'Causeway area'], 'Ship Bottom greets everyone coming over the Causeway onto Long Beach Island, and its homes face the same wind and salt as the rest of LBI.'],
      ['South Toms River', 39.942, -74.204, 'suburban', ['South Toms River Borough'], 'South Toms River is a compact borough of established homes where aging roofs, siding and windows are ready for an upgrade.'],
      ['Stafford Township', 39.705, -74.262, 'bay', ['Manahawkin', 'Beach Haven West', 'Cedar Run', 'Mayetta', 'Ocean Acres', 'Warren Grove'], 'Stafford Township includes Manahawkin, the Beach Haven West lagoons and the wooded Ocean Acres neighborhood, so we handle waterfront and Pinelands homes alike.'],
      ['Surf City', 39.662, -74.165, 'ocean', ['Surf City Borough', 'North Surf City'], 'Surf City sits in the middle of Long Beach Island, where oceanfront and bayside homes need roofing and siding that can handle serious wind.'],
      ['Toms River', 39.969, -74.198, 'suburban', ['Ortley Beach', 'Silverton', 'Gilford Park', 'Pleasant Plains', 'North Dover', 'Downtown Toms River', 'Dover Beaches', 'Ocean Beach', 'Shelter Cove', 'Brookside'], 'Toms River, the Ocean County seat, ranges from oceanfront Ortley Beach to the bayfront homes of Silverton and Shelter Cove to large inland neighborhoods like North Dover and Pleasant Plains.'],
      ['Tuckerton', 39.603, -74.340, 'bay', ['Tuckerton Borough', 'Tuckerton Seaport area', 'Lake Pohatcong'], 'Tuckerton is a historic seaport town where older homes around Lake Pohatcong and Main Street benefit from careful trim and siding restoration.'],
    ],
  },
  {
    slug: 'monmouth-county',
    name: 'Monmouth County',
    seat: 'Freehold',
    intro: 'Monmouth County runs from the Bayshore towns along Raritan Bay to the oceanfront boroughs of Asbury Park, Belmar and Spring Lake, and west to the farms and estates of Colts Neck, Millstone and Upper Freehold. We provide roofing, siding, gutters, windows, doors, decks and exterior repairs in all 53 Monmouth County municipalities.',
    climate: 'Monmouth County homes face coastal storms along the oceanfront and Bayshore, river exposure along the Navesink and Shrewsbury Rivers, and heavy tree cover and larger roof lines in the western part of the county. Historic homes in Ocean Grove, Red Bank, Spring Lake and Freehold call for craftsmen who respect original detail.',
    towns: [
      ['Aberdeen', 40.418, -74.222, 'suburban', ['Cliffwood', 'Cliffwood Beach', 'Strathmore'], 'Aberdeen’s Strathmore neighborhood and Cliffwood Beach area are full of 1960s-era homes where original windows, siding and roof lines are ready for an upgrade.'],
      ['Allenhurst', 40.237, -74.003, 'historic', ['Allenhurst Historic District'], 'Allenhurst’s grand historic oceanfront homes require exterior work that respects original architecture while standing up to salt air.'],
      ['Allentown', 40.178, -74.584, 'historic', ['Allentown Historic District'], 'Allentown’s historic district features 18th- and 19th-century homes where wood rot repair, trim carpentry and period-appropriate materials matter.'],
      ['Asbury Park', 40.220, -74.012, 'urban', ['Ocean Grove border', 'Wesley Lake', 'Deal Lake', 'Downtown Asbury Park', 'West Side'], 'Asbury Park’s revitalized downtown and blocks of historic homes near the boardwalk mix Victorian details with modern renovations.'],
      ['Atlantic Highlands', 40.413, -74.034, 'bay', ['Atlantic Highlands Harbor', 'Hilltop Atlantic Highlands'], 'Atlantic Highlands’ hillside homes overlook Sandy Hook Bay and catch strong wind off the water — especially on the bluffs.'],
      ['Avon-by-the-Sea', 40.192, -74.016, 'ocean', ['Avon Borough', 'Shark River Inlet area'], 'Avon-by-the-Sea is a small oceanfront borough of classic shore homes where cedar shake, trim and porches take constant salt exposure.'],
      ['Belmar', 40.178, -74.022, 'ocean', ['Belmar Borough', 'Silver Lake', 'Shark River waterfront', 'Belmar Marina'], 'Belmar’s mix of year-round homes and summer rentals near the beach and Shark River need tough, low-maintenance exteriors.'],
      ['Bradley Beach', 40.202, -74.012, 'ocean', ['Bradley Beach Borough', 'Fletcher Lake'], 'Bradley Beach’s older shore homes and bungalows near the boardwalk benefit from updated siding, windows and roofing.'],
      ['Brielle', 40.108, -74.056, 'bay', ['Brielle Borough', 'Manasquan River waterfront', 'Union Landing'], 'Brielle’s waterfront homes along the Manasquan River face wind and humidity off the water, while inland streets feature mature trees and established homes.'],
      ['Colts Neck', 40.287, -74.174, 'rural', ['Colts Neck Township', 'Horse farm estates'], 'Colts Neck’s horse farms and estate homes feature large, complex roof lines and outbuildings that call for experienced crews.'],
      ['Deal', 40.252, -74.000, 'ocean', ['Deal Borough', 'Oceanfront Deal'], 'Deal’s large oceanfront estates demand premium materials, detailed craftsmanship and crews who respect the property.'],
      ['Eatontown', 40.296, -74.051, 'suburban', ['Eatontown Borough', 'Fort Monmouth area'], 'Eatontown’s neighborhoods and the redevelopment around former Fort Monmouth have a mix of older homes and new construction.'],
      ['Englishtown', 40.297, -74.358, 'historic', ['Englishtown Borough'], 'Englishtown is a small historic borough where older homes benefit from careful trim, siding and roofing work.'],
      ['Fair Haven', 40.360, -74.038, 'bay', ['Fair Haven Borough', 'Navesink River waterfront'], 'Fair Haven’s tree-lined streets along the Navesink River are full of classic colonials and capes with detailed trim and mature landscaping.'],
      ['Farmingdale', 40.197, -74.169, 'suburban', ['Farmingdale Borough'], 'Farmingdale is a small borough surrounded by Howell and Wall, with older homes that benefit from roofing, siding and window upgrades.'],
      ['Freehold Borough', 40.260, -74.274, 'historic', ['Downtown Freehold', 'Freehold Historic District'], 'Freehold Borough, the Monmouth County seat, has a historic downtown and older homes where wood rot and aging roofs are common.'],
      ['Freehold Township', 40.230, -74.300, 'suburban', ['Freehold Township', 'Stonehurst'], 'Freehold Township’s large subdivisions built in the 1980s and 1990s now have roofs, windows and siding reaching the end of their service life.'],
      ['Hazlet', 40.422, -74.170, 'suburban', ['West Keansburg', 'Hazlet Township'], 'Hazlet’s Bayshore neighborhoods include many split-levels and ranches with original siding and windows ready for replacement.'],
      ['Highlands', 40.403, -73.992, 'bay', ['Highlands Borough', 'Waterfront Highlands', 'Hillside Highlands'], 'Highlands sits at the gateway to Sandy Hook, with waterfront homes rebuilt after Sandy and hillside homes that catch strong wind off the bay.'],
      ['Holmdel', 40.345, -74.184, 'suburban', ['Holmdel Township', 'Holmdel Village'], 'Holmdel’s larger homes and estates feature complex roof lines, premium siding and plenty of windows — work that rewards precise installation.'],
      ['Howell', 40.182, -74.199, 'suburban', ['Ramtown', 'Adelphia', 'Southard', 'Freewood Acres', 'Candlewood', 'Squankum'], 'Howell is one of Monmouth County’s largest townships, with wooded lots, established neighborhoods like Ramtown and Adelphia and many homes with original roofs from the 1990s.'],
      ['Interlaken', 40.240, -74.019, 'suburban', ['Interlaken Borough', 'Deal Lake shoreline'], 'Interlaken is a small residential borough on Deal Lake with classic homes that benefit from careful exterior updates.'],
      ['Keansburg', 40.442, -74.130, 'bay', ['Keansburg Borough', 'Keansburg waterfront'], 'Keansburg’s Bayshore homes face strong wind off Raritan Bay and many were repaired or elevated after Superstorm Sandy.'],
      ['Keyport', 40.433, -74.200, 'bay', ['Keyport Borough', 'Keyport waterfront', 'Keyport Historic District'], 'Keyport’s historic waterfront homes on Raritan Bay feature older construction and detailed trim exposed to wind and moisture.'],
      ['Lake Como', 40.169, -74.028, 'ocean', ['Lake Como Borough'], 'Lake Como is a compact shore borough between Belmar and Spring Lake where many homes are just blocks from the ocean.'],
      ['Little Silver', 40.337, -74.047, 'bay', ['Little Silver Borough', 'Little Silver Point'], 'Little Silver’s waterfront homes between the Shrewsbury River and Parkers Creek sit on beautifully landscaped, tree-lined lots.'],
      ['Loch Arbour', 40.233, -74.000, 'ocean', ['Loch Arbour Village'], 'Loch Arbour is a tiny oceanfront village on Deal Lake where homes face direct ocean exposure.'],
      ['Long Branch', 40.304, -73.992, 'ocean', ['Elberon', 'West End', 'North Long Branch', 'Pier Village', 'Branchport'], 'Long Branch runs from Pier Village and the West End to the historic estates of Elberon, so we handle oceanfront condos, older homes and grand properties.'],
      ['Manalapan', 40.280, -74.343, 'suburban', ['Tennent', 'Millhurst', 'Gordons Corner', 'Monmouth Heights', 'Manalapan Township'], 'Manalapan’s large subdivisions from the 1980s and 1990s have roofs and windows reaching replacement age.'],
      ['Manasquan', 40.126, -74.049, 'ocean', ['Manasquan Borough', 'Manasquan Inlet', 'Glimmer Glass'], 'Manasquan’s beachfront and inlet homes face strong ocean wind, while its in-town streets feature classic shore colonials and capes.'],
      ['Marlboro', 40.315, -74.246, 'suburban', ['Morganville', 'Robertsville', 'Wickatunk', 'Marlboro Township'], 'Marlboro’s large colonials and center-hall homes from the 1980s–2000s often need roof replacement, siding upgrades and new windows.'],
      ['Matawan', 40.415, -74.230, 'suburban', ['Matawan Borough', 'Lake Lefferts'], 'Matawan’s historic downtown homes and neighborhoods around Lake Lefferts mix older construction with mid-century homes.'],
      ['Middletown', 40.395, -74.082, 'suburban', ['Lincroft', 'Belford', 'Leonardo', 'Navesink', 'Port Monmouth', 'River Plaza', 'New Monmouth', 'Locust', 'Fairview', 'North Middletown', 'Chapel Hill'], 'Middletown is Monmouth County’s largest township, from the Bayshore villages of Belford, Leonardo and Port Monmouth to the wooded estates of Navesink, Locust and Lincroft.'],
      ['Millstone Township', 40.210, -74.430, 'rural', ['Clarksburg', 'Perrineville', 'Millstone Township'], 'Millstone Township’s wooded rural lots and larger homes need exterior work that handles long roof runs and plenty of tree cover.'],
      ['Monmouth Beach', 40.330, -73.982, 'ocean', ['Monmouth Beach Borough', 'Riverfront Monmouth Beach'], 'Monmouth Beach sits between the ocean and the Shrewsbury River, so homes face salt air and wind from both directions.'],
      ['Neptune City', 40.200, -74.028, 'suburban', ['Neptune City Borough'], 'Neptune City is a close-knit borough of established homes near the Shark River that are often ready for roofing and siding updates.'],
      ['Neptune Township', 40.203, -74.053, 'historic', ['Ocean Grove', 'Shark River Hills', 'Bradley Park', 'Midtown Neptune', 'Seaview Island'], 'Neptune Township includes the Victorian treasure of Ocean Grove, where historic-district guidelines shape every porch, trim and window project, plus Shark River Hills and neighborhoods to the west.'],
      ['Ocean Township', 40.251, -74.028, 'suburban', ['Oakhurst', 'Wanamassa', 'Wayside', 'West Deal', 'Elberon Park', 'Ocean Township'], 'Ocean Township in Monmouth County includes Oakhurst, Wanamassa and Wayside — neighborhoods of colonials, split-levels and ranches with aging exteriors.', 'ocean-township-monmouth'],
      ['Oceanport', 40.318, -74.015, 'bay', ['Oceanport Borough', 'Monmouth Park area', 'Gooseneck Point'], 'Oceanport, home to Monmouth Park, has waterfront homes along the Shrewsbury River and Branchport Creek that face wind and moisture off the water.'],
      ['Red Bank', 40.347, -74.064, 'historic', ['Downtown Red Bank', 'Red Bank Historic District', 'Navesink River waterfront', 'West Side'], 'Red Bank’s historic homes near the Navesink River and busy downtown mix Victorian detail with older construction that needs careful exterior work.'],
      ['Roosevelt', 40.221, -74.473, 'historic', ['Roosevelt Borough'], 'Roosevelt is a small historic borough known for its distinctive 1930s Bauhaus-style homes.'],
      ['Rumson', 40.372, -74.000, 'bay', ['Rumson Borough', 'Navesink riverfront', 'Shrewsbury riverfront'], 'Rumson’s estate homes along the Navesink and Shrewsbury Rivers demand premium materials, careful craftsmanship and crews who respect the property.'],
      ['Sea Bright', 40.361, -73.974, 'ocean', ['Sea Bright Borough', 'Riverfront Sea Bright'], 'Sea Bright sits on a narrow strip between the Atlantic and the Shrewsbury River, making wind- and flood-resistant exteriors a must.'],
      ['Sea Girt', 40.132, -74.035, 'ocean', ['Sea Girt Borough', 'Wreck Pond area'], 'Sea Girt’s large shore homes near the beach and Wreck Pond need exterior materials and installation built for coastal weather.'],
      ['Shrewsbury Borough', 40.330, -74.062, 'historic', ['Shrewsbury Borough', 'Historic Four Corners'], 'Shrewsbury Borough’s historic Four Corners and tree-lined neighborhoods feature classic colonials and older homes with detailed trim.'],
      ['Shrewsbury Township', 40.305, -74.068, 'suburban', ['Vail Homes', 'Shrewsbury Township'], 'Shrewsbury Township is a compact community of homes that benefit from roofing, siding and window upgrades.'],
      ['Spring Lake', 40.153, -74.028, 'historic', ['Spring Lake Borough', 'Spring Lake beachfront', 'Wreck Pond'], 'Spring Lake’s grand Victorian and shingle-style homes near the beach demand detailed carpentry, cedar and premium materials.'],
      ['Spring Lake Heights', 40.150, -74.040, 'suburban', ['Spring Lake Heights Borough'], 'Spring Lake Heights has established neighborhoods of capes, colonials and ranches just inland from the beach.'],
      ['Tinton Falls', 40.304, -74.100, 'suburban', ['Tinton Falls Borough', 'Seabrook Village area', 'Wayside (border)'], 'Tinton Falls mixes established neighborhoods, townhome communities and active-adult developments that all need dependable exterior service.'],
      ['Union Beach', 40.446, -74.178, 'bay', ['Union Beach Borough', 'Union Beach waterfront'], 'Union Beach was among the hardest-hit Bayshore towns during Superstorm Sandy, and many rebuilt homes face strong wind off Raritan Bay.'],
      ['Upper Freehold', 40.155, -74.530, 'rural', ['Cream Ridge', 'Imlaystown', 'Upper Freehold Township'], 'Upper Freehold’s farms, estates and historic villages like Imlaystown and Cream Ridge feature larger homes, barns and outbuildings.'],
      ['Wall Township', 40.165, -74.100, 'suburban', ['Allenwood', 'Glendola', 'Manasquan Park', 'West Belmar', 'Wall Township'], 'Wall Township’s wooded lots and neighborhoods like Allenwood, Glendola and West Belmar sit just inland from the shore towns.'],
      ['West Long Branch', 40.290, -74.018, 'suburban', ['West Long Branch Borough', 'Monmouth University area'], 'West Long Branch, home to Monmouth University, has established neighborhoods of colonials and capes with aging roofs and siding.'],
    ],
  },
  {
    slug: 'atlantic-county',
    name: 'Atlantic County',
    seat: 'Mays Landing',
    intro: 'Atlantic County stretches from the oceanfront communities of Atlantic City, Brigantine, Ventnor, Margate and Longport to the mainland suburbs of Egg Harbor Township, Galloway and Linwood, and west into the Pinelands towns of Hammonton, Mullica and Folsom. We provide exterior home repair and replacement in all 23 Atlantic County municipalities.',
    climate: 'Atlantic County’s barrier-island towns take the full force of Atlantic storms, salt spray and flood-zone requirements. On the mainland, bay-front towns like Somers Point and Absecon see wind off the water, and the Pinelands towns deal with sandy soil, heavy tree cover and pine debris.',
    towns: [
      ['Absecon', 39.428, -74.496, 'bay', ['Absecon City', 'Absecon Highlands (border)'], 'Absecon sits on Absecon Bay just off the Atlantic City Expressway, with established neighborhoods that see wind and moisture off the marsh.'],
      ['Atlantic City', 39.364, -74.423, 'urban', ['Chelsea', 'Chelsea Heights', 'Ducktown', 'Venice Park', 'Marina District', 'Uptown', 'Bungalow Park'], 'Atlantic City’s neighborhoods — Chelsea, Ducktown, Venice Park and Chelsea Heights — feature attached homes, multi-family buildings and bay-front properties that face intense coastal weather.'],
      ['Brigantine', 39.410, -74.365, 'ocean', ['Brigantine Beach', 'North End', 'Brigantine Lagoons'], 'Brigantine is a barrier island just north of Atlantic City, with lagoon and oceanfront homes that take wind and salt year-round.'],
      ['Buena', 39.514, -74.924, 'rural', ['Landisville', 'Minotola', 'Buena Borough'], 'Buena Borough and the villages of Landisville and Minotola are rural farm communities where larger lots and older homes are common.'],
      ['Buena Vista', 39.520, -74.880, 'rural', ['Richland', 'Newtonville', 'Collings Lakes', 'Milmay', 'East Vineland'], 'Buena Vista Township’s rural villages like Richland and Newtonville feature farmhouses and homes on wooded lots.'],
      ['Corbin City', 39.301, -74.749, 'rural', ['Corbin City'], 'Corbin City is one of Atlantic County’s smallest communities, on the Tuckahoe River near the marshes.'],
      ['Egg Harbor City', 39.528, -74.648, 'historic', ['Egg Harbor City', 'Lake Egg Harbor'], 'Egg Harbor City’s older homes and historic streets benefit from careful trim, siding and roof work.'],
      ['Egg Harbor Township', 39.382, -74.600, 'suburban', ['Bargaintown', 'Cardiff', 'English Creek', 'Scullville', 'West Atlantic City', 'McKee City', 'Farmington', 'Steelmanville'], 'Egg Harbor Township is Atlantic County’s largest municipality, covering Cardiff, English Creek, Bargaintown, West Atlantic City and many growing subdivisions.'],
      ['Estell Manor', 39.357, -74.770, 'pines', ['Estell Manor City'], 'Estell Manor is a heavily wooded Pinelands city where tree cover and pine debris make gutter and roof maintenance a priority.'],
      ['Folsom', 39.600, -74.842, 'pines', ['Folsom Borough'], 'Folsom is a small Pinelands borough with wooded lots where falling limbs and needles are tough on roofs and gutters.'],
      ['Galloway Township', 39.470, -74.475, 'suburban', ['Smithville', 'Pomona', 'Oceanville', 'Cologne', 'Conovertown', 'Absecon Highlands', 'Germania', 'Seaview'], 'Galloway Township includes historic Smithville, Stockton University in Pomona and neighborhoods from Oceanville to Cologne.'],
      ['Hamilton Township (Mays Landing)', 39.444, -74.726, 'suburban', ['Mays Landing', 'Mizpah', 'McKee City', 'Laureldale'], 'Hamilton Township, including the county seat of Mays Landing, has growing subdivisions and wooded lots along the Great Egg Harbor River.', 'mays-landing-hamilton-township'],
      ['Hammonton', 39.636, -74.802, 'historic', ['Downtown Hammonton', 'Hammonton farmland'], 'Hammonton, the “Blueberry Capital of the World,” has a historic downtown surrounded by farms and older homes.'],
      ['Linwood', 39.340, -74.575, 'suburban', ['Linwood City'], 'Linwood’s tree-lined neighborhoods of colonials and ranches sit along the bay, with mature trees that fill gutters every fall.'],
      ['Longport', 39.311, -74.524, 'ocean', ['Longport Borough'], 'Longport sits at the southern tip of Absecon Island, where oceanfront and bayfront homes face the full force of coastal storms.'],
      ['Margate City', 39.328, -74.503, 'ocean', ['Margate City', 'Bayfront Margate', 'Lucy the Elephant area'], 'Margate City, home of Lucy the Elephant, is full of beach blocks and bayfront homes that need exteriors built for salt and wind.'],
      ['Mullica Township', 39.582, -74.680, 'pines', ['Elwood', 'Sweetwater', 'Nesco', 'Weekstown'], 'Mullica Township’s Pinelands villages of Elwood, Sweetwater and Nesco feature homes on wooded lots near the Mullica River.'],
      ['Northfield', 39.370, -74.550, 'suburban', ['Northfield City'], 'Northfield’s established neighborhoods of capes and colonials often have roofs, siding and windows ready for replacement.'],
      ['Pleasantville', 39.390, -74.524, 'urban', ['Pleasantville City', 'Lakes Bay area'], 'Pleasantville’s older homes and multi-family properties on Lakes Bay benefit from roof, siding and window upgrades.'],
      ['Port Republic', 39.521, -74.486, 'rural', ['Port Republic City', 'Chestnut Neck'], 'Port Republic is a small historic city on the Mullica River with older homes and wooded lots.'],
      ['Somers Point', 39.318, -74.595, 'bay', ['Somers Point City', 'Bay Avenue waterfront'], 'Somers Point sits on Great Egg Harbor Bay, where bay-front homes face wind and humidity off the water.'],
      ['Ventnor City', 39.340, -74.477, 'ocean', ['Ventnor City', 'Ventnor Heights', 'Bayfront Ventnor'], 'Ventnor City’s beach blocks and Ventnor Heights bay-front homes face coastal wind, salt and flood-zone requirements.'],
      ['Weymouth Township', 39.340, -74.800, 'rural', ['Dorothy', 'Belcoville'], 'Weymouth Township’s villages of Dorothy and Belcoville are rural communities along the Great Egg Harbor River.'],
    ],
  },
];

const slugify = (s) => s.toLowerCase().replace(/\(.*?\)/g, '').replace(/[’']/g, '').replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const towns = [];
for (const c of counties) {
  c.towns = c.towns.map(([name, lat, lng, character, sections, note, slug]) => {
    const t = { name, lat, lng, character, sections, note, slug: slug || slugify(name), county: c };
    // "Ocean Township (Waretown)" → "Waretown": the name locals actually search.
    const paren = name.match(/\((.*)\)/);
    t.plainName = paren ? paren[1] : name;
    towns.push(t);
    return t;
  });
}

// Nearest towns (any county) for internal linking.
const dist = (a, b) => Math.hypot(a.lat - b.lat, (a.lng - b.lng) * Math.cos((a.lat * Math.PI) / 180));
for (const t of towns) {
  t.nearby = towns.filter((o) => o !== t).sort((a, b) => dist(t, a) - dist(t, b)).slice(0, 6);
}

const slugs = new Set();
for (const t of towns) {
  if (slugs.has(t.slug)) throw new Error('Duplicate town slug: ' + t.slug);
  slugs.add(t.slug);
}

module.exports = { counties, towns, slugify };
